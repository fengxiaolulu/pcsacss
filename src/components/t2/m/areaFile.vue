<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :z="itemMdata.parentStyle.zIndex" :active.sync="itemMdata.parentStyle.active" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit areaFileP hove_con">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">编辑文件下载</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail">
				<ul>
					<li v-for="(table,index) in itemMdata.areaFileTable" :style="{float:itemMdata.float,width:itemMdata.width}">
						<p>{{index}}.{{table.file_name}}<span v-show="itemMdata.size">{{table.file_size}}</span></p>
						<button @click="downLoad(table)">点击下载</button>
					</li>
				</ul>
				<!--分页-->
				<!--<div class="page" v-show="itemMdata.page">
					<p>
						<a href="">首页</a>
					</p>
					<p>
						<a href="">1</a>
					</p>
					<p>
						<a href="">2</a>
					</p>
					<p>
						<a href="">3</a>
					</p>
					<p>
						<a href="">4</a>
					</p>
					<p>
						<a href="">末页</a>
					</p>
				</div>-->
			</div>
		</div>
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	export default {
		name: 'areaFile',
		props: ['itemMdata', "posCom", 'index'],
		created() {
			console.log(this.itemMdata);
			this.getData();
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
					rTitle: '编辑文件下载',
					isEdit: false
				},
				token: this.$route.query.token,
				type: this.$route.query.type,
			}
		},
		components: {
			VueDraggableResizable
		},
		methods: {
			downLoad(table){
				//console.log(table.download_url)
				window.open(table.download_url)
			},
			getData(){			
				var v = this;				
				api.get('/api/data/downloadList?token=' + this.token + '&type='+this.type,true,{}, function(data) {
						//var result = JSON.stringify(data); //json对象转成字符串
						v.itemMdata.areaFileTable = data.data;
						console.log(data.data);
					}
				);
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
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		
		/*.detail {
			ul {
				width: 100%;
				clear: both;
				overflow: hidden;
				li {
					border: 1px solid #E3E3E3;
					overflow: hidden;
					padding: 10px 20px;
					margin: 10px 5px;
					border-radius: 5px;
					p {
						float: left;
						span{
							margin-left: 15px;
							color: #888;
						}
					}
					button {
						float: right;
					}
				}
			}
			.page {
				margin-top: 10px;
				display: table;
				text-align: center;
				margin-left: auto;
				margin-right: auto;
			}
			.page p {
				float: left;
				margin-right: 10px;
			}
			.page p a {
				display: block;
				border-radius: 3px;
				color: #666;
				border: 1px solid #b3b3b3;
				text-decoration: none;
				padding: 2px 10px;
				font-size: 14px;
			}
			.page p a:hover {
				background: #5874d8;
				color: #FFFFFF;
			}
		}*/
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>