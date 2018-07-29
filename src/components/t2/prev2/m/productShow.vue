<template>
	
		<div class="phoneedit productShowP hove_con" :style="parentStyle">
			<div class="detail" :id="productShowId">
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

</template>

<script>
	//require("../../../../../static/js/emit.js");
	//import swiper from './swiper.vue'
	export default {
		name: 'productShow',
		props: ['itemMdata', "posCom", 'index'],
		components: {
			//swiper
		},
		data() {
			return {
				parentStyle: {

				},
				productShowId: "productShow" + this.posCom + this.index,
				token:this.$route.query.token,
				swiperId3: "swiper3" + this.posCom + this.index,
				swiperId4: "swiper4" + this.posCom + this.index,
				backgroundDiv: {
					backgroundImage: 'url(' + this.itemMdata.swiperPrev.url + ')',
				},
				backgroundDiv2: {
					backgroundImage: 'url(' + this.itemMdata.swiperNext.url + ')',
				}
			}
		},
		created() {
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		mounted() {
			
			var mySwiper3 = new Swiper('#'+this.swiperId3 , {
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
			
			var mySwiper4 = new Swiper('#'+this.swiperId4 , {
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
					prevEl: '.swiper-button-prev'
				},
			});
			
			this.$nextTick(() => {
				setInterval(() => {
					productSwiper.productSwiper(this.productShowId,this.swiperId4, this.itemMdata);
				}, 300)
			})
		},
		methods: {
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			gotolink:function(link,target){
				window.open(link,target); 
			},
			linkUrl() {
				if(this.itemMdata.link) {
					if(this.itemMdata.link.indexOf("http") != -1) {
						location.href = this.itemMdata.link;
					} else {
						this.$router.push(this.preview + this.itemMdata.link);
						//location.href = this.preview + this.itemMdata.link;
					}
				}
				console.log(this.preview + this.itemMdata.link);
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
		
		.detail {
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
					background: url(../../../../../static/image/mbg01.png)no-repeat center;
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
			
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>