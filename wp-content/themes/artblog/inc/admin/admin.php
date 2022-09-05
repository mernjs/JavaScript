<?php
/**
 * Admin page class
 *
 * @package Artblog
 */

/**
 * Admin page class.
 *
 * @since 1.0.0
 */
class Artblog_Admin_Page {

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Init.
	 *
	 * @since 1.0.0
	 */
	public function init() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'add_scripts' ) );
	}

	/**
	 * Add menu.
	 *
	 * @since 1.0.0
	 */
	public function add_menu() {
		add_theme_page(
			esc_html__( 'About Artblog', 'artblog' ),
			esc_html__( 'About Artblog', 'artblog' ),
			'edit_theme_options',
			'theme-artblog',
			array( $this, 'render_page' )
		);
	}

	/**
	 * Load scripts.
	 *
	 * @since 1.0.0
	 *
	 * @param string $hook Hook.
	 */
	public function add_scripts( $hook ) {
		$min = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		if ( 'appearance_page_theme-artblog' === $hook ) {
			wp_enqueue_style( 'artblog-admin-page', get_template_directory_uri() . '/css/admin' . $min . '.css', array(), '2.0.0' );
		}
	}

	/**
	 * Render page.
	 *
	 * @since 1.0.0
	 */
	public function render_page() {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'artblog' ) );
		}

		include_once get_template_directory() . '/inc/admin/admin-content.php';
	}
}

new Artblog_Admin_Page();
