<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" v-on:dragging="onDrag" :parent="itemMdata.parent" :active.sync="itemMdata.parentStyle.active" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit productDesP swiper hove_con">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑产品详情</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span
				<span class="icon style" @click="isProEd(itemMdata)"><i>设置样式</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
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
	</vue-draggable-resizable>
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
				api.get('/api/data/product?token=' + this.token + '&id=' + this.productId, false, {}, function(data) {
					v.itemMdata.productDesList = data.data;
				});

				api.get('/api/data/productList?token=' + this.token, false, {}, function(data) {
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
					//console.log(v.orderPrev);
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
	.hove_con {
		position: relative;
		height: 100%;
		.edit_con {
			position: absolute;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.2);
			padding: 0 15px;
			top: -40px;
			width: auto;
			height: 40px;
			line-height: 40px;
			display: none;
			span {
				float: left;
				cursor: pointer;
				border-right: 1px solid #E3E3E3;
				margin: 0 8px;
			}
			span:nth-child(1) {
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon {
				display: block;
				float: left;
				border-right: none;
				background: url(/static/image/bg03.png)no-repeat;
			}
			.icon i {
				position: absolute;
				display: block;
				font-size: 12px;
				width: auto;
				line-height: 25px;
				padding: 0px 10px;
				background: #FFFFFF;
				border-radius: 5px;
				box-shadow: 0 1px 4px 2px rgba(0, 0, 0, 0.1);
				top: -23px;
				margin-left: -25px;
				display: none;
			}
			.style {
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover {
				background-position: -60px -232px;
			}
			.style:hover i {
				display: block;
			}
			.animation {
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover {
				background-position: -372px -232px;
			}
			.animation:hover i {
				display: block;
			}
			.borderhid {
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover {
				background-position: -275px -232px;
			}
			.borderhid:hover i {
				display: block;
			}
			.delete {
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover {
				background-position: -105px -232px;
			}
			.delete:hover i {
				display: block;
			}
		}
		.detail {
			clear: both;
			overflow: hidden;
			.top {
				box-sizing: border-box;
				padding: 10px;
				width: 100%;
				text-align: center;
				p {
					span {
						display: block;
						line-height: 1.6;
					}
					.name {
						font-weight: bold;
					}
					.time {
						color: #888;
						font-size: 13px;
					}
				}
				img {
					margin-top: 10px;
				}
			}
			.text {
				box-sizing: border-box;
				padding: 10px;
				.p1 {
					line-height: 1.8;
					padding-left: 10px;
					margin-bottom: 10px;
					margin-top: 5px;
				}
			}
			.buttom {
				clear: both;
				overflow: hidden;
				margin: 15px 10px;
				p {
					line-height: 30px;
					color: #666666;
					a {
						color: #666666;
						text-decoration: none;
					}
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