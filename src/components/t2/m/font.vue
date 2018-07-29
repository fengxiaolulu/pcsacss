<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :minh="30" :parent="itemMdata.parent" :active.sync="itemMdata.parentStyle.active" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.cancel'">
		<div class="phoneedit hove_con font" @dblclick="isdraggable(itemMdata)" @contextmenu="showMenu">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">设置样式</span>
				<span @click="editDial.setlink=true" class="icon style"><i>设置链接</i></span>
				<!--span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div v-bind:id="editorId" contenteditable="true" @dblclick="linkUrl(itemMdata)" cols="20" rows="2" class="cancel ckeditor fontHover" :style="itemMdata.iStyle" >
				<p class="hoverColor" :style="[{lineHeight:itemMdata.iStyle.lineHeight},{letterSpacing:itemMdata.iStyle.letterSpacing}]">点击文字实现可编辑状态...</p>
			</div>
		</div>
		<uiLink v-if="editDial.setlink" :itemMdata='itemMdata' :editDial="editDial"></uiLink>
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import uiLink from './uiLink.vue'
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import VueDraggableResizable from 'vue-draggable-resizable'
	export default {
		name: 'mFont',
		components: {
			uiLink,
			VueDraggableResizable
		},
		computed: {
			...mapGetters(["state", "getDataCur"])
		},
		props: ['itemMdata', "posCom", 'index', "itemInner","isfontFocus"],
		mounted() {
			hoverAction.fontHover(this.editorId,this.itemMdata)
			
			/*CKEDITOR.replace(this.editorId, {height: "300px", width: "100%", toolbar: "Full"});
      		var editor = CKEDITOR.instances.editor2;*/
			if($("#cke_" + this.editorId).length) {
				$("#cke_" + this.editorId).remove();
			}
			//CKEDITOR.config.readOnly = true  //inline
			this.editor = CKEDITOR.inline(this.editorId, {
				height: '40',
				toolbar: 'Full'
				//extraAllowedContent: 'a(documentation);abbr[title];code',
				//removePlugins: 'stylescombo',
				//extraPlugins: 'sourcedialog',
				//startupFocus: false
			});
			var t = this;
			this.editor.setData(t.itemMdata.tCon);
			this.editor.on('change', function(event) {
				t.itemMdata.tCon = this.getData().replace('<p>&nbsp;</p>', '').replace('<p><br></p>', ''); //内容						
			});
			
			this.editor.on('focus', function(event) {
				//t.isfontFocus = true;	
				t.$emit('isfontFocus',true);
				console.log("foncus");
			});
			
			this.editor.on('blur', function(event) {
				//t.isfontFocus = false;
				t.$emit('isfontFocus',false);
				console.log("blur");
			});
			
		},
		methods: {
			isdraggable(){
				for(var i=0;i<document.querySelectorAll('.handle').length;i++){
					$(document.querySelectorAll('.handle')[i]).css({
						'display':'block'
					})
				}				
			},
			showMenu(index) {
				event.preventDefault();
				event.stopPropagation();
				var x = event.clientX;
				var y = event.clientY;
				this.contextMenuData.axios = {
					x,
					y
				}
			},
			upFloor(i) {
				//console.log(i.parentStyle);
				i.parentStyle.zIndex += this.itemInner.length;
				console.log("upFloor");
			},
			moveUpFloor(i) {
				++i.parentStyle.zIndex;
				console.log('moveUpFloor!');
			},
			moveDownFloor(i) {
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			copyItem(item) {
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.length + 1;
				this.itemInner.push(i);
				//console.log(this.itemInner)
			},
			downFloor(i) {
				i.parentStyle.zIndex = 0;
			},
			
			getDataEditor() {
				return this.editor.getData();
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i,this.editDial);
			},
			linkUrl(item){
				var link = item.link;
				var t = this;
				console.log(link)
				if(Number(link)){
					if(item.target == '_blank'){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
					if(item.target == '_self'){
						location.href = t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id;
					}
					if(!item.target){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
				}else{
					if(link.indexOf("http") > -1 && item.target == '_blank'){
						window.open(link)
					}else if(link.indexOf("http") < 0 && item.target == '_blank'){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}

					if(link.indexOf("http") > -1 && item.target == '_self'){
						location.href = link
					}else if(link.indexOf("http") < 0 && item.target == '_self'){
						location.href = t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id
					}
					if(link.indexOf("http") > -1 && !item.target){
						window.open(link)
					}else if(link.indexOf("http") < 0 && !item.target){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}
				}
				
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},			
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		},
		created() {
			console.log(this.itemMdata);
		},
		data() {
			return {
				title: '文本',
				preview: '/t2/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				parentStyle: {

				},
				fontId:'fontId'+this.index,
				editDial: {
					editDialWidth: "700px",
					editDialHeight: "680px",
					isEdit: false,
					setlink: false,
					rTitle: '编辑文本',
					editDialzIndex: 1000
				},
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id
				},
				editorId: "editor" + this.posCom + this.index,
				editor: {},
				contextMenuData: {
					//the contextmenu name(@1.4.1 updated)
					menuName: this.$utils.guid(),
					axios: {
						x: null,
						y: null
					},
					//Menu options (菜单选项)
					menulists: [{
							fnHandler: 'upFloor', // Binding events(绑定事件)
							btnName: '置于顶层' // The name of the menu option (菜单名称)
						},
						{
							fnHandler: 'moveUpFloor',
							btnName: '上移一层'
						},
						{
							fnHandler: 'moveDownFloor',
							btnName: '下移一层'
						},
						{
							fnHandler: 'copyItem',
							btnName: '复制模块'
						},
						{
							fnHandler: 'downFloor',
							btnName: '置于底层'
						}
					]
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		height: 100%;
		
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>