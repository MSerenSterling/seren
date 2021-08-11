<?php
/**
 * Displays the site navigation.
 */

?>

<?php if ( has_nav_menu( 'primary' ) ) : ?>
	<button id="primary-mobile-menu" class="menu-toggle" aria-controls="primary-menu-list" aria-expanded="false">
		<p class="screen-reader-text">Menu</p>
		<span class="menu-toggle-line"></span>
		<span class="menu-toggle-line"></span>
		<span class="menu-toggle-line"></span>
	</button><!-- #primary-mobile-menu -->
	<nav id="site-navigation" class="primary-navigation">
		<?php
		wp_nav_menu(
			array(
				'theme_location'  => 'primary',
				'menu_class'      => 'menu-wrapper',
				'container_class' => 'primary-menu-container',
				'items_wrap'      => '<ul id="primary-menu-list" class="%2$s">%3$s</ul>'
			)
		);
		?>
	</nav><!-- #site-navigation -->
<?php endif; ?>