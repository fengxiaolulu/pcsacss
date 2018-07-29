<template>
	<div style="user-select: none">
		<myHeader></myHeader>
		<div>
			<sideCon></sideCon>
			<div class="conect" style="position: relative;">
				<!--div :is="tm">
				</div-->
				 <router-view></router-view>
				<div class="temp_outer">
					<div class="temp_inner">
						<div></div>
					</div>
				</div>
			</div>
		</div>
		<myFooter></myFooter>
	</div>

</template>
<script>
	import myHeader from '../components/header.vue'
	import myFooter from '../components/footer.vue'
	import sideCon from '../components/sideCon.vue'
	//import t1 from '@/components/t1/layout.vue'
	//import t2 from '@/components/t2/layout.vue'
	
	export default {
		components: {
			myHeader,
		//	t1,
			sideCon,
		//	t2,
			myFooter
		},
		data() {
			return {
				id: this.$route.params.id,
				tm: this.$route.params.tm,
				param: this.$route.params.param,
				val: '123',
				style: {
					//cursor: "move",
					position: 'fixed',
					left: '10px',
					top: "80px"
				}
			}
		},
		/*beforeRouteLeave(to, from, next) {
			const answer = window.confirm('系统可能不会保存您所做的更改')
			if(answer) {
				next()
			} else {
				next(false)
			}
		},*/
		created() {
			//this.getData();		
		},
		mounted: function() {
			/*document.onmousemove = function(e) {
				var e = e || window.event;
				console.log(isDraging)
				var x = e.pageX; //移动时鼠标X坐标
				var y = e.pageY; //移动时鼠标Y坐标
				if(isDraging) { //判断对话框能否拖动
					var moveX = dx + x - mx; //移动后对话框新的left值
					var moveY = dy + y - my; //移动后对话框新的top值
					g('dialog').style.left = moveX + 'px'; //重新设置对话框的left
					g('dialog').style.top = moveY + 'px'; //重新设置对话框的top
					//设置拖动范围
					var pageW = document.documentElement.clientWidth;
					var pageH = document.documentElement.clientHeight;
					var dialogW = g('dialog').offsetWidth;
					var dialogH = g('dialog').offsetHeight;
					var maxX = pageW - dialogW; //X轴可拖动最大值
					var maxY = pageH - dialogH; //Y轴可拖动最大值
					moveX = Math.min(Math.max(0, moveX), maxX); //X轴可拖动范围
					moveY = Math.min(Math.max(0, moveY), maxY); //Y轴可拖动范围

					g('dialog').style.left = moveX + 'px'; //重新设置对话框的left
					g('dialog').style.top = moveY + 'px'; //重新设置对话框的top
				};
			};
			document.onmouseup = function(e) {
				isDraging = false;
			};*/
		},
		methods: {

			getData() {
				//var v = this
				/*v.$api.get('topic/' + this.id, null, r => {
				   v.dat = r.data       
			    })*/
			}
		}
	}
</script>
<style lang="scss">
	@import "../style/scss/templateEdit";
	.el-dialog__header{background-color:#ddd;}
	.side_inner {
		position: fixed;
		margin-left:20px;
		.funOuterPanel {
			width: 360px;
			border-radius: 5px;
			background: #fff;
			box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
		}
		.funPanelEntryBtn:hover .funPanelEntryBtnIcon_module {
			background-position: -959px -899px
		}
		.funPanelEntryBtn:hover .funPanelEntryBtnIcon_skin {
			background-position: -959px -949px
		}
		.funPanelEntryBtn:hover .funPanelEntryBtnIcon_setup {
			background-position: -959px -1017px
		}
		.funPanelEntryBtn:hover .funPanelEntryBtnIcon_opt {
			background-position: -959px -1085px
		}
		.funPanelEntryBtn:hover {
			background-color: #0D83ED;
		}
		.funPanelEntryBtn_module:hover {
			width: 100px
		}
		.funPanelEntryBtn_skin:hover {
			width: 100px
		}
		.funPanelEntryBtn_setup:hover {
			width: 100px
		}
		.funPanelEntryBtn_opt:hover {
			width: 130px
		}
		.funPanelEntryBtn:last-child {
			margin-bottom: 0
		}
		.funPanelEntryBtnText {
			display: none;
			height: 54px;
			margin-left: -8px;
			line-height: 54px;
			color: #fff;
			font-size: 15px;
			font-family: "微软雅黑";
			white-space: nowrap;
			vertical-align: top
		}
		.funPanelEntryBtn_module:hover .funPanelEntryBtnText {
			display: inline-block
		}
		.funPanelEntryBtn_skin:hover .funPanelEntryBtnText {
			display: inline-block
		}
		.funPanelEntryBtn_setup:hover .funPanelEntryBtnText {
			display: inline-block
		}
		.funPanelEntryBtn_opt:hover .funPanelEntryBtnText {
			display: inline-block
		}
		.entryBtnsList_hover .funPanelEntryBtn {
			background-color: #5874d8
		}
		.entryBtnsList_hover .funPanelEntryBtn .funPanelEntryBtnText {
			display: inline-block
		}
		.entryBtnsList_hover .funPanelEntryBtn_module {
			width: 100px
		}
		.entryBtnsList_hover .funPanelEntryBtn_skin {
			width: 100px
		}
		.entryBtnsList_hover .funPanelEntryBtn_setup {
			width: 100px
		}
		.entryBtnsList_hover .funPanelEntryBtn_opt {
			width: 130px
		}
		.entryBtnsList_hover .funPanelEntryBtn .funPanelEntryBtnIcon_module {
			background-position: -959px -899px
		}
		.entryBtnsList_hover .funPanelEntryBtn .funPanelEntryBtnIcon_skin {
			background-position: -959px -949px
		}
		.entryBtnsList_hover .funPanelEntryBtn .funPanelEntryBtnIcon_setup {
			background-position: -959px -1017px
		}
		.entryBtnsList_hover .funPanelEntryBtn .funPanelEntryBtnIcon_opt {
			background-position: -959px -1085px
		}
		.funPanelEntryBtn {
			height: 54px;
			width: 54px;
			border-radius: 54px;
			overflow: hidden;
			margin-bottom: 15px;
			background: #fafafa;
			line-height: 0;
			cursor: pointer;
			box-shadow: 2px 3px 7px 0 rgba(0, 0, 0, 0.2);
			transition: background-color, width .2s;
		}
		.funPanelEntryBtnText {
			display: none;
			height: 54px;
			margin-left: -8px;
			line-height: 54px;
			color: #fff;
			font-size: 15px;
			font-family: "微软雅黑";
			white-space: nowrap;
			vertical-align: top;
		}
		.funPanelEntryBtnIcon_module {
			background-position: 2px -2px;
		}
		.funPanelEntryBtnIcon_skin {
			background-position: -39px -2px;
		}
		.funPanelEntryBtnIcon_setup {
			background-position: -79px -2px;
		}
		.funPanelEntryBtnIcon {
			display: inline-block;
			width: 54px;
			height: 54px;
			background-image: url('/static/image/iconIndex.png');
			background-repeat: no-repeat;
		}
		.funPanelEntryBtn:hover .funPanelEntryBtnIcon_opt {
			background-position: -286px -2px;
		}
		.funPanelEntryBtnIcon_opt {
			background-position:  -118px -2px;
		}
		.funPanelEntryBtn:hover .funPanelEntryBtnIcon_module {
			background-position: -167px -2px;
		}
		.funPanelEntryBtn:hover .funPanelEntryBtnIcon_skin {
			background-position: -207px -2px;
		}
		.funPanelEntryBtn:hover .funPanelEntryBtnIcon_setup {
			background-position: -248px -2px;
		}
	}
	
	.side_inner {
		z-index: 20000;
	}
	
	.imgM {
		background-color: #0D83ED;
	}
</style>