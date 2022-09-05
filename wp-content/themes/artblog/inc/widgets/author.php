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
class Artblog_Author_Widget extends Artblog_Widget_Helper {

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$args['id']    = 'artblog-author';
		$args['label'] = esc_html__( 'Artblog: Author', 'artblog' );

		$args['widget'] = array(
			'classname'   => 'artblog_widget_author',
			'description' => esc_html__( 'Displays author info.', 'artblog' ),
		);

		$args['fields'] = array(
			'title' => array(
				'label' => esc_html__( 'Title:', 'artblog' ),
				'type'  => 'text',
				'class' => 'widefat',
			),
			'author_name' => array(
				'label' => esc_html__( 'Author Name:', 'artblog' ),
				'type'  => 'text',
				'class' => 'widefat',
			),
			'author_url' => array(
				'label' => esc_html__( 'Author URL:', 'artblog' ),
				'type'  => 'url',
				'class' => 'widefat',
			),
			'author_description' => array(
				'label' => esc_html__( 'Author Description:', 'artblog' ),
				'type'  => 'text',
				'class' => 'widefat',
			),
			'author_image' => array(
				'label' => esc_html__( 'Author Image:', 'artblog' ),
				'type'  => 'image',
			),
		);

		// Add social fields.
		$social = $this->get_social();

		if ( ! empty( $social ) ) {
			$social_fields = array();

			foreach ( $social as $s_key => $s_item ) {
				$f_arr = array();

				$f_arr = array_merge( $f_arr, $s_item );

				$f_arr['class'] = 'widefat';

				$f_arr['placeholder'] = esc_html__( 'Enter full URL.', 'artblog' );

				if ( 'email' === $s_item['type'] ) {
					$f_arr['placeholder'] = esc_html__( 'Enter valid email.', 'artblog' );
				}

				$social_fields[ $s_key ] = $f_arr;
			}

			if ( ! empty( $social_fields ) ) {
				$args['fields']['social_heading'] = array(
					'label' => esc_html__( 'Social Links', 'artblog' ),
					'type'  => 'heading',
				);
				$args['fields'] = array_merge( $args['fields'], $social_fields );
			}
		}

		parent::create_widget( $args );
	}

	/**
	 * Get social sites.
	 *
	 * @since 1.0.0
	 *
	 * @return array Social sites.
	 */
	public function get_social() {
		$output = array(
			'facebook' => array(
				'label' => esc_html__( 'Facebook', 'artblog' ),
				'type'  => 'url',
				'icon'  => 'fab fa-facebook-f',
			),
			'twitter' => array(
				'label' => esc_html__( 'Twitter', 'artblog' ),
				'type'  => 'url',
				'icon'  => 'fab fa-twitter',
			),
			'instagram' => array(
				'label' => esc_html__( 'Instagram', 'artblog' ),
				'type'  => 'url',
				'icon'  => 'fab fa-instagram',
			),
			'youtube' => array(
				'label' => esc_html__( 'Youtube', 'artblog' ),
				'type'  => 'url',
				'icon'  => 'fab fa-youtube',
			),
			'email' => array(
				'label' => esc_html__( 'Email', 'artblog' ),
				'type'  => 'email',
				'icon'  => 'fas fa-envelope',
			),
		);

		return apply_filters( 'artblog_author_widget_social_sites', $output, $this );
	}

	/**
	 * Render social links.
	 *
	 * @since 1.0.0
	 */
	public function render_author_social_links( $instance ) {
		$values = $this->get_field_values( $instance );

		$profiles = array();

		$social = $this->get_social();

		foreach ( $social as $s_key => $s_item ) {

			if ( isset( $values[ $s_key ] ) && ! empty( $values[ $s_key ] ) ) {
				$link = array();

				$link['label'] = $s_item['label'];
				$link['icon']  = $s_item['icon'];
				$link['value'] = $values[ $s_key ];

				if ( 'email' === $s_item['type'] ) {
					$link['value'] = 'mailto:' . $values[ $s_key ];
				}

				$profiles[] = $link;
			}
		}

		if ( ! empty( $profiles ) ) {
			echo '<ul class="author-social-links">';

			foreach ( $profiles as $key => $val ) {
				echo sprintf( '<li><a href="%1$s" target="_blank">%2$s</a></li>',
					esc_url( $val['value'] ),
					'<i class="' . esc_attr( $val['icon'] ) . '" aria-hidden="true"></i>'
				);
			}

			echo '</ul>';
		}
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
		?>

		<div class="author-info-wrap">
			<div class="author-info-inner">

				<?php if ( ! empty( $values['author_image'] ) ) : ?>
					<div class="author-image">
						<img src="<?php echo esc_url( $values['author_image'] ) ?>" alt="<?php echo esc_attr( $values['author_name'] ); ?>" />
					</div><!-- .author-image -->
				<?php endif; ?>

				<div class="author-details">
					<?php if ( ! empty( $values['author_name'] ) ) : ?>
						<h3 class="author-name">
							<?php if ( ! empty( $values['author_url'] ) ) : ?>
								<a href="<?php echo esc_url( $values['author_url'] ); ?>"><?php echo esc_html( $values['author_name'] ); ?></a>
							<?php else : ?>
								<?php echo esc_html( $values['author_name'] ); ?>
							<?php endif; ?>
						</h3>
					<?php endif; ?>

					<?php $this->render_author_social_links( $instance ); ?>

					<?php if ( ! empty( $values['author_description'] ) ) : ?>
						<div class="author-description">
							<?php echo wp_kses_post( wpautop( $values['author_description'] ) ); ?>
						</div><!-- .author-description -->
					<?php endif; ?>

				</div><!-- .author-details -->

			</div><!-- .author-info-inner -->
		</div><!-- .author-info-wrap -->
		<?php

		// Render after_widget.
		echo $args['after_widget'];
	}
}
