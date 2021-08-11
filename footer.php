<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Sterling
 * @since Sterling 1.0
 */

?>
	</main><!-- #main -->

	<footer class="site-footer has-primary-background-color has-white-color">
		<div class="site-footer__inner wrapper">
			<?php if ( has_nav_menu( 'footer' ) ) : ?>
				<nav class="footer-navigation">
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'footer',
							'container'      => false,
							'depth'          => 1,
						)
					);
					?>
				</nav><!-- .footer-navigation -->
			<?php endif; ?>
			<p class="has-white-color align-right">
				Copyright &copy; <?= get_the_date( 'Y'); ?> | Website by <a class="has-secondary-color" href="https://meghansterling.ca/">Meghan Sterling</a>
			</p>
		</div>
	</footer>

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
