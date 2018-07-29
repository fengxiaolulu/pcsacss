<template>
	<div class="photoMoreCardEdit">
		<div class="top">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">图片特效</p>
		</div>
		<div class="curMap" v-if="typenumber == 1">
			<div class="curMapTitle">
				<span>模块标题：</span>
				<input type="text" value="魔方多图" />
			</div>
			<div class="curMapCon clearfloat">
				<ul id="style" v-for="(item,idx) in this.imgSrc" @click="curMapStyle(item,idx)">
					<li>
						<div class="style_one"><img :src="item" /></div>
					</li>
				</ul>
			</div>
			<div class="addImage">
				<div class="con_ui">
					<span v-for = "i in itemMdata.sibleItem" class="con_img">
						<img width="60" height="60" :src="i" />
						<i class="hid" @click="delData(i)">X</i>
					</span>
					
				</div>
				<div class="addImgcon" @click="visibleNav()" v-if="itemMdata.sibleItem.length<1">
					<p>+</p>
					<span>添加图片</span>
				</div>
			</div>
			<div class="continueImg" @click="visibleNav()">
				<p class="fl">图片以上传<span>{{itemMdata.sibleItem.length}}</span>张</p>
				<p class="fr btnImg" v-if="itemMdata.sibleItem.length>0">+继续添加</p>
			</div>
		</div>
		<div class="curMapTwo" v-if="typenumber == 2">
			<div class="mouse">
				<p>鼠标悬停效果:</p>
				<ul>
					<li v-for="(item,idx) in bgImgs" @click="mouseenter(idx,$event)">
						<div :class="idx" :style="{background:item}" ref="idx"></div>
					</li>
				</ul>
			</div>
			<div class="effect">
				<p>特效设置</p>
				<div class="effect_info" v-if="itemMdata.mouseenterNumber == 1">
					<span>边框：</span>
					<p @click="border_hid = false">
						<input type="radio" name="mouse_one" id="default" />
						<label for="default">默认</label>
					</p>
					<p @click="border_hid = true">
						<input type="radio" name="mouse_one" id="custom" checked="checked" />
						<label for="custom">自定义</label>
					</p>
					<ul class="border_hid" v-show="border_hid">
						<li>
							<span>颜色：</span>
							<el-color-picker v-model="itemMdata.hidStyle.borderColor" size="medium"></el-color-picker>
						</li>
						<li>
							<span>宽度：</span>
							<input type="text" value="itemMdata.hidStyle.borderWidth" v-model="itemMdata.hidStyle.borderWidth" />
						</li>
						<li>
							<span>样式：</span>
							<el-select v-model="itemMdata.hidStyle.borderStyle" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</li>
					</ul>
				</div>
				<div class="effect_info" v-if="itemMdata.mouseenterNumber == 3">
					<div class="set">
						<span>背景：</span>
						<p  @click="border_hid = false">
							<input type="radio" name="set1" id="set1_1" />
							<label for="set1_1">默认</label>
						</p>
						<p  @click="border_hid = true">
							<input type="radio" name="set1" id="set1_2"  checked="checked"/>
							<label for="set1_2">自定义</label>
						</p>
						<div class=""  v-show="border_hid">
							<el-color-picker v-model="itemMdata.hidStyle.background" show-alpha size="medium"></el-color-picker>
						</div>
					</div>
					<div class="set">
						<span>对齐方式：</span>
						<p @click="itemMdata.hidStyle.textAlign = 'center'">
							<input type="radio" name="set6" id="set6_1" checked="checked" />
							<label for="set6_1">居中</label>
						</p>
						<p @click="itemMdata.hidStyle.textAlign = 'left'">
							<input type="radio" name="set6" id="set6_2" />
							<label for="set6_2">左对齐</label>
						</p>
						<p @click="itemMdata.hidStyle.textAlign = 'right'">
							<input type="radio" name="set6" id="set6_3" />
							<label for="set6_3">右对齐</label>
						</p>
					</div>
				</div>
				<div class="effect_info" v-if="itemMdata.mouseenterNumber == 4">
					<div class="set">
						<span>背景：</span>
						<p>
							<input type="radio" name="set3" id="set3_1" />
							<label for="set3_1">默认</label>
						</p>
						<p>
							<input type="radio" name="set3" id="set3_2" checked="checked" />
							<label for="set3_2">自定义</label>
						</p>
						<div class="">
							<el-color-picker v-model="itemMdata.hidStyle.background" show-alpha size="medium"></el-color-picker>
						</div>
					</div>
					<div class="set">
						<span>对齐方式：</span>
						<p @click="itemMdata.hidStyle.textAlign = 'center'">
							<input type="radio" name="set6" id="set6_1" checked="checked" />
							<label for="set6_1">居中</label>
						</p>
						<p @click="itemMdata.hidStyle.textAlign = 'left'">
							<input type="radio" name="set6" id="set6_2" />
							<label for="set6_2">左对齐</label>
						</p>
						<p @click="itemMdata.hidStyle.textAlign = 'right'">
							<input type="radio" name="set6" id="set6_3" />
							<label for="set6_3">右对齐</label>
						</p>
					</div>
				</div>
			</div>
	
		</div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">					
					<mImageEdit :itemMdata="itemMdata.mImage" v-on:recoent="recoent"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisibleNav = false">取 消</el-button>
				<el-button type="primary" @click="addVisibleNav=false">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	export default {
		name: 'photoMoreCardEdit',
		props: ['itemMdata'],
		components: {
			mImageEdit
		},
		created() {
			console.log(this.itemMdata);
		},
		methods: {
			
			mouseenter: function(number,e) {
				this.itemMdata.mouseenterNumber = number;
				var idxs = this.$refs.idx;
				for(var i=0;i<idxs.length;i++){
					if(i==number){
						idxs[i].style.border = "1px solid #58bc58";
					}else{
						idxs[i].style.border = "1px solid #fff";
					}
					
				}
				
			},
			changetype: function(number) {
				this.typenumber = number
			},
			delData(itemImg){
				this.itemMdata.sibleItem.splice(this.itemMdata.sibleItem.indexOf(itemImg), 1);
				this.itemMdata.imgItem.splice(this.itemMdata.imgItem.indexOf(itemImg), 1);
			},
			beforeRemoveImg(flag) {
				if(flag == "layoutStyle") {
					this.itemMdata.layoutStyle.backgroundImage = '';
					this.itemMdata.mImage0.url = "";
				} else {
					this.itemMdata.layoutOuterStyle.backgroundImage = '';
					this.itemMdata.mImage1.url = "";
				}
			},
			visibleNav() {				
				this.addVisibleNav = true;
				console.log("ssd");
			},
			recoent(i) {			
				this.itemMdata.sibleItem.push(i.url);
				for(var i = 0;this.itemMdata.sibleItem.length>i;i++){
					this.itemMdata.imgItem[i] = this.itemMdata.sibleItem[i];										
				}
				console.log("ddssss");
				//console.log(this.itemMdata.imgItem);
				
			},
			curMapStyle(item, idx) {
				this.itemMdata.styleLayout = idx;

			}
		},
		data() {
			return {
				title: "魔方多图",
				cons: "图片内容",
				addVisibleNav: false,
				typenumber:'1',
				//sibleItem:[],
				bgImgs:['url(/static/image/mbg02.png)no-repeat -416px 1px',
				'url(/static/image/mbg02.png)no-repeat -416px -117px',
				'url(/static/image/mbg02.png)no-repeat -416px -233px',
				'url(/static/image/mbg02.png)no-repeat -416px -349px',
				'url(/static/image/mbg02.png)no-repeat -413px -465px',
				'url(/static/image/mbg02.png)no-repeat -416px -581px',
				'url(/static/image/mbg02.png)no-repeat -416px -697px',
				'url(/static/image/mbg02.png)no-repeat -416px -813px'],
				border_hid: true,
				options: [{
					value: 'solid',
					label: '————'
				}, {
					value: 'dashed',
					label: '············'
				}, {
					value: 'dotted',
					label: '------------'
				}],
				imgSrc: ['../../../../static/image/cubeMap1.jpg', '../../../../static/image/cubeMap2.jpg', '../../../../static/image/cubeMap3.jpg', '../../../../static/image/cubeMap4.jpg', '../../../../static/image/cubeMap5.jpg', '../../../../static/image/cubeMap6.jpg', '../../../../static/image/cubeMap7.jpg', '../../../../static/image/cubeMap8.jpg', '../../../../static/image/cubeMap9.jpg', '../../../../static/image/cubeMap10.jpg', '../../../../static/image/cubeMap12.jpg', '../../../../static/image/cubeMap11.jpg'],

			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
	.photoMoreCardEdit{
		.top {
			clear: both;
			overflow: hidden;
			padding-left: 10px;
			background: #F5F5F5;
			border-bottom: 1px solid #CCCCCC;
			p {
				float: left;
				padding: 0 15px;
				line-height: 35px;
				border: 1px solid #E3E3E3;
			}
			.active {
				background: #FFFFFF;
				color: #409EFF;
			}
		}
		.effect {
			margin-top: 20px;
			.effect_info {
				span {
					float: left;
					width: 80px;
					text-align: right;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.set {
					clear: both;
					overflow: hidden;
					margin-top: 10px;
				}
				.border_hid {
					clear: both;
					overflow: hidden;
					li {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						input {
							border: 1px solid #E3E3E3;
							line-height: 30px;
							text-align: center;
							width: 70px;
						}
					}
				}
				.table {
					height: 185px;
					overflow: auto;
					border: 1px solid #e7ecf0;
					margin-top: 10px;
					table {
						width: 100%;
						tr {
							th {
								line-height: 40px;
								background: #f8f9fb;
								text-align: center;
							}
							td {
								text-align: center;
								padding: 8px;
								img {
									max-width: 30%;
									height: 50px;
								}
								.edit {
									display: block;
									width: 20px;
									height: 20px;
									background: url(/static/image/mbg01.png)no-repeat;
									background-position: -957px -4px;
									margin-left: 40%;
									margin-top: 5px;
								}
							}
						}
						tr:nth-child(2n-1) {
							background: #f8f9fb;
						}
					}
				}
			}
		}
	}
	
	.con_ui {
		
		span{
			float: left;
			position:relative;
			.hid{
				display:none;
				position:absolute;
				top:0;
				right:10px;
				color:red;
			}
		}
		span:hover .hid{display:inline-block;}
		
	}
	.curMap {
		.curMapTitle {
			padding: 10px 0 10px 30px;
			text-align: left;
			span {}
			input {
				border: 1px solid #ccc;
				padding-left: 5px;
			}
		}
		.curMapCon {
			width: 90%;
			margin: 0 auto;
			overflow-x: hidden;
			height: 270px;
			border: 1px solid #ccc;
			#style {
				li {
					float: left;
					margin: 10px;
				}
			}
		}
	}
	.curMapTwo{
		height:400px;
		margin:10px;
		overflow-x:hidden;
		.mouse{
			p{
				padding:10px 0;
			}
			ul{
				clear:both;
				overflow:hidden;
				li{
					float:left;
					div{
						width:113px;
						height:93px;
						margin-right:6px;
						margin-bottom:10px;
						border:1px solid #fff;
					}
				}
				li:hover div{
					border:1px solid #ff0;
				}
			}
		}
	}
	.addImage {
		height: 62px;
		width: 587px;
		border: 1px solid #ccc;
		margin: 0 auto;
		margin-top: 10px;
		overflow-x: hidden;
		text-align:center;
		.con_ui{
			img{
				margin-right:10px;
			}
		}
		.addImgcon {
			height: 80px;
			width: 80px;
			border: 1px dotted #ccc;
			margin: 10px;
			color: #ccc;
			p {
				font-size: 30px;
			}
		}
	}
	
	.continueImg {
		height: 12px;
		width: 587px;
		margin: 0 auto;
		padding: 10px 0;
		.btnImg {
			border: 1px solid #ccc;
			padding: 5px;
		}
	}
	
	.button {
		text-align: center;
	}
	
	button {
		padding: 3px 6px;
		color: #fff;
		background-color: rgb(52, 182, 253);
	}
</style>