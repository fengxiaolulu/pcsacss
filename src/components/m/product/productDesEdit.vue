<template>
	<div>
		<div class="productDesEdite" v-if="itemMdata.isPro==true">
			<div class="top">
				<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
				<p @click="changetype(2)" :class="{active:typenumber == 2}">展示参数</p>
				<p @click="changetype(3)" :class="{active:typenumber == 3}">展示设置</p>
			</div>
			<div class="detail">
				<div class="one  navShow" v-if="typenumber == 1">
					<p class="name">
						<span>模块标题：</span>
						<input type="text"  v-model="itemMdata.tText"/>
					</p>
					<div class="style">
						<p>模块样式：</p>
						<ul id="style">
							<li  v-for="(item,idx) in itemMdata.productDesEditeImg" @click="desImg(idx)">
								<img :src="item" />
								<span class="icon"></span>
							</li>
						</ul>
					</div>
					<div class="content">
						<p>模式颜色：</p>
						<p @click="oneSet(1)">
							<input type="radio" name="set1" id="set1_1" checked="checked" />
							<label for="set1_1">默认</label>
						</p>
						<p @click="oneSet(2)">
							<input type="radio" name="set1" id="set1_2" />
							<label for="set1_2">自定义</label>
						</p>
						<div class="colorStyle" v-if="onenumber=='2'">
							<el-color-picker show-alpha color-format="rgb" size="medium" v-model="itemMdata.productShowTable[0].priceStyle.color"></el-color-picker>
						</div>
					</div>
					<div class="share">
						<p>开启分享：</p>
						<p @click="twoSet(1)">
							<input type="radio" name="set2" id="set2_1" checked="checked" />
							<label for="set1_1">是</label>
						</p>
						
						<p @click="twoSet(2)">
							<input type="radio" name="set2" id="set2_2" />
							<label for="set1_2">否</label>
						</p>
						
					</div>
					<div class="desTitle">
						<ul class="bgUl">
							<li><span>产品信息</span></li>
							<li><span>标题</span></li>
							<li><span>开启</span></li>
							<li><span>操作</span></li>
						</ul>
						<ul>
							<li><i>产品详情</i></li>
							<li><input type="text" value="itemMdata.baseTitle" v-model="itemMdata.baseTitle"/></li>
							<li  @click="openSet($event)">
								<a class="open" title="开启" v-if="itemMdata.open ==true"></a>
								<a class="no" title="关闭" v-if="itemMdata.open ==false"></a>
							</li>
							<li><i class="moveUp"></i><i class="moveDown"></i></li>
						</ul>
					</div>
				</div>
				<div class="two navShow" v-if="typenumber == 2">
					<input type="checkbox" checked/> <span>自定义参数顺序</span>
					<p>选择产品参数：(如果没有填写参数值，详情页将不显示该参数)</p>
					<div class="table">
						<table>
							<tr>
								<th width="60%">参数名</th>
								<th width="20%">显示</th>
								<th width="20%">操作</th>
							</tr>
							<tr v-for="(table,index) in itemMdata.productShowTable">
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
				<div class="three navShow" v-if="typenumber == 3">
					<div class="baseSet">
						<div class="title">
							<span>基本设置</span>
						</div>
						<div class="support">
							<p>支持上/下一个：</p>
							<p>
								<input type="radio" name="set10" id="set10_1" checked="checked" @click="btnSh"/>
								<label for="set10_1">是</label>
							</p>
							
							<p>
								<input type="radio" name="set10" id="set10_2"  @click="btnHid"/>
								<label for="set10_2">否</label>
							</p>
						</div>
						<div class="support">
							<p>上/下一个标题：</p>
							<p>
								<input type="radio" name="set2" id="set2_1" checked="checked" />
								<label for="set2_1">显示</label>
							</p>
							<p>
								<input type="radio" name="set2" id="set2_2" />
								<label for="set2_2">隐藏</label>
							</p>
						</div>
						<div class="support">
							<p>参数宽度：</p>
							<p @click="threeSet(1)">
								<input type="radio" name="set3" id="set3_1" checked="checked" />
								<label for="set3_1">默认</label>
							</p>
							
							<p @click="threeSet(2)">
								<input type="radio" name="set3" id="set3_2" />
								<label for="set3_2">自定义</label>
							</p>
							<p v-if="threenumber==2">
								<input class="w" type="text" value="0" v-model="itemMdata.nameStyle.width"/><span>px</span>
							</p> 
						</div>
						<div class="support">
							<p>产品参数位置：</p>
							<p>
								<input type="radio" name="set4" id="set4_1" checked="checked" />
								<label for="set4_1">上方</label>
							</p>
							<p>
								<input type="radio" name="set4" id="set4_2" />
								<label for="set4_2">下方</label>
							</p>
						</div>
						<div class="support">
							<p>在线客服：</p>
							<p @click="fourSet(1)">
								<input type="radio" name="set5" id="set5_1" checked="checked" />
								<label for="set5_1">开启</label>
							</p>
							<p @click="fourSet(2)">
								<input type="radio" name="set5" id="set5_2" />
								<label for="set5_2">关闭</label>
							</p>
							<div class="open" v-if="fournumber==1">
								<button>编辑在线客服</button>
							</div>
						</div>
					</div>
					<div class="imgSet">
						<div class="title">
							<span>图片设置</span>
						</div>
						<div class="zoom">
							<p>开启图片放大效果：</p>
							<p>
								<input type="radio" name="set6" id="set6_1" checked="checked" />
								<label for="set6_1">是</label>
							</p>
							
							<p>
								<input type="radio" name="set6" id="set6_2" />
								<label for="set6_2">否</label>
							</p>
						</div>
						<div class="zoom">
							<p>点击图片弹出大图：</p>
							<p>
								<input type="radio" name="set7" id="set7_1" checked="checked" />
								<label for="set7_1">是否</label>
							</p>
							<p>
								<input type="radio" name="set7" id="set7_2" />
								<label for="set7_2">隐藏</label>
							</p>
						</div>
						<div class="zoom">
							<p>图片大小：</p>
							<p>
								<input type="radio" name="set8" id="set8_1" checked="checked" />
								<label for="set8_1">默认</label>
							</p>
							<p>
								<input type="radio" name="set8" id="set8_2" />
								<label for="set8_2">自定义</label>
							</p>
							<div>
								<label for="set8_2">宽：</label>
								<input type="text" name="set8" id="set8_2" />
								<label for="set8_2">高：</label>
								<input type="text" name="set8" id="set8_2" />
							</div>
						</div>
						<div  class="zoom">
							<p>图片边框：</p>
							<p>
								<input type="radio" name="set9" id="set9_1" checked="checked" />
								<label for="set9_1">显示</label>
							</p>
							<p>
								<input type="radio" name="set9" id="set9_2" />
								<label for="set9_2">隐藏</label>
							</p>
						</div>
					</div>
				</div>	
			</div>
		</div>
		<div class="proEdite"  v-if="itemMdata.isPro==false">
			<div class="top">
				<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
				<p @click="changetype(2)" :class="{active:typenumber == 2}">高级</p>
				<p @click="changetype(3)" :class="{active:typenumber == 3}">百度优化</p>
			</div>
			<div class="detail navShow">
				<div class="one clearfloat" v-if="typenumber == 1">
					<div class="leftDiv fl">
						<p><span>产品名称：</span><input type="text" v-model="itemMdata.goodsName"/></p>
						<p><span>产品分类：</span>
							<input type="button" value="分类1"/>
							<input type="button" value="+"/>
							<input type="button" value="管理分类"/>
						</p>
						<div class="param">
							<h3>产品参数</h3>
							<input type="button" value="管理参数" class="fr"/>
						</div>
						<p>
							<span>价格：</span>
							<input type="text" v-model="itemMdata.productShowTable[0].price"/>
						</p>
						<p>
							<span>编号：</span>
							<el-autocomplete popper-class="my-autocomplete" v-model="itemMdata.value4" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect">
								<i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
								<template slot-scope="{ item }">
									<div class="name">{{ item.value }}</div>
									
								</template>
							</el-autocomplete>
						</p>
						
					</div>
					
					<div class="rightDiv fr">
						<div class="imgDiv"  @click="visibleNav()" v-if="itemMdata.sibleItem.length==0"></div>
						<div class="imgDivList">
							<span v-for = "i in itemMdata.sibleItem" class="con_img">
								<img width="100" height="100" :src="i" />
								<i class="hid" @click="delData(i)">X</i>
							</span>
						</div>
						<div class="imgDivHid" v-if="itemMdata.sibleItem.length>0"  @click="visibleNav()"></div>
					</div>
				</div>
				<div class="two" v-if="typenumber == 2">
					<div class="components-container">
						<div class="editor-container">
							<UE :defaultMsg="itemMdata.productDesList.content" :config=config ref="ue"></UE>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">					
					<mImageEdit :itemMdata="itemMdata.mImage" v-on:recoent="recoent"></mImageEdit>
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
	import VueDraggableResizable from 'vue-draggable-resizable'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	import UE from '@/components/m/ueditor.vue'
	export default {
		name: 'productDes',
		components: {
			UE,
			VueDraggableResizable,
			mImageEdit
		//	uiDialog
		},
		props: ['itemMdata', "posCom", 'index'],
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				config: {
					serverUrl: "https://jsonplaceholder.typicode.com/posts/",
					initialFrameWidth: null,
					initialFrameHeight: 180
				},
				addVisibleNav: false,
				token:this.$route.query.token,
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					isEdit:true,
					rTitle: '编辑产品详情',
				},
				marginleft: '',
				marginleft2: '',
				currentIndex: 0,
				currentIndex2: 0,
				productDesId: "productDes" + this.posCom + this.index,
				typenumber: '1',
				onenumber:'1',
				twonumber:'1',
				threenumber:'1',
				fournumber:'1',
			}
		},
		created() {
			console.log(this.itemMdata);			
		},
		beforeDestroy() {
			if(this.itemMdata.isPro==false&& this.typenumber == 2){
				this.getUEContent();
			}
			console.log("beforeDestroy");
		},
		mounted() {
			//productShow.productShow1(this.productShowId);
		},
		methods: {
			querySearch(queryString, cb) {
				var restaurants = this.itemMdata.options;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				cb(results);
				console.log(results)
			},
			createFilter(queryString) {
				return (restaurant) => {
				return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				console.log(item);
			},
			handleIconClick(ev) {
				console.log(ev);
			},
			getUEContent() {
				let content = this.$refs.ue.getUEContent();
				this.itemMdata.productDesList.content = content;
				//var dd = UE.dom.domUtils.getStyle(p,tex-align);
				console.log(this.$refs.ue.getUEContent())
			},
			delData(itemImg){
				this.itemMdata.sibleItem.splice(this.itemMdata.sibleItem.indexOf(itemImg), 1);
				this.itemMdata.imgItem.splice(this.itemMdata.imgItem.indexOf(itemImg), 1);
			},
			recoent(i) {			
				this.itemMdata.sibleItem.push(i.url);
				for(var i = 0;this.itemMdata.sibleItem.length>i;i++){
					this.itemMdata.imgItem[i] = this.itemMdata.sibleItem[i];										
				}
				console.log("ddssss");
				//console.log(this.itemMdata.imgItem);
				
			},
			visibleNav() {				
				this.addVisibleNav = true;
				console.log("ssd");
			},
			btnSh(){
				this.itemMdata.btnShow =true;
			},
			btnHid(){
				this.itemMdata.btnShow =false;
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
			changeno: function(e,table) {
				table.show = true;
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
			openSet(e){
				if(e.target.className=="open"){
					this.itemMdata.open = false;
				}
				if(e.target.className=="no"){
					this.itemMdata.open = true;
				}
				
			},
			changeyes: function(e,table) {
				table.show = false;
				console.log(table.show)
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
			oneSet:function(number){
				this.onenumber = number
			},
			twoSet:function(number){
				this.itemMdata.twonumber = number
			},
			threeSet:function(number){
				this.threenumber = number
			},
			fourSet:function(number){
				this.fournumber = number
			},
			
			desImg(index){
				this.itemMdata.modelStyle = index;
				var style = document.querySelector('#style');
				var list = style.querySelectorAll('li');
				for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						$(this).addClass("active").siblings().removeClass("active");
					}
				}
			},
			changetype: function(number) {
				this.typenumber = number
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i,this.editDial);
			},
			onResize: function(x, y, width, height) {
				this.parentStyle.left = x;
				this.parentStyle.top = y;
				this.parentStyle.width = width;
				this.parentStyle.height = height;
				this.itemMdata.parentStyle = this.parentStyle;
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
	.clearfloat:after {display: block;clear: both;content: "";visibility: hidden;height: 0;}
	.fl{float:left;}
	.fr{float:right;}
	.productDesEdite,.proEdite{
		.navShow{
			box-sizing: border-box;
			height:414px;
			padding: 20px;
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
			.leftDiv{
				width:46%;
				input{
					border:1px solid #ccc;
				}
				p{
					margin:10px 0;
					input[type=button]{
						margin-right:10px;
						padding:0 10px;
					}
					
				}
				.param{
					width:94%;
					background:#ccc;
					padding:5px 5px 5px 10px;
					h3{
						display:inline-block;
					}
					input{
						border:1px solid #000;
					}
				}
			}
			.rightDiv{
				width:50%;
				background:#ccc;
				height: 350px;
				position:relative;
				overflow-y:scroll;
				
				.imgDiv{
					position:absolute;
					top:50%;
					left:50%;
					transform:translate(-50%,-50%);
					width: 110px;
					height: 110px;
					background: url(/static/image/ProductDesimage.png) no-repeat 0 0;
					display: inline-block;
					
				}
				.imgDivHid{
					margin:5px;
					width:100px;
					height: 100px;
					cursor: pointer;
    				background: url(/static/image/ProductDesimage.png) no-repeat -145px -1px;
				}
				.imgDivList{
					img{
						width:86px;
						height: 86px;
						margin:5px;
					}

					span{position:relative;display:inline-block;}
					.hid{
						display:none;
						position:absolute;
						top:0;
						right:0;
						color:red;
					}
					span:hover .hid{display:inline-block;}
				}
			}
			.name {
				input {
					border: 1px solid #E3E3E3;
					padding-left: 10px;
					line-height: 35px;
				}
			}
			.style {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				p {
					display:inline-block;
					vertical-align:top;
				}
				ul {
					display:inline-block;
					width: 87%;
					li {
						box-sizing: border-box;
						float: left;
						width: 15%;
						border: 1px solid #E3E3E3;
						margin-right: 10px;
						margin-left: 5px;
						padding: 5px 10px;
						position: relative;
						img {
							width: 100%;
							position: relative;
						}
						.icon {
							background: url(/static/image/mbg01.png) no-repeat;
							background-position: -54px -990px;
							width: 20px;
							height: 20px;
							position: absolute;
							right: -10px;
							top: 30px;
							display: none;
						}
					}
					li:hover {
						border: 1px solid #409EFF;
					}
					.active {
						border: 1px solid #409EFF;
						.icon {
							display: block;
						}
					}
				}
			}
			.yes{
				padding-top:10px;
				.weixin{
					background: url("/static/image/shareIcon.png") -29px 0 no-repeat;
				}
				.weibo{
					background: url("/static/image/shareIcon.png") -56px 0 no-repeat;
				}
				.qzone{
					background: url("/static/image/shareIcon.png") -387px 0 no-repeat;
				}
				.douban{
					background: url("/static/image/shareIcon.png") -253px 0 no-repeat;
				}
				.yesIcon{
					display:inline-block;
					height: 20px;
					line-height: 20px;
					width: 20px;
					margin: 0 2px 0 2px;
					_margin: 0 1px 0 1px;
					cursor: pointer;
				}
			}
			.desTitle{
				.bgUl{
					background:#ff0;
					margin-top:10px;
				}
				ul{
					clear:both;
					overflow:hidden;
					li{
						float:left;
						width:25%;
						text-align:center;
						padding:20px 0;
						span{
							display:inline-block;
							border-right:1px solid #ccc;
							padding:0 61px;
						}
						input{
							border:1px solid #ccc;
							padding-left:10px;
							width:80%;
						}
						.open{
							display:inline-block;
							background: url(/static/image/bg01.png) no-repeat -1405px -320px;
							cursor: pointer;
							height: 25px;
    						width: 20px;
						}
						.no{
							display:inline-block;
							background: url(/static/image/bg01.png) no-repeat -1441px -322px;
							cursor: pointer;
							height: 25px;
    						width: 20px;
						}
					}
					li:first-child span{
						padding:0 47px;
					}
					li:last-child span{
						border-right:none;
						padding:0;
					}
				}
			}
			.content,.share{
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				position: relative;
				
				p{
					display:inline-block;
					margin-right:10px;
				}
				.left {
					box-sizing: border-box;
					float: left;
					width: 30%;
					border: 1px solid #E3E3E3;
					padding: 10px;
					font-size: 13px;
					.file {
						input {
							background: #e4e4e4;
							padding: 1px 10px;
							border: 1px solid #ccc;
						}
					}
					.size {
						clear: both;
						overflow: hidden;
						margin-top: 7px;
						span {
							float: left;
						}
						p {
							float: left;
							width: 30%;
							margin-left: 5px;
							input {
								border: 1px solid #E3E3E3;
								width: 40px;
								line-height: 20px;
								text-align: center;
							}
						}
					}
					.margin {
						clear: both;
						overflow: hidden;
						margin-top: 7px;
						span {
							float: left;
						}
						p {
							float: left;
							width: auto;
							margin-left: 10px;
						}
						.margin_hid {
							clear: both;
							overflow: hidden;
							margin-left: 75px;
							input {
								border: 1px solid #E3E3E3;
								width: 50px;
							}
						}
					}
					.link {
						margin-top: 5px;
						.more {
							background: #e4e4e4;
							padding: 1px 10px;
							border: 1px solid #ccc;
						}
						.link_hid {
							position: absolute;
							top: 0;
							left: 150px;
							right: 150px;
							background: #FFFFFF;
							z-index: 9999;
							border: 1px solid #E3E3E3;
							border-radius: 5px;
							box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.2);
							.title {
								border-bottom: 1px solid #CCC;
								clear: both;
								overflow: hidden;
								padding: 10px 15px;
								p:nth-child(1) {
									float: left;
									font-size: 16px;
								}
								p:nth-child(2) {
									float: right;
									font-size: 14px;
								}
							}
							.link_content {
								padding: 25px;
								font-size: 14px;
								.type {
									margin-bottom: 25px;
									clear: both;
									overflow: hidden;
									span {
										float: left;
									}
									p {
										float: left;
										margin-left: 15px;
									}
								}
								.type_detail p {
									margin-bottom: 15px;
								}
							}
						}
					}
					.text {
						clear: both;
						overflow: hidden;
						margin-top: 8px;
						input {
							float: right;
							border: 1px solid #E3E3E3;
							width: 166px;
						}
					}
					.img {
						width: 235px;
						height: 150px;
						margin: 10px 0;
						overflow: auto;
						img {
							width: 100%;
						}
					}
				}
				.right {
					float: right;
					width: 69%;
					border: 1px solid #E3E3E3;
					font-size: 13px;
				}
			}
		}
		
		.two{
			overflow:scroll;
			height:342px;
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
		.three{
			.baseSet,.imgSet{
				margin-bottom:20px;
				.title{
					width:100%;
					background:#ccc;
					margin-bottom:10px;
				}
				.support,.zoom{
					margin-bottom:10px;
					p{
						display:inline-block;
						.w{
							border:1px solid #ccc;
							text-align:center;
							width:30%;
						}
					}
					.open{
						margin-top:10px;
						button{
							border:1px solid #ccc;
							background:#ddd;
						}
					}
					.open:hover button{
						border:1px solid #ff0;
					}
				}
				
			}
		}
	}
	
	.hove_con {
		position: relative;
		z-index: 100;
		width: 100%;
		height: 100%;
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
			span:nth-child(1) {
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon {
				display: block;
				float: left;
				border-right: none;
				background: url(/static/image/bg03.png)no-repeat;
			}
			.icon i {
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
			.style {
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover {
				background-position: -60px -232px;
			}
			.style:hover i {
				display: block;
			}
			.animation {
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover {
				background-position: -372px -232px;
			}
			.animation:hover i {
				display: block;
			}
			.borderhid {
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover {
				background-position: -275px -232px;
			}
			.borderhid:hover i {
				display: block;
			}
			.delete {
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover {
				background-position: -105px -232px;
			}
			.delete:hover i {
				display: block;
			}
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>