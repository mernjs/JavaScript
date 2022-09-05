<?php
/**
 * Admin page content
 *
 * @package Agency_Plus
 */

$theme_info = wp_get_theme(); ?>

<div class="wrap theme-info-wrap">
    <h1>
		<?php
		/* translators: 1: Theme Name 2: Version of the theme */
		echo sprintf( esc_html__( 'Welcome to %1$s - %2$s', 'artblog' ), esc_html( $theme_info->get( 'Name' ) ), esc_html( $theme_info->get( 'Version' ) ) );
		?>
    </h1>

    <div class="about-text">
		<?php echo esc_html( $theme_info->get( 'Description' ) ); ?>
    </div><!-- .about-text -->

    <div class="main-buttons">
        <ul class="buttons-list">
			<?php $demo_uri = 'https://demo.ithemer.com/artblog/' ?>
            <li><a href="<?php echo $demo_uri ?>" class="button" target="_blank"><?php esc_html_e( 'View Demo', 'artblog' ); ?></a></li>
			<?php $theme_uri = wp_get_theme()->get( 'ThemeURI' ); ?>
            <li><a href="<?php echo $theme_uri ?>" class="button button-primary" target="_blank"><?php esc_html_e( 'Buy Pro', 'artblog' ); ?></a></li>
        </ul><!-- .buttons-list -->
    </div><!-- .main-buttons -->

    <div class="feature-wrapper col-4">
        <div class="box">
            <h3><?php esc_html_e( 'Customize Everything', 'artblog' ); ?></h3>
            <p><?php esc_html_e( 'Start customizing every aspect of the website with customizer.', 'artblog' ); ?></p>
            <p><a href="<?php echo esc_url( wp_customize_url() ); ?>" class="button button-primary"><?php esc_html_e( 'Go to Customizer', 'artblog' ); ?></a></p>
        </div><!-- .box -->

        <div class="box">
            <h3><?php esc_html_e( 'Get Support', 'artblog' ); ?></h3>
            <p><?php esc_html_e( 'Have any queries, feedbacks or suggestions?', 'artblog' ); ?></p>
        </div><!-- .box -->

    </div><!-- .feature-wrapper -->

</div><!-- .wrap.theme-info-wrap -->
