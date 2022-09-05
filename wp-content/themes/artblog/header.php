<?php
/**
 * The header for our theme
 *
 * @package Artblog
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'artblog' ); ?></a>

    <header id="masthead" class="site-header">
        <div class="container">
            <div class="site-branding">
				<?php

				echo '<div class="site-identity-wrap-outer">';
				the_custom_logo();

				echo '<div class="site-identity-wrapper">';
				if ( is_front_page() && is_home() ) :
					?>
                    <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<?php
				else :
					?>
                    <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
				<?php
				endif;
				$artblog_description = get_bloginfo( 'description', 'display' );
				if ( $artblog_description || is_customize_preview() ) :
					?>
                    <p class="site-description"><?php echo $artblog_description; // phpcs:ignore WordPress.Security.EscapeOutput
						?></p>
				<?php endif; ?>
				<?php echo '</div><!-- .site-identity-wrapper -->'; ?>
				<?php echo '</div><!-- .site-identity-wrap-outer -->'; ?>

                <div class="main-navigation-wrap">
                    <button class="menu-toggle" aria-controls="main-navigation" aria-expanded="false" type="button">
						<?php esc_html_e( 'Primary Menu', 'artblog' ); ?>
                    </button>
                    <nav id="main-navigation" class="site-navigation" role="navigation" aria-label='<?php esc_attr_e( 'Primary Menu', 'artblog' ); ?>'>
						<?php
						wp_nav_menu(
							array(
								'theme_location' => 'menu-1',
								'container'      => 'ul',
								'menu_id'        => 'primary-menu',
								'menu_class'     => 'menu',
								'fallback_cb'    => 'artblog_primary_navigation_fallback',
							)
						);
						?>
                    </nav><!-- #site-navigation -->
                </div><!-- .main-navigation-wrap -->
            </div><!-- .site-branding -->
        </div><!-- .container -->


    </header><!-- #masthead -->

    <div id="content" class="site-content">
