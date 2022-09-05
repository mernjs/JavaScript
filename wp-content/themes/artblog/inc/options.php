<?php
/**
 * Theme options
 *
 * @package Artblog
 */

$default = artblog_get_default_theme_options();

// Add Panel.
$wp_customize->add_panel(
	'theme_option_panel',
	array(
		'title'    => esc_html__( 'Theme Options', 'artblog' ),
		'priority' => 100,
	)
);

// Slider section.
$wp_customize->add_section(
	'section_slider',
	array(
		'title'    => esc_html__( 'Slider Options', 'artblog' ),
		'priority' => 100,
		'panel'    => 'theme_option_panel',
	)
);

// Setting enable_slider.
$wp_customize->add_setting( 'theme_options[enable_slider]',
	array(
		'default'           => $default['enable_slider'],
		'sanitize_callback' => 'artblog_sanitize_checkbox',
	)
);
$wp_customize->add_control( 'theme_options[enable_slider]',
	array(
		'label'    			=> esc_html__( 'Enable Slider', 'artblog' ),
		'section'  			=> 'section_slider',
		'type'     			=> 'checkbox',
		'priority' 			=> 100,
	)
);

// Setting slider_number.
$wp_customize->add_setting( 'theme_options[slider_number]',
	array(
		'default'           => $default['slider_number'],
		'sanitize_callback' => 'absint',
	)
);
$wp_customize->add_control( 'theme_options[slider_number]',
	array(
		'label'       => esc_html__( 'No of posts', 'artblog' ),
		'section'     => 'section_slider',
		'type'        => 'number',
		'priority'    => 100,
		'input_attrs' => array( 'min' => 2, 'max' => 10, 'style' => 'width: 55px;' ),
	)
);

// Setting slider_category.
$wp_customize->add_setting( 'theme_options[slider_category]',
	array(
		'default'           => $default['slider_category'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'absint',
	)
);
$wp_customize->add_control(
	new Artblog_Control_DropDown_Taxonomies( $wp_customize, 'theme_options[slider_category]',
		array(
			'label'    => esc_html__( 'Slider Category', 'artblog' ),
			'section'  => 'section_slider',
			'settings' => 'theme_options[slider_category]',
			'priority' => 100,
		)
	)
);

// Setting slider_enable_autoplay.
$wp_customize->add_setting( 'theme_options[slider_enable_autoplay]',
	array(
		'default'           => $default['slider_enable_autoplay'],
		'sanitize_callback' => 'artblog_sanitize_checkbox',
	)
);
$wp_customize->add_control( 'theme_options[slider_enable_autoplay]',
	array(
		'label'    			=> esc_html__( 'Enable Autoplay', 'artblog' ),
		'section'  			=> 'section_slider',
		'type'     			=> 'checkbox',
		'priority' 			=> 100,
	)
);

// Blog Options.
$wp_customize->add_section(
	'section_blog',
	array(
		'title' => esc_html__( 'Blog Options', 'artblog' ),
		'panel' => 'theme_option_panel',
	)
);

// Setting excerpt_length.
$wp_customize->add_setting(
	'theme_options[excerpt_length]',
	array(
		'default'           => $default['excerpt_length'],
		'sanitize_callback' => 'absint',
	)
);
$wp_customize->add_control(
	'theme_options[excerpt_length]',
	array(
		'label'   => esc_html__( 'Excerpt Length', 'artblog' ),
		'section' => 'section_blog',
		'type'    => 'text',
	)
);

// Setting read_more_text.
$wp_customize->add_setting(
	'theme_options[read_more_text]',
	array(
		'default'           => $default['read_more_text'],
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control(
	'theme_options[read_more_text]',
	array(
		'label'   => esc_html__( 'Read More Text', 'artblog' ),
		'section' => 'section_blog',
		'type'    => 'text',
	)
);

// Category color  section.
$wp_customize->add_section(
	'section_category_color',
	array(
		'title'    => esc_html__( 'Category Color', 'artblog' ),
		'priority' => 100,
		'panel'    => 'theme_option_panel',
	)
);

$cat_args = array(
	'orderby'    => 'id',
	'hide_empty' => 0,
);

$all_cats = get_categories( $cat_args );

$cat_list = wp_list_pluck( $all_cats, 'name', 'term_id' );

foreach ( $cat_list as $cat_key => $cat_label ) {

	$wp_customize->add_setting(
		'theme_options[cat_color_' . $cat_key . ']',
		array(
			'default'           => '#f16334',
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'theme_options[cat_color_' . $cat_key . ']',
			array(
				'label'   => esc_html( $cat_label ),
				'section' => 'section_category_color',
			)
		)
	);
}

// Footer Options.
$wp_customize->add_section(
	'section_footer',
	array(
		'title' => esc_html__( 'Footer Options', 'artblog' ),
		'panel' => 'theme_option_panel',
	)
);

// Setting copyright_text.
$wp_customize->add_setting(
	'theme_options[copyright_text]',
	array(
		'default'           => $default['copyright_text'],
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control(
	'theme_options[copyright_text]',
	array(
		'label'   => esc_html__( 'Copyright Text', 'artblog' ),
		'section' => 'section_footer',
		'type'    => 'text',
	)
);
