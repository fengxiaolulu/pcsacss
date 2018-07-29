<template>
	<div class="productShowEdit">
		<div class="top">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">图片特效</p>
			<p @click="changetype(3)" :class="{active:typenumber == 3}">展示设置</p>
			<!--<p @click="changetype(4)" :class="{active:typenumber == 4}">展示参数</p>-->
		</div>
		<div class="one" v-if="typenumber == 1">
			<p class="name">
				<span>模块标题：</span>
				<input type="text" value="产品展示" />
			</p>
			<div class="style">
				<span>模块样式：</span>
				<ul id="style" @click="changeborder">
					<li @click="styleone">
						<img src="../../../../static/image/productList1.jpg" />
						<span class="icon"></span>
					</li>
					<li @click="styletwo">
						<img src="../../../../static/image/productList3.jpg" />
						<span class="icon"></span>
					</li>
					<li @click="stylethree">
						<img src="../../../../static/image/productList2.jpg" />
						<span class="icon"></span>
					</li>
					<li @click="stylefour">
						<img src="../../../../static/image/productList4.jpg" />
						<span class="icon"></span>
					</li>
					<!--<li>
						<img src="../../../static/image/productList5.jpg" />
						<span class="icon"></span>
					</li>-->
					<!--<li>
						<img src="../../../static/image/productList6.jpg" />
						<span class="icon"></span>
					</li>-->
					<li @click="stylefive">
						<img src="../../../../static/image/productList7.jpg" />
						<span class="icon"></span>
					</li>
					<li @click="stylesixth">
						<img src="../../../../static/image/productList8.jpg" />
						<span class="icon"></span>
					</li>
				</ul>
				<div class="style con_page" v-show="onPage">
					<div class="effect">
						<span>是否开启分页：</span>
						<span class="sp">
						<input type="radio" name="direction" id="direction1" v-model="itemMdata.page.isShow" value="1" />
						<label for="direction1">是</label>
					</span>
						<span class="sp">
						<input type="radio" name="direction" id="direction2" v-model="itemMdata.page.isShow" value="0" />
						<label for="direction2">否</label>
					</span>
					</div>
					<div v-show="itemMdata.page.isShow==1" class="effect ac_in">
						<span>每页的条数：</span>
						<input type="text" v-model="itemMdata.page.pageNum" /> 条
					</div>
				</div>
			</div>
			<div class="prolist">
				<div class="type">
					<span>设置产品列表：</span>
					<p @click="changeset(1)">
						<input type="radio" name="type" id="type1" checked="checked" />
						<label for="type1">选择指定产品</label>
					</p>
					<p @click="changeset(2)">
						<input type="radio" name="type" id="type2" />
						<label for="type2">使用筛选条件</label>
					</p>
				</div>
				<div class="type_one" v-if="setnumber == 1">
					<ul class="list">
						<li v-for="(list,index) in itemMdata.productList">
							<p @click="removeList(list)">{{list.name}}</p>
						</li>
					</ul>
					<div class="icon">〉</div>
					<ul class="selected">
						<li v-for="(select,index) in itemMdata.productSelected">
							<span>{{select.name}}</span>
							<span @click="deleteSelect(select)">X</span>
						</li>
					</ul>
				</div>
				<div class="type_two" v-if="setnumber == 2">
					<p>
						<input type="checkbox" id="all" />
						<label for="checkbox1">全部产品</label>
					</p>
					<p v-for="(select,index) in classify">
						<input type="checkbox" id="select.id" value="" />
						<label for="checkbox2">{{select.category_name}}</label>
					</p>
				</div>
			</div>
		</div>
		<div class="two" v-if="typenumber == 2">
			<p>鼠标悬停效果：</p>
			<ul class="effect_style">
				<li @click="mouseenter(1)">
					<div class="effect_one"></div>
				</li>
				<li @click="mouseenter(2)">
					<div class="effect_two"></div>
				</li>
				<li @click="mouseenter(3)">
					<div class="effect_three"></div>
				</li>
				<li @click="mouseenter(4)">
					<div class="effect_four"></div>
				</li>
				<!--<li>
					<div class="effect_five"></div>
				</li>
				<li>
					<div class="effect_sixth"></div>
				</li>
				<li>
					<div class="effect_seven"></div>
				</li>-->
			</ul>
			<div class="effect">
				<p>特效设置</p>
				<div class="effect_info" v-if="itemMdata.mouseenterNumber == 2">
					<span>边框：</span>
					<p @click="border_hid = false">
						<input type="radio" name="mouse_one" id="default" :checked="border_hid == false" />
						<label for="default">默认</label>
					</p>
					<p @click="border_hid = true">
						<input type="radio" name="mouse_one" id="custom" :checked="border_hid == true" />
						<label for="custom">自定义</label>
					</p>
					<ul class="border_hid" v-show="border_hid">
						<li>
							<span>颜色：</span>
							<el-color-picker v-model="itemMdata.hidStyle.borderColor" size="medium"></el-color-picker>
						</li>
						<li>
							<span>宽度：</span>
							<input type="text" value="itemMdata.hidStyle.borderWidth" v-model="itemMdata.hidStyle.borderWidth" />
						</li>
						<li>
							<span>样式：</span>
							<el-select v-model="itemMdata.hidStyle.borderStyle" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</li>
					</ul>
				</div>
				<div class="effect_info" v-if="itemMdata.mouseenterNumber == 4">
					<div class="set">
						<span>背景：</span>
						<p>
							<input type="radio" name="set1" id="set1_1" checked="checked" />
							<label for="set1_1">默认</label>
						</p>
						<p>
							<input type="radio" name="set1" id="set1_2" />
							<label for="set1_2">自定义</label>
						</p>
						<div class="">
							<el-color-picker v-model="itemMdata.hidStyle.background" show-alpha size="medium"></el-color-picker>
						</div>
					</div>
					<div class="set">
						<span>对齐方式：</span>
						<p @click="itemMdata.hidStyle.textAlign = 'center'">
							<input type="radio" name="set6" id="set6_1" :checked="itemMdata.hidStyle.textAlign == 'center'" />
							<label for="set6_1">居中</label>
						</p>
						<p @click="itemMdata.hidStyle.textAlign = 'left'">
							<input type="radio" name="set6" id="set6_2" :checked="itemMdata.hidStyle.textAlign == 'left'" />
							<label for="set6_2">左对齐</label>
						</p>
						<p @click="itemMdata.hidStyle.textAlign = 'right'">
							<input type="radio" name="set6" id="set6_3" :checked="itemMdata.hidStyle.textAlign == 'right'" />
							<label for="set6_3">右对齐</label>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="three" v-if="typenumber == 3">
			<p class="title">基本设置</p>
			<div class="basic">
				<!--<div class="page">
					<span>分页展示：</span>
					<p @click="pagehid1">
						<input type="radio" name="page" id="page1" checked="checked" />
						<label for="page1">是</label>
					</p>
					<p @click="pagehid2">
						<input type="radio" name="page" id="page2" />
						<label for="page2">否</label>
					</p>
				</div>-->
				<!--<div class="page_hid">
					<p v-show="page_hid1">
						<span>每页产品个数：</span>
						<input type="text" value="20" />
					</p>
					<p v-show="page_hid2">
						<span>显示产品个数：</span>
						<input type="text" value="20" />
					</p>
				</div>-->
				<div class="page">
					<span>产品详情：</span>
					<p @click="itemMdata.productDesShow = true">
						<input type="radio" name="des" id="des1" :checked="itemMdata.productDesShow == true" />
						<label for="des1">显示</label>
					</p>
					<p @click="itemMdata.productDesShow = false">
						<input type="radio" name="des" id="des2" :checked="itemMdata.productDesShow == false" />
						<label for="des2">隐藏</label>
					</p>
				</div>
				<div class="page">
					<span>产品名称：</span>
					<p @click="itemMdata.productName = true">
						<input type="radio" name="name" id="name1" :checked="itemMdata.productName == true" />
						<label for="name1">显示</label>
					</p>
					<p @click="itemMdata.productName = false">
						<input type="radio" name="name" id="name2" :checked="itemMdata.productName == false" />
						<label for="name2">隐藏</label>
					</p>
				</div>
				<div class="style">
					<span>名称样式：</span>
					<p>
						<span>字体颜色：</span>
						<input type="text" v-model="itemMdata.pStyle.color" />
					</p>
					<p>
						<span>字体大小：</span>
						<input type="text" v-model="itemMdata.pStyle.fontSize" />
					</p>
				</div>
			</div>
			<p class="title">跳转设置</p>
			<div class="skip">
				<!--<div>
					<span>显示更多：</span>
					<p>
						<input type="radio" name="more" id="more1" checked="checked" />
						<label for="more1">是</label>
					</p>
					<p>
						<input type="radio" name="more" id="more2" />
						<label for="more2">否</label>
					</p>
				</div>-->
				<div>
					<span>详情打开方式：</span>
					<p @click="itemMdata.productList.target = '_self'">
						<input type="radio" name="open" id="open1" :checked="itemMdata.productList.target == '_self'" />
						<label for="open1">当前窗口</label>
					</p>
					<p @click="itemMdata.productList.target = '_blank'">
						<input type="radio" name="open" id="open2" :checked="itemMdata.productList.target == '_blank'" />
						<label for="open2">新窗口</label>
					</p>
				</div>
				<!--<div>
					<span>支持幻灯片：</span>
					<p>
						<input type="radio" name="slide" id="slide1" checked="checked" />
						<label for="slide1">是</label>
					</p>
					<p>
						<input type="radio" name="slide" id="slide2" />
						<label for="slide2">否</label>
					</p>
				</div>-->
				<!--<div>
					<span>点击产品弹出：</span>
					<p>
						<input type="radio" name="popup" id="popup1" checked="checked" />
						<label for="popup1">产品详情页</label>
					</p>
					<p>
						<input type="radio" name="popup" id="popup2" />
						<label for="popup2">幻灯片</label>
					</p>
				</div>-->
				<!--<div>
					<span>详情打开方式：</span>
					<p>
						<input type="radio" name="way" id="way1" checked="checked" />
						<label for="way1">新窗口</label>
					</p>
					<p>
						<input type="radio" name="way" id="way2" />
						<label for="way2">当前窗口</label>
					</p>
				</div>-->
			</div>
			<p class="title">轮播设置</p>
			<div class="page">
				<p>分页器：</p>
				<p @click="itemMdata.swiperPagination=true">
					<label for="pagination1">显示</label>
					<input type="radio" id="pagination1" name="pagination" :checked="itemMdata.swiperPagination == true" />
				</p>
				<p @click="itemMdata.swiperPagination=false">
					<label for="pagination2">隐藏</label>
					<input type="radio" id="pagination2" name="pagination" :checked="itemMdata.swiperPagination == false" />
				</p>
				<div class="page_hid">
					<p class="title">默认样式：</p>
					<p>
						<span>宽：</span>
						<input type="text" value="itemMdata.PaginationStyle.width" v-model="itemMdata.PaginationStyle.width" />
					</p>
					<p>
						<span>高：</span>
						<input type="text" value="itemMdata.PaginationStyle.height" v-model="itemMdata.PaginationStyle.height" />
					</p>
					<p>
						<span>背景颜色：</span>
						<input type="text" value="itemMdata.PaginationStyle.background" v-model="itemMdata.PaginationStyle.background" />
					</p>
					<p>
						<span>边框颜色：</span>
						<input type="text" value="itemMdata.PaginationStyle.borderColor" v-model="itemMdata.PaginationStyle.borderColor" />
					</p>
					<p>
						<span>边框宽度：</span>
						<input type="text" value="itemMdata.PaginationStyle.borderWidth" v-model="itemMdata.PaginationStyle.borderWidth" />
					</p>
					<p class="title">当前样式：</p>
					<p>
						<span>宽：</span>
						<input type="text" value="itemMdata.PaginationActive.width" v-model="itemMdata.PaginationActive.width" />
					</p>
					<p>
						<span>高：</span>
						<input type="text" value="itemMdata.PaginationActive.height" v-model="itemMdata.PaginationActive.height" />
					</p>
					<p>
						<span>背景颜色：</span>
						<input type="text" value="itemMdata.PaginationActive.background" v-model="itemMdata.PaginationActive.background" />
					</p>
					<p>
						<span>边框颜色：</span>
						<input type="text" value="itemMdata.PaginationActive.borderColor" v-model="itemMdata.PaginationActive.borderColor" />
					</p>
					<p>
						<span>边框宽度：</span>
						<input type="text" value="itemMdata.PaginationActive.borderWidth" v-model="itemMdata.PaginationActive.borderWidth" />
					</p>
				</div>
			</div>
			<div class="nav">
				<p>导航按钮：</p>
				<p @click="itemMdata.swiperNavigation=true">
					<label for="navigation1">显示</label>
					<input type="radio" id="navigation1" name="navigation" :checked="itemMdata.swiperNavigation == true" />
				</p>
				<p @click="itemMdata.swiperNavigation=false">
					<label for="navigation2">隐藏</label>
					<input type="radio" id="navigation2" name="navigation" :checked="itemMdata.swiperNavigation == false" />
				</p>
				<div class="nav_hid">
					<p>更改按钮：</p>
					<p class="btn" @click="vbgFun(1)">左边</p>
					<p class="btn" @click="vbgFun(2)">右边</p>
				</div>
			</div>
		</div>
		<!--<div class="four" v-if="typenumber == 4">
			<div class="style">
				<p>参数布局样式：</p>
				<ul>
					<li>
						<img src="../../../../static/image/productList9.jpg" />
					</li>
					<li>
						<img src="../../../../static/image/productList10.jpg" />
					</li>
					<li>
						<img src="../../../../static/image/productList11.jpg" />
					</li>
					<li>
						<img src="../../../../static/image/productList12.jpg" />
					</li>
					<li>
						<img src="../../../../static/image/productList13.jpg" />
					</li>
					<li>
						<img src="../../../../static/image/productList14.jpg" />
					</li>
				</ul>
			</div>
			<div class="text">
				<div class="choose">
					<p>
						<input type="checkbox" id="choose1" checked="checked" />
						<label for="choose1">显示参数名</label>
					</p>
					<p>
						<input type="checkbox" id="choose2" checked="checked" />
						<label for="choose2">自定义参数顺序</label>
					</p>
				</div>
				<div class="table">
					<table>
						<tr>
							<th width="60%">参数名称</th>
							<th width="20%">显示</th>
							<th width="20%">操作</th>
						</tr>
						<tr v-for="(table,index) in itemMdata.productShowTable">
							<td>{{table.name}}</td>
							<td>
								<span class="yes" @click="changeyes($event,table)" v-show="table.show"></span>
								<span class="no" @click="changeno($event,table)" v-show="!table.show"></span>
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
		</div>-->
		<el-dialog title="添加图片" :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" :itemMdata="itemMdata.swiperPrev"></mImageEdit>
					<mImageEdit v-if="flag==2" :itemMdata="itemMdata.swiperNext"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisibleNav = false">取 消</el-button>
				<el-button type="primary" @click="addVisibleFun()">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from './mImageEdit.vue'
	import api from '@/api/$ajax.js'
	export default {
		name: 'productShowEdit',
		props: ['itemMdata'],
		components: {
			mImageEdit
		},
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false,
				page_hid1: true,
				page_hid2: false,
				newProduct: '',
				color: '',
				Show: '',
				noShow: '',
				border_hid: true,
				options: [{
					value: 'solid',
					label: '————'
				}, {
					value: 'dashed',
					label: '············'
				}, {
					value: 'dotted',
					label: '------------'
				}],
				typenumber: '1',
				setnumber: '1',
				token: this.$route.query.token,
				addVisibleNav: false,
				flag: false,
				itemIndex: 0,
				onPage: false,
				classify: []
			}
		},
		created() {
			console.log(this.itemMdata);
			this.getData();
		},
		methods: {
			changetype: function(number) {
				this.typenumber = number
			},
			changeset: function(number) {
				this.setnumber = number
			},
			pagehid1: function() {
				this.page_hid1 = true;
				this.page_hid2 = false;
				this.itemMdata.page = true;
			},
			pagehid2: function() {
				this.page_hid1 = false;
				this.page_hid2 = true;
				this.itemMdata.page = false;
			},
			deleteSelect: function(select) {
				this.itemMdata.productSelected.splice(this.itemMdata.productSelected.indexOf(select), 1);
				this.itemMdata.page.talNum = this.itemMdata.productSelected.length;
			},
			removeList: function(list) {
				var newProduct = JSON.parse(JSON.stringify(list));
				this.itemMdata.productSelected.push(newProduct);
				this.itemMdata.page.talNum = this.itemMdata.productSelected.length;

				//				for(var j = 0; j < this.itemMdata.productDesList.length; j++) {
				//					for(var a = 0; a < this.itemMdata.productSelected.length; a++) {
				//						if(this.itemMdata.productSelected[a].id == this.itemMdata.productDesList[j].id) {
				//							this.itemMdata.inDes = j;
				//						}
				//					};
				//				};
			},
			borderColor: function(index) {
				this.color = index;
			},
			getData() {
				var v = this;
				api.get('/api/data/productList?token=' + this.token, true, {}, function(data) {
					//var result = JSON.stringify(data); //json对象转成字符串
					v.itemMdata.productList = data.data;
					//$("#text").val(result);
				});
				api.get('/api/data/productCategory?token=' + this.token, true, {}, function(data) {
					//var result = JSON.stringify(data); //json对象转成字符串
					v.classify = data.data;
					//$("#text").val(result);
				});
			},
			changeyes: function(e, table) {
				table.show = false;
				/*
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
				}*/
			},
			changeno: function(e, table) {
				table.show = true;
				/*
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
				}*/
			},
			changeup: function(index) {
				this.itemMdata.productShowTable.splice(index - 1, 0, (this.itemMdata.productShowTable[index]));
				this.itemMdata.productShowTable.splice(index + 1, 1);
			},
			changedown: function(index) {
				this.itemMdata.productShowTable.splice(index + 2, 0, (this.itemMdata.productShowTable[index]));
				this.itemMdata.productShowTable.splice(index, 1);
				if(index == this.itemMdata.productShowTable.length - 1) {
					alert("已经是最后一项啦！");
				}
			},
			changeborder: function() {
				var style = document.querySelector('#style');
				var list = style.querySelectorAll('li');
				for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						$(this).addClass("active").siblings().removeClass("active");
					}
				}
			},
			styleone: function() {
				this.itemMdata.styleone = true;
				this.itemMdata.styletwo = false;
				this.itemMdata.stylethree = false;
				this.itemMdata.liStyle.float = 'left';
				this.itemMdata.liStyle.width = '46%';
				this.itemMdata.liStyle.clear = 'none';
				this.itemMdata.liStyle.marginLeft = '5px';
				this.itemMdata.liStyle.marginRight = '5px';
				this.itemMdata.imgStyle2.float = 'none';
				this.itemMdata.imgStyle2.width = 'auto';
				this.itemMdata.imgStyle2.display = 'block';
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.textAlign = 'center';
				this.onPage = true;
				this.itemMdata.page.isShow = 1;
			},
			styletwo: function() {
				this.itemMdata.styleone = false;
				this.itemMdata.styletwo = true;
				this.itemMdata.stylethree = false;
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.textAlign = 'center';
				this.onPage = false;
				this.itemMdata.page.isShow = 0;
			},
			stylethree: function() {
				this.itemMdata.styleone = false;
				this.itemMdata.styletwo = false;
				this.itemMdata.stylethree = true;
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.textAlign = 'center';
				this.onPage = false;
				this.itemMdata.page.isShow = 0;
			},
			stylefour: function() {
				this.itemMdata.styleone = true;
				this.itemMdata.styletwo = false;
				this.itemMdata.stylethree = false;
				this.itemMdata.liStyle.float = 'left';
				this.itemMdata.liStyle.width = '46%';
				this.itemMdata.liStyle.clear = 'none';
				this.itemMdata.liStyle.marginLeft = '5px';
				this.itemMdata.liStyle.marginRight = '5px';
				this.itemMdata.imgStyle2.float = 'left';
				this.itemMdata.imgStyle2.width = '49%';
				this.itemMdata.imgStyle2.display = 'block';
				this.itemMdata.pStyle.float = 'right';
				this.itemMdata.pStyle.width = '49%';
				this.onPage = true;
				this.itemMdata.page.isShow = 1;
			},
			stylefive: function() {
				this.itemMdata.styleone = true;
				this.itemMdata.styletwo = false;
				this.itemMdata.stylethree = false;
				this.itemMdata.liStyle.float = 'none';
				this.itemMdata.liStyle.width = '100%';
				this.itemMdata.liStyle.clear = 'both';
				this.itemMdata.liStyle.marginLeft = '5px';
				this.itemMdata.liStyle.marginRight = '5px';
				this.itemMdata.imgStyle2.float = 'left';
				this.itemMdata.imgStyle2.width = '30%';
				this.itemMdata.imgStyle2.display = 'block';
				this.itemMdata.pStyle.float = 'right';
				this.itemMdata.pStyle.width = '68%';
				this.itemMdata.pStyle.textAlign = 'left';
				this.onPage = true;
				this.itemMdata.page.isShow = 1;
			},
			stylesixth: function() {
				this.itemMdata.styleone = true;
				this.itemMdata.styletwo = false;
				this.itemMdata.stylethree = false;
				this.itemMdata.liStyle.float = 'none';
				this.itemMdata.liStyle.width = '100%';
				this.itemMdata.liStyle.clear = 'both';
				this.itemMdata.liStyle.marginLeft = '5px';
				this.itemMdata.liStyle.marginRight = '5px';
				this.itemMdata.imgStyle2.display = 'none';
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.textAlign = 'left';
				this.onPage = true;
				this.itemMdata.page.isShow = 1;
			},
			mouseenter: function(number) {
				this.itemMdata.mouseenterNumber = number
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.productShowEdit {
		box-sizing: border-box;
		height: 450px;
		overflow: auto;
		.con_page {
			margin-top: 10px;
		}
		.effect {
			clear: both;
			span.sp {
				 display: inline-block; 
				 margin-right: 20px; 
			}
		}
		.ac_in {
			input {
				width: 50px;
				padding-left: 3px;
				margin-right: 5px;
				border: 1px solid #CCC;
			}
		}
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
				padding-bottom: 10px;
				border-bottom: 1px dashed #E3E3E3;
				span {
					float: left;
				}
				ul {
					float: left;
					width: 85%;
					li {
						float: left;
						width: 65px;
						border: 1px solid #E3E3E3;
						text-align: center;
						margin-left: 5px;
						margin-right: 5px;
						margin-top: 10px;
						position: relative;
						.icon {
							background: url(../../../../static/image/mbg01.png) no-repeat;
							background-position: -54px -990px;
							width: 20px;
							height: 20px;
							position: absolute;
							right: -10px;
							top: 25px;
							display: none;
						}
					}
					li:hover {
						border: 1px solid #3a8ee6;
					}
					.active {
						border: 1px solid #3a8ee6;
						.icon {
							display: block;
						}
					}
				}
			}
			.prolist {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				font-size: 12px;
				.type {
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
				.type_one {
					clear: both;
					overflow: hidden;
					.list {
						border: 1px solid #E3E3E3;
						width: 40%;
						height: 230px;
						float: left;
						overflow: auto;
						li {
							box-sizing: border-box;
							line-height: 35px;
							padding-left: 20px;
							padding-right: 20px;
							color: #666666;
							p {
								width: 100%;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}
						li:nth-child(2n) {
							background: #f1f5ff;
						}
						li:hover {
							color: #FFFFFF;
							background: #5874d8;
						}
					}
					.icon {
						display: block;
						width: 10%;
						height: 260px;
						float: left;
						line-height: 260px;
						text-align: center;
						font-size: 34px;
						color: #888888;
						font-weight: lighter;
					}
					.selected {
						float: left;
						width: 40%;
						height: 230px;
						border: 1px solid #E3E3E3;
						overflow: auto;
						li {
							box-sizing: border-box;
							line-height: 35px;
							padding-left: 20px;
							padding-right: 10px;
							color: #666666;
							clear: both;
							overflow: hidden;
							span:nth-child(1) {
								float: left;
								width: 90%;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
							span:nth-child(2) {
								float: right;
								width: 5%;
								font-size: 12px;
								color: #999999;
							}
						}
						li:hover {
							color: #FFFFFF;
							background: #5874d8;
						}
						li:hover span {
							color: #FFFFFF;
						}
					}
				}
				.type_two {
					width: 90%;
					box-sizing: border-box;
					border: 1px solid #E3E3E3;
					padding: 10px;
					height: 230px;
					overflow: auto;
					p {
						float: left;
						margin-left: 10px;
						width: 110px;
						line-height: 35px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 20px;
			.effect_style {
				clear: both;
				overflow: hidden;
				li {
					float: left;
					width: 121px;
					height: 80px;
					border: 1px solid #FFFFFF;
					margin-right: 15px;
					margin-top: 10px;
					margin-bottom: 5px;
				}
				div {
					width: 121px;
					height: 80px;
				}
				.effect_one {
					background: url(../../../../static/image/proeffect1.jpg)no-repeat center;
				}
				.effect_two {
					background: url(../../../../static/image/proeffect2.jpg)no-repeat center;
				}
				.effect_three {
					background: url(../../../../static/image/proeffect3.jpg)no-repeat center;
				}
				.effect_four {
					background: url(../../../../static/image/proeffect4.jpg)no-repeat center;
				}
				.effect_five {
					background: url(../../../../static/image/proeffect5.jpg)no-repeat center;
				}
				.effect_sixth {
					background: url(../../../../static/image/proeffect6.jpg)no-repeat center;
				}
				.effect_seven {
					background: url(../../../../static/image/proeffect7.jpg)no-repeat center;
				}
				li:hover {
					border: 1px solid #3a8ee6;
				}
			}
			.effect {
				margin-top: 20px;
				.effect_info {
					span {
						float: left;
						width: 80px;
						text-align: right;
					}
					p {
						float: left;
						margin-left: 10px;
					}
					.set {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
					}
					.border_hid {
						clear: both;
						overflow: hidden;
						li {
							clear: both;
							overflow: hidden;
							margin-top: 10px;
							input {
								border: 1px solid #E3E3E3;
								line-height: 30px;
								text-align: center;
								width: 70px;
							}
						}
					}
				}
			}
		}
		.three {
			box-sizing: border-box;
			padding: 20px;
			.title {
				background: #F5F5F5;
				padding-left: 10px;
				margin-top: 10px;
			}
			.basic {
				margin-left: 30px;
				.page {
					clear: both;
					overflow: hidden;
					span {
						width: 100px;
						text-align: right;
						float: left;
					}
					p {
						float: left;
						margin-left: 10px;
					}
				}
				.page_hid {
					p {
						input {
							border: 1px solid #E3E3E3;
							width: 70px;
							text-align: center;
							line-height: 25px;
						}
					}
				}
			}
			.skip {
				margin-left: 30px;
				div {
					clear: both;
					overflow: hidden;
					margin-top: 10px;
					span {
						width: 100px;
						text-align: right;
						float: left;
					}
					p {
						float: left;
						margin-left: 10px;
					}
				}
			}
			.page {
				clear: both;
				overflow: hidden;
				line-height: 30px;
				margin-top: 15px;
				margin-left: 30px;
				p {
					float: left;
					label {
						margin-left: 10px;
					}
				}
				.page_hid {
					clear: both;
					overflow: hidden;
					.title {
						float: none;
						clear: both;
						overflow: hidden;
					}
					p {
						margin-left: 15px;
						margin-bottom: 10px;
						input {
							border: 1px solid #E3E3E3;
							width: 70px;
							text-align: center;
							line-height: 30px;
						}
					}
				}
			}
			.style {
				clear: both;
				overflow: hidden;
				line-height: 30px;
				margin-top: 15px;
				margin-left: 30px;
				span {
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
					input {
						border: 1px solid #E3E3E3;
						width: 80px;
						text-align: center;
						line-height: 30px;
					}
				}
			}
			.nav {
				clear: both;
				overflow: hidden;
				line-height: 30px;
				margin-top: 15px;
				margin-left: 30px;
				p {
					float: left;
					label {
						margin-left: 10px;
					}
				}
				.nav_hid {
					clear: both;
					overflow: hidden;
					margin-top: 35px;
					p {
						float: left;
					}
					.btn {
						background: #409EFF;
						color: #FFFFFF;
						text-align: center;
						border-radius: 5px;
						width: 80px;
						line-height: 30px;
						margin-left: 15px;
					}
				}
			}
		}
		.four {
			box-sizing: border-box;
			padding: 20px;
			.style {
				clear: both;
				overflow: hidden;
				ul {
					clear: both;
					overflow: hidden;
					li {
						float: left;
						width: 90px;
						border: 1px solid #E3E3E3;
						text-align: center;
						margin-left: 8px;
					}
					li:hover {
						border: 1px solid #3a8ee6;
					}
				}
			}
			.text {
				.choose {
					clear: both;
					overflow: hidden;
					p {
						float: left;
						margin-right: 10px;
						margin-top: 15px;
					}
				}
				.table {
					height: 200px;
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
							.input {
								width: 50%;
								margin-left: 25%;
								input {
									width: 100%;
									text-overflow: ellipsis;
									border: 1px solid #E3E3E3;
								}
							}
							.yes {
								display: block;
								width: 16px;
								height: 16px;
								background: url(../../../../static/image/bg01.png)no-repeat;
								background-position: -1405px -322px;
								margin-left: 45%;
							}
							.no {
								display: block;
								width: 16px;
								height: 16px;
								background: url(../../../../static/image/bg01.png)no-repeat;
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
									background: url(../../../../static/image/component.png) no-repeat;
									background-position: -635px 0;
								}
								.down {
									float: left;
									display: block;
									margin-left: 8px;
									width: 8px;
									height: 13px;
									background: url(../../../../static/image/component.png) no-repeat;
									background-position: -651px 0;
								}
							}
						}
						.state {
							.yes {
								display: none;
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