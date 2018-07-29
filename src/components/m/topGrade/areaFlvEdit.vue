<template>
	<div class="areaFlvEdit">
		<div class="one">
			<div class="name">
				<span>模块标题：</span>
				<input type="text" value="在线视频" />
			</div>
			<div class="type">
				<div class="choose">
					<span>文件类型：</span>
					<p @click="typehid">
						<input type="radio" name="choose" id="choose1" checked="checked" />
						<label for="choose1">本地文件</label>
					</p>
					<p @click="typehid2">
						<input type="radio" name="choose" id="choose2" />
						<label for="choose2">网络地址</label>
					</p>
				</div>
				<div class="type_hid" v-show="type_hid">
					<span>本地文件：</span>
					<p>
						<span>添加文件</span>
						<input type="file" />
					</p>
				</div>
				<div class="type_hid2" v-show="type_hid2">
					<span>网络地址：</span>
					<input type="text" />
				</div>
			</div>
			<div class="size">
				<span>设置尺寸：</span>
				<p>
					<span>宽</span>
					<input type="text" value="itemMdata.videoStyle.width" v-model="itemMdata.videoStyle.width" />
					<span>像素</span>
				</p>
				<p>
					<span>高</span>
					<input type="text" value="itemMdata.videoStyle.height" v-model="itemMdata.videoStyle.height" />
					<span>像素</span>
				</p>
			</div>
			<div class="auto">
			    <span>自动播放：</span>
			    <p @click="itemMdata.autoplay = true">
			    	<input type="radio" name="auto" id="auto1" checked="checked" />
			    	<label for="auto1">是</label>
			    </p>
			    <p @click="itemMdata.autoplay = false">
			    	<input type="radio" name="auto" id="auto2" />
			    	<label for="auto2">否</label>
			    </p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'areaFlvEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false,
				type_hid:true,
				type_hid2:false
			}
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
			typehid:function(){
				this.type_hid = true;
				this.type_hid2 = false;
			},
			typehid2:function(){
				this.type_hid = false;
				this.type_hid2 = true;
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.areaFlvEdit {
		box-sizing: border-box;
		height: 450px;
		overflow: auto;
		.one {
			box-sizing: border-box;
			padding: 20px 30px;
			.name {
				span {
					width: 70px;
					text-align: right;
				}
				input {
					border: 1px solid #E3E3E3;
					padding-left: 10px;
					line-height: 30px;
					width: 185px;
				}
			}
			.type{
				.choose{
					clear: both;
					overflow: hidden;
					margin-top: 20px;
					span{
						float: left;
					}
					p{
						float: left;
						margin-left: 10px;
					}
				}
				.type_hid{
					clear: both;
					overflow: hidden;
					margin-top: 10px;
					span{
						float: left;
						line-height: 30px;
					}
					p{
						float: left;
						width: 90px;
						position: relative;
						line-height: 30px;
						text-align: center;
						background: #3a8ee6;
						border-radius: 5px;
						margin-left: 5px;
						span{
							position: relative;
							display: block;
							width: 100%;
							color: #FFFFFF;
						}
						input{
							position: absolute;
							width: 100%;
							left: 0;
							right: 0;
							line-height: 30px;
							opacity: 0;
						}
					}
				}
				.type_hid2{
					margin-top: 10px;
					input{
						border: 1px solid #E3E3E3;
						line-height: 30px;
						width: 185px;
					}
				}
			}
			.size{
				clear: both;
				overflow: hidden;
				margin-top: 20px;
				span{
					float: left;
					line-height: 30px;
				}
				p{
					float: left;
					margin-left: 10px;
					line-height: 30px;
					input{
						border: 1px solid #E3E3E3;
						text-align: center;
						width: 60px;
						float: left;
						line-height: 30px;
					}
					span{
						margin: 0 5px;
					}
				}
			}
			.auto{
				clear: both;
				overflow: hidden;
				margin-top: 20px;
				span{
					float: left;
				}
				p{
					float: left;
					margin-left: 10px;
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