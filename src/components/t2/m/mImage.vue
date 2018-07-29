<template>
	<vue-draggable-resizable :minw="1" :minh="1" :active.sync="itemMdata.parentStyle.active" :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :parent="itemMdata.parent" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit hove_con" @dblclick="linkUrl">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑图片</span>
				<span @click="editDial.setlink=true" class="icon style"><i>设置链接</i></span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div @contextmenu="showMenu">
				<img :src="itemMdata.url" @mousedown="defaultStop($event)" :style="itemMdata.imgStyle" />
			</div>
		</div>
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
		<uiLink v-if="editDial.setlink" :itemMdata='itemMdata' :editDial="editDial"></uiLink>
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import uiLink from './uiLink.vue'
	import VueDraggableResizable from 'vue-draggable-resizable'
	export default {
		name: 'tImg',
		components: {
			VueDraggableResizable,
			uiLink,
		},
		data() {
			return {
				text: '默认图片',
				preview: '/t1/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {
					
				},
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					setlink: false,
					isEdit: false,
					rTitle: '编辑图片<span style="font-size:12px; color:#666;"> (&nbsp;只能添加jpg,jpeg,gif,png, 免费版大小不超过1MB&nbsp;)</span>'
				},
				contextMenuData: {
					// the contextmenu name(@1.4.1 updated)
					menuName: this.$utils.guid(),
					axios: {
						x: null,
						y: null
					},
					//Menu options (菜单选项)
					menulists: [{
							fnHandler: 'upFloor', //Binding events(绑定事件)
							btnName: '置于顶层' //The name of the menu option (菜单名称)
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
		},
		props: ['itemMdata', "posCom", 'index', "itemInner"],
		created() {
			console.log(this.itemMdata);
		},
		computed: {
			// 计算属性的 getter
			eImgId: function() {
				// `this` 指向 vm 实例
				return "img" + this.posCom + this.index
			}
		},
		methods: {
//			changSize(){
//				this.itemMdata.parentStyle.width = parseInt(this.itemMdata.imgStyle.width);
//				this.itemMdata.parentStyle.height = parseInt(this.itemMdata.imgStyle.height);
//				console.log(this.itemMdata.parentStyle.width,this.itemMdata.parentStyle.height);
//			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.imgStyle.width = width+'px';
				//this.itemMdata.imgStyle.height = height+'px;';
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i,this.editDial);
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
			upFloor(i) {//置于顶层
				//console.log(i.parentStyle);
				i.parentStyle.zIndex = this.itemInner.length;
				console.log("upFloor");
			},
			moveUpFloor(i) {//上移一层
				++i.parentStyle.zIndex;
				console.log('moveUpFloor!');
			},
			moveDownFloor(i) {//下移一层
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			copyItem(item) {//复制模块
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.length + 1;
				this.itemInner.push(i);
			},
			downFloor(i) {//置于底层
				i.parentStyle.zIndex = 0;
				console.log('downFloor!');
			},
			linkUrl(item) {
				var link = item.link;
				console.log(link)
				if(link) {
					if(Number(link)&& item.checked==true) {
						//location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&version_id=' + this.param.version_id + '&column_id=' + item.link;
						window.open(this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type  + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id);
					} else if(link.indexOf("http") != -1 && item.checked==true) {
						window.open(link)
					} else if(link.indexOf("http")>-1 && item.checked==true){						
						window.open(this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type  + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id)
					}
					if(Number(link)&& item.checked==false) {
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&version_id=' + this.param.version_id + '&column_id=' + item.link;
					} else if(link.indexOf("http") != -1 && item.checked==false) {
						location.href = link
					} else if(link.indexOf("http")>-1 && item.checked==false){						
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type  + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id
					}
				}
			},
			defaultStop(e) {
				e.preventDefault();
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},
			delModule(i) {
				this.$emit('delModule', i);
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		width: 100%;
		height: 100%;
		
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
	
	img {
		width: 100%;
		height: auto;
	}
</style>