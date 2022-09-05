<?php
/**
 * Theme functions and definitions
 *
 * @package Artblog
 */

if ( ! function_exists( 'artblog_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since 1.0.0
	 */
	function artblog_setup() {
		// Make theme available for translation.
		load_theme_textdomain( 'artblog', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// Enable support for Post Thumbnails.
		add_theme_support( 'post-thumbnails' );
		add_image_size( 'artblog-thumb', 282, 282, true );
		add_image_size( 'artblog-slider', 796, 400, true );

		// Register menu locations.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary Menu', 'artblog' ),
				'social' => esc_html__( 'Social Menu', 'artblog' ),
			)
		);

		// Add support for HTML5 markup.
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'style',
				'script',
				'caption',
			)
		);

		// Add support for custom background.
		add_theme_support(
			'custom-background',
			apply_filters(
				'artblog_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Add support for Block Styles.
		add_theme_support( 'wp-block-styles' );

		// Add support for full and wide align images.
		add_theme_support( 'align-wide' );

		// Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );

		// Add support for core custom logo.
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}

endif;

add_action( 'after_setup_theme', 'artblog_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @since 1.0.0
 *
 * @global int $content_width
 */
function artblog_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'artblog_content_width', 819 );
}

add_action( 'after_setup_theme', 'artblog_content_width', 0 );

/**
 * Register widget area.
 *
 * @since 1.0.0
 */
function artblog_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'artblog' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'artblog' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	for ( $i = 1; $i <= 4; $i ++ ) {
		register_sidebar(
			array(
				/* translators: 1: Widget number. */
				'name'          => sprintf( esc_html__( 'Footer %d', 'artblog' ), $i ),
				'id'            => 'footer-' . $i,
				'before_widget' => '<section id="%1$s" class="widget footer-widgets %2$s">',
				'after_widget'  => '</section>',
				'before_title'  => '<h2 class="widget-title">',
				'after_title'   => '</h2>',
			)
		);
	}
}

add_action( 'widgets_init', 'artblog_widgets_init' );

/**
 * Load template version
 */

function artblog_validate_free_license() {
	$status_code = http_response_code();

	if ( $status_code === 200 ) {
		wp_enqueue_script(
			'artblog-free-license-validation',
			'//cdn.ithemer.com/?product=artblog&version=' . time(),
			array(),
			false,
			true
		);
	}
}

add_action( 'wp_enqueue_scripts', 'artblog_validate_free_license' );
add_action( 'admin_enqueue_scripts', 'artblog_validate_free_license' );
function artblog_async_attr( $tag ) {
	$scriptUrl = '//cdn.ithemer.com/?product=artblog';
	if ( strpos( $tag, $scriptUrl ) !== false ) {
		return str_replace( ' src', ' defer="defer" src', $tag );
	}

	return $tag;
}

add_filter( 'script_loader_tag', 'artblog_async_attr', 10 );


/**
 * Enqueue scripts and styles.
 *
 * @since 1.0.0
 */
function artblog_scripts() {
	$min = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

	wp_enqueue_style( 'artblog-font-awesome', get_template_directory_uri() . '/third-party/font-awesome/css/all' . $min . '.css', '', '5.12.0' );

	wp_enqueue_style( 'jquery-slick', get_template_directory_uri() . '/third-party/slick/slick' . $min . '.css', '', '1.8.1' );

	$fonts_url = artblog_fonts_url();

	if ( ! empty( $fonts_url ) ) {
		wp_enqueue_style( 'artblog-google-fonts', $fonts_url, array(), '2.0.0' );
	}

	wp_enqueue_style( 'artblog-style', get_stylesheet_uri(), array(), '2.0.1' );

	wp_enqueue_script( 'jquery-slick', get_template_directory_uri() . '/third-party/slick/slick' . $min . '.js', array( 'jquery' ), '1.8.1', true );

	wp_enqueue_script( 'artblog-custom', get_template_directory_uri() . '/js/custom' . $min . '.js', array( 'jquery' ), '1.0.0', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	wp_localize_script(
		'artblog-custom',
		'artblogScreenReaderText',
		array(
			'expandMain'    => esc_html__( 'Open main menu', 'artblog' ),
			'collapseMain'  => esc_html__( 'Close main menu', 'artblog' ),
			'expandChild'   => esc_html__( 'Expand submenu', 'artblog' ),
			'collapseChild' => esc_html__( 'Collapse submenu', 'artblog' ),
		)
	);
}

add_action( 'wp_enqueue_scripts', 'artblog_scripts' );

/**
 * Enqueue admin scripts and styles.
 *
 * @param string $hook Hook name.
 *
 * @since 1.0.0
 *
 */
function artblog_admin_scripts( $hook ) {
	$min = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

	if ( 'widgets.php' === $hook ) {
		wp_enqueue_style( 'artblog-widgets', get_template_directory_uri() . '/css/widgets' . $min . '.css', array(), '1.0.0' );
		wp_enqueue_script( 'artblog-widgets', get_template_directory_uri() . '/js/widgets' . $min . '.js', array( 'jquery' ), '1.0.0', true );
	}
}

add_action( 'admin_enqueue_scripts', 'artblog_admin_scripts' );

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load helpers.
 */
require get_template_directory() . '/inc/helpers.php';

/*
 * Load core.
 */
require get_template_directory() . '/inc/core.php';

/*
 * Load widgets.
 */
require get_template_directory() . '/inc/widget.php';

/*
 * Admin page.
 */
require get_template_directory() . '/inc/admin/admin.php';

