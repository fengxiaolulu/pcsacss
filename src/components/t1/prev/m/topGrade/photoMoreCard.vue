<template>
	<div class="photoMoreCard">
		<div class="mCon hove_con" :style="parentStyle" :id="photoMoreCardId">
			<div class="styleone clearfloat" v-if="itemMdata.styleLayout == 0">
				<div class="oneLeft fl positionR">
					<img :src="itemMdata.imgItem[0]" />
					<div class="hid" :style="itemMdata.hidStyle" ref="hid">
						<i></i>
					</div>
				</div>
				<div class="oneRight">
					<div class="oneRTop positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="oneRBottom">
						<div class="oneBLeft fl positionR">
							<img :src="itemMdata.imgItem[2]" />
							<div class="hid" :style="itemMdata.hidStyle">
								<i></i>
							</div>
						</div>
						<div class="oneBRight positionR">
							<img :src="itemMdata.imgItem[3]" />
							<div class="hid" :style="itemMdata.hidStyle">
								<i></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="styletwo clearfloat" v-if="itemMdata.styleLayout == 1">
				<div class="oneLeft fl positionR">
					<img :src="itemMdata.imgItem[0]" />
					<div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
				</div>
				<div class="oneRight">
					<div class="oneRTop">
						<div class="oneBLeft fl positionR">
							<img :src="itemMdata.imgItem[1]" />
							<div class="hid" :style="itemMdata.hidStyle">
								<i></i>
							</div>
						</div>
						<div class="oneBRight positionR">
							<img :src="itemMdata.imgItem[2]" />
							<div class="hid" :style="itemMdata.hidStyle">
								<i></i>
							</div>
						</div>
					</div>
					<div class="oneRBottom positionR"><img :src="itemMdata.imgItem[3]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>

				</div>
			</div>
			<div class="stylethree clearfloat" v-if="itemMdata.styleLayout == 2">
				<div class="oneLeft fl positionR">
					<img :src="itemMdata.imgItem[0]" />
					<div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
				</div>
				<div class="oneCenter fl">
					<div class="oneCTop three threeMargin positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="oneCBottom three positionR">
						<img :src="itemMdata.imgItem[2]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="threeRight fr">
					<div class="threeRTop three threeMargin positionR">
						<img :src="itemMdata.imgItem[3]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="threeRBottom three positionR">
						<img :src="itemMdata.imgItem[4]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
			</div>
			<div class="stylefour" v-if="itemMdata.styleLayout == 3">
				<div class="fourTop  clearfloat">
					<div class="fourTLeft fl positionR">
						<img :src="itemMdata.imgItem[0]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="fourTRight fr positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="fourBottom  clearfloat">
					<div class="fourB fl w33 positionR">
						<img :src="itemMdata.imgItem[2]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="fourB fl positionR">
						<img :src="itemMdata.imgItem[3]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="fourB fr positionR">
						<img :src="itemMdata.imgItem[4]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
			</div>
			<div class="stylefive" v-if="itemMdata.styleLayout == 4">
				<div class="fourTop  clearfloat">
					<div class="fourTRight fl positionR">
						<img :src="itemMdata.imgItem[0]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="fourTLeft fr positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="fourBottom  clearfloat">
					<div class="fourB fl positionR">
						<img :src="itemMdata.imgItem[2]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="fourB fl positionR">
						<img :src="itemMdata.imgItem[3]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="fourB fr w33 positionR">
						<img :src="itemMdata.imgItem[4]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
			</div>
			<div class="stylesix" v-if="itemMdata.styleLayout == 5">
				<div class="fourBottom  clearfloat">
					<div class="sixB fl positionR">
						<img :src="itemMdata.imgItem[0]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sixB fl positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sixB fr positionR">
						<img :src="itemMdata.imgItem[2]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="fourTop  clearfloat">
					<div class="fourTRight fl positionR">
						<img :src="itemMdata.imgItem[3]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="fourTLeft fr positionR">
						<img :src="itemMdata.imgItem[4]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
			</div>
			<div class="styleseven" v-if="itemMdata.styleLayout == 6">
				<div class="sevenTop clearfloat">
					<div class="sevenT fl positionR">
						<img :src="itemMdata.imgItem[0]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sevenT fl positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sevenT fl positionR">
						<img :src="itemMdata.imgItem[2]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sevenT fr positionR">
						<img :src="itemMdata.imgItem[3]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="sevenBottom clearfloat">
					<div class="sevenB fl positionR">
						<img :src="itemMdata.imgItem[4]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sevenB fl positionR">
						<img :src="itemMdata.imgItem[5]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sevenB fr positionR">
						<img :src="itemMdata.imgItem[6]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
			</div>
			<div class="styleeight" v-if="itemMdata.styleLayout == 7">
				<div class="fourBottom  clearfloat">
					<div class="sixB fl positionR">
						<img :src="itemMdata.imgItem[0]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sixB fl positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sixB fr positionR">
						<img :src="itemMdata.imgItem[2]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="fourTop  clearfloat">
					<div class="eightTRight fl positionR">
						<img :src="itemMdata.imgItem[3]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="eightTRight fr positionR">
						<img :src="itemMdata.imgItem[4]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>

			</div>
			<div class="stylenight" v-if="itemMdata.styleLayout == 8">

				<div class="fourTop  clearfloat">
					<div class="eightTRight fl positionR">
						<img :src="itemMdata.imgItem[0]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="eightTRight fr positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="fourBottom  clearfloat">
					<div class="sixB fl positionR">
						<img :src="itemMdata.imgItem[2]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sixB fl positionR">
						<img :src="itemMdata.imgItem[3]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="sixB fr positionR">
						<img :src="itemMdata.imgItem[4]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
			</div>
			<div class="styleten" v-if="itemMdata.styleLayout == 9">
				<div class="fourBottom clearfloat">
					<div class="eightTRight fl  positionR">
						<img :src="itemMdata.imgItem[0]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="eightTRight fr positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="fourTop">
					<div class="tenB positionR">
						<img :src="itemMdata.imgItem[2]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
			</div>
			<div class="styleeleven" v-if="itemMdata.styleLayout == 10">
				<div class="elevenTop clearfloat">
					<div class="elevenT fl positionR">
						<img :src="itemMdata.imgItem[0]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="elevenT fl positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="elevenT fr positionR">
						<img :src="itemMdata.imgItem[2]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="elevenBottom clearfloat">
					<div class="elevenT fl positionR">
						<img :src="itemMdata.imgItem[3]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="elevenT fl positionR">
						<img :src="itemMdata.imgItem[4]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="elevenT fr positionR">
						<img :src="itemMdata.imgItem[5]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>

			</div>
			<div class="styletwelfth" v-if="itemMdata.styleLayout == 11">
				<div class="twelfthTop clearfloat">
					<div class="twelfthT fl positionR">
						<img :src="itemMdata.imgItem[0]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="twelfthT fr positionR">
						<img :src="itemMdata.imgItem[1]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="twelfthBottom clearfloat">
					<div class="twelfthT fl positionR">
						<img :src="itemMdata.imgItem[2]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="twelfthT fr positionR">
						<img :src="itemMdata.imgItem[3]" />
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'articleScrap',
		props: ['itemMdata','index'],
		created() {
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
		},
		methods: {
		},
		data() {
			return {
				parentStyle: {},
				photoMoreCardId:'photoMoreCardId'+this.index,
			}
		},
		mounted(){
			hoverAction.photoMoreCard(this.itemMdata,this.photoMoreCardId)
		}
		
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
	
	.photoMoreCard,.styleone,.styletwo,
		.stylethree,
		.stylefour,
		.stylefive,
		.stylesix,
		.styleseven,
		.styleeight,
		.stylenight,
		.styleten,
		.styleeleven {
		height: 100%;
		width: 100%;				
	}
	
	.photoMoreCard .styletwelfth {
		width: 100%;
		height: 100%;
	}
	
	.photoMoreCard .oneLeft {
		width: 33%;
		height: 100%;
	}
	
	.photoMoreCard .oneRight {
		float: right;
		width: 66%;
		height: 100%;
	}
	
	.photoMoreCard .oneRTop {
		height: 59%;
		margin-bottom: 1%;
	}
	
	.photoMoreCard .oneRBottom {
		height: 39%;
	}
	
	.photoMoreCard img {
		height: 100%;
		width: 100%;
	}
	
	.oneBLeft {
		width: 49.5%;
		height: 100%;
	}
	
	.oneBRight {
		width: 49%;
		height: 100%;
		float: right;
	}
	
	.oneCenter {
		width: 37%;
		margin: 0 1%;
		height: 100%;
	}
	
	.threeRight {
		width: 28%;
		height: 100%;
	}
	
	.three {
		height: 49%;
	}
	
	.threeMargin {
		margin-bottom: 2%;
	}
	
	.fourTop {
		height: 60%;
	}
	
	.fourTLeft {
		width: 33%;
		height: 100%;
	}
	
	.fourTRight {
		width: 66%;
		height: 100%;
	}
	
	.fourBottom {
		height: 38%;
	}
	
	.fourB {
		width: 32.5%;
		height: 100%;
		margin: 1% 1% 0 0;
	}
	
	.w33 {
		width: 33%;
	}
	
	.fourB.fr {
		margin-right: 0;
	}
	
	.sixB:last-child {
		width: 33%;
	}
	
	.sixB {
		width: 32.5%;
		height: 100%;
		margin: 0 1% 1% 0;
	}
	
	.sixB.fr {
		margin-right: 0;
	}
	
	.sevenTop {
		height: 50%;
		.sevenT {
			height: 100%;
			width: 24%;
			margin-right: 1%;
		}
		.sevenT:last-child {
			margin-right: 0;
			width: 25%;
		}
	}
	
	.sevenBottom {
		margin-top: 1%;
		height: 49%;
		.sevenB {
			height: 100%;
			width: 24%;
		}
		.sevenB:first-child {
			width: 49%;
			margin-right: 1%;
		}
		.sevenB:last-child {
			width: 25%;
		}
	}
	
	.eightTRight {
		width: 49%;
		height: 100%;
	}
	
	.eightTRight:first-child {
		width: 50%;
	}
	
	.stylenight {
		.fourBottom {
			.sixB {
				margin: 1% 1% 0 0;
			}
			.sixB.fr {
				margin-right: 0;
			}
		}
	}
	
	.tenB {
		width: 100%;
		height: 100%;
	}
	
	.elevenTop,
	.twelfthTop {
		height: 49%;
		margin-bottom: 1%;
		.elevenT:first-child {
			width: 43%;
		}
		.elevenT {
			height: 100%;
			width: 30%;
			margin-right: 1%;
		}
		.elevenT:last-child {
			width: 25%;
			margin-right: 0;
		}
		.twelfthT {
			height: 100%;
			width: 60%;
			margin-right: 1%;
		}
		.twelfthT:last-child {
			width: 39%;
			margin-right: 0;
		}
	}
	
	.elevenBottom,
	.twelfthBottom {
		height: 50%;
		.elevenT:first-child {
			width: 25%;
		}
		.elevenT {
			height: 100%;
			width: 30%;
			margin-right: 1%;
		}
		.elevenT:last-child {
			width: 43%;
			margin-right: 0;
		}
		.twelfthT {
			height: 100%;
			width: 39%;
			margin-right: 1%;
		}
		.twelfthT:last-child {
			width: 60%;
			margin-right: 0;
		}
	}
</style>