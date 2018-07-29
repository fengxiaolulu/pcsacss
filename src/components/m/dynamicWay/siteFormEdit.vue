<template>
	
	<div class="siteFormEdit">
	
		<div class="top">
			<p @click="oneshow" :class="{active:one_show}">常规</p>
			<p @click="twoshow" :class="{active:two_show}">高级</p>
			<p @click="thridshow" :class="{active:thrid_show}">表单样式</p>
		</div>
		<div class="one" v-show="one_show">
			<p class="name">
				<span>模块标题：</span>
				<input type="text" v-model="itemMdata.formTitle.name" />
			</p>
			
			<div class="show">
				<span>选项展示方式：</span>
				<ul>
					<li @click="showone">
						<div class="show_one"></div>
					</li>
					<li @click="showtwo">
						<div class="show_two"></div>
					</li>
				</ul>
			</div>
			<div class="arrange">
				<span>选项排列方式：</span>
				<ul>
					<li @click="arrangeone">
						<div class="arrange_one"></div>
					</li>
					<li @click="arrangetwo">
						<div class="arrange_two"></div>
					</li>
				</ul>
			</div>
			<div class="way">
				<span>提交后跳转方式：</span>
				<p @click="way_hid = false">
					<input type="radio" name="way" id="way1" checked="checked" />
					<label for="way1">默认</label>
				</p>
				<p @click="way_hid = true">
					<input type="radio" name="way" id="way2" checked="checked" />
					<label for="way2">自定义</label>
				</p>
				<div class="way_hid" v-show="way_hid">
					<p>
						<span>链接地址：</span>
						<input type="text" />
					</p>
					<button>设置链接</button>
				</div>
			</div>
			<div class="formType">
				<p>
					<span>表单主题：</span>
				</p>
				<div class="formBox">
					<p v-for="(item,idx) in itemMdata.onlineFormTitle">
						<input type="radio" @click="chooseForm(item)" name="choose" :id="'choose'+idx" :checked="itemMdata.formTitle.name == item.form_name"/>
						<span>{{item.form_name}}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="two" v-show="two_show">
			<p>编辑表单栏目：</p>
			<div class="table">
				<table>
					<tr>
						<th>名称</th>
						<th>操作</th>
						<th>排序</th>
					</tr>
					<tr v-for="(table,index) in itemMdata.onlineFormMsg">
						<td>{{table.name}}</td>
						<td>
							<span class="yes" @click="changeyes($event,table)"></span>
							<span class="no" @click="changeno($event,table)"></span>
						</td>
						<td>
							<div class="sort">
								<span class="up" v-show="index != 0" @click="changeup(index)"></span>
								<span class="down" @click="changedown(index)"></span>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="thrid" v-show="thrid_show">
			
			<div class="serBorder">
				<h3>标题设置</h3>
				<p>
					<label for="colorT">行高：</label>
					<input type="text" v-model="itemMdata.titleStyle.lineHeight"/>
				</p>
				<p>
					<label for="colorT">字体大小：</label>
					<input type="text" v-model="itemMdata.titleStyle.fontSize"/>
				</p>
				<p>
					<label for="colorT">字体颜色：</label>
					<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.titleStyle.color"></el-color-picker>
				</p>
				<p @click="bold">
					<span>加粗：</span>
					<input type="checkbox" />
				</p>
			</div>
			<div class="serBorder">
				<h3>表单项设置</h3>
				<p>
					<label for="colorT">宽度：</label>
					<input type="text" v-model="itemMdata.spanStyle.width"/>
				</p>
				<p>
					<label for="colorT">行高：</label>
					<input type="text" v-model="itemMdata.spanStyle.lineHeight"/>
				</p>
				<p>
					<label for="colorT">字体大小：</label>
					<input type="text" v-model="itemMdata.spanStyle.fontSize"/>
				</p>
				<p>
					<label for="colorT">字体颜色：</label>
					<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.spanStyle.color"></el-color-picker>
				</p>
				<p @click="bold">
					<span>加粗：</span>
					<input type="checkbox" />
				</p>
				<div class="set">
					<span>对齐方式：</span>
					<p @click="itemMdata.spanStyle.textAlign = 'center'">
						<input type="radio" name="set6" id="set6_1" :checked="itemMdata.spanStyle.textAlign == 'center'" />
						<label for="set6_1">居中</label>
					</p>
					<p @click="itemMdata.spanStyle.textAlign = 'left'">
						<input type="radio" name="set6" id="set6_2" :checked="itemMdata.spanStyle.textAlign == 'left'" />
						<label for="set6_2">左对齐</label>
					</p>
					<p @click="itemMdata.spanStyle.textAlign = 'right'">
						<input type="radio" name="set6" id="set6_3" :checked="itemMdata.spanStyle.textAlign == 'right'" />
						<label for="set6_3">右对齐</label>
					</p>
				</div>
			</div>
			<div>
				<h3>输入框设置</h3>
				<div class="serBorder">
					<label>上边距:</label><input type="text" v-model="itemMdata.inputStyle.marginTop"/>
					<label>下边距:</label><input type="text" v-model="itemMdata.inputStyle.marginBottom"/>
					<label>右边距:</label><input type="text" v-model="itemMdata.inputStyle.marginRight"/>
					<label>左边距:</label><input type="text" v-model="itemMdata.inputStyle.marginLeft"/>
				</div>
				<div class="serBorder">
					<p>
						<label for="colorT">宽度：</label>
						<input type="text" v-model="itemMdata.inputStyle.width"/>
					</p>
					<p>
						<label for="colorT">行高：</label>
						<input type="text" v-model="itemMdata.inputStyle.lineHeight"/>
					</p>
					<p>
						<label for="colorT">字体大小：</label>
						<input type="text" v-model="itemMdata.inputStyle.fontSize"/>
					</p>
					<p>
						<label for="colorT">字体颜色：</label>
						<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.inputStyle.color"></el-color-picker>
					</p>
					<div class="setBg">
						<span>输入框背景颜色:</span>
						<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.inputStyle.backgroundColor"></el-color-picker>
					</div>
					<div class="setBorder">
						<span>上边框:</span>
						<label>宽度</label><input type="text" v-model="itemMdata.inputStyle.borderTopWidth"/>
						<p>
							<label>颜色</label><el-color-picker show-alpha color-format="rgb" v-model="itemMdata.inputStyle.borderTopColor"></el-color-picker>
						</p>
						<span>下边框:</span>
						<label>宽度</label><input type="text" v-model="itemMdata.inputStyle.borderBottomWidth"/>
						<p>
							<label>颜色</label>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.inputStyle.borderBottomColor"></el-color-picker>
						</p>
						<span>左边框:</span>
						<label>宽度</label><input type="text" v-model="itemMdata.inputStyle.borderLeftWidth"/>
						<p><label>颜色</label><el-color-picker show-alpha color-format="rgb" v-model="itemMdata.inputStyle.borderLeftColor"></el-color-picker></p>
						<span>右边框:</span>
						<label>宽度</label><input type="text" v-model="itemMdata.inputStyle.borderRightWidth"/>
						<p><label>颜色</label><el-color-picker show-alpha color-format="rgb" v-model="itemMdata.inputStyle.borderRightColor"></el-color-picker></p>
					</div>
				</div>
				<span>边框样式：</span>
				<el-select v-model="itemMdata.inputStyle.borderStyle" placeholder="无">
					<el-option v-for="item in boderOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
	</div>

</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import api from '@/api/$ajax.js'
	export default {
		name: 'siteFormEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false,
				one_show: true,
				two_show: false,
				thrid_show:false,
				color1: '#409EFF',
				width_hid: true,
				way_hid: true,
				boldCur:false,
				spanCur:false,
				token: this.$route.query.token,
				boderOptions:[
					{value: 'none',label: '无'},
					{value: 'solid',label: '实线'},
					{value: 'dashed',label: '虚线'}, 
					{value: 'dotted',label: '点线'}, 
					{value: 'double',label: '双线'}
				]	
			}
		},
		
		created() {
			console.log(this.itemMdata);
			//this.getData();
		},
		methods: {
			bold:function() {
				this.boldCur = !this.boldCur;
				this.itemMdata.titleStyle.fontWeight = this.boldCur ? 'bold' : 'normal';
				
			},
			spanBold(){
				this.spanCur = !this.spanCur;
				this.itemMdata.spanStyle.fontWeight = this.spanCur ? 'bold' : 'normal';
			},
			chooseForm(item){
				//this.itemMdata.toBack = item.id;
				this.itemMdata.formTitle.name = item.form_name;
				this.itemMdata.formTitle.btnName = item.button_name;
				this.itemMdata.formTitle.id = item.id;

				var v = this;
				api.get('/api/data/formItem?token='+this.token+'&id='+item.id,
					true,{}, function(data) {
						console.log(data);
						v.itemMdata.onlineFormMsg = data.data;
					}
				);
			},
			getData(idx,isOpen){
				var v = this;				
				api.get('/api/data/setFormItemShowFlag?token='+this.token+'&id='+idx+'&is_show='+isOpen,
					true,{}, function(data) {
						console.log(data);					
					}
				);
			},
			oneshow: function() {
				this.one_show = true;
				this.two_show = false;
				this.thrid_show = false;
			},
			twoshow: function() {
				this.one_show = false;
				this.two_show = true;
				this.thrid_show = false;
			},
			thridshow(){
				this.one_show = false;
				this.two_show = false;
				this.thrid_show = true;
			},
			changeyes: function(e,table) {
				table.is_open = 0;
				this.getData(table.id,table.is_open);
				var table2 = document.querySelector('.table');
				var list = table2.querySelectorAll('tr');
				for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						$(this).find(".yes").css({
							"display": "none"
						});
						$(this).find(".no").css({
							"display": "block"
						});
					}
				}
			},
			changeno: function(e,table) {
				table.is_open = 1;
				this.getData(table.id,table.is_open);
				var table2 = document.querySelector('.table');
				var list = table2.querySelectorAll('tr');
				for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						$(this).find(".yes").css({
							"display": "block"
						});
						$(this).find(".no").css({
							"display": "none"
						});
					}
				}
			},
			changeup: function(index) {
				this.itemMdata.onlineFormMsg.splice(index - 1, 0, (this.itemMdata.onlineFormMsg[index]));
				this.itemMdata.onlineFormMsg.splice(index + 1, 1);
			},
			changedown: function(index) {
				this.itemMdata.onlineFormMsg.splice(index + 2, 0, (this.itemMdata.onlineFormMsg[index]));
				this.itemMdata.onlineFormMsg.splice(index, 1);
				if(index == this.itemMdata.onlineFormMsg.length - 1) {
					alert("已经是最后一项啦！");
				}
			},
			arrangeone: function() {
				this.itemMdata.pStyle.float = 'left';
				this.itemMdata.pStyle.width = '48%';
				this.itemMdata.pStyle.margin = '10px 5px';
				this.itemMdata.pStyle.clear = 'none';
				this.itemMdata.inputStyle.width = '75%';
			},
			arrangetwo: function() {
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.margin = '10px 5px';
				this.itemMdata.pStyle.clear = 'both';
				this.itemMdata.inputStyle.width = '88%';
			},
			showone: function() {
				this.itemMdata.spanStyle.float = 'left';
				this.itemMdata.spanStyle.width = '90px';
				this.itemMdata.spanStyle.display = 'block';
				this.itemMdata.spanStyle.textAlign = 'left';
				this.itemMdata.inputStyle.float = 'none';
				this.itemMdata.inputStyle.width = '90%';
			},
			showtwo: function() {
				this.itemMdata.spanStyle.float = 'left';
				this.itemMdata.spanStyle.width = '90px';
				this.itemMdata.spanStyle.textAlign = 'right';
				this.itemMdata.inputStyle.float = 'left';
				this.itemMdata.inputStyle.width = '75%';
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.siteFormEdit {
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
			height:460px;
			overflow-x:hidden;
			
			.formType{
				p{
					text-align:left;
					.fl{
						display:inline-block;
						float:right;
						button{
							border:1px solid #ccc;
							padding:0 10px;
						}
					}
				}
				.formBox{
					border:1px solid #ccc;
					width:100%;
					margin-top:20px;
					padding-left:20px;
					box-sizing:border-box;
					P{
						margin:10px 0;
					}
				}
			}
			.name {
				clear: both;
				overflow: hidden;
				span {
					float: left;
					width: 120px;
					text-align: right;
				}
				input {
					border: 1px solid #E3E3E3;
					padding-left: 10px;
					line-height: 30px;
				}
			}
			.show {
				clear: both;
				overflow: hidden;
				margin-top: 5px;
				span {
					width: 120px;
					text-align: right;
					float: left;
				}
				ul {
					width: 80%;
					float: left;
					li {
						float: left;
						width: 102px;
						height: 82px;
						border: 1px solid #E3E3E3;
						text-align: center;
						margin-left: 5px;
						margin-right: 15px;
						margin-top: 10px;
						div {
							width: 100%;
							height: 82px;
							background: url(/static/image/mbg02.png)no-repeat;
						}
						.show_one {
							background-position: 0 0;
						}
						.show_two {
							background-position: 0 -99px;
						}
					}
					li:hover {
						border: 1px solid #3a8ee6;
					}
				}
			}
			.arrange {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				span {
					width: 120px;
					text-align: right;
					float: left;
				}
				ul {
					width: 80%;
					float: left;
					li {
						float: left;
						width: 102px;
						height: 82px;
						border: 1px solid #E3E3E3;
						text-align: center;
						margin-left: 5px;
						margin-right: 15px;
						margin-top: 10px;
						div {
							width: 100%;
							height: 82px;
							background: url(/static/image/mbg02.png)no-repeat;
						}
						.arrange_one {
							background-position: 0 -196px;
						}
						.arrange_two {
							background-position: 0 -297px;
						}
					}
					li:hover {
						border: 1px solid #3a8ee6;
					}
				}
			}
			.way {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				span {
					width: 120px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.way_hid {
					clear: both;
					overflow: hidden;
					input {
						border: 1px solid #E3E3E3;
						width: 160px;
						line-height: 30px;
						padding-left: 10px;
					}
					button {
						border: 1px solid #E3E3E3;
						text-align: center;
						padding: 0px 10px;
						line-height: 30px;
						margin-left: 10px;
					}
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 20px;
			.table {
				height: 300px;
				overflow: auto;
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
						.yes {
							display: block;
							width: 16px;
							height: 16px;
							background: url(/static/image/bg01.png)no-repeat;
							background-position: -1405px -322px;
							margin-left: 45%;
						}
						.no {
							display: none;
							width: 16px;
							height: 16px;
							background: url(/static/image/bg01.png)no-repeat;
							background-position: -1441px -322px;
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
								background: url(/static/image/component.png) no-repeat;
								background-position: -635px 0;
							}
							.down {
								float: left;
								display: block;
								margin-left: 8px;
								width: 8px;
								height: 13px;
								background: url(/static/image/component.png) no-repeat;
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
		.thrid{
			box-sizing:border-box;
			padding: 20px;
			height:460px;
			overflow-x:hidden;
			.setBg{
				span{
					line-height:25px;
				}
				div{
					vertical-align: top;
				}
			}
			.setBorder{
				margin-top:10px;
				span{
					margin-right:0px;
				}
				input{
					width:40px;
				}
				p{
					width:130px;
					div{
						margin-right: 0;
					}
				}
			}
			.serBorder{
				margin-top:10px;
				span{
					float:none;
					margin-right:20px;
				}
				input{
					width:60px;
					border:1px solid #ccc;
				}
				p{
					float:none;
					display:inline-block;
					vertical-align:top;
					label{
						line-height:25px;
					}
					div{
						margin-top:0;
						
						vertical-align: top;
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