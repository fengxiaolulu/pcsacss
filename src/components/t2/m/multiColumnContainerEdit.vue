<template>
	<div class="multiColumnContainerEdit">
		<p class="name">
			<span>模块标题：</span>
			<input type="text" value="多列排版" />
		</p>
		<ul class="style">
			<li v-for="(item,index) in itemMdata.clmnArr" @click="setColmn(item.index)" :class="{'hover':item.cur}">
				<div :class="item.cmLan"></div>
				<p>{{item.text}}</p>
			</li>
			<!--li @click="setColmn(3)">
				<div class="style_two"></div>
				<p>三列排版</p>
			</li>
			<li @click="setColmn(4)">
				<div class="style_three"></div>
				<p>四列排版</p>
			</li>
			<li @click="setColmn(5)">
				<div class="style_four"></div>
				<p>五列排版</p>
			</li-->
		</ul>
		<div class="name">
			<span>模块高度：</span>
			<input type="text" v-model="itemMdata.conStyle.height" />
		</div>
		<div class="margin">
			<span>列间距：</span>
			<p @click="margin_hid = false">
				<input type="radio" name="margin" id="margin1" />
				<label for="margin1">默认</label>
			</p>
			<p @click="margin_hid = true">
				<input type="radio" name="margin" id="margin2" checked="checked" />
				<label for="margin2">自定义</label>
			</p>
			<div class="margin_hid" v-show="margin_hid">
				<input type="text" value="10" />
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'multiColumnContainerEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '编辑多列容器',
				dialogImageUrl: '',
				dialogVisible: false,
				margin_hid: true
			}
		},
		created() {
			console.log(this.tImgEdit)
		},
		methods: {
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			setColmn(v) {
				this.itemMdata.column = v;
				this.itemMdata.clmnArr.forEach(function(val){
					if(val.index==v){
							val.cur = true;
					}else{
							val.cur = false
					}
					//v.cur = false
					console.log(v);
				});
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
	.multiColumnContainerEdit {
		box-sizing: border-box;
		clear: both;
		overflow: hidden;
		height: 340px;
		padding: 20px 30px;
		.name {
			clear: both;
			overflow: hidden;
			margin-top: 10px;
			input {
				border: 1px solid #E3E3E3;
				line-height: 30px;
				padding-left: 10px;
			}
		}
		.style {
			margin-top: 20px;
			clear: both;
			overflow: hidden;
			li {
				float: left;
				width: 120px;
				margin-right: 25px;
				margin-bottom: 10px;
				margin-top: 5px;
				div {
					display: block;
					width: 100%;
					height: 92px;
					border: 1px solid #E3E3E3;
					background: url(../../../../static/image/mbg02.png)no-repeat;
				}
				p {
					text-align: center;
					margin-top: 7px;
					font-size: 12px;
				}
				.style_one {
					background-position: 0 -540px;
				}
				.style_two {
					background-position: 0 -652px;
				}
				.style_three {
					background-position: 0 -764px;
				}
				.style_four {
					background-position: 0 -876px;
				}
			}
			li:hover,
			li.hover {
				div {
					border: 1px solid #3a8ee6;
				}
				p {
					color: #3a8ee6;
				}
			}
		}
		.margin {
			clear: both;
			overflow: hidden;
			margin-top: 15px;
			span {
				float: left;
			}
			p {
				float: left;
				margin-left: 10px;
			}
			.margin_hid {
				input {
					border: 1px solid #E3E3E3;
					text-align: center;
					margin-left: 15px;
					width: 60px;
					line-height: 27px;
				}
			}
		}
	}
</style>