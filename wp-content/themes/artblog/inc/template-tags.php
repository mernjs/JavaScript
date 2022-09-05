<?php
/**
 * Custom template tags
 *
 * @package Artblog
 */

if ( ! function_exists( 'artblog_posted_on' ) ) :
	/**
	 * Displays post date.
	 *
	 * @since 1.0.0
	 */
	function artblog_posted_on() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		$posted_on = '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>';

		echo '<span class="posted-on">' . $posted_on . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput
	}

endif;

if ( ! function_exists( 'artblog_posted_by' ) ) :
	/**
	 * Displays post author.
	 *
	 * @since 1.0.0
	 */
	function artblog_posted_by() {
		$byline = '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>';

		echo '<span class="byline"> ' . $byline . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput
	}

endif;

if ( ! function_exists( 'artblog_posted_category' ) ) :
	/**
	 * Displays post categories.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $only_one If true show only one category.
	 */
	function artblog_posted_category( $only_one = false ) {
		$all_categories = get_the_category();

		$cat_content = '';

		if ( true === $only_one && count( $all_categories ) > 1 ) {
			$categories_list = array_slice( $all_categories, 0, 1 );
		} else {
			$categories_list = $all_categories;
		}

		if ( ! empty( $categories_list ) ) {
			foreach ( $categories_list as $cat ) {
				$cat_content .= ' <a href="' . esc_url( get_term_link( $cat ) ) . '" class="artblog-cat artblog-cat-' . absint( $cat->term_id ) . '">' . $cat->name . '</a>';
			}
		}

		if ( $cat_content ) {
			printf( '<span class="cat-links">%1$s</span>', $cat_content ); // phpcs:ignore WordPress.Security.EscapeOutput
		}
	}

endif;

if ( ! function_exists( 'artblog_posted_tags' ) ) :
	/**
	 * Displays post tags.
	 *
	 * @since 1.0.0
	 */
	function artblog_posted_tags() {
		/* translators: used between list items, there is a space after the comma */
		$tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'artblog' ) );

		if ( $tags_list ) {
			printf( '<span class="tags-links">%1$s</span>', $tags_list ); // phpcs:ignore WordPress.Security.EscapeOutput
		}
	}

endif;

if ( ! function_exists( 'artblog_posted_comments' ) ) :
	/**
	 * Displays post comment link.
	 *
	 * @since 1.0.0
	 */
	function artblog_posted_comments() {
		if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link(
				sprintf(
					wp_kses(
						/* translators: %s: post title */
						__( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'artblog' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					get_the_title()
				)
			);
			echo '</span>';
		}
	}

endif;

if ( ! function_exists( 'artblog_posted_edit_link' ) ) :
	/**
	 * Displays post edit link.
	 *
	 * @since 1.0.0
	 */
	function artblog_posted_edit_link() {
		if ( ! is_singular() ) {
			return;
		}

		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Edit <span class="screen-reader-text">%s</span>', 'artblog' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			),
			'<span class="edit-link">',
			'</span>'
		);
	}

endif;

if ( ! function_exists( 'artblog_entry_footer' ) ) :
	/**
	 * Displays post footer meta.
	 */
	function artblog_entry_footer() {
		if ( is_singular( 'post' ) ) {
			artblog_posted_tags();
		}

		artblog_posted_edit_link();
	}

endif;

if ( ! function_exists( 'artblog_post_thumbnail' ) ) :
	/**
	 * Displays post thumbnail.
	 *
	 * @since 1.0.0
	 */
	function artblog_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>

			<div class="post-thumbnail">
				<?php the_post_thumbnail( 'large' ); ?>
			</div><!-- .post-thumbnail -->

		<?php else : ?>

			<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
				<?php the_post_thumbnail( 'artblog-thumb' ); ?>
			</a>

			<?php
		endif; // End is_singular().
	}

endif;

if ( ! function_exists( 'artblog_the_posts_navigation' ) ) :
	/**
	 * Displays posts navigation.
	 *
	 * @since 1.0.0
	 */
	function artblog_the_posts_navigation() {
		the_posts_pagination();
	}

endif;

if ( ! function_exists( 'artblog_posted_date' ) ) :
	/**
	 * Displays post date.
	 *
	 * @since 1.0.0
	 */
	function artblog_posted_date() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		$posted_on = '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>';

		echo '<span class="posted-on">' . $posted_on . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput
	}

endif;

if ( ! function_exists( 'artblog_posted_author' ) ) :
	/**
	 * Displays post author.
	 *
	 * @since 1.0.0
	 */
	function artblog_posted_author() {
		$byline = '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>';

		echo '<span class="byline"> ' . $byline . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput
	}

endif;
