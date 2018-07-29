<template>
	<div id="dialog" @mousedown="stopDownDarg($event)" class="side_inner">
		<div id="funPanelArea" class="fk-funPanelArea" style="position: absolute;">
			<div class="fk-funPanelEntry">
				<div v-drags v-show="state.flag" style="cursor: move;" @click="downDarg($event)" class="entryBtnsList">
					<div class="funPanelEntryOverLay"></div>
					<div v-for="(i,index) in mItem" @click="onItem(index)" :class="['funPanelEntryBtn',i.mTname]">
						<div :class="['funPanelEntryBtnIcon',i.isyt]"></div>
						<span class="funPanelEntryBtnText">{{i.mText}}</span>
					</div>
					<!--div class="funPanelEntryBtn funPanelEntryBtn_skin">
							<div class="funPanelEntryBtnIcon funPanelEntryBtnIcon_skin"></div><span class="funPanelEntryBtnText">样式</span></div>
							<div class="funPanelEntryBtn funPanelEntryBtn_setup">
							<div class="funPanelEntryBtnIcon funPanelEntryBtnIcon_setup"></div><span class="funPanelEntryBtnText">设置</span></div>
							<div class="funPanelEntryBtn funPanelEntryBtn_opt">
									<div class="funPanelEntryBtnIcon funPanelEntryBtnIcon_opt"></div>
									<span class="funPanelEntryBtnText">百度优化</span>
							</div-->
				</div>
			</div>
			<div id="fk-funPanel" class="fk-funPanel" v-show="!state.flag">
				<div class="funOuterPanel" v-show="disDiv==0">
					<div v-drags style="cursor: move;" @mousedown="downDarg($event)" class="funMainNav">
						<div class="settingBtns">
							<div @click="allSettingBtns" class="currentSetting currentSetting_module"></div>
							<div :class="['allSettingBtns',{'allSettingBtns_on':isAll}]">
								<div v-for="i in mItem" @click="allSettingBtns" :class="['multiSwitchBtn', i.stylcss]"></div>
								<div @click="allSettingBtns" :class="['multiSwitchBtn','multiSwitchBtn_module']"></div>
								<div class="multiSwitchBtn multiSwitchBtn_skin"></div>
								<div class="multiSwitchBtn multiSwitchBtn_setup"></div>
								<div class="multiSwitchBtn multiSwitchBtn_opt"></div>
							</div>
						</div>
						<div class="curMainSetingNav">
							<div class="mainSettingTab">新增模块</div>
							<div class="mainSettingTab">素材工厂</div>
							<div class="mainSettingTab">栏目模块</div>
							<div class="triangleActive"></div>
						</div>
						<div class="closeFunPanel" @click="closeFunPane"><i class="closeFunPanelIcon"></i></div>
					</div>
					<div class="funSettingContent">
						<div class="panelInnerContent panelContentScroll panelSLevelContainer panelInnerContent_addModule mCustomScrollbar _mCS_10" funpaneldef="funPanelDef">
							<div id="mCSB_10" class="mCustomScrollBox mCS-fk-gray mCSB_vertical mCSB_outside">
								<div id="mCSB_10_container" v-iscroll class="mCSB_container">
									<div class="addModulePanelContent">
										<div class="addModuleSeachTool">
											<div class="searchAddModuleToolBtn"></div>
										</div>
										<div v-for="it in mItem[0].mtIteml" class="moduleFieldset" v-if="it.itemArr.length">
											<div class="moduleLegend moduleLegend_on"><span class="mLegendText">{{it.tName}}</span></div>
											<div class="moduleViewList moduleViewList_on">
												<div v-for="it2 in it.itemArr" v-if="it2.isShow" draggable="true" @dragstart='drag($event,it2)' :class="['moduleAloneArea', it2.aloneIcon]">
													<div v-if="it2.isDel" @click="devYun(it.itemArr,it2)" class="cons_del">X</div>
													<div class="moduleAloneIcon"></div>
													<div class="moduleAloneText">{{it2.tText}}</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!--div id="mCSB_10_scrollbar_vertical" class="mCSB_scrollTools mCSB_10_scrollbar mCS-fk-gray mCSB_scrollTools_vertical">
											<div class="mCSB_draggerContainer">
												<div id="mCSB_10_dragger_vertical" class="mCSB_dragger">
													<div class="mCSB_dragger_bar"></div>
												</div>
												<div class="mCSB_draggerRail"></div>
											</div>
							</div-->
						</div>
					</div>
					<!--div id="funPanelOverLay" class="funPanelOverLay"></div>
					<!--input type="input" id="funPanelFocusInput" class="funPanelFocusInput">
					<div class="ui-resizable-handle funPanelResizeHandle"></div>
					<div class="ui-resizable-handle funPanelResizeHandle"></div-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import dat from '../../static/js/sideData.js'
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import VIscroll from 'viscroll';
	Vue.use(VIscroll, {
		mouseWheel: true,
		click: false,
		preventDefault: true,
		tap: true,
		bounce: false,
		scrollbars: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		disableTouch: true,
		disablePointer: true,
		disableMouse: true,
	});

	function g(id) {
		return document.getElementById(id)
	};

	//禁止选中对话框内容
	if(document.attachEvent) { //ie的事件监听，拖拽div时禁止选中内容，firefox与chrome已在css中设置过-moz-user-select: none; -webkit-user-select: none;
		g('mtDialog').attachEvent('onselectstart', function() {
			return false;
		});
	}

	function autoCenter(el) {
		if(!el) {
			return;
		}
		//获取可见窗口大小
		var bodyW = document.documentElement.clientWidth;
		var bodyH = document.documentElement.clientHeight;
		//获取对话框宽、高		
		var elW = el.offsetWidth;
		var elH = el.offsetHeight || el.clientHeight;
		//debugger
		el.style.left = (bodyW - elW) / 2 + 'px';
		el.style.top = (bodyH - elH) / 2 + 'px';
	};
	var dx = 0,
		dy = 0,
		pageW,
		pageH,
		dialogW,
		isDraging,
		dialogH;
	var mx = 0,
		my = 0; //鼠标x、y轴坐标（相对于left，top）
	export default {
		name: 'footerNav',
		components: {},
		data() {
			return {
				msg: '左边侧栏导航',
				disDiv: 0,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					column_id: this.$route.query.column_id,
					type: this.$route.query.type,
					version_id: this.$route.query.pc_version_id
				},
				mItem: dat.map((obj, index) => {
					obj.order = index + 1;
					var mtIteml = obj.mtIteml;
					if(mtIteml && mtIteml.length) {
						for(var i = 0; mtIteml.length > i; i++) {
							var itemArr = mtIteml[i].itemArr;
							if(itemArr && itemArr.length) {
								for(var j = 0; itemArr.length > j; j++) {
									if(this.$route.path.indexOf("/t2/") != -1) {
										if(itemArr[j].tName == 'columnLayout' || itemArr[j].tName == 'moduleAreaNav' || itemArr[j].tName == 'photoMoreCard' || itemArr[j].tName == 'productNav' || itemArr[j].tName == 'friendLink' || itemArr[j].tName == 'areaDate' || itemArr[j].tName == 'areaIndexFavorite') {
											itemArr[j].isShow = false;
										}
									}
									if(itemArr[j].tName == 'fullScreen') {
										itemArr[j].isShow = false;
									}
								}
							}
						}
					}
					return obj;
				}),
				isAll: false,
			}
		},
		created() {
			var AllSite = JSON.parse(localStorage.getItem(this.param.id + this.param.type + "customModule"));
			//console.log(AllSite);			
			if(AllSite && AllSite.length) {
				for(let i = 0; this.mItem[0].mtIteml.length > i; i++) {
					if(this.mItem[0].mtIteml[i].classify == "customModule") {
						for(var j = 0; AllSite.length > j; j++) {
							AllSite[j].tText = "自定义" + j;
							AllSite[j].isDel = true;
							//debugger;
							this.mItem[0].mtIteml[i].itemArr.push(AllSite[j]);
						}
					}
				}
			}
		},
		props: [''],
		computed: {
			...mapGetters(["state", "getAllSite"])
		},
		mounted: function() {
			//autoCenter(g('mtDialog'));
		},
		methods: {
			onDrag(x, y) {
				this.x = x
				this.y = y
			},
			stopDownDarg(e) {
				e.stopPropagation();
			},
			devYun(arr, it) {
				var j = arr.indexOf(it);
				arr.splice(j, 1);

				if(arr.length) {
					localStorage.setItem(this.param.id + this.param.type + "customModule", JSON.stringify(arr));
				} else {
					localStorage.removeItem(this.param.id + this.param.type + "customModule", JSON.stringify(arr));
				}
			},
			allSettingBtns() {
				this.isAll = !this.isAll;
			},
			drag: function(event, i) {
				//document.getelementbyid("funPanelEntry").onmousemove = null;
				//document.onmousemove = null;
				console.log("开始拖动");
				this.dom = event.currentTarget;
				event.dataTransfer.effectAllowed = "move";
				event.dataTransfer.setData("text", event.target.outerHTML);
				event.dataTransfer.setDragImage(event.target, 0, 0);
				//console.log(i);
				//this.state.curOrder = i;	
				this.setCurOrder(i);
				//console.log(this.state.curOrder );
			},
			downDarg(e) {
				e.stopPropagation();
				pageW = document.documentElement.clientWidth;
				pageH = document.documentElement.clientHeight;
				dialogW = g('dialog').offsetWidth;
				dialogH = g('dialog').offsetHeight;

				mx = e.pageX; //点击时鼠标X坐标
				my = e.pageY; //点击时鼠标Y坐标
				dx = g('dialog').offsetLeft;
				dy = g('dialog').offsetTop;
				isDraging = true; //标记对话框可拖动
			},
			onItem(i) {
				this.state.flag = false;
			},
			closeFunPane() {
				this.state.flag = true;
			},
			...mapMutations([
				'setCurOrder'
			])

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.copy {
		text-align: center;
	}
	
	.cons_del {
		float: right;
		color: red;
		width: 30px;
		text-align: center;
		height: 30px;
	}
</style>