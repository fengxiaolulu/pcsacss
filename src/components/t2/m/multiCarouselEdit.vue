<template>
	<div class="carEdit">
		<ul class="left">
			<li @click="changetype(1)" :class="{active:typenumber == 1}">常规</li>
			<li @click="changetype(2)" :class="{active:typenumber == 2}">轮播设置</li>
		</ul>
		<div class="right">
			<div class="one" v-if="typenumber == 1">
				<div class="speed">
					<p>滚动速度：</p>
					<input type="number" value="itemMdata.swiperSpeed" v-model.number="itemMdata.swiperSpeed" />
				</div>
				<div class="time">
					<p>间隔时间：</p>
					<input type="number" value="itemMdata.swiperDelay" v-model.number="itemMdata.swiperDelay" />
				</div>
				<div class="page">
					<p>分页器：</p>
					<p @click="itemMdata.swiperPagination=true">
						<label for="pagination1">显示</label>
						<input type="radio" id="pagination1" name="pagination" :checked="itemMdata.swiperPagination == true" />
					</p>
					<p @click="itemMdata.swiperPagination=false">
						<label for="pagination2">隐藏</label>
						<input type="radio" id="pagination2" name="pagination" :checked="itemMdata.swiperPagination == false" />
					</p>
					<div class="page_hid">
						<p class="title">默认样式：</p>
						<p>
							<span>宽：</span>
							<input type="text" value="itemMdata.PaginationStyle.width" v-model="itemMdata.PaginationStyle.width" />
						</p>
						<p>
							<span>高：</span>
							<input type="text" value="itemMdata.PaginationStyle.height" v-model="itemMdata.PaginationStyle.height" />
						</p>
						<p>
							<span>背景颜色：</span>
							<input type="text" value="itemMdata.PaginationStyle.background" v-model="itemMdata.PaginationStyle.background" />
						</p>
						<p>
							<span>边框颜色：</span>
							<input type="text" value="itemMdata.PaginationStyle.borderColor" v-model="itemMdata.PaginationStyle.borderColor" />
						</p>
						<p>
							<span>边框宽度：</span>
							<input type="text" value="itemMdata.PaginationStyle.borderWidth" v-model="itemMdata.PaginationStyle.borderWidth" />
						</p>
						<p>
							<span>弧度：</span>
							<input type="text" value="itemMdata.PaginationStyle.borderRadius" v-model="itemMdata.PaginationStyle.borderRadius" />
						</p>
						<p class="title">当前样式：</p>
						<p>
							<span>宽：</span>
							<input type="text" value="itemMdata.PaginationActive.width" v-model="itemMdata.PaginationActive.width" />
						</p>
						<p>
							<span>高：</span>
							<input type="text" value="itemMdata.PaginationActive.height" v-model="itemMdata.PaginationActive.height" />
						</p>
						<p>
							<span>背景颜色：</span>
							<input type="text" value="itemMdata.PaginationActive.background" v-model="itemMdata.PaginationActive.background" />
						</p>
						<p>
							<span>边框颜色：</span>
							<input type="text" value="itemMdata.PaginationActive.borderColor" v-model="itemMdata.PaginationActive.borderColor" />
						</p>
						<p>
							<span>边框宽度：</span>
							<input type="text" value="itemMdata.PaginationActive.borderWidth" v-model="itemMdata.PaginationActive.borderWidth" />
						</p>
						<p>
							<span>弧度：</span>
							<input type="text" value="itemMdata.PaginationActive.borderRadius" v-model="itemMdata.PaginationActive.borderRadius" />
						</p>
					</div>
				</div>
				<div class="nav">
					<p>导航按钮：</p>
					<p @click="itemMdata.swiperNavigation=true">
						<label for="navigation1">显示</label>
						<input type="radio" id="navigation1" name="navigation" :checked="itemMdata.swiperNavigation == true" />
					</p>
					<p @click="itemMdata.swiperNavigation=false">
						<label for="navigation2">隐藏</label>
						<input type="radio" id="navigation2" name="navigation" :checked="itemMdata.swiperNavigation == false" />
					</p>
					<div class="nav_hid">
						<p>更改按钮：</p>
						<p class="btn" @click="vbgFun(1)">左边</p>
						<p class="btn" @click="vbgFun(2)">右边</p>
					</div>
				</div>
			</div>
			<div class="two" v-if="typenumber == 2">
				<table>
					<tr>
						<th width="40%">图片</th>
						<th width="30%">页数</th>
						<th width="30%">操作</th>
					</tr>
					<tr v-for="(itemr,index) in itemMdata.slideList">
						<td>
							<img @click="mDataSelt(itemr,index)" :src="itemr.image" :alt="itemr.name" />
						</td>
						<td>
							<p>第{{index+1}}页</p>
						</td>
						<td>
							<p class="edit" @click="imgedit(item)"></p>
						</td>
					</tr>
				</table>
				<uiLink :itemMdata='itemImge' :editDial="editDial"></uiLink>
			</div>
		</div>
		<el-dialog title="添加图片" :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" :itemMdata="itemMdata.swiperPrev"></mImageEdit>
					<mImageEdit v-if="flag==2" :itemMdata="itemMdata.swiperNext"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisibleNav = false">取 消</el-button>
				<el-button type="primary" @click="addVisibleFun()">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import uiLink from './uiLink.vue'
	import mImageEdit from './mImageEdit.vue'
	export default {
		name: 'multiCarouselEdit',
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata);
		},
		components: {
			uiLink,
			mImageEdit
		},
		data() {
			return {
				title: "编辑轮播多图",
				typenumber: '1',
				editDial: {
					artTitle: "设置链接地址",
					setlink: false
				},
				item: [],
				fileList2: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
				img_edit: false,
				flag: false,
				itemIndex: 0,
				addVisibleNav: false,
				token: this.$route.query.token
			}
		},
		methods: {
			changetype: function(number) {
				this.typenumber = number
			},
			selctCurFun(item, index) {
				for(var g = 0; g < this.selctCur.length; g++) {
					this.selctCur[g].cur = false;
				}
				item.cur = true;
				this.itemMdata.curIndex = index;
				console.log(item);
			},
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
				//console.log(flag)
			},
			addVisibleFun() {
				this.addVisibleNav = false;
			},
			mDataSelt(i, index) {
				this.itemIndex = index;
				this.itemImge = i;
				this.flag = true;
			},
			recoent(itemImg) {
				//if(this.editDial.parentStyle.width < itemImg.width) {
				this.itemMdata.parentStyle.width = itemImg.width;
				this.itemMdata.parentStyle.height = itemImg.height;
				//console.log("itemImg");
				//}
				//	this.itemMdata.isShow = false;
				//	this.itemMdata.slideList[this.itemIndex].image=itemImg.url;
				//}		
				var ts = this;
				setTimeout(function() {
					//	ts.itemMdata.isShow = true;
				}, 200);
				console.log(this.itemMdata.slideList);
			},
			imgedit: function(i) {
				this.itemImge = i;
				this.editDial.setlink = true;
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.carEdit {
		clear: both;
		overflow: hidden;
		.left {
			display: block;
			float: left;
			width: 15%;
			height: 530px;
			border-right: 1px solid #CCCCCC;
			li {
				box-sizing: border-box;
				width: 100%;
				height: 60px;
				line-height: 60px;
				padding-left: 35px;
			}
			li:nth-child(1),
			li:nth-child(2) {
				border-bottom: 1px solid #CCCCCC;
			}
			.active {
				width: 144px;
				border-bottom: 1px solid #CCCCCC;
				border-left: 5px solid #409EFF;
				border-right: 1px solid #FFFFFF;
				color: #409EFF;
			}
		}
		.right {
			position: relative;
			box-sizing: border-box;
			float: left;
			width: 84.8%;
			height: 530px;
			padding: 30px;
			.one .speed {
				clear: both;
				overflow: hidden;
				line-height: 30px;
				p {
					float: left;
				}
				input {
					height: 30px;
					width: 200px;
					padding-left: 10px;
					border: 1px solid #E3E3E3;
				}
			}
			.one .time {
				clear: both;
				overflow: hidden;
				line-height: 30px;
				margin-top: 15px;
				p {
					float: left;
				}
				input {
					height: 30px;
					width: 200px;
					padding-left: 10px;
					border: 1px solid #E3E3E3;
				}
			}
			.one .page {
				clear: both;
				overflow: hidden;
				line-height: 30px;
				margin-top: 15px;
				p {
					float: left;
					label {
						margin-left: 10px;
					}
				}
				.page_hid {
					clear: both;
					overflow: hidden;
					.title {
						float: none;
						clear: both;
						overflow: hidden;
						font-weight: bold;
					}
					p{
						margin-left: 15px;
						margin-bottom: 10px;
						input{
							border: 1px solid #E3E3E3;
							width: 70px;
							text-align: center;
							line-height: 30px;
						}
					}
				}
			}
			.one .nav {
				clear: both;
				overflow: hidden;
				line-height: 30px;
				margin-top: 15px;
				p {
					float: left;
					label {
						margin-left: 10px;
					}
				}
				.nav_hid {
					clear: both;
					overflow: hidden;
					margin-top: 35px;
					p{
						float: left;
					}
					.btn{
						background: #409EFF;
						color: #FFFFFF;
						text-align: center;
						border-radius: 5px;
						width: 80px;
						line-height: 30px;
						margin-left: 15px;
					}
				}
			}
			.two table {
				width: 100%;
				border: 1px solid #E3E3E3;
				th {
					background: #f8f9fb;
					height: 45px;
				}
				td {
					text-align: center;
					padding: 15px 0;
					img {
						max-width: 60%;
						height: 50px;
					}
					.edit {
						width: 20px;
						height: 20px;
						background-image: url(../../../../static/image/mbg01.png);
						background-repeat: no-repeat;
						background-position: -405px -60px;
						margin-left: 45%;
						cursor: pointer;
					}
				}
				tr:nth-child(2n-1) {
					background: #f8f9fb;
				}
			}
			.two .img_edit {
				position: absolute;
				top: 50px;
				left: 90px;
				right: 90px;
				bottom: 20px;
				background: #FFFFFF;
				box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.2);
				border-radius: 5px;
				.top {
					border-bottom: 1px solid #E3E3E3;
					padding: 10px 15px;
					clear: both;
					overflow: hidden;
					p:nth-child(1) {
						float: left;
						font-size: 16px;
					}
					p:nth-child(2) {
						float: right;
						font-size: 16px;
					}
				}
				.upload-demo {
					padding: 25px;
				}
			}
			.three .list {
				clear: both;
				overflow: hidden;
				margin-top: 20px;
				p {
					float: left;
					margin-right: 15px;
				}
				.border_hid {
					float: left;
					margin-top: 40px;
					margin-left: -50px;
					p {
						float: none;
						margin-bottom: 10px;
						input {
							border: 1px solid #E3E3E3;
							padding-left: 10px;
							line-height: 35px;
						}
						span {
							float: left;
						}
					}
					.block {
						float: left;
					}
				}
			}
		}
	}
</style>