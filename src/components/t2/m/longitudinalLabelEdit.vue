<template>
	<div class="longitudinalLabel">		
		<div class="top">
			<p @click="oneshow" :class="{active:one_show}">常规</p>
			<p @click="twoshow" :class="{active:two_show}">高级</p>
		</div>
		<div class="one" v-show="one_show">
			<p class="name">
				<span>模块标题：</span>
				<input type="text" value="通栏模块" />
			</p>
			<div class="bg">
				<span>通栏背景：</span>
				<p>
					<input type="radio" name="bg" id="bg1" />
					<label for="bg1">默认</label>
				</p>
				<p>
					<input type="radio" name="bg" id="bg2" checked="checked"/>
					<label for="bg2">自定义</label>
				</p>
				<div class="bg_hid">
					<p>
						<span>图片：</span>
						<button>添加图片</button>
					</p>
					<p>
						<span>背景色：</span>
						<el-color-picker v-model="color" size="medium"></el-color-picker>
					</p>
					<p>
						<span>透明度：</span>
						<input type="text" value="0" />
					</p>
				</div>
			</div>
			<div class="content">
				<p>选择模块：</p>
				<div class="table">
					<table>
						<tr>
							<th width="50%">模块标题</th>
							<th width="25%">启用</th>
							<th width="25%">排序</th>
						</tr>
						<tr>
							<td>
								<div class="input">
									<input type="text" value="柳州富达变频螺杆空压机" />
								</div>
							</td>
							<td>
								<span class="start"></span>
							</td>
							<td>
								<div class="sort">
									<span class="up"></span>
									<span class="down"></span>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="input">
									<input type="text" value="柳州富达永磁变频螺杆空压机" />
								</div>
							</td>
							<td>
								<span class="start"></span>
							</td>
							<td>
								<div class="sort">
									<span class="up"></span>
									<span class="down"></span>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="input">
									<input type="text" value="柳州富达变频螺杆空压机" />
								</div>
							</td>
							<td>
								<span class="start"></span>
							</td>
							<td>
								<div class="sort">
									<span class="up"></span>
									<span class="down"></span>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="input">
									<input type="text" value="柳州富达永磁变频螺杆空压机" />
								</div>
							</td>
							<td>
								<span class="off"></span>
							</td>
							<td>
								<div class="sort">
									<span class="up"></span>
									<span class="down"></span>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="input">
									<input type="text" value="柳州富达永磁变频螺杆空压机" />
								</div>
							</td>
							<td>
								<span class="off"></span>
							</td>
							<td>
								<div class="sort">
									<span class="up"></span>
									<span class="down"></span>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'longitudinalLabel',
		props: ['itemMdata'],
		data() {
			return {
				title: '编辑通栏排版',
				dialogImageUrl: '',
				dialogVisible: false,
				one_show: true,
				two_show: false,
				color: '#409EFF'
			}
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
			oneshow: function() {
				this.one_show = true;
				this.two_show = false;
			},
			twoshow: function() {
				this.one_show = false;
				this.two_show = true;
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			...mapMutations([
				'orderList'
			])
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.longitudinalLabel{
		.top {
			clear: both;
			overflow: hidden;
			padding-left: 10px;
			background: #F5F5F5;
			border-bottom: 1px solid #CCCCCC;
			p {
				float: left;
				padding: 0 15px;
				line-height: 35px;
				border: 1px solid #E3E3E3;
			}
			.active {
				background: #FFFFFF;
				color: #409EFF;
			}
		}
		.one {
			box-sizing: border-box;
			padding: 20px;
			.name {
				input {
					border: 1px solid #E3E3E3;
					padding-left: 10px;
					line-height: 30px;
				}
			}
			.bg {
				margin-top: 10px;
				clear: both;
				overflow: hidden;
				span {
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
			}
			.content {
				margin-top: 10px;
				.table {
					height: 180px;
					overflow: auto;
					margin-top: 10px;
					border: 1px solid #e7ecf0;
					table {
						width: 100%;
						color: #666666;
						th {
							background: #f8f9fb;
							line-height: 45px;
						}
						td {
							text-align: center;
							line-height: 45px;
							.input {
								width: 50%;
								margin-left: 25%;
								input {
									width: 100%;
									text-overflow: ellipsis;
									border: 1px solid #E3E3E3;
								}
							}
							.start {
								display: block;
								width: 15px;
								height: 10px;
								background: url(../../../static/image/mbg01.png)no-repeat;
								background-position: -808px -920px;
								margin-left: 45%;
							}
							.off {
								display: block;
								width: 15px;
								height: 10px;
								background: url(../../../static/image/mbg01.png)no-repeat;
								background-position: -779px -920px;
								margin-left: 45%;
							}
							.sort {
								width: 30px;
								height: 15px;
								margin-left: 41%;
								.up {
									float: left;
									display: block;
									width: 8px;
									height: 13px;
									background: url(../../../static/image/component.png) no-repeat;
									background-position: -635px 0;
								}
								.down {
									float: left;
									display: block;
									margin-left: 8px;
									width: 8px;
									height: 13px;
									background: url(../../../static/image/component.png) no-repeat;
									background-position: -651px 0;
								}
							}
						}
						tr:nth-child(2n-1) {
							background: #f8f9fb;
						}
					}
				}
			}
		}
	}
	
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
		background-color: #f1f1f1;
	}
	
	::-webkit-scrollbar-thumb {
		background-color: #b2b2b2;
		width: 16px;
		-webkit-border-radius: 16px;
		-moz-border-radius: 16px;
		border-radius: 16px;
	}	
</style>