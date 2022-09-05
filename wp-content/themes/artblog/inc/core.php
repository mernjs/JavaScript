<?php
/**
 * Core functions
 *
 * @package Artblog
 */

/**
 * Get theme option.
 *
 * @since 1.0.0
 *
 * @param string $key Option key.
 * @return mixed Option value.
 */
function artblog_get_option( $key ) {
	$default_options = artblog_get_default_theme_options();

	if ( empty( $key ) ) {
		return;
	}

	$theme_options = (array) get_theme_mod( 'theme_options' );
	$theme_options = wp_parse_args( $theme_options, $default_options );

	$value = null;

	if ( isset( $theme_options[ $key ] ) ) {
		$value = $theme_options[ $key ];
	}

	return $value;
}

/**
 * Get default theme options.
 *
 * @since 1.0.0
 *
 * @return array Default theme options.
 */
function artblog_get_default_theme_options() {
	$defaults_options = array();

	$defaults_options['enable_slider']          = true;
	$defaults_options['slider_number']          = 3;
	$defaults_options['slider_category']        = 0;
	$defaults_options['slider_enable_autoplay'] = false;

	$defaults_options['excerpt_length']         = 40;
	$defaults_options['read_more_text']         = esc_html__( 'Read More', 'artblog' );

	$defaults_options['copyright_text']         = esc_html__( 'Copyright &copy; All rights reserved.', 'artblog' );

	return apply_filters( 'artblog_default_theme_options', $defaults_options );
}
