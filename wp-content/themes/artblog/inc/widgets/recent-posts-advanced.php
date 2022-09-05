<?php
/**
 * Widget
 *
 * @package Artblog
 */

/**
 * Widget class.
 *
 * @since 1.0.0
 */
class Artblog_Recent_Posts_Advanced_Widget extends Artblog_Widget_Helper {

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$args['id']    = 'artblog-recent-posts-advanced';
		$args['label'] = esc_html__( 'Artblog: Recent Posts Advanced', 'artblog' );

		$args['widget'] = array(
			'classname'   => 'artblog_widget_recent_posts_advanced',
			'description' => esc_html__( 'Displays recent posts.', 'artblog' ),
		);

		$args['fields'] = array(
			'title' => array(
				'label' => esc_html__( 'Title:', 'artblog' ),
				'type'  => 'text',
				'class' => 'widefat',
			),
			'post_category'     => array(
				'label'           => esc_html__( 'Select Category:', 'artblog' ),
				'type'            => 'dropdown-taxonomies',
				'show_option_all' => esc_html__( 'All Categories', 'artblog' ),
			),
			'post_number'       => array(
				'label'   => esc_html__( 'Number of Posts:', 'artblog' ),
				'type'    => 'number',
				'default' => 5,
				'min'     => 1,
				'max'     => 100,
			),
			'image_width'       => array(
				'label'       => esc_html__( 'Image Width:', 'artblog' ),
				'type'        => 'number',
				'description' => esc_html__( 'px', 'artblog' ),
				'adjacent'    => true,
				'default'     => 60,
				'min'         => 1,
				'max'         => 200,
			),
			'disable_category'     => array(
				'label'   => esc_html__( 'Hide Category', 'artblog' ),
				'type'    => 'checkbox',
				'default' => false,
			),
		);

		parent::create_widget( $args );
	}

	/**
	 * Echo the widget content.
	 *
	 * @since 1.0.0
	 *
	 * @param array $args     Display arguments.
	 * @param array $instance Instance of the widget.
	 */
	public function widget( $args, $instance ) {
		$values = $this->get_field_values( $instance );

		$values['title'] = apply_filters( 'widget_title', empty( $instance['title'] ) ? '' : $instance['title'], $instance, $this->id_base );

		// Render before_widget.
		echo $args['before_widget'];

		// Render widget title.
		if ( ! empty( $values['title'] ) ) {
			echo $args['before_title'] . esc_html( $values['title'] ) . $args['after_title'];
		}

		$qargs = array(
			'posts_per_page'      => absint( $values['post_number'] ),
			'no_found_rows'       => true,
			'ignore_sticky_posts' => true,
		);

		if ( absint( $values['post_category'] ) > 0 ) {
			$qargs['cat'] = absint( $values['post_category'] );
		}

		$the_query = new WP_Query( $qargs );
		?>
		<?php if ( $the_query->have_posts() ) : ?>

			<div class="recent-posts-wrapper">

				<?php
				while ( $the_query->have_posts() ) :
					$the_query->the_post();

					$extra_class = 'featured-image-inactive';

					if ( has_post_thumbnail() ) {
						$extra_class = 'featured-image-active';
					}
					?>
					<div class="recent-posts-item <?php echo esc_attr( $extra_class ); ?>">
						<div class="recent-posts-item-inner">

							<?php if ( has_post_thumbnail() ) : ?>
								<div class="recent-posts-item-thumb">
									<a href="<?php the_permalink(); ?>">
										<?php the_post_thumbnail( 'thumbnail', array( 'style' => 'max-width:' . absint( $values['image_width'] ) . 'px;' ) ); ?>
									</a>
								</div><!-- .recent-posts-item-thumb -->
							<?php endif; ?>

							<div class="recent-posts-item-content-wrap">
								<div class="recent-posts-item-text-content">
									<?php if ( true !== $values['disable_category'] ) : ?>
										<div class="entry-cat-meta">
											<?php artblog_posted_category( true ); ?>
										</div><!--  .entry-cat-meta -->
									<?php endif; ?>

									<h3 class="recent-posts-item-title">
										<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
									</h3>

									<div class="recent-posts-item-meta entry-meta">
										<?php artblog_posted_date(); ?>
									</div><!--  .entry-cat-meta -->

								</div><!-- .recent-posts-item-text-content -->
							</div><!-- .recent-posts-item-content-wrap -->
						</div><!-- .recent-posts-item-inner -->
					</div><!-- .recent-posts-item -->

				<?php endwhile; ?>

			</div><!-- .recent-posts-wrapper -->

			<?php wp_reset_postdata(); ?>

		<?php endif; ?>

		<?php

		// Render after_widget.
		echo $args['after_widget'];
	}
}
