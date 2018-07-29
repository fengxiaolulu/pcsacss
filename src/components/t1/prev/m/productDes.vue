<template>
	<div class="productDes hove_con"  @click="linkUrl" :style="parentStyle">
		<div class="productDes hove_con">		
			<div class="detail" :id="productDesId">
				<p class="borderP"><span class="borRed">{{itemMdata.tText}}</span></p>
				<div class="one" v-show="itemMdata.modelStyle ==0">
					<h3>{{itemMdata.goodsName}}</h3>
					<div class="bdsharebuttonbox" v-show="itemMdata.twonumber=='1'">
						<span style="float:left;">分享到：</span>
						
						<a href="#" class="bds_weixin" data-cmd="weixin"></a>
						
					</div>
					<div class="oneDes">
						<p v-if="itemMdata.productShowTable[0].show==true">
							<span :style="itemMdata.nameStyle">{{itemMdata.productShowTable[0].name}}：</span>
							<span :style="itemMdata.productShowTable[0].priceStyle">{{itemMdata.productShowTable[0].price}}</span>
						</p>
						<p v-if="itemMdata.productShowTable[1].show==true">
							<span :style="itemMdata.nameStyle">{{itemMdata.productShowTable[1].name}}：</span>
							<span>{{itemMdata.value4}}</span>
						</p>
					</div>
					<div class="btn" v-if="itemMdata.btnShow==true">
						<button class="pre">上一个</button>
						<button class="next">下一个</button>
					</div>
				</div>
				<div class="two" v-show="itemMdata.modelStyle ==1">
					<h3>{{itemMdata.goodsName}}</h3>
					<div class="bdsharebuttonbox" v-show="itemMdata.twonumber=='1'">
						<span style="float:left;">分享到：</span>
						
						<a href="#" class="bds_weixin" data-cmd="weixin"></a>
						
					</div>
					<div class="image">
						<div class="imgsBox">
							<img @mousedown="defaultStop($event)" :src="itemMdata.productDesList.image" class="imgs" />
							<button @click="isProEd(itemMdata)">编辑产品</button>
						</div>
						<div class="divMove">
							<i class="pre" @click="pre()"> < </i>
							<div class="imgDivList">
								<div class="moveImg" ref="moveImgOne">
									<span v-for="i in itemMdata.sibleItem" class="con_img" @mouseenter="changeImg(i)">
										<img width="100" height="100" :src="i" ref="conImgOne"/>
									</span>
								</div>
							</div>
							<i class="next" @click="next()"> > </i>
						</div>
						<div class="oneDes">
							<p v-if="itemMdata.productShowTable[0].show==true">
								<span :style="itemMdata.nameStyle">{{itemMdata.productShowTable[0].name}}：</span>
								<span :style="itemMdata.productShowTable[0].priceStyle">{{itemMdata.productShowTable[0].price}}</span>
							</p>
							<p v-if="itemMdata.productShowTable[1].show==true">
								<span :style="itemMdata.nameStyle">{{itemMdata.productShowTable[1].name}}：</span>
								<span>{{itemMdata.value4}}</span>
							</p>
						</div>
					</div>

					<div class="btn" v-if="itemMdata.btnShow==true">
						<button class="pre">上一个</button>
						<button class="next">下一个</button>
					</div>
				</div>
				<div class="three" v-show="itemMdata.modelStyle ==2">
					<div class="topDet clearfloat">
						<div class="imgLeft fl">
							<div class="imgsBox">
								<img @mousedown="defaultStop($event)" :src="itemMdata.productDesList.image" class="imgs" />
								<button @click="isProEd(itemMdata)">编辑产品</button>
							</div>

						</div>
						<div class="detRight fl">
							<p class="borderP"><span class="boldStyle">{{itemMdata.goodsName}}</span></p>
							<p v-if="itemMdata.productShowTable[0].show==true">
								<span :style="itemMdata.nameStyle">{{itemMdata.productShowTable[0].name}}：</span>
								<span :style="itemMdata.productShowTable[0].priceStyle">{{itemMdata.productShowTable[0].price}}</span>
							</p>
							<p v-if="itemMdata.productShowTable[1].show==true">
								<span :style="itemMdata.nameStyle">{{itemMdata.productShowTable[1].name}}：</span>
								<span>{{itemMdata.value4}}</span>
							</p>
						</div>
					</div>
					<div class="divMove">
						<i class="pre" @click="pre()"> < </i>
						<div class="imgDivList">
							<div class="moveImg" ref="moveImgTwo">
								<span v-for="i in itemMdata.sibleItem" class="con_img" @mouseenter="changeImg(i)">
									<img width="100" height="100" :src="i" ref="conImgTwo"/>
								</span>
							</div>
						</div>
						<i class="next" @click="next()"> > </i>
					</div>
					<div class="bdsharebuttonbox" v-show="itemMdata.twonumber=='1'">
						<span style="float:left;">分享到：</span>
						
						<a href="#" class="bds_weixin" data-cmd="weixin"></a>
						
					</div>
					<div class="btn" v-if="itemMdata.btnShow==true">
						<button class="pre">上一个</button>
						<button class="next">下一个</button>
					</div>

				</div>
				<div class="four" v-show="itemMdata.modelStyle ==3">
					<h3>{{itemMdata.goodsName}}</h3>
					<div class="topDet clearfloat">
						<div class="imgLeft fl">
							<div class="bdsharebuttonbox" v-show="itemMdata.twonumber=='1'">
								<span style="float:left;">分享到：</span>
								<a href="#" class="bds_weixin" data-cmd="weixin"></a>
								
							</div>
							<div class="imgsBox">
								<img :src="itemMdata.productDesList.image" class="imgs" />
								<button @click="isProEd(itemMdata)">编辑产品</button>
							</div>
						</div>
						<div class="detRight fl">
							<p v-if="itemMdata.productShowTable[0].show==true">
								<span :style="itemMdata.nameStyle">{{itemMdata.productShowTable[0].name}}：</span>
								<span :style="itemMdata.productShowTable[0].priceStyle">{{itemMdata.productShowTable[0].price}}</span>
							</p>
							<p v-if="itemMdata.productShowTable[1].show==true">
								<span :style="itemMdata.nameStyle">{{itemMdata.productShowTable[1].name}}：</span>
								<span>{{itemMdata.value4}}</span>
							</p>
						</div>
					</div>
					<div class="divMove">
						<i class="pre" @click="pre()"> < </i>
						<div class="imgDivList">
							<div class="moveImg" ref="moveImgThree">
								<span v-for="i in itemMdata.sibleItem" class="con_img" @mouseenter="changeImg(i)">
									<img width="100" height="100" :src="i" ref="conImgThree"/>
								</span>
							</div>
						</div>
						<i class="next" @click="next()"> > </i>
					</div>
					<div class="btn" v-if="itemMdata.btnShow==true">
						<button class="pre">上一个</button>
						<button class="next">下一个</button>
					</div>

				</div>
				<div class="five" v-show="itemMdata.modelStyle ==4">
					<div class="topDet clearfloat">
						<div class="divMove fl">
							<i class="preFive" @click="pre()"> < </i>
							<div class="imgDivList">
								<div class="moveImg" ref="moveImgFive">
									<span v-for="i in itemMdata.sibleItem" class="con_img" @mouseenter="changeImg(i)">
										<img width="100" height="100" :src="i" ref="conImgFive"/>
									</span>
								</div>
							</div>
							<i class="nextFive" @click="nextFive()"> > </i>
						</div>
						<div class="imgLeft fl">
							<div class="imgsBox">
								<img :src="itemMdata.productDesList.image" class="imgs" />
								<button @click="isProEd(itemMdata)">编辑产品</button>
							</div>
							<div class="bdsharebuttonbox" v-show="itemMdata.twonumber=='1'">
								<span style="float:left;">分享到：</span>
								<a href="javascript:viod(0)" class="bds_weixin" data-cmd="weixin"></a>
							</div>
							<div class="btn" v-if="itemMdata.btnShow==true">
								<button class="pre">上一个</button>
								<button class="next">下一个</button>
							</div>
						</div>
						<div class="detRight fl">
							<p><span class="boldStyle">{{itemMdata.goodsName}}</span></p>
							<p v-if="itemMdata.productShowTable[0].show==true">
								<span :style="itemMdata.nameStyle">{{itemMdata.productShowTable[0].name}}：</span>
								<span :style="itemMdata.productShowTable[0].priceStyle">{{itemMdata.productShowTable[0].price}}</span>
							</p>
						</div>
					</div>
					<div class="bottomDet">
						<p class="borderP"><span>{{itemMdata.baseTitle}}<i></i></span></p>
						<div class="msgDiv">
							<p v-if="itemMdata.productShowTable[1].show==true">
								<span :style="itemMdata.nameStyle">{{itemMdata.productShowTable[1].name}}：</span>
								<span class="valueB">{{itemMdata.value4}}</span>
							</p>
						</div>
						<div>
							<span v-html="itemMdata.defaultMsg"></span>
						</div>
					</div>
				</div>
				<div class="bottomDet" v-if="itemMdata.modelStyle !=4 && itemMdata.open ==true">
					<p class="borderP"><span>{{itemMdata.baseTitle}}<i></i></span></p>
					<div>
						<span v-html="itemMdata.productDesList.content"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/$ajax.js'
	//require("../../../../static/js/emit.js");
	export default {
		name: 'productDes',
		components: {
			//VueDraggableResizable,
			//uiDialog
		},
		created(){			
            this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
			this.getData();
		},
		props: ['itemMdata', "posCom", 'index'],
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				columnPictureId: "columnPicture" + this.posCom + this.index,
				token:this.$route.query.token,
				id:this.$route.query.id,
				productId:this.$route.query.productId,
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					isEdit:true,
					rTitle: '编辑产品详情'
				},
				marginleft: '',
				marginleft2: '',
				currentIndex: 0,
				currentIndex2: 0,
				lastImg:this.itemMdata.sibleItem[0],
				productDesId: "productDes" + this.posCom + this.index
			}
		},
		
		mounted() {
			
			let _this = this;
			this.$nextTick(function(){
				window._bd_share_config={
					"common":{
						"bdSnsKey":{},
						"bdText":"",
						"bdMini":"2",
						"bdPic":"",
						"bdStyle":"0",
						"bdSize":"16"
					},
					"share":{},
				};
				const s = document.createElement('script');
				s.type = 'text/javascript';
				s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
				document.body.appendChild(s);
			})
		},
		methods: {
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
			},
			changeImg(imgUrl){
				//this.itemMdata.sibleItem[this.itemMdata.sibleItem.length-1] = imgUrl;
				this.itemMdata.productDesList.image = imgUrl;
				//console.log(imgUrl)
			},
			gotolink:function(link,target){
				window.open(link,target); 
			},		
			defaultStop(){
				
			},
			isProEd(i){
				i.isEdit = true;
				i.isPro=false;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i,this.editDial);
				console.log(i.isPro)				
			},		
			getData() {
				var v = this;
				api.get('/api/data/product?token=' + this.token + '&id=' + this.productId,true,{}, function(data) {
						v.itemMdata.productDesList = data.data;
						if(v.itemMdata.sibleItem.indexOf(v.itemMdata.productDesList.image)==-1){
							v.itemMdata.sibleItem.push(v.itemMdata.productDesList.image)
						}						
						console.log(v.itemMdata.productDesList);
					}
				);
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.clearfloat:after {display: block;clear: both;content: "";visibility: hidden;height: 0;}
	.fr{float:right;}
	.fl{float:left;}
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
			span:nth-child(1){
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon{
				display: block;
				float: left;
				border-right: none;
				background: url(/static/image/bg03.png)no-repeat;
			}
			.icon i{
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
			.style{
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover{
				background-position: -60px -232px;
			}
			.style:hover i{
				display: block;
			}
			.animation{
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover{
				background-position: -372px -232px;
			}
			.animation:hover i{
				display: block;
			}
			.borderhid{
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover{
				background-position: -275px -232px;
			}
			.borderhid:hover i{
				display: block;
			}
			.delete{
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover{
				background-position: -105px -232px;
			}
			.delete:hover i{
				display: block;
			}
		}
		.detail{
			.borderP{
				border-bottom:1px solid #ccc;
				width:100%;
				margin-bottom:30px;
				.borRed{
					color:red;
					display:inline-block;
					border-bottom:1px solid red;
					padding:20px;
					font-size:18px;
				}
			}
			.oneDes{
				margin:20px 0;
				p{
					text-align:right;
					border-bottom:none;
					margin-bottom: 0;
				}
			}
			.detRight{
				width:50%;
				margin-left:30px;
				p{
					.boldStyle{
						font-size:22px;
						font-weight:bold;
					}
				}
			}
			.btn{
				margin:20px 0;
				text-align:center;
				button{
					margin-right:20px;
				}
			}
			.bottomDet{
				margin-top:30px;
				p{
					span{
						color:red;
						font-size:16px;
						display:inline-block;
						padding:10px 20px;
						border-top:2px solid red;
						border-left:1px solid red;
						border-right:1px solid red;
						position:relative;
						i{
							position:absolute;
							display:block;
							left:0;
							bottom:-1px;
							width:100%;
							height:1px;
							background:#fff;
						}
					}
				}
			}
			.imgs{
				width:400px;
				height:400px;
			}
			.imgsBox{
				position:relative;
				button{
					display:none;
					background:#ff0;
					position:absolute;
					right:0;
					bottom:0;
				}
			}
			.imgsBox:hover{
				button{
					display:block;
				}
			}
			
			.divMove{
				padding:0 10px;
				position:relative;
				width:410px;
				.pre{
					position:absolute;
					top:50%;
					left:0;
				}
				.next{
					position:absolute;
					top:50%;
					right:0;
				}
				.imgDivList{
					width:410px;
					height:96px;
					overflow:hidden;
					position:relative;
					text-align:center;
					.moveImg{
						position:absolute;
						left:0;
						top:0;
						height: 96px;
					}
					
				}
			}
			
			.two{
				.image{
					text-align:center;
					.imgsBox{
						button{
							right:33.5%;
						}
					}
					.imgs{
						width:400px;
						height:400px;
					}
					.imgDivList{
						
					}
					.oneDes p{
						text-align:center;
					}
				}
				
			}
			.three{
				.imgLeft{
					
				}
				.imgDivList{
					img{
						width:86px;
						height: 86px;
						margin:5px;
					}
					span{position:relative;display:inline-block;}
				}
			}
			.four{
				.imgDivList{
					margin-top:20px;
				}
			}
			
			h3{text-align:center;}
			.five{
				.topDet{
					.imgDivList{
						margin-right:20px;
					}
					.imgLeft{
						.btn{
							button{
								border:1px solid #ccc;
								border-radius:16px;
								padding:5px 10px;
							}
						}
					}
				}
				.bottomDet{
					.borderP{
						border:1px solid #ccc;
						span{
							display:inline-block;
							padding:10px 30px;
							color:red;
							border-right:1px solid #ccc;
							border-left:none;
							position:relative;
							i{
								position:absolute;
								top:0;
								left:0;
								display:block;
								width:100%;
								border-top:3px solid red;
							}
						}
					}
					.msgDiv{
						border:1px solid #ccc;
						p{
							span{
								background:#ddd;
								border:none;
								color:#000;
								border-right:1px solid #ccc;
							}
							.valueB{
								background:#fff;
								border-right:none;
							}
						}
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