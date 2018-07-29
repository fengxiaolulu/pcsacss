<template>
	<div class="fluid container">
		<div class="conect_inner" style="min-height: 500px; border: 1px solid #fff;">
			<div class="pos_con">
			<div v-for="(i,index) in state.itemCon[state.delayed].posCom" class="g-cf in_outer">
				<div :itemMdata="i" :posCom="'posCom'" :index="index" :is="i.tName"></div>
			</div>
		</div>
			<div class="con_innd">
				<template v-for="(i,tIndex) in state.itemCon[state.delayed].stream" class="g-cf in_outer">

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
					<div class="columnLayout tabContainer">
						<div v-if="i.tName=='labelContainer'&&i.isShow" :class="['in_inner labelContainer resizeMe',{'enter':i.isStreamColumn}]" @dragover="onStreamOver($event,i)" @dragenter="onStreamEnter($event,i)" @drop.stop='inStreamDrop($event,i,it)' @dragleave="onStreamLeave($event,i)" :style="[i.zinStyle,{margin:'0 auto'}]">
							<div class="activ_con"><span @click="setUpDown(i,-1)" v-show="i.isShowUp" class="up_icon"></span><span @click="setUpDown(i,1)" v-show="i.isShowDown" class="down_icon"></span></div>
							<div v-if="i.tName=='labelContainer'" class="tit_con">
								<ul :class="['g-cf',{centerUl:i.setulStyle==1,leftUl:i.setulStyle==2,rightUl:i.setulStyle==3}]" id="labelTitle" :style="i.ulStyle">
									<li v-for="(ite,index) in i.labelTitle" :class="['labelList',{'cur':ite.cur}]" :style="i.labelTitleStyle" v-if="i.diretionM==1">
										<p @click="setLabelItem(i,ite)" @mouseenter="enterStyle(i,ite,index,$event)" @mouseleave="leaveStyle(i,ite,index,$event)" class="title" :style="[ite.cur==true?i.labelTitleStyleHover:i.labelTitleStyle,{lineHeight:i.labelTitleStyle.height},i.marginStyle]">{{ite.labelTitle}}</p>
									</li>
									<li v-for="(ite,index) in i.labelTitle" :class="['labelListTwo',{'cur':ite.cur}]" :style="i.labelTitleStyle" v-if="i.diretionM==2">
										<p @click="setLabelItem(i,ite)" @mouseenter="enterStyle(i,ite,index,$event)" @mouseleave="leaveStyle(i,ite,index,$event)" class="title" :style="[ite.cur==true?i.labelTitleStyleHover:i.labelTitleStyle,{lineHeight:i.labelTitleStyle.height},i.marginStyle]">{{ite.labelTitle}}</p>
									</li>
								</ul>
								<div v-dragresize="getDataFree" :id="tIndex" v-for="(it,index) in i.labelTitle" v-if="i.isShow&&it.curItem == i.curItem" :style="i.conStyle" :class="['resizeMe',{'enter':i.isStreamColumn}]" @dragover="onStreamOver($event,i,it)" @dragenter="onStreamEnter($event,i,it)" @drop.stop="inStreamDrop($event,i,it)" @dragleave="onStreamLeave($event,i,it)">
									<div class="ateralLabel" :style="i.conStyle">
										<template v-for="(ilbl,index) in it.itemInner">
											<div v-if="ilbl.isShow" :itemMdata="ilbl" :posCom="'labelContainer'+index" :index="index" :is="ilbl.tName"></div>
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

					<!--新闻排版-->
					<!--div v-if="i.tName=='newsCondi'" :id="tIndex" :style="i.conStyle" class="in_inner mNewDes resizeMe" style="position: relative;">
						<div class="et_side g-fl" :style="{height:i.conStyle.height,width:i.et_sideW}" @dragover="onStreamOver($event,i)" @dragenter="onStreamEnter($event,i)" @drop.stop="inStreamDrop($event,i)" @dragleave="onStreamLeave($event,i)">
							<template v-for="(ipo,index) in i.itemInner1">
								<div v-if="ipo.isShow" :itemMdata="ipo" :posCom="'newsCondi'+index" :index="index" :is="ipo.tName"></div>
							</template>
						</div>

						<div class="et_con g-fl" :style="{height:i.conStyle.height,width:i.et_con}" @dragover="onStreamOver($event,i)" @dragenter="onStreamEnter($event,i)" @drop.stop="inStreamDrop($event,i)" @dragleave="onStreamLeave($event,i)">
							<template v-for="(ipo,index) in i.itemInner2">
								<div v-if="ipo.isShow" :itemMdata="ipo" :posCom="'newsCondi'+index" :index="index" :is="ipo.tName"></div>
							</template>
						</div>
					</div-->

				</template>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	//import myHeader from './header.vue'
	//import myFooter from './footer.vue'
	import mFont from './m/font.vue'
	import mImage from './m/mImage.vue'
	import mButton from './m/mButton.vue'
	import graphic from './m/graphic.vue'
	import columnPicture from './m/columnPicture.vue'
	import multiCarousel from './m/multiCarousel.vue'
	import articleScrap from './m/articleScrap.vue'
	import moduleAreaNav from './m/topGrade/moduleAreaNav.vue'
	import photoMoreCard from './m/topGrade/photoMoreCard.vue'
	import productShow from './m/productShow.vue'
	import productSearch from './m/productSearch.vue'
	import mNewsNav from './m/mNewsNav.vue'
	import mNewDes from './m/mNewDes.vue'

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
	import memberLogin from './m/memberLogin.vue'
	import api from '@/api/$ajax.js'
	export default {
		name: 'newDes',
		components: {
			//myHeader,
			//	myFooter,
			memberLogin,
			//uiDialog,
			moduleAreaNav,
			photoMoreCard,
			serviceOnline,
			//VueDraggableResizable,
			columnPicture,
			mNewsNav,
			mNewDes,
			multiCarousel,
			mFont,
			//productDes,
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
			newlyShop
		},
		props: [],
		data() {
			return {
				isMultiColumn: false,
				isConLeave: false,
				id: this.$route.params.id,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					column_id: this.$route.query.column_id,
					type: this.$route.query.type,
					version_id: this.$route.query.pc_version_id
				},
				newsCondi: {
					tName: "newsCondi",
					isEdit: false,
					isShow: true,
					draging: false,
					isShowUp: false,
					isShowDown: false,
					mClass: "Typesetting",
					mImage: {
						url: "",
					},
					et_sideW: "300px",
					et_con: "690px",
					zinStyle: {
						zIndex: 0
					},
					conStyle: {
						paddingTop: '0',
						paddingLeft: '0',
						paddingRight: '0',
						paddingBottom: '0',
						borderWidth: "0",
						height: "1220px",
						width: '990px'
					},
					itemInner1: [{
						tName: "mNewsNav",
						tText: "新闻导航",
						isEdit: true,
						isShow: true,
						parent: true,
						mClass: "foundation",
						showBorder: 1,
						showBold: 2,
						tAlign: 2,
						showTypeBN: 2,
						showTypetAlign: 2,
						showTypeBold: 2,
						parentStyle: {
							left: 0,
							top: 0,
							width: 500,
							height: 300
						},
						titleStyle: {
							fontSize: '',
							fontWeight: 'normal',
							textAlign: 'left',
							color: '',
							borderBottom: 'none',
							borderTop: 'none',
							borderLeft: 'none',
							borderRight: 'none',
							borderWidth: '',
							borerColor: '',
							borderBottomStyle: ''
						},
						typeStyle: {
							fontSize: '',
							fontWeight: 'normal',
							textAlign: 'left',
							color: '',
							borderBottom: 'none',
							borderTop: 'none',
							borderLeft: 'none',
							borderRight: 'none',
							borderWidth: '',
							borerColor: '',
							borderBottomStyle: ''
						},
						productNavLayout: 0,
						margin_hid: false,
						aloneIcon: "panelModuleIcon_productNav moduleArea_productNav",
						aloneText: "moduleAloneText",
						navName: "新闻列表",
						routerProductNav: {
							navItem: [{
									tName: "oneType",
									tText: "分类1",
									isEdit: false,
									isDel: true,
									link: "oneType",
									secondNav: [{
										tName: "count2",
										tText: "分类1-1",
										isEdit: false,
										thirdNav: [],
										isDel: true,
										link: "count1",
									}, {
										tName: "count3",
										tText: "分类1-2",
										thirdNav: [{
											tName: "count3",
											tText: "分类1-2-1",
											isEdit: false,
											isDel: true,
											link: "count3"
										}, {
											tName: "count3",
											tText: "分类1-2-2",
											isEdit: false,
											isDel: true,
											link: "count3"
										}, {
											tName: "count3",
											tText: "分类1-2-3",
											isEdit: false,
											isDel: true,
											link: "count3"
										}],
										isEdit: false,
										isDel: true,
										link: "conut3",
									}, {
										tName: "count1",
										tText: "分类1-3",
										isEdit: false,
										thirdNav: [],
										isDel: true,
										link: "count1",
									}]
								},
								{
									tName: "twoType",
									tText: "分类2",
									isEdit: false,
									secondNav: [{
										tName: "count",
										tText: "分类2-1",
										isEdit: false,
										isDel: true,
										link: "count"
									}, {
										tName: "count1",
										tText: "分类2-2",
										isEdit: false,
										isDel: true,
										link: "count1"
									}],
									isDel: true,
									link: "about",
								}
							],
							productNavList: [{
									title: '产品1',
									typeP: '指定产品',
									productName: '产品1',
									secondNavList: []
								},
								{
									title: '产品2',
									typeP: '指定产品',
									productName: '产品1',
									secondNavList: []

								}
							]
						}
					}],
					itemInner2: [{
						tName: "mNewDes",
						tText: "新闻详情",
						isEdit: true,
						isShow: true,
						mClass: "base",
						parent: true,
						newDesEditeImg: ['/static/image/style01.jpg', '/static/image/style02.jpg', '/static/image/newDes1.jpg', '/static/image/newDes2.jpg'],
						parentStyle: {
							left: 0,
							top: 0,
							zIndex: 0,
							width: 500,
							height: 300
						},
						hColor: {
							color: ""
						},
						pageEle: [{
								name: "日期",
								show: false,
								value: ""
							},
							{
								name: "作者",
								show: false,
								value: ""
							},
							{
								name: "分类",
								show: false,
								value: ""
							},
							{
								name: "来源",
								show: false,
								value: ""
							},
							{
								name: "网址",
								show: false,
								value: ""
							},
							{
								name: "上/下一篇",
								show: false,
								value: ""
							},
							{
								name: "二维码",
								show: false,
								value: ""
							}
						],
						newsImg: [],
						article: "",
						modelStyle: 0,
						isNewDes: true,
						iStyle: {
							fontFamily: '微软雅黑',
							fontSize: '14px',
							color: '',
							fontWeight: '',
							textDecoration: '',
							textAlign: '',
						},
						pageEleSIds: [],
						pageEleSId: '',
						idNewDes: '',
						oneId: '',
						twoId: '',
						threeId: '',
						fourId: '',
						fiveId: '',
						sixId: '',
						sevenId: '',
						eightId: '',
						checkList: [],
						shareId: '1',
						newDesInfo: {},
						newDesInfoList: [],
						productNavLayout: 0,
						defaultMsg: '编辑新闻内容',
						margin_hid: false,
						onenumber: 1,
						bold: 2,
						titlenumber: 1,
						th: {
							url: "",
							text: "",
							link: "",
							describe: ""
						},
					}]
				},
				editDial: {
					isEdit: false,
					rTitle: "设置自由容器",
				}
			}
		},
		created() {
			var ts = this;
			ts.getData(ts.param);
			
			var temp = this.$route.params.param;
			this.setDelayed(temp);
			var stream = ts.getDataCur.stream;
			/*var fly = true;
			for(let i = 0; stream.length > i; i++) {
				if(stream[i].tName == "newsCondi") {
					fly = false;
				}
			}

			if(fly) {
				stream.push(this.newsCondi);
			}*/
		},
		computed: {
			...mapGetters(["getDataCur", "state"])
		},
		methods: {
			...mapMutations(['setDelayed']),
			...mapActions([
				"getData"
			])
		},

	}
</script>

<style lang="scss" scoped>
	.container .conect_inner {
		width: 990px;
		background-color: #fff;
		position: relative;
		margin: 0 auto;
		.columnLayout {
			position: relative;
			margin-left: -45%;
			margin-right: -45%;
		}
	}
	
	.in_outer {
		position: relative;
	}
	
	.container .warning {
		border: 1px dashed red;
	}
	
	.in_inner {
		border: 1px dashed #fff;
		position: relative;
		.del_icon {
			text-align: left;
		}
		.multi_edit {
			position: absolute;
			top: -40px;
			width: 450px;
			height: 40px;
			line-height: 40px;
			display: none;
			span {
				cursor: pointer;
				margin-right: 10px;
			}
		}
	}
	
	.in_inner:hover {
		border-color: #ccc;
		.multi_edit {
			display: block;
		}
	}
	
	.multi_con {
		.clm {
			border: 1px dashed #fff;
			float: left;
			position: relative;
		}
		.clm2 {
			width: 50%;
		}
		.clm3 {
			width: 33.13%;
		}
		.clm4 {
			width: 25%;
		}
		.clm5 {
			width: 20%;
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
	
	.container .enter {
		border: #5874d8 1px dashed;
	}
	
	.addMern {
		width: 990px;
		margin: 0 auto;
		.dragNew {
			min-height: 100px;
			padding-top: 35px;
			text-align: center;
			background-color: rgba(204, 204, 204, 0.36);
			p {
				text-align: center;
				cursor: pointer;
				width: 150px;
				margin: 0 auto;
				line-height: 30px;
				height: 30px;
				background-color: #ccc;
				border: 1px solid #666;
				border-radius: 4px;
			}
		}
	}
</style>