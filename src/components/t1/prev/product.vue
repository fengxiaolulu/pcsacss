<template>
	<div class="fluid container">
		<div class="conect_inner" style="min-height: 500px; border: 1px solid #fff;">
			<div class="pos_con">
				<div v-for="(i,index) in state.itemCon[state.delayed].posCom" class="g-cf in_outer">
					<div :itemMdata="i" :posCom="'posCom'" :index="index" :is="i.tName"></div>
				</div>
			</div>
			<div class="con_innd">
				<vue-context-menu :contextMenuData="contextMenuData" @setAllModule="setAllModule()" @managementGlobalModule="managementGlobalModule()" @customModule="customModule()" @copyItem="copyItem()">
				</vue-context-menu>
				<template v-for="(i,tIndex) in getDataCur.stream" class="g-cf in_outer" :style="i.conStyle">

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
				<!--添加新容器-->
				<div :class="{'enter':isAddNew}" @dragenter="onAddNewEnter($event)" @drop.stop='inAddNewDrop($event)' @dragover='inAddNewOver($event)' class="g-cf addMern">
					<div class="dragNew" @click="sideConNone()">
						<p></p>
						<span>可以拖模块进来</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
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
	import productDes from './m/productDes.vue'
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

	export default {
		name: 'xIndex',
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
			productDes,
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
					token: this.$route.query.token,
					column_id: this.$route.query.column_id,
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
				"getData"
			])
		},
		created() {
			var ts = this;
			ts.getData(ts.param);

			var temp = this.$route.params.param;
			this.setDelayed(temp);
			var stream = ts.getDataCur.stream;
		},
		computed: {
			...mapGetters(["getDataCur", "state", "router"])
		}
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