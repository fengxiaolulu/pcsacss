<template>
	<div class="serviceOnlineEdit">
		<div class="top">
			<p @click="oneshow" :class="{active:one_show}">常规</p>
			<p @click="twoshow" :class="{active:two_show}">高级</p>
		</div>
		<div class="one" v-show="one_show">
			<p class="name">
				<span>模块标题：</span>
				<input type="text" value="在线客服" />
			</p>
			<div class="list">
				<div class="title">
					<span>客服列表：</span>
					<span @click="addService($event,newService)">新增客服</span>
				</div>
				<div class="table">
					<table>
						<tr>
							<th width="20%">栏目</th>
							<th width="20%">客服账号</th>
							<th width="20%">显示文字</th>
							<th width="20%">状态</th>
							<th width="20%">操作</th>
						</tr>
						<tr v-for="(table,index) in itemMdata.serviceOnlineTable">
							<td>{{table.type}}</td>
							<td><input type="text" value="table.number" v-model="table.number" /></td>
							<td><input type="text" value="table.name" v-model="table.name" /></td>
							<td>
								<el-select v-model="value" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
							<td>
								<span class="icon" @click="deleteService(table)"></span>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="time">
				<span>工作时间：</span>
				<table>
					<tr>
						<th width="20%">日期</th>
						<th width="20%">时间</th>
					</tr>
					<tr>
						<td>
							<input type="text" value="itemMdata.time1" v-model="itemMdata.time1" />
							<span>至</span>
							<input type="text" value="itemMdata.time2" v-model="itemMdata.time2" />
						</td>
						<td>
							<input type="text" value="itemMdata.time3" v-model="itemMdata.time3" />
							<span>至</span>
							<input type="text" value="itemMdata.time4" v-model="itemMdata.time4" />
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="two" v-show="two_show">
			<div class="way">
				<span>展示方式：</span>
				<p @click="changefloat1">
					<input type="radio" name="way" id="way1" checked="checked" />
					<label for="way1">纵向</label>
				</p>
				<p @click="changefloat2">
					<input type="radio" name="way" id="way2" />
					<label for="way2">横向</label>
				</p>
			</div>
			<div class="style">
				<span>QQ样式：</span>
				<p @click="changeicon1">
					<input type="radio" name="style" id="style1" checked="checked" />
					<label for="style1"><img src="../../../../static/image/qq1.gif" /></label>
				</p>
				<p @click="changeicon2">
					<input type="radio" name="style" id="style2" />
					<label for="style2"><img src="../../../../static/image/qq2.gif" /></label>
				</p>
				<p @click="changeicon3">
					<input type="radio" name="style" id="style3" />
					<label for="style3"><img src="../../../../static/image/qq3.gif" /></label>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'serviceOnlineEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false,
				one_show: true,
				two_show: false,
				color1: '#409EFF',
				width_hid: true,
				options: [{
					value: '选项1',
					label: '一直在线'
				}, {
					value: '选项2',
					label: '工作时间在线'
				}],
				value: '选项1',
				options2: [{
					value: '选项1',
					label: '一直在线'
				}, {
					value: '选项2',
					label: '工作时间在线'
				}],
				value2: '选项1',
				newService: {
					type: "QQ",
					number: "10010",
					name: "客服"
				}
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
			deleteService: function(table) {
				this.itemMdata.serviceOnlineTable.splice(this.itemMdata.serviceOnlineTable.indexOf(table), 1);
			},
			addService: function(e, table) {
				e.preventDefault();
				console.log(JSON.stringify(table));
				var newService = JSON.parse(JSON.stringify(table));
				this.itemMdata.serviceOnlineTable.push(newService);
			},
			changeicon1: function() {
				this.itemMdata.icon = '/static/image/qq1.gif';
			},
			changeicon2: function() {
				this.itemMdata.icon = '/static/image/qq2.gif';
			},
			changeicon3: function() {
				this.itemMdata.icon = '/static/image/qq3.gif';
			},
			changefloat1: function() {
				this.itemMdata.float = 'none';
			},
			changefloat2: function() {
				this.itemMdata.float = 'left';
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.serviceOnlineEdit {
		box-sizing: border-box;
		height: 450px;
		overflow: auto;
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
				span {
					width: 70px;
					text-align: right;
				}
				input {
					border: 1px solid #E3E3E3;
					padding-left: 10px;
					line-height: 30px;
				}
			}
			.list {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				.title {
					clear: both;
					overflow: hidden;
					span:nth-child(2) {
						float: right;
						border: 1px solid #E3E3E3;
						padding: 3px 10px;
						color: #888;
					}
				}
				.table {
					clear: both;
					overflow: hidden;
					height: 200px;
					overflow: auto;
					margin-top: 10px;
					border: 1px solid #e7ecf0;
					table {
						width: 100%;
						color: #666666;
						th {
							background: #f8f9fb;
							line-height: 55px;
						}
						td {
							text-align: center;
							line-height: 55px;
							.icon {
								background: url(../../../../static/image/mbg01.png)no-repeat;
								background-position: -994px -8px;
								width: 16px;
								height: 16px;
								display: block;
								margin-left: 43%;
							}
							input {
								border: 1px solid #E3E3E3;
								text-align: center;
								width: 70%;
								color: #666666;
								line-height: 35px;
							}
						}
						tr:nth-child(2n-1) {
							background: #f8f9fb;
						}
					}
				}
			}
			.time {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				table {
					margin-top: 10px;
					width: 100%;
					color: #666666;
					border: 1px solid #e7ecf0;
					th {
						background: #f8f9fb;
						line-height: 55px;
					}
					td {
						text-align: center;
						line-height: 55px;
						input {
							width: 70px;
							text-align: center;
							border: 1px solid #E3E3E3;
							margin: 0 5px;
							line-height: 30px;
						}
					}
					tr:nth-child(2n-1) {
						background: #f8f9fb;
					}
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 20px;
			.way {
				clear: both;
				overflow: hidden;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
			}
			.style {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
					margin-right: 10px;
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