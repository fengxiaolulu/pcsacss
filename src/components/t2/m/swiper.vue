<template>
	<div class="swiper-container" :class="swipeid">
		<div class="swiper-wrapper">
			<!-- 存放具体的轮播内容 -->
			<slot name="swiper-con"></slot>
		</div>
		<!-- 分页器 -->
		<div :class="{'swiper-pagination':pagination}"></div>
		<!--切换箭头-->
		<div class="swiper-button-next swiper-button-white" v-if="swiperbutton == true"></div>
		<div class="swiper-button-prev swiper-button-white" v-if="swiperbutton == true"></div>
	</div>
</template>
<script>
	import Swiper from "swiper";
	import "swiper/dist/css/swiper.min.css";
	export default {
		props: {
			swipeid: {
				type: String,
				default: ""
			},
			effect: {
				type: String,
				default: "slide"
			},
			loop: {
				type: Boolean,
				default: true
			},
			direction: {
				type: String,
				default: "horizontal"
			},
			pagination: {
				type: Boolean,
				default: true
			},
			paginationType: {
				type: String,
				default: "bullets"
			},
			speed: {
				type: Number,
				default: 500
			},
			slidesPerView: {
				type: Number,
				default: 1
			},
			swiperbutton: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dom: ""
			};
		},
		mounted() {
			var that = this;
			this.dom = new Swiper("." + that.swipeid, {
				//循环
				loop: that.loop,
				//分页器
				pagination: {
					el: ".swiper-pagination",
					bulletClass: 'swiper-pagination-bullet',
				},
				//分页类型
				paginationType: that.paginationType,
				slidesPerView: that.slidesPerView,
				//箭头
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				//自动播放
				autoplay:{disableOnInteraction:false},
				speed: that.speed,
				//方向
				direction: that.direction,
				//特效
				effect: that.effect,
				//用户操作swiper之后，不禁止autoplay
				disableOnInteraction: false,
				//修改swiper自己或子元素时，自动初始化swiper
				observer: true,
				//修改swiper的父元素时，自动初始化swiper
				observeParents: true,
				onSlideChangeEnd: function(swiper) {　　　
					this.dom.update();　　　
					this.dom.startAutoplay();　　
					this.dom.reLoop();
				}
			});
			//console.log(this.dom);
		}
	};
</script>

<style>
	
</style>