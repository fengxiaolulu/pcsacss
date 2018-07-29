<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :z="itemMdata.parentStyle.zIndex" :active.sync="itemMdata.parentStyle.active" :y="itemMdata.parentStyle.top" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit swiper hove_con">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">编辑轮播多图</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail">
				<!--<swiper class="swiper-container" swipeid="swipe" ref="swiper" :speed="600" effect="slide" :pagination="true">
					<div v-for="(list,index) in itemMdata.slideList" :key="index" class="swiper-slide" slot="swiper-con">
						<img @mousedown="defaultStop($event)" :src="list.image">
					</div>
				</swiper>-->
				<div class="swiper-container" :id="swiperId">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(list,index) in itemMdata.slideList" :key="index">
							<img @mousedown="defaultStop($event)" :src="list.image">
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
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	export default {
		name: 'multiCarousel',
		components: {
			VueDraggableResizable,
			//swiper
		},
		props: ['itemMdata', "posCom", 'index'],
		created() {
			//console.log(this.thisSW);
			this.getData();
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
			getData() {
				var v = this;			
				api.get('/api/data/bannerList?token=' +this.$route.query.token + '&type=2', true, {}, function(data) {
					//var result = JSON.stringify(data); //json对象转成字符串
					v.itemMdata.slideList = data.data;
					//$("#text").val(result);
				});
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			defaultStop(e) {
				e.preventDefault();
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
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}

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