<?php 
/**
 *  Sets up Gutenberg block and block editor specific theme supports
 */

class Sterling_Theme_Blocks_Setup {
    private $theme_array;
    /**
     * Default options for theme setup
     */
    private $theme_options = array(
        'disable_custom_colors' => true,
        'disable_custom_fonts' => true,
        'disable_custom_gradients' => true,
        'align_wide' => true,
        'editor_styles' => array(
            'enable' => true,
            'filename' => 'assets/css/main.min.css'
        )
    );
    /**
     * Inititates class with parameters
     * 
     * @param array $theme_array;
     * @param array $options;
     */
    public static function init($theme_array, $options = array()) {
        $self = new self();
        $self->setup_args($theme_array, $options);
        $self->setup_theme();
        $self->editor_styles();    
    }

    private function setup_args($theme_array, $options) {
        $this->theme_array = $theme_array;
        $options && $this->theme_options = wp_parse_args($options, $this->theme_options);
    }   

    private function setup_theme() {
        $this->setup_colors();
        $this->setup_fonts();
        $this->setup_gradients();
        $this->setup_align();
    }

    private function editor_styles() {
        $editor_styles = $this->theme_options['editor_styles'];

        if($editor_styles['enable']) {
            add_theme_support('editor-styles');
            add_editor_style( $editor_styles['filename']);
        }
    }

    private function setup_colors() {
        if($this->theme_array['colors']) {
            add_theme_support( 'editor-color-palette',  $this->editor_generator('colors', 'color'));
        }

        if($this->theme_options['disable_custom_colors']) {
            add_theme_support( 'disable-custom-colors');
        }
    }

    private function setup_fonts() {
        if($this->theme_array['fonts']) {
            add_theme_support( 'editor-font-sizes', $this->editor_generator('fonts', 
            'size'));
        }

        if($this->theme_options['disable_custom_fonts']) {
            add_theme_support( 'disable-custom-font-sizes');
        }
    }

    private function setup_gradients() {
        if($this->theme_array['gradients']) {
            add_theme_support( 'editor-gradient-presets', $this->editor_generator('gradients', 'gradient'));
        }

        if($this->theme_options['disable_custom_gradients']) {
            add_theme_support( 'disable-custom-gradients');
        }
    }

    private function setup_align() {
        if(!$this->theme_options['align_wide']) {
            return;
        }
        add_theme_support( 'align-wide');
    }

    private function editor_generator($key, $type) {
        $options = array();

        foreach($this->theme_array[$key] as $key=>$value) {
            if(is_array($value)) {
                $value = reset($value);
            }
            $options[] = array(
                'name' => __(ucwords(str_replace('-', ' ', $key)), 'themeLangDomain'),
                'slug' => $key,
                $type => $value
            );
        }

        return $options;
    }
}