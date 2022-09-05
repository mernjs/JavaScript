<?php
/**
 * The template for displaying comments
 *
 * @package Artblog
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
?>

<div id="comments" class="comments-area">

	<?php
	$artblog_comment_count = absint( get_comments_number() );
	?>

	<?php
	if ( have_comments() ) :
		?>
        <h2 class="comments-title">
			<?php
			if ( ! have_comments() ) {
				esc_html_e( 'Leave a comment', 'artblog' );
			} elseif ( 1 === $artblog_comment_count ) {
				/* translators: %s: post title */
				printf( esc_html_x( 'One reply on &ldquo;%s&rdquo;', 'comments title', 'artblog' ), esc_html( get_the_title() ) );
			} else {
				echo sprintf(
				/* translators: 1: number of comments, 2: post title */
					_nx(
						'%1$s reply on &ldquo;%2$s&rdquo;',
						'%1$s replies on &ldquo;%2$s&rdquo;',
						$artblog_comment_count,
						'comments title',
						'artblog'
					),
					number_format_i18n( $artblog_comment_count ),
					esc_html( get_the_title() )
				);
			}
			?>
        </h2><!-- .comments-title -->

		<?php the_comments_navigation(); ?>

        <ol class="comment-list">
			<?php
			wp_list_comments(
				array(
					'style'      => 'ol',
					'short_ping' => true,
				)
			);
			?>
        </ol><!-- .comment-list -->

		<?php
		the_comments_navigation();

		// If comments are closed and there are comments, let's leave a little note, shall we?
		if ( ! comments_open() ) :
			?>
            <p class="no-comments"><?php esc_html_e( 'Comments are closed.', 'artblog' ); ?></p>
		<?php
		endif;

	endif; // Check for have_comments().

	comment_form();
	?>

</div><!-- #comments -->
