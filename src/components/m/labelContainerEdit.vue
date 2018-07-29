<template>
	<div class="ateralbelContainerEdit">
		<div class="ateralbelContainerEdittop">
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
					<input type="radio" name="direction" id="direction1" v-model="itemMdata.diretionM" value="1" />
					<label for="direction1">横向</label>
				</p>
				<p>
					<input type="radio" name="direction" id="direction2" v-model="itemMdata.diretionM" value="2" />
					<label for="direction2">纵向</label>
				</p>
			</div>
			<h3>导航条设置：</h3>
			<!--p>
					<span>
						<i>宽度：</i>
						<input type="text" v-model="itemMdata.ulStyle.width" placeholder="100%" />
					</span>
			</p-->
			<div class="g-cf way2 dwt_conw">
				<span>位置：</span>
				<p class="dar_tt">
					<input type="radio" name="setWay" id="setWay1" v-model="itemMdata.setulStyle" value="1" />
					<label for="setWay1">居中</label>
				</p>
				<p class="dar_tt">
					<input type="radio" name="setWay" id="setWay2" v-model="itemMdata.setulStyle" value="2" />
					<label for="setWay2">左对齐</label>
				</p>
				<p class="dar_tt">
					<input type="radio" name="setWay" id="setWay3" v-model="itemMdata.setulStyle" value="3" />
					<label for="setWay3">右对齐</label>
				</p>
					<h3 style="clear: both;">容器设置：</h3>
					<p>
						<span>
							<i>上边距：</i>
							<input type="text" class="dar" v-model="itemMdata.marginStyle.marginTop" placeholder="如12px"/>
						</span>
						<span>
							<i>右边距：</i>
							<input type="text" class="dar" v-model="itemMdata.marginStyle.marginRight" placeholder="如12px"/>
						</span>
						<span>
							<i>下边距：</i>
							<input type="text" class="dar" v-model="itemMdata.marginStyle.marginBottom" placeholder="如12px"/>
						</span>
						<span>
							<i>左边距：</i>
							<input type="text" class="dar" v-model="itemMdata.marginStyle.marginLeft" placeholder="如12px"/>
						</span>
					</p>

					<p style="clear: both;">
						<span>
							<i>宽度：</i>
							<input type="text"class="dar" v-model="itemMdata.ulStyle.width" placeholder="如12px"/>
						</span>
						<!--span>
							<i>高度：</i>     
							<input type="text" v-model="itemMdata.conStyle.height" placeholder="如12px"/>
						</span-->
					</p>
			</div>
			<div class="content">
				<p class="d_t_tit">选择模块：<span class="g-fr addTitle" @click="addTitle(itemMdata)">添加标签</span></p>
				<div class="table">
					<table>
						<tr>
							<th width="25%">模块标题</th>							
							<th width="25%">内容的高度</th>
							<th width="20%">启用</th>
							<th width="20%">排序</th>
							<th width="20%">删除</th>
						</tr>
						<tr v-for="(item,idx) in itemMdata.labelTitle">
							<td>
								<div class="input">
									<input type="text" class="t_hef" v-model="item.labelTitle" placeholder="如12px" />
								</div>
							</td>							
							<td><input type="text" class="wht" v-model="item.conStyle.height" placeholder="如12px" /></td>
							<td>
								<!--span class="yes" @click="changeyes($event,item)"></span-->
								<span :class="['no',{yes:item.is_show}]" @click="changeno($event,item)"></span>
							</td>
							<td>
								<div class="sort">
									<span class="up" v-show="idx != 0" @click="changeup(idx)"></span>
									<span class="down" @click="changedown(idx)"></span>
								</div>
							</td>
							<td><i @click="deleteLabel($event,itemMdata,item,idx)">删除</i></td>
						</tr>

					</table>
				</div>
			</div>
		</div>
		<div class="two" v-show="two_show">
			<div class="effect">
				<span>切换效果：</span>
				<p>
					<input type="radio" name="effect" id="effect1" v-model="itemMdata.labelStyle" value="1" />
					<label for="effect1">滑动</label>
				</p> 
				<p>
					<input type="radio" name="effect" id="effect2" v-model="itemMdata.labelStyle" value="2" />
					<label for="effect2">点击</label>
				</p>
			</div>
			<div class="more">
				<span>显示更多：</span>
				<p @click="itemMdata.more_hid = true">
					<input type="radio" name="more" id="more1" :checked="itemMdata.more_hid == true" />
					<label for="more1">是</label>
				</p>
				<p @click="itemMdata.more_hid = false">
					<input type="radio" name="more" id="more2" :checked="itemMdata.more_hid == false" />
					<label for="more2">否</label>
				</p>
				<div class="more_hid" v-show="itemMdata.more_hid">
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
			<div class="labelCon">
				<div class="labelConSet">
					<h3>标签设置：</h3>
					<div class="radius">
						<span>圆角弧度：</span>
						<div class="block">
							<el-slider v-model="itemMdata.labelTitleStyle.borderRadius"></el-slider>
						</div>
					</div>
					<p>
						<span>
							<i>字体大小：</i>
							<input type="text" v-model="itemMdata.labelTitleStyle.fontSize" placeholder="如12px"/>
						</span>

					</p>
					<p>
						<span>
							<i>默认字体颜色：</i>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.labelTitleStyle.color"></el-color-picker>
						</span>
						<span>
							<i>默认边框颜色：</i>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.labelTitleStyle.borderColor"></el-color-picker>
						</span>

						<span>
							<i>默认背景颜色：</i>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.labelTitleStyle.background"></el-color-picker>
						</span>
					</p>
					<p>
						<span>
							<i>选中字体颜色：</i>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.labelTitleStyleHover.color"></el-color-picker>
						</span>					
						<span>
							<i>选中边框颜色：</i>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.labelTitleStyleHover.borderColor"></el-color-picker>
						</span>
						<span>
							<i>选中背景颜色：</i>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.labelTitleStyleHover.background"></el-color-picker>
						</span>
					</p>

					<p>
						<span>
							<i>宽度：</i>
							<input type="text" v-model="itemMdata.labelTitleStyle.width" placeholder="如12px"/>
						</span>
						<span>
							<i>高度：</i>
							<input type="text" v-model="itemMdata.labelTitleStyle.height" placeholder="如12px"/>
						</span>

					</p>
					<p>
						<span>
							<i>上边距：</i>
							<input type="text" v-model="itemMdata.labelTitleStyle.marginTop" placeholder="如12px"/>
						</span>
						<span>
							<i>右边距：</i>
							<input type="text" v-model="itemMdata.labelTitleStyle.marginRight" placeholder="如12px"/>
						</span>
						<span>
							<i>下边距：</i>
							<input type="text" v-model="itemMdata.labelTitleStyle.marginBottom" placeholder="如12px"/>
						</span>
						<span>
							<i>左边距：</i>
							<input type="text" v-model="itemMdata.labelTitleStyle.marginLeft" placeholder="如12px"/>
						</span>
					</p>
					<!--h3>容器设置：</h3>
					<p>
						<span>
							<i>上边距：</i>
							<input type="text" v-model="itemMdata.zinStyle.marginTop" placeholder="如12px"/>
						</span>
						<span>
							<i>右边距：</i>
							<input type="text" v-model="itemMdata.zinStyle.marginRight" placeholder="如12px"/>
						</span>
						<span>
							<i>下边距：</i>
							<input type="text" v-model="itemMdata.zinStyle.marginBottom" placeholder="如12px"/>
						</span>
						<span>
							<i>左边距：</i>
							<input type="text" v-model="itemMdata.zinStyle.marginLeft" placeholder="如12px"/>
						</span>
					</p>
					
					<p>
						<span>
							<i>宽度：</i>
							<input type="text" v-model="itemMdata.zinStyle.width" placeholder="如12px"/>
						</span>
						<span>
							<i>高度：</i>     
							<input type="text" v-model="itemMdata.conStyle.height" placeholder="如12px"/>
						</span>
					</p-->
					<div class="bg_hid">
						<p>
							<span>内容器背景色：</span>
							<el-color-picker  v-model="itemMdata.layoutOuterStyle.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
						</p>
						<p>
							<button @click="visibleNav(1)">添加内容器背景图片</button>
							<div v-if="itemMdata.mImage0.url" class="on_con">
								<span class="close" @click="beforeRemoveImg(1)"></span>
								<img :src="itemMdata.mImage0.url" />
							</div>
						</p>
						
					</div>
					<div class="bg2_hid">
						<p>
							<span>外容器背景色：</span>
							<el-color-picker show-alpha v-model="itemMdata.zinStyle.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
						</p>
						<p>
							
							<button @click="visibleNav(2)">添加外容器背景图片</button>
							<div v-if="itemMdata.mImage1.url" class="on_con">
								<span class="close" @click="beforeRemoveImg(2)"></span>
								<img :src="itemMdata.mImage1.url" />
							</div>
						</p>
					</div>
					<!---h3>导航条设置：</h3>
					<p>
						<span>
							<i>宽度：</i>
							<input type="text" v-model="itemMdata.ulStyle.width" placeholder="100%"/>
						</span>
					</p-->
					<!--div class="way2">
						<span>位置：</span>
						<p @click="itemMdata.setulStyle=1">
							<input type="radio" name="setWay" id="setWay1" :checked="itemMdata.setulStyle==1"/>
							<label for="setWay1">居中</label>
						</p>
						<p @click="itemMdata.setulStyle=2">
							<input type="radio" name="setWay" id="setWay2" :checked="itemMdata.setulStyle==2"/>
							<label for="setWay2">左对齐</label>
						</p>
						<p @click="itemMdata.setulStyle=3">
							<input type="radio" name="setWay" id="setWay3" :checked="itemMdata.setulStyle==3"/>
							<label for="setWay3">右对齐</label>
						</p>
					</div-->
				</div>
			</div>

		</div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" :itemMdata="itemMdata.mImage0" v-on:recoent="recoent"></mImageEdit>
					<mImageEdit v-if="flag==2" :itemMdata="itemMdata.mImage1" v-on:recoent="recoent"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisibleNav = false">取 消</el-button>
				<el-button type="primary" @click="addVisibleNav=false">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
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
				labelName:'',
				labelBg:'',
				flag: 0,
				addVisibleNav: false,
				labelSetShow:false,
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
				more_hid: true,
				way_hid1: true,
				way_hid2: false
			}
		},
		components: {
			mImageEdit
		},
		created() {
			//console.log(2);
			this.itemMdata.ulStyle = this.itemMdata.ulStyle || {};
			//console.log(this.itemMdata);
		},
		methods: {
			beforeRemoveImg(flag) {
				//console.log(this.flag)
				if(flag == 2) {
					this.itemMdata.zinStyle.backgroundImage = '';
					this.itemMdata.mImage1.url = "";
				} else {
					this.itemMdata.layoutOuterStyle.backgroundImage = '';
					this.itemMdata.mImage0.url = "";
				}
				//return this.$confirm(`确定移除 ${ file.name }？`);
			},
			visibleNav(i) {
				this.flag = i;				
				this.addVisibleNav = true;
			},
			recoent(i) {
				console.log(i);
				if(this.flag == 2) {
					this.itemMdata.zinStyle.backgroundImage = 'url("' + i.url + '")';
				} else {
					this.itemMdata.layoutOuterStyle.backgroundImage = 'url("' + i.url + '")';
				}
			},
			deleteLabel(oEvent, i, list, index) {
				oEvent.stopPropagation();
				var ind = i.labelTitle.indexOf(list);
				//i.curItem = i.labelTitle[ind+1].curTtem,
				//console.log(i.labelTitle[ind+1].curTtem);
				i.labelTitle.splice(ind, 1);

			},
			changeyes: function(e,table) {
				table.is_show = 0;
				//this.getData(table.id,table.is_open);
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
			changeno: function(e, item) {
				item.is_show = item.is_show == 1?0:1;
			//	console.log(item.is_show);
			//	var table2 = document.querySelector('.table');
			//	var list = table2.querySelectorAll('tr');
				/*for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						$(this).find(".yes").css({
							"display": "block"
						});
						$(this).find(".no").css({
							"display": "none"
						});
					}
				}*/
			},
			changeup: function(index) {
				this.itemMdata.labelTitle.splice(index - 1, 0, (this.itemMdata.labelTitle[index]));
				this.itemMdata.labelTitle.splice(index + 1, 1);
			},
			changedown: function(index) {
				this.itemMdata.labelTitle.splice(index + 2, 0, (this.itemMdata.labelTitle[index]));
				this.itemMdata.labelTitle.splice(index, 1);
				if(index == this.itemMdata.labelTitle.length - 1) {
					alert("已经是最后一项啦！");
				}
			},
			editCon(idx, item) {
				this.labelSetShow = true;
			},
			wayhid: function() {
				this.way_hid1 = true;
				this.way_hid2 = false;
			},
			wayhid2: function() {
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
			addTitle(i) {
				var newlabelTitle = {
					labelTitle: "标签" + (i.labelTitle.length + 1),
					curItem: i.labelTitle.length,
					cur: false,
					is_show: 1,
					conStyle: {
						paddingTop: '0',
						paddingLeft: '0',
						paddingRight: '0',
						paddingBottom: '0',
						borderWidth: '0',
						height: "220px"
					},
					lblClass: "long_i1",
					itemInner: []
				}
				i.labelTitle.push(newlabelTitle);
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
	.dwt_conw {
		.dar_tt{
			float: left;
		}
		p {			
			margin-left: 30px;
		}
		span{
			float: left;
		}
		input.dar{
			border: 1px solid #E3E3E3;
		    padding-left: 10px;
		    width: 40px;
		    margin-bottom: 7px;
		    line-height: 28px;
		}
	}
	.addTitle {
		background: #409EFF;		
		color: #FFFFFF;
		font-size: 12px;
		padding: 2px 5px;
		border-radius: 5px;
		margin-left: 5px;
	}
	.ateralbelContainerEdit {
		height: 470px;
		.ateralbelContainerEdittop {
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
				.d_t_tit{ overflow: hidden; margin-bottom: 10px;}		
				.table {
					height: 180px;
					overflow: auto;
					border: 1px solid #e7ecf0;
					table {
						width: 100%;
						color: #666666;
						th {
							background: #f8f9fb;
							line-height: 40px;
						}
						td {
							text-align: center;
							line-height: 40px;
							.t_hef {
								border: 1px solid #E3E3E3;
								width: 100px;
								padding-left: 10px;
								line-height: 30px;
							}
							i{
								color: #409EFF;
								cursor: pointer;
							}
							.wht {
								border: 1px solid #E3E3E3;
								width: 50px;
								padding-left: 10px;
								line-height: 30px;
							}
							
							.no {
								display: block;
								width: 16px;
								height: 16px;
								background: url(/static/image/bg01.png)no-repeat;
								background-position: -1441px -322px;
								margin-left: 45%;
							}
							.yes {
								display: block;
								width: 16px;
								height: 16px;
								background: url(/static/image/bg01.png)no-repeat;
								background-position: -1405px -322px;
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
		}
		.two {
			box-sizing: border-box;
			padding: 20px;
			height: 420px;
			overflow-x: hidden;
			.effect {
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
			.more {
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
				.more_hid {
					clear: both;
					overflow: hidden;
					.way {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						.way_hid {
							clear: both;
							overflow: hidden;
							margin-top: 20px;
							p {
								margin-left: 0;
								float: none;
								margin-top: 15px;
								line-height: 40px;
								input {
									border: 1px solid #E3E3E3;
									width: 205px;
									line-height: 40px;
									padding-left: 10px;
									border-radius: 5px;
								}
							}
						}
					}
					.way2 {
						margin-top: 15px;
					}
				}
			}
			.labelCon {
				ul {
					li {
						span {
							display: inline-block;
							padding-left: 20px;
						}
						input[type=text] {
							border: 1px solid #ccc;
						}
					}
				}
				.labelConSet {
					p {
						margin: 10px;
						span {
							input[type=text] {
								width: 60px;
								border: 1px solid #ccc;
							}
						}
					}
					.way2 {
						p {
							display: inline-block;
						}
					}
					.radius {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						line-height: 40px;
						display: flex;
						span {
							float: left;
						}
						.block{
							width: 100px;
							margin-left: 10px;
						}				
					}
					.bg_hid {
						clear: both;
						overflow: hidden;
						p {
							float: left;
							margin-top: 10px;
							line-height: 30px;
							button {
								border: 1px solid #E3E3E3;
								text-align: center;
								padding: 2px 10px;
							}
							input {
								border: 1px solid #E3E3E3;
								text-align: center;
								width: 60px;
								line-height: 30px;
							}
							
						}
						.on_con{
							position:relative;
							width:100px;		
							height:100px;
							float:left;
							img{
								width:100px;		
								height:100px;
							}
							.close {
								position: absolute;
								right: 0;
								top: 0;
								width: 16px !important;
								height: 15px;
								background:url(/static/image/iconIndex2.png) -1037px 218px;
								display: none;
							}
						}
						
						.on_con:hover .close {
							display: block;
						}
					}
					.bg2_hid {
						clear: both;
						overflow: hidden;
						margin-top:10px;
						.on_con{
							width:100px;		
							height:100px;
							position:relative;
							float:left;
							img{
								width:100px;		
								height:100px;
							}
							.close {
								position: absolute;
								right: 0;
								top: 0;
								width: 25px !important;
								height: 25px;
								background:url(/static/image/iconIndex2.png) -1028px 218px;
								display: none;
							}
						}
						
						.on_con:hover .close {
							display: block;
						}
						p {
							float: left;
							margin-top: 10px;
							line-height: 30px;
							button {
								border: 1px solid #E3E3E3;
								text-align: center;
								padding: 2px 5px;
								color: #666666;
							}
							input {
								border: 1px solid #E3E3E3;
								text-align: center;
								width: 60px;
							}
							
							
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