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
class Artblog_Social_Widget extends Artblog_Widget_Helper {

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$args['id']    = 'artblog-social';
		$args['label'] = esc_html__( 'Artblog: Social', 'artblog' );

		$args['widget'] = array(
			'classname'   => 'artblog_widget_social',
			'description' => esc_html__( 'Displays social links.', 'artblog' ),
		);

		$args['fields'] = array(
			'title' => array(
				'label' => esc_html__( 'Title:', 'artblog' ),
				'type'  => 'text',
				'class' => 'widefat',
			),
		);

		if ( false === has_nav_menu( 'social' ) ) {
			$args['fields']['message'] = array(
				'label' => esc_html__( 'Social menu is not set. Please create menu and assign it to Social Menu.', 'artblog' ),
				'type'  => 'message',
				'class' => 'widefat',
			);
		}

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

		if ( has_nav_menu( 'social' ) ) {
			wp_nav_menu(
				array(
					'theme_location' => 'social',
					'container'      => false,
					'depth'          => 1,
					'link_before'    => '<span class="screen-reader-text">',
					'link_after'     => '</span>',
				)
			);
		}

		// Render after_widget.
		echo $args['after_widget'];
	}
}
