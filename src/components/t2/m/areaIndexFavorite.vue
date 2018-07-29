<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :z="itemMdata.parentStyle.zIndex" :active.sync="itemMdata.parentStyle.active" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit areaIndexFavoriteP hove_con">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">编辑收藏本站</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" :style="[itemMdata.Divstyle,backgroundDiv]">
				<p>
					<img :src="itemMdata.mImage1.url" :style="{height:itemMdata.Divstyle.lineHeight}" />
					<a href="" :style="itemMdata.Astyle" @click="SetHome(this,'http://www.xyz.com')">设为首页</a>
					<a href="" :style="itemMdata.Astyle" @click="AddFavorite('我的网站',location.href)">收藏本站</a>
				</p>
			</div>
		</div>
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	//import uiDialog from './uiDialog.vue'
	export default {
		name: 'areaIndexFavorite',
		props: ['itemMdata', "posCom", 'index'],
		created() {
			console.log(this.itemMdata);
		},
		data() {
			return {
				title: "",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "600px",
					rTitle: '编辑收藏本站',
					isEdit: false
				},
				backgroundDiv: {
					backgroundImage: 'url(' + this.itemMdata.mImage0.url + ')',
				},
				icon: {
					backgroundImage: 'url(' + this.itemMdata.mImage1.url + ')',
				}
			}
		},
		components: {
			VueDraggableResizable,
			//uiDialog
		},
		methods: {
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
			},
			delModule(i) {
				this.$emit('delModule', i);
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i,this.editDial);
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			},
			SetHome: function(obj, url) {
				try {
					obj.style.behavior = 'url(#default#homepage)';
					obj.setHomePage(url);
				} catch(e) {
					if(window.netscape) {
						try {
							netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
						} catch(e) {
							alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
						}
					} else {
						alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
					}
				}
			},
			AddFavorite: function(title, url) {
				try {
					window.external.addFavorite(url, title);
				} catch(e) {
					try {
						window.sidebar.addPanel(title, url, "");
					} catch(e) {
						alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
					}
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		
		/*.detail {
			background-repeat: no-repeat;
			background-position: center;
			p {
				a {
					border-right: 1px solid #E3E3E3;
					padding: 0 5px;
				}
				a:nth-last-child(1) {
					border: none;
				}
			}
		}*/
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>