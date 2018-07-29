<template>
	<div class="moduleAreaNav hove_con" :style="itemMdata.layoutStyle">
		<div class="moduleAreaNav_con" :style="itemMdata.layoutOuterStyle">
			<ul class="g-cf nav_i0">
				<li class="nav_lifirth" v-for="item in itemMdata.navItem">
					<div class="tit_i1">{{item.tText}}</div>
					<ul class="g-cf sec_con">
						<li v-for="second in item.secondNav">
							<div class="tit_i2">{{second.tText}}</div>
							<div class="third_con">
								<div class="third_item" v-for="third in second.thirdNav">{{third.tText}}</div>
							</div>

						</li>
					</ul>
				</li>
			</ul>
		</div>
	
	</div>
</template>

<script>
	//import uiDialog from '../uiDialog.vue'
	export default {
		name: 'moduleAreaNav',
		components: {
		//	uiDialog
		},
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata);
		},
		methods: {
			removeComponent(i) {
				this.$emit('removeComponent', i); //删除该项
			}
		},
		data() {
			return {
				title: "栏目导航",
				cons: "图片内容",
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					rTitle: '管理栏目'
				},
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.moduleAreaNav_con {}	
	.nav_i0 {
		background-color: rgb(15, 75, 143);
		li {
			float: left;
			height: 40px;
			width: 150px;
			cursor: pointer;
			text-align: center;
			color: #fff;			
			font-weight: 700;
			position: relative;
			line-height: 40px;
		}
		li:hover {
			background-color: rgb(3, 147, 218);
			.sec_con {
				display: block;
			}
		}
		.sec_con {
			top: 40px;
			left: 0;
			background-color: rgba(33, 33, 33, 0.78369140625);
			width: 150px;
			display: none;
			position: absolute;
			li:hover {
				color: #fff;
				.third_con {
					display: block;
				}
				background-color:rgb(3, 147, 218);
			}
		}
		.third_con {
			left: 150px;
			top: 0;
			width: 150px;
			display: none;
			position: absolute;
			background-color: rgba(33, 33, 33, 0.78369140625);
			.third_item:hover {
				color: #fff;
				background-color: rgb(3, 147, 218);
			}
		}
	}
</style>