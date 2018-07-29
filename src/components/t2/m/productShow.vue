<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :active.sync="itemMdata.parentStyle.active" :z="itemMdata.parentStyle.zIndex" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height||30" :parent="itemMdata.parent" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit productShowP hove_con">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">编辑产品展示</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" :id="productShowId" @contextmenu="showMenu">
				<!--one-->
				<ul v-show="itemMdata.styleone"  class="oneUl">
					<li v-for="(list,index) in itemMdata.productSelected" v-show="itemMdata.page.pageNum>index" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4}">
						<div @dblclick="gotolink(list.id,list.target)">
							<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle2" />
							<p :style="itemMdata.pStyle">{{list.name}}</p>
							<div class="hid" :style="itemMdata.hidStyle">
								<p>{{list.describe}}</p>
								<i></i>
							</div>
						</div>
					</li>
				</ul>
				<!--two-->
				<div class="swiper slide1" v-show="itemMdata.styletwo">
					<!--<swiper class="swiper-container" swipeid="swipe3" ref="swiper" :speed="2000" effect="slide" :slidesPerView="2" :swiperbutton="true" :pagination="false">
						<div v-for="(list,index) in itemMdata.productSelected" :key="index" class="swiper-slide" slot="swiper-con" :style="itemMdata.slideStyle">
							<img @mousedown="defaultStop($event)" :src="list.image">
							<p :style="itemMdata.pStyle">{{list.name}}</p>
							<div class="hid" :style="itemMdata.hidStyle">
								<p>{{list.describe}}</p>
								<i></i>
							</div>
						</div>
					</swiper>-->
					<div class="swiper-container" :id="this.swiperId3">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(list,index) in itemMdata.productSelected" :key="index" :style="itemMdata.slideStyle">
								<img @mousedown="defaultStop($event)" :src="list.image">
								<p :style="itemMdata.pStyle">{{list.name}}</p>
							</div>
						</div>
						<!-- 如果需要导航按钮 -->
						<div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div>
					</div>
				</div>
				<!--three-->
				<div class="swiper slide2" v-show="itemMdata.stylethree">
					<!--<swiper class="swiper-container" swipeid="swipe2" ref="swiper" :speed="1000" effect="slide" :swiperbutton="true" :pagination="false">
						<div v-for="(list,index) in itemMdata.productSelected" :key="index" class="swiper-slide" slot="swiper-con">
							<img @mousedown="defaultStop($event)" :src="list.image">
							<p :style="itemMdata.pStyle">{{list.name}}</p>
							<div class="hid" :style="itemMdata.hidStyle">
								<p>{{list.describe}}</p>
								<i></i>
							</div>
						</div>
					</swiper>-->
					<div class="swiper-container" :id="this.swiperId4">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(list,index) in itemMdata.productSelected" :key="index">
								<img @mousedown="defaultStop($event)" :src="list.image">
								<p v-if="itemMdata.productName" :style="itemMdata.pStyle">{{list.name}}</p>
								<div v-for="(des,index) in itemMdata.productDesList" v-if="itemMdata.productDesShow">
									<div class="text" v-if="list.id == des.id" v-html="des.content"></div>
								</div>
							</div>
						</div>
						<!-- 如果需要分页器 -->
						<div class="swiper-pagination" v-show="itemMdata.swiperPagination"></div>
						<!-- 如果需要导航按钮 -->
						<div class="swiper-button-prev" :style="backgroundDiv"  v-show="itemMdata.swiperNavigation"></div>
						<div class="swiper-button-next" :style="backgroundDiv2"  v-show="itemMdata.swiperNavigation"></div>
					</div>
				</div>
				<!--分页-->
				<div class="page" v-if="itemMdata.page.isShow==1">
					<p data-index="up">
						<span>上一页</span>
					</p>
					<p :data-index="index" v-for="(index) in Math.ceil(itemMdata.page.talNum/itemMdata.page.pageNum)">
						<span>{{index}}</span>
					</p>
					<!--p>
						<span>1</span>
					</p>
					<p>
						<span>2</span>
					</p>
					<p>
						<span>3</span>
					</p>
					<p>
						<span>4</span>
					</p-->
					<p data-index="down">
						<span>下一页</span>
					</p>
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
	import api from '@/api/$ajax.js'
	//require("../../../../static/js/emit.js");
	//import uiDialog from './uiDialog.vue'
	//import swiper from './swiper.vue'
	export default {
		name: 'productShow',
		components: {
			VueDraggableResizable,
			//uiDialog,
			//swiper
		},
		props: ['itemMdata', "posCom", 'index', "itemInner"],
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				id: this.$route.params.id,
				param: this.$route.params.param,
				token: this.$route.query.token,
				productId: this.$route.query.productId,
				param: {
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.mobile_version_id
				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					isEdit: true,
					rTitle: '编辑产品展示',
				},
				productShowId: "productShow" + this.posCom + this.index,
				swiperId3: "swiper3" + this.posCom + this.index,
				swiperId4: "swiper4" + this.posCom + this.index,
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
				},
				pID: '',
				backgroundDiv: {
					backgroundImage: 'url(' + this.itemMdata.swiperPrev.url + ')',
				},
				backgroundDiv2: {
					backgroundImage: 'url(' + this.itemMdata.swiperNext.url + ')',
				}
			}
		},
		created() {
			console.log(this.itemMdata);
			this.getData();
			console.log(this.itemMdata.productDesList);

			//			this.$nextTick(() => {
			//				setInterval(() => {
			//					this.marginleft2 -= 300;
			//					this.currentIndex2++;
			//					if(this.currentIndex2 > this.itemMdata.productSelected.length - 1) {
			//						this.marginleft2 = 0;
			//						this.currentIndex2 = 0;
			//					}
			//				}, 2000)
			//			})
		},
		mounted() {
			var mySwiper3 = new Swiper('#' + this.swiperId3, {
				direction: 'horizontal',
				autoplay: false,
				loop: true,
				speed: 700,
				slidesPerView: 2,
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});

			var mySwiper4 = new Swiper('#' + this.swiperId4, {
				direction: 'horizontal',
				autoplay: {
					delay: 1000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
				loop: true,
				speed: 700,
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination'
				},
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
			
			this.$nextTick(() => {
				setInterval(() => {
					productSwiper.productSwiper(this.productShowId,this.swiperId4, this.itemMdata);
				}, 300)
			})

		},
		methods: {
			getData() {
				var v = this;
				api.get('/api/data/productList?token=' + this.token, true, {}, function(data) {
					//var result = JSON.stringify(data); //json对象转成字符串
					v.itemMdata.productList = data.data;
					//$("#text").val(result);
					for(var i = 0; i < v.itemMdata.productList.length; i++) {
						v.pID = v.itemMdata.productList[i].id;
						api.get('/api/data/product?token=' + v.token + '&id=' + v.pID, false, {}, function(data) {
							v.itemMdata.productDesList[i] = data.data
							//console.log(v.itemMdata.productDesList)
						});
						console.log(v.pID)
					}
				});

			},
			gotolink: function(id, target) {
				var link = '/pc/t2/product/' + this.id + '/' + this.param.id + '?productId=' + id + '&token=' + this.param.token + "&company_id=" + this.param.company_id + "&type=" + this.param.type + '&version_id=' + this.param.version_id + '&mobile_version_id=' + this.param.mobile_version_id;
				window.open(link, target);
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
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
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
			upFloor(i) { //置于顶层
				//console.log(i.parentStyle);
				i.parentStyle.zIndex = this.itemInner.length;
				console.log("upFloor");
			},
			moveUpFloor(i) { //上移一层
				++i.parentStyle.zIndex;
				console.log('moveUpFloor!');
			},
			moveDownFloor(i) { //下移一层
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			copyItem(item) { //复制模块
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.length + 1;
				this.itemInner.push(i);
			},
			downFloor(i) { //置于底层
				i.parentStyle.zIndex = 0;
				console.log('downFloor!');
			}
			//			prev: function() {
			//				this.marginleft -= 300;
			//				this.currentIndex++;
			//				if(this.currentIndex > this.itemMdata.productSelected.length - 1) {
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
	.hove_con {
		position: relative;
		/*.detail {
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
			}
			.page {
				margin-top: 10px;
				display: table;
				text-align: center;
				margin-left: auto;
				margin-right: auto;
			}
			.page p {
				float: left;
				margin-right: 10px;
			}
			.page p a {
				display: block;
				border-radius: 3px;
				color: #666;
				border: 1px solid #b3b3b3;
				text-decoration: none;
				padding: 2px 10px;
				font-size: 14px;
			}
			.page p a:hover {
				background: #5874d8;
				color: #FFFFFF;
			}
		}*/
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>