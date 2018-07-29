<template>
	<div class="fluid containerp">
		<!--myHeader></myHeader-->
		<div class="conect_inner">
			<div class="navigation" :style="{background:router.hoverStyle.background}">
				<div class="search">
					<input type="search" placeholder="请输入关键词" />
					<button type="submit" :style="{color:router.hoverStyle.background}">搜索</button>
				</div>
				<ul>
					<li v-for="item in router.navItem" @click="goDesign(item)">
						<i class="hover" :style="router.hoverStyle"></i>
						<div :style="router.tTextStyle">{{item.column_name}}</div>
					</li>
				</ul>
			</div>
			<div class="con_innd" @dragenter="dragConEnter($event)" @drop="onDragConDrop($event)" @dragleave="onDragConLeave($event)" @dragover="dragConover($event)">
				<vue-context-menu :contextMenuData="contextMenuData" @setAllModule="setAllModule()" @copyItem="copyItem()">
				</vue-context-menu>
				<!--导航-->
				<div class="navheader" :itemMdata="phoneNav" :style="phoneNav.navheader">
					<p @click="back" class="back" :style="phoneNav.backStyle">
						<</p>
							<p class="logo" :style="phoneNav.logoStyle" @click="isFuncur(phoneNav,{rTitle:'设置手机导航',isEdit:true})">
								<span v-if="phoneNav.namenumber==1">{{phoneNav.mainText.web_name}}</span>
								<img :style="phoneNav.navheaderImg" v-if="phoneNav.namenumber==2" :src="phoneNav.mainText.web_logo" />
							</p>
							<p class="navClick" :style="phoneNav.iconStyle"><img :src="phoneNav.mainText.web_icon" /></p>
				</div>
				<template v-for="(i,tIndex) in getDataCur.stream" class="g-cf in_outer">
					<!--满屏容器-->
					<div v-if="i.tName=='fullScreen'" :class="['in_inner fullScreen',{'enter':i.isStreamColumn}]" @dragover="onStreamOver($event,i)" @dragenter="onStreamEnter($event,i)" @drop.stop='inStreamDrop($event,i)' @dragleave="onStreamLeave($event,i)">
						<div class="activ_con"><span @click="setUpDown(i,-1)" v-show="i.isShowUp" class="up_icon"></span><span @click="setUpDown(i,1)" v-show="i.isShowDown" class="down_icon"></span></div>
						<div class="multi_edit f_hv" style="right: 0;">
							<span @click="isFuncur(i,{rTitle:'设置满屏容器',isEdit:true})">设置{{i.tText}}</span>
							<span @click="getAllSite2(i)">黏贴全局满屏容器</span>
							<span class="icon delete" @click="delModule(i)"></span>
						</div>
						<!--<div v-if="i.mClass !='Typesetting'" :itemMdata="i" :posCom="tIndex" :index="tIndex" @isFuncur="isFuncur" v-on:delModule="delModule" :is="i.tName" class="outmodule"></div>-->
						<div :id="tIndex" class="resizeMe" :style="i.conStyle" @contextmenu="showMenu(i)">
							<div v-if="ite.isShow" v-for="(ite,index) in i.itemInner" :itemInner="i.itemInner" :itemMdata="ite" v-on:removeComponent="removeComponent" @isFuncur="isFuncur" :posCom="'free'+tIndex" :index="index" :is="ite.tName" class="outmodule"></div>
						</div>
					</div>
					<!--自由容器-->
					<div v-if="i.tName=='freeContainer'&&i.isShow" @dragover="onStreamOver($event,i)" @dragenter="onStreamEnter($event,i)" @drop.stop='inStreamDrop($event,i)' @dragleave="onStreamLeave($event,i)" :class="['in_inner freeContainer',{'enter':i.isStreamColumn}]">
						<div class="activ_con"><span @click="setUpDown(i,-1)" v-show="i.isShowUp" class="up_icon"></span><span @click="setUpDown(i,1)" v-show="i.isShowDown" class="down_icon"></span></div>
						<div class="multi_edit f_hv">
							<span @click="isFuncur(i,{rTitle:'设置自由容器',isEdit:true})">设置{{i.tText}}</span>
							<span @click="getAllSite(i)">黏贴全局自由容器</span>
							<!--span @click="i.isEdit = true">设置{{i.tText}}</span-->
							<!--span class="icon style"><i>设置样式</i></span>
								<span class="icon animation"><i>设置动画</i></span>
								<span class="icon borderhid"><i>隐藏边框</i></span-->
							<span class="icon delete" @click="delModule(i)"></span>
						</div>
						<div @contextmenu="showMenu(i)" v-dragresize="getDataFree" :id="tIndex" class="resizeMe" :style="i.conStyle">
							<div v-if="ite.isShow" v-for="(ite,index) in i.itemInner" :itemInner="i.itemInner" :itemMdata="ite" v-on:removeComponent="removeComponent" @isFuncur="isFuncur" :posCom="'free'+tIndex" :index="index" :is="ite.tName" v-on:isfontFocus="isfontFocus"></div>
							<!--uiDialog v-if="i.isEdit" :itemMdata='i' :editDial='{rTitle:"设置自由容器"}'></uiDialog-->
							<div class="v_con">
								<!--p class="af_w">宽度：33px</p-->
								<p class="af_w">高度：{{i.conStyle.height}}</p>
							</div>
						</div>

					</div>
					<!--多列展示-->
					<div v-if="i.tName=='multiColumnContainer'&&i.isShow" :class="['in_inner multi_con g-cf', {'enter':i.isStreamColumn}]">
						<div class="activ_con"><span @click="setUpDown(i,-1)" v-show="i.isShowUp" class="up_icon"></span><span @click="setUpDown(i,1)" v-show="i.isShowDown" class="down_icon"></span></div>
						<div class="multi_edit f_hv">
							<span @click="isFuncur(i,{rTitle:'设置多列排版',isEdit:true})">设置{{i.tText}}</span>
							<span @click="getAllSite3(i)">黏贴全局多列展示</span>
							<!--span class="icon style"><i>设置样式</i></span>
							<span class="icon animation"><i>设置动画</i></span>
							<span class="icon borderhid"><i>隐藏边框</i></span-->
							<span class="icon delete" @click="delModule(i)"></span>
						</div>
						<div v-dragresize="getDataFree" :id="tIndex" v-if="i.tName=='multiColumnContainer'" class="resizeMe clmAll" :style="i.conStyle" @contextmenu="showMenu(i)">
							<div v-for="it in 2" :style="{height:i.conStyle.height}" :class="['clm',{'enter':i.isStreamColumn},'clm'+i.column]" @dragover="onStreamOver($event,i,it)" @dragenter="onStreamEnter($event,i,it)" @drop.stop="inStreamDrop($event,i,it)" @dragleave="onStreamLeave($event,i,it)">
								<div class="clm_inner" :style="i.conStyle">
									<div class="area_conn" :style="i.conStyle">
										<template v-for="(i,index) in i.itemInner">
											<div v-if="i.column==it" :itemMdata="i" v-on:removeComponent="removeComponent" @isFuncur="isFuncur" :posCom="'multi'" :index="index" :is="i.tName"></div>
										</template>
									</div>
									<!--div class="dragNew">
										<p></p>
										<span>可以拖模块进来</span>
									</div-->
								</div>
							</div>
						</div>
						<!--uiDialog v-if="i.isEdit" :itemMdata='i' :editDial='{rTitle:"设置多列排版"}'></uiDialog-->
					</div>
					<!--标签展示-->
					<div @contextmenu="showMenu(i)" v-if="i.tName=='labelContainer'&&i.isShow" :class="['in_inner labelContainer',{'enter':i.isStreamColumn}]">
						<div class="activ_con"><span @click="setUpDown(i,-1)" v-show="i.isShowUp" class="up_icon"></span><span @click="setUpDown(i,1)" v-show="i.isShowDown" class="down_icon"></span></div>
						<div class="multi_edit f_hv">
							<span @click="isFuncur(i,{rTitle:'设置标签展示',isEdit:true})">设置{{i.tText}}</span>
							<!--<span class="icon style"><i>设置样式</i></span>
							<span class="icon animation"><i>设置动画</i></span>
							<span class="icon borderhid"><i>隐藏边框</i></span>-->
							<span class="icon delete" @click="delModule(i)"></span>
						</div>

						<div class="tit_con">
							<ul id="labelTitle" :style="i.labelUlStyle">
								<li v-for="(ite,index) in i.labelTitle" class="labelList" :style="i.labelTitleBasis">
									<p @click="setLabelItem(i,ite)" class="title" :style="[{borderRadius:i.labelTitleBasis.borderRadius},ite.curItem==i.curItem?i.labelTitleStyleHover:i.labelTitleStyle]">{{ite.labelTitle}}<i @click="deleteLabel(i,ite,index)">x</i></p>
								</li>
								<p class="addTitle" @click="addTitle(i)">添加标签</p>
							</ul>

							<div :id="tIndex" v-dragresize="getDataFree" v-for="(it,index) in i.labelTitle" v-if="i.isShow&&it.curItem == i.curItem" :style="i.conStyle" :class="['resizeMe',{'enter':i.isStreamColumn}]" @dragover="onStreamOver($event,i,it)" @dragenter="onStreamEnter($event,i,it)" @drop.stop="inStreamDrop($event,i,it)" @dragleave="onStreamLeave($event,i,it)">
								<div class="ateralLabel" style="height: 100%;">
									<template v-for="(i,index) in it.itemInner">
										<div :itemMdata="i" v-on:removeComponent="removeComponent" @isFuncur="isFuncur" :posCom="'labelContainer'+index" :index="index" :is="i.tName"></div>
									</template>
								</div>
							</div>
						</div>
					</div>
					<!--通栏排版-->
					<div :style="i.layoutStyle" v-if="i.tName=='columnLayout'&&i.isShow" :class="['columnLayout', {'enter':i.isStreamColumn}]">
						<div :style="i.layoutOuterStyle" @dragover="onStreamOver($event,i)" @dragenter="onStreamEnter($event,i)" @drop.stop='inStreamDrop($event,i)' @dragleave="onStreamLeave($event,i)" :class="['columnLayoutInner',{'enter':i.isStreamColumn}]">
							<div v-dragresize="getDataFree" :id="tIndex" :style="i.conStyle" class="layout_inner resizeMe">
								<div class="activ_con"><span @click="setUpDown(i,-1)" v-show="i.isShowUp" class="up_icon"></span><span @click="setUpDown(i,1)" v-show="i.isShowDown" class="down_icon"></span></div>
								<div v-for="(i,index) in i.itemInner" :itemMdata="i" v-on:removeComponent="removeComponent" @isFuncur="isFuncur" :posCom="'columnLayout'+tIndex" :index="index" :is="i.tName"></div>
								<div class="v_con">
									<!--p class="af_w">宽度：33px</p-->
									<p class="af_w">高度：{{i.conStyle.height}}</p>
								</div>
							</div>
						</div>

					</div>
				</template>
				<!--添加新容器-->
				<div :class="{'enter':isAddNew}" @dragenter="onAddNewEnter($event)" @drop.stop='inAddNewDrop($event)' @dragover='inAddNewOver($event)' class="g-cf addMern">
					<div class="dragNew" @click="sideConNone()">
						<p></p>
						<span>可以拖模块进来</span>
					</div>
				</div>
			</div>
		</div>
		<uiDialog v-if="editDial.isEdit" v-on:recoent="recoent" :itemMdata="itemMdata" :editDial='editDial'></uiDialog>
		<!--<div class="pos_con">
			<div class="inner">
				<div v-for="(i,index) in getDataCur.posCom" class="g-cf">
					<div :itemMdata="i" :posCom="'posCom'" v-on:recomponent="recomponent" @isFuncur="isFuncur" :index="index" :is="i.tName"></div>
				</div>
			</div>
		</div>-->
		<!--myFooter></myFooter-->
	</div>
</template>
<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import VueDraggableResizable from 'vue-draggable-resizable'
	import dat from '../../../static/js/sideData.js'

	import myHeader from './header.vue'
	import myFooter from './footer.vue'
	import mFont from './m/font.vue'
	import mImage from './m/mImage.vue'
	import mButton from './m/mButton.vue'
	import graphic from './m/graphic.vue'
	import columnPicture from './m/columnPicture.vue'
	import uiDialog from './m/uiDialog.vue'
	import multiCarousel from './m/multiCarousel.vue'
	import articleScrap from './m/articleScrap.vue'
	import moduleAreaNav from './m/topGrade/moduleAreaNav.vue'
	import photoMoreCard from './m/topGrade/photoMoreCard.vue'
	import productShow from './m/productShow.vue'
	import productSearch from './m/productSearch.vue'
	import msgSubmit from './m/msgSubmit.vue'
	import siteForm from './m/siteForm.vue'
	import serviceOnline from './m/serviceOnline.vue'
	import areaFile from './m/areaFile.vue'
	import areaMap from './m/areaMap.vue'
	import areaLocation from './m/areaLocation.vue'
	import areaIndexFavorite from './m/areaIndexFavorite.vue'
	import siteQrCode from './m/siteQrCode.vue'
	import areaFlv from './m/areaFlv.vue'
	import productNav from './m/productNav.vue'
	import newlyShop from './m/newlyShop.vue'
	import areaCode from './m/areaCode.vue'
	import areaDate from './m/areaDate.vue'
	import memberLogin from './m/memberLogin.vue'
	import productDes from './m/productDes.vue'
	import mNewDes from './m/mNewDes.vue'
	import api from '@/api/$ajax.js'

	export default {
		name: 'xIndex2',
		components: {
			myHeader,
			myFooter,
			memberLogin,
			uiDialog,
			moduleAreaNav,
			photoMoreCard,
			serviceOnline,
			VueDraggableResizable,
			columnPicture,
			multiCarousel,
			mFont,
			articleScrap,
			graphic,
			mImage,
			mButton,
			productShow,
			productSearch,
			msgSubmit,
			siteForm,
			serviceOnline,
			areaFile,
			areaMap,
			areaDate,
			areaLocation,
			areaIndexFavorite,
			siteQrCode,
			areaFlv,
			productNav,
			areaCode,
			newlyShop,
			productDes,
			mNewDes
		},
		created() {
			var ts = this;
			ts.getData(ts.param);
			var temp = this.$route.params.param;
			this.setDelayed(temp);
			this.getData2();
			this.getWebInfo();

			if(localStorage.getItem(this.param.id + this.param.type + "itemAllStyle")) {
				this.getStyle()
			}

			var rTime;

			function unScroll() {
				var top = $(document).scrollTop();
				$(document).on('scroll.unable', function(e) {
					$(document).scrollTop(top);
				})
			}

			function removeUnScroll() {
				$(document).unbind("scroll.unable");
			}

			function run(event) {

				var itCur = {};
				event.preventDefault();
				if(ts.fontFocus) {
					return;
				}
				for(var v in ts.getDataCur) {
					var dataCur = ts.getDataCur[v];

					for(let j = 0; j < dataCur.length; j++) {
						var arSpon = dataCur[j];

						if(arSpon.mClass == 'Typesetting') {
							var itemInner = arSpon.itemInner;
							var labelTitle = arSpon.labelTitle;
							if(itemInner) {
								for(let k = 0; k < itemInner.length; k++) {
									if(itemInner[k].parentStyle.active) {
										itCur = itemInner[k];

									}
								}
							} else if(labelTitle) {
								for(let k = 0; k < labelTitle.length; k++) {
									if(labelTitle[k].itemInner) {
										var dtin = labelTitle[k].itemInner;
										for(let k = 0; k < dtin.length; k++) {
											if(dtin[k].parentStyle.active) {
												itCur = dtin[k];
											}
										}
									}
								}
							}

						} else {
							if(arSpon.tName == "moduleAreaNav") {
								if(arSpon.parentStyle.active) {
									itCur = ts.router;
								}
							} else if(arSpon.parentStyle.active) {
								itCur = arSpon;
							}
						}
					}
				}

				if(JSON.stringify(itCur) === '{}') {
					return;
				}

				if(event.keyCode == 37) { //Left

					itCur.isShow = false;
					itCur.parentStyle.left -= 2;
					setTimeout(function() {
						itCur.isShow = true;
					}, 1);
				} else if(event.keyCode == 38) { //up

					itCur.isShow = false;
					itCur.parentStyle.top -= 2;
					setTimeout(function() {
						itCur.isShow = true;
					}, 1);
				} else if(event.keyCode == 39) { //right

					itCur.isShow = false;
					itCur.parentStyle.left += 2;
					setTimeout(function() {
						itCur.isShow = true;
					}, 1);
				} else if(event.keyCode == 40) { //down
					itCur.isShow = false;
					itCur.parentStyle.top += 2;
					setTimeout(function() {
						itCur.isShow = true;
					}, 1);
				}
			}

			/*
			 *keycode 37 = Left ←
			 *keycode 38 = Up ↑
			 *keycode 39 = Right →
			 *keycode 40 = Down ↓			
			 * */

			$("body").bind('keyup', function(event) {

				run(event);
				//rTime = setInterval(run(event),10);
				//rTime = setTimeout(run(event),10);
			}).bind("keydown", function() {
				clearTimeout(rTime);
				unScroll();
			}).bind("click", function() {
				removeUnScroll();
				clearTimeout(rTime);
			});
		},
		mounted() {
			//this.phoneNav2 = this.state.phoneNav;			
		},
		data() {
			return {
				isMultiColumn: false,
				isConLeave: false,
				id: this.$route.params.id,
				fontFocus: false,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					column_id: this.$route.query.column_id,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.mobile_version_id
				},
				preview: '/pc/t2/' + this.$route.params.id + "/",
				itemMdata: {},
				editDial: {
					isEdit: false,
					rTitle: "设置自由容器",
				},
				contextMenuData: {
					menuName: this.$utils.guid(),
					axios: {
						x: null,
						y: null
					},
					menulists: [{
							fnHandler: 'setAllModule',
							btnName: '设置为全站模块'
						},
						{
							fnHandler: 'copyItem',
							btnName: '复制模块'
						}
					]
				},
				isAddNew: false,
				token: this.$route.query.token,
				phoneNav2: ''
			}
		},
		methods: {
			getStyle() {
				var Style = JSON.parse(localStorage.getItem(this.param.id + this.param.type + "itemAllStyle"));
				this.router.hoverStyle = Style.hoverStyle;
				this.router.tTextStyle = Style.tTextStyle;
				console.log(Style)
			},
			getAllSite(i) {
				var site = JSON.parse(localStorage.getItem(this.param.id + this.param.type + "itemAllSite"));
				for(var i = 0; i < site.length; i++) {
					if(site[i].tText == '自由容器') {
						this.pushItemStream(site[i]);
					}
				}
			},
			getAllSite2(i) {
				var site = JSON.parse(localStorage.getItem(this.param.id + this.param.type + "itemAllSite"));
				for(var i = 0; i < site.length; i++) {
					if(site[i].tText == '满屏容器') {
						this.pushItemStream(site[i]);
					}
				}
			},
			getAllSite3(i) {
				var site = JSON.parse(localStorage.getItem(this.param.id + this.param.type + "itemAllSite"));
				for(var i = 0; i < site.length; i++) {
					if(site[i].tText == '多列容器') {
						this.pushItemStream(site[i]);
					}
				}
			},
			back() {
				this.$router.go(-1)
			},
			goDesign(item) {
				var link = item.id;
				if(link) {
					if(Number(link)) {
						//location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&version_id=' + this.param.version_id + '&column_id=' + item.id;
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
						console.log(item.id);
					} else if(link.indexOf("http") != -1) {
						location.href = link;
					} else {
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
					}
				}
				//console.log(this.router);
			},
			addTitle(i) {
				var newlabelTitle = {
					labelTitle: "标签" + (i.labelTitle.length + 1),
					curItem: i.labelTitle.length,
					cur: false,
					lblClass: "long_i1",
					itemInner: []
				}
				i.labelTitle.push(newlabelTitle);
			},
			deleteLabel(i, list, index) {
				i.labelTitle.splice(i.labelTitle.indexOf(list), 1);
				i.itemInner.splice(index, 1);
				//console.log(index);
			},
			showMenu(item) {
				this.transferIndex = item;
				event.preventDefault();
				var x = event.clientX;
				var y = event.clientY;
				this.contextMenuData.axios = {
					x,
					y
				}
			},
			setAllModule(e) {
				var obj = {
					id: this.param.id,
					type: this.param.type,
					order: this.transferIndex
				}
				this.setItemSite(obj);
				//this.orderbyId();
			},
			copyItem(e) {
				var obj = {
					index: this.getDataCur.stream.indexOf(this.transferIndex),
					order: JSON.parse(JSON.stringify(this.transferIndex))
				}
				this.copyModule(obj);
				this.orderbyId();
			},
			isFuncur(i, item) {
				i.isEdit = true;
				//console.log(i);
				this.editDial = item;
				this.itemMdata = i;
			},
			sideConNone() {
				this.state.flag = false;
			},
			getData2() {
				api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id, true, {}, r => {
					if(r.code == 422) {
						console.log(r.message);
						return;
					}

					var list = r.data.list;
					//this.router.navItem
					var firstList = [];
					for(let i = 0; list.length > i; i++) {
						//console.log(list[i].parent_id=1);
						list[i].secondNav = [];
						if(list[i].parent_id == 0) {

							firstList.push(list[i])
						}
					}
					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; list.length > k; k++) {
							list[k].thirdNav = [];
							if(firstList[i].id == list[k].parent_id) {
								firstList[i].secondNav.push(list[k])
							}
						}
					}

					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; firstList[i].secondNav.length > k; k++) {
							//var thirdNav = firstList[i].secondNav[k]
							for(let j = 0; list.length > j; j++) {
								//firstList[i].secondNav[k].thirdNav = [];
								if(firstList[i].secondNav[k].id == list[j].parent_id) {
									firstList[i].secondNav[k].thirdNav.push(list[j])
								}
							}
						}
					}

					this.router.navItem = firstList;
					console.log(this.router.navItem);
				});
			},
			getWebInfo() {
				var ts = this;
				//				$.ajax({
				//					url: 'http://119.29.226.11:88/api/data/getWebInfo?token=' + this.token,
				//					type: "GET",
				//					dataType: "json", //指定服务器返回的数据类型
				//					success: function(data) {
				//						//var result = JSON.stringify(data); //json对象转成字符串
				//						v.phoneNav.mainText = data.data;
				//						//$("#text").val(result);
				//					}
				//				});
				api.get('/api/data/getWebInfo?token=' + this.token, true, {}, function(data) {
					console.log(data)
					ts.phoneNav.mainText = data.data;
				});
			},
			setLabelItem(i, item) {
				for(let k = 0; i.labelTitle.length > k; k++) {
					i.labelTitle[k].cur = false;
				}
				//for(let k = 0; i.itemInner.length > k; k++) {
				//	i.itemInner[k].isShow = false;
				//}
				item.cur = true;
				i.curItem = item.curItem;
			},

			getDataFree(v) {
				this.getDataCur.stream[v.el].draging = true;
				this.getDataCur.stream[v.el].conStyle.height = v.height;
			},
			isfontFocus(flag) {
				console.log("flag:" + flag);
				this.fontFocus = flag;
			},
			recoent(itemMdata) {
				//this.itemEditCur(null);
			},
			onDragConLeave(event) {
				this.isConLeave = true;
				//console.log("离开外层标准流容器");
			},
			dragConEnter(event) {
				//console.log("进入外层标准流容器");
			},
			onDragConDrop(event) {
				this.isConLeave = false;
				event.preventDefault();
				var dt = this;
				if(!dt.state.curOrder) return;
				var obj = dt.state.curOrder;
				var itemCon = this.getDataCur.posCom;
				if(itemCon) {
					for(var i = 0; itemCon.length > i; i++) {
						itemCon[i].cur = false;
					}
				}
				obj.parent = false;
				obj.parentStyle.top = 200;
				obj.parentStyle.left = 550;
				var item = JSON.parse(JSON.stringify(obj));
				item.cur = true;
				//itemCon.push(item);
				this.pushItemPosCom(item);
				dt.state.curOrder = null;
				//console.log("拖入外层标准流容器");
			},
			dragConover(event, i) {
				event.preventDefault();
				this.isConLeave = false;
				//console.log("进入外层标准流容器(移动阶段 )");
			},
			onStreamEnter(event, i) {
				//console.log("进入标准流容器");
				$(".multi_con").each(function(v) {
					var h = $(this).height();
					$(this).find(".clm").height(h);
				})
				event.preventDefault();
			},
			onStreamOver(event, i) {
				i.isStreamColumn = true;
				//console.log("进入标准流容器(移动阶段 )");
			},
			onStreamLeave(event, i) {
				i.isStreamColumn = false;
				//console.log("离开标准流容器标准流容器");
			},
			recomponent(comp) {
				var posCom = this.getDataCur.posCom;
				if(posCom.length) {
					for(var j = 0; posCom.length > j; j++) {
						posCom.splice(posCom.indexOf(comp), 1);
					}
				}
			},
			inStreamDrop(event, i, it) {
				console.log("拖入" + i.tText);
				event.preventDefault();
				i.isStreamColumn = false;
				var dt = this;
				if(!dt.state.curOrder) return;
				var obj = dt.state.curOrder;
				var itemCon = [];
				var stream = this.getDataCur.stream;

				if(dt.state.curOrder.parentStyle && dt.state.curOrder.parentStyle.height > i.conStyle.height) {
					i.conStyle.height = (dt.state.curOrder.parentStyle.height + 20) + "px";
				}

				console.log(obj);
				var item = JSON.parse(JSON.stringify(obj));
				item.order = itemCon.length + 1;

				if(obj.mClass == "Typesetting") {
					this.pushItemStream(item);
					stream.forEach(function(v, i) {
						if(i == 0) {
							v.isShowUp = false;
							v.isShowDown = true;
						} else if(i == stream.length - 1) {
							v.isShowUp = true;
							v.isShowDown = false;
						} else {
							v.isShowUp = true;
							v.isShowDown = true;
						}
					});
					this.setCurOrder(null);
					return;
				}

				if(i.tName == "labelContainer") { //标签展示
					var flag = true;
					for(let k = 0; i.labelTitle.length >= k; k++) {
						console.log(k);
						k = it.curItem;
						i.labelTitle[k].itemInner.push(item);
						this.setCurOrder(null);
						return;
					}
					//					for(let k = 0; i.labelTitle.length > k; k++) {
					//						if(i.labelTitle[k].cur) {
					//							for(let j = 0; i.itemInner.length > j; j++) {
					//								if(i.labelTitle[k].curItem == i.itemInner[j].curItem) {
					//									flag = false;
					//									console.log(i.labelTitle[k].curItem)
					//								}
					//							}
					//							if(flag) {
					//								item.curItem = i.labelTitle[k].curItem;
					//								//i.itemInner.push(it);							
					//								this.pushItemStreamItem({
					//									i,
					//									item
					//								});
					//							} else {
					//								/*for(let k = 0; i.labelTitle.length > k; k++) {
					//																	i.labelTitle.cur = false;
					//																}*/
					//								var it = {
					//									labelTitle: "标签" + (i.labelTitle.length + 1),
					//									curItem: i.labelTitle.length,
					//									cur: true,
					//									lblClass: "long_i1"
					//								}
					//								i.labelTitle.push(it);
					//								item.curItem = i.labelTitle.length - 1;
					//								//i.itemInner.push(it);
					//								this.pushItemStreamItem({
					//									i,
					//									item
					//								});
					//								//this.isFuncur(i, it);
					//							}
					//							this.setCurOrder(null);
					//							return;
					//						}
					//					}
				}

				/*if(i.tName == "columnLayout") {
					item.parent = false;
				}
				item.cur = true;*/
				//item.parent = true;

				item.column = it || -1;
				//debugger;

				this.pushItemStreamItem({
					i,
					item
				});
				//i.itemInner.push(item);
				//this.setCurOrder(null);
			},
			onAddNewEnter(event) {
				//console.log("进入新增容器(进入阶段 )");
				event.preventDefault();
			},
			inAddNewDrop(event) {
				//console.log("拖入新增容器");
				event.preventDefault();
				var dt = this;
				if(!dt.state.curOrder) return;
				var item = dt.state.curOrder;
				var stream = this.getDataCur.stream;

				if(dt.state.curOrder.mClass != "Typesetting") {
					item = {
						tName: "fullScreen",
						tText: "满屏容器",
						isEdit: false,
						isShow: true,
						draging: false,
						isShowUp: false,
						isShowDown: false,
						zinStyle: {
							zIndex: 0
						},
						mImage: {
							url: "",
						},
						conStyle: {
							paddingTop: '0',
							paddingLeft: '0',
							height: 'auto',
							width: '100%',
							paddingRight: '0',
							paddingBottom: '0',
						},
						mClass: "Typesetting",
						isAllSite: false,
						aloneIcon: "panelModuleIcon_multi moduleArea_multi",
						aloneText: "moduleAloneText",
						itemInner: []
					}
					item.itemInner.push(dt.state.curOrder);

				} else {
					item = dt.state.curOrder;
				}

				if(stream.length > 1) {
					stream.forEach(function(v, i) {
						//console.log(i);
						if(i == 0) {
							v.isShowUp = false;
							v.isShowDown = true;
						} else {
							v.isShowUp = true;
							v.isShowDown = true;
						}
					});
					item.isShowUp = true;
					item.isShowDown = false;
				}
				var item = JSON.parse(JSON.stringify(item));
				this.pushItemStream(item);
				this.setCurOrder(null);
			},
			removeComponent(comp) {
				this.delItemStream(comp);
				this.orderbyId();
			},
			setUpDown(i, flag) {
				var stream = this.getDataCur.stream;
				var k = stream.indexOf(i);
				var obj = {
					k: k,
					j: k + flag
				}
				this.change(obj);
				stream.forEach(function(v, i) {
					if(i == 0) {
						v.isShowUp = false;
						v.isShowDown = true;
					} else if(i == stream.length - 1) {
						v.isShowUp = true;
						v.isShowDown = false;
					} else {
						v.isShowUp = true;
						v.isShowDown = true;
					}
				});
			},
			delModule(item) {
				var stream = this.getDataCur.stream;
				stream.splice(stream.indexOf(item), 1);
				this.orderbyId();
			},
			inAddNewOver(event) {
				event.preventDefault();
			},
			...mapActions([
				"getData", "saveloca"
			]),
			...mapMutations([
				'orderbyId', 'setDelayed', 'delItemPos', 'copyModule', 'delStreamModule', 'setCurOrder', 'setItemSite', 'pushItemStream', "pushItemPosCom", "pushItemStreamItem", "delItemStream", "change"
			])
		},
		computed: {
			...mapGetters(["state", "getDataCur", "router", "phoneNav", "itemCon"])
		},
		watch: {

		}
	}
</script>
<style lang="scss" scoped>
	.containerp {
		width: 351px;
		height: 672px;
		overflow-y: auto;
		overflow-x: hidden;
		margin-left: 30%;
		position: relative;
		background: url(../../../static/image/phonebg.png)no-repeat center;
	}
	
	.containerp .conect_inner {
		width: 332px;
		overflow-x: hidden;
		overflow-y: auto;
		/*border: 1px solid red !important;*/
		background-color: #fff;
		position: relative;
		margin-left: 11px;
		margin-top: 47px;
		margin-right: auto;
		height: 556px;
		.columnLayout {
			position: relative;
			margin-left: -45%;
			margin-right: -45%;
		}
		.con_innd {}
	}
	
	.in_outer {
		position: relative;
	}
	
	.pos_con {
		.inner {
			width: 100%;
			margin: 0 auto;
		}
	}
	
	.containerp .warning {
		border: 1px dashed red;
	}
	
	.in_inner {
		border: 1px dashed #FFFFFF;
		.resizeMe {
			position: relative;
			left: 0 !important;
			top: 0 !important;
			box-sizing: border-box;
		}
		.del_icon {
			text-align: left;
		}
		.multi_edit {
			position: absolute;
			z-index: 0;
			top: -40px;
			width: auto;
			height: 40px;
			line-height: 40px;
			display: none;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.15);
			padding: 0 10px;
			span {
				float: left;
				cursor: pointer;
				margin-right: 10px;
				margin-left: 5px;
			}
			span:nth-child(1) {
				line-height: 25px;
				border-right: 1px solid #E3E3E3;
				margin-top: 7px;
				padding-right: 8px;
				margin-left: 10px;
			}
			.icon {
				background: url(../../../static/image/bg03.png)no-repeat;
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
				display: block;
				background-position: -64px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover {
				background-position: -64px -232px;
			}
			.style:hover i {
				display: block;
			}
			.animation {
				display: block;
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
				display: block;
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
				display: block;
				background-position: -108px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover {
				background-position: -108px -232px;
			}
			.delete:hover i {
				display: block;
			}
		}
	}
	
	.multi_con {
		position: relative;
	}
	
	.in_inner:hover {
		border-color: #5874d8;
		.clm {
			border-color: #5874d8;
		}
		.multi_edit {
			display: block;
		}
	}
	
	.multi_con {
		height: auto;
		.clm {
			border: 1px dashed #fff;
			height: 300px;
			position: relative;
			.area_conn {
				height: 185px;
			}
			.dragNew {
				position: absolute;
				bottom: 8px;
				width: 100%;
			}
		}
	}
	
	#labelTitle {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		text-align: center;
		width: auto;
		margin-bottom: 0;
		position: relative;
		.labelList {
			float: left;
			text-align: center;
			z-index: auto;
			box-sizing: border-box;
			.title {
				position: relative;
				cursor: pointer;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				i {
					position: absolute;
					top: 0px;
					right: 10px;
					line-height: 20px;
					display: none;
				}
			}
			.title:hover i {
				display: block;
			}
			.ateralLabel {
				display: none;
				position: absolute;
				width: 100%;
				left: 0;
				right: 0;
				z-index: 999;
				background: #FFFFFF;
				margin-top: 10px;
			}
		}
		.addTitle {
			background: #409EFF;
			float: left;
			color: #FFFFFF;
			font-size: 12px;
			padding: 0 5px;
			border-radius: 5px;
			margin-left: 5px;
			line-height: 40px;
		}
		.cur .title {
			background: red !important;
			color: #FFFFFF !important;
		}
	}
	
	.longitud {
		.tit_con {
			float: left;
			width: 20%;
			ul {}
		}
		.long_con {
			float: left;
			width: 80%;
		}
	}
	
	.ateralLabel {
		ul {
			li {
				float: left;
				width: 100px;
				text-align: center;
			}
		}
		.long_con {}
	}
	
	.containerp .enter {
		border: #5874d8 1px dashed;
	}
	
	.dragNew {
		min-height: 70px;
		padding-top: 20px;
		padding-bottom: 10px;
		text-align: center;
		border: 1px dashed #CCC;
		p {
			text-align: center;
			cursor: pointer;
			width: 132px;
			margin: 0 auto;
			height: 50px;
			background: url(../../../static/image/mbg01.png)no-repeat;
			background-position: -611px -348px;
			margin-bottom: 5px;
		}
	}
	
	.dragNew:hover {
		border: 1px dashed #5874d8;
	}
	
	.dragNew:hover p {
		background-position: -611px -400px;
	}
	
	.columnLayoutInner {
		width: 100%;
		margin: 0 auto;
	}
	
	.activ_con {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 6;
		width: 30px;
		.down_icon {
			height: 30px;
			cursor: pointer;
			display: block;
			width: 30px;
			background: url(../../../static/image/down_icon.png) no-repeat 0 0;
		}
		.up_icon {
			height: 30px;
			display: block;
			cursor: pointer;
			width: 30px;
			background: url(../../../static/image/up_icon.png) no-repeat 0 0;
		}
	}
	
	.addMern {
		width: 100%;
		margin: 0 auto;
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