<?php 

class Sterling_Flyout_Nav {
    private $args = array(
        'menus' => array('primary'),
        'content' => array('<svg aria-hidden="true" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/></svg>'),
        'toggle_class' => 'toggle-flyout'
    );

    public static function init($args = array()) {
        $self = new self();
        if ($args) {
            $self->args = wp_parse_args($args, $self->args);
        }
        
        $self->handle_filters();
    }

    private function handle_filters() {
        add_filter( 'nav_menu_submenu_css_class', array($this, 'add_submenu_class') );
        add_filter('walker_nav_menu_start_el', array($this,'add_dropdown_button'), 10, 4);
        add_filter('nav_menu_link_attributes', array($this, 'add_aria_popup'), 10, 4);
    }

    public function add_aria_popup($atts, $item, $args, $depth) {
        // Return if 
        if (!$this->has_popup($item, $args)) {
            return $atts;
        }

        // If menu item is an empty link, we will add the toggle class directly to link
        if(!$this->has_valid_url($atts['href'])) {
            $atts['class'] = $this->args['toggle_class'];
        }

        $atts['aria-haspopup'] = 'true';
        $atts['aria-expanded'] = 'false';

        return $atts;
    }

    public function add_submenu_class($classes) {
        $classes[] = "flyout-menu";
        return $classes;
    }

    public function add_dropdown_button($item_output, $item, $depth, $args) {

        if(!$this->has_popup($item, $args)) {
            return $item_output;
        } 

        if (is_array($this->args['content'])) {
            $content = end($this->args['content']);
            $count = count($this->args['content']) - 1; 
            
            if ($depth <= $count) {
                $content = $this->args['content'][$depth];
            }
        } else {
            $content = $this->args['content'];
        }
        ob_start();
        ?>
        
        <button class="toggle-flyout" aria-expanded="false"><span class="screen-reader-text">Show submenu for <?= $item->title; ?></span><?= $content; ?></button>
        
        <?php 
        $button_dropdown = ob_get_clean();

        $item_output .= $button_dropdown;

        return $item_output;
    }

    // Status checks
    public function has_button_filter() {
        return has_filter('walker_nav_menu_start_el', array($this,'add_dropdown_button'));
    }

    private function has_valid_url($href) {
        return filter_var($href, FILTER_VALIDATE_URL);
    }

    private function has_popup($item, $args) {
        $menu_item_classes = $item->classes;

        return $this->is_flyout_nav($args->theme_location) && $this->has_children($menu_item_classes);
    }

    private function is_flyout_nav($theme_location) {
        return in_array($theme_location, $this->args['menus']) ;
    }

    private function has_children($menu_item_classes) {
        if (empty($menu_item_classes)) {
            return false;
        }
        return in_array('menu-item-has-children', $menu_item_classes);
    }
}