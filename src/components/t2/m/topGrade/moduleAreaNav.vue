<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width||320" :h="itemMdata.parentStyle.height||30" :parent="itemMdata.parent" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.cancel'">
		<div class="phoneedit hove_con">
			<p class="edit_con">
				<span @click="itemMdata.isEdit = true">编辑导航</span>
				<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="moduleAreaNav_con">
				<div class="header">
					<p class="logo">公司名称</p>
					<p class="navClick">导航</p>
				</div>
				<div class="navigation">
					<ul class="">
						<li v-for="item in router.navItem">
							<div>{{item.tText}}</div>
						</li>
					</ul>
				</div>
			</div>
			<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>
		</div>
	</vue-draggable-resizable>
</template>
<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import uiDialog from '../uiDialog.vue'
	import VueDraggableResizable from 'vue-draggable-resizable'
	export default {
		name: 'moduleAreaNav',
		components: {
			uiDialog,
			VueDraggableResizable
		},
		props: ['itemMdata'],
		created() {
			console.log(this.router.navItem);
		},
		methods: {
			removeComponent(i) {
				this.$emit('removeComponent', i); //删除该项
			},
			onResize: function(x, y, width, height) {
				this.parentStyle.left = x;
				this.parentStyle.top = y;
				this.parentStyle.width = width;
				this.parentStyle.height = height;
				this.router.parentStyle = this.parentStyle;
			},
			onDrag: function(x, y) {
				this.router.parentStyle.left = x;
				this.router.parentStyle.top = y;
			}
		},
		computed: {
			...mapGetters(["router"])
		},
		data() {
			return {
				title: "栏目导航",
				cons: "图片内容",
				parentStyle: {

				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					rTitle: '管理栏目'
				},
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
</style>