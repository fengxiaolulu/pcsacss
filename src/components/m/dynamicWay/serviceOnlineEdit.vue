<template>
	<div class="serviceOnlineEdit">
		<div class="top">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">高级</p>
			<p @click="changetype(3)" :class="{active:typenumber == 3}">浮窗</p>
		</div>
		<div class="one" v-if="typenumber == 1">
			<p class="name">
				<span>模块标题：</span>
				<input type="text" value="在线客服" />
			</p>
			<div class="style">
				<span>模块样式：</span>
				<ul>
					<li @click="oneStyle()">文字</li>
					<li @click="twoStyle()">浮窗</li>
				</ul>
			</div>
			<div class="list">
				<div class="title">
					<span>客服列表：</span>
					<span @click="addServiceB($event,newService)">新增客服</span>
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
							<td>{{table.online_type}}</td>
							<td><input type="text" value="table.online_account" v-model="table.online_account" /></td>
							<td><input type="text" value="table.online_name" v-model="table.online_name" /></td>
							<td>
								<span>工作时间在线</span>
								<!--<el-select v-model="value" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>-->
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
					<tr v-for="(item,idx) in itemMdata.time">
						<td>
							<input type="text" value="item.date_begin" v-model="item.date_begin" />
							<span>至</span>
							<input type="text" value="item.date_end" v-model="item.date_end" />
						</td>
						<td>
							<input type="text" value="item.time_begin" v-model="item.time_begin" />
							<span>至</span>
							<input type="text" value="item.time_end" v-model="item.time_end" />
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="two" v-if="typenumber == 2">
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
					<label for="style1"><img src="/static/image/qq1.gif" /></label>
				</p>
				<p @click="changeicon2">
					<input type="radio" name="style" id="style2" />
					<label for="style2"><img src="/static/image/qq2.gif" /></label>
				</p>
				<p @click="changeicon3">
					<input type="radio" name="style" id="style3" />
					<label for="style3"><img src="/static/image/qq3.gif" /></label>
				</p>
			</div>
		</div>
		<div class="three" v-if="typenumber == 3">
			<div>
				<span>在线咨询：</span>
				<input type="text" value="itemMdata.floatPhone" v-model="itemMdata.floatPhone" />
			</div>
			<div>
				<span>在线QQ：</span>
				<input type="text" value="itemMdata.floatQQ" v-model="itemMdata.floatQQ" />
			</div>
			<div>
				<span>微信公众号：</span>
				<button @click="vbgFun(1)">添加图片</button>
			</div>
			<div>
				<span>个人微信：</span>
				<button @click="vbgFun(2)">添加图片</button>
			</div>
			<div class="set"> 
				<p>
					<span>背景颜色：</span>
					<el-color-picker v-model="itemMdata.fWtyle.backgroundColor" size="medium"></el-color-picker>
				</p>
				<p>
					<span>字体颜色：</span>
					<el-color-picker v-model="itemMdata.fWtyle.color" size="medium"></el-color-picker>
				</p>
				<p>
					<span>悬浮弹窗背景颜色：</span>
					<el-color-picker v-model="itemMdata.fWltyle.backgroundColor" size="medium"></el-color-picker>
				</p>
				<p>
					<span>字体颜色：</span>
					<el-color-picker v-model="itemMdata.fWltyle.color" size="medium"></el-color-picker>
				</p>
			</div>
			<div class="setBorder"> 
				<h3>设置边框：</h3>
				<div>
					<span>宽度：</span>
					<input type="text" v-model="itemMdata.fWtyle.borderBottomWidth"/>
				</div>
				<div>
					<span>颜色：</span>
					<el-color-picker v-model="itemMdata.fWtyle.borderBottomColor" size="medium"></el-color-picker>
				</div>
				<div>
					<span>边框样式：</span>
					<el-select v-model="itemMdata.fWtyle.borderBottomStyle" placeholder="无">
						<el-option v-for="item in boderOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			
		</div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" :append-to-body=true width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-show="flag==1" :itemMdata="itemMdata.imgEditOne"></mImageEdit>
					<mImageEdit v-show="flag==2" :itemMdata="itemMdata.imgEditOne"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="addVisibleNav = false">取 消</el-button>
		    <el-button type="primary" @click="addVisibleFun">保 存</el-button>
		  </span>
		</el-dialog>
		<el-dialog title="新增客服" :modal=false :visible.sync="addService" width="40%">
			<div class="g-cf add_nav_cons" style="margin:20px;">
				<div class="list_con">
					<p>
						<span>栏目：</span>
						<input type="text" v-model="itemMdata.addService.online_type"/>
					</p>
					<p>
						<span>客服账号：</span>
						<input type="text" v-model="itemMdata.addService.online_account"/>
					</p>
					<p>
						<span>显示文字：</span>
						<input type="text" v-model="itemMdata.addService.online_name"/>
					</p>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addService = false">取 消</el-button>
				<el-button type="primary" @click="addServiceBtn">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	import api from '@/api/$ajax.js'
	export default {
		name: 'serviceOnlineEdit',
		components: {
			mImageEdit
		},
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
				addService:false,
				token:this.$route.query.token,
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
				},
				boderOptions:[
					{value: 'none',label: '无'},
					{value: 'solid',label: '实线'},
					{value: 'dashed',label: '虚线'}, 
					{value: 'dotted',label: '点线'}, 
					{value: 'double',label: '双线'}
				],	
				typenumber: '1',
				addVisibleNav: false,
				flag: 1
			}
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
			oneStyle(){
				this.itemMdata.styleShow = '1'
				this.itemMdata.serIdStyle.position = 'relative';
				this.itemMdata.serIdStyle.top = '0px';

				this.itemMdata.editConStyle.left = '0px';
			},
			twoStyle(){
				this.itemMdata.styleShow = '2'

				this.itemMdata.serIdStyle.position = 'fixed';
				this.itemMdata.serIdStyle.right = '10px';
				this.itemMdata.serIdStyle.top = '45%';

				this.itemMdata.editConStyle.right = '10px';
				this.itemMdata.editConStyle.left = '';
				
			},
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
				//console.log(flag)
			},
			addVisibleFun() {
				this.addVisibleNav = false;
			},
			addServiceBtn(){
				this.addService = false;
				
				api.get('/api/data/addKf?token='+this.token+'&type='+this.itemMdata.addService.online_type+'&account='+this.itemMdata.addService.online_account+'&name='+this.itemMdata.addService.online_name+'&view_flag=1',
					true,{},function(data){
						console.log(data)
						//v.itemMdata.time = data.data;
					}
				)
				var v = this;				
				api.get('/api/data/kfList?token='+this.token,
					true,{},function(data){
						//console.log(data)
						v.itemMdata.serviceOnlineTable = data.data;
					}
				)		
			},
			changetype: function(number) {
				this.typenumber = number
			},
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
			addServiceB: function(e, table) {
				e.preventDefault();
				console.log(JSON.stringify(table));
				this.addService = true;
				//var newService = JSON.parse(JSON.stringify(table));
				//this.itemMdata.serviceOnlineTable.push(newService);
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
			.style {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				span {
					width: 70px;
					text-align: right;
					float: left;
					display: block;
					line-height: 30px;
				}
				ul {
					float: left;
					li {
						float: left;
						margin-right: 10px;
						background: #409EFF;
						color: #FFFFFF;
						text-align: center;
						line-height: 30px;
						padding: 0 15px;
						border-radius: 5px;
					}
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
								background: url(/static/image/mbg01.png)no-repeat;
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
		.three {
			box-sizing: border-box;
			padding: 20px;
			div {
				margin-top: 10px;
				margin-bottom: 15px;
				clear: both;
				overflow: hidden;
				span {
					display: block;
					float: left;
					width: 90px;
					text-align: right;
					line-height: 30px;
				}
				input {
					border: 1px solid #E3E3E3;
					line-height: 30px;
					width: 180px;
					padding-left: 10px;
				}
				button {
					background: #409EFF;
					color: #FFFFFF;
					text-align: center;
					line-height: 30px;
					padding: 0 15px;
					border-radius: 5px;
				}
			}
			.set{
				p{
					float:left;

				}
				p:nth-child(3){
					span{
						width:144px;
					}
				}
			}
		}
	}
	.list_con{
		p{
			margin:10px 0;
			input[type=text]{
				border:1px solid #ccc;
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