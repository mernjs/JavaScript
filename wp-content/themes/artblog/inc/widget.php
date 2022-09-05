<?php
/**
 * Custom widgets
 *
 * @package Artblog
 */

// Load base class.
require get_template_directory() . '/inc/widgets/class-base.php';

/**
 * Register custom widgets.
 *
 * @since 1.0.0
 */
function artblog_custom_widgets() {
	// Social widget.
	require get_template_directory() . '/inc/widgets/social.php';
	register_widget( 'Artblog_Social_Widget' );

	// Author widget.
	require get_template_directory() . '/inc/widgets/author.php';
	register_widget( 'Artblog_Author_Widget' );

	// Recent Posts Advanced widget.
	require get_template_directory() . '/inc/widgets/recent-posts-advanced.php';
	register_widget( 'Artblog_Recent_Posts_Advanced_Widget' );
}

add_action( 'widgets_init', 'artblog_custom_widgets' );
