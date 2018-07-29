<template>
	<div>
		<div class="productDesEdite">
			<div class="top">
				<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
				<!--<p @click="changetype(2)" :class="{active:typenumber == 2}">展示参数</p>-->
			</div>
			<div class="detail">
				<div class="one" v-if="typenumber == 1">
					<p class="name">
						<span>模块标题：</span>
						<input type="text" v-model="itemMdata.tText" />
					</p>
					<div class="style">
						<span>模块样式：</span>
						<p @click="changeStyle(1)">
							<input type="radio" name="style" id="style1" />
							<label for="style1">产品图片</label>
						</p>
						<p @click="changeStyle(2)">
							<input type="radio" name="style" id="style2" />
							<label for="style2">产品轮播</label>
						</p>
					</div>
					<div class="color">
						<span>标题样式：</span>
						<p>
							<span>字体颜色：</span>
							<input type="text" v-model="itemMdata.nameStyle.color" />
						</p>
						<p>
							<span>字体大小：</span>
							<input type="text" v-model="itemMdata.nameStyle.fontSize" />
						</p>
					</div>
					<div class="color2">
						<span>详情样式：</span>
						<div class="fr">
							<p>
								<span>字体颜色：</span>
								<input type="text" v-model="itemMdata.textStyle.color" />
							</p>
							<p>
								<span>字体大小：</span>
								<input type="text" v-model="itemMdata.textStyle.fontSize" />
							</p>
							<p>
								<span>背景颜色：</span>
								<input type="text" v-model="itemMdata.textStyle.background" />
							</p>
						</div>
					</div>
				</div>
				<!--<div class="two" v-if="typenumber == 2">
					<input type="checkbox" checked/> <span>自定义参数顺序</span>
					<p>选择产品参数：(如果没有填写参数值，详情页将不显示该参数)</p>
					<div class="table">
						<table>
							<tr>
								<th width="60%">参数名</th>
								<th width="20%">显示</th>
								<th width="20%">操作</th>
							</tr>
							<tr v-for="(table,index) in itemMdata.productShowTable">
								<td>{{table.name}}</td>
								<td>
									<span class="yes" @click="changeyes($event,table)"></span>
									<span class="no" @click="changeno($event,table)"></span>
								</td>
								<td>
									<div class="sort">
										<span class="up" v-show="index != 0" @click="changeup(index)"></span>
										<span class="down" @click="changedown(index)"></span>
									</div>
								</td>
							</tr>
						</table>
					</div>					
				</div>	-->
			</div>
		</div>
	</div>

</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	import UE from '@/components/m/ueditor.vue'
	export default {
		name: 'productDesEdit',
		components: {
			UE,
			VueDraggableResizable,
			mImageEdit
			//	uiDialog
		},
		props: ['itemMdata', "posCom", 'index'],
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				config: {
					serverUrl: "https://jsonplaceholder.typicode.com/posts/",
					initialFrameWidth: null,
					initialFrameHeight: 180
				},
				addVisibleNav: false,
				token: this.$route.query.token,
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					isEdit: true,
					rTitle: '编辑产品详情',
				},
				marginleft: '',
				marginleft2: '',
				currentIndex: 0,
				currentIndex2: 0,
				productDesId: "productDes" + this.posCom + this.index,
				typenumber: '1',
				onenumber: '1',
				twonumber: '1',
				threenumber: '1',
				fournumber: '1',
			}
		},
		created() {
			console.log(this.itemMdata);
		},
		beforeDestroy() {
			if(this.itemMdata.isPro == false && this.typenumber == 2) {
				this.getUEContent();
			}
			console.log("beforeDestroy");
		},
		mounted() {
			//productShow.productShow1(this.productShowId);
		},
		methods: {
			changeStyle: function(i) {
				this.itemMdata.styleNum = i;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			onResize: function(x, y, width, height) {
				this.parentStyle.left = x;
				this.parentStyle.top = y;
				this.parentStyle.width = width;
				this.parentStyle.height = height;
				this.itemMdata.parentStyle = this.parentStyle;
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
	.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0;
	}
	.fr{
		float: right;
		width: 85%;
	}
	
	.productDesEdite,
	.proEdite {
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
		.one {
			box-sizing: border-box;
			height: 414px;
			padding: 20px;
			.name {
				span {
					float: left;
					width: 90px;
					text-align: right;
				}
				input {
					width: 120px;
					text-align: left;
					padding-left: 10px;
					border: 1px solid #E3E3E3;
					line-height: 30px;
				}
			}
			.style {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				span {
					float: left;
					width: 90px;
					text-align: right;
				}
				p {
					float: left;
					margin-right: 15px;
				}
			}
			.color {
				margin-top: 15px;
				clear: both;
				overflow: hidden;
				span {
					float: left;
					width: 90px;
					text-align: right;
					line-height: 30px;
				}
				p {
					float: left;
					margin-right: 15px;
					input {
						width: 100px;
						text-align: center;
						line-height: 30px;
						border: 1px solid #E3E3E3;
					}
				}
			}
			.color2 {
				margin-top: 15px;
				clear: both;
				overflow: hidden;
				span {
					float: left;
					width: 90px;
					text-align: right;
					line-height: 30px;
				}
				p {
					float: left;
					margin-right: 15px;
					input {
						width: 100px;
						text-align: center;
						line-height: 30px;
						margin-bottom: 5px;
						border: 1px solid #E3E3E3;
					}
				}
			}
		}
	}
</style>