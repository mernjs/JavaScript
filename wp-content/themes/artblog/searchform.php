<?php
/**
 * Search form
 *
 * @package Artblog
 */

$search_form_id = wp_rand( 100, 999 );
?>

<form role="search" method="get" role="search" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label>
        <span class="screen-reader-text"><?php echo esc_html_x( 'Search for:', 'label', 'artblog' ); ?></span>
        <input type="search" class="search-field" placeholder="<?php echo esc_attr_x( 'Search &hellip;', 'placeholder', 'artblog' ); ?>" value="<?php the_search_query(); ?>" name="s"
               id="s<?php echo absint( $search_form_id ); ?>"/>
    </label>
    <input type="submit" class="search-submit" value="<?php echo esc_attr_x( 'Search', 'submit button', 'artblog' ); ?>">
</form>

