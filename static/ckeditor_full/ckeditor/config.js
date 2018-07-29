/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
};

CKEDITOR.editorConfig = function(config) {
	config.toolbarGroups = [{
			name: 'document',
			groups: ['mode', 'document', 'doctools']
		},
		{
			name: 'clipboard',
			groups: ['clipboard', 'undo']
		},
		{
			name: 'editing',
			groups: ['find', 'selection', 'spellchecker', 'editing']
		},
		{
			name: 'forms',
			groups: ['forms']
		},
		'/',
		{
			name: 'basicstyles',
			groups: ['basicstyles', 'cleanup']
		},
		{
			name: 'paragraph',
			groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']
		},
		{
			name: 'links',
			groups: ['links']
		},
		{
			name: 'insert',
			groups: ['insert']
		},
		'/',
		{
			name: 'styles',
			groups: ['styles']
		},
		{
			name: 'colors',
			groups: ['colors']
		},
		{
			name: 'tools',
			groups: ['tools']
		},
		{
			name: 'others',
			groups: ['others']
		},
		{
			name: 'about',
			groups: ['about']
		}
	];

//		config.enterMode = CKEDITOR.ENTER_BR; 
//	    config.shiftEnterMode = CKEDITOR.ENTER_P;
//	    config.startupMode = 'source';

	config.removeButtons = 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Checkbox,CopyFormatting,RemoveFormat,Subscript,Superscript,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Image,Flash,Smiley,PageBreak,Iframe,Maximize,ShowBlocks,About';
};

//CKEDITOR.on('instanceReady', function(ev) {
//
//	var writer = ev.editor.dataProcessor.writer;
//
//	writer.indentationChars = '  ';
//
//	var dtd = CKEDITOR.dtd;
//
//	for(var e in CKEDITOR.tools.extend({}, dtd.$block, dtd.$listItem, dtd.$tableContent)) {
//
//		ev.editor.dataProcessor.writer.setRules(e, {
//
//			indent: false,
//
//			breakBeforeOpen: false,
//
//			breakAfterOpen: false,
//
//			breakBeforeClose: false,
//
//			breakAfterClose: false
//
//		});
//
//	}
//
//	for(var e in CKEDITOR.tools.extend({}, dtd.$list, dtd.$listItem, dtd.$tableContent)) {
//
//		ev.editor.dataProcessor.writer.setRules(e, {
//
//			indent: true,
//
//		});
//
//	}
//
//});