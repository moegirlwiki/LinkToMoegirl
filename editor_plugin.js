(function() {
	tinymce.PluginManager.requireLangPack('bk');
	
	tinymce.create('tinymce.plugins.bk', {
		init : function(ed, url) {
			ed.addCommand('bk', function() {
			 function trim(str){ //删除左右两端的空格
   			 	 return str.replace(/(^\s*)|(\s*$)/g, "");
 				};
				var inst = tinyMCE.getInstanceById('content');
				var html = inst.selection.getContent();
				html = (trim(html));
				if(html!=''){
					window.tinyMCE.execInstanceCommand('content', 'mceInsertContent', false, '<a onmouseover="showToolTip(event);process(this.innerText)" onmouseout="hideToolTip()" href="http://zh.moegirl.org/'+encodeURI(html)+'" target="_blank">'+html+'</a>');}
				return;
			});

			ed.addButton('bk', {
				title : '百科链接',
				cmd : 'bk',
				image : url + '/wiki.png'
			});
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('bk', n.nodeName == 'IMG');
			});
		},
		createControl : function(n, cm) {
			return null;
		},
		getInfo : function() {
			return {
					longname  : '萌娘链接链接',
					author 	  : '萌娘百科@yobo000',
					authorurl : 'http://zh.moegirl.org',
					infourl   : 'http://zh.moegirl.org',
					version   : "0.9"
			};
		}
	});

	tinymce.PluginManager.add('bk', tinymce.plugins.bk);
})();