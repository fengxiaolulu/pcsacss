<template>
	<div class="fullScreen">
		<div class="top">
			<p @click="oneshow" :class="{active:one_show}">常规</p>
			<p @click="twoshow" :class="{active:two_show}">内容区</p>
		</div>
		<div class="one" v-show="one_show">
			<div class="height">
				<span>高度：</span>
				<input type="text" v-model="itemMdata.conStyle.height" />
			</div>
			<div class="margin">
				<span>内边距：</span>
				<p>
					<span>上：</span>
					<input type="text" v-model="itemMdata.conStyle.paddingTop" />
				</p>
				<p>
					<span>下：</span>
					<input type="text" v-model="itemMdata.conStyle.paddingBottom" />
				</p>
				<p>
					<span>左：</span>
					<input type="text" v-model="itemMdata.conStyle.paddingLeft" />
				</p>
				<p>
					<span>右：</span>
					<input type="text" v-model="itemMdata.conStyle.paddingRight" />
				</p>
			</div>
			<div class="content">
				<span>背景：</span>
				<p @click="content_hid = false">
					<input type="radio" name="content" id="content1" />
					<label for="content1">默认</label>
				</p>
				<p @click="content_hid = false">
					<input type="radio" name="content" id="content2" />
					<label for="content2">隐藏</label>
				</p>
				<p @click="content_hid = true">
					<input type="radio" name="content" id="content3" checked="checked" />
					<label for="content3">自定义</label>
				</p>
				<ul class="content_hid" v-show="content_hid">
					<!--li>
						<span>透明度：</span>
						<el-slider v-model="opacity"></el-slider>
						<span class="number">{{opacity}}%</span>
					</li-->
					<li>
						<span>图片：</span>
						<button @click="addVisibleNav = true">添加图片</button>
					</li>
					<li>
						<span>背景色：</span>
						<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.conStyle.backgroundColor" size="medium"></el-color-picker>
					</li>
				</ul>
			</div>
		</div>
		<div class="two" v-show="two_show">
			
		</div>

		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<!--mImageEdit v-if="flag==1" :itemMdata="itemMdata.mImage0"></mImageEdit-->
					<mImageEdit :itemMdata="itemMdata.mImage" @recoent="recoent"></mImageEdit>
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
	import mImageEdit from '@/components/t2/m/mImageEdit.vue'
	export default {
		name: 'fullScreen',
		props: ['itemMdata'],
		data() {
			return {
				title: '编辑满屏容器',
				dialogImageUrl: '',
				conStyle: {
					'marginTop': "",
					'marginBottom': "",
					'marginLeft': "",
					'marginRight': ""
				},
				dialogVisible: false,
				addVisibleNav: false,
				isBorderTop: true,
				isBorderBottom: true,
				isBorderLeft: true,
				isBorderRight: true,
				one_show: true,
				two_show: false,
				three_show: false,
				options: [{
					value: 'none',
					label: '无边框'
				}, {
					value: 'solid',
					label: '————'
				}, {
					value: 'dotted',
					label: '············'
				}, {
					value: 'dashed',
					label: '------------'
				}],
				value: '',
				margin_hid: true,
				border_hid: true,
				options2: [{
					value: '选项1',
					label: '微软雅黑'
				}, {
					value: '选项2',
					label: '宋体'
				}, {
					value: '选项3',
					label: '黑体'
				}, {
					value: '选项4',
					label: '幼圆'
				}],
				value2: '',
				text_hid: true,
				high_hid: true,
				bg_hid: true,
				icon_hid: true,
				opacity: 0,
				content_hid: true
			}
		},
		components: {
			mImageEdit
		},
		created() {
			console.log(this.itemMdata);
			//this.editDial.conStyle = {};
			this.$nextTick(() => {
				for(var k in this.itemMdata.conStyle) {
					this.conStyle[k] = String(this.itemMdata.conStyle[k]).replace(/[^0-9]/ig, "")
				}
				console.log(this.conStyle);
			});

		},
		methods: {
			formatTooltip(val) {
				return val / 100;
			},
			recoent(i) {
				this.itemMdata.conStyle.backgroundImage = 'url("' + i.url + '")';
			},
			beforeRemoveImg() {
				this.itemMdata.conStyle.backgroundImage = '';
				this.itemMdata.mImage.url = "";
				//return this.$confirm(`确定移除 ${ file.name }？`);
			},
			oneshow: function() {
				this.one_show = true;
				this.two_show = false;
				this.three_show = false;
			},
			twoshow: function() {
				this.one_show = false;
				this.two_show = true;
				this.three_show = false;
			},
			threeshow: function() {
				this.one_show = false;
				this.two_show = false;
				this.three_show = true;
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			setValue(key, value) {
				this.conStyle[key] = value;
				this.itemMdata.conStyle[key] = value + "px";
				console.log(key, value);
			},
			uploadIsibleNav() {
				this.addVisibleNav = true;
			},
			...mapMutations([
				'orderList'
			])
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.fullScreen {
		overflow: auto;
		height: 350px;
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
			padding: 15px 30px;
			.height {
				margin-top: 10px;
				line-height: 30px;
				clear: both;
				overflow: hidden;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				input {
					float: left;
					border: 1px solid #E3E3E3;
					width: 150px;
					text-align: center;
					line-height: 30px;
				}
			}
			.margin {
				margin-top: 20px;
				clear: both;
				overflow: hidden;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					width: 20%;
					line-height: 30px;
					span {
						width: auto;
						float: left;
					}
					input {
						float: left;
						width: 60px;
						margin-right: 6px;
						text-align: center;
						border: 1px solid #E3E3E3;
						line-height: 30px;
					}
				}
			}
			.content {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				span {
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.content_hid {
					clear: both;
					overflow: hidden;
					margin-left: 50px;
					li {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						line-height: 35px;
						div {
							float: left;
							width: 50%;
							height: 35px;
						}
						span {
							width: 60px;
							text-align: right;
						}
						button {
							border: 1px solid #E3E3E3;
							text-align: center;
							padding: 3px 15px;
							color: #666666;
						}
						.number {
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 50px;
							margin-left: 10px;
							line-height: 30px;
						}
					}
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 15px 30px;
			.content {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				span {
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.content_hid {
					clear: both;
					overflow: hidden;
					margin-left: 50px;
					li {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						line-height: 35px;
						div {
							float: left;
							width: 50%;
							height: 35px;
						}
						span {
							width: 60px;
							text-align: right;
						}
						button {
							border: 1px solid #E3E3E3;
							text-align: center;
							padding: 3px 15px;
							color: #666666;
						}
						.number {
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 50px;
							margin-left: 10px;
							line-height: 30px;
						}
					}
				}
			}
		}
	}
	
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
		background-color: #f1f1f1;
	}
	
	::-webkit-scrollbar-thumb {
		background-color: #b2b2b2;
		width: 16px;
		-webkit-border-radius: 16px;
		-moz-border-radius: 16px;
		border-radius: 16px;
	}
</style>