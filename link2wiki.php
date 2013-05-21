<?php
/*
Plugin Name:萌娘百科链接
Plugin URI: http://zh.moegirl.org
Description: 为选中的文字添加链接到萌娘百科，并显示摘要。 
Version: 0.9 
Author: 萌娘百科@yobo000
Author URI: http://zh.moegirl.org
*/
function bk_addbuttons() {
	if ( get_user_option('rich_editing') == 'true') {
		add_filter("mce_external_plugins", "add_bk_tinymce_plugin", 5);
		add_filter('mce_buttons', 'register_bk_button', 5);
	}
}

function register_bk_button($buttons) {
	array_push($buttons, "separator", "bk");
	return $buttons;
}

function add_bk_tinymce_plugin($plugin_array) {
	if(substr(__FILE__,-24,10)=='mu-plugins'){
		$plugin_array['bk'] = get_option('siteurl').'/wp-content/mu-plugins/editor_plugin.js';
	}else{
		$plugin_array['bk'] = get_option('siteurl').'/wp-content/plugins/link2moe/editor_plugin.js';
	}
	return $plugin_array;
}

function bk_mce_valid_elements($init) {
	if ( isset( $init['extended_valid_elements'] ) 
	&& ! empty( $init['extended_valid_elements'] ) ) {
		$init['extended_valid_elements'] .= ',' . 'pre[lang|line|escaped]';
	} else {
		$init['extended_valid_elements'] = 'pre[lang|line|escaped]';
	}
	return $init;
}

function bk_change_tinymce_version($version) {
	return ++$version;
}

/*javascript+css*/
 function addHeaderCode() {
             echo '<link type="text/css" rel="stylesheet" href="' . get_bloginfo('wpurl') . '/wp-content/plugins/link2moe/bubble.css" />' . "\n";
             echo '<script type="text/javascript" src="' . get_bloginfo('wpurl') . '/wp-content/plugins/link2moe/bubble.js"></script>'."\n";      
 }
 //bubble div
 function addBubbleDiv(){
 	echo '<div id="bubble_tooltip">
	<div class="bubble_middle" ><span id="bubble_tooltip_content"></span></div>
	</div>';
 }

add_filter('tiny_mce_before_init', 'bk_mce_valid_elements', 0);
add_filter('tiny_mce_version', 'bk_change_tinymce_version');
add_action('init', 'bk_addbuttons');
add_action('wp_head','addHeaderCode');
add_action('wp_footer','addBubbleDiv');
?>