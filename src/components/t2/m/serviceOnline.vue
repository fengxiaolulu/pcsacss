<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :active.sync="itemMdata.parentStyle.active" :z="itemMdata.parentStyle.zIndex" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height||30" :parent="itemMdata.parent" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit serviceOnlineP hove_con">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">编辑在线客服</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail">
				<div class="kefu">
					<p class="title">在线客服</p>
					<ul>
						<li class="text" v-for="table in itemMdata.serviceOnlineTable" :style="{float:itemMdata.float}">
							<img @mousedown="defaultStop($event)" :src="itemMdata.icon"></img>
							<span>{{table.name}}</span>
						</li>
					</ul>
				</div>
				<div class="time">
					<p class="title">工作时间</p>
					<p class="text">
						<span>{{itemMdata.time1}}至{{itemMdata.time2}}</span>
						<span>{{itemMdata.time3}}-{{itemMdata.time4}}</span>
					</p>
				</div>
			</div>
		</div>
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	//import uiDialog from './uiDialog.vue'
	export default {
		name: 'serviceOnline',
		props: ['itemMdata', "posCom", 'index'],
		created() {
			console.log(this.itemMdata);
		},
		data() {
			return {
				title: "在线客服",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "600px",
					rTitle: '编辑在线客服',
					isEdit: false
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
			defaultStop(e) {
				e.preventDefault();
			},
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		
		/*.detail {
			p {
				clear: both;
				overflow: hidden;
			}
			.title {
				font-weight: bold;
				border-bottom: 1px dashed #E3E3E3;
				font-size: 16px;
				color: #888888;
				line-height: 35px;
				margin-top: 10px;
			}
			ul {
				clear: both;
				overflow: hidden;
				li{
					width: auto;
				}
			}
			.text {
				color: #888888;
				line-height: 30px;
				margin-left: 20px;
				img {
					margin-right: 5px;
				}
				span {
					margin-right: 10px;
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