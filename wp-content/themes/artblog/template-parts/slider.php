<?php
/**
 * Slider
 *
 * @package Artblog
 */

$enable_slider = artblog_get_option( 'enable_slider' );

if ( true !== $enable_slider ) {
	return;
}

$slider_number          = artblog_get_option( 'slider_number' );
$slider_category        = artblog_get_option( 'slider_category' );
$slider_enable_autoplay = artblog_get_option( 'slider_enable_autoplay' );

$qargs = array(
	'posts_per_page'      => absint( $slider_number ),
	'no_found_rows'       => true,
	'ignore_sticky_posts' => true,
	'post_status'         => 'publish',
	'meta_key'            => '_thumbnail_id',
);

if ( absint( $slider_category ) > 0 ) {
	$qargs['cat'] = absint( $slider_category );
}

$the_query = new WP_Query( $qargs );
?>

<?php if ( $the_query->have_posts() ) : ?>
	<?php
	$carousel_args = array(
		'slidesToShow'   => 1,
		'slidesToScroll' => 1,
		'rows' => 0,
		'dots'           => false,
		'prevArrow'      => '<span class="left-arrow carousel-arrow"><i class="fas fa-angle-left" aria-hidden="true"></i></span>',
		'nextArrow'      => '<span class="right-arrow carousel-arrow"><i class="fas fa-angle-right" aria-hidden="true"></i></span>',
	);

	if ( true === $slider_enable_autoplay ) {
		$carousel_args['autoplay'] = true;
		$carousel_args['autoplaySpeed'] = 3000;
	}

	$carousel_args_encoded = wp_json_encode( $carousel_args );
	?>

	<div class="posts-slider-wrapper">
		<div class="artblog-slider inner-wrapper" data-slick='<?php echo $carousel_args_encoded; ?>'>
			<?php
			while ( $the_query->have_posts() ) :
				$the_query->the_post();
				?>
				<div class="slide-item">
					<div class="slide-item-inner">
						<div class="slide-item-thumb">
							<a href="<?php the_permalink(); ?>">
								<?php the_post_thumbnail( 'artblog-slider' ); ?>
							</a>
						</div><!-- .slide-item-thumb -->

						<div class="slide-item-content-wrap">
							<div class="slide-item-text-content">
								<?php if ( 'post' === get_post_type() ) : ?>
									<div class="entry-cat-meta">
										<?php artblog_posted_category(); ?>
									</div><!--  .entry-cat-meta -->
								<?php endif; ?>

								<h3 class="title">
									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
								</h3><!-- .title -->

								<?php if ( 'post' === get_post_type() ) : ?>
									<div class="slide-item-meta entry-meta">
										<?php artblog_posted_date(); ?>
										<?php artblog_posted_author(); ?>
									</div><!--  .entry-cat-meta -->
								<?php endif; ?>

							</div><!-- .slide-item-text-content -->

						</div><!-- .slide-item-content-wrap -->

					</div><!-- .slide-item-inner -->
				</div><!-- .slide-item -->
			<?php endwhile; ?>
		</div><!-- .inner-wrapper -->
	</div><!-- .posts-slider-wrapper -->
	<?php wp_reset_postdata(); ?>
<?php endif; ?>
