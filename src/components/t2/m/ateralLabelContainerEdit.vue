<template>
	<div class="ateralbelContainerEdit">
		<div class="top">
			<p @click="oneshow" :class="{active:one_show}">常规</p>
			<p @click="twoshow" :class="{active:two_show}">高级</p>
		</div>
		<div class="one" v-show="one_show">
			<p class="name">
				<span>模块标题：</span>
				<input type="text" value="标签模块" />
			</p>
			<div class="direction">
				<span>模块方向：</span>
				<p>
					<input type="radio" name="direction" id="direction1" checked="checked" />
					<label for="direction1">横向</label>
				</p>
				<p>
					<input type="radio" name="direction" id="direction2" />
					<label for="direction2">纵向</label>
				</p>
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
		<div class="two" v-show="two_show">
			<div class="effect">
				<span>切换效果：</span>
				<p>
					<input type="radio" name="effect" id="effect1" checked="checked" />
					<label for="effect1">滑动</label>
				</p>
				<p>
					<input type="radio" name="effect" id="effect2" />
					<label for="effect2">点击</label>
				</p>
			</div>
			<div class="more">
				<span>显示更多：</span>
				<p @click="more_hid = true">
					<input type="radio" name="more" id="more1" checked="checked" />
					<label for="more1">是</label>
				</p>
				<p @click="more_hid = false">
					<input type="radio" name="more" id="more2" />
					<label for="more2">否</label>
				</p>
				<div class="more_hid" v-show="more_hid">
					<div class="way">
						<span>跳转方式：</span>
						<p @click="wayhid">
							<input type="radio" name="way" id="way1" checked="checked" />
							<label for="way1">指定栏目</label>
						</p>
						<p @click="wayhid2">
							<input type="radio" name="way" id="way2" />
							<label for="way2">自定义</label>
						</p>
						<div class="way_hid">
							<p v-show="way_hid1">
								<span>选择栏目：</span>
								<el-select v-model="value" placeholder="请选择">
									<el-option-group v-for="group in options" :key="group.label" :label="group.label">
										<el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-option-group>
								</el-select>
							</p>
							<p v-show="way_hid2">
								<span>链接地址：</span>
								<input type="text" />
							</p>
						</div>
					</div>
					<div class="way2">
						<span>打开方式：</span>
						<p>
							<input type="radio" name="way2" id="way2_1" checked="checked" />
							<label for="way2_1">当前窗口</label>
						</p>
						<p>
							<input type="radio" name="way2" id="way2_2" />
							<label for="way2_2">新窗口</label>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

	export default {
		name: 'ateralbelContainerEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '设置横向标签',
				dialogImageUrl: '',
				dialogVisible: false,
				one_show: true,
				two_show: false,
				options: [{
					label: '关于我们',
					options: [{
						value: '公司简介',
						label: '公司简介'
					}, {
						value: '公司历程',
						label: '公司历程'
					}]
				}, {
					label: '产品中心',
					options: [{
						value: '产品1',
						label: '产品1'
					}, {
						value: '产品2',
						label: '产品2'
					}, {
						value: '产品3',
						label: '产品3'
					}, {
						value: '产品4',
						label: '产品4'
					}]
				}],
				value: '',
				more_hid:true,
				way_hid1:true,
				way_hid2:false
			}
		},
		created() {

		},
		methods: {
			wayhid:function(){
				this.way_hid1 = true;
				this.way_hid2 = false;
			},
			wayhid2:function(){
				this.way_hid1 = false;
				this.way_hid2 = true;
			},
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
	.ateralbelContainerEdit {
		height: 350px;
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
			.direction {
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
		.two {
			box-sizing: border-box;
			padding: 20px;
			.effect{
				clear: both;
				overflow: hidden;
				span{
					float: left;
				}
				p{
					float: left;
					margin-left: 10px;
				}
			}
			.more{
				margin-top: 10px;
				clear: both;
				overflow: hidden;
				span{
					float: left;
				}
				p{
					float: left;
					margin-left: 10px;
				}
				.more_hid{
					clear: both;
					overflow: hidden;
					.way{
						clear: both;
					    overflow: hidden;
					    margin-top: 10px;
					    .way_hid{
					    	clear: both;
					    	overflow: hidden;
					    	margin-top: 20px;
					    	p{
					    		margin-left: 0;
					    		float: none;
					    		margin-top: 15px;
					    		line-height: 40px;
					    		input{
					    			border: 1px solid #E3E3E3;
					    			width: 205px;
					    			line-height: 40px;
					    			padding-left: 10px;
					    			border-radius: 5px;
					    		}
					    	}
					    }
					}
					.way2{
						margin-top: 15px;
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