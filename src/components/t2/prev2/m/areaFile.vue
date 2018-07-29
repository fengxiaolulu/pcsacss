<template>
	
		<div class="phoneedit areaFileP hove_con" :style="parentStyle">
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
		
</template>

<script>
	export default {
		name: 'areaFile',
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata);
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
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
				}
			}
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
		.edit_con {
			position: absolute;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.2);
			padding: 0 15px;
			top: -40px;
			width: auto;
			height: 40px;
			line-height: 40px;
			display: none;
			span {
				float: left;
				cursor: pointer;
				border-right: 1px solid #E3E3E3;
				margin: 0 8px;
			}
			span:nth-child(1){
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon{
				display: block;
				float: left;
				border-right: none;
				background: url(../../../../../static/image/bg03.png)no-repeat;
			}
			.icon i{
				position: absolute;
				display: block;
				font-size: 12px;
				width: auto;
				line-height: 25px;
				padding: 0px 10px;
				background: #FFFFFF;
			    border-radius: 5px;
			    box-shadow: 0 1px 4px 2px rgba(0, 0, 0, 0.1);
			    top: -23px;
			    margin-left: -25px;
			    display: none;
			}
			.style{
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover{
				background-position: -60px -232px;
			}
			.style:hover i{
				display: block;
			}
			.animation{
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover{
				background-position: -372px -232px;
			}
			.animation:hover i{
				display: block;
			}
			.borderhid{
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover{
				background-position: -275px -232px;
			}
			.borderhid:hover i{
				display: block;
			}
			.delete{
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover{
				background-position: -105px -232px;
			}
			.delete:hover i{
				display: block;
			}
		}
		.detail {
			ul {
				width: 100%;
				clear: both;
				overflow: hidden;
				li {
					border: 1px solid #E3E3E3;
					overflow: hidden;
					padding: 10px 20px;
					margin: 5px;
					border-radius: 5px;
					p {
						float: left;
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
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>