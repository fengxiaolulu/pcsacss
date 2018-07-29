<template>
	<div class="button callout_button">
		<!--a id="callout" @click="opendial" href="#">弹出对话框</a-->
		<div @click="closedial" id="mask" class="mask"></div>
		<div class="dialog" id="mtDialog" :style="style">
			<div class="dialog_head" id="move_part"><span class="tit" v-html="rTitle"></span><i @click="closedial" class="el-dialog__close el-icon el-icon-close"></i></div>
			<div class="dialog_content" @mousedown="stopPropagation($event)">
				<template v-for="item in getDataCur">
					<template v-for="it in item">
						<template v-if="it.isEdit&&it.mClass!='Typesetting'">
							<div v-if="it.isEdit&&it.tName==itemMdata.tName" :is="itemMdata.tName+'Edit'" v-on:recoent="recoent" :itemMdata="it" :editDial='editDial'></div>
						</template>
						<template v-if="!it.isEdit&&it.mClass=='Typesetting'" v-for="i in it.itemInner">
							<div v-if="i.isEdit&&i.tName==itemMdata.tName" :is="itemMdata.tName+'Edit'" v-on:recoent="recoent" :itemMdata="i" :editDial='editDial'></div>
						</template>
						<template v-if="!it.isEdit&&it.mClass=='Typesetting'" v-for="i in it.labelTitle">
							<template v-for="int in i.itemInner">
								<div v-if="int.isEdit&&int.tName==itemMdata.tName" :is="itemMdata.tName+'Edit'" v-on:recoent="recoent" :itemMdata="int" :editDial='editDial'></div>
							</template>
						</template>
						<template v-if="it.isEdit&&it.mClass=='Typesetting'">
							<div v-if="it.isEdit&&it.tName==itemMdata.tName" :is="itemMdata.tName+'Edit'" v-on:recoent="recoent" :itemMdata="it" :editDial='editDial'></div>
						</template>
					</template>
				</template>
				<template v-if="phoneNav.isEdit&&phoneNav.tName=='PhoneNav'">
					<div :is="phoneNav.tName+'Edit'" v-on:recoent="recoent" :itemMdata="[phoneNav,router]" :editDial='editDial'></div>
				</template>
			</div>
			<div class="footer_dial">
				<div class="button dialog-footer">
					<span class="el-button el-button--default" @click="closedial" id="close">取消</span>
					<span class="el-button el-button--primary" @click="mSave">确认</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import dat from '../../../../static/js/sideData.js'
	
	import mButtonEdit from './mButtonEdit.vue' //编辑按钮组件
	import mFontEdit from './fontEdit.vue' //编辑文本组件
	import mImageEdit from './mImageEdit.vue' //编辑图片组件
	import graphicEdit from './graphicEdit.vue' //编辑图文展示
	import columnPictureEdit from './columnPictureEdit.vue' //编辑列表多图
	import multiCarouselEdit from './multiCarouselEdit.vue' //编辑轮播多图
	import articleScrapEdit from './articleScrapEdit.vue' //编辑文章列表
	import freeContainerEdit from './freeContainerEdit.vue' //编辑自由容器
	import labelContainerEdit from './labelContainerEdit.vue' //设置标签展示
	//import longitudinalLabelEdit from './longitudinalLabelEdit.vue' //
	import multiColumnContainerEdit from './multiColumnContainerEdit.vue' //编辑多列容器
	import moduleAreaNavEdit from './topGrade/moduleAreaNavEdit.vue' //编辑栏目导航
	//import photoMoreCardEdit from './topGrade/photoMoreCardEdit.vue'
	import columnLayoutEdit from './columnLayoutEdit.vue' //编辑通栏排版
	import productShowEdit from './productShowEdit.vue'
	import productSearchEdit from './productSearchEdit.vue'
	import msgSubmitEdit from './msgSubmitEdit.vue'
	import siteFormEdit from './siteFormEdit.vue'
	import serviceOnlineEdit from './serviceOnlineEdit.vue'
	import areaFileEdit from './areaFileEdit.vue'
	import areaMapEdit from './areaMapEdit.vue'
	import areaLocationEdit from './areaLocationEdit.vue'
	import areaIndexFavoriteEdit from './areaIndexFavoriteEdit.vue'
	import siteQrCodeEdit from './siteQrCodeEdit.vue'
	import areaFlvEdit from './areaFlvEdit.vue'
	import productNavEdit from './productNavEdit.vue'
	import newlyShopEdit from './newlyShopEdit.vue'
	import areaCodeEdit from './areaCodeEdit.vue'
	import areaDateEdit from './areaDateEdit.vue'
	import PhoneNavEdit from './PhoneNavEdit.vue'
	import productDesEdit from './productDesEdit.vue'
	import mNewDesEdit from './mNewDesEdit.vue'
	import fullScreenEdit from './fullScreenEdit.vue'

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
	//声明需要用到的变量
	var mx = 0,
		my = 0; //鼠标x、y轴坐标（相对于left，top）
	var dx = 0,
		dy = 0; //对话框坐标（同上）
	var isDraging = false; //不可拖动

	export default {
		name: 'uiDialog',
		components: {
			mButtonEdit,
			mImageEdit,
			mFontEdit,
			graphicEdit,
			columnPictureEdit,
			multiCarouselEdit,
			freeContainerEdit,
			productNavEdit,
			multiColumnContainerEdit,
			labelContainerEdit,
			moduleAreaNavEdit,
			newlyShopEdit,
			areaCodeEdit,
			areaDateEdit,
			articleScrapEdit,
			columnLayoutEdit,
			productShowEdit,
			productSearchEdit,
			msgSubmitEdit,
			siteFormEdit,
			serviceOnlineEdit,
			areaFileEdit,
			areaMapEdit,
			areaLocationEdit,
			areaIndexFavoriteEdit,
			siteQrCodeEdit,
			areaFlvEdit,
			PhoneNavEdit,
			productDesEdit,
			mNewDesEdit,
			fullScreenEdit
		},
		props: ['itemMdata', 'editDial'],
		created() {
			//console.log(this.itemMdata);
			console.log(this.getDataCur);
		},
		mounted: function() {
			window.onresize = function() {
				autoCenter(g('mtDialog'));
			};
			//鼠标按下
			g('move_part').addEventListener('mousedown', function(e) {
				var e = e || window.event;
				console.log("move_part");
				e.stopPropagation();
				mx = e.pageX; //点击时鼠标X坐标
				my = e.pageY; //点击时鼠标Y坐标
				dx = g('mtDialog').offsetLeft;
				dy = g('mtDialog').offsetTop;
				isDraging = true; //标记对话框可拖动
				document.onmousemove = function(e) {
					var e = e || window.event;
					var x = e.pageX; //移动时鼠标X坐标
					var y = e.pageY; //移动时鼠标Y坐标
					if(isDraging) { //判断对话框能否拖动
						var moveX = dx + x - mx; //移动后对话框新的left值
						var moveY = dy + y - my; //移动后对话框新的top值
						g('mtDialog').style.left = moveX + 'px'; //重新设置对话框的left
						g('mtDialog').style.top = moveY + 'px'; //重新设置对话框的top
						//设置拖动范围
						var pageW = document.documentElement.clientWidth;
						var pageH = document.documentElement.clientHeight;
						var dialogW = g('mtDialog').offsetWidth;
						var dialogH = g('mtDialog').offsetHeight;
						var maxX = pageW - dialogW; //X轴可拖动最大值
						var maxY = pageH - dialogH; //Y轴可拖动最大值
						moveX = Math.min(Math.max(0, moveX), maxX); //X轴可拖动范围
						moveY = Math.min(Math.max(0, moveY), maxY); //Y轴可拖动范围

						g('mtDialog').style.left = moveX + 'px'; //重新设置对话框的left
						g('mtDialog').style.top = moveY + 'px'; //重新设置对话框的top
					};
				};

			});
			//console.log(document.onmousemove);
			//鼠标离开
			document.addEventListener('mouseup', function() {
				isDraging = false;
			});
			autoCenter(g('mtDialog'));
		},
		methods: {
			closedial() {
				//g('mtDialog').style.display = 'none';
				//g('mask').style.display = 'none';
				//console.log(this.itemMdata);
				//this.itemMdata.isShow = true;
				//console.log(this.getDataCur)
				for(var v in this.getDataCur) {
					var dataCur = this.getDataCur[v];
					for(var j = 0; j < dataCur.length; j++) {
						var arSpon = dataCur[j];
						console.log(j);
						if(arSpon.mClass == 'Typesetting') {
							arSpon.isEdit = false;
							var itemInner = arSpon.itemInner;
							if(itemInner) {
								for(let k = 0; k < itemInner.length; k++) {
									itemInner[k].isEdit = false;
									itemInner[k].isShow = true;
									//console.log("itemInner");
								}
							} else if(arSpon.labelTitle.length) {
								for(var h = 0; h < arSpon.labelTitle.length; h++) {
									var lblinner = arSpon.labelTitle[h].itemInner;
									for(let k = 0; k < lblinner.length; k++) {
										lblinner[k].isEdit = false;
										lblinner[k].isShow = true;
										//console.log("itemInner");
									}
									//console.log("itemInner");
								}
							}

						} else {
							arSpon.isEdit = false;
						}
						console.log(arSpon);
					}
				}
				this.editDial.isEdit = false;
				this.phoneNav.isEdit = false;
				//console.log('this.getDataCur');
			},
			recoent(itemMdata) {
				//itemMdata.isShow = true;
				this.$emit('recoent', itemMdata);
				//console.log(itemMdata);
			},
			stopPropagation(e) {
				e.stopPropagation();
				//console.log("stopPropagation");
			},
			mSave() {
				this.saveloca(this.param);
				this.closedial();
			},
			...mapActions([
				'saveloca'
			])
		},
		computed: {
			...mapGetters(["getDataCur","phoneNav","router"])
		},
		data() {
			return {
				rTitle: this.editDial && this.editDial.rTitle || "标题",
				id: this.$route.params.id,
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
				style: {
					width: this.editDial && this.editDial.editDialWidth || "650px",
					height: this.editDial && this.editDial.editDialHeight || "500px",
					border: "1px solid #BFBFBF",
					boxShadow: "0px 0px  10px 3px #bdbdbd"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	a {
		text-decoration: none;
		color: #eee;
		display: block;
	}
	
	.dialog-footer {
		text-align: right;
		margin-right: 15px;
		margin-top: 20px;
	}
	
	.callout_button {
		background: #FF5B5B;
		margin: 0 auto;
	}
	
	.callout_button:hover {
		background: red;
	}
	
	.close_button {
		background: #363636;
		margin: 0 auto;
	}
	
	.close_button:hover {
		background: black;
	}
	
	.mask {
		min-width: 100%;
		height: 100%;
		background: #000;
		position: fixed;
		top: 0px;
		left: 0px;
		cursor: default;
		opacity: 0.01;
		z-index: 990;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
	
	.dialog {
		position: relative;
		width: 650px;
		background: #fff;
		position: fixed;
		z-index: 1000;
		padding-bottom: 10px;
		-moz-user-select: none;
		-webkit-user-select: none;
		border-radius: 7px
	}
	
	.dialog_head {
		height: 60px;
		background: #4B4B4B;
		text-align: left;
		padding: 0 15px;
		.el-icon-close {
			float: right;
			margin-top: 17px;
			cursor: pointer;
		}
		line-height: 60px;
		color: #eee;
		cursor: move;
	}
	
	.dialog_content {
		cursor: default;
		width: 100%;
	}
</style>