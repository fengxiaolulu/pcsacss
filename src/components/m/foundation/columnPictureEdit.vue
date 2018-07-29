<template>
	<div>
		<div class="columnPictureEdit" v-if="itemMdata.colPicEdtStyle==true">
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
					<div v-show="itemMdata.styletwo == true" class="setBtn">
						<p>
							<span>按钮位置：</span>
							<span @click="btnPosition(0)">
								<input type="radio" name="btnP" id="btnP_1" :checked="itemMdata.showbtnP == 0" />
								<label for="btnP_1">两侧</label>
							</span>
							<span @click="btnPosition(1)">
								<input type="radio" name="btnP" id="btnP_2" :checked="itemMdata.showbtnP == 1" />
								<label for="btnP_2">下面</label>
							</span>
						</p>
						<p>
							<span>轮播：</span>
							<span @click="autoPlay(1)">
								<input type="checkbox" :checked="itemMdata.autoPlay" />
							</span>
							
						</p>
						<span>修改切换按钮：</span>
						<button @click="editPre()">左边</button>
						<button @click="editNext()">右边</button>
						<div>
							<p>
								<span class="close" @click="beforeRemoveImg(1)"></span>
								<img :src="itemMdata.colPre.url" class="pre" v-show="itemMdata.colPre.showImg==1" />
							</p>
							<p>
								<span class="close" @click="beforeRemoveImg(2)"></span>
								<img :src="itemMdata.colNext.url" class="next" v-show="itemMdata.colNext.showImg==1" />
							</p>
						</div>
					</div>
					<div>
						<p>
							<span>单图轮播</span>
							<span @click="siglePic(0)">
								<input type="radio" name="sigle" id="sigle_1"/>
								<label for="sigle_1">是</label>
							</span>
							<span @click="siglePic(1)">
								<input type="radio" name="sigle" id="sigle_2" />
								<label for="sigle_2">否</label>
							</span>
						</p>
					</div>
					<div class="img">
						<div class="type">
							<span>添加图片：</span>
							<p @click="addPic(1)">
								<input type="radio" name="addpic" id="type1" :checked="itemMdata.colpics==1" />
								<label for="type1">直接添加</label>
							</p>
							<p @click="addPic(2)">
								<input type="radio" name="addpic" id="type2" :checked="itemMdata.colpics==2" />
								<label for="type2">绑定图册</label>
							</p>
							<p @click="addPic(3)">
								<input type="radio" name="addpic" id="type3" :checked="itemMdata.colpics==3" />
								<label for="type3">绑定案例</label>
							</p>
						</div>
						<div class="type_one" v-show="itemMdata.colpics==1">
							<div class="upload" @click="vbgFun(1,false)">+</div>
							<ul class="imglist">
								<li v-for="(list,index) in itemMdata.columnPictureLlist" @click="imglistshow($event,index,list)">
									<div class="in">
										<img :src="list.url" class="imgLi" />
										<span @click="deleteList(1,list)"></span>
									</div>
									<div class="imglist_hid" v-show="imglist_hid == index">
										<div class="title">
											<p>编辑图片</p>
											<p class="close" @click="imglisthid($event,index)">X</p>
										</div>
										<div class="detail">
											<div class="imgBox">
												<img :src="list.url" />
												<i @click="vbgFun(3,false,index)">修改图片</i>
												<div class="divBtn">
													<button class="preBtn" @click="preBtn($event,index,list)" v-show="index!=0">编辑上一张</button>
													<button class="nextBtn" @click="nextBtn($event,index,list)" v-show="index!=itemMdata.columnPictureLlist.length-1">编辑下一张</button>
												</div>
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
												<textarea value="list.describe" v-model="list.describe"></textarea>
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
											<button type="submit" class="submitBtn">确定</button>
											<button type="reset" class="cancelBtn">取消</button>
										</div>
									</div>
								</li>
							</ul>
							<uiLink v-if ="editDial.setlink" :itemMdata = 'itemMdata.itemCur' :editDial="editDial"></uiLink>
						</div>
						<div class="type">
							<span>是否设置悬浮图片：</span>
							<p @click="itemMdata.isImg=true">
								<input type="radio" name="type" id="type1" :checked="itemMdata.isImg==true" />
								<label for="type1">是</label>
							</p>
							<p @click="itemMdata.isImg=false">
								<input type="radio" name="type" id="type2" :checked="itemMdata.isImg==false" />
								<label for="type2">否</label>
							</p>
						</div>
						<div class="type_one" v-show="itemMdata.isImg==true">
							<ul class="imglist">
								<li v-for="(list,index) in itemMdata.columnPictureLlist" @click="imglistshow($event,index,list)">
									<div class="in">
										<img :src="list.hoverUrl" />
										<span @click="deleteList(2,list)"></span>
									</div>
								</li>
							</ul>
						</div>
						
						<div class="type_two" v-show="itemMdata.colpics==2">
							<p>
								<span>选择图册：</span>
								<button @click="colPicTwo()">添加图册</button>
							</p>
							<div class="table">
								<ul>
									<li class="navTb">
										<span>内容</span>
										<button>操作</button>
									</li>
									<li v-for="(list,index) in itemMdata.colPicList">
										<input type="checkbox" @click="selectItem(list,index)" ref="imgData" :checked="itemMdata.selected[index]==true"/>
										<span>{{list.name}}</span>
										<button><i></i></button>
									</li>
								</ul>

							</div>
						</div>
						
					</div>
					<div class="other">
						<p>图片设置</p>
						<div class="set">
							<span>图片名称：</span>
							<p @click="showName(itemMdata.imgName)">
								<input type="radio" name="imgName" id="imgName1_1" :checked="itemMdata.imgName == true" />
								<label for="set1_1">显示</label>
							</p>
							<p @click="hidName(itemMdata.imgName)">
								<input type="radio" name="imgName" id="imgName1_2" :checked="itemMdata.imgName == false" />
								<label for="set1_2">隐藏</label>
							</p>
						</div>
						<div class="set">
							<span>图片描述：</span>
							<p @click="itemMdata.imgDescription=true">
								<input type="radio" name="setD" id="setD_1" :checked="itemMdata.imgDescription==true" />
								<label for="setD_1">显示</label>
							</p>
							<p @click="itemMdata.imgDescription=false">
								<input type="radio" name="setD" id="setD_2" :checked="itemMdata.imgDescription==false" />
								<label for="setD_2">隐藏</label>
							</p>
						</div>
						<div class="set">
							<span>点击图片：</span>
							<p @click="set_hid = false">
								<input type="radio" name="set2" id="set2_1" :checked="set_hid == false" />
								<label for="set2_1">无效果</label>
							</p>
							<p @click="set_hid = true">
								<input type="radio" name="set2" id="set2_2" :checked="set_hid == true" />
								<label for="set2_2">图片链接</label>
							</p>
						</div>
						<!--
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
						</div>-->
						<div class="set">
							<p>
								<span>列表右边距：</span>
								<input type="text" v-model="itemMdata.liStyle.marginRight" placeholder="10" />
							</p>
							<p>
								<span>列表左边距：</span>
								<input type="text" v-model="itemMdata.liStyle.marginLeft" placeholder="10" />
							</p>
							<p>
								<span>列表上边距：</span>
								<input type="text" v-model="itemMdata.liStyle.marginTop" placeholder="10" />
							</p>
							<p>
								<span>列表下边距：</span>
								<input type="text" v-model="itemMdata.liStyle.marginBottom" placeholder="10" />
							</p>
						</div>
						<!--<div class="set">
							<p>
							<span>高度：</span>
								<input type="text" v-model="itemMdata.liStyle.height" placeholder="25%"/>
							</p>
						</div>-->
						<div class="set">
							
							<p>
								<span>列表大小:</span>
								<input type="text" v-model="itemMdata.liStyle.width" placeholder="25%"  @blur="changeWidth()" />
							</p>
							
							<p>
								<span>列表背景颜色:</span>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.liStyle.backgroundColor"></el-color-picker>
							</p>
							<p>
								<span>图片宽度:</span>
								<input type="text" v-model="itemMdata.imgStyle2.width" placeholder="px"/>
							</p>
							<p>
								<span>图片高度:</span>
								<input type="text" v-model="itemMdata.imgStyle.height" placeholder="px"/>
							</p>
							
						</div>
						<div class="set">
							<p>
								<span>图片上边距:</span>
								<input type="text" v-model="itemMdata.divStyle.paddingTop" placeholder="1px"/>
							</p>
							<p>
								<span>图片下边距:</span>
								<input type="text" v-model="itemMdata.divStyle.paddingBottom" placeholder="1px"/>
							</p>
							<p>
								<span>图片右边距:</span>
								<input type="text" v-model="itemMdata.divStyle.paddingRight" placeholder="1px"/>
							</p>
							<p>
								<span>图片左边距:</span>
								<input type="text" v-model="itemMdata.divStyle.paddingLeft" placeholder="1px"/>
							</p>
						
						</div>
						<div class="set">
							<span>设置悬浮：</span>
							<p @click="itemMdata.setnumber = true">
								<input type="radio" name="colStyle" id="colStyle1" :checked="itemMdata.setnumber==true" />
								<label for="colStyle1">是</label>
							</p>
							<p @click="itemMdata.setnumber = false">
								<input type="radio" name="colStyle" id="colStyle2" :checked="itemMdata.setnumber==false"/>
								<label for="colStyle2">否</label>
							</p>
						</div>
						<div class="setBtn">
							<p>
								<span>列表背景图片:</span>
								<button @click="liImgBg('liImg')">添加背景图</button>
								<button @click="liImgBg('liImgH')">添加悬浮背景图</button>
							</p>
							<div>
								<p>
									<span class="close" @click="beforeRemoveImg('liImg')"></span>
									<img :src="itemMdata.liImgBg" v-show="itemMdata.liImgBg" />
								</p>
								<p>
									<span class="close" @click="beforeRemoveImg('liImgH')"></span>
									<img :src="itemMdata.liImgBgH" v-show="itemMdata.liImgBgH"/>
								</p>
							</div>
						</div>
						<div class="set">
							<p>
								<span>图片名称字体大小:</span>
								<input type="text" v-model="itemMdata.pStyle.fontSize" placeholder="12" />
							</p>
							<p>
								<span>图片名称行高:</span>
								<input type="text" v-model="itemMdata.pStyle.lineHeight" placeholder="12" />
							</p>
							<p>
								<span>图片名称颜色:</span>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.pStyle.color"></el-color-picker>
							</p>
							<p>
								<span>悬浮颜色:</span>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.liStyle.color"></el-color-picker>
							</p>
						</div>
						<div class="set">
							<p>
								<span>图片描述字体大小:</span>
								<input type="text" v-model="itemMdata.hoverP.fontSize" placeholder="12" />

							</p>
							<p>
								<span>图片描述行高:</span>
								<input type="text" v-model="itemMdata.hoverP.lineHeight" placeholder="12" />
							</p>
							<p>
								<span>图片描述颜色:</span>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.hoverP.color"></el-color-picker>
							</p>
							<p>
								<span>悬浮颜色:</span>
								<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.liStyleH.color"></el-color-picker>
							</p>
							
						</div>
						<div class="set">
							<span>描述对齐方式：</span>
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
						<div class="effect_info" v-if="itemMdata.mouseenterNumber == 2||itemMdata.mouseenterNumber == 3">
							<span>悬浮：</span>
							<p @click="setbold()">
								<input type="checkbox" :checked="itemMdata.setBold"/>
								<label for="default">是</label>
							</p>
							
							<span>边框：</span>
							<p @click="itemMdata.border_hid = false">
								<input type="radio" name="mouse_one" id="default" :checked="itemMdata.border_hid == false"/>
								<label for="default">默认</label>
							</p>
							<p @click="itemMdata.border_hid = true">
								<input type="radio" name="mouse_one" id="custom" :checked="itemMdata.border_hid == true" />
								<label for="custom">自定义</label>
							</p>
							<ul class="border_hid" v-show="itemMdata.border_hid">
								<li>
									<span>颜色：</span>
									<el-color-picker v-model="itemMdata.hidStyle.borderColor" size="medium"></el-color-picker>
								</li>
								<li>
									<span>宽度：</span>
									<input type="text" placeholder="1" v-model="itemMdata.hidStyle.borderWidth" />
								</li>
								<li>
									<span>样式：</span>
									<el-select v-model="itemMdata.hidStyle.borderStyle" placeholder="请选择">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</li>
								<li>
									<span>搜索图标颜色：</span>
									<el-color-picker v-model="itemMdata.iStyle.color" size="medium"></el-color-picker>
								</li>
								<li>
									<span>搜索图标大小：</span>
									<input type="text" placeholder="1px" v-model="itemMdata.iStyle.fontSize" />
								</li>
							</ul>
						</div>
						
						<div class="effect_info" v-if="itemMdata.mouseenterNumber == 4||itemMdata.mouseenterNumber == 5">
							<div class="set">
								<span>背景：</span>
								<p @click="itemMdata.fourStyle=false">
									<input type="radio" name="set1" id="set1_1" :checked="itemMdata.fourStyle==false" />
									<label for="set1_1">默认</label>
								</p>
								<p @click="itemMdata.fourStyle=true">
									<input type="radio" name="set1" id="set1_2" :checked="itemMdata.fourStyle==true" />
									<label for="set1_2">自定义</label>
								</p>
								<div class="" v-show="itemMdata.fourStyle==true">
									<span>图片遮罩颜色：</span>
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
			</div>

		</div>
		<div v-if="itemMdata.colPicEdtStyle==false" class="columnPictureEdit">
			<h3><span>创建图册</span></h3>
			<div class="picEdiBox">
				<div class="picName">
					<p>
						<span>图册名称：</span>
						<input type="text" v-model="itemMdata.picName" />
					</p>
					<p>
						<span>图册分类：</span>
						<input type="text" value="" />
					</p>
					<p>
						<el-form ref="form" :model="form" label-width="80px">
							<el-form-item label="排序：">
								<el-select v-model="form.order" placeholder="默认">
									<el-option label="按名称排序" value="nameOrder"></el-option>
									<el-option label="自定义" value="defineOrder"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</p>
				</div>
				<div class="picInfor">
					<div v-if="itemMdata.columnPictureLlist.length<0">
						<span>图片信息：</span>
						<p>
							<span @click="vbgFun(1,false)"><i>+</i>添加图片</span>
						</p>
					</div>
					<div v-if="itemMdata.columnPictureLlist.length>0" class="clearFlow">
						<div class="upload" @click="vbgFun(1,false)">+</div>
						<ul class="imglist">
							<li v-for="(list,index) in itemMdata.columnPictureLlist" @click="imglistshow($event,index,list)">
								<div class="in">
									<img :src="list.url" />
									<span @click="deleteList(1,list)">X</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="picDes">
					<span>图册详情：</span>
					<textarea rows="3" cols="20" v-model="itemMdata.desImg">
					</textarea>
				</div>
			</div>
		</div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" :append-to-body=true width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1||flag==3||flag=='liImg'||flag=='liImgH'" :itemMdata="newPic"></mImageEdit>
					<mImageEdit v-if="flag=='pre'" :itemMdata="itemMdata.colPre"></mImageEdit>
					<mImageEdit v-if="flag=='next'" :itemMdata="itemMdata.colNext"></mImageEdit>
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
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	import UE from '@/components/m/ueditor.vue'
	import api from '@/api/$ajax.js'
	import uiLink from '@/components/m/uiLink.vue'
	export default {
		name: 'columnPictureEdit',
		props: ['itemMdata','posCom','index'],
		created() {
			//this.itemMdata.pStyle = this.itemMdata.pStyle||{};
			this.itemMdata.hoverP = this.itemMdata.hoverP || {};
		},
		components: {
			UE,
			mImageEdit,
			uiLink
		},
		data() {
			return {
				title: "编辑列表多图",
				typenumber: '1',
				setnumber: '1',
				set_hid: false,
				imglist_hid: '',
				editId: '',
				showImg: 0,
				token: this.$route.query.token,
				form: {
					order: "",
				},
				columnPictureId: "columnPicture" + this.posCom + this.index,
				config: {
					/*toolbars: [
						['undo', 'redo', 'indent', 'italic', 'underline', 'strikethrough', 'selectall', 'horizontal', 'fontfamily', 'fontsize', 'forecolor', 'bold']
					],	*/
					serverUrl: "https://jsonplaceholder.typicode.com/posts/",
					initialFrameWidth: null,
					initialFrameHeight: 180
				},
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
					describe: "",
					hoverStyle: {
						border: '1px solid #fff',
						borderColor: '',
						borderStyle: '',
					},
				},
				arr:[]
				
			}
		},
		beforeDestroy() {
			if(this.itemMdata.isPro == false && this.typenumber == 2) {
				this.getUEContent();
			}
			console.log("beforeDestroy");
		},
		methods: {
			siglePic(num){
				if(num==0){
					this.itemMdata.styleone = false;
					this.itemMdata.styletwo = false;
					this.itemMdata.stylethree = true;
					this.itemMdata.mouseenterNumber = 4;
					this.itemMdata.divStyle.float = 'left';
					this.itemMdata.pStyle.width = '300px';
					this.itemMdata.liStyle.width = '900px';
					this.itemMdata.imgStyle2.width = "500px"
					this.itemMdata.imgW = $('#' + this.itemMdata.columnPictureIdEdit).find('.threeStyle img').css('width');
					this.itemMdata.ulStyle.width = parseInt(this.itemMdata.imgW) * this.itemMdata.columnPictureLlist.length * 2 + 'px';
					var ts = this;
					ts.itemMdata.isShow = false;
					if(ts.itemMdata.MyMar) {
						clearInterval(ts.itemMdata.MyMar);
					}
					setTimeout(function() {
						ts.itemMdata.isShow = true;
					}, 10);
				}
			},
			setbold(){
				this.itemMdata.setBold = !this.itemMdata.setBold
			},
			autoPlay(num){
				this.itemMdata.autoPlay = !this.itemMdata.autoPlay
				var ts = this;
				ts.itemMdata.isShow = false;
				
				if(ts.itemMdata.carouse) {
					clearInterval(ts.itemMdata.carouse);
				}
				setTimeout(function() {
					ts.itemMdata.isShow = true;
				}, 10);
			},
			beforeRemoveImg(flag) {
				//console.log(this.flag)

				if(flag == 2) {
					this.itemMdata.colNext.url = '/static/image/next.png';
					this.itemMdata.colNext.showImg = 0;
				} else if(flag == 1){
					this.itemMdata.colPre.url = '/static/image/pre.png';
					this.itemMdata.colPre.showImg = 0;
				}else if(flag == 'liImg'){
					this.itemMdata.liImgBg = '';
					this.itemMdata.liStyle.backgroundImage = '';
				}else if(flag == 'liImgH'){
					this.itemMdata.liImgBgH = '';
					this.itemMdata.liStyleH.backgroundImage = '';
				}
				this.itemMdata.spanStyle.width = '40px';
				this.itemMdata.spanStyle.height = '40px';
				this.itemMdata.spanStyle.borderRadius = '100%';
				this.itemMdata.styleTwo.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.spanStyle.width) * 2) + 'px'
				this.itemMdata.styleTwo.height = this.itemMdata.parentStyle.height - parseInt(this.itemMdata.spanStyle.height) + 'px'
			},
			btnPosition(num){
				this.itemMdata.showbtnP = num;
				if(num==1){
					this.itemMdata.styleTwo.width = "100%";
					this.itemMdata.styleTwo.height = this.itemMdata.parentStyle.height - parseInt(this.itemMdata.spanStyle.height) + 'px'
				}
				else{
					this.itemMdata.styleTwo.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.spanStyle.width) * 2) + 'px'
					this.itemMdata.styleTwo.height = this.itemMdata.parentStyle.height + 'px'
				}
			},
			editPre(flag) {
				this.flag = 'pre';
				this.addVisibleNav = true
				//$('#'+this.itemMdata.columnPictureIdEdit).find('.slide1 .button .pre1')
			},
			setlinkFun(list){
				this.editDial.setlink = true;
				this.itemMdata.itemCur = list;
			},
			editNext(flag) {
				this.flag = 'next';
				this.addVisibleNav = true;
			},
			changeWidth() {
				var imgH = $('#' + this.itemMdata.columnPictureIdEdit).find('.styleone li .colimgHover .back').css('height');
				this.itemMdata.colimgHover.height = imgH;
				this.itemMdata.imgW = parseInt(this.itemMdata.liStyle.width)
				var ts = this;
				ts.itemMdata.isShow = false;
				console.log(this.itemMdata.MyMar)
				if(ts.itemMdata.MyMar) {
					clearInterval(ts.itemMdata.MyMar);
				}
				setTimeout(function() {
					ts.itemMdata.isShow = true;
				}, 10);
			},
			selectItem(list, index) {
				this.itemMdata.selected = [];
				
				for(let i=0;i<this.itemMdata.colPicList.length;i++){
					this.itemMdata.selected.push(this.$refs.imgData[i].checked)
				}
				
				if(list.image_url != null) {
					var imgData = list.image_url.split(',');
					
					for(let j = 0; j < imgData.length; j++) {
						if(this.itemMdata.colpics == 2 && this.itemMdata.selected[index]== false){
							this.itemMdata.selectedList.splice(this.itemMdata.selectedList.indexOf({url:imgData[j]}),1)
						}
						if(this.itemMdata.colpics == 2 && this.itemMdata.selected[index]== true) {
							this.itemMdata.selectedList.push({url:imgData[j]})
							//console.log(this.itemMdata.selectedList)
						}
					}
					this.itemMdata.columnPictureLlist = this.itemMdata.selectedList
				}
				if(document.querySelectorAll('.imgLi').length > 0) {
					this.itemMdata.imgHeight = document.querySelectorAll('.imgLi')[0].naturalHeight;
					this.itemMdata.imgWidth = document.querySelectorAll('.imgLi')[0].naturalWidth;
				}
			},
			addPic(num) {
				this.itemMdata.colpics = num;
				this.getData();
				if(document.querySelectorAll('.imgLi').length > 0) {
					this.itemMdata.imgHeight = document.querySelectorAll('.imgLi')[0].naturalHeight;
					this.itemMdata.imgWidth = document.querySelectorAll('.imgLi')[0].naturalWidth;
				}
			},
			getData() {
				var v = this;
				api.get('/api/data/photoList?token=' + this.token, true, {}, function(data) {
					console.log(data)
					if(v.itemMdata.colpics == 2) {
						v.itemMdata.colPicList = data.data;
						
					}
				});
			
				api.get('/api/data/caseList?token=' + this.token, true, {}, function(data) {
					console.log(data)
					if(v.itemMdata.colpics == 3) {
						v.itemMdata.colPicList = data.data;
						v.itemMdata.colPicList.forEach(function(item){
							item.url = item.image;
							item.describe = item.text;
							item.text = item.name;
							delete item.image;
							delete item.name;
							
						})
						v.itemMdata.columnPictureLlist = v.itemMdata.colPicList;
					}
				});
				
			},
			showName(item) {
				this.itemMdata.pStyle.display = 'block';
				this.itemMdata.imgName = true;
				this.itemMdata.imgW = $('#' + this.itemMdata.colId).find('.colimgHover .back').css('height')
				var pW = $('#' + this.itemMdata.colId).find('.styleone li .pW').css('height')
				this.itemMdata.liW = parseInt(this.itemMdata.imgW.substring(-1, this.itemMdata.imgW.length - 2)) + parseInt(pW.substring(-1, pW.length - 2)) + 20 + 'px';
				$('#' + this.itemMdata.colId).find('.styleone li').css('height', this.itemMdata.liW);
				$('#' + this.itemMdata.colId).find('.colimgHover').css('height', this.itemMdata.imgW)
			},
			hidName(item) {
				this.itemMdata.pStyle.display = 'none';
				this.itemMdata.imgName = false;
				
				var pW = $('#' + this.itemMdata.colId).find('.styleone li .pW').css('height')
				this.itemMdata.liW = parseInt(this.itemMdata.imgW.substring(-1, this.itemMdata.imgW.length - 2)) + 'px';
				$('#' + this.itemMdata.colId).find('.styleone li').css('height', this.itemMdata.liW);
			},
			showDes(item) {
				this.itemMdata.imgDescription=true;
				this.itemMdata.imgW = $('#' + this.itemMdata.colId).find('.colimgHover .back').css('height')
				var pW = $('#' + this.itemMdata.colId).find('.styleone li .pW').css('height')
				this.itemMdata.liW = parseInt(this.itemMdata.imgW.substring(-1, this.itemMdata.imgW.length - 2)) + parseInt(pW.substring(-1, pW.length - 2)) + 20 + 'px';
				$('#' + this.itemMdata.colId).find('.styleone li').css('height', this.itemMdata.liW);
				$('#' + this.itemMdata.colId).find('.colimgHover').css('height', this.itemMdata.imgW)
			},
			hidDes(item) {
				this.itemMdata.imgDescription=false;
				
				var pW = $('#' + this.itemMdata.colId).find('.styleone li .pW').css('height')
				this.itemMdata.liW = parseInt(this.itemMdata.imgW.substring(-1, this.itemMdata.imgW.length - 2)) + 'px';
				$('#' + this.itemMdata.colId).find('.styleone li').css('height', this.itemMdata.liW);
			},
			getUEContent() {
				let content = this.$refs.ue.getUEContent();
				/*this.$notify({
					title: '获取成功，可在控制台查看！',
					message: content,
					type: 'success'
				});*/
				this.itemMdata.defaultMsg = content;
				//console.log(content)
			},
			colPicTwo() {
				this.itemMdata.colPicEdtStyle = false;
			},
			liImgBg(flag){
				this.flag = flag;
				this.addVisibleNav = true;
			},
			vbgFun(flag, hoverUrl, index) {
				this.flag = flag;
				this.itemMdata.hoverUrl = hoverUrl
				this.addVisibleNav = true;
				this.editId = index;
				//console.log(this.itemMdata.hoverUrl)
			},
			addVisibleFun() {
				this.addVisibleNav = false;
			},
			add: function(e, list) {
				e.preventDefault();
				//console.log("list:::::"+JSON.stringify(list));
				var newPic = JSON.parse(JSON.stringify(list));
				if(this.itemMdata.hoverUrl == false && this.itemMdata.colpics == 1 && this.flag == 1) {
					this.itemMdata.columnPictureLlist.push(newPic);
				}
				if(this.itemMdata.hoverUrl == true) {
					this.itemMdata.hoverUrlList.push(newPic);
				}
				//console.log(this.itemMdata.hoverUrlList)
				if(document.querySelectorAll('.imgLi').length > 0) {
					this.itemMdata.imgHeight = document.querySelectorAll('.imgLi')[0].naturalHeight;
					this.itemMdata.imgWidth = document.querySelectorAll('.imgLi')[0].naturalWidth;

				}
				//修改相应图片
				if(this.flag == 3) {
					//console.log(this.editId)
					this.itemMdata.columnPictureLlist.splice(this.editId, 1, newPic)
				}
				if(this.flag == 'liImg') {
					
					this.itemMdata.liImgBg = newPic.url;
					this.itemMdata.liStyle.backgroundImage = 'url('+newPic.url+')';
				}
				if(this.flag == 'liImgH') {
					
					this.itemMdata.liImgBgH = newPic.url;
					this.itemMdata.liStyleH.backgroundImage = 'url('+newPic.url+')';
				}
				//添加切换按钮设置
				if(this.flag == 'pre') {
					this.itemMdata.spanStyle.backgroundImage = 'url(' + this.itemMdata.colPre.url + ')';
					this.itemMdata.spanStyle.width = $('.setBtn').find('.pre')[0].naturalWidth + 'px';
					this.itemMdata.spanStyle.height = $('.setBtn').find('.pre')[0].naturalHeight + 'px';
					this.itemMdata.styleTwo.width = (this.itemMdata.parentStyle.width - parseInt($('.setBtn').find('.pre')[0].naturalWidth) * 2) + 'px'
					this.itemMdata.styleTwo.height = this.itemMdata.parentStyle.height - parseInt(this.itemMdata.spanStyle.height) + 'px'
					console.log($('.setBtn').find('.pre')[0].naturalWidth)
					this.itemMdata.colPre.showImg = 1;
					this.itemMdata.spanStyle.borderRadius = '0';
				}
				if(this.flag == 'next') {
					this.itemMdata.spanStyle.backgroundImage = 'url(' + this.itemMdata.colNext.url + ')';
					this.itemMdata.spanStyle.width = $('.setBtn').find('.pre')[0].naturalWidth + 'px';
					this.itemMdata.spanStyle.height = $('.setBtn').find('.pre')[0].naturalHeight + 'px';
					this.itemMdata.styleTwo.width = (this.itemMdata.parentStyle.width - parseInt($('.setBtn').find('.pre')[0].naturalWidth) * 2) + 'px'
					this.itemMdata.styleTwo.height = this.itemMdata.parentStyle.height - parseInt(this.itemMdata.spanStyle.height) + 'px'
					this.itemMdata.colNext.showImg = 1;
					this.itemMdata.spanStyle.borderRadius = '0';
				}

			},
			deleteList: function(number, list) {
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
				if(number==3){
					this.itemMdata.iStyle.lineHeight = $('#'+this.columnPictureId).find('.hid').css('height')
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
				this.itemMdata.liStyle.clear = 'none';
				this.itemMdata.imgStyle.float = 'none';
				this.itemMdata.imgStyle.width = '100%';
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.textAlign = 'center';
				var ts = this;
				ts.itemMdata.isShow = false;
				if(ts.itemMdata.MyMar) {
					clearInterval(ts.itemMdata.MyMar);
				}
				setTimeout(function() {
					ts.itemMdata.isShow = true;
				}, 10);
			},
			styletwo: function() {
				this.itemMdata.styleone = false;
				this.itemMdata.styletwo = true;
				this.itemMdata.stylethree = false;
				this.itemMdata.liStyle.float = 'left';
				//this.itemMdata.liStyle.width = '300px';
				this.itemMdata.liStyle.clear = 'none';
				this.itemMdata.imgStyle.float = 'none';
				this.itemMdata.imgStyle.width = '100%';
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.textAlign = 'center';
				this.itemMdata.imgW = $('.twoImgs')[0].naturalWidth;
				this.itemMdata.widthW = parseInt($('#' + this.itemMdata.columnPictureIdEdit).find('.width').css('width'));
				console.log(this.itemMdata.imgW)
				var ts = this;
				ts.itemMdata.isShow = false;
				console.log(this.itemMdata.MyMar)
				if(ts.itemMdata.MyMar) {
					clearInterval(ts.itemMdata.MyMar);
				}
				setTimeout(function() {
					ts.itemMdata.isShow = true;
				}, 10);
			},
			stylethree: function() {
				
				this.itemMdata.styleone = false;
				this.itemMdata.styletwo = false;
				this.itemMdata.stylethree = true;
				this.itemMdata.liStyle.float = 'left';
				this.itemMdata.liStyle.clear = 'none';
				this.itemMdata.imgStyle.float = 'none';
				this.itemMdata.imgStyle.width = '100%';
				this.itemMdata.pStyle.float = 'none';
				this.itemMdata.pStyle.width = '100%';
				this.itemMdata.pStyle.textAlign = 'center';
				this.itemMdata.imgW = $('#' + this.itemMdata.columnPictureIdEdit).find('.threeStyle img').css('width');
				console.log(parseInt(this.itemMdata.imgW))
				this.itemMdata.ulStyle.width = parseInt(this.itemMdata.imgW) * this.itemMdata.columnPictureLlist.length * 2 + 'px';
				var ts = this;
				ts.itemMdata.isShow = false;
				if(ts.itemMdata.MyMar) {
					clearInterval(ts.itemMdata.MyMar);
				}
				setTimeout(function() {
					ts.itemMdata.isShow = true;
				}, 10);
			},
			imglistshow: function(e, idx, colList) {
				var vueThis = this;
				var typeone = document.querySelector('.imglist');
				var list = typeone.querySelectorAll('li');
				for(; idx < list.length; idx++) {
					list[idx].onclick = function() {
						if(e.target.className == 'imgLi') {
							$(this).find(".imglist_hid").css({
								"display": "block"
							})
						}
						//console.log($(this))
						if(e.target.className == 'submitBtn') {
							console.log(e.target)
							$(this).find(".imglist_hid").css({
								"display": "none"
							})
						}
						if(e.target.className == 'cancelBtn') {
							$(this).find(".imglist_hid").css({
								"display": "none"
							});
							colList.text = vueThis.itemMdata.columnPictureLlist[idx].text;
						}

					}
				}
			},
			nextBtn(e, idx, colList) {
				console.log(2)
				var j = idx + 1;
				var typeone = document.querySelector('.imglist');
				var list = typeone.querySelectorAll('li');
				$(list[idx]).find(".imglist_hid").css({
					"display": "none"
				})
				$(list[j]).find(".imglist_hid").css({
					"display": "block"
				})
			},
			preBtn(e, idx, colList) {
				var j = idx - 1;
				var typeone = document.querySelector('.imglist');
				var list = typeone.querySelectorAll('li');
				$(list[idx]).find(".imglist_hid").css({
					"display": "none"
				})
				$(list[j]).find(".imglist_hid").css({
					"display": "block"
				})
			},
			imglisthid: function(e, index) {
				this.imglist_hid = index;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.columnPictureEdit {
		box-sizing: border-box;
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
								background: url(/static/image/mbg02.png) no-repeat;
								background-position: -1px -471px;
							}
							.style_two {
								width: 60px;
								height: 48px;
								background: url(/static/image/mbg02.png) no-repeat;
								background-position: -315px -507px;
							}
							.style_three {
								width: 60px;
								height: 48px;
								background: url(/static/image/style08.gif) no-repeat;
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
				.setBtn {
					margin-top: 10px;
					button {
						background: #409EFF;
						padding: 5px 20px;
						color: #fff;
						border-radius: 5px;
					}
					div {
						margin-top: 10px;
						img {
							width: 100px;
							height: 100px;
						}
						p {
							float: left;
							position: relative;
							span {
								position: absolute;
								right: 0;
								top: 0;
								width: 25px !important;
								height: 25px;
								background: url(/static/image/iconIndex2.png) -1028px 218px;
								display: none;
							}
						}
						p:hover span {
							display: block;
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
										background: url(/static/image/iconIndex2.png) -1028px 218px;
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
								display: none;
								position: absolute;
								top: 20px;
								left: 100px;
								right: 150px;
								height: 500px;
								box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.2);
								background: #FFFFFF;
								border-radius: 5px;
								z-index: 999;
								button {
									margin-left: 20px;
									border: 1px solid #E3E3E3;
									border-radius: 5px;
									text-align: center;
									line-height: 30px;
									margin-top: 30px;
									background: #409EFF;
									color: #fff;
									padding: 0 10px;
								}
								.button {
									margin-left: 40px;
									button {
										width: 25%;
										float: none;
									}
								}
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
									img {
										max-width: 100%;
										height: 190px;
										border: 1px solid #E3E3E3;
									}
									.imgBox {
										position: relative;
										max-width: 50%;
										width: auto;
										height: 190px;
										border: 1px solid #E3E3E3;
										margin-left: 117px;
										i {
											display: block;
											position: absolute;
											top: 0;
											right: 0;
											width: 60px;
											height: 30px;
										}
										.divBtn {
											position: absolute;
											top: 0;
											right: -50%;
											button {
												display: block;
											}
										}
									}
									p {
										width: 70%;
										margin-left: 15%;
										margin-top: 15px;
										input {
											border: 1px solid #E3E3E3;
											line-height: 30px;
											width: 230px;
											padding-left: 10px;
										}
										textarea {
											border: 1px solid #ccc;
											vertical-align: top;
											width: 230px;
											padding-left: 10px;
										}
									}
								}
							}
						}
					}
					.type_two {
						p {
							margin: 10px 0;
							span {
								display: inline-block;
							}
							button {
								float: right;
								border: 1px solid #ccc;
								padding: 0 10px;
							}
							button:hover {
								background: #ff0;
							}
						}
						.table {
							border: 1px solid #ccc;
							li {
								padding-left: 20px;
								height: 40px;
								line-height: 40px;
								button {
									width: 49%;
									text-align: center;
									line-height: 22px;
									i {
										display: inline-block;
										width: 20px;
										height: 20px;
										background: url(/static/image/mbg01.png) -957px -4px no-repeat;
									}
								}
								span {
									width: 44%;
									display: inline-block;
									padding-left: 24px;
								}
							}
							.navTb {
								background-color: #f8f9fb;
								span {
									width: 44%;
									display: inline-block;
									border-right: 1px solid #ccc;
									line-height: 22px;
									padding-left: 40px;
								}
								button {
									width: 49%;
									text-align: center;
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
							margin-bottom: 10px;
						}
						input[type=text] {
							border: 1px solid #ccc;
							width: 60px;
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
								background: url(/static/image/mbg02.png)no-repeat;
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
							width: 100px;
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
							p {
								input[type=text] {
									border: 1px solid #ccc;
								}
							}
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
											background: url(/static/image/mbg01.png)no-repeat;
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
		h3 {
			border-bottom: 1px solid #ccc;
			line-height: 50px;
			padding: 10px 20px;
			span {}
		}
		.picEdiBox {
			margin: 10px 20px;
			.picName {
				clear: both;
				overflow: hidden;
				p {
					line-height: 40px;
					float: left;
					input {
						border: 1px solid #ccc;
					}
				}
				p:first-child {
					margin-right: 20px;
				}
			}
			.picInfor {
				p {
					border: 1px dashed #ccc;
					line-height: 60px;
					text-align: center;
					margin: 10px 0;
					span {
						i {
							font-size: 40px;
							color: #ccc;
						}
					}
				}
				.clearFlow {
					overflow: hidden;
					clear: both;
					.upload {
						width: 85px;
						text-align: center;
						line-height: 85px;
						font-size: 30px;
						border: 1px dashed #CCCCCC;
						float: left;
						margin-right: 10px;
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
									color: #FFFFFF;
									background: red;
									width: 17px;
									height: 17px;
									text-align: center;
									line-height: 17px;
									font-size: 12px;
									display: none;
								}
							}
						}
						li:hover {
							border: 1px solid #409EFF;
						}
						li:hover .in span {
							display: block;
						}
					}
				}
			}
			.picDes {
				textarea {
					vertical-align: middle;
					border: 1px solid #ccc;
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