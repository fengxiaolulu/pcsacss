<template>
	<div class="articleScrapEdit">
		<ul class="left">
			<li @click="changetype(1)" :class="{active:typenumber == 1}">常规</li>
			<li @click="changetype(2)" :class="{active:typenumber == 2}">高级</li>
		</ul>
		<div class="right">
			<div v-if="typenumber == 1" class="one">
				<p class="name">
					<span>模块标题：</span>
					<input type="text" value="文章列表" />
				</p>
				<div class="style">
					<span>模块样式：</span>
					<ul id="style" @click="changeborder">
						<li @click="styleone">
							<div class="style_one"></div>
							<span class="icon"></span>
						</li>
						<li @click="styletwo">
							<div class="style_two"></div>
							<span class="icon"></span>
						</li>
						<li @click="stylethree">
							<div class="style_three"></div>
							<span class="icon"></span>
						</li>
						<li @click="stylefour">
							<div class="style_four"></div>
							<span class="icon"></span>
						</li>
						<li @click="stylefive">
							<div class="style_five"></div>
							<span class="icon"></span>
						</li>
						<!--<li>
							<div class="style_four"></div>
							<span class="icon"></span>
						</li>-->
						<!--<li>
							<div class="style_five"></div>
							<span class="icon"></span>
						</li>-->
						
						<!--<li>
							<div class="style_seven"></div>
							<span class="icon"></span>
						</li>-->
					</ul>
				</div>
				<div class="setStyle" v-show="itemMdata.styleFive">
					<p>字体设置</p>
					<div class="setColor">
						
						<p>
							<label for="colorT">时间字体颜色：</label>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.firsttimeStyle.color"></el-color-picker>
						</p>
						<p>
							<label for="colorT">名称字体颜色：</label>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.firsttitleStyle.color"></el-color-picker>
						</p>
						<p>
							<label for="colorT">摘要字体颜色：</label>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.firstdescribeStyle.color"></el-color-picker>
						</p>
					</div>
					<div class="setfontSize">
						<p>
							<label for="colorT">时间字体大小：</label>
							<input type="text" v-model="itemMdata.firsttimeStyle.fontSize"/>
						</p>
						<p>
							<label for="colorT">名称字体大小：</label>
							<input type="text" v-model="itemMdata.firsttitleStyle.fontSize"/>
						</p>
						<p>
							<label for="colorT">摘要字体大小：</label>
							<input type="text" v-model="itemMdata.firstdescribeStyle.fontSize"/>
						</p>
					</div>
					<div class="setfontSize">
						<p>
							<label for="colorT">时间字体行高：</label>
							<input type="text" v-model="itemMdata.firsttimeStyle.lineHeight"/>
						</p>
						<p>
							<label for="colorT">名称字体行高：</label>
							<input type="text" v-model="itemMdata.firsttitleStyle.lineHeight"/>
						</p>
						<p>
							<label for="colorT">摘要字体行高：</label>
							<input type="text" v-model="itemMdata.firstdescribeStyle.lineHeight"/>
						</p>
					</div>
					<div class="setfontSize">
						<p>
							<label for="colorT">图片宽度：</label>
							<input type="text" v-model="itemMdata.moreStyle.width"/>
						</p>
						<p>
							<label for="colorT">图片高度：</label>
							<input type="text" v-model="itemMdata.moreStyle.height"/>
						</p>
					</div>
					<div class="setfontSize">
						<p>
							<label for="colorT">文本宽度：</label>
							<input type="text" v-model="itemMdata.textStyleH.width"/>
						</p>
						<p>
							<label for="colorT">文本高度：</label>
							<input type="text" v-model="itemMdata.textStyleH.height"/>
						</p>
						<p>
							<label for="colorT">下边距：</label>
							<input type="text" v-model="itemMdata.firsttextStyle.marginBottom"/>
						</p>
					</div>
					<p>背景设置</p>
					<div class="setColor">
						<p>
							<label for="colorT">时间背景颜色：</label>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.firsttimeStyle.background"></el-color-picker>
						</p>
						<p>
							<label for="colorT">名称背景颜色：</label>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.firsttitleStyle.background"></el-color-picker>
						</p>
						<p>
							<label for="colorT">摘要背景颜色：</label>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.firstdescribeStyle.background"></el-color-picker>
						</p>
						<p>
							<label for="colorT">背景颜色：</label>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.firsttextStyle.background"></el-color-picker>
						</p>
					</div>
				</div>
				<div class="article">
					<div class="type">
						<span>文章添加：</span>
						<p @click="itemMdata.setnumber=1">
							<input type="radio" name="type" id="type1" :checked="itemMdata.setnumber==1" />
							<label for="type1">直接添加</label>
						</p>
						<p @click="itemMdata.setnumber=2">
							<input type="radio" name="type" id="type2" :checked="itemMdata.setnumber==2"/>
							<label for="type2">使用筛选条件</label>
						</p>
					</div>
					<div class="type_one" v-if="itemMdata.setnumber == 1">
						<ul class="list">
							<li v-for="(article,index) in itemMdata.articleList">
								<p @click="removeArticle(article)">{{article.name}}</p>
							</li>
						</ul>
						<div class="icon">〉</div>
						<ul class="selected">
							<li v-for="(select,index) in itemMdata.articleSelected">
								<span>{{select.name}}</span>
								<span @click="deleteSelect(select)">X</span>
							</li>
						</ul>
					</div>
					<div class="type_two" v-if="itemMdata.setnumber == 2">
						<p>
							<input type="checkbox" id="checkbox1" />
							<label for="checkbox1">未分类</label>
						</p>
						<p v-for="(select,index) in itemMdata.newsCategory">
							<input type="checkbox" id="checkbox2" />
							<label for="checkbox2">{{select.category_name}}</label>
						</p>
						<!--p>
							<input type="checkbox" id="checkbox3" />
							<label for="checkbox3">新闻资讯</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox4" />
							<label for="checkbox4">热门案例</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox5" />
							<label for="checkbox5">人事任免</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox6" />
							<label for="checkbox6">旅游胜景</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox7" />
							<label for="checkbox7">人文风物</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox8" />
							<label for="checkbox8">自然田园</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox9" />
							<label for="checkbox9">主题公园</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox10" />
							<label for="checkbox10">统计快讯</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox11" />
							<label for="checkbox11">招标投标</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox12" />
							<label for="checkbox12">年度规划</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox13" />
							<label for="checkbox13">年度规划</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox14" />
							<label for="checkbox14">年度规划</label>
						</p-->
					</div>
				</div>
			</div>
			<div v-if="typenumber == 2" class="two">
				<div class="basic">
					<p>基本设置</p>
					<div class="detail">
						
						<div class="setShow">
							<span>摘要：</span>
							<p @click="itemMdata.describeStyle.display = 'block'">
								<input type="radio" name="set1" id="set1_1" :checked="itemMdata.describeStyle.display == 'block'" />
								<label for="set1_1">显示</label>
							</p>
							<p @click="itemMdata.describeStyle.display = 'none'">
								<input type="radio" name="set1" id="set1_2" :checked="itemMdata.describeStyle.display == 'none'"/>
								<label for="set1_2">隐藏</label>
							</p>
						</div>
						<div class="setShow">
							<span>日期：</span>
							<p @click="itemMdata.timeStyle.display = 'block'">
								<input type="radio" name="set2" id="set2_1" :checked="itemMdata.timeStyle.display == 'block'" />
								<label for="set2_1">显示</label>
							</p>
							<p @click="itemMdata.timeStyle.display = 'none'">
								<input type="radio" name="set2" id="set2_2" :checked="itemMdata.timeStyle.display == 'none'"/>
								<label for="set2_2">隐藏</label>
							</p>
						</div>
						<div class="setShow">
							<span>名称：</span>
							<p @click="itemMdata.titleStyle.display = 'block'">
								<input type="radio" name="set3" id="set3_1" :checked="itemMdata.titleStyle.display == 'block'" />
								<label for="set3_1">显示</label>
							</p>
							<p @click="itemMdata.titleStyle.display = 'none'">
								<input type="radio" name="set3" id="set3_2" :checked="itemMdata.titleStyle.display == 'none'"/>
								<label for="set3_2">隐藏</label>
							</p>
						</div>
						<div class="setShow">
							<span>分页：</span>
							<p @click="set3hid1">
								<input type="radio" name="set4" id="set4_1" :checked="itemMdata.articleSelected.length >= itemMdata.pageNum" />
								<label for="set4_1">显示</label>
							</p>
							<p @click="set3hid2">
								<input type="radio" name="set4" id="set4_2" :checked="itemMdata.articleSelected.length < itemMdata.pageNum" />
								<label for="set4_2">隐藏</label>
							</p>
							<div class="set4_hid" v-show="itemMdata.page">
								<span>每页篇数：</span>
								<input type="text" v-model="itemMdata.pageNum" />
							</div>
							
						</div>
						<div class="setShow">
							<span>排序：</span>
							<input type="radio" name="set4" id="set4_1" checked="checked" />
							<label for="set4_1">最新发表在前</label>
							<input type="radio" name="set4" id="set4_2" />
							<label for="set4_2">最新发表在后</label>
						</div>
						<div class="setShow">
							<span>列表一行显示多个：</span>
							<p @click="mulArticle()">
								<input type="radio" name="mul" id="mul_1" :checked="itemMdata.liStyle.float == 'left'" />
								<label for="mul_1">是</label>
							</p>
							<p @click="sigleArticle()">
								<input type="radio" name="mul" id="mul_2" :checked="itemMdata.liStyle.float == 'none'" />
								<label for="mul_2">否</label>
							</p>
						</div>
						<div class="setShow">
							<span>名称对齐方式：</span>
							<p @click="itemMdata.titleStyle.textAlign='center'">
								<input type="radio" name="namePosition" id="namePosition_1" :checked="itemMdata.titleStyle.textAlign=='center'" />
								<label for="mul_1">居中</label>
							</p>
							<p @click="itemMdata.titleStyle.textAlign='right'">
								<input type="radio" name="namePosition" id="namePosition_2" :checked="itemMdata.titleStyle.textAlign=='right'" />
								<label for="mul_2">右对齐</label>
							</p>
							<p @click="itemMdata.titleStyle.textAlign='left'">
								<input type="radio" name="namePosition" id="namePosition_3" :checked="itemMdata.titleStyle.textAlign=='left'" />
								<label for="mul_2">左对齐</label>
							</p>
						</div>
						<div class="setShow">
							<span>设置悬浮：</span>
							<p @click="itemMdata.setHover=true">
								<input type="radio" name="setHover" id="setHover_1" :checked="itemMdata.setHover==true" />
								<label for="setHover_1">是</label>
							</p>
							<p @click="itemMdata.setHover=false">
								<input type="radio" name="setHover" id="setHover_2" :checked="itemMdata.setHover==false" />
								<label for="setHover_2">否</label>
							</p>
						</div>
						<div class="setColor setColorbg" v-show="itemMdata.setHover==true">
							<p>
								<label for="colorT">时间字体悬浮颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.timeStyleH.color"></el-color-picker>
							</p>
							<p>
								<label for="colorT">名称字体悬浮颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.titleStyleH.color"></el-color-picker>
							</p>
							<p>
								<label for="colorT">摘要字体悬浮颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.describeStyleH.color"></el-color-picker>
							</p>
							<p>
								<label for="colorT">悬浮背景颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.textStyleH.background"></el-color-picker>
							</p>
						</div>
						<div class="setShow">
							<span>设置描述省略号：</span>
							<p @click="itemMdata.describeStyle.display='block';itemMdata.describeStyle.whiteSpace='nowrap';">
								<input type="radio" name="ellipsis1" id="ellipsis1_1" :checked="itemMdata.describeStyle.display=='block'" />
								<label for="ellipsis1_1">单行</label>
							</p>
							<p @click="itemMdata.describeStyle.display='-webkit-box';itemMdata.describeStyle.whiteSpace='normal';">
								<input type="radio" name="ellipsis1" id="ellipsis1_2" :checked="itemMdata.describeStyle.display=='-webkit-box'" />
								<label for="ellipsis1_2">自定义</label>
							</p>
						</div>
						<div v-show="itemMdata.describeStyle.display=='-webkit-box'">
							<span>行数：</span>
							<input type="text" v-model="itemMdata.describeStyle.WebkitLineClamp"/>
						</div>
						<p>字体设置</p>
						<div class="setColor">
							
							<p>
								<label for="colorT">时间字体颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.timeStyle.color"></el-color-picker>
							</p>
							<p>
								<label for="colorT">名称字体颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.titleStyle.color"></el-color-picker>
							</p>
							<p>
								<label for="colorT">摘要字体颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.describeStyle.color"></el-color-picker>
							</p>
						</div>
						
						<div class="setfontSize">
							<p>
								<label for="colorT">时间字体大小：</label>
								<input type="text" v-model="itemMdata.timeStyle.fontSize"/>
							</p>
							<p>
								<label for="colorT">名称字体大小：</label>
								<input type="text" v-model="itemMdata.titleStyle.fontSize"/>
							</p>
							<p>
								<label for="colorT">摘要字体大小：</label>
								<input type="text" v-model="itemMdata.describeStyle.fontSize"/>
							</p>
						</div>
						<div class="setfontSize">
							<p>
								<label for="colorT">时间字体行高：</label>
								<input type="text" v-model="itemMdata.timeStyle.lineHeight"/>
							</p>
							<p>
								<label for="colorT">名称字体行高：</label>
								<input type="text" v-model="itemMdata.titleStyle.lineHeight"/>
							</p>
							<p>
								<label for="colorT">摘要字体行高：</label>
								<input type="text" v-model="itemMdata.describeStyle.lineHeight"/>
							</p>
						</div>
						<p>背景设置</p>
						<div class="setColor">
							<p>
								<label for="colorT">时间背景颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.timeStyle.background"></el-color-picker>
							</p>
							<p>
								<label for="colorT">名称背景颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.titleStyle.background"></el-color-picker>
							</p>
							<p>
								<label for="colorT">摘要背景颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.describeStyle.background"></el-color-picker>
							</p>
							<p>
								<label for="colorT">背景颜色：</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.textStyle.background"></el-color-picker>
							</p>
							
						</div>
						
						
						<p>边框设置</p>
						<div class="serBorder">
							<span>上边框:</span>
							<label>宽度</label><input type="text" v-model="itemMdata.liStyle.borderTopWidth"/>
							<p>
								<label>颜色</label><el-color-picker show-alpha color-format="rgb" v-model="itemMdata.liStyle.borderTopColor"></el-color-picker>
							</p>
							<span>下边框:</span>
							<label>宽度</label><input type="text" v-model="itemMdata.liStyle.borderBottomWidth"/>
							<p>
								<label>颜色</label>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.liStyle.borderBottomColor"></el-color-picker>
							</p>
							<span>左边框:</span>
							<label>宽度</label><input type="text" v-model="itemMdata.liStyle.borderLeftWidth"/>
							<p><label>颜色</label><el-color-picker show-alpha color-format="rgb" v-model="itemMdata.liStyle.borderLeftColor"></el-color-picker></p>
							<span>右边框:</span>
							<label>宽度</label><input type="text" v-model="itemMdata.liStyle.borderRightWidth"/>
							<p><label>颜色</label><el-color-picker show-alpha color-format="rgb" v-model="itemMdata.liStyle.borderRightColor"></el-color-picker></p>
						</div>
						<p>边距设置</p>
						<div class="serBorder">
							<label>上边距:</label><input type="text" v-model="itemMdata.liStyle.marginTop"/>
							<label>下边距:</label><input type="text" v-model="itemMdata.liStyle.marginBottom"/>
							<label>右边距:</label><input type="text" v-model="itemMdata.liStyle.marginRight"/>
							<label>左边距:</label><input type="text" v-model="itemMdata.liStyle.marginLeft"/>
						</div>
						<p>列表设置</p>
						<div class="serBorder">
							<label>宽度:</label><input type="text" v-model="itemMdata.liStyle.width"/>
							<label>高度:</label><input type="text" v-model="itemMdata.liStyle.height"/>
							<label>左填充:</label><input type="text" v-model="itemMdata.textStyle.paddingLeft"/>
							<label>右填充:</label><input type="text" v-model="itemMdata.textStyle.paddingRight"/>
							<label>上填充:</label><input type="text" v-model="itemMdata.textStyle.paddingTop"/>
							<label>下填充:</label><input type="text" v-model="itemMdata.textStyle.paddingBottom"/>
						</div>
						<div>
							<span>边框样式：</span>
							<el-select v-model="itemMdata.liStyle.borderStyle" placeholder="无">
								<el-option v-for="item in boderOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						
						<div class="listStyle">
							<span style="{display:inlineBlock;lineHeight:62px;}">图形符号：</span>
							<el-select v-model="itemMdata.ulStyle.listStyleType" placeholder="itemMdata.ulStyle.listStyleType" @change="setlistStyle()">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							
						</div>
						<p class="setIconColor">
							<span>图标大小：</span>
							<input type="text" v-model="itemMdata.liStyle.fontSize" @blur="iconSize()"/>
						</p>
						<p>
							<label for="colorT">图形符号颜色：</label>
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.liStyle.color"></el-color-picker>
						</p>
						<p @click="vbgFun(1)">自定义图形符号</p>
						<div class="imgDelete">
							<img :src="itemMdata.mImage.url"/>
							<div class="hid" @click="delData()"></div>
						</div>
					</div>
				</div>
				<div class="skip">
					<p>跳转设置</p>
					<div class="detail">
						<div>
							<span>显示“更多”：</span>
							<p @click="itemMdata.moreShow = false">
								<input type="radio" name="set5" id="set5_1" checked="checked" @click="setdefault" />
								<label for="set5_1" @click="setdefault">默认</label>
							</p>
							<p @click="itemMdata.moreShow = false">
								<input type="radio" name="set5" id="set5_2" @click="sethid" />
								<label for="set5_2" @click="sethid">隐藏</label>
							</p>
							<p @click="itemMdata.moreShow = true">
								<input type="radio" name="set5" id="set5_3" @click="setcustom" />
								<label for="set5_3" @click="setcustom">自定义</label>
							</p>
							<div class="set5_hid">
								<p class="set_default" v-show="set_default">
									<input type="radio" id="set_default" />
									<label for="set_default">新页面打开</label>
								</p>
								<p class="set_custom" v-show="set_custom">
									<input type="text" />
									<button>设置链接</button>
								</p>
							</div>
						</div>
						<div>
							<span>文章跳转方式：</span>
							<p @click="itemMdata.articleSelected.target = '_blank'">
								<input type="radio" name="set6" id="set6_1" checked="checked" />
								<label for="set6_1">新窗口</label>
							</p>
							<p @click="itemMdata.articleSelected.target = '_self'">
								<input type="radio" name="set6" id="set6_2" />
								<label for="set6_2">当前窗口</label>
							</p>
						</div>
					</div>
				</div>
				
			</div>
		</div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" :append-to-body=true width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" :itemMdata="itemMdata.mImage"></mImageEdit>
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
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	import api from '@/api/$ajax.js'
	export default {
		name: 'articleScrapEdit',
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata);
			this.getData();
		},
		components: {			
			mImageEdit,			
		},
		data() {
			return {
				title: "编辑文章列表",
				typenumber:'1',
				token: this.$route.query.token,
				set3_hid: true,
				newsCategory:[],
				set_default: true,
				set_custom: false,
				newArticle: '',
				toNewsDes:this.itemMdata.articleSelected,
				addVisibleNav: false,
				flag: 1,
				options: [{
					value: 'none',
					label: '无'
				}, {
					value: 'disc',
					label: '实心圆'
				}, {
					value: 'circle',
					label: '空心圆'
				}, {
					value: 'square',
					label: '实心方块'
				}, {
					value: 'upper-roman',
					label: '大写罗马数字'
				}, {
					value: 'decimal',
					label: '数字'
				}, {
					value: 'decimal-leading-zero',
					label: '0开头的数字'
				}, {
					value: 'lower-roman',
					label: '小写罗马数字'
				}],
				boderOptions:[
					{value: 'none',label: '无'},
					{value: 'solid',label: '实线'},
					{value: 'dashed',label: '虚线'}, 
					{value: 'dotted',label: '点线'}, 
					{value: 'double',label: '双线'}
				]						
			}
		},
		methods: {
			delData(){
				this.itemMdata.mImage.url = '';
				this.itemMdata.ulStyle.listStyleImage = '';
				$('.imgDelete').css('display','none');
			},
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
				//console.log(flag)
				this.itemMdata.ulStyle.listStyleImage = this.itemMdata.mImage.url;
				//this.itemMdata.liStyle.marginLeft = $('.imgDelete').find('img').css('width');
			},
			addVisibleFun() {
				this.addVisibleNav = false;
				$('.imgDelete').css('display','inline-block');
				this.itemMdata.ulStyle.listStyleImage = this.itemMdata.mImage.url;
				this.itemMdata.liStyle.marginLeft = ($('.imgDelete').find('img')[0].naturalWidth + 10)+'px';
				
				this.itemMdata.liStyle.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.liStyle.marginLeft))  +'px';
				console.log(this.itemMdata.liStyle.width)
				if(this.itemMdata.liStyle.float == "left"){
					this.itemMdata.liStyle.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.liStyle.marginLeft)*this.itemMdata.articleSelected.length)/this.itemMdata.articleSelected.length  +'px';
				}
			},
			iconSize(){
				this.itemMdata.liStyle.marginLeft = this.itemMdata.liStyle.fontSize;
			},
			setlistStyle(){
				if(this.itemMdata.ulStyle.listStyleType=='none'){
					this.itemMdata.liStyle.marginLeft = '0px';
				}else{
					this.itemMdata.liStyle.marginLeft = '20px';
				}
				
				this.itemMdata.liStyle.clear = "none"
				this.itemMdata.liStyle.overflow = "visible"
				if(this.itemMdata.liStyle.float == "left"){
					this.itemMdata.liStyle.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.liStyle.marginLeft)*this.itemMdata.articleSelected.length)/this.itemMdata.articleSelected.length  +'px';
				}
				console.log(this.itemMdata.liStyle.marginLeft)
			},
			changetype:function(number){
				this.typenumber = number
			},
			setdefault: function() {
				this.set_default = true;
				this.set_custom = false;
			},
			setcustom: function() {
				this.set_default = false;
				this.set_custom = true;
			},
			sethid: function() {
				this.set_default = false;
				this.set_custom = false;
			},
			set3hid1: function() {
				this.set3_hid = true;
				this.itemMdata.page = true;
			},
			set3hid2: function() {
				this.set3_hid = false;
				this.itemMdata.page = false;
			},
			deleteSelect: function(select) {
				this.itemMdata.articleSelected.splice(this.itemMdata.articleSelected.indexOf(select), 1);
				this.itemMdata.liStyle.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.liStyle.marginLeft)*this.itemMdata.articleSelected.length)/this.itemMdata.articleSelected.length  +'px';
				
			},
			removeArticle: function(article) {
				var newArticle = JSON.parse(JSON.stringify(article));
				this.itemMdata.articleSelected.push(newArticle);
				this.itemMdata.firstArticle = JSON.parse(JSON.stringify(this.itemMdata.articleSelected[0]))
				this.itemMdata.liStyle.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.liStyle.marginLeft))  +'px';
				console.log(this.itemMdata.liStyle.width)
				if(this.itemMdata.liStyle.float == "left"){
					this.itemMdata.liStyle.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.liStyle.marginLeft)*this.itemMdata.articleSelected.length)/this.itemMdata.articleSelected.length  +'px';
				}
				
			},
			//			borderColor: function(index) {
			//				this.color = index;
			//				e.currentTarget.querySelector("span").style.display = "block";
			//				$(this).addClass("active").siblings().removeClass("active");
			//			},
			changeborder: function() {
				var style = document.querySelector('#style');
				var list = style.querySelectorAll('li');
				for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						$(this).addClass("active").siblings().removeClass("active");
					}
				}
			},
			getData() {
				var v = this;				
				api.get('/api/data/newsList?token='+this.token,
					true,{}, function(data) {
						console.log(data)
						//var result = JSON.stringify(data); //json对象转成字符串
						v.itemMdata.articleList=data.data;
						//$("#text").val(result);
					}
				);	
				api.get( '/api/data/newsCategory?token='+this.token,true,{},
					function(data) {
						console.log(data)
						//var result = JSON.stringify(data); //json对象转成字符串
						v.itemMdata.newsCategory = data.data;
						//$("#text").val(result);
					}
				);	
					
			},
			styleone: function() {
				this.itemMdata.imgStyle.display = "none";
				this.itemMdata.timeStyle.display = "none";
				this.itemMdata.describeStyle.display = "block";
				this.itemMdata.textStyle.width = "100%";
				this.itemMdata.liStyle.float = "none";
				//this.itemMdata.liStyle.margin = "1% 0px";
				this.itemMdata.liStyle.width = "100%";
				this.itemMdata.textStyle.padding = "1%";
				this.itemMdata.titleStyle.float = "none";
				this.itemMdata.titleStyle.width = "100%";
				this.itemMdata.styleFive = false;
				console.log(this.itemMdata.firstArticle)
				
				
			},
			styletwo: function() {
				this.itemMdata.imgStyle.display = "block";
				this.itemMdata.imgStyle.margin = "1% 0px";
				this.itemMdata.imgStyle.width = "100%";
				this.itemMdata.liStyle.float = "left";
				this.itemMdata.liStyle.width = "31%";
				//this.itemMdata.liStyle.margin = "1% 1%";
				this.itemMdata.liStyle.clear = "none";
				this.itemMdata.describeStyle.display = "block";
				this.itemMdata.timeStyle.display = "block";
				this.itemMdata.textStyle.width = "100%";
				this.itemMdata.textStyle.padding = "0px";
				this.itemMdata.titleStyle.float = "none";
				this.itemMdata.titleStyle.width = "100%";
				this.itemMdata.timeStyle.float = "none";
				this.itemMdata.styleFive = false;
				
				
			},
			stylethree: function() {
				this.itemMdata.imgStyle.display = "block";
				this.itemMdata.imgStyle.margin = "0px";
				this.itemMdata.imgStyle.float = "left";
				this.itemMdata.imgStyle.width = "30%";
				this.itemMdata.liStyle.float = "none";
				this.itemMdata.liStyle.width = "100%";
				//this.itemMdata.liStyle.margin = "1% 0";
				this.itemMdata.liStyle.clear = "both";
				this.itemMdata.describeStyle.display = "block";
				this.itemMdata.timeStyle.display = "block";
				this.itemMdata.textStyle.width = "68%";
				this.itemMdata.textStyle.float = "right";
				this.itemMdata.textStyle.padding = "0px";
				this.itemMdata.textStyle.clear = "none";
				this.itemMdata.textStyle.overflow = "none";
				this.itemMdata.titleStyle.float = "none";
				this.itemMdata.titleStyle.width = "100%";
				this.itemMdata.timeStyle.float = "none";
				this.itemMdata.styleFive = false;
				
				
			},
			stylefour: function() {
				this.itemMdata.imgStyle.display = "none";
				this.itemMdata.liStyle.float = "left";
				this.itemMdata.liStyle.width = "31%";
				//this.itemMdata.liStyle.margin = "1% 1%";
				this.itemMdata.liStyle.clear = "none";
				this.itemMdata.describeStyle.display = "block";
				this.itemMdata.describeStyle.clear = "both";
				this.itemMdata.timeStyle.display = "inline-block";
				this.itemMdata.textStyle.width = "100%";
				this.itemMdata.textStyle.padding = "0px";
				this.itemMdata.titleStyle.float = "left";
				this.itemMdata.titleStyle.width = "70%";
				this.itemMdata.timeStyle.float = "right";
				this.itemMdata.styleFive = false;
				
				
			},
			stylefive(){
				this.itemMdata.liStyle.width = "100%";
				this.itemMdata.styleFive = true;
				this.itemMdata.imgStyle.display = "none";
				
			},
			mulArticle(){
				this.itemMdata.liStyle.float = "left";
				this.itemMdata.liStyle.clear = "none";
				if(this.itemMdata.liStyle.marginLeft!=''){
					this.itemMdata.liStyle.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.liStyle.marginLeft)*this.itemMdata.articleSelected.length)/this.itemMdata.articleSelected.length  +'px';
				}else{
					this.itemMdata.liStyle.width =1/this.itemMdata.articleSelected.length*100  +'%'
				}
				for(var i=0;i<this.itemMdata.articleSelected.length;i++){
					this.itemMdata.articleSelected[i].add_time = this.itemMdata.articleSelected[i].add_time.substring(-1,10);
				}
				console.log(this.itemMdata.liStyle.marginLeft)
			},
			sigleArticle(){
				this.itemMdata.liStyle.float = "none";
				this.itemMdata.liStyle.width = "100%";
				this.itemMdata.liStyle.clear = "both";
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.articleScrapEdit {
		clear: both;
		
		border-bottom: 1px solid #CCCCCC;
		input[type=text]{border:1px solid #ccc;}
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
			overflow: auto;
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
							margin-bottom: 10px;
							margin-right: 15px;
							margin-left: 5px;
							position: relative;
							div {
								width: 60px;
								height: 48px;
								background: url(/static/image/mbg02.png) no-repeat;
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
							.style_one {
								background-position: -574px -1px;
							}
							.style_two {
								background-position: -574px -72px;
							}
							.style_three {
								background-position: -574px -140px;
							}
							.style_four {
								background-position: -574px -351px;
							}
							.style_five {
								background-position: -574px -211px;
							}
							.style_sixth {
								background-position: -574px -281px;
							}
							.style_seven {
								background-position: -574px -423px;
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
				.article {
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
						margin-top: 10px;
						.list {
							border: 1px solid #E3E3E3;
							width: 40%;
							height: 260px;
							float: left;
							overflow: auto;
							li {
								line-height: 35px;
								padding-left: 25px;
								color: #666666;
								cursor: pointer;
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
							height: 260px;
							border: 1px solid #E3E3E3;
							overflow: auto;
							li {
								line-height: 35px;
								padding-left: 25px;
								color: #666666;
								clear: both;
								overflow: hidden;
								span:nth-child(1) {
									float: left;
									width: 90%;
								}
								span:nth-child(2) {
									float: right;
									width: 10%;
									font-size: 12px;
									color: #999999;
									cursor: pointer;
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
						margin-top: 10px;
						border: 1px solid #E3E3E3;
						padding: 20px 10px;
						height: 260px;
						overflow: auto;
						p {
							float: left;
							margin-left: 15px;
							width: 110px;
							margin-bottom: 15px;
						}
					}
				}
				.setStyle{
					
					.setColor{
						p{
							label{
								line-height:27px;
							}
							div{
								margin-top:0;
								margin-bottom:0;
							}
							
						}
					}
					.serBorder{
						span{
							float:none;
							margin-right:20px;
						}
						input{
							width:60px;
						}
						p{
							float:none;
							display:inline-block;
							vertical-align:top;
							label{
								line-height:27px;
							}
							div{
								margin-top:0;
								margin-right:100px;
							}
						}
						
					}
					.setfontSize,.setShow{
						margin:10px 0;
						p{
							label{
								line-height:20px;
							}
							input{
								border:1px solid #ccc;
								width:80px;
							}
						}
					}
					p{
						display:inline-block;
						label{
							vertical-align:top;
							line-height:66px;
						}
						
					}
				}
				
			}
			.two {
				box-sizing: border-box;
				padding: 20px 40px;
				.basic {
					border-bottom: 1px dashed #E3E3E3;
					padding-bottom: 15px;
					margin-bottom: 15px;
					.detail {
						margin-top: 10px;
						.imgDelete{
							width:100px;
							height:100px;
							position:relative;
						}
						.imgDelete:hover .hid {
							display:block;
						}
						.setIconColor{
							input{
								height:28px;
							}
						}
						.imgDelete .hid {
							position: absolute;
							right: 0;
							top: -22px;
							
							width: 25px;
							height: 25px;
							background:url(/static/image/iconIndex2.png) -1028px 228px;
							display: none;
						}
						.setColorbg{
							background:red;
							color:#fff;
							padding-top:10px;
						}
						.setColor{
							p{
								label{
									line-height:27px;
								}
								div{
									margin-top:0;
									margin-bottom:0;
								}
								
							}
						}
						.serBorder{
							span{
								float:none;
								margin-right:20px;
							}
							input{
								width:60px;
							}
							p{
								float:none;
								display:inline-block;
								vertical-align:top;
								label{
									line-height:27px;
								}
								div{
									margin-top:0;
									margin-right:100px;
								}
							}
							
						}
						.setfontSize,.setShow{
							p{
								label{
									line-height:20px;
								}
								input{
									border:1px solid #ccc;
									width:80px;
								}
							}
						}
						p{
							label{
								vertical-align:top;
								line-height:66px;
							}
							
						}
						div {
							margin-bottom: 10px;
							margin-top: 15px;
							clear: both;
							overflow: hidden;
							span {
								float: left;
							}
							p {
								float: left;
								margin-left: 10px;
							}
							input {
								margin-left: 10px;
							}
							.set3_hid {
								margin-left: 55px;
								margin-top: 10px;
								input {
									border: 1px solid #E3E3E3;
									text-align: center;
									width: 60px;
									margin-left: 0;
								}
							}
						}
					}
				}
				.skip {
					.detail {
						margin-top: 10px;
						div {
							margin-bottom: 5px;
							clear: both;
							overflow: hidden;
							span {
								float: left;
							}
							p {
								float: left;
								margin-left: 10px;
							}
							input {
								margin-left: 10px;
							}
							.set5_hid {
								margin-left: 85px;
								margin-top: 10px;
								input {
									border: 1px solid #E3E3E3;
									line-height: 30px;
								}
								button {
									background: #3a8ee6;
									color: #FFFFFF;
									line-height: 30px;
									padding: 0 8px;
									border-radius: 3px;
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