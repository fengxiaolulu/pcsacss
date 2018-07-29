<template>
	
		<div class="phoneedit productDesP swiper hove_con">
			
			<div class="detail" :id="productDesId">
				<div class="top">
					<p>
						<span class="name" :style="itemMdata.nameStyle">{{itemMdata.productDesList.name}}</span>
						<span class="time">{{itemMdata.productDesList.add_time}}</span>
					</p>
					<div class="img" v-if="itemMdata.styleNum == 1">
						<img style="width: 100%;" :src="itemMdata.productDesList.image" />
					</div>
					<div v-if="itemMdata.styleNum == 2">
						<!--<swiper class="swiper-container" swipeid="swipe" ref="swiper" :speed="600" effect="slide" :pagination="true">
							<div v-for="(list,index) in itemMdata.productDesList.image_url" :key="index" class="swiper-slide" slot="swiper-con">
								<img @mousedown="defaultStop($event)" :src="list" />
							</div>
						</swiper>-->
						<div class="swiper-container" :id="this.productSwiper">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="(list,index) in itemMdata.productDesList.image_url" :key="index">
									<img @mousedown="defaultStop($event)" :src="list">
								</div>
							</div>
							<!-- 如果需要分页器 -->
							<div class="swiper-pagination"></div>

							<!-- 如果需要导航按钮 -->
							<div class="swiper-button-prev"></div>
							<div class="swiper-button-next"></div>

						</div>
					</div>
				</div>
				<div class="text">
					<p class="p1" :style="itemMdata.textStyle">产品详情</p>
					<div v-html="itemMdata.productDesList.content"></div>
				</div>
				<div class="buttom">
					<p>
						<span>上一个：</span>
						<a href="">{{itemMdata.productList[orderPrev].name}}</a>
					</p>
					<p>
						<span>下一个：</span>
						<a href="">{{itemMdata.productList[orderNext].name}}</a>
					</p>
				</div>
			</div>
		</div>
	
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	export default {
		name: 'productDes',
		components: {
			VueDraggableResizable
			//	uiDialog
		},
		created() {
			console.log(this.itemMdata);
			this.getData();
		},
		props: ['itemMdata', "posCom", 'index'],
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				token: this.$route.query.token,
				productId: this.$route.query.productId,
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					isEdit: true,
					rTitle: '编辑产品详情',
				},
				productDesId: "productDes" + this.posCom + this.index,
				productSwiper: "product" + this.posCom + this.index,
				orderPrev: '',
				orderNext: ''
			}
		},
		mounted() {
			var mySwiper = new Swiper('#' + this.productSwiper, {
				direction: 'horizontal',
				autoplay: {
					delay: 2000,
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

			})
		},
		methods: {
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},
			delModule(i) {
				this.$emit('delModule', i);
			},
			isFuncur(i) {
				i.isEdit = true;
				i.isPro = true;
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
			getData() {
				var v = this;
				api.get('/api/data/product?token=' + this.token + '&id=' + this.productId, true, {}, function(data) {
					v.itemMdata.productDesList = data.data;
				});

				api.get('/api/data/productList?token=' + this.token, true, {}, function(data) {
					//var result = JSON.stringify(data); //json对象转成字符串
					v.itemMdata.productList = data.data;
					for(var i = 0; i < v.itemMdata.productList.length; i++) {
						if(v.itemMdata.productList[i].id == v.itemMdata.productDesList.id) {
							v.orderPrev = i - 1;
							v.orderNext = i + 1;
							
							if (i == 0) {
								v.orderPrev = 0;
							}
							if (i == v.itemMdata.productList.length-1) {
								v.orderNext = i;
							}
						}						
					};					
					console.log(v.orderPrev);
				});
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
	
</style>