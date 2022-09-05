<?php
/**
 * Helper functions
 *
 * @package Artblog
 */

/**
 * Generate excerpt.
 *
 * @since 1.0.0
 *
 * @param int     $length Excerpt length in words.
 * @param WP_Post $post_obj WP_Post instance (Optional).
 * @return string Excerpt.
 */
function artblog_get_the_excerpt( $length = 0, $post_obj = null ) {
	global $post;

	if ( is_null( $post_obj ) ) {
		$post_obj = $post;
	}

	$length = absint( $length );

	if ( 0 === $length ) {
		return;
	}

	$source_content = $post_obj->post_content;

	if ( ! empty( $post_obj->post_excerpt ) ) {
		$source_content = $post_obj->post_excerpt;
	}

	$source_content = strip_shortcodes( $source_content );

	$trimmed_content = wp_trim_words( $source_content, $length, '&hellip;' );

	return $trimmed_content;
}

/**
 * Return fonts URL.
 *
 * @since 1.0.0
 *
 * @return string Fonts URL.
 */
function artblog_fonts_url() {
	$fonts_url = '';
	$fonts     = array();
	$subsets   = 'latin,latin-ext';

	if ( 'off' !== esc_html_x( 'on', 'Muli font: on or off', 'artblog' ) ) {
		$fonts[] = 'Muli:300,400,500,600,700,800';
	}

	if ( $fonts ) {
		$fonts_url = add_query_arg(
			array(
				'family'  => urldecode( implode( '|', $fonts ) ),
				'subset'  => urldecode( $subsets ),
				'display' => 'swap',
			),
			'https://fonts.googleapis.com/css'
		);
	}

	return esc_url_raw( $fonts_url );
}

/**
 * Fallback for primary navigation.
 *
 * @since 1.0.0
 */
function artblog_primary_navigation_fallback() {
	echo '<ul class="menu">';
	echo '<li><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'artblog' ) . '</a></li>';

	$args = array(
		'posts_per_page' => 5,
		'post_type'      => 'page',
		'orderby'        => 'name',
		'order'          => 'ASC',
	);

	$the_query = new WP_Query( $args );

	if ( $the_query->have_posts() ) {
		while ( $the_query->have_posts() ) {
			$the_query->the_post();
			the_title( '<li><a href="' . esc_url( get_permalink() ) . '">', '</a></li>' );
		}

		wp_reset_postdata();
	}

	echo '</ul>';
}

/**
 * Add dynamic style.
 *
 * @since 2.0.0
 */
function artblog_add_dynamic_style() {
	$custom_style = '';

	$cat_args = array(
		'hide_empty' => 0,
	);

	$all_cats = get_categories( $cat_args );

	if ( ! empty( $all_cats ) ) {
		foreach ( $all_cats as $cat ) {
			$color = artblog_get_option( 'cat_color_'. $cat->term_id );
			if ( $color ) {
				$custom_style .= 'span.cat-links .artblog-cat-' . $cat->term_id . '{background-color: ' . esc_attr( $color ) . ';}';
			}
		}
	}

	if ( ! empty( $custom_style ) ) {
		echo sprintf( '<style>%s</style>', $custom_style );
	}
}

add_action( 'wp_head', 'artblog_add_dynamic_style', 11 );
