<?php
/**
 * Template part for displaying posts
 *
 * @package Artblog
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="post-wrap">
		<?php artblog_post_thumbnail(); ?>

		<div class="post-content-wrap">

				<header class="entry-header">
					<?php if ( 'post' === get_post_type() ) : ?>
						<div class="entry-cat-meta">
							<?php artblog_posted_category(); ?>
						</div><!-- .entry-cat-meta -->
					<?php endif; ?>

					<?php
					if ( is_singular() ) :
						the_title( '<h1 class="entry-title">', '</h1>' );
					else :
						the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
					endif;

					if ( 'post' === get_post_type() ) :
						?>
						<div class="entry-meta">
							<?php
							artblog_posted_on();
							artblog_posted_by();
							artblog_posted_comments();
							?>
						</div><!-- .entry-meta -->
					<?php endif; ?>
				</header><!-- .entry-header -->

				<div class="entry-content">
					<?php if ( is_archive() || is_home() ) : ?>
						<?php the_excerpt(); ?>
					<?php else : ?>
						<?php
						the_content();

						wp_link_pages(
							array(
								'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'artblog' ),
								'after'  => '</div>',
							)
						);
						?>
					<?php endif; ?>
				</div><!-- .entry-content -->

				<footer class="entry-footer">
					<?php artblog_entry_footer(); ?>
				</footer><!-- .entry-footer -->
		</div><!-- .post-content-wrap -->

	</div><!-- .post-wrap -->

</article><!-- #post-<?php the_ID(); ?> -->
