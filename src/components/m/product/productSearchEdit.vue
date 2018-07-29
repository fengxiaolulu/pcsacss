<template>
	<div class="productSearchEdit">
		<div class="top">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">搜索设置</p>
			<p @click="changetype(3)" :class="{active:typenumber == 3}">展示设置</p>
		</div>
		<div class="one" v-if="typenumber == 1">
			<p class="name">
				<span>模块标题：</span>
				<input type="text" value="产品搜索" />
			</p>
			<div class="style">
				<span>模块样式：</span>
				<ul>
					<li @click="changeone(1)" :class="{setBorder:itemMdata.setProductSearch==1}">
						<div class="search_one" :style="{['border-color']:color1}">
							<input type="text" />
							<button type="submit" :style="[{background:color1},{color:itemMdata.buttonStyle.color}]">搜索</button>
						</div>
					</li>
					<li @click="changetwo(2)" :class="{setBorder:itemMdata.setProductSearch==2}">
						<div class="search_two">
							<input type="text" />
							<button type="submit" :style="[{background:color1},{color:itemMdata.buttonStyle.color}]">搜索</button>
						</div>
					</li>
					<li @click="changethree(3)" :class="{setBorder:itemMdata.setProductSearch==3}">
						<div class="search_three">
							<input type="text" />
							<button type="submit" :style="{background:color1}">
								<span class="icon"></span>
							</button>
						</div>
					</li>
					<li @click="changefour(4)" :class="{setBorder:itemMdata.setProductSearch==4}">
						<div class="search_four" :style="{['border-color']:color1}">
							<input type="text" />
							<button type="submit">
								<span class="icon"></span>
							</button>
						</div>
					</li>
					<li @click="changefive(5)" :class="{setBorder:itemMdata.setProductSearch==5}">
						<div class="search_five" :style="{['border-color']:color1}">
							<input type="text" />
							<button type="submit">
								<span class="icon"></span>
							</button>
						</div>
					</li>
					<li @click="changesixth(6)" :class="{setBorder:itemMdata.setProductSearch==6}">
						<div class="search_sixth" :style="{['border-color']:color1}">
							<input type="text" />
							<button type="submit" :style="{color: color1}">
								<i class="el-icon-search"></i>
							</button>
						</div>
					</li>
				</ul>
				<div class="color">
					<span>模块颜色：</span>
					<el-color-picker v-model="color1" size="small"></el-color-picker>
					<span>字体颜色：</span>
					<el-color-picker v-model="itemMdata.buttonStyle.color" size="small"></el-color-picker>
				</div>
			</div>
		</div>
		<div class="two" v-if="typenumber == 2">
			<p class="input">
				<span>搜索提示：</span>
				<input type="text" v-model="itemMdata.placeholderTxt" />
			</p>
			<div class="content">
				<div class="choose">
					<span>搜索提示：</span>
					<p @click="itemMdata.content_hid = false">
						<input type="radio" name="content" id="content1" :checked="itemMdata.content_hid == false"/>
						<label for="content1">全部</label>
					</p>
					<p @click="itemMdata.content_hid = true">
						<input type="radio" name="content" id="content2" :checked="itemMdata.content_hid == true" />
						<label for="content2">指定参数</label>
					</p>
				</div>
				<div class="content_hid table" v-show="itemMdata.content_hid">
					<table>
						<tr>
							<th width="70%">参数名称</th>
							<th width="30%">显示</th>
						</tr>
						<tr v-for="table in itemMdata.productSearchTable">
							<td>{{table.name}}</td>
							<td>
								<span class="yes" @click="changeyes($event,table)" v-show="table.isOpen"></span>
								<span class="no" @click="changeno($event,table)" v-show="!table.isOpen"></span>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div class="three" v-if="typenumber == 3">
			<div class="size">
				<span>搜索框宽高：</span>
				<input type="text" value="itemMdata.divStyle.width" v-model="itemMdata.divStyle.width" />-
				<input type="text" value="itemMdata.divStyle.height" v-model="itemMdata.divStyle.height" />
			</div>
			<div class="keywords">
				<span>推荐关键词：</span>
				<div class="input">
					<p v-for="text in itemMdata.productSearchText">
						<input type="text" v-model="text.text" />
					</p>
				</div>
			</div>

			<p class="prompt">每个关键词最长5个汉字、10个字母</p>
			<div>
				<span>设置关键词字体颜色：</span>
				<el-color-picker v-model="itemMdata.spanStyle.color" size="small"></el-color-picker>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'productSearchEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false,
				typenumber:'1',
				
				color1: '#409EFF'
			}
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
			changetype:function(number){
				this.typenumber = number
			},
			changeone: function(num) {
				this.itemMdata.divStyle.borderColor = this.color1;
				this.itemMdata.buttonStyle.background = this.color1;
				
				this.itemMdata.divStyle.borderWidth = '2px';
				this.itemMdata.divStyle.borderRadius = '';
				this.itemMdata.setProductSearch = num;
				
			},
			changetwo: function(num) {
				this.itemMdata.divStyle.borderColor = '#e3e3e3';
				this.itemMdata.buttonStyle.background = this.color1;
				this.itemMdata.divStyle.borderWidth = '1px';
				this.itemMdata.divStyle.borderRadius = '';
				this.itemMdata.setProductSearch = num;
			},
			changethree: function(num) {
				this.itemMdata.divStyle.borderColor = '#e3e3e3';
				this.itemMdata.buttonStyle.background = this.color1;
				this.itemMdata.divStyle.borderWidth = '1px';
				
				this.itemMdata.divStyle.borderRadius = '';
				this.itemMdata.setProductSearch = num;
			},
			changefour: function(num) {
				this.itemMdata.divStyle.borderColor = this.color1;
				this.itemMdata.divStyle.borderRadius = '';
				this.itemMdata.divStyle.borderWidth = '1px';
				this.itemMdata.setProductSearch = num;
			},
			changefive: function(num) {
				this.itemMdata.divStyle.borderColor = this.color1;
				this.itemMdata.divStyle.borderRadius = '20px';
				this.itemMdata.divStyle.borderWidth = '1px';
				this.itemMdata.setProductSearch = num;
			},
			changesixth: function(num) {
				this.itemMdata.divStyle.borderColor = this.color1;
				this.itemMdata.divStyle.borderRadius = '20px';
				this.itemMdata.divStyle.borderWidth = '1px';
				this.itemMdata.setProductSearch = num;
			},
			changeyes: function(e,item) {
				item.isOpen=false
			},
			changeno: function(e,item) {
				item.isOpen=true
				
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.productSearchEdit {
		box-sizing: border-box;
		height: 450px;
		overflow: auto;
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
			padding: 20px;
			.name {
				span {
					width: 70px;
					text-align: right;
				}
				input {
					border: 1px solid #E3E3E3;
					padding-left: 10px;
					line-height: 30px;
				}
			}
			.style {
				clear: both;
				overflow: hidden;
				ul {
					clear: both;
					overflow: hidden;
					li {
						float: left;
						width: 180px;
						height: 110px;
						border: 1px solid #E3E3E3;
						text-align: center;
						margin-left: 5px;
						margin-right: 5px;
						margin-top: 10px;
						div {
							width: 80%;
							margin-left: 10%;
							height: 30px;
							margin-top: 35px;
						}
						.search_one {
							border-style: solid;
							border-width: 2px;
							input {
								width: 70%;
								height: 30px;
								float: left;
							}
							button {
								width: 30%;
								height: 30px;
								float: right;
							}
						}
						.search_two {
							border-style: solid;
							border-width: 1px;
							border-color: #E3E3E3;
							input {
								width: 70%;
								height: 30px;
								float: left;
							}
							button {
								width: 30%;
								height: 30px;
								float: right;
							}
						}
						.search_three {
							border-style: solid;
							border-width: 1px;
							border-color: #E3E3E3;
							input {
								width: 70%;
								height: 30px;
								float: left;
							}
							button {
								width: 30%;
								height: 30px;
								float: right;
								.icon {
									display: block;
									width: 20px;
									height: 20px;
									margin-left: 13px;
									background-image: url(/static/image/mbg01.png);
									background-repeat: no-repeat;
									background-position: 0px -1086px;
								}
							}
						}
						.search_four {
							border-style: solid;
							border-width: 1px;
							input {
								width: 70%;
								height: 30px;
								float: left;
							}
							button {
								width: 30%;
								height: 30px;
								float: right;
								background: none;
								.icon {
									display: block;
									width: 20px;
									height: 20px;
									margin-left: 15px;
									background: url(/static/image/mbg01.png)no-repeat;
									background-position: 0px -1061px;
								}
							}
						}
						.search_five {
							border-style: solid;
							border-width: 1px;
							border-radius: 15px;
							input {
								width: 70%;
								height: 30px;
								float: left;
							}
							button {
								width: 30%;
								height: 30px;
								float: right;
								background: none;
								.icon {
									display: block;
									width: 20px;
									height: 20px;
									margin-left: 15px;
									background: url(/static/image/mbg01.png)no-repeat;
									background-position: 0px -1061px;
								}
							}
						}
						.search_sixth {
							border-style: solid;
							border-width: 1px;
							border-radius: 15px;
							input {
								width: 70%;
								height: 30px;
								float: left;
							}
							button {
								width: 30%;
								height: 30px;
								float: right;
								background: none;
								font-size: 17px;
							}
						}
					}
					li:hover {
						border: 1px solid #3a8ee6;
					}
					.setBorder{
						border: 1px solid #3a8ee6;
					}
				}
				.color {
					margin-top: 15px;
					display: flex;
					line-height: 30px;
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 20px;
			.input {
				line-height: 30px;
				clear: both;
				overflow: hidden;
				input {
					border: 1px solid #E3E3E3;
					line-height: 30px;
					padding-left: 10px;
				}
			}
			.content {
				.choose {
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
				}
				.content_hid {
					height: 280px;
					overflow: auto;
					border: 1px solid #e7ecf0;
					table {
						width: 100%;
						color: #666666;
						th {
							background: #f8f9fb;
							line-height: 45px;
						}
						td {
							text-align: center;
							line-height: 45px;
							.yes {
								display: block;
								width: 16px;
								height: 16px;
								background: url(/static/image/bg01.png)no-repeat;
								background-position: -1405px -322px;
								margin-left: 45%;
							}
							.no {
								display: block;
								width: 16px;
								height: 16px;
								background: url(/static/image/bg01.png)no-repeat;
								background-position: -1441px -322px;
								margin-left: 45%;
							}
						}
						tr:nth-child(2n-1) {
							background: #f8f9fb;
						}
					}
				}
			}
		}
		.three {
			box-sizing: border-box;
			padding: 20px;
			.size {
				input {
					border: 1px solid #E3E3E3;
					width: 70px;
					text-align: center;
					line-height: 30px;
					margin-left: 5px;
					margin-right: 5px;
				}
			}
			.keywords {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				border-bottom: 1px dashed #E3E3E3;
				padding-bottom: 15px;
				span {
					float: left;
				}
				.input {
					float: left;
					width: 85%;
					p {
						float:left;
						input {
							border: 1px solid #E3E3E3;
							margin-left: 7px;
							margin-right: 5px;
							width: 80px;
							text-align: center;
							line-height: 30px;
							margin-top: 10px;
						}
					}
				}
			}
			.prompt {
				color: #888;
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