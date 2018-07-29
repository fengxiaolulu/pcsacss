<template>
	<div style="position: relative;">
		<div class="fluid containerp">
			<div class="conect_inner" style="min-height: 500px; border: 1px solid #fff;">
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
				<div class="con_innd">
					<!--导航-->
					<div class="navheader" :itemMdata="phoneNav" :style="phoneNav.navheader">
						<p id="back" class="back" :style="phoneNav.backStyle">
							</p>
								<p class="logo" :style="phoneNav.logoStyle">
									<span v-if="phoneNav.namenumber==1">{{phoneNav.mainText.web_name}}</span>
									<img :style="phoneNav.navheaderImg" v-if="phoneNav.namenumber==2" :src="phoneNav.mainText.web_logo" />
								</p>
								<p class="navClick" :style="phoneNav.iconStyle"><img :src="phoneNav.mainText.web_icon" /></p>
					</div>
					<div v-for="(i,tIndex) in getDataCur.stream" class="g-cf in_outer">
						<!--满屏容器-->
						<div v-if="i.tName=='fullScreen'" :class="['in_inner fullScreen',{'enter':i.isStreamColumn}]">
							<div :id="tIndex" class="resizeMe" :style="i.conStyle">
								<div v-if="ite.isShow" v-for="(ite,index) in i.itemInner" :itemInner="i.itemInner" :itemMdata="ite" :posCom="'free'+tIndex" :index="index" :is="ite.tName" class="outmodule"></div>
							</div>
						</div>
						<!--自由容器-->
						<div v-if="i.tName=='freeContainer'" :class="['in_inner freeContainer',{'enter':i.isStreamColumn}]">
							<div class="resizeMe" :style="i.conStyle">
								<div v-if="ite.isShow" v-for="(ite,index) in i.itemInner" :itemInner="i" :itemMdata="ite" :posCom="'free'+tIndex" :index="index" :is="ite.tName"></div>
								<!--uiDialog v-if="i.isEdit" :itemMdata='i' :editDial='{rTitle:"设置自由容器"}'></uiDialog-->
							</div>
						</div>
						<!--多列排版-->
						<div v-if="i.tName=='multiColumnContainer'" :class="['in_inner resizeMe multi_con g-cf clmAll', {'enter':i.isStreamColumn}]" :style="i.conStyle">
							<div v-for="it in 2" :class="['clm',{'enter':i.isStreamColumn},'clm'+i.column]">
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
						<div v-if="i.tName=='labelContainer'" :class="['in_inner labelContainer',{'enter':i.isStreamColumn}]" :id="'labelContainer'+tIndex">
							<div v-if="i.tName=='labelContainer'" class="tit_con">
								<ul id="labelTitle" class="labelTitleAll" :style="i.labelUlStyle">
									<li v-for="(ite,index) in i.labelTitle" class="labelList" :style="[i.labelTitleBasis,i.labelTitleStyle]">
										<p class="title">{{ite.labelTitle}}</p>
									</li>
								</ul>
								<div :id="tIndex" class="ateralLabelAll resizeMe" :style="i.conStyle">
									<div v-for="(it,index2) in i.labelTitle" style="height: 100%;" class="ateralLabel" :id="'ateralLabel'+ index2">
										<template v-for="(i,index) in it.itemInner">
											<div :itemMdata="i" :posCom="'labelContainer'+index" :index="index" :is="i.tName"></div>
										</template>
									</div>
								</div>
							</div>
						</div>

						<!--通栏排版-->
						<div :style="i.layoutStyle" v-if="i.tName=='columnLayout'" :class="['in_inner columnLayout', {'enter':i.isStreamColumn}]">
							<div :style="i.layoutOuterStyle" :class="['in_inner resizeMe columnLayoutInner',{'enter':i.isStreamColumn}]">
								<div :style="i.conStyle" class="layout_inner">
									<div v-for="(i,index) in i.itemInner" :itemMdata="i" :posCom="'free'" :index="index" :is="i.tName"></div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			<!--div class="pos_con">
			<div v-for="(i,index) in state.itemCon[state.delayed].posCom" class="g-cf in_outer">
				<div :itemMdata="i" :posCom="'posCom'" :index="index" :is="i.tName"></div>
			</div>
		</div-->
		</div>
		<div class="erweimaPhone">
			<p class="p1">{{address}}</p>
			<img :src="'http://qr.liantu.com/api.php?text=' + address" />
			<p class="p2">扫一扫，在手机查看网站</p>
		</div>
	</div>

</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	//import dat from '../../../../static/js/sideData.js'
	//import VueDraggableResizable from 'vue-draggable-resizable'
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
	import areaDate from './m/areaDate.vue'
	import areaCode from './m/areaCode.vue'
	import memberLogin from './m/memberLogin.vue'
	import productDes from './m/productDes.vue'
	import mNewDes from './m/mNewDes.vue'
	import api from '@/api/$ajax.js'
	export default {
		name: 'xIndex2',
		components: {
			memberLogin,
			moduleAreaNav,
			photoMoreCard,
			serviceOnline,
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
		props: [],
		updated: function() {
			this.$nextTick(function() {
				console.log("$nextTick")
			})
		},
		created() {
			var ts = this;
			api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id, false, {}, function(r) {
				if(r.code == 422) {
					return;
				}
				ts.router.navItem = r.data.list;
				if(ts.param.param == "index") {
					ts.param.column_id = r.data.list[0].id;
				}
				ts.getData(ts.param);
			});

			var temp = this.$route.params.param;
			this.setDelayed(temp);
			this.getWebInfo();
			this.getAddress();
		},
		mounted() {
			var stream = this.getDataCur.stream;
			for(let j = 0; stream.length > j; j++) {
				if(stream[j].tName == 'labelContainer') {
					var ts = this;
					this.labelContainer = stream[j];
					this.labelContainerId = "labelContainer" + j;
					xIndex2.label(ts.labelContainerId, ts.labelContainer);

					for(var b = 0; stream[j].labelTitle.length > b; b++) {
						var itemInner2 = stream[j].labelTitle[b].itemInner;
						for(var a = 0; itemInner2.length > a; a++) {
							var mleft2 = itemInner2[a].parentStyle.left;
							var mwidth2 = itemInner2[a].parentStyle.width;
							var minwidth2 = 332; //$(window).width()
							var changeLeft2 = Math.round(mleft2 / minwidth2 * 10000) / 100.00 + "%";
							var changeWidth2 = Math.round(mwidth2 / minwidth2 * 10000) / 100.00 + "%";
							//console.log(changeLeft2);
							$("#labelContainer" + j).find(".ateralLabel").eq(b).find(".hove_con").eq(a).css("left", changeLeft2);
							$("#labelContainer" + j).find(".ateralLabel").eq(b).find(".hove_con").eq(a).css("width", changeWidth2);
						}
					}

				}

				if(stream[j].tName == 'freeContainer') {
					var itemInner = stream[j].itemInner;
					var outheight = stream[j].conStyle.height;
					for(var i = 0; itemInner.length > i; i++) {
						var mwidth = itemInner[i].parentStyle.width;
						var mleft = itemInner[i].parentStyle.left;
						var minwidth = 332; //$(window).width()
						var changeLeft = Math.round(mleft / minwidth * 10000) / 100.00 + "%";
						var changeWidth = Math.round(mwidth / minwidth * 10000) / 100.00 + "%";
						//console.log(i + "," + changeLeft);
						$(".in_outer").eq(j).find(".hove_con").eq(i).css("left", changeLeft);
						$(".in_outer").eq(j).find(".hove_con").eq(i).css("width", changeWidth);

						/*测量高度*/
						var imgheight = parseInt($(".graphicP .txtCenter").find("img").css("height"));
						var divheight = parseInt($(".graphicP").css("height"));
						$(".graphicP").css("height", imgheight);
						if(i == itemInner.length - 1) {
							console.log(itemInner[i].tName);
							if(itemInner[i].tName == 'graphic') {
								var lasttop = itemInner[i].parentStyle.top;
								var allheight = divheight + lasttop + 15;
								console.log(allheight);
								$(".in_outer").eq(j).find(".in_inner .resizeMe").css("height", allheight);
							}
						}
					};
				}
			};

			xIndex2.back();
			//设置延迟让网页加载完毕才能获取对应的dom元素
			//			setTimeout(function(){
			//				xIndex2.label(ts.labelContainerId, ts.labelContainer);
			//			},100);		

		},
		data() {
			return {
				isMultiColumn: false,
				isConLeave: false,
				id: this.$route.params.id,
				preview: '/t2/prev/' + this.$route.params.id + "/",
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
				itemMdata: {},
				editDial: {
					isEdit: false,
					rTitle: "设置自由容器",
				},
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
				},
				isAddNew: false,
				token: this.$route.query.token,
				labelContainer: '',
				labelContainerId: "labelContainer" + this.tIndex,
				address: ''

				//				mItem: dat.map((obj, index) => {
				//					obj.order = index + 1;
				//					var mtIteml = obj.mtIteml;
				//					if(mtIteml && mtIteml.length) {
				//						for(var i = 0; mtIteml.length > i; i++) {
				//							var itemArr = mtIteml[i].itemArr;
				//							if(itemArr && itemArr.length) {
				//								for(var j = 0; itemArr.length > j; j++) {
				//									if(itemArr[j].tName == 'labelContainer') {
				//										var labelContainer = itemArr[j];
				//									}
				//								}
				//							}
				//						}
				//					}
				//					return labelContainer;
				//				})
			}
		},
		methods: {
			getAddress() {
				var ts = this;
				api.get('/api/diy/getDomain?token=' + this.token, true, {}, function(data) {
					ts.address = data.data.domain_m;
					console.log(ts.address)
				});
			},
			getWebInfo() {
				var ts = this;
				api.get('/api/data/getWebInfo?token=' + this.token, true, {}, function(data) {
					console.log(data)
					ts.phoneNav.mainText = data.data;
				});
			},
			//			goDesign(item) {
			//				var link = item.link;
			//				console.log(link)
			//				if(link) {
			//					if(Number(link)) {
			//						//location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&version_id=' + this.param.version_id + '&column_id=' + item.link;
			//						window.open(this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type  + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id);
			//					} else if(link.indexOf("http") != -1) {
			//						window.open(link)
			//					} else {						
			//						window.open(this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type  + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id)
			//					}
			//				}
			//			},
			goDesign(item) {
				var link = item.id;
				if(link) {
					if(Number(link)) {
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
						console.log(item.id);
					} else if(link.indexOf("http") != -1) {
						location.href = link;
					} else {
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
					}
				}
			},
			...mapActions([
				"getData", "saveloca"
			]),
			...mapMutations([
				'orderbyId', 'setDelayed', 'setCurOrder', 'pushItemStream', "pushItemPosCom", "pushItemStreamItem", "delItemStream", "change", "setPosSite"
			])
		},
		computed: {
			...mapGetters(["state", "getDataCur", "router", "phoneNav", "itemCon"])
		},
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
		background: url(../../../../static/image/phonebg.png)no-repeat center;
	}
	
	.containerp .conect_inner {
		width: 332px;
		overflow-x: hidden;
		overflow-y: auto;
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
			display: block;
			float: left;
			text-align: center;
			z-index: 100;
			width: auto;
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
		}
	}
	
	.ateralLabel {
		display: none;
		position: absolute;
		width: 100%;
		left: 0;
		right: 0;
		z-index: 999;
		background: #FFFFFF;
	}
	
	.ateralLabelAll .ateralLabel:nth-child(1) {
		display: block;
	}
	
	.cur .title {
		background: red !important;
		color: #FFFFFF !important;
	}
	
	.ateralShow {
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
	/*//@import "../../../../static/css/pcwebout.css";
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
	}*/
</style>