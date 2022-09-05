<?php
/**
 * Template part for displaying page content
 *
 * @package Artblog
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="post-wrap">
		<?php artblog_post_thumbnail(); ?>

		<div class="post-content-wrap">
			<header class="entry-header">
				<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			</header><!-- .entry-header -->

			<div class="entry-content">
				<?php
				the_content();

				wp_link_pages(
					array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'artblog' ),
						'after'  => '</div>',
					)
				);
				?>
			</div><!-- .entry-content -->

			<footer class="entry-footer">
				<?php artblog_entry_footer(); ?>
			</footer><!-- .entry-footer -->

		</div><!-- .post-content-wrap -->
	</div><!-- .post-wrap -->

</article><!-- #post-<?php the_ID(); ?> -->
