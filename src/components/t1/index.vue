<template>
	<div class="fluid container" @dragenter="dragConEnter($event)" @drop="onDragConDrop($event)" @dragleave="onDragConLeave($event)" @dragover="dragConover($event)">
		<!--myHeader></myHeader-->
		<div class="pos_con">
			<div class="inner" v-if="isMultiColumn">
				<template v-for="(i,index) in getDataCur.posCom" class="g-cf">
					<div v-if="i.isShow" :itemMdata="i" :posCom="'posCom'" :itemInner="{itemInner:getDataCur.posCom}" v-on:recomponent="recomponent" @moverModule="moverModule" @isFuncur="isFuncur" :index="index" :isfontFocus="fontFocus" :is="i.tName"></div>
				</template>
			</div>
		</div>
		<div :class="['conect_inner',{'warning':isConLeave}]" style="min-height: 500px; border: 1px solid #fff;">
			<div class="con_innd">
				<vue-context-menu :contextMenuData="contextMenuData" @setAllModule="setAllModule()" @managementGlobalModule="managementGlobalModule()" @customModule="customModule()" @copyItem="copyItem()">
				</vue-context-menu>
				<template v-for="(i,tIndex) in getDataCur.stream" class="g-cf in_outer" :style="i.conStyle">
					<!--自由容器-->
					<div v-if="i.tName=='freeContainer'&&i.isShow" @mouseenter="hoverConect(i)" @mouseover="hoverConect(i)" @mouseleave.self="leaveConect(i)" @dragover="onStreamOver($event,i)" @dragenter="onStreamEnter($event,i)" @drop.stop='inStreamDrop($event,i)' @dragleave="onStreamLeave($event,i)" :class="['in_inner freeContainer',{'enter':i.isStreamColumn}]" :style="[i.zinStyle,i.conStyle]">
						<div class="activ_con"><span @click="setUpDown(i,-1)" v-show="i.isShowUp" class="up_icon"></span><span @click="setUpDown(i,1)" v-show="i.isShowDown" class="down_icon"></span></div>
						<div :class="['multi_edit f_hv',{hover:i.isHover}]">
							<span @click="isFuncur(i,{rTitle:'设置自由容器',isEdit:true})">设置{{i.tText}}</span>
							<!--span @click="i.isEdit = true">设置{{i.tText}}</span-->
							<!--span class="icon style"><i>设置样式</i></span>
								<span class="icon animation"><i>设置动画</i></span>
								<span class="icon borderhid"><i>隐藏边框</i></span-->
							<span class="icon delete" @click="delModule(i)"><i>删除模块</i></span>
						</div>
						<div @contextmenu="showMenu(i)" v-dragresize="getDataFree" :id="tIndex" class="resizeMe" :style="i.conStyle">
							<div v-if="ite.isShow" v-for="(ite,index) in i.itemInner" :itemInner="i" :itemMdata="ite" v-on:removeComponent="removeComponent" @isFuncur="isFuncur" @moverModule="moverModule" :posCom="'free'+tIndex" :index="index" v-on:isfontFocus="isfontFocus" :is="ite.tName"></div>
							<!--uiDialog v-if="i.isEdit" :itemMdata='i' :editDial='{rTitle:"设置自由容器"}'></uiDialog-->
							<div class="v_con">
								<!--p class="af_w">宽度：33px</p-->
								<p class="af_w">高度：{{i.conStyle.height}}</p>
							</div>
						</div>
					</div>
					<!--多列展示-->
					<div v-if="i.tName=='multiColumnContainer'&&i.isShow" @mouseenter="hoverConect(i)" @mouseover="hoverConect(i)" @mouseleave.self="leaveConect(i)" :class="['in_inner multi_con g-cf', {'enter':i.isStreamColumn}]" :style="i.zinStyle">
						<div class="activ_con"><span @click="setUpDown(i,-1)" v-show="i.isShowUp" class="up_icon"></span><span @click="setUpDown(i,1)" v-show="i.isShowDown" class="down_icon"></span></div>
						<div :class="['multi_edit f_hv',{hover:i.isHover}]">
							<span @click="isFuncur(i,{rTitle:'设置多列排版',isEdit:true})">设置{{i.tText}}</span>
							<!--span class="icon style"><i>设置样式</i></span>
							<span class="icon animation"><i>设置动画</i></span>
							<span class="icon borderhid"><i>隐藏边框</i></span-->
							<span class="icon delete" @click="delModule(i)"><i>删除模块</i></span>
						</div>
						<div @contextmenu="showMenu(i)" v-dragresize="getDataFree" :id="tIndex" class="resizeMe" :style="i.conStyle">
							<div v-for="it in i.column" :style="{height:i.conStyle.height}" :class="['clm',{'enter':i.isStreamColumn},'clm'+i.column]" @dragover="onStreamOver($event,i,it)" @dragenter="onStreamEnter($event,i,it)" @drop.stop="inStreamDrop($event,i,it)" @dragleave="onStreamLeave($event,i,it)">
								<div class="clm_inner" :style="i.conStyle">
									<div class="area_conn" :style="i.conStyle">
										<template v-for="(imy,index) in i.itemInner">
											<div v-if="imy.isShow&&imy.column==it" :itemMdata="imy" :itemInner="i" v-on:removeComponent="removeComponent" @isFuncur="isFuncur" @moverModule="moverModule" :posCom="'multi'" :index="index" v-on:isfontFocus="isfontFocus" :is="imy.tName"></div>
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
					<div @contextmenu="showMenu(i)" v-if="i.tName=='labelContainer'&&i.isShow" @mouseover="hoverConect(i)" @mouseenter.self="hoverConect(i)" @mouseleave.self="leaveConect(i)" class="columnLayout tabContainer" :style="i.zinStyle" :id="'labelContainerId'+tIndex">
						<div class="in_inner labelContainer" :style="i.ulStyle">
							<div class="activ_con"><span @click="setUpDown(i,-1)" v-show="i.isShowUp" class="up_icon"></span><span @click="setUpDown(i,1)" v-show="i.isShowDown" class="down_icon"></span></div>
							<div :class="['multi_edit f_hv',{hover:i.isHover}]">
								<span @click="isFuncur(i,{rTitle:'设置标签展示',editDialHeight:'590px', isEdit:true})">设置{{i.tText}}</span>
								<!--<span class="icon style"><i>设置样式</i></span>
								<span class="icon animation"><i>设置动画</i></span>
								<span class="icon borderhid"><i>隐藏边框</i></span>-->
								<span class="icon delete" @click="delModule(i)"><i>删除模块</i></span>
							</div>
							<div class="g-cf tit_con" :class="[{labelListOne:i.diretionM==1,labelListTwo:i.diretionM==2,righterdUl:i.setulStyle==3&&i.diretionM==2}]" :style="i.layoutOuterStyle">
								<div class="g-cf titlbl" :style="i.marginStyle">
									<ul :class="['g-cf',{centerUl:i.setulStyle==1&&i.diretionM==1,leftUl:i.setulStyle==2&&i.diretionM==1,rightUl:i.setulStyle==3&&i.diretionM==1}]">
										<li v-for="(ite,index) in i.labelTitle" :class="['labelList',{'cur':ite.cur}]" :style="[i.labelTitleStyle,{borderRadius:i.labelTitleStyle.borderRadius+'px',lineHeight:i.labelTitleStyle.height}]" @click="setLabelItem(i,ite)" @mouseover="setHoverItem(i,ite)">
											<p class="title" :style="{borderRadius:i.labelTitleStyle.borderRadius+'px'}">{{ite.labelTitle}}</p>
											<!--i @click="deleteLabel($event,i,ite,index)"></i-->
										</li>
										<!--li>
											<p class="addTitle" @click="addTitle(i)">添加标签</p>
										</li-->
									</ul>
								</div>
								<div class="lbl_con">
									<div v-for="(it,index) in i.labelTitle" class="conStyle" :style="it.conStyle" v-show="i.isShow&&it.curItem == i.curItem" @dragover="onStreamOver($event,i,it)" @dragenter="onStreamEnter($event,i,it)" @drop.stop="inStreamDrop($event,i,it)" @dragleave="onStreamLeave($event,i,it)">
										<template v-for="(ilbl,dex) in it.itemInner">
											<div v-if="ilbl.isShow&&it.curItem == i.curItem" :itemMdata="ilbl" :itemInner="i" v-on:removeComponent="removeComponent" @isFuncur="isFuncur" @moverModule="moverModule" :posCom="'labelContainer'+index" :index="dex" :is="ilbl.tName"></div>
										</template>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--通栏排版-->
					<div @contextmenu="showMenu(i)" :style="i.zinStyle" v-if="i.tName=='columnLayout'&&i.isShow" @mouseover="hoverConect(i)" @mouseenter="hoverConect(i)" @mouseleave.self="leaveConect(i)" :class="['columnLayout', {'enter':i.isStreamColumn}]">
						<div :style="i.layoutOuterStyle" @dragover="onStreamOver($event,i)" @dragenter="onStreamEnter($event,i)" @drop.stop='inStreamDrop($event,i)' @dragleave="onStreamLeave($event,i)" :class="['columnLayoutInner',{'enter':i.isStreamColumn}]">
							<div :class="['multi_edit f_hv',{hover:i.isHover}]">
								<span @click="isFuncur(i,{rTitle:'通栏排版',isEdit:true})">设置{{i.tText}}</span>
								<!--span class="icon style"><i>设置样式</i></span>
								<span class="icon animation"><i>设置动画</i></span>
								<span class="icon borderhid"><i>隐藏边框</i></span-->
								<span class="icon delete" @click="delModule(i)"><i>删除模块</i></span>
							</div>
							<div v-dragresize="getDataFree" :id="tIndex" :style="{height:i.conStyle.height,position:i.conStyle.position,margin:i.conStyle.margin}" class="layout_inner resizeMe">
								<div class="activ_con"><span @click="setUpDown(i,-1)" v-show="i.isShowUp" class="up_icon"></span><span @click="setUpDown(i,1)" v-show="i.isShowDown" class="down_icon"></span></div>
								<div v-if="irt.isShow" v-for="(irt,index) in i.itemInner" :itemMdata="irt" :itemInner="i" v-on:removeComponent="removeComponent" @isFuncur="isFuncur" @moverModule="moverModule" :posCom="'columnLayout'+tIndex" :index="index" v-on:isfontFocus="isfontFocus" :is="irt.tName"></div>
								<div class="v_con">
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
		<!--myFooter></myFooter-->
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import VueDraggableResizable from 'vue-draggable-resizable'
	//import myHeader from './header.vue'
	//import myFooter from './footer.vue'
	//import zxxPageRuler from '../../../static/ruler_for/js/jquery.zxxPageRuler.1.1.js'
	import mFont from '../m/frequently/font.vue'
	import mImage from '../m/frequently/mImage.vue'
	import mButton from '../m/frequently/mButton.vue'

	import graphic from '../m/foundation/graphic.vue'
	import mNewDes from '../m/foundation/mNewDes.vue'
	import columnPicture from '../m/foundation/columnPicture.vue'
	import multiCarousel from '../m/foundation/multiCarousel.vue'
	import articleScrap from '../m/foundation/articleScrap.vue'

	import productNav from '../m/product/productNav.vue'
	import newlyShop from '../m/product/newlyShop.vue'
	import productShow from '../m/product/productShow.vue'
	import productDes from '../m/product/productDes.vue'
	import productSearch from '../m/product/productSearch.vue'

	import memberLogin from '../m/dynamicWay/memberLogin.vue'
	import msgSubmit from '../m/dynamicWay/msgSubmit.vue'
	import siteForm from '../m/dynamicWay/siteForm.vue'
	import serviceOnline from '../m/dynamicWay/serviceOnline.vue'
	import siteQrCode from '../m/dynamicWay/siteQrCode.vue'
	import friendLink from '../m/dynamicWay/friendLink.vue' //友情链接

	import moduleAreaNav from '../m/topGrade/moduleAreaNav.vue'
	import sidebar from '../m/topGrade/sidebar.vue'
	import photoMoreCard from '../m/topGrade/photoMoreCard.vue'
	import areaFile from '../m/topGrade/areaFile.vue'
	import areaMap from '../m/topGrade/areaMap.vue'
	import areaLocation from '../m/topGrade/areaLocation.vue'
	import areaIndexFavorite from '../m/topGrade/areaIndexFavorite.vue'
	import areaFlv from '../m/topGrade/areaFlv.vue'
	import areaCode from '../m/topGrade/areaCode.vue'
	import areaDate from '../m/topGrade/areaDate.vue'
	import sitemap from '../m/topGrade/sitemap.vue'
	import singlePage from '../m/topGrade/singlePage.vue'

	import uiDialog from '../m/uiDialog.vue'
	//require("../../../static/js/emit.js");
	
	export default {
		name: 'xIndex',
		components: {
			memberLogin,
			uiDialog,
			moduleAreaNav,
			sidebar,
			photoMoreCard,
			serviceOnline,
			VueDraggableResizable,
			columnPicture,
			multiCarousel,
			mFont,
			articleScrap,
			graphic,
			mImage,
			mNewDes,
			mButton,
			productShow,
			productDes,
			productSearch,
			msgSubmit,
			siteForm,
			serviceOnline,
			singlePage,
			areaFile,
			areaMap,
			areaDate,
			areaLocation,
			areaIndexFavorite,
			siteQrCode,
			friendLink,
			areaFlv,
			sitemap,
			productNav,
			areaCode,
			newlyShop
		},
		created() {
			var ts = this;
			ts.getData(ts.param);

			var temp = this.$route.params.param;
			this.setDelayed(temp);
			var rTime;
			var stream = this.getDataCur.stream;
			var posCom = this.getDataCur.posCom;
			var objAll = {
				id: this.param.id,
				type: this.param.type
			}

			this.getAllSite(objAll);

			if(stream && stream.length) {
				for(let j = 0; j < stream.length; j++) {
					stream[j].isHover = false;				
					stream[j].isStopPropagation = false;
				}
			}

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
		data() {
			return {
				isMultiColumn: true,
				isConLeave: false,
				id: this.$route.params.id,
				fontFocus: false,
				curIndex: 0,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					column_id: this.$route.query.column_id,
					type: this.$route.query.type,
					version_id: this.$route.query.pc_version_id
				},
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
							btnName: '设置为全局模块'
						}, {
							fnHandler: 'customModule',
							btnName: '设置为自定义模块'
						},
						{
							fnHandler: 'copyItem',
							btnName: '复制模块'
						}
					]
				},
				isAddNew: false
			}
		},
		methods: {
			enterStyle(i, ite, index, e) {
				e.target.style.color = i.labelTitleStyleHover.color;
				e.target.style.background = i.labelTitleStyleHover.background;
				e.target.style.borderColor = i.labelTitleStyleHover.borderColor;
			},

			leaveStyle(i, ite, index, e) {
				if(ite.cur == false) {
					e.target.style.color = i.labelTitleStyle.color;
					e.target.style.background = i.labelTitleStyle.background;
					e.target.style.borderColor = i.labelTitleStyle.borderColor;
				}
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
			moverModule(item) {
				console.log("moverModule");
				console.log(item);
			},
			deleteLabel(oEvent, i, list, index) {
				oEvent.stopPropagation();
				var ind = i.labelTitle.indexOf(list);
				//i.curItem = i.labelTitle[ind+1].curTtem,
				//console.log(i.labelTitle[ind+1].curTtem);
				i.labelTitle.splice(ind, 1);
			},
			showMenu(item) {
				this.transferIndex = item;
				event.preventDefault();
				var allSite = JSON.parse(localStorage.getItem(this.param.id + this.param.type + "itemAllSite")) || [];
				console.log(allSite);
				var faAll = false;
				if(!!item.allId) {
					for(var i = 0; allSite.length > i; i++) {
						if(allSite[i].allId == item.allId) {
							faAll = true;
						}
					}
				}

				//debugger;
				if(faAll) {
					//debugger;
					this.contextMenuData.menulists[0].btnName = "管理全局模块";
					this.contextMenuData.menulists[0].fnHandler = "managementGlobalModule";
				} else {
					this.contextMenuData.menulists[0].btnName = "设置为全局模块";
					this.contextMenuData.menulists[0].fnHandler = "setAllModule";
				}
				var x = event.clientX;
				var y = event.clientY;
				this.contextMenuData.axios = {
					x,
					y
				}
			},
			customModule(e) {
				var customModule = JSON.parse(localStorage.getItem(this.param.id + this.param.type + "customModule")) || [];
				/*var obj = {
					id: this.param.id,
					type: this.param.type,
					order: this.transferIndex
				}*/
				// console.log(customModule.indexOf(this.transferIndex))
				if(customModule.indexOf(this.transferIndex) == -1) {
					//console.log("sss )))")
					customModule.push(this.transferIndex);
					localStorage.setItem(this.param.id + this.param.type + "customModule", JSON.stringify(customModule));
				}
				//this.orderbyId();
			},
			managementGlobalModule() {
				console.log("ms");
				var url = '/pc/allsite/' + this.$route.params.id + '?token=' + this.$route.query.token + '&company_id=' + this.$route.query.company_id + '&type=' + this.$route.query.type + '&mobile_version_id=' + this.$route.query.mobile_version_id + '&pc_version_id=' + this.$route.query.pc_version_id + '&domain_url=' + this.$route.query.domain_url;
				window.open(window.location.origin + url);
			},
			setAllModule(e) {
				// console.log("ssss");
				var obj = {
					id: this.param.id,
					guid: this.$utils.guid(),
					type: this.param.type,
					order: this.transferIndex
				}
				this.setItemSite(obj);
				this.orderbyId();
			},
			copyItem(e) {
				var obj = {
					index: this.getDataCur.stream.indexOf(this.transferIndex),
					order: JSON.parse(JSON.stringify(this.transferIndex))
				}
				this.copyModule(obj);
				this.orderbyId();
			},
			sideConNone() {
				this.state.flag = false;
			},
			isFuncur(i, item) {
				i.isEdit = true;
				this.editDial = item;
				this.itemMdata = i;
			},
			setLabelItem(i, item) {
				if(i.labelStyle == 2) {
					for(let k = 0; i.labelTitle.length > k; k++) {
						i.labelTitle[k].cur = false;
					}
					item.cur = true;
					i.curItem = item.curItem;
				}
			},
			setHoverItem(i, item) {
				if(i.labelStyle == 1) {
					for(let k = 0; i.labelTitle.length > k; k++) {
						i.labelTitle[k].cur = false;
					}
					item.cur = true;
					i.curItem = item.curItem;
				}
			},
			getDataFree(v) {
				this.getDataCur.stream[v.el].draging = true;
				this.getDataCur.stream[v.el].conStyle.height = v.height;
			},
			isfontFocus(flag) {
				console.log("flag:" + flag);
				this.fontFocus = flag;
			},
			hoverConect(it) {
				console.log("hoverConect");
				if(it.isStopPropagation) {
					console.log("isStopPropagation");
					return;
				}
				it.isHover = true;
				//var zin = JSON.parse(JSON.stringify(it.zinStyle));
				//it.curIndex = zin.zIndex;
				//it.zinStyle.zIndex = 100;
				console.log(it.curIndex);
			},
			leaveConect(it) {
				console.log("leaveConect");
				//mStopPropagation(flag)
				it.isHover = false;
				//it.zinStyle.zIndex = it.curIndex;
				console.log(it.curIndex);
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
				if(dt.state.curOrder.mClass == "Typesetting") {
					return;
				}
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
				//dt.state.curOrder = null;
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
				var ts = this;
				ts.delItemPos(comp);
				ts.orderbyId();
				ts.isMultiColumn = false;
				setTimeout(function() {
					ts.isMultiColumn = true;
				}, 1);
			},
			inStreamDrop(event, i, it) {
				console.log("拖入" + i.tText);
				event.preventDefault();
				i.isStreamColumn = false;
				var dt = this;
				if(!dt.state.curOrder) return;
				if(JSON.stringify(dt.state.curOrder) === '{}') return;

				var obj = dt.state.curOrder;
				var itemCon = [];
				var stream = this.getDataCur.stream;
				if(dt.state.curOrder.parentStyle && dt.state.curOrder.parentStyle.height > i.conStyle.height) {
					i.conStyle.height = (dt.state.curOrder.parentStyle.height + 20) + "px";
				}
				var item = JSON.parse(JSON.stringify(obj));
				item.order = itemCon.length + 1;
				if(obj.mClass == "Typesetting") {
					if(i.tName == "columnLayout" && obj.tName == "freeContainer") { //通栏						
						i.layoutOuterStyle.width = this.state.width;
						i.conStyle.position = 'relative';
						return;
					}

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
						it.itemInner.push(item);
						this.setCurOrder(null);
						return;
					}
				}
				if(item.tName == "moduleAreaNav") { //栏目导航
					i.zinStyle.zIndex = 900;
				}

				item.column = it || -1;

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
				var item = {};
				var stream = this.getDataCur.stream;
				var zIndexLen = stream.length;

				if(dt.state.curOrder.mClass != "Typesetting") {
					var imHeight = 100;
					if(dt.state.curOrder.parentStyle && dt.state.curOrder.parentStyle.height >= 100) {
						imHeight = dt.state.curOrder.parentStyle.height + 20;
					}
					if(dt.state.curOrder.tName == "moduleAreaNav") { //栏目导航
						console.log("moduleAreaNav");
						zIndexLen = 900;
						//this.onDragConDrop(event);
						//return;
					}
					item = {
						tName: "freeContainer",
						tText: "自由容器",
						isEdit: false,
						mClass: "Typesetting",
						isStreamColumn: false,
						isShowUp: false,
						isShow: true,
						order: stream.length,
						isShowDown: false,
						isHover: false,
						isStopPropagation: false,
						mImage: {
							url: "",
						},
						zinStyle: {
							zIndex: zIndexLen
						},
						conStyle: {
							width: '990px',
							margin: "0 auto",
							height: imHeight + 'px'
						},
						order: 1,
						itemInner: [],
						aloneIcon: "panelModuleIcon_pack moduleArea_pack",
						aloneText: "moduleAloneText",
						cur: true
					}
					item.itemInner.push(dt.state.curOrder);
					//isFuncur(i, item);
					if(dt.state.curOrder.tName == 'mImage') {
						this.isFuncur(dt.state.curOrder, {
							editDialWidth: "950px",
							editDialHeight: "680px",
							setlink: false,
							isEdit: true,
							rTitle: '编辑图片<span style="font-size:12px; color:#666;"> (&nbsp;只能添加jpg,jpeg,gif,png, 免费版大小不超过1MB&nbsp;)</span>'
						});
					}

				} else {
					item = dt.state.curOrder;
					dt.state.curOrder.order = zIndexLen;
					item.zinStyle.zIndex = zIndexLen;
				}

				if(stream.length > 1) {
					stream.forEach(function(v, i) {
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
				this.orderbyId();
				//item.isShowDown = false;
			},
			delModule(item) {
				var obj = {
					id: this.param.id,
					type: this.param.type,
					order: item
				}
				this.delStreamModule(obj);
				this.orderbyId();
			},
			inAddNewOver(event) {
				event.preventDefault();
				//console.log("进入新增容器(移动阶段 )");
			},
			...mapActions([
				"getData", "saveloca"
			]),
			...mapMutations([
				'orderbyId', 'setDelayed', 'delItemPos', 'copyModule', 'delStreamModule', 'setCurOrder', 'setItemSite', "getAllSite", 'pushItemStream', "pushItemPosCom", "pushItemStreamItem", "delItemStream", "change"
			])
		},
		mounted() {
			for(var v in this.getDataCur.stream) {
				var dataCur = this.getDataCur.stream[v];
				if(dataCur.tName == "labelContainer") {
					hoverAction.labelHover("#labelContainerId" + v, dataCur);
				}
			}
		},
		updated() {
			for(var v in this.getDataCur.stream) {
				var dataCur = this.getDataCur.stream[v];
				//console.log(dataCur.tName);
				if(dataCur.tName == "labelContainer") {
					console.log(dataCur.tName);
					hoverAction.labelHover("#labelContainerId" + v, dataCur);
				}
			}
		},
		computed: {
			...mapGetters(["state", "getDataCur", "router"])
		}

	}
</script>

<style lang="scss" scoped>
	.freeContainer,
	.multi_con {
		width: 990px;
		margin: 0 auto;
	}
	
	.container .conect_inner {
		background-color: #fff;
		position: relative;
		z-index: 3;
		margin: 0 auto;
		.columnLayout {
			position: relative;
			.v_con {
				position: absolute;
				display: none;
				background: #fff;
				bottom: -27px;
				border: 1px dashed #444;
			}
			.v_con.block {
				display: block;
			}
		}
	}
	
	.in_outer {
		position: relative;
	}
	
	.pos_con {
		/*position: absolute;
		top: 0;
		z-index: 55;*/
		.inner {
			margin: 0 auto;
		}
	}
	
	.container .warning {
		border: 1px dashed red;
	}
	
	.lbl_con {
		border: 1px dashed #fff;
	}
	
	.lbl_con:hover {
		border-color: #0D83ED;
	}
	
	.in_inner {
		.resizeMe {
			position: relative;
		}
		.v_con {
			position: absolute;
			background: #fff;
			display: none;
			bottom: -27px;
			border: 1px dashed #444;
		}
		.v_con.block {
			display: block;
		}
		.del_icon {
			text-align: left;
		}
		.multi_edit {
			position: absolute;
			top: -40px;
			width: auto;
			height: 40px;
			z-index: 0;
			line-height: 40px;
			display: none;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.15);
			padding: 0 15px;
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
	
	.tabContainer.columnLayout {
		border: none;
	}
	
	.columnLayout {
		.layout_inner {
			border: 1px dashed transparent;
		}
		.layout_inner:hover {
			border: 1px dashed #0D83ED;
		}
		.multi_edit {
			position: absolute;
			top: -40px;
			width: auto;
			height: 40px;
			z-index: 77;
			line-height: 40px;
			display: none;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.15);
			padding: 0 15px;
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
		.multi_edit:hover {
			display: block;
		}
	}
	
	.in_inner:hover,
	.columnLayout:hover {
		border-color: #0D83ED;
		.clm {
			border-color: #0D83ED;
		}
		/*.multi_edit {
			display: block;
		}*/
	}
	
	.in_inner,
	.columnLayout {
		.multi_edit.hover {
			display: block;
		}
	}
	
	.multi_con {
		.clm {
			border: 1px dashed #fff;
			float: left;
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
		.clm2 {
			width: 49.79%;
		}
		.clm3 {
			width: 33.13%;
		}
		.clm4 {
			width: 24.79%;
		}
		.clm5 {
			width: 19.79%;
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
	
	.labelContainer,
	.freeContainer {
		position: relative;
	}
	
	.labelList {
		position: relative;
		cursor: pointer;
		border: 1px solid #fff;
		i {
			position: absolute;
			top: 0px;
			right: 5px;
			width: 25px;
			height: 25px;
			background: url(/static/image/iconIndex2.png) -1028px 218px;
			display: none;
		}
	}
	
	.labelList:hover i {
		display: block;
	}
	
	.container .enter {
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
			width: 205px;
			margin: 0 auto;
			height: 51px;
			background: url(../../../static/image/iconIndex2.png) no-repeat;
			background-position: -400px -503px;
			margin-bottom: 5px;
		}
	}
	
	.dragNew:hover {
		border: 1px dashed #0D83ED;
	}
	
	.dragNew:hover p {
		background-position: -153px -503px;
	}
	
	.columnLayoutInner {
		/*width: 990px;*/
		margin: 0 auto;
	}
	
	.in_inner:hover .activ_con,
	.columnLayout:hover .activ_con {
		display: block;
	}
	
	.activ_con {
		display: none;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 40;
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
		width: 990px;
		margin: 0 auto;
	}
</style>