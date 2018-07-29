<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :z="itemMdata.parentStyle.zIndex" :active.sync="itemMdata.parentStyle.active" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.cancel'">
		<div class="phoneedit columnPictureP hove_con">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑列图多表</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" @contextmenu="showMenu">
				<!--one-->
				<ul class="styleone" v-show="itemMdata.styleone">
					<li v-for="list in itemMdata.columnPictureLlist" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFive:itemMdata.mouseenterNumber==5}">
						<div  @dblclick="linkUrl(list)" class="colBox" :style="itemMdata.divStyle">
							<img @mousedown="defaultStop($event)" :src="list.url" :style="itemMdata.imgStyle2" />
							<div class="hid" :style="[itemMdata.hidStyle,{background:'none'}]" v-if="itemMdata.mouseenterNumber==2">
								<p :style="[{display:'none'},{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
								<i></i>
							</div>
							<div class="hid"  v-if="itemMdata.mouseenterNumber==4">
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
								<i></i>
							</div>
							<div class="hid5" v-if="itemMdata.mouseenterNumber==5">
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
								<i></i>
							</div>
						</div>
						<p :style="itemMdata.pStyle">{{list.text}}</p>
						<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.phoneP,itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
					</li>
				</ul>
				<!--two-->
				<div class="swiper slide1" v-show="itemMdata.styletwo">
					<!--<swiper class="swiper-container" swipeid="swipe5" ref="swiper" :speed="2000" effect="slide" :slidesPerView="2" :swiperbutton="true" :pagination="false">
						<div v-for="(list,index) in itemMdata.columnPictureLlist" :key="index" class="swiper-slide" slot="swiper-con" :style="itemMdata.slideStyle">
							<img @mousedown="defaultStop($event)" :src="list.url"  @dblclick="linkUrl(list)"/>
							<p :style="itemMdata.pStyle">{{list.text}}</p>
							<div class="hid" :style="itemMdata.hidStyle">
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.phoneP,itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
								<i></i>
							</div>
						</div>
					</swiper>-->
					<div class="swiper-container" :id="this.swiperId1">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(list,index) in itemMdata.columnPictureLlist" :key="index" :style="itemMdata.slideStyle">
								<img @mousedown="defaultStop($event)" :src="list.url">
								<p :style="itemMdata.pStyle">{{list.text}}</p>
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.phoneP,itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
							</div>
						</div>					
						<!-- 如果需要导航按钮 -->
						<div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div>
					</div>
				</div>
				<!--three-->
				<div class="swiper slide2" v-show="itemMdata.stylethree">
					<!--<swiper class="swiper-container" swipeid="swipe4" ref="swiper" :speed="1000" effect="slide" :swiperbutton="true" :pagination="false">
						<div v-for="(list,index) in itemMdata.columnPictureLlist" :key="index" class="swiper-slide" slot="swiper-con">
							<img @mousedown="defaultStop($event)" :src="list.url"  @dblclick="linkUrl(list)" />
							<p :style="itemMdata.pStyle">{{list.text}}</p>
							<div class="hid" :style="itemMdata.hidStyle">
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.phoneP,itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
								<i></i>
							</div>
						</div>
					</swiper>-->
					<div class="swiper-container" :id="this.swiperId2">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(list,index) in itemMdata.columnPictureLlist" :key="index">
								<img @mousedown="defaultStop($event)" :src="list.url">
								<p :style="itemMdata.pStyle">{{list.text}}</p>
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.phoneP,itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
							</div>
						</div>					
						<!-- 如果需要导航按钮 -->
						<div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div>
					</div>
				</div>
			</div>
		</div>
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	//require("../../../../static/js/emit.js");
	//import uiDialog from './uiDialog.vue'
	//import swiper from './swiper.vue'
	export default {
		name: 'columnPicture',
		props: ['itemMdata', "posCom", 'index',"itemInner"],
		created() {
			this.itemMdata.divStyle = this.itemMdata.divStyle||{}
			console.log(this.itemMdata);
			//			this.$nextTick(() => {
			//				setInterval(() => {
			//					this.marginleft2 -= 300;
			//					this.currentIndex2++;
			//					if(this.currentIndex2 > this.itemMdata.columnPictureLlist.length - 1) {
			//						this.marginleft2 = 0;
			//						this.currentIndex2 = 0;
			//					}
			//				}, 2000)
			//			})
		},
		data() {
			return {
				title: "列表多图",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
				//http://localhost:8083/pc/t2/31/171?token=f865262835a445abaa8533ba77233915FjLPTg&company_id=100014&type=2&pc_version_id=45&mobile_version_id=46
				preview: '/pc/t2/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					version_id: this.$route.query.version_id,					
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id
				},
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					rTitle: '编辑列表多图',
					isEdit: false
				},
				swiperId1: "swiper1" + this.posCom + this.index,
				swiperId2: "swiper2" + this.posCom + this.index,
				contextMenuData: {
					// the contextmenu name(@1.4.1 updated)
					menuName: this.$utils.guid(),
					axios: {
						x: null,
						y: null
					},
					//Menu options (菜单选项)
					menulists: [{
							fnHandler: 'upFloor', //Binding events(绑定事件)
							btnName: '置于顶层' //The name of the menu option (菜单名称)
						},
						{
							fnHandler: 'moveUpFloor',
							btnName: '上移一层'
						},
						{
							fnHandler: 'moveDownFloor',
							btnName: '下移一层'
						},
						{
							fnHandler: 'copyItem',
							btnName: '复制模块'
						},
						{
							fnHandler: 'downFloor',
							btnName: '置于底层'
						}
					]
				}
			}
		},
		mounted() {
			var mySwiper = new Swiper('#'+this.swiperId1 , {
				direction: 'horizontal',
				autoplay: false,
				loop: true,
				speed: 700,
				slidesPerView : 2,
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
			
			var mySwiper2 = new Swiper('#'+this.swiperId2 , {
				direction: 'horizontal',
				autoplay: {
					delay: 1000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
				loop: true,
				speed: 700,
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			})
		},
		components: {
			VueDraggableResizable,
			//uiDialog,
			//swiper
		},
		methods: {
			linkUrl(item){
				var link = item.link;
				var t = this;
				console.log(link)
				if(Number(link)){
					if(item.target == '_blank'){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
					if(item.target == '_self'){
						location.href = t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id;
					}
					if(!item.target){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
				}else{
					if(link.indexOf("http") > -1 && item.target == '_blank'){
						window.open(link)
					}else if(link.indexOf("http") < 0 && item.target == '_blank'){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}

					if(link.indexOf("http") > -1 && item.target == '_self'){
						location.href = link
					}else if(link.indexOf("http") < 0 && item.target == '_self'){
						location.href = t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id
					}

					if(link.indexOf("http") > -1 && !item.target){
						window.open(link)
					}else if(link.indexOf("http") < 0 && !item.target){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}
					
				}
				
			},
			describeHtml(s) {
			　　if (s) {
			　　　　return s.replace(/\s/g,'<br/>')
			　　} else return '';
			},
			gotolink: function(link, target) {
				window.open(link, target);
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
			},
			delModule(i) {
				this.$emit('delModule', i);
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			defaultStop(e) {
				e.preventDefault();
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			},
			showMenu(index) {
				event.preventDefault();
				event.stopPropagation();
				var x = event.clientX;
				var y = event.clientY;
				this.contextMenuData.axios = {
					x,
					y
				}
			},
			upFloor(i) {//置于顶层
				//console.log(i.parentStyle);
				i.parentStyle.zIndex = this.itemInner.length;
				console.log("upFloor");
			},
			moveUpFloor(i) {//上移一层
				++i.parentStyle.zIndex;
				console.log('moveUpFloor!');
			},
			moveDownFloor(i) {//下移一层
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			copyItem(item) {//复制模块
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.length + 1;
				this.itemInner.push(i);
			},
			downFloor(i) {//置于底层
				i.parentStyle.zIndex = 0;
				console.log('downFloor!');
			}
			//			prev: function() {
			//				this.marginleft -= 300;
			//				this.currentIndex++;
			//				if(this.currentIndex > this.itemMdata.columnPictureLlist.length - 1) {
			//					this.marginleft = 0;
			//					this.currentIndex = 0;
			//				}
			//			},
			//			next: function() {
			//				this.marginleft += 300;
			//				this.currentIndex--;
			//				if(this.currentIndex == -1) {
			//					alert("已经是第一项啦！");
			//					this.marginleft = 0;
			//					this.currentIndex = 0;
			//				}
			//			}

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.columnPictureP .detail ul .mouseenterFive .hid5{
	display:block;
	width: 100%;
    position: absolute;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.7);
}
	.hove_con {
		position: relative;
		/*.detail {
			clear: both;
			overflow: hidden;
			ul {
				clear: both;
				overflow: hidden;
				li {
					text-align: center;
					overflow: hidden;
					position: relative;
					img {
						height: auto;
						position: relative;
					}
					p {
						line-height: 25px;
						text-align: center;
						width: 100%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.hid {
						display: none;
						position: absolute;
						left: 0;
						right: 0;
						top: 0;
						bottom: 25px;
						transition: all 0.7s;
						-moz-transition: all 0.7s;
						-webkit-transition: all 0.7s;
						-o-transition: all 0.7s;
					}
				}
				.mouseenterOne:hover .hid {
					display: none;
				}
				.mouseenterTwo:hover .hid {
					display: block;
					background: none !important;
				}
				.mouseenterTwo:hover .hid p {
					display: none;
				}
				.mouseenterThree:hover .hid {
					border: none !important;
					left: 32%;
					right: 32%;
					top: 20%;
					bottom: 60px;
					display: block;
					background: rgba(0, 0, 0, 0.7) !important;
					border-radius: 100%;
				}
				.mouseenterThree:hover .hid p {
					display: none;
				}
				.mouseenterThree:hover .hid i {
					display: block;
					width: 20px;
					height: 20px;
					margin-left: 39%;
					margin-top: 37%;
					background: url(../../../../static/image/mbg01.png)no-repeat center;
					background-position: 0 -1085px;
				}
				.mouseenterFour:hover .hid {
					border: none !important;
					display: block;
					background: rgba(0, 0, 0, 0.7);
					text-align: center;
					padding-top: 30%;
				}
				.mouseenterFour:hover .hid p {
					color: #FFFFFF;
				}
				.mouseenterFive:hover .hid {
					border: none !important;
					display: block;
					top: auto;
					height: 25px;
					line-height: 25px;
				}
				.mouseenterFive:hover .hid p {
					color: #FFFFFF;
				}
			}
		}*/
	}
	.colBox{position:relative;
		.hid{
			background: rgba(0, 0, 0, 0.4);
			p{
				position:absolute;
				transform:translate(0,-50%);
			}
		}
	}
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>