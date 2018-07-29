<template>
	<div class="areaFileEdit">
		<div class="top">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">文件列表</p>
		</div>
		<div class="one" v-if="typenumber == 1">
			<div class="name">
				<span>模块标题：</span>
				<input type="text" value="文件下载" />
			</div>
			<div class="style">
				<span>模块样式：</span>
				<ul>
					<li @click="changeone">
						<div class="style_one"></div>
					</li>
					<li @click="changetwo">
						<div class="style_two"></div>
					</li>
				</ul>
			</div>
			<div class="page">
				<div>
					<span>分页展示：</span>
					<p @click="pagehid1">
						<input type="radio" name="page" id="page1" :checked="itemMdata.page_hid1" />
						<label for="page1">是</label>
					</p>
					<p @click="pagehid2">
						<input type="radio" name="page" id="page2" :checked="!itemMdata.page_hid1" />
						<label for="page2">否</label>
					</p>
				</div>
				<div class="page_hid">
					<p v-show="itemMdata.page_hid1">
						<span>每页文件个数：</span>
						<input type="text" value="20" />
					</p>
					<p v-show="!itemMdata.page_hid1">
						<span>显示文件个数：</span>
						<input type="text" value="20" />
					</p>
				</div>
			</div>
			<div class="size">
				<span>显示文件大小：</span>
				<p @click="itemMdata.size = true">
					<input type="radio" name="size" id="size1" :checked="itemMdata.size" />
					<label for="size1">是</label>
				</p>
				<p @click="itemMdata.size = false">
					<input type="radio" name="size" id="size2" :checked="!itemMdata.size"/>
					<label for="size2">否</label>
				</p>
			</div>
		</div>
		<div class="two" v-if="typenumber == 2">
			<!--p class="upload">
				<span>添加文件</span>
				<input type="file" value="添加文件" />
			</p-->
			<div class="table">
				<table>
					<tr>
						<th width="40%">文件名称</th>
						<th width="30%">文件大小</th>
						<th width="30%">操作</th>
					</tr>
					<tr v-for="(table,index) in itemMdata.areaFileTable">
						<td>{{table.file_name}}</td>
						<td>{{table.file_size}}</td>
						<td>
							<span class="icon" @click="deleteTable(table)"></span>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import api from '@/api/$ajax.js'
	export default {
		name: 'areaFileEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				token: this.$route.query.token,
				type: this.$route.query.type,
				dialogVisible: false,
				typenumber:'1',
				page_hid1: true,
				page_hid2: false,
			}
		},
		created() {
			console.log(this.itemMdata);
			this.getData();
		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			getData(){			
				var v = this;				
				api.get('/api/data/downloadList?token=' + this.token + '&type='+this.type,true,{}, function(data) {
						//var result = JSON.stringify(data); //json对象转成字符串
						v.itemMdata.areaFileTable = data.data;
						console.log(data.data);
					}
				);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			changetype:function(number){
				this.typenumber = number
			},
			pagehid1: function() {
				this.itemMdata.page_hid1 = true;
				this.itemMdata.page = true;
			},
			pagehid2: function() {
				this.itemMdata.page_hid1 = false;
				this.itemMdata.page = false;
			},
			deleteTable:function(table){
				this.itemMdata.areaFileTable.splice(this.itemMdata.areaFileTable.indexOf(table), 1);
			},
			changeone:function(){
				this.itemMdata.float = 'left';
				this.itemMdata.width = '44.5%';
			},
			changetwo:function(){
				this.itemMdata.float = 'none';
				this.itemMdata.width = '98%';
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.areaFileEdit {
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
					float: left;
					width: 100px;
					text-align: right;
					line-height: 30px;
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
				margin-top: 20px;
				span {
					width: 100px;
					text-align: right;
					float: left;
				}
				ul {
					width: 80%;
					float: left;
					li {
						float: left;
						width: 102px;
						height: 82px;
						border: 1px solid #E3E3E3;
						text-align: center;
						margin-right: 15px;
						div {
							width: 100%;
							height: 82px;
							background: url(/static/image/mbg02.png)no-repeat;
						}
						.style_one {
							background-position: 0 -196px;
						}
						.style_two {
							background-position: 0 -297px;
						}
					}
					li:hover {
						border: 1px solid #3a8ee6;
					}
				}
			}
			.page {
				margin-top: 15px;
				clear: both;
				overflow: hidden;
				span {
					width: 100px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.page_hid {
					clear: both;
					overflow: hidden;
					margin-left: 70px;
					p {
						margin-top: 10px;
						span {
							width: auto;
							line-height: 30px;
						}
						input {
							border: 1px solid #E3E3E3;
							width: 100px;
							text-align: center;
							line-height: 30px;
						}
					}
				}
			}
			.size {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				span {
					float: left;
					width: 100px;
					text-align: right;
				}
				p {
					float: left;
					margin-left: 10px;
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 30px;
			padding-bottom: 0;
			.upload {
				background: #3a8ee6;
				position: relative;
				border-radius: 5px;
				width: 100px;
				span {
					position: relative;
					color: #FFFFFF;
					display: block;
					text-align: center;
					line-height: 30px;
				}
				input {
					width: 100%;
					opacity: 0;
					position: absolute;
					top: 0;
					bottom: 0;
				}
			}
			.table {
				clear: both;
				overflow: hidden;
				height: 320px;
				overflow: auto;
				margin-top: 15px;
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
						.icon {
							background: url(/static/image/mbg01.png)no-repeat;
							background-position: -994px -8px;
							width: 16px;
							height: 16px;
							display: block;
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