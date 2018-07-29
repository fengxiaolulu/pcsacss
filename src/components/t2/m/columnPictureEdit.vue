<template>
	<div class="columnPictureEdit">
		<ul class="left">
			<li @click="changetype(1)" :class="{active:typenumber == 1}">常规</li>
			<li @click="changetype(2)" :class="{active:typenumber == 2}">图片特效</li>
		</ul>
		<div class="right">
			<div v-if="typenumber == 1" class="one">
				<p class="name">
					<span>模块标题：</span>
					<input type="text" value="列表多图" />
				</p>
				<div class="style">
					<span>模块样式：</span>
					<ul id="style" @click="changeborder">
						<li @click="styleone">
							<div class="style_one"></div>
						</li>
						<li @click="styletwo">
							<div class="style_two"></div>
						</li>
						<li @click="stylethree">
							<div class="style_three"></div>
						</li>
					</ul>
				</div>
				<div class="img">
					<div class="type">
						<span>添加图片：</span>
						<p @click="changeset(1)">
							<input type="radio" name="type" id="type1" checked="checked" />
							<label for="type1">直接添加</label>
						</p>
						<!--<p @click="changeset(2)">
							<input type="radio" name="type" id="type2" />
							<label for="type2">绑定图册</label>
						</p>-->
					</div>
					<div class="type_one" v-show="setnumber == 1">
						<div class="upload" @click="vbgFun(1)">+</div>
						<ul class="imglist">
							<li v-for="(list,index) in itemMdata.columnPictureLlist"  @click="imglistshow($event,index,list)">
								<div class="in">
									<img :src="list.url" class="imgLi"/>
									<span @click="deleteList(list)"></span>
								</div>
								<div class="imglist_hid" v-show="imglist_hid == index">
									<div class="title">
										<p>编辑图片</p>
										<p class="close" @click="imglisthid(index)">X</p>
									</div>
									<div class="detail">
										<div class="detailTop">
											<button class="preBtn" @click="preBtn($event,index,list)" v-show="index!=0">编辑上一张</button>
											<img :src="list.url" />
											<button class="nextBtn"  @click="nextBtn($event,index,list)" v-show="index!=itemMdata.columnPictureLlist.length-1">编辑下一张</button>
										</div>
										<p>
											<span>图片名称：</span>
											<input type="text" value="list.text" v-model="list.text" />
										</p>
										<p>
											<span>图片链接：</span>
											<input type="text" value="list.url" v-model="list.url" />
										</p>
										<p>
											<span>图片描述：</span>
											<textarea  v-model="list.describe"></textarea>
										</p>
										<p>
											<span>跳转链接：</span>
											<input type="text" value="list.link" v-model="list.link" />
										</p>
										<p>
											<button @click="setlinkFun(list)">添加链接</button>
										</p>
										
									</div>
									<div class="button">
										<button type="submit" class="saveAllBtn" @click="saveAll">确定</button>
										<button type="reset"  class="closeAllBtn" @click="closeAll(index)">取消</button>
									</div>
								</div>
							</li>
						</ul>
						<uiLink v-if ="editDial.setlink" :itemMdata = 'itemMdata.itemCur' :editDial="editDial"></uiLink>
					</div>
					<!--<div class="type_two" v-if="setnumber == 2">
						<p>选择图册：</p>
						<div class="table">
							<p class="title">
								<span>内容</span>
								<span>操作</span>
							</p>
							<ul>
								<li>
									<p class="names">
										<input type="radio" name="table" id="name1" />
										<label for="name1">广告用图</label>
									</p>
									<p class="edit"><span></span></p>
								</li>
								<li>
									<p class="names">
										<input type="radio" name="table" id="name2" />
										<label for="name2">案例</label>
									</p>
									<p class="edit"><span></span></p>
								</li>
								<li>
									<p class="names">
										<input type="radio" name="table" id="name3" />
										<label for="name3">产品图</label>
									</p>
									<p class="edit"><span></span></p>
								</li>
								<li>
									<p class="names">
										<input type="radio" name="table" id="name4" />
										<label for="name4">新闻资讯</label>
									</p>
									<p class="edit"><span></span></p>
								</li>
								<li>
									<p class="names">
										<input type="radio" name="table" id="name5" />
										<label for="name5">荣誉资质</label>
									</p>
									<p class="edit"><span></span></p>
								</li>
							</ul>
						</div>
					</div>-->
				</div>
				<div class="other">
					<p>图片设置</p>
					<div class="set">
						<span>图片名称：</span>
						<p @click="itemMdata.pStyle.display = 'block'">
							<input type="radio" name="set1" id="set1_1" :checked="itemMdata.pStyle.display == 'block'" />
							<label for="set1_1">显示</label>
						</p>
						<p @click="itemMdata.pStyle.display = 'none'">
							<input type="radio" name="set1" id="set1_2" :checked="itemMdata.pStyle.display == 'none'" />
							<label for="set1_2">隐藏</label>
						</p>
					</div>
					<div class="set">
						<span>图片描述：</span>
						<p @click="itemMdata.phoneP.display = 'block'">
							<input type="radio" name="describe" id="describe1_1" :checked="itemMdata.phoneP.display == 'block'" />
							<label for="set1_1">显示</label>
						</p>
						<p @click="itemMdata.phoneP.display = 'none'">
							<input type="radio" name="describe" id="describe1_2" :checked="itemMdata.phoneP.display == 'none'"/>
							<label for="set1_2">隐藏</label>
						</p>
					</div>
					<div class="set">
						<span>描述行数：</span>
						<p @click="itemMdata.phoneP.whiteSpace = 'nowrap'">
							<input type="radio" name="wrap" id="wrap1" :checked="itemMdata.phoneP.whiteSpace == 'nowrap'" />
							<label for="wrap1">一行</label>
						</p>
						<p @click="itemMdata.phoneP.whiteSpace = 'normal'">
							<input type="radio" name="wrap" id="wrap2" :checked="itemMdata.phoneP.whiteSpace == 'normal'"/>
							<label for="wrap2">多行</label>
						</p>
					</div>
					<div class="set">
						<span>点击图片：</span>
						<p @click="set_hid = false">
							<input type="radio" name="set2" id="set2_1" checked="checked" />
							<label for="set2_1">无效果</label>
						</p>
						<p @click="set_hid = true">
							<input type="radio" name="set2" id="set2_2" />
							<label for="set2_2">图片链接</label>
						</p>
					</div>
					<div class="set" v-show="set_hid">
						<span>打开方式：</span>
						<p @click="itemMdata.columnPictureLlist.target = '_self'">
							<input type="radio" name="set3" id="set3_1" checked="checked" />
							<label for="set3_1">当前窗口</label>
						</p>
						<p @click="itemMdata.columnPictureLlist.target = '_blank'">
							<input type="radio" name="set3" id="set3_2" />
							<label for="set3_2">新窗口</label>
						</p>
					</div>
					<div class="set">
							<p>
								<span>右边距：</span>
								<input type="text" v-model="itemMdata.liStyle.marginRight" placeholder="1%"/>
							</p>
							<p>
								<span>左边距：</span>
								<input type="text" v-model="itemMdata.liStyle.marginLeft" placeholder="1%"/>
							</p>
							<p>
								<span>上边距：</span>
								<input type="text" v-model="itemMdata.liStyle.marginTop" placeholder="1%"/>
							</p>
							<p>
								<span>下边距：</span>
								<input type="text" v-model="itemMdata.liStyle.marginBottom" placeholder="1%"/>
							</p>
						</div>
						<div class="set">
							<p>
								<span>列表大小:</span>
								<input type="text" v-model="itemMdata.liStyle.width" placeholder="25%"/>
							</p>
							<p>
								<span>图片大小:</span>
								<input type="text" v-model="itemMdata.imgStyle2.width" placeholder="25%"/>
							</p>
							<p>
								<span>下边距:</span>
								<input type="text" v-model="itemMdata.divStyle.marginBottom" placeholder="1px"/>
							</p>
						</div>
						<div class="set">
							<p>
								<span>图片名称字体大小:</span>
								<input type="text" v-model="itemMdata.pStyle.fontSize" placeholder="12"/>
							</p>
							<p>
								<span>图片名称行高:</span>
								<input type="text" v-model="itemMdata.pStyle.lineHeight" placeholder="12"/>
							</p>
							<p>
								<span>图片名称颜色:</span>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.pStyle.color"></el-color-picker>
							</p>
							
						</div>
						<div class="set">
							<p>
								<span>图片描述字体大小:</span>
								<input type="text" v-model="itemMdata.hoverP.fontSize" placeholder="12"/>
								
							</p>
							<p>
								<span>图片描述行高:</span>
								<input type="text" v-model="itemMdata.hoverP.lineHeight" placeholder="12"/>
							</p>
							<p>
								<span>图片描述颜色:</span>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.hoverP.color"></el-color-picker>
							</p>
						</div>
				</div>
			</div>
			<div v-if="typenumber == 2" class="two">
				<div class="mouse">
					<p>鼠标悬停效果</p>
					<ul>
						<li @click="mouseenter(1)">
							<div class="mouse_one"></div>
						</li>
						<li @click="mouseenter(2)">
							<div class="mouse_two"></div>
						</li>
						<li @click="mouseenter(3)">
							<div class="mouse_three"></div>
						</li>
						<li @click="mouseenter(4)">
							<div class="mouse_four"></div>
						</li>
						<li @click="mouseenter(5)">
							<div class="mouse_five"></div>
						</li>
						<!--<li @click="allhid">
							<div class="mouse_sixth"></div>
						</li>
						<li @click="allhid">
							<div class="mouse_seven"></div>
						</li>
						<li @click="mouseeighth">
							<div class="mouse_eighth"></div>
						</li>-->
					</ul>
				</div>
				<div class="effect">
					<p>特效设置</p>
					<div class="effect_info" v-if="itemMdata.mouseenterNumber == 2">
						<span>边框：</span>
						<p @click="border_hid = false">
							<input type="radio" name="mouse_one" id="default" />
							<label for="default">默认</label>
						</p>
						<p @click="border_hid = true">
							<input type="radio" name="mouse_one" id="custom" checked="checked" />
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
								<input type="radio" name="set6" id="set6_1" checked="checked" />
								<label for="set6_1">居中</label>
							</p>
							<p @click="itemMdata.hidStyle.textAlign = 'left'">
								<input type="radio" name="set6" id="set6_2" />
								<label for="set6_2">左对齐</label>
							</p>
							<p @click="itemMdata.hidStyle.textAlign = 'right'">
								<input type="radio" name="set6" id="set6_3" />
								<label for="set6_3">右对齐</label>
							</p>
						</div>
						<!--<div class="set">
							<span>图片描述：</span>
							<p>
								<input type="radio" name="set2" id="set2_1" checked="checked" />
								<label for="set2_1">显示</label>
							</p>
							<p>
								<input type="radio" name="set2" id="set2_2" />
								<label for="set2_2">隐藏</label>
							</p>
						</div>-->
					</div>
					<div class="effect_info" v-if="itemMdata.mouseenterNumber == 5">
						<div class="set">
							<span>背景：</span>
							<p>
								<input type="radio" name="set3" id="set3_1" />
								<label for="set3_1">默认</label>
							</p>
							<p>
								<input type="radio" name="set3" id="set3_2" checked="checked" />
								<label for="set3_2">自定义</label>
							</p>
							<div class="">
								<el-color-picker v-model="itemMdata.hidStyle.background" show-alpha size="medium"></el-color-picker>
							</div>
						</div>
						<!--<div class="set">
							<span>图片描述：</span>
							<p>
								<input type="radio" name="set4" id="set4_1" />
								<label for="set4_1">显示</label>
							</p>
							<p>
								<input type="radio" name="set4" id="set4_2" />
								<label for="set4_2">隐藏</label>
							</p>
						</div>-->
						<!--<div class="set">
							<span>描述文字：</span>
							<p>
								<input type="radio" name="set5" id="set5_1" />
								<label for="set5_1">默认</label>
							</p>
							<p>
								<input type="radio" name="set5" id="set5_2" />
								<label for="set5_2">自定义</label>
							</p>
						</div>-->
						<div class="set">
							<span>对齐方式：</span>
							<p @click="itemMdata.hidStyle.textAlign = 'center'">
								<input type="radio" name="set6" id="set6_1" checked="checked" />
								<label for="set6_1">居中</label>
							</p>
							<p @click="itemMdata.hidStyle.textAlign = 'left'">
								<input type="radio" name="set6" id="set6_2" />
								<label for="set6_2">左对齐</label>
							</p>
							<p @click="itemMdata.hidStyle.textAlign = 'right'">
								<input type="radio" name="set6" id="set6_3" />
								<label for="set6_3">右对齐</label>
							</p>
						</div>
					</div>
					<!--<div class="effect_info" v-show="mouse_eighth">
						<div class="table">
							<table>
								<tr>
									<th width="40%">默认图片</th>
									<th width="40%">悬停图片</th>
									<th width="20%">操作</th>
								</tr>
								<tr>
									<td>
										<img src="../../../static/image/default.png" />
									</td>
									<td>
										<img src="../../../static/image/default.png" />
									</td>
									<td>
										<span class="edit"></span>
									</td>
								</tr>
								<tr>
									<td>
										<img src="../../../static/image/default.png" />
									</td>
									<td>
										<img src="../../../static/image/default.png" />
									</td>
									<td>
										<span class="edit"></span>
									</td>
								</tr>
								<tr>
									<td>
										<img src="../../../static/image/default.png" />
									</td>
									<td>
										<img src="../../../static/image/default.png" />
									</td>
									<td>
										<span class="edit"></span>
									</td>
								</tr>
							</table>
						</div>
					</div>-->
				</div>
			</div>
		</div>
		<el-dialog title="添加图片" :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" :itemMdata="newPic"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisibleNav = false">取 消</el-button>
				<el-button type="primary" @click="addVisibleFun();add($event,newPic)">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from './mImageEdit.vue'
	import uiLink from '@/components/t2/m/uiLink.vue'
	export default {
		name: 'columnPictureEdit',
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata);
		},
		components: {
			mImageEdit,
			uiLink
		},
		data() {
			return {
				id: this.$route.params.id,
				title: "编辑列表多图",
				typenumber: '1',
				setnumber: '1',
				set_hid: false,
				imglist_hid: '-1',
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
				addVisibleNav: false,
				flag: 1,
				editDial: {
					artTitle: "设置链接地址",
					setlink: false
				},
				newPic: {
					url: "",
					text: "",
					link: "",
					describe: ""
				}
			}
		},
		methods: {
			setlinkFun(list){
				this.editDial.setlink = true;
				this.itemMdata.itemCur = list;
			},
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
				//console.log(flag)
			},
			addVisibleFun() {
				this.addVisibleNav = false;
			},
			add: function(e, list) {
				e.preventDefault();
				console.log(JSON.stringify(list));
				var newPic = JSON.parse(JSON.stringify(list));
				this.itemMdata.columnPictureLlist.push(newPic);
			},
			deleteList: function(list) {
				this.itemMdata.columnPictureLlist.splice(this.itemMdata.columnPictureLlist.indexOf(list), 1);
			},
			changetype: function(number) {
				this.typenumber = number
			},
			changeset: function(number) {
				this.setnumber = number
			},
			mouseenter: function(number) {
				this.itemMdata.mouseenterNumber = number
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
				this.itemMdata.imgStyle2.float = 'none';
				this.itemMdata.imgStyle2.width = '100%';
				this.itemMdata.imgStyle2.height = 'auto';
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.textAlign = 'center';
			},
			styletwo: function() {
				this.itemMdata.styleone = false;
				this.itemMdata.styletwo = true;
				this.itemMdata.stylethree = false;
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.textAlign = 'center';
			},
			stylethree: function() {
				this.itemMdata.styleone = false;
				this.itemMdata.styletwo = false;
				this.itemMdata.stylethree = true;
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.textAlign = 'center';
			},
			/*
			imglistshow: function(index) {
				this.imglist_hid = index;
			},*/
			imglistshow: function(e,idx,colList) {
				
				var vueThis = this;
				var typeone = document.querySelector('.imglist');
				var list = typeone.querySelectorAll('li');

				for(; idx < list.length; idx++) {
					list[idx].onclick = function() {
						
						if(e.target.className== 'imgLi'){
							$(this).find(".imglist_hid").css({
								"display": "block"
							})
						}
						//console.log($(this))
						if(e.target.className== 'submitBtn'){
							console.log(e.target)
							$(this).find(".imglist_hid").css({
							"display": "none"
							})
						}
						if(e.target.className== 'cancelBtn'){
							$(this).find(".imglist_hid").css({
							"display": "none"
							});
							colList.text = vueThis.itemMdata.columnPictureLlist[idx].text;
						}
						
					}
				}
			},
			nextBtn(e,idx,colList){
				console.log(2)
				var j = idx+1;
				var typeone = document.querySelector('.imglist');
				var list = typeone.querySelectorAll('li');
				$(list[idx]).find(".imglist_hid").css({
					"display": "none"
				})
				$(list[j]).find(".imglist_hid").css({
					"display": "block"
				})
			},
			preBtn(e,idx,colList){
				var j = idx-1;
				var typeone = document.querySelector('.imglist');
				var list = typeone.querySelectorAll('li');
				$(list[idx]).find(".imglist_hid").css({
					"display": "none"
				})
				$(list[j]).find(".imglist_hid").css({
					"display": "block"
				})
			},
			imglisthid: function(index) {
				$('.saveAllBtn').parent().parent('.imglist_hid').css('display','none');
			},
			saveAll:function(){
				this.saveloca(this.id);
				
				$('.saveAllBtn').parent().parent('.imglist_hid').css('display','none');
				//this.imglist_hid = '-1'
			},
			closeAll:function(index){
				$('.closeAllBtn').parent().parent('.imglist_hid').css('display','none');
				//this.imglist_hid = '-1'
			},
			...mapActions([
				'saveloca'
			])
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.columnPictureEdit {
		overflow: auto;
		border-bottom: 1px solid #CCCCCC;
		.left {
			display: block;
			float: left;
			width: 15%;
			height: 530px;
			border-right: 1px solid #CCCCCC;
			li {
				box-sizing: border-box;
				width: 100%;
				height: 60px;
				line-height: 60px;
				padding-left: 35px;
			}
			li:nth-child(1) {
				border-bottom: 1px solid #CCCCCC;
			}
			.active {
				width: 144px;
				border-bottom: 1px solid #CCCCCC;
				border-left: 5px solid #409EFF;
				border-right: 1px solid #FFFFFF;
				color: #409EFF;
			}
		}
		.right {
			position: relative;
			float: right;
			width: 84.8%;
			height: 530px;
			.one {
				box-sizing: border-box;
				padding: 20px 40px;
				.name {
					input {
						border: 1px solid #E3E3E3;
						line-height: 30px;
						padding-left: 10px;
					}
				}
				.style {
					clear: both;
					overflow: hidden;
					margin-top: 20px;
					span {
						float: left;
					}
					ul {
						float: left;
						width: 90%;
						li {
							box-sizing: border-box;
							float: left;
							width: 13%;
							height: 50px;
							padding-left: 13px;
							border: 1px solid #E3E3E3;
							margin-right: 15px;
							margin-left: 5px;
							.style_one {
								width: 60px;
								height: 48px;
								background: url(../../../../static/image/mbg02.png) no-repeat;
								background-position: -1px -471px;
							}
							.style_two {
								width: 60px;
								height: 48px;
								background: url(../../../../static/image/mbg02.png) no-repeat;
								background-position: -315px -507px;
							}
							.style_three {
								width: 60px;
								height: 48px;
								background: url(../../../../static/image/style08.gif) no-repeat;
							}
						}
						li:hover {
							border: 1px solid #409EFF;
						}
						.active {
							border: 1px solid #409EFF;
						}
					}
				}
				.img {
					margin-top: 20px;
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
						margin-top: 15px;
						.upload {
							float: left;
							width: 85px;
							text-align: center;
							line-height: 85px;
							font-size: 30px;
							border: 1px dashed #CCCCCC;
						}
						.upload:hover {
							border: 1px dashed #409EFF;
						}
						.imglist {
							float: left;
							width: 80%;
							li {
								float: left;
								width: 85px;
								margin-bottom: 10px;
								margin-left: 15px;
								text-align: center;
								border: 1px solid #E3E3E3;
								.in {
									position: relative;
									img {
										max-width: 100%;
										height: 85px;
										position: relative;
									}
									span {
										position: absolute;
										top: 0px;
										right: 0px;
										width: 25px;
										height: 25px;
										display: none;
										background:url(/static/image/iconIndex2.png) -1028px 218px;
									}
								}
							}
							li:hover {
								border: 1px solid #409EFF;
							}
							li:hover .in span {
								display: block;
							}
							.imglist_hid {
								display:none;
								position: absolute;
								top: 20px;
								left: 100px;
								right: 150px;
								height: 500px;
								box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.2);
								background: #FFFFFF;
								border-radius: 5px;
								z-index: 999;
								.title {
									border-bottom: 1px solid #CCCCCC;
									clear: both;
									overflow: hidden;
									padding: 10px 20px;
									p:nth-child(1) {
										float: left;
										font-size: 16px;
									}
									p:nth-child(2) {
										float: right;
										font-size: 16px;
									}
								}
								.detail {
									box-sizing: border-box;
									padding: 30px;
									text-align: center;
									height: 367px;
									overflow-x: hidden;
									.detailTop{
										position:relative;
										img {
											max-width: 50%;
											width: auto;
											height: 190px;
											border: 1px solid #E3E3E3;
										}
										button{
											position:absolute;
											top:50%;
											
											transform:translate(0,-50%);
										}
										.preBtn{
											left:5%;
										}
										.nextBtn{
											right:5%;
										}
									}
									
									p {
										width: 70%;
										margin-left: 15%;
										margin-top: 15px;
										input,textarea {
											border: 1px solid #E3E3E3;
											line-height: 30px;
											width: 230px;
											padding-left: 10px;
										}
										textarea {
											
											vertical-align: top;
										}
										button{
											background: #409EFF;
											color:white;
											border-radius: 5px;
											text-align: center;
											padding:5px 10px;
										}
									}
									
								}
								.button {
									margin-left: 40px;
									button {
										width: 25%;
										margin-left: 20px;
										border: 1px solid #E3E3E3;
										border-radius: 5px;
										text-align: center;
										line-height: 30px;
										margin-top: 30px;
										background: #409EFF;
										color:white;
									}
								}
							}
						}
					}
					.type_two {
						margin-top: 15px;
						.table {
							width: 80%;
							border: 1px solid #e7ecf0;
							margin-top: 10px;
							.title {
								background: #f8f9fb;
								clear: both;
								overflow: hidden;
								span {
									display: block;
									float: left;
									width: 49.5%;
									text-align: center;
									line-height: 45px;
								}
								span:nth-child(1) {
									border-right: 1px solid #e7ecf0;
								}
							}
							ul {
								height: 200px;
								position: relative;
								overflow: auto;
								li {
									clear: both;
									overflow: hidden;
									height: 45px;
									line-height: 45px;
									.names {
										box-sizing: border-box;
										float: left;
										width: 49.5%;
										padding-left: 80px;
										input {
											margin-right: 25px;
										}
									}
									.edit {
										box-sizing: border-box;
										float: right;
										width: 49.5%;
										span {
											display: block;
											width: 20px;
											height: 20px;
											background: url(../../../../static/image/mbg01.png)no-repeat;
											background-position: -957px -4px;
											margin-left: 45%;
											margin-top: 10px;
										}
									}
								}
								li:nth-child(2n) {
									background: #f8f9fb;
								}
							}
						}
					}
				}
				.other {
					margin-top: 20px;
					font-size: 15px;
					.set {
						clear: both;
						overflow: hidden;
						margin-left: 20px;
						margin-top: 5px;
						font-size: 14px;
						span {
							float: left;
						}
						p {
							float: left;
							margin-left: 15px;
							margin-bottom:10px;
						}
						input[type=text]{
							border:1px solid #ccc;
							width:60px;
						}
					}
				}
			}
			
			.two {
				box-sizing: border-box;
				padding: 20px 40px;
				.mouse {
					clear: both;
					overflow: hidden;
					ul {
						li {
							float: left;
							width: 113px;
							margin-left: 15px;
							margin-right: 10px;
							border: 1px solid #E3E3E3;
							height: 93px;
							margin-top: 15px;
							div {
								display: block;
								width: 113px;
								height: 93px;
								background: url(../../../../static/image/mbg02.png)no-repeat;
							}
							.mouse_one {
								background-position: -416px 1px;
							}
							.mouse_two {
								background-position: -416px -117px;
							}
							.mouse_three {
								background-position: -416px -233px;
							}
							.mouse_four {
								background-position: -416px -349px;
							}
							.mouse_five {
								background-position: -413px -465px;
							}
							.mouse_sixth {
								background-position: -416px -581px;
							}
							.mouse_seven {
								background-position: -416px -697px;
							}
							.mouse_eighth {
								background-position: -416px -813px;
							}
						}
						li:hover {
							border: 1px solid #409EFF;
						}
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
						.table {
							height: 185px;
							overflow: auto;
							border: 1px solid #e7ecf0;
							margin-top: 10px;
							table {
								width: 100%;
								tr {
									th {
										line-height: 40px;
										background: #f8f9fb;
										text-align: center;
									}
									td {
										text-align: center;
										padding: 8px;
										img {
											max-width: 30%;
											height: 50px;
										}
										.edit {
											display: block;
											width: 20px;
											height: 20px;
											background: url(../../../../static/image/mbg01.png)no-repeat;
											background-position: -957px -4px;
											margin-left: 40%;
											margin-top: 5px;
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