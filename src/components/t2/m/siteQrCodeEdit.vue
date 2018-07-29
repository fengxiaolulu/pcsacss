<template>
	<div class="siteQrCodeEdit">
		<div class="left">
			<img :src="itemMdata.imgUrl.url" :style="{background:itemMdata.imgColor}" />
			<input type="text" value="itemMdata.imgName" v-model="itemMdata.imgName" />
		</div>
		<div class="right">
			<p class="name">
				<span>模块标题：</span>
				<input type="text" value="网站二维码" />
			</p>
			<p class="size">
				<span>尺寸：</span>
				<input type="text" value="itemMdata.imgWidth" v-model="itemMdata.imgWidth" />
			</p>
			<p class="icon">
				<span>图标：</span>
				<button @click="vbgFun(1)">添加图片</button>
			</p>
			<p class="color">
				<span>背景色：</span>
				<el-color-picker v-model="itemMdata.imgColor" size="small"></el-color-picker>
			</p>
		</div>
		<el-dialog title="添加图片" :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" :itemMdata="itemMdata.imgUrl"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="addVisibleNav = false">取 消</el-button>
		    <el-button type="primary" @click="addVisibleFun">保 存</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from './mImageEdit.vue'
	export default {
		name: 'siteQrCodeEdit',
		props: ['itemMdata'],
		components: {
			mImageEdit
		},
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false,
				addVisibleNav: false,
				flag:1
			}
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
				//console.log(flag)
			},
			addVisibleFun() {
				this.addVisibleNav = false;
			},
			oneshow: function() {
				this.one_show = true;
				this.two_show = false;
			},
			twoshow: function() {
				this.one_show = false;
				this.two_show = true;
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.siteQrCodeEdit {
		box-sizing: border-box;
		height: 400px;
		overflow: auto;
		padding: 50px;
		.left {
			float: left;
			width: 200px;
			text-align: center;
			img {
				background: #000000;
				width: 150px;
			}
			input {
				clear: both;
				overflow: hidden;
				width: 160px;
				border: 1px solid #E3E3E3;
				text-align: center;
				line-height: 30px;
				margin-top: 15px;
			}
		}
		.right {
			float: right;
			width: 60%;
			p {
				clear:both;
				overflow: hidden;
				line-height: 30px;
				margin-bottom: 20px;
				span {
					float: left;
					width: 70px;
					text-align: right;
				}
				input{
					float: left;
					border: 1px solid #E3E3E3;
					width: 170px;
					line-height: 30px;
					padding-left: 10px;
				}
				button{
					border: 1px solid #E3E3E3;
					padding: 3px 10px;
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