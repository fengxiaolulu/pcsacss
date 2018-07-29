<template>
	<div class="moduleAreaNavStyle">
		<el-dialog title="设置栏目样式" :modal = false :append-to-body = true :visible.sync="itemMdata.isStyleEdit" width="60%">
			<div class="g-cf add_nav_cons">

				<div class="columnLayoutEdit">
					<div class="top">
						<p @click="oneshow" :class="{active:one_show}">常规</p>
						<p @click="twoshow" :class="{active:two_show}">高级</p>
					</div>
					<div class="one" v-show="one_show">
						<div class="bg">
							<span>栏目背景：</span>
							<div class="bg_hid">
								<p>
									<span>图片：</span>
									<button @click="visibleNav(1)">添加图片</button>
									<div v-if="itemMdata.mImage0.url" class="on_con">
										<span class="close" @click="beforeRemoveImg('layoutStyle')">X</span>
										<img :src="itemMdata.mImage0.url" />
									</div>
								</p>
								<p>
									<span>背景色：</span>
									<el-color-picker show-alpha v-model="itemMdata.layoutStyle.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
								</p>
							</div>
						</div>
						<div class="bg bg_hid">
							<span>中间背景：</span>
							<div class="bg_hid">
								<p>
									<span>图片：</span>
									<button @click="visibleNav(2)">添加图片</button>
									<div v-if="itemMdata.mImage1.url" class="on_con">
										<span class="close" @click="beforeRemoveImg('layoutOuterStyle')">X</span>
										<img :src="itemMdata.mImage1.url" />
									</div>
								</p>
								
							</div>
						</div>
						<h3>边框样式：</h3>
						<div class="marginL">
							<div class="navStyle" @click="next($event)">
								<i class="pre"><</i>
								<ul ref="move">
									<li ref="default" @click="defaultStyle($event)">
										<div class="default" :class="{actived:itemMdata.imgActived==5}">默认</div>
									</li>
									<li v-for="(itemImg,imgIdx) in this.modelNav" @click="modelStyle(imgIdx,$event)">
										<img :src="itemImg" :class="{actived:itemMdata.imgActived==imgIdx}"/>
									</li>
								</ul>
								<i class="next">></i>
							</div>
						</div>
					</div>
					<div class="two" v-show="two_show">
						<h3>一级栏目：</h3>
						<div class="cont">
							<el-form ref="itemMdata.layoutOuterStyle" :model="itemMdata.layoutOuterStyle" label-width="120px">
								
								<el-form-item label="宽度：">
									<el-input v-model="itemMdata.layoutOuterStyleLi.width" style="width: 220px;" placeholder="请输入导航宽度，如300"></el-input>
								</el-form-item>
								<el-form-item label="背景色：">
									<el-color-picker show-alpha v-model="itemMdata.layoutOuterStyle.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="悬浮背景色：">
									<el-color-picker show-alpha v-model="itemMdata.hoverColor.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="字体大小：">
									<el-input v-model="itemMdata.layoutOuterStyle.fontSize" style="width: 220px;" placeholder="请输入字体大小，如12"></el-input>
								</el-form-item>
								<el-form-item label="字体类型：">
									<el-select v-model="itemMdata.layoutOuterStyle.fontFamily" placeholder="请选择字体">
										<el-option v-for="item in drton" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="字体颜色：">
									<el-color-picker show-alpha v-model="itemMdata.layoutOuterStyle.color" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="悬浮字体颜色：">
									<el-color-picker show-alpha v-model="itemMdata.hoverColor.color" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="字体是否加粗：">
									<span @click="itemMdata.layoutOuterStyle.fontWeight= 'bold'">
										<input type="radio" name="addBold1" id="addBold1_1" :checked="itemMdata.layoutOuterStyle.fontWeight== 'bold'"/>
										<label for="addBold1_1">是</label>
									</span>
									<span @click="itemMdata.layoutOuterStyle.fontWeight= 'normal'">
										<input type="radio" name="addBold1" id="addBold1_2" :checked="itemMdata.layoutOuterStyle.fontWeight== 'normal'" />
										<label for="addBold1_2">否</label>
									</span>
								</el-form-item>
				
							</el-form>
						</div>
						<h3>二级栏目：</h3>
						<div class="cont">
							<el-form ref="itemMdata.layoutOuterStyle" :model="itemMdata.layoutOuterStyle" label-width="120px">
								
								<el-form-item label="宽度：">
									<el-input v-model="itemMdata.hoverSecBg.width"  style="width: 220px;"  placeholder="请输入导航宽度，如300px"></el-input>
								</el-form-item>
								<el-form-item label="高度：">
									<el-input v-model="itemMdata.hoverSecBg.height" style="width: 220px;" placeholder="请输入导航高度，如300"></el-input>
								</el-form-item>
								<el-form-item label="背景颜色：">
									<el-color-picker show-alpha v-model="itemMdata.hoverSecBg.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="悬浮背景颜色：">
									<el-color-picker show-alpha v-model="itemMdata.hoverSec.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="字体大小：">
									<el-input v-model="itemMdata.hoverSec.fontSize" style="width: 220px;" placeholder="请输入字体大小，如30px"></el-input>
								</el-form-item>
								<el-form-item label="字体颜色：">
									<el-color-picker show-alpha v-model="itemMdata.hoverSecBg.color" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="悬浮字体颜色：">
									<el-color-picker show-alpha v-model="itemMdata.hoverSec.color" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="字体是否加粗：">
									<span @click="itemMdata.hoverSecBg.fontWeight= 'bold'">
										<input type="radio" name="addBold2" id="addBold2_1" :checked="itemMdata.hoverSecBg.fontWeight== 'bold'"/>
										<label for="addBold2_1">是</label>
									</span>
									<span @click="itemMdata.hoverSecBg.fontWeight= 'normal'">
										<input type="radio" name="addBold2" id="addBold2_2" :checked="itemMdata.hoverSecBg.fontWeight== 'normal'" />
										<label for="addBold2_2">否</label>
									</span>
								</el-form-item>
							</el-form>
						</div>
						<h3>三级栏目：</h3>
						<div class="cont">
							<el-form ref="itemMdata.layoutOuterStyle" :model="itemMdata.layoutOuterStyle" label-width="120px">
								
								<el-form-item label="宽度：">
									<el-input v-model="itemMdata.hoverThrBg.width"  style="width: 220px;" placeholder="请输入导航宽度，如300px"></el-input>
								</el-form-item>
								<el-form-item label="高度：">
									<el-input v-model="itemMdata.hoverThrBg.height" style="width: 220px;" placeholder="请输入导航高度，如300"></el-input>
								</el-form-item>
								<el-form-item label="背景颜色：">
									<el-color-picker show-alpha v-model="itemMdata.hoverThrBg.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="悬浮背景颜色：">
									<el-color-picker show-alpha v-model="itemMdata.hoverThr.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="字体大小：">
									<el-input v-model="itemMdata.hoverThr.fontSize" style="width: 220px;" placeholder="请输入字体大小，如30px"></el-input>
								</el-form-item>
								<el-form-item label="字体颜色：">
									<el-color-picker show-alpha v-model="itemMdata.hoverThrBg.color" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="悬浮字体颜色：">
									<el-color-picker show-alpha v-model="itemMdata.hoverThr.color" color-format="rgb" size="medium"></el-color-picker>
								</el-form-item>
								<el-form-item label="字体是否加粗：">
									<span @click="itemMdata.hoverThrBg.fontWeight= 'bold'">
										<input type="radio" name="addBold3" id="addBold3_1" :checked="itemMdata.hoverThrBg.fontWeight== 'bold'"/>
										<label for="addBold3_1">是</label>
									</span>
									<span @click="itemMdata.hoverThrBg.fontWeight= 'normal'">
										<input type="radio" name="addBold3" id="addBold3_2" :checked="itemMdata.hoverThrBg.fontWeight= 'normal'" />
										<label for="addBold3_2">否</label>
									</span>
								</el-form-item>
							</el-form>
						</div>
					</div>

					<el-dialog title="添加图片" :modal = false :visible.sync="addVisibleNav" width="60%">
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

			</div>
			<span slot="footer" class="dialog-footer">
		    <!--el-button @click="addVisibleNav = false">取 消</el-button-->
		    <el-button type="primary" @click="addVisibleFun">保 存</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'moduleAreaNavStyle',
		components: {
			mImageEdit
		},
		props: ['itemMdata'],

		created() {
			//console.log(this.router.navItem);
		},
		methods: {
			next(e){
				if(e.target.className == 'pre'){
					this.$refs.default.style.display = "none";
				}
				if(e.target.className == 'next'){
					this.$refs.default.style.display = "block";
					//this.$refs.move.style.right = "0";
				}
			},
			defaultStyle(e){
				this.itemMdata.layoutOuterStyle.borderRadius = '0';
				this.itemMdata.layoutStyle.borderRadius = '0';
				this.itemMdata.layoutOuterStyle.border = 'none';
				this.itemMdata.layoutStyle.border = 'none';
				this.itemMdata.layoutOuterStyleLi.border = 'none';
				this.itemMdata.hoverColor.border = 'none';
				this.itemMdata.layoutStyle.width = '990px';
				//导航栏
				this.itemMdata.layoutStyle.backgroundColor = 'white';
				//一级标签悬浮
				this.itemMdata.hoverColor.backgroundColor = 'white';
				this.itemMdata.hoverColor.color = 'black';
				//一级导航栏
				this.itemMdata.layoutOuterStyle.backgroundColor = 'white';
				this.itemMdata.layoutOuterStyle.color = 'black';
				this.itemMdata.imgActived = 5;
			},
			modelStyle(idx,e){
				console.log(idx)
				//e.target.style.border= "1px solid #ff0";
				
				if(idx==0){
					this.itemMdata.layoutOuterStyle.borderRadius = '0';
					this.itemMdata.layoutStyle.borderRadius = '0';
					this.itemMdata.layoutOuterStyleLi.borderRadius = '0';
					this.itemMdata.layoutStyle.width = '990px';
					this.itemMdata.layoutStyle.border = 'none';
					//导航栏
					this.itemMdata.layoutStyle.backgroundColor = 'black';
					//一级标签悬浮
					this.itemMdata.hoverColor.backgroundColor = 'rgb(139, 14, 234)';
					this.itemMdata.hoverColor.color = 'white';
					//一级导航栏
					this.itemMdata.layoutOuterStyle.backgroundColor = 'black';
					this.itemMdata.layoutOuterStyle.color = 'white';
					this.itemMdata.imgActived = 0;
					

				}
				if(idx==1){
					this.itemMdata.layoutOuterStyleLi.borderRadius = '7px';
					this.itemMdata.layoutOuterStyle.borderRadius = '7px';
					this.itemMdata.layoutStyle.borderRadius = '7px';
					//this.itemMdata.hoverColor.border = '1px solid #ccc';
					this.itemMdata.layoutStyle.width = '990px';
					//导航栏
					this.itemMdata.layoutStyle.backgroundColor = 'white';
					//一级标签悬浮
					this.itemMdata.hoverColor.backgroundColor = 'white';
					this.itemMdata.hoverColor.color = 'rgb(139, 14, 234)';
					this.itemMdata.hoverColor.border = '1px solid black';
					//一级导航栏
					this.itemMdata.layoutOuterStyle.backgroundColor = 'white';
					this.itemMdata.layoutOuterStyle.color = 'white';
					this.itemMdata.imgActived = 1;
				}
				if(idx==2){
					this.itemMdata.layoutOuterStyleLi.borderRadius = '20px';
					this.itemMdata.layoutOuterStyle.borderRadius = '20px';
					this.itemMdata.layoutStyle.borderRadius = '20px';
					this.itemMdata.layoutStyle.width = '990px';
					//导航栏
					this.itemMdata.layoutStyle.backgroundColor = 'white';
					//一级标签悬浮
					this.itemMdata.hoverColor.backgroundColor = 'white';
					this.itemMdata.hoverColor.color = 'rgb(139, 14, 234)';
					this.itemMdata.hoverColor.border = '1px solid black';
					//一级导航栏
					this.itemMdata.layoutOuterStyle.backgroundColor = 'white';
					this.itemMdata.layoutOuterStyle.color = 'white';
					this.itemMdata.imgActived = 2;
				}
				if(idx==3){
					this.itemMdata.layoutOuterStyle.borderRadius = '20px';
					this.itemMdata.layoutStyle.borderRadius = '20px';
					this.itemMdata.layoutStyle.border = '1px solid rgb(139, 14, 234)';
					this.itemMdata.layoutStyle.width = '990px';
					//一级导航栏
					this.itemMdata.layoutOuterStyle.backgroundColor = 'white';
					this.itemMdata.layoutOuterStyle.color = 'rgb(139, 14, 234)';
					//导航栏
					this.itemMdata.layoutStyle.backgroundColor = 'white';
					//一级标签悬浮
					this.itemMdata.hoverColor.backgroundColor = 'rgb(139, 14, 234)';
					this.itemMdata.hoverColor.color = 'white';
					this.itemMdata.hoverColor.borderColor = 'black';
					this.itemMdata.layoutOuterStyleLi.borderRadius = '20px';
					this.itemMdata.imgActived = 3;
				}
				if(idx==4){
					this.itemMdata.layoutOuterStyleLi.borderRadius = '0';
					this.itemMdata.layoutOuterStyle.borderRadius = '0';
					this.itemMdata.layoutStyle.borderRadius = '0';
					this.router.parentStyle.width = parseInt(document.body.clientWidth);
					this.itemMdata.layoutStyle.width  = this.router.parentStyle.width+'px'
					this.itemMdata.imgActived = 4;
				}
				//this.itemMdata.modelNavStyleId = idx;
				
			},
			removeComponent(i) {

			},
			twoshow() {
				this.one_show = false;
				this.two_show = true;
			},
			visibleNav(i) {
				this.flag = i;
				this.addVisibleNav = true;
			},
			beforeRemoveImg(flag) {
				if(flag == "layoutStyle") {
					this.itemMdata.layoutStyle.backgroundImage = '';
					this.itemMdata.mImage0.url = "";
				} else {
					this.itemMdata.layoutOuterStyle.backgroundImage = '';
					this.itemMdata.mImage1.url = "";
				}
			},
			recoent(i) {
				if(i.flag == "layoutStyle") {
					this.itemMdata.layoutStyle.backgroundImage = 'url("' + i.url + '")';
				} else {
					this.itemMdata.layoutOuterStyle.backgroundImage = 'url("' + i.url + '")';
				}
			},
			oneshow() {
				this.one_show = true;
				this.two_show = false;
			},
			addVisibleFun() {
				this.itemMdata.isStyleEdit = false;
			}
		},
		computed: {
			...mapGetters(["router", 'itemCon'])
		},
		data() {
			return {
				title: "栏目导航",
				one_show: true,
				border_hid: false,
				bg_hid: false,
				bg2_hid: false,
				form:"",
				two_show: false,
				fontStyle: "",
				fontSize: "",
				addVisibleNav: false,
				modelNav:["/static/image/modelNav1.png","/static/image/modelNav2.png","/static/image/modelNav3.png",
				"/static/image/modelNav4.png","/static/image/modelNav7.png",],
				drton: [{
					value: 'SimSun',
					label: '宋体'
				}, {
					value: 'SimHei',
					label: '黑体'
				}, {
					value: 'Microsoft JhengHei',
					label: '微软正黑体'
				}, {
					value: 'KaiTi',
					label: '楷体'
				}, {
					value: 'FangSong',
					label: '仿宋'
				}, {
					value: 'Microsoft Yahei',
					label: '微软雅黑'
				}],
				width_hid: true,
				flag: 0,
				options: [{
					value: 'none',
					label: '无边框'
				}, {
					value: 'solid',
					label: '————'
				}, {
					value: 'dotted',
					label: '············'
				}, {
					value: 'dashed',
					label: '------------'
				}],
				editDial: {

				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.fl{display:inline-block;}
	.moduleAreaNavStyle{
		z-index:1000;
		height:100%;
		box-sizing:border-box;
	}
	
	.columnLayoutEdit {
		box-sizing: border-box;
		height: 334px;
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
			h3{
				font-weight:normal;
			}
			.marginL{
				margin-left:40px;
				height:120px;
				background:#fff;
			}
			.navStyle{
				position:relative;
				height:120px;

				i{
					display:inline-block;
					width:40px;
					height:40px;
					position:absolute;
					background:#409EFF;
					text-align:center;
					line-height:40px;
					border-radius:100%;
					color:#fff;
					font-size:20px;
					top:50%;
					transform:translate(-50%,-50%);
				}
				.pre{
					left:14px;
				}
				.next{
					right:-1px;
				}
				ul{
					overflow:hidden;
					width:1000px;
					height:120px;
					position:absolute;
					top:0;
					left:40px;
					li{
						
						float:left;
						margin:10px 10px;
						img{
							border:1px solid #ccc;
						}
						.default{
							width:166px;
							height:106px;
							border:1px solid #ccc;
							text-align:center;
							line-height:108px;
						}
						.actived{
							border:1px solid #409EFF;
						}
					}
					
				}
			}
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
			.bg {
				margin-top: 10px;
				clear: both;
				overflow: hidden;
				span {
					
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.bg_hid {
					clear: both;
					overflow: hidden;
					margin-left: 100px;
					p {
						float: none;
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
				}
			}
			.effect {
				margin-top: 10px;
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
				.effect_hid {
					clear: both;
					overflow: hidden;
					.style {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						span {
							float: left;
						}
						ul {
							float: left;
							width: 88%;
							li {
								float: left;
								width: 23%;
								margin-left: 5px;
							}
							div {
								border: 1px solid #E3E3E3;
								width: 108px;
								height: 43px;
								background: url(../../../../static/image/mbg01.png) no-repeat;
							}
							p {
								text-align: center;
								float: none;
								font-size: 12px;
								margin-top: 5px;
								margin-left: 0;
								color: #666666;
							}
							.style_one {
								background-position: -865px -1264px;
							}
							.style_two {
								background-position: -865px -1324px;
							}
							.style_three {
								background-position: -865px -1204px;
							}
							.style_four {
								background-position: -865px -1384px;
							}
						}
					}
					.page {
						margin-top: 10px;
						line-height: 30px;
						input {
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 60px;
							margin-left: 5px;
							line-height: 30px;
						}
					}
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 20px;
			.border {
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
				.border_hid {
					clear: both;
					overflow: hidden;
					margin-left: 50px;
					.border1 {
						margin-top: 10px;
						input {
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 60px;
							margin-right: 4px;
							line-height: 30px;
						}
					}
					.border2 {
						margin-top: 10px;
						line-height: 30px;
					}
					.border3 {
						margin-top: 10px;
						clear: both;
						overflow: hidden;
						.color_hid {
							float: left;
							margin-left: 10px;
						}
					}
				}
			}
			.margin {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.margin_hid {
					clear: both;
					overflow: hidden;
					margin-left: 60px;
					p {
						margin-top: 10px;
						margin-left: 20px;
						span {
							width: auto;
						}
						input {
							border: 1px solid #E3E3E3;
							width: 60px;
							margin-right: 4px;
							text-align: center;
						}
					}
				}
			}
			.width {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				line-height: 30px;
				span {
					float: left;
					width: 70px;
					text-align: right;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.width_hid {
					float: left;
					margin-left: 10px;
					input {
						border: 1px solid #E3E3E3;
						text-align: center;
						width: 70px;
						line-height: 30px;
					}
				}
			}
			.bg {
				margin-top: 10px;
				span {
					float: left;
					width: 70px;
					text-align: right;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.bg_hid {
					clear: both;
					overflow: hidden;
					margin-left: 50px;
					p {
						float: none;
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
			.carousel {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				clear: both;
				overflow: hidden;
				span {
					float: left;
					width: 70px;
					text-align: right;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.carousel_hid {
					clear: both;
					overflow: hidden;
					margin-left: 70px;
					p {
						clear: both;
						overflow: hidden;
						float: none;
						margin-top: 10px;
						span {
							width: auto;
							margin-left: 5px;
						}
						input {
							float: left;
							margin-right: 4px;
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 60px;
						}
					}
				}
			}
		}
	}
	
	.on_con img {
		width: 100px;
		height: 100px;
	}
	
	.on_con {
		width: 120px;
		margin-left: 80px;
		margin-top: 20px;
		position: relative;
		height: 120px;
	}
	
	.on_con .close {
		position: absolute;
		right: 0;
		top: 0;
		color: #FFFFFF;
		background: red;
		text-align: center !important;
		width: 15px !important;
		height: 17px;
		cursor: pointer;
		line-height: 17px;
		border-radius: 100%;
		text-align: center;
		opacity: 0.7;
		font-size: 11px;
		display: none;
	}
	
	.on_con:hover .close {
		display: block;
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