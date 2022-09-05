<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Artblog
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @since 1.0.0
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function artblog_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}

add_filter( 'body_class', 'artblog_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 *
 * @since 1.0.0
 */
function artblog_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}

add_action( 'wp_head', 'artblog_pingback_header' );

/**
 * Add Go to top.
 *
 * @since 1.0.0
 */
function akalawebstudio_footer_goto_top() {
	echo '<a href="JavaScript:void(0);" class="scrollup" id="btn-scrollup"><span class="screen-reader-text">' . esc_html__( 'Go to top', 'artblog' ) . '</span></a>';
}

add_action( 'wp_footer', 'akalawebstudio_footer_goto_top' );

/**
 * Fix skip link focus in IE11.
 *
 * This does not enqueue the script because it is tiny and because it is only for IE11,
 * thus it does not warrant having an entire dedicated blocking script being loaded.
 *
 * @since 1.0.0
 */
function artblog_skip_link_focus_fix() {
	?>
	<script>
	/(trident|msie)/i.test(navigator.userAgent)&&document.getElementById&&window.addEventListener&&window.addEventListener("hashchange",function(){var t,e=location.hash.substring(1);/^[A-z0-9_-]+$/.test(e)&&(t=document.getElementById(e))&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())},!1);
	</script>
	<?php
}

add_action( 'wp_print_footer_scripts', 'artblog_skip_link_focus_fix' );

/**
 * Implement excerpt length.
 *
 * @since 1.0.0
 *
 * @param int $length The number of words.
 * @return int Excerpt length.
 */
function artblog_implement_excerpt_length( $length ) {
	$excerpt_length = artblog_get_option( 'excerpt_length' );

	if ( absint( $excerpt_length ) > 0 ) {
		$length = absint( $excerpt_length );
	}

	return $length;
}

/**
 * Implement read more in excerpt.
 *
 * @since 1.0.0
 *
 * @param string $more The string shown within the more link.
 * @return string The excerpt.
 */
function artblog_implement_read_more( $more ) {
	$output = $more;

	$read_more_text = artblog_get_option( 'read_more_text' );

	if ( ! empty( $read_more_text ) ) {
		$output = '&hellip;<p><a href="' . esc_url( get_permalink() ) . '" class="btn-more">' . esc_html( $read_more_text ) . '<span class="arrow-more">&rarr;</span></a></p>';
	}

	return $output;
}

/**
 * Implement read more in content.
 *
 * @since 1.0.0
 *
 * @param string $more_link Read More link element.
 * @param string $more_link_text Read More text.
 * @return string Link.
 */
function artblog_content_more_link( $more_link, $more_link_text ) {
	$read_more_text = artblog_get_option( 'read_more_text' );

	if ( ! empty( $read_more_text ) ) {
		$more_link = str_replace( $more_link_text, esc_html( $read_more_text ), $more_link );
	}

	return $more_link;
}

/**
 * Hook read more filters.
 *
 * @since 1.0.0
 */
function artblog_hook_read_more_filters() {
	if ( ! is_admin() ) {
		add_filter( 'excerpt_length', 'artblog_implement_excerpt_length', 999 );
		add_filter( 'the_content_more_link', 'artblog_content_more_link', 10, 2 );
		add_filter( 'excerpt_more', 'artblog_implement_read_more' );
	}
}

add_action( 'wp', 'artblog_hook_read_more_filters' );

/**
 * Custom content width.
 *
 * @since 1.0.0
 */
function artblog_custom_content_width() {
	global $post, $content_width;

	if ( $post && is_singular( array( 'post', 'page' ) ) ) {
		if ( is_page_template( 'templates/full-width.php' ) ) {
			$content_width = 1170;
		}
	}
}

add_filter( 'template_redirect', 'artblog_custom_content_width' );

/**
 * Modifies tag cloud widget arguments.
 *
 * @since 1.0.0
 *
 * @param array $args Arguments for tag cloud widget.
 * @return array The filtered arguments for tag cloud widget.
 */
function artblog_widget_tag_cloud_args( $args ) {
	$args['largest']  = 1;
	$args['smallest'] = 1;
	$args['unit']     = 'em';
	$args['format']   = 'list';

	return $args;
}

add_filter( 'widget_tag_cloud_args', 'artblog_widget_tag_cloud_args' );

