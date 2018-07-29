<template>
	
		<div class="phoneedit swiper hove_con" :style="parentStyle">
			
			<div class="detail">
				<!--<swiper class="swiper-container" swipeid="swipe" ref="swiper" :speed="600" effect="slide" :pagination="true">
					<div v-for="(list,index) in itemMdata.slideList" :key="index" class="swiper-slide" slot="swiper-con">
						<img :src="list.image">
					</div>
				</swiper>-->
				<div class="swiper-container" :id="this.swiperId">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(list,index) in itemMdata.slideList" :key="index">
							<img :src="list.image">
						</div>
					</div>
					<!-- 如果需要分页器 -->
					<div class="swiper-pagination" v-show="itemMdata.swiperPagination"></div>

					<!-- 如果需要导航按钮 -->
					<div class="swiper-button-prev" :style="backgroundDiv" v-show="itemMdata.swiperNavigation"></div>
					<div class="swiper-button-next" :style="backgroundDiv2" v-show="itemMdata.swiperNavigation"></div>
				</div>
			</div>
		</div>

</template>

<script>
	//import swiper from './swiper.vue'
	export default {
		name: 'multiCarousel',
		components: {
			//swiper
		},
		props: ['itemMdata', "posCom", 'index'],
		created() {
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		data() {
			return {
				title: "轮播多图",
				outerVisible: false,
				swiperId: "swiper" + this.posCom + this.index,
				style: {
					width: this.itemMdata.parentStyle.width + 'px',
					height: this.itemMdata.parentStyle.height + 'px'
				},
				x: 0,
				y: 0,
				parentStyle: {

				},
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					rTitle: '编辑轮播图',
					isEdit: false
				},
				token: this.$route.query.token,
				backgroundDiv: {
					backgroundImage: 'url(' + this.itemMdata.swiperPrev.url + ')',
				},
				backgroundDiv2: {
					backgroundImage: 'url(' + this.itemMdata.swiperNext.url + ')',
				}
			}
		},
		mounted() {
			var mySwiper = new Swiper('#' + this.swiperId, {
				direction: 'horizontal',
				autoplay: {
					delay: this.itemMdata.swiperDelay,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
				loop: true,
				speed: this.itemMdata.swiperSpeed,

				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination'
				},

				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},

			})
			
			this.$nextTick(() => {
				setInterval(() => {
					phoneSwiper.phoneSwiper(this.swiperId, this.itemMdata);
				}, 300)
			})
		},
		methods: {
			

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		height: 100%;
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>