<template>
	<div class="carEdit">
		<ul class="left">
			<li @click="changetype(1)" :class="{active:typenumber == 1}">常规</li>
			<li @click="changetype(2)" :class="{active:typenumber == 2}">轮播设置</li>
			<li @click="changetype(3)" :class="{active:typenumber == 3}">高级</li>
		</ul>
		<div class="right">
			<div class="one" v-if="typenumber == 1">
				<!--p class="title">
					<span>模块标题：</span>
					<input type="text" value="banner" />
				</p-->
				<div>
					<span>轮播设置：</span>
					<span>图片轮播：</span>
					<input type="radio" name="picTxt" @click="picMul()" :checked="itemMdata.picMul"/>
					<span>图文轮播：</span>
					<input type="radio" name="picTxt" @click="txtMul()" :checked="itemMdata.txtMul"/>
				</div>
				<div v-show="itemMdata.txtMul" class="txt">
					<span>左边距：</span>
					<input type="text" v-model="itemMdata.txtStyle.paddingLeft"/>
					<span>右边距：</span>
					<input type="text" v-model="itemMdata.txtStyle.paddingRight"/>
					<span>上边距：</span>
					<input type="text" v-model="itemMdata.txtStyle.paddingTop"/>
					<span>下边距：</span>
					<input type="text" v-model="itemMdata.txtStyle.paddingBottom"/>
					<span>图片宽度：</span>
					<input type="text" v-model="itemMdata.imgStyle.width"/>
					<span>图片高度：</span>
					<input type="text" v-model="itemMdata.imgStyle.height"/>
					<span>文本宽度：</span>
					<input type="text" v-model="itemMdata.txtStyle.width"/>
					<span>文本高度：</span>
					<input type="text" v-model="itemMdata.txtStyle.height"/>
				</div>
				<div class="style">

					<p>切换样式：</p>
					<ul class="list">
						<li @click="selctCurFun(item,index)" v-for="(item,index) in selctCur">
							<label :class="{'active':item.cur}">
							    <input type="radio" name="style" v-model="item.mValue" />
							    <div :class="[item.mClass]"></div>
						    </label>
							<p>{{item.mText}}</p>
						</li>

					</ul>

				</div>
				<div v-show="itemMdata.curIndex == 0" class="setPage">

					<span>原始背景色;</span>
					<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.pageBg.backgroudColor"></el-color-picker>
					<span>高亮背景色:</span>
					<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.activeBg.backgroudColor"></el-color-picker>
					<span>原始字体颜色:</span>
					<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.pageBg.color"></el-color-picker>
					<span>高亮字体颜色:</span>
					<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.activeBg.color"></el-color-picker>
					<div>
						<span>宽度：</span>
						<input type="text" v-model="itemMdata.pageSpan.width"/>
						<span>高度：</span>
						<input type="text" v-model="itemMdata.pageSpan.height"/>
						<span>字体大小：</span>
						<input type="text" v-model="itemMdata.pageSpan.fontSize"/>
					</div>
				</div>
				<div v-show="itemMdata.curIndex == 1||itemMdata.curIndex == 2" class="setPage">
					<span>修改页码图标：</span>
					<button @click="setPageImg()">添加原始图标</button>
					<button @click="setActiveImg()">添加高亮图标</button>
					<div>
						<p>
							<span class="close" @click="beforeRemoveImg(3)"></span>
							<img :src="itemMdata.pageImg.url" class="pre" v-show="itemMdata.pageImg.showImg==1"/>
						</p>
						<p>
							<span class="close" @click="beforeRemoveImg(4)"></span>
							<img :src="itemMdata.activeImg.url" class="next" v-show="itemMdata.activeImg.showImg==1"/>
						</p>
					</div>
					
				</div>
				<div v-show="itemMdata.curIndex == 3" class="setBtn">
					<span>修改切换按钮：</span>
					<button @click="editPre('pre')">左边</button>
					<button @click="editNext('next')">右边</button>
					<div>
						<p>
							<span class="close" @click="beforeRemoveImg(1)"></span>
							<img :src="itemMdata.mulPre.url" class="pre" v-show="itemMdata.mulPre.showImg==1"/>
						</p>
						<p>
							<span class="close" @click="beforeRemoveImg(2)"></span>
							<img :src="itemMdata.mulNext.url" class="next" v-show="itemMdata.mulNext.showImg==1"/>
						</p>
					</div>
					<span>修改高亮按钮：</span>
					<button @click="editPre('activePre')">左边</button>
					<button @click="editNext('activeNext')">右边</button>
					<div>
						<p>
							<span class="close" @click="beforeRemoveImg(5)"></span>
							<img :src="itemMdata.activemulPre.url" class="pre" v-show="itemMdata.activemulPre.showImg==1"/>
						</p>
						<p>
							<span class="close" @click="beforeRemoveImg(6)"></span>
							<img :src="itemMdata.activemulNext.url" class="next" v-show="itemMdata.activemulNext.showImg==1"/>
						</p>
					</div>		
				</div>
				<div class="page">
					<p>轮播页数：</p>
					<el-select v-model="value" placeholder="请选择" @change="setPageNum(value)">
						<el-option v-for="(item,index) in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="speed">
					<p>轮播速度：</p>
					<el-select v-model="itemMdata.speedIndex" placeholder="请选择">
						<el-option v-for="(item,index) in speed" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="two" v-if="typenumber == 2">
				<table>
					<tr>
						<th width="40%">图片</th>
						<th width="30%">页数</th>
						<th width="30%">操作</th>
					</tr>
					<tr v-for="(itemr,index) in itemMdata.slideList">
						<td>
							<img @click="mDataSelt(itemr,index)" :src="itemr.image" :alt="itemr.name" />
						</td>
						<td>
							<p>第{{index+1}}页</p>
						</td>
						<td>
							<p class="edit" @click="imgedit(itemr)"></p>
						</td>
					</tr>
					<!--tr>
						<td>
							<img src="../../../static/image/default.png" />
						</td>
						<td>
							<p>第2页</p>
						</td>
						<td>
							<p class="edit" @click="imgedit(itemr)"></p>
						</td>
					</tr>
					<tr>
						<td>
							<img src="../../../static/image/default.png" />
						</td>
						<td>
							<p>第3页</p>
						</td>
						<td>
							<p class="edit" @click="imgedit(itemr)"></p>
						</td>
					</tr-->
				</table>
				<div class="formType">
					<p>
						<span>轮播分类：</span>
					</p>
					<div class="formBox">
						<p v-for="(item,idx) in itemMdata.mulTypeList">
							<input type="radio" @click="chooseForm(item)" name="choose" :id="'choose'+idx" :checked="mulTypeListId==item.id"/>
							<span>{{item.category_name}}</span>
						</p>
					</div>
				</div>
				<uiLink :itemMdata='itemImge' :editDial="editDial"></uiLink>
				<el-dialog title="添加图片" :modal=false :visible.sync="flag" width="60%">
					<div class="g-cf add_nav_cons">
						<div class="list_con">
							<mImageEdit :itemMdata="itemImge" @recoent="recoent"></mImageEdit>
						</div>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="flag = false">取 消</el-button>
						<el-button type="primary" @click="flag = false">保 存</el-button>
					</span>
				</el-dialog>
				<div class="img_edit" v-show="img_edit">
					<div class="top">
						<p>设置图片</p>
						<p @click="img_edit = !img_edit">X</p>
					</div>
					<div class="con_rt">
						<el-button>上传按钮</el-button>
						<div class="inner">
							<img src="/static/image/default.png" />
						</div>
					</div>
					<!--el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3M</div>
					</el-upload-->
				</div>
			</div>
			<div class="three" v-if="typenumber == 3">
				<div class="list">
					<p>通栏边框：</p>
					<p @click="border_hid = false">
						<input type="radio" name="border" id="border1" :checked="border_hid == false"/>
						<label for="border1">隐藏</label>
					</p>
					<p @click="border_hid = true">
						<input type="radio" name="border" id="border2" :checked="border_hid == true" />
						<label for="border2">显示</label>
					</p>
					<div class="border_hid" v-show="border_hid">
						<p>
							<span>宽度：</span>
							<input type="text" value="1" />
						</p>
						<p>
							<span>样式：</span>
							<el-select v-model="value3" placeholder="请选择">
								<el-option v-for="item in lines" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</p>
						<p>
							<span>颜色：</span>
							<div class="block">
								<el-color-picker v-model="color1"></el-color-picker>
							</div>
						</p>
					</div>
				</div>
				<div class="list">
					<p>内容边距：</p>
					<p>
						<input type="radio" name="margin" id="margin1" checked="checked" />
						<label for="margin1">默认</label>
					</p>
					<p>
						<input type="radio" name="margin" id="margin2" />
						<label for="margin2">自定义</label>
					</p>
				</div>
				<div class="list">
					<p>内容宽度：</p>
					<p>
						<input type="radio" name="width" id="width1" checked="checked" />
						<label for="width1">默认</label>
					</p>
					<p>
						<input type="radio" name="width" id="width2" />
						<label for="width2">自定义</label>
					</p>
				</div>
				<div class="list">
					<p>轮播设置：</p>
					<p @click="itemMdata.autoPlay = false">
						<input type="radio" name="play" id="play1" :checked="itemMdata.autoPlay == false"/>
						<label for="play1">手动轮播</label>
					</p>
					<p @click="itemMdata.autoPlay = true">
						<input type="radio" name="play" id="play2"  :checked="itemMdata.autoPlay == true" />
						<label for="play2">自动轮播</label>
					</p>
				</div>
			</div>

		</div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag=='pre'" :itemMdata="itemMdata.mulPre"></mImageEdit>
					<mImageEdit v-if="flag=='next'" :itemMdata="itemMdata.mulNext"></mImageEdit>
					<mImageEdit v-if="flag=='page'" :itemMdata="itemMdata.pageImg"></mImageEdit>
					<mImageEdit v-if="flag=='active'" :itemMdata="itemMdata.activeImg"></mImageEdit>
					<mImageEdit v-if="flag=='activePre'" :itemMdata="itemMdata.activemulPre"></mImageEdit>
					<mImageEdit v-if="flag=='activeNext'" :itemMdata="itemMdata.activemulNext"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisibleNav = false">取 消</el-button>
				<el-button type="primary" @click="addVisibleFun();add($event)">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import uiLink from '@/components/m/uiLink.vue'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	import api from '@/api/$ajax.js'
	export default {
		name: 'multiCarouselEdit',
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata);
			this.itemMdata.hoverStyle = this.itemMdata.hoverStyle || {};
		},
		components: {
			uiLink,
			mImageEdit
		},
		data() {
			return {
				title: "编辑轮播多图",
				typenumber: '1',
				token: this.$route.query.token,
				type: this.$route.query.type,
				mulTypeListId:'',
				options: [{
					value: '2',
					label: '2'
				}, {
					value: '3',
					label: '3'
				}, {
					value: '4',
					label: '4'
				}, {
					value: '5',
					label: '5'
				}],
				value: '',
				speed: [{
					value: '1',
					label: '1秒'
				}, {
					value: '1.5',
					label: '1.5秒'
				}, {
					value: '2',
					label: '2秒'
				}, {
					value: '3.5',
					label: '3.5秒'
				}],
				value2: '',
				editDial: {
					artTitle: "设置链接地址",
					setlink: false
				},
				itemImge: {},
				itemIndex: 0,
				fileList2: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
				img_edit: false,
				flag: false,
				color1: '#409EFF',
				selctCur: [{
					mClass: 'style_one',
					mText: "数字切换",
					cur: true,
					mValue: 1
				}, {
					mClass: 'style_two',
					mText: "圆点切换",
					cur: false,
					mValue: 2
				}, {
					mClass: 'style_three',
					mText: "方块切换",
					cur: false,
					mValue: 3
				}, {
					mClass: 'style_four',
					mText: "箭头切换",
					cur: false,
					mValue: 4
				}],
				lines: [{
					value: '选项1',
					label: '实线'
				}, {
					value: '选项2',
					label: '虚线'
				}, {
					value: '选项3',
					label: '点线'
				}],
				value3: '',
				border_hid: true,
				addVisibleNav: false,
			}
		},
		methods: {
			chooseForm(item){
				this.mulTypeListId = item.id
				var v = this;
				//http://api.xiaohucloud.com/api/data/bannerList?token=2f5a0aa916f246b08ad9befefad9702e7uP5N4&type=14
				api.get('/api/data/bannerList?token='+this.token+'&type='+item.id,true,{}, function(data) {
						//console.log(data);
						v.itemMdata.slideList = data.data;
					}
				);
			},
			picMul(){
				this.itemMdata.picMul = true;
				this.itemMdata.txtMul = false;
				this.itemMdata.imgStyle.width = "100%"
			},
			txtMul(){
				this.itemMdata.picMul = false;
				this.itemMdata.txtMul = true;
				this.itemMdata.imgStyle.width = "50%"
			},
			setPageNum(value){
				var v = this;	
				if(this.itemMdata.picMul){
					api.get('/api/data/bannerList?token=' + this.token + '&type='+this.type,false,{}, function(data) {
						//var result = JSON.stringify(data); //json对象转成字符串
						v.itemMdata.slideList = data.data;
						var len = v.itemMdata.slideList.length - parseInt(value)
						v.itemMdata.slideList = v.itemMdata.slideList.splice(value,len);
					
						
						v.itemMdata.isShow = false;
						if(v.itemMdata.timer){
							clearInterval(v.itemMdata.timer);
						}
						setTimeout(function() {
							v.itemMdata.isShow= true;					
						}, 10);
					});
				}
				if(this.itemMdata.txtMul){
					api.get('/api/data/bannerList?token=' + this.token + '&type='+this.mulTypeListId,false,{}, function(data) {
						//var result = JSON.stringify(data); //json对象转成字符串
						v.itemMdata.slideList = data.data;
						var len = v.itemMdata.slideList.length - parseInt(value)
						v.itemMdata.slideList = v.itemMdata.slideList.splice(value,len);
					
						
						v.itemMdata.isShow = false;
						if(v.itemMdata.timer){
							clearInterval(v.itemMdata.timer);
						}
						setTimeout(function() {
							v.itemMdata.isShow= true;					
						}, 10);
					});
				}
				
				
			},
			addVisibleFun() {
				this.addVisibleNav = false;
			},
			add: function(e) {
				e.preventDefault();

				//添加切换按钮设置
				if(this.flag=='pre'){
					this.itemMdata.spanStyle.backgroundImage = 'url('+this.itemMdata.mulPre.url+')';
					this.itemMdata.spanStyle.width = $('.setBtn').find('.pre')[0].naturalWidth+'px';
					this.itemMdata.spanStyle.height = $('.setBtn').find('.pre')[0].naturalHeight+'px';
					//this.itemMdata.styleTwo.width = (this.itemMdata.parentStyle.width-$('.setBtn').find('.pre')[0].naturalWidth*2)+'px'
					//console.log($('.setBtn').find('.pre')[0].naturalWidth)
					this.itemMdata.mulPre.showImg = 1;
					this.itemMdata.spanStyle.borderRadius = '0';
				}
				if(this.flag=='next'){
					this.itemMdata.spanStyle.backgroundImage = 'url('+this.itemMdata.mulNext.url+')';
					this.itemMdata.spanStyle.width = $('.setBtn').find('.pre')[0].naturalWidth+'px';
					this.itemMdata.spanStyle.height = $('.setBtn').find('.pre')[0].naturalHeight+'px';
					//this.itemMdata.styleTwo.width = (this.itemMdata.parentStyle.width-$('.setBtn').find('.pre')[0].naturalWidth*2)+'px'
					this.itemMdata.mulNext.showImg = 1;
					this.itemMdata.spanStyle.borderRadius = '0';
				}
				if(this.flag=='activePre'){
					this.itemMdata.spanStyle.width = $('.setBtn').find('.pre')[0].naturalWidth+'px';
					this.itemMdata.spanStyle.height = $('.setBtn').find('.pre')[0].naturalHeight+'px';
					this.itemMdata.activemulPre.showImg = 1;
					this.itemMdata.spanStyle.borderRadius = '0';
				}
				if(this.flag=='activeNext'){
					this.itemMdata.spanStyle.width = $('.setBtn').find('.pre')[0].naturalWidth+'px';
					this.itemMdata.spanStyle.height = $('.setBtn').find('.pre')[0].naturalHeight+'px';
					this.itemMdata.activemulNext.showImg = 1;
					this.itemMdata.spanStyle.borderRadius = '0';
				}
				if(this.flag=='page'){
					this.itemMdata.pageSpan.backgroundImage = 'url('+this.itemMdata.pageImg.url+')';
					this.itemMdata.pageSpan.width = $('.setPage').find('.pre')[0].naturalWidth+'px';
					this.itemMdata.pageSpan.height = $('.setPage').find('.pre')[0].naturalHeight+'px';
					//this.itemMdata.pageSpan.borderRadius = '0';
					this.itemMdata.pageImg.showImg = 1;
					
				}
				if(this.flag=='active'){
					this.itemMdata.pageSpan.backgroundImage = 'url('+this.itemMdata.activeImg.url+')';
					this.itemMdata.pageSpan.width = $('.setPage').find('.pre')[0].naturalWidth+'px';
					this.itemMdata.pageSpan.height = $('.setPage').find('.pre')[0].naturalHeight+'px';
					//this.itemMdata.pageSpan.borderRadius = '0';
					this.itemMdata.activeImg.showImg = 1;
					
				}
				var ts = this;
				ts.itemMdata.isShow = false;
				console.log("ts");
				console.log(ts.itemMdata.timer);
				if(ts.itemMdata.timer){
					clearInterval(ts.itemMdata.timer);
				}
				setTimeout(function() {
					ts.itemMdata.isShow= true;					
				}, 10);
			},
			beforeRemoveImg(flag) {
				//console.log(this.flag)
				
				if(flag == 2) {
					this.itemMdata.mulNext.url = '/static/image/next.png';
					this.itemMdata.mulNext.showImg = 0;
				} else if(flag == 1){
					this.itemMdata.mulPre.url = '/static/image/pre.png';
					this.itemMdata.mulPre.showImg = 0;
				}else if(flag == 3){
					this.itemMdata.pageImg.url = '';
					this.itemMdata.pageImg.showImg = 0;
				}else if(flag == 4){
					this.itemMdata.activeImg.url = '';
					this.itemMdata.activeImg.showImg = 0;
				}
				else if(flag == 5){
					this.itemMdata.activemulPre.url = '';
					this.itemMdata.activemulPre.showImg = 0;
				}else if(flag == 6){
					this.itemMdata.activemulNext.url = '';
					this.itemMdata.activemulNext.showImg = 0;
				}
				this.itemMdata.spanStyle.width = '50px';
				this.itemMdata.spanStyle.height = '50px';
				this.itemMdata.spanStyle.borderRadius = '50%';
				//this.itemMdata.styleTwo.width = (this.itemMdata.parentStyle.width-parseInt(this.itemMdata.spanStyle.width)*2)+'px'
				var ts = this;
				ts.itemMdata.isShow = false;
				console.log("ts");
				console.log(ts.itemMdata.timer);
				if(ts.itemMdata.timer){
					clearInterval(ts.itemMdata.timer);
				}
				setTimeout(function() {
					ts.itemMdata.isShow= true;					
				}, 10);
			},
			setPageImg(flag){
				this.flag='page';
				this.addVisibleNav=true
			},
			setActiveImg(flag){
				this.flag='active';
				this.addVisibleNav=true
			},
			editPre(flag){
				this.flag=flag;
				this.addVisibleNav=true
				
			},
			editNext(flag){
				this.flag=flag;
				this.addVisibleNav=true
			},
			changetype: function(number) {
				this.typenumber = number
			},
			selctCurFun(item, index) {
				for(var g = 0; g < this.selctCur.length; g++) {
					this.selctCur[g].cur = false;
				}
				item.cur = true;
				this.itemMdata.curIndex = index;
				if(this.itemMdata.curIndex==2||this.itemMdata.curIndex==0){
					this.itemMdata.pageSpan.borderRadius = '0';
				}
				if(this.itemMdata.curIndex==1){
					this.itemMdata.pageSpan.borderRadius = '50%';
				}
				console.log(item);
				var ts = this;
				ts.itemMdata.isShow = false;
				console.log("ts");
				console.log(ts.itemMdata.timer);
				if(ts.itemMdata.timer){
					clearInterval(ts.itemMdata.timer);
				}
				setTimeout(function() {
					ts.itemMdata.isShow= true;					
				}, 10);
			},
			border: function() {

			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			mDataSelt(i, index) {
				console.log(i)
				this.itemIndex = index;
				this.itemImge = i;
				this.flag = true;
			},
			recoent(itemImg) {
				//if(this.editDial.parentStyle.width < itemImg.width) {
				this.itemMdata.parentStyle.width = itemImg.width;
				this.itemMdata.parentStyle.height = itemImg.height;
				//console.log("itemImg");
				//}
				//	this.itemMdata.isShow = false;
				//	this.itemMdata.slideList[this.itemIndex].image=itemImg.url;
				//}		
				var ts = this;
				setTimeout(function() {
					//ts.itemMdata.isShow = true;
				}, 200);
				//console.log(this.itemMdata.slideList);
				//debugger;
				
			},
			imgedit: function(i) {
				//console.log(i)
				this.itemImge = i;
				this.editDial.setlink = true;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.carEdit {
		clear: both;
		overflow: hidden;
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
			li:nth-child(1),
			li:nth-child(2) {
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
			box-sizing: border-box;
			float: left;
			width: 84.8%;
			height: 530px;
			padding: 30px;
			.txt{
				input{
					border:1px solid #ccc;
					width:60px;
				}
			}
			.one .title {
				clear: both;
				overflow: hidden;
				height: 42px;
				input {
					height: 40px;
					width: 220px;
					padding-left: 10px;
					border: 1px solid #E3E3E3;
				}
				input:hover,
				input:focus {
					border: 1px solid #409EFF;
				}
			}
			.one .style {
				clear: both;
				overflow: hidden;
				margin-top: 30px;
				p {
					float: left;
				}
				.list {
					float: left;
					width: 90%;
					li {
						float: left;
						width: 18%;
						margin-left: 5px;
						margin-right: 5px;
						label {
							display: block;
							width: 100%;
							border: 1px solid #E3E3E3;
							height: 43px;
							position: relative;
							cursor: pointer;
							div {
								width: 90px;
								height: 25px;
								background-image: url(/static/image/mbg01.png);
								background-repeat: no-repeat;
								margin-left: 13px;
								margin-top: 10px;
							}
							.style_one {
								background-position: -875px -1282px;
							}
							.style_two {
								background-position: -875px -1345px;
							}
							.style_three {
								background-position: -875px -1404px;
							}
							.style_four {
								background-position: -875px -1214px;
							}
							input {
								position: absolute;
								top: 0;
								bottom: 0;
								left: 0;
								right: 0;
								opacity: 0;
								cursor: pointer;
							}
						}
						label:hover {
							border: 1px solid #409EFF;
						}
						.active {
							border: 1px solid #409EFF;
						}
						p {
							float: none;
							text-align: center;
							line-height: 30px;
							font-size: 13px;
						}
					}
				}
			}
			.setBtn,.setPage{
				margin-top:10px;
				.el-color-picker{
					vertical-align:middle;
				}
				input{
					border:1px solid #ccc;
				}
				button{
					background:#409EFF;
					padding:5px 20px;
					color:#fff;
					border-radius:5px;
				}
				div{
					margin-top:10px;
					img{
						width:100px;
						height:100px;
					}
					p{
						float:left;
						position:relative;
						span{
							position: absolute;
							right: 0;
							top: 0;
							width: 25px !important;
							height: 25px;
							background:url(/static/image/iconIndex2.png) -1028px 218px;
							display: none;
						}
					}
					p:hover span{
						display: block;
					}
				}
			}
			.one .page,
			.one .speed {
				clear: both;
				overflow: hidden;
				margin-top: 30px;
				p {
					float: left;
					margin-right: 5px;
				}
			}
			.two table {
				width: 100%;
				border: 1px solid #E3E3E3;
				th {
					background: #f8f9fb;
					height: 45px;
				}
				td {
					text-align: center;
					padding: 15px 0;
					img {
						max-width: 60%;
						height: 50px;
					}
					.edit {
						width: 20px;
						height: 20px;
						background-image: url(/static/image/mbg01.png);
						background-repeat: no-repeat;
						background-position: -405px -60px;
						margin-left: 45%;
						cursor: pointer;
					}
				}
				tr:nth-child(2n-1) {
					background: #f8f9fb;
				}
			}
			.two .img_edit {
				position: absolute;
				top: 50px;
				left: 90px;
				right: 90px;
				bottom: 20px;
				background: #FFFFFF;
				box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.2);
				border-radius: 5px;
				.top {
					border-bottom: 1px solid #E3E3E3;
					padding: 10px 15px;
					clear: both;
					overflow: hidden;
					p:nth-child(1) {
						float: left;
						font-size: 16px;
					}
					p:nth-child(2) {
						float: right;
						font-size: 16px;
					}
				}
				.upload-demo {
					padding: 25px;
				}
			}
			.three .list {
				clear: both;
				overflow: hidden;
				margin-top: 20px;
				p {
					float: left;
					margin-right: 15px;
				}
				.border_hid {
					float: left;
					margin-top: 40px;
					margin-left: -50px;
					p {
						float: none;
						margin-bottom: 10px;
						input {
							border: 1px solid #E3E3E3;
							padding-left: 10px;
							line-height: 35px;
						}
						span {
							float: left;
						}
					}
					.block {
						float: left;
					}
				}
			}
		}
	}
</style>