<?php 
/**
 * Display ACF logo field, WP custom logo field, or blog title depending on which exists
 * ACF Logo field accepts SVG code, customizer field will accept image file
 * 
 */
if(function_exists('get_field') && get_field('header_logo', 'options')) {
      $header_logo = get_field( 'header_logo', 'options' );
      ?>
        <a class="header-logo" href="<?php echo get_home_url(); ?>" >
            <?= $header_logo; ?>
        </a>
<?php } elseif (function_exists('the_custom_logo') &&  the_custom_logo()) {
        the_custom_logo();
} else { ?>
        <!-- <a href="<?php echo get_home_url(); ?>"><?= get_bloginfo('name'); ?></a> -->
<?php } ?>