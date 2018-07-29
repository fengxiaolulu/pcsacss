<template>
	<div>
		<div class="newDesEdit" v-show="itemMdata.isNewDes==true">
			<div class="top">
				<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
				<!--<p @click="changetype(2)" :class="{active:typenumber == 2}">图片特效</p>-->
			</div>
			<div class="detail">
				<div class="one clearfloat" v-if="typenumber == 1">
					<div class="style">
						<p>页面样式：</p>
						<ul id="style">
							<li  v-for="(item,idx) in itemMdata.newDesEditeImg" @click="desImg(idx)"  :class="{active:itemMdata.modelStyle==idx}">
								<img :src="item"/>
								<span class="icon"></span>
							</li>
						</ul>
					</div>
					<div class="share">
						<p>开启分享：</p>
						<p @click="itemMdata.shareId=1">
							<input type="radio" name="set2" id="set2_1" :checked="itemMdata.shareId==1" />
							<label for="set1_1">是</label>
						</p>
						
						<p @click="itemMdata.shareId=2">
							<input type="radio" name="set2" id="set2_2" :checked="itemMdata.shareId==2"  />
							<label for="set1_2">否</label>
						</p>
					</div>
					<!--<div class="yes"  v-if="itemMdata.shareId==1">
						<span class="weixin yesIcon"></span>
						<span class="weibo yesIcon"></span>
						<span class="qzone yesIcon"></span>
						<span class="douban yesIcon"></span>
					</div>-->
					<div class="pageEle">
						<p>页面元素：</p>
						<ul>
							<li v-for="(item,idx) in itemMdata.pageEle">
								<input type="checkbox" ref="check" @click="pageEleS(idx,$event,item)"/> 
								<span>{{item.name}}</span>
							</li>
						</ul>
					</div>
					
					<div class="content">
						<p>标题样式：</p>
						<p @click="itemMdata.onenumber=1">
							<input type="radio" name="set1" id="set1_1" :checked="itemMdata.onenumber==1" />
							<label for="set1_1">默认</label>
						</p>
						<p @click="itemMdata.onenumber=2">
							<input type="radio" name="set1" id="set1_2" :checked="itemMdata.onenumber==2"/>
							<label for="set1_2">自定义</label>
						</p>
						<div class="colorStyle" v-if="itemMdata.onenumber=='2'">
							<p>
								<span>大小：</span><input type="text" v-model="itemMdata.iStyle.fontSize"/>
								<span>加粗：</span><input type="checkbox" ref="check" @click="checkBox"  :checked="itemMdata.bold==1"/>
							</p>
							<p>
								<span>颜色：</span>
								<el-color-picker show-alpha color-format="rgb" size="medium" v-model="itemMdata.iStyle.color"></el-color-picker>
							</p>
							<p>
								<span>对齐：</span>
								<span @click="titleSet(1)"><input type="radio" name="set3" id="set3_1" :checked="itemMdata.titlenumber==1"/><label for="set3_1">左对齐</label></span>
								<span @click="titleSet(2)"><input type="radio" name="set3" id="set3_2" :checked="itemMdata.titlenumber==2"/><label for="set3_2">居中</label></span>
								<span @click="titleSet(3)"><input type="radio" name="set3" id="set3_3" :checked="itemMdata.titlenumber==3"/><label for="set3_3">右对齐</label></span>
							</p>
							
							<p>
								<span>样式：</span>
								<el-select v-model="itemMdata.iStyle.fontFamily" placeholder="itemMdata.iStyle.fontFamily">
									<el-option v-for="(item,idx) in options" :key="idx" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</p>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		<div class="newDesEditTwo" v-show="itemMdata.isNewDes==false">
			<div class="top">
				<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
				<p @click="changetype(2)" :class="{active:typenumber == 2}">高级</p>
				<p @click="changetype(3)" :class="{active:typenumber == 3}">百度优化</p>
			</div>
			<div class="detail">
				<div class="one clearfloat" v-if="typenumber == 1">
					<p>
						<span>文章标题：</span>
						<input type="text" value=""/>
					</p>
					<div class="components-container">
						<div class="editor-container">
							<UE :defaultMsg="itemMdata.newDesInfo.content" :config=config ref="ue"></UE>
						</div>
					</div>
				</div>
				<div class="two clearfloat" v-if="typenumber == 2">
					<el-form  label-width="80px">
						<el-form-item label="日期">
							<el-input v-model="itemMdata.newDesInfo.add_time"></el-input>
						</el-form-item>
						<el-form-item label="作者">
							<el-input v-model="itemMdata.newDesInfo.author"></el-input>
						</el-form-item>
						<el-form-item label="分类">
							<el-input v-model="itemMdata.newDesInfo.add_time"></el-input>
						</el-form-item>
						<el-form-item label="来源">
							<el-input v-model="itemMdata.newDesInfo.source"></el-input>
						</el-form-item>
						<el-form-item label="网址">
							<el-input v-model="itemMdata.newDesInfo.source"></el-input>
						</el-form-item>
						<el-form-item label="上/下一篇">
							<el-input v-model="itemMdata.newDesInfo.add_time"></el-input>
						</el-form-item>
						<el-form-item label="二维码">
							<el-input v-model="itemMdata.newDesInfo.add_time"></el-input>
						</el-form-item>
						<el-form-item label="文章摘要">
							<el-input type="textarea" v-model="itemMdata.article"></el-input>
						</el-form-item>
					</el-form>
					<div class="share">
						<p>阅读权限：</p>
						<p @click="twoSet(1)">
							<input type="radio" name="set2" id="set2_1" checked="checked" />
							<label for="set1_1">默认</label>
						</p>
						
						<p @click="twoSet(2)">
							<input type="radio" name="set2" id="set2_2" />
							<label for="set1_2">自定义</label>
							
						</p>
						<span v-if=" twonumber=='2'">
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in readOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</span>
					</div>
					<div class="newsArticalImg">
						<span>正文头图：</span>
						<input type="button" value="添加图片" v-if="itemMdata.newDesInfo.image==''"  @click="visibleNav($event)"/>
						<input type="button" value="修改图片" v-if="itemMdata.newDesInfo.image!=''"  @click="visibleNav($event)"ref="headh"/>
						<div>
							<img :src="itemMdata.newDesInfo.image"/>
						</div>
					</div>
					<div class="share newsArticalImg">
						<p>文章列表缩略图：</p>
						<p @click="oneSet(1)">
							<input type="radio" name="set1" id="set1_1" checked="checked" />
							<label for="set1_1">与正文一样</label>
						</p>
						
						<p @click="oneSet(2)">
							<input type="radio" name="set1" id="set1_2" />
							<label for="set1_2">自定义</label>
							
						</p>
						<span v-if=" onenumber=='1'">
							<img :src="itemMdata.newDesInfo.image"/>
						</span>
						<span v-if=" onenumber=='2'">
							<input type="button" value="添加图片"  @click="visibleNav($event)"ref="th"/>
						</span>
						<span v-if=" onenumber=='2'">
							<img :src="itemMdata.th.url"/>
						</span>
					</div>
					<div>
						<span>附件下载：</span>
						<input type="button" value="添加附件"/>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
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
	import UE from '@/components/m/ueditor.vue'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	import api from '@/api/$ajax.js'
	export default {
		name: 'newDesEdit',
		props: ['itemMdata'],
		components: {
			UE,
			mImageEdit
		},
		created() {
			//console.log(this.itemMdata);
			this.getData();
		},
		data() {
			return {
				flag: 1,
				addVisibleNav: false,
				title: "编辑新闻详情",
				typenumber:'1',
				setnumber:'1',
				token: this.$route.query.token,
				set3_hid: true,
				newsCategory:[],
				set_default: true,
				set_custom: false,
				newArticle: '',
				typenumber: '1',
				onenumber:'1',
				twonumber:'1',
				threenumber:'1',
				
				options: [{
					value: '微软雅黑',
					label: '微软雅黑'
				}, {
					value: '宋体',
					label: '宋体'
				}, {
					value: '黑体',
					label: '黑体'
				}, {
					value: '幼圆',
					label: '幼圆'
				}],
				readOptions: [{
				value: '选项1',
				label: '全部'
				}, {
				value: '选项2',
				label: '普通会员'
				}, {
				value: '选项3',
				label: '黄金会员'
				}, {
				value: '选项4',
				label: '黄金会员'
				}, {
				value: '选项5',
				label: '钻石会员'
				}],
				value: '',
				newPic: {
					url: "",
					text: "",
					link: "",
					describe: ""
				},
				imgAdd:'',
				config: {
					serverUrl: "https://jsonplaceholder.typicode.com/posts/",
					initialFrameWidth: null,
					initialFrameHeight: 180
				}

			}
		},
		beforeDestroy() {
			if(this.itemMdata.isNewDes==false && this.typenumber == 1){
				this.getUEContent();
				console.log("beforeDestroy");
			}
			
		},
		methods: {	
			add: function(e, list) {
				e.preventDefault();
				//console.log("list:::::"+JSON.stringify(list));
				var newPic = JSON.parse(JSON.stringify(list));
				this.itemMdata.newsImg.push(newPic);
				console.log(newPic)
				if(this.imgAdd == 1){
					//console.log(this.itemMdata.newsImg)
					this.itemMdata.newDesInfo.image =newPic.url;
				}
				if(this.imgAdd == 2){
					console.log(44)
					this.itemMdata.th.url = newPic.url;
				}
			},
			visibleNav(e) {				
				this.addVisibleNav = true;
				console.log("ssd");
				if(e.target == this.$refs.headh){
					//console.log(this.itemMdata.newsImg)
					this.imgAdd = 1;
				}
				if(e.target == this.$refs.th){
					this.imgAdd = 2;
				}
			},
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
				//console.log("ni")
			},
			addVisibleFun() {
				this.addVisibleNav = false;
			},
			pageEleS(idx,e,item){
				
				this.itemMdata.pageEleSId = idx;
				this.itemMdata.checkList = this.$refs.check;
				item.show=true;
				console.log(this.itemMdata.checkList)
				if(this.$refs.check[idx].checked){
					this.itemMdata.pageEleSIds.push(idx);
				}
				else if(!this.$refs.check[idx].checked){
					this.itemMdata.pageEleSIds.splice(this.itemMdata.pageEleSIds.indexOf(idx),1)
				}
				this.itemMdata.oneId = this.itemMdata.pageEleSIds.indexOf(0);
				//console.log(this.itemMdata.oneId)
				this.itemMdata.twoId = this.itemMdata.pageEleSIds.indexOf(1);
				this.itemMdata.threeId = this.itemMdata.pageEleSIds.indexOf(2);
				this.itemMdata.fourId = this.itemMdata.pageEleSIds.indexOf(3);
				this.itemMdata.fiveId = this.itemMdata.pageEleSIds.indexOf(4);
				this.itemMdata.sixId = this.itemMdata.pageEleSIds.indexOf(5);
				this.itemMdata.sevenId = this.itemMdata.pageEleSIds.indexOf(6);
				this.itemMdata.eightId = this.itemMdata.pageEleSIds.indexOf(7);
				
			},
			oneSet:function(number){
				this.onenumber = number
			},
			checkBox(){
				console.log(this.$refs.check)
				if(this.$refs.check.checked){
					this.itemMdata.iStyle.fontWeight = "bold";
					this.itemMdata.bold = 1;
				}else{
					this.itemMdata.iStyle.fontWeight = "normal";
					this.itemMdata.bold = 2;
				}
				
			},
			titleSet(number){
				this.itemMdata.titlenumber = number;
			
				if(this.itemMdata.titlenumber == 1){
					this.itemMdata.iStyle.textAlign = "left";
				}
				if(this.itemMdata.titlenumber == 2){
					this.itemMdata.iStyle.textAlign = "center";
				}
				if(this.itemMdata.titlenumber == 3){
					this.itemMdata.iStyle.textAlign = "right";
				}
			},
			twoSet:function(number){
				this.twonumber = number
				//this.itemMdata.shareId = number;
			},
			threeSet:function(number){
				this.threenumber = number
			},
			
			desImg(index){
				this.itemMdata.modelStyle = index;
				var style = document.querySelector('#style');
				var list = style.querySelectorAll('li');
				var v= this;
				for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						$(this).addClass("active").siblings().removeClass("active");
						v.itemMdata.modelStyle = i;
					}
				}
			},
			changetype: function(number) {
				this.typenumber = number
			},
			getUEContent() {
				let content = this.$refs.ue.getUEContent();
				this.itemMdata.newDesInfo.content = content;
				//var dd = UE.dom.domUtils.getStyle(p,tex-align);
				//console.log(content)
			},	
			getData() {
				var v = this;				
				api.get('/api/data/newsList?token='+this.token,true,{}, function(data) {
						//var result = JSON.stringify(data); //json对象转成字符串
						v.itemMdata.articleList=data.data;
						//$("#text").val(result);
					}
				);	
				api.get('/api/data/newsCategory?token='+this.token,
					true,{}, function(data) {
						//var result = JSON.stringify(data); //json对象转成字符串
						v.itemMdata.newsCategory = data.data;
						//$("#text").val(result);
					}
				);
					
			}

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.newDesEdit,.newDesEditTwo{
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
		.detail{
			margin:10px 20px;
			height:480px;
			overflow-x:hidden;
			input[type=button]{
				border:1px solid #ccc;
				padding:0 10px;
			}
			.one,.two{
				p {
					display:inline-block;
					vertical-align:top;
				}
				.style ,.pageEle{
					clear: both;
					overflow: hidden;
					margin-top: 15px;
					
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
				.pageEle{
					ul{
						li{
							border:1px solid #fff;
						}
					}
				}
				.content{
					.colorStyle{
						p{
							display:block;
							margin:10px 0;
							input[type=text]{
								border:1px solid #ccc;
							}
							input[type=radio]{
								margin:0 10px;
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
			}
			.two{
				.newsArticalImg{
					div,span{
						img{
							width:80px;
						}
					}
				}
			}
			
		}
		
	}
	.newDesEditTwo{

	}
	
</style>