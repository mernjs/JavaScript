<?php
/**
 * Footer widgets
 *
 * @package Artblog
 */

if ( is_active_sidebar( 'footer-1' ) || is_active_sidebar( 'footer-2' ) || is_active_sidebar( 'footer-3' ) || is_active_sidebar( 'footer-4' ) ) :
	?>

		<div id="footer-widgets" class="widget-area" role="complementary">
			<div class="container">
				<?php
				$column_count = 0;
				for ( $i = 1; $i <= 4; $i++ ) {
					if ( is_active_sidebar( 'footer-' . $i ) ) {
						$column_count++;
					}
				}
				?>
				<div class="inner-wrapper col-<?php echo absint( $column_count ); ?>">
					<?php
					$column_class = 'widget-column';
					for ( $i = 1; $i <= 4; $i++ ) {
						if ( is_active_sidebar( 'footer-' . $i ) ) {
							?>
							<div class="<?php echo esc_attr( $column_class ); ?>">
								<?php dynamic_sidebar( 'footer-' . $i ); ?>
							</div>
							<?php
						}
					}
					?>
				</div><!-- .inner-wrapper -->
			</div><!-- .container -->
		</div><!-- #footer-widgets -->

	<?php
endif;
