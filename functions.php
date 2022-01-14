<?php 
// Require autoloader so that classes do not have to be requered manually
require_once __DIR__ . '/classes/class-sterling-autoloader.php';
Sterling_Autoloader::register();


// Enqueue Scripts
add_action("wp_enqueue_scripts", "sterling_enqueue_frontend_scripts");

function sterling_enqueue_frontend_scripts() {
    wp_enqueue_script( 
        "frontend", // handle
        get_stylesheet_directory_uri() . "/assets/js/frontend.js"   
    );
    wp_enqueue_style( 'site_main_css', get_template_directory_uri() . '/assets/css/main.min.css' );
}

// Add editor scripts
function sterling_enqueue_block_editor_script() {
	wp_enqueue_script('admin', get_theme_file_uri( '/assets/js/admin.js'), array( 'wp-blocks', 'wp-dom' ), wp_get_theme()->get( 'Version' ), true );
}

add_action( 'enqueue_block_editor_assets', 'sterling_enqueue_block_editor_script' );


add_action( 'wp_head', 'sterling_load_fonts' ); 
function sterling_load_fonts() { 
    $url = sterling_fonts_url(); 
    ?> 
<link rel="dns-prefetch" href="https://fonts.gstatic.com"> 
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"> 
<link rel="preload" href="<?php echo esc_url( $url ); ?>" as="fetch" crossorigin="anonymous"> 
<script type="text/javascript"> 
!function(e,n,t){"use strict";var o="<?php echo esc_url( $url ); ?>",r="__3perf_googleFontsStylesheet";function c(e){(n.head||n.body).appendChild(e)}function a(){var e=n.createElement("link");e.href=o,e.rel="stylesheet",c(e)}function f(e){if(!n.getElementById(r)){var t=n.createElement("style");t.id=r,c(t)}n.getElementById(r).innerHTML=e}e.FontFace&&e.FontFace.prototype.hasOwnProperty("display")?(t[r]&&f(t[r]),fetch(o).then(function(e){return e.text()}).then(function(e){return e.replace(/@font-face {/g,"@font-face{font-display:swap;")}).then(function(e){return t[r]=e}).then(f).catch(a)):a()}(window,document,localStorage); 
</script>
    <?php
} 

function sterling_fonts_url() { 
    $fonts = array(); 
 
    $fonts[] = 'Montserrat:400,600,700,900'; 

    $fonts_url = add_query_arg( array( 
        'family' => rawurlencode( implode( '|', $fonts ) )
    ), 'https://fonts.googleapis.com/css' );

    return $fonts_url;
}

function sterling_theme_setup() { 
    add_theme_support( 'custom-logo');  
    set_post_thumbnail_size( 750, 300, true);
      
    register_nav_menus(
        array(
            'primary' => esc_html__( 'Primary menu', 'sterling' ),
            'footer'  => __( 'Secondary menu', 'sterling' ),
        )
    );
}

add_action( 'after_setup_theme', 'sterling_theme_setup' );

function load_accessible_flyout_nav() {
    Sterling_Flyout_Nav::init();
}
add_action('init', 'load_accessible_flyout_nav');


if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page();
	
}

/* Log Client in After GF User Registration form is submitted */

add_action( 'gform_user_registered', 'sterling_gravity_registration_autologin', 10, 4 );

function sterling_gravity_registration_autologin($user_id, $user_config, $entry, $password) {
    $user = get_userdata($user_id);
    $user_login = $user->user_login;
    $user_password = $password;

    wp_signon( array(
        'user_login' => $user_login,
        'user_password' => $user_password,
        'remember' => false
    ));
}

/* Make Pre-filled Coaching Agreement Fields Readonly */
// update '1' to the ID of your form
add_filter( 'gform_pre_render_2', 'add_readonly_script' );
function add_readonly_script( $form ) {
    ?>
    <script type="text/javascript">
        jQuery(document).ready(function(){
            /* apply only to a input with a class of gf_readonly */
            jQuery(".gf_readonly input").attr("readonly","readonly");
        });
    </script>
    <?php
    return $form;
}

/* Dynamically populate cost & # of sessions */

add_filter( 'gform_field_value_client_cost', 'populate_client_cost_field' );
function populate_client_cost_field( $value ) {
    $user_id = get_current_user_id();

    $client_cost = get_user_meta( $user_id, 'cost', true); 
    
    return $client_cost;
}

add_filter( 'gform_field_value_client_sessions', 'populate_client_sessions_field' );
function populate_client_sessions_field( $value ) {
    $user_id = get_current_user_id();

    $client_sessions = get_user_meta( $user_id, 'sessions', true); 

    return $client_sessions;
}


function mytheme_custom_excerpt_length( $length ) {
    return 45;
}
add_filter( 'excerpt_length', 'mytheme_custom_excerpt_length', 999 );