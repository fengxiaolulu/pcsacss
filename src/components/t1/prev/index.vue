<template>
	<div class="fluid container">
		<!--myHeader></myHeader-->
		<div class="pos_con">
			<div class="inner">
				<template v-for="(i,index) in getDataCur.posCom" class="g-cf">
					<div :itemMdata="i" :posCom="'posCom'" :index="index" :is="i.tName"></div>
				</template>
			</div>
		</div>
		<div :class="['conect_inner',{'warning':isConLeave}]" style="min-height: 500px; border: 1px solid #fff;">
			<div class="con_innd">

				<vue-context-menu :contextMenuData="contextMenuData" @setAllModule="setAllModule()" @copyItem="copyItem()">
				</vue-context-menu>
				<template v-for="(i,tIndex) in state.itemCon[state.delayed].stream" class="g-cf in_outer" :style="i.conStyle">

					<div v-if="i.mClass !='Typesetting'" :itemMdata="i" :posCom="tIndex" :index="tIndex" :is="i.tName" style="position: relative;width: 100%;height: auto;"></div>
					<!--自由容器-->
					<div v-if="i.tName=='freeContainer'&&i.isShow" :class="['in_inner freeContainer',{'enter':i.isStreamColumn}]" :style="[i.zinStyle,i.conStyle]">
						<div :style="i.conStyle">
							<div v-if="ite.isShow" v-for="(ite,index) in i.itemInner" :itemInner="i" :itemMdata="ite" :posCom="'free'+tIndex" :index="index" :is="ite.tName"></div>
						</div>
					</div>
					<!--多列排版-->
					<div v-if="i.tName=='multiColumnContainer'&&i.isShow" :class="['in_inner resizeMe multi_con g-cf', {'enter':i.isStreamColumn}]" :style="i.conStyle">
						<div v-for="it in i.column" :class="['clm',{'enter':i.isStreamColumn},'clm'+i.column]">
							<div class="clm_inner" :style="i.conStyle">
								<div class="area_conn">
									<template v-for="(i,index) in i.itemInner">
										<div v-if="i.column==it" :itemMdata="i" :posCom="'multi'" :index="index" :is="i.tName"></div>
									</template>
								</div>
							</div>
						</div>
					</div>
					<!--标签展示-->
					<div v-if="i.tName=='labelContainer'&&i.isShow" class="columnLayout tabContainer" :style="i.zinStyle" :id="'labelContainerId'+tIndex">
						<div class="in_inner labelContainer" :style="i.ulStyle">

							<div class="g-cf tit_con" :class="[{labelListOne:i.diretionM==1,labelListTwo:i.diretionM==2,righterdUl:i.setulStyle==3&&i.diretionM==2}]" :style="i.layoutOuterStyle">
								<div class="g-cf titlbl" :style="i.marginStyle">
									<ul :class="['g-cf',{centerUl:i.setulStyle==1&&i.diretionM==1,leftUl:i.setulStyle==2&&i.diretionM==1,rightUl:i.setulStyle==3&&i.diretionM==1}]">
										<li v-for="(ite,index) in i.labelTitle" :class="['labelList',{'cur':ite.cur}]" :style="[i.labelTitleStyle,{borderRadius:i.labelTitleStyle.borderRadius+'px',lineHeight:i.labelTitleStyle.height}]">
											<p class="title" :style="{borderRadius:i.labelTitleStyle.borderRadius+'px'}">{{ite.labelTitle}}</p>
											<i @click="deleteLabel(i,ite,index)"></i>
										</li>
									</ul>
								</div>
								<div class="lbl_con">
									<div v-for="(it,index) in i.labelTitle" class="conStyle" :style="it.conStyle" v-show="i.isShow">
										<template v-for="(ilbl,dex) in it.itemInner">
											<div v-if="ilbl.isShow" :itemMdata="ilbl" :itemInner="it.itemInner" :posCom="'labelContainer'+index" :index="dex" :is="ilbl.tName"></div>
										</template>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--通栏排版-->
					<div :style="i.zinStyle" v-if="i.tName=='columnLayout'&&i.isShow" :class="['columnLayout', {'enter':i.isStreamColumn}]">
						<div :style="i.layoutOuterStyle" :class="['columnLayoutInner',{'enter':i.isStreamColumn}]">
							<div :id="tIndex" :style="{height:i.conStyle.height,position:i.conStyle.position,margin:i.conStyle.margin}" class="layout_inner resizeMe">
								<div class="activ_con"><span v-show="i.isShowUp" class="up_icon"></span><span v-show="i.isShowDown" class="down_icon"></span></div>
								<div v-if="irt.isShow" v-for="(irt,index) in i.itemInner" :itemMdata="irt" :itemInner="i" :posCom="'columnLayout'+tIndex" :index="index" :is="irt.tName"></div>
							</div>
						</div>
					</div>

				</template>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	//import VueDraggableResizable from 'vue-draggable-resizable'
	import myHeader from '../header.vue'
	//import myFooter from './footer.vue'
	import mFont from './m/font.vue'
	import mImage from './m/mImage.vue'
	import mButton from './m/mButton.vue'
	import graphic from './m/graphic.vue'
	import columnPicture from './m/columnPicture.vue'
	import multiCarousel from './m/multiCarousel.vue'
	import articleScrap from './m/articleScrap.vue'
	import moduleAreaNav from './m/topGrade/moduleAreaNav.vue'
	import sidebar from './m/topGrade/sidebar.vue'
	import photoMoreCard from './m/topGrade/photoMoreCard.vue'
	import productShow from './m/productShow.vue'
	import productSearch from './m/productSearch.vue'
	import msgSubmit from './m/msgSubmit.vue'
	import siteForm from './m/siteForm.vue'
	import friendLink from './m/friendLink.vue' //友情链接
	import serviceOnline from './m/serviceOnline.vue'
	import areaFile from './m/areaFile.vue'
	import areaMap from './m/areaMap.vue'
	import areaLocation from './m/areaLocation.vue'
	import areaIndexFavorite from './m/areaIndexFavorite.vue'
	import siteQrCode from './m/siteQrCode.vue'
	import areaFlv from './m/areaFlv.vue'
	import productNav from './m/productNav.vue'
	import newlyShop from './m/newlyShop.vue'
	import areaDate from './m/areaDate.vue'
	import areaCode from './m/areaCode.vue'
	import singlePage from './m/singlePage.vue'
	import sitemap from './m/sitemap.vue'
	import memberLogin from './m/memberLogin.vue'

	export default {
		name: 'xIndex',
		components: {
			memberLogin,
			sitemap,
			singlePage,
			moduleAreaNav,
			sidebar,
			photoMoreCard,
			serviceOnline,
			columnPicture,
			multiCarousel,
			mFont,
			myHeader,
			articleScrap,
			graphic,
			mImage,
			mButton,
			productShow,
			productSearch,
			msgSubmit,
			siteForm,
			friendLink,
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
			newlyShop
		},
		props: [],
		updated: function() {
			this.$nextTick(function() {
				console.log("$nextTick")
			})
		},
		data() {
			return {
				isMultiColumn: false,
				isConLeave: false,
				id: this.$route.params.id,
				x: 0,
				y: 'y',
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					column_id: this.$route.query.column_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					version_id: this.$route.query.pc_version_id
				},
				itemMdata: {},
				isAddNew: false,
				contextMenuData: {
					// the contextmenu name(@1.4.1 updated)
					menuName: this.$utils.guid(),
					axios: {
						x: null,
						y: null
					},
					//Menu options (菜单选项)
					menulists: [{
							fnHandler: 'moveDownFloor',
							btnName: '设置为全站模块'
						},
						{
							fnHandler: 'copyItem',
							btnName: '复制模块'
						}
					]
				}
			}
		},
		methods: {
			gotoSaveCom() {

				if(this.$route.name == 't1') {
					this.param.version_id = this.$route.query.pc_version_id;
				} else {
					this.param.version_id = this.$route.query.mobile_version_id;
				}
				var html = $("#app").html();
				this.param.html = html;
				this.saveData(this.param);

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
			getDataFree(v) {
				this.getDataCur.stream[v.el].draging = true;
				this.getDataCur.stream[v.el].conStyle.height = v.height;
			},
			removeComponent(comp) {
				this.delItemStream(comp);
				/*var stream = this.getDataCur.stream;
				for(var j = 0; stream.length > j; j++) {
					var itemInner = stream[j].itemInner;
					if(itemInner && itemInner.length) {
						itemInner.splice(itemInner.indexOf(comp), 1);
					}
				}*/
			},
			...mapMutations(['setDelayed']),
			...mapActions([
				"getData", "saveData"
			])
		},
		mounted() {
			//console.log( this.getDataCur.stream);

			for(var v in this.getDataCur.stream) {
				var dataCur = this.getDataCur.stream[v];
				if(dataCur.tName == "labelContainer") {
					hoverAction.labelHover("#labelContainerId" + v, dataCur);
				}
			}

			//this.gotoSaveCom();

		},
		created() {
			var ts = this;
			ts.getData(ts.param);
			//var temp = this.$route.params.param;
			//this.setDelayed(temp);			
			function unScroll() {
				var top = $(document).scrollTop();
				$(document).on('scroll.unable', function(e) {
					$(document).scrollTop(top);
				})
			}

			function removeUnScroll() {
				$(document).unbind("scroll.unable");
			}

			$("body").bind('keyup', function(event) {
				var itCur = {};
				event.preventDefault();
				for(var v in ts.getDataCur) {
					var dataCur = ts.getDataCur[v];
					console.log(dataCur);
					hoverAction.labelHover(dataCur);
					//hoverAction.labelSelected(dataCur);
					for(let j = 0; j < dataCur.length; j++) {
						var arSpon = dataCur[j];
						console.log(arSpon)

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
				if(event.keyCode == 37) {
					itCur.isShow = false;
					itCur.parentStyle.left -= 2;
					setTimeout(function() {
						itCur.isShow = true;
					}, 1);
				} else if(event.keyCode == 38) {
					itCur.isShow = false;
					itCur.parentStyle.top -= 2;
					setTimeout(function() {
						itCur.isShow = true;
					}, 1);
				} else if(event.keyCode == 39) {
					itCur.isShow = false;
					itCur.parentStyle.left += 2;
					setTimeout(function() {
						itCur.isShow = true;
					}, 1);
				} else if(event.keyCode == 40) {
					itCur.isShow = false;
					itCur.parentStyle.top += 2;
					setTimeout(function() {
						itCur.isShow = true;
					}, 1);
				}
			}).bind("keydown", function() {
				unScroll();
			}).bind("click", function() {
				removeUnScroll();
			});

		},
		computed: {
			...mapGetters(["getDataCur", "state", "router"])
		}
	}
</script>

<style lang="scss" scoped>

</style>