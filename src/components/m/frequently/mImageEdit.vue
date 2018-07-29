<template>
	<div class="imageEdit">
		<!--<ul>
			<li>图片组件111</li>
			<li>组件样式222</li>
		</ul>
		<div class="img">
			<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess" :on-remove="handleRemove">
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</div>-->
		<div class="all">
			<ul class="left">
				<li @click="oneshow" :class="{active:one_show==1}">我的文件</li>
				<li @click="twoshow" :class="{active:two_show==2}">图片库</li>
				<li @click="threeshow" :class="{active:three_show==3}">编辑样式</li>
			</ul>
			<div class="right">
				<div v-show="one_show||btnShowOne" class="one">
					<div class="set">
						<div id="picker"></div>
						<button type="" @click="newCeaterDir" class="new"><i></i>新建文件夹</button>
						<button type="" class="move" @click="move_hid = !move_hid"><i></i>图片搬家</button>
						<div class="move_hid" v-show="move_hid">
							<div class="title">
								<span>图片搬家</span>
								<div class="hid" @click="move_hid = !move_hid">X</div>
							</div>
							<div class="width">
								<div class="address">
									<p class="input">
										<span>图片地址：</span>
										<input type="text" placeholder="输入网页地址，马上爬取图片" />
										<button type="submit"></button>
									</p>
									<p class="shuiying">
										<input type="checkbox" id="shuiyin2" />
										<label for="shuiyin2">添加水印</label>
									</p>
								</div>
								<ul class="list">
									<li>
										<img src="/static/image/default.png" />
									</li>
									<li>
										<img src="/static/image/default.png" />
									</li>
									<li>
										<img src="/static/image/default.png" />
									</li>
								</ul>
								<p class="quanxuan">
									<input type="checkbox" id="quanxuan" />
									<label for="quanxuan">全选</label>
								</p>
								<div class="button">
									<button type="submit">确定</button>
									<button type="reset">取消</button>
								</div>
							</div>
						</div>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<div class="mark">
							<input type="checkbox" id="shuiyin" />
							<label for="shuiyin">添加水印</label>
							<button type="">设置</button>
						</div>
						<div class="search">
							<input type="text" placeholder="搜索所有文件" />
							<button type="submit"></button>
						</div>
					</div>
					<div class="detail">
						<div class="st_con">
							<ul class="nav_bread">
								<li @click="openDir(1)"><span>所有文件  &gt;</span></li>
								<li @click="openDir(1,nav)" v-for="(nav,index) in navBread"><span>{{nav.name}} &gt;</span></li>
								<!--li><span>新建文件夹 &gt;</span></li>
								<li><span>文件</span></li-->
							</ul>
						</div>
						<div v-iscroll style="position: relative; height:450px; overflow: hidden;">
							<ul class="fr_con">
								<li @click="openDir(2,dir)" v-for="(dir,index) in dirList">
									<div class="edit"><i class="icon"></i></div>
									<div class="font" :class="{isedit:dir.isEditDir}">
										<span @click="remaneDir($event,dir)" class="show_font">{{dir.name}}</span>
										<input @blur="blurRemaneDir($event,dir)" v-to-focus="dir.isEditDir" type="text" v-model="dir.name" />
									</div>
									<div class="hid" @click="delData($event,dir)"></div>
								</li>
								<li v-for="(file,index) in fileList" @click="imgSelectCur(file)">
									<div class="con" :class="{'cur':file.cur}"><img :src="file.url" />
										<div class="checked"></div>
									</div>
									<p>{{file.name}}</p>
									<div class="hid" @click="delData($event,file)"></div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div v-show="two_show" class="two">
					<ul>
						<li>
							<img id="pre" src="/static/image/default.png" />
							<p>name1</p>
						</li>
						<li>
							<img src="/static/image/default.png" />
							<p>name2</p>
						</li>
						<li>
							<img src="/static/image/default.png" />
							<p>name3</p>
						</li>
					</ul>
				</div>
				<div class="three" v-show="three_show">
					<p>
						<span>是否设置悬浮边框：</span>
						<span @click="itemMdata.isHover = true">
							<input type="radio" name="hover" id="hover1" :checked="itemMdata.isHover==true"/>
							<label for="hover1">是</label>
						</span>
						<span @click="itemMdata.isHover = false">
							<input type="radio" name="hover" id="hover2"  :checked="itemMdata.isHover==false"/>
							<label for="hover2">否</label>
						</span>
					</p>
					<p>
						<span>悬浮边框颜色：</span>
						<el-color-picker v-model="itemMdata.hoverStyle.borderColor" size="medium"></el-color-picker>
					</p>
					<p>
						<el-form>
							<el-form-item label="边框样式：">
								<el-select v-model="itemMdata.hoverStyle.borderStyle" placeholder="请选择线">
									<el-option v-for="item in line" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</p>
					<p>
						<span>是否设置悬浮图片：</span>
						<span @click="itemMdata.isImg = true">
							<input type="radio" name="image" id="image1" :checked="itemMdata.isImg==true"/>
							<label for="hover1">是</label>
						</span>
						<span @click="itemMdata.isImg = false">
							<input type="radio" name="image" id="image2" :checked="itemMdata.isImg==false"/>
							<label for="hover2">否</label>
						</span>
					</p>
					<p>
						<span>是否设置图片旋转：</span>
						<span @click="itemMdata.isRotate = true">
							<input type="radio" name="isRotate" id="isRotate1" :checked="itemMdata.isRotate==true"/>
							<label for="isRotate1">是</label>
						</span>
						<span @click="itemMdata.isRotate = false">
							<input type="radio" name="isRotate" id="isRotate2" :checked="itemMdata.isRotate==false"/>
							<label for="isRotate2">否</label>
						</span>
					</p>
					<p>
						<span>悬浮图片:</span>
						<button @click="btnOneShow()">添加图片</button>
						<span class="imgBack">	
							<img :src="itemMdata.hoverUrl" class="imgBack1" v-show="itemMdata.isImg"/>
							<i @click="deleteAdd($event)" class="hid"></i>
						</span>
					</p>
					<p>
						<span>是否设置悬浮文字：</span>
						<span @click="itemMdata.isTxt = true">
							<input type="radio" name="txt" id="txt1" :checked="itemMdata.isTxt==true"/>
							<label for="hover1">是</label>
						</span>
						<span @click="itemMdata.isTxt = false">
							<input type="radio" name="txt" id="txt2"  :checked="itemMdata.isTxt==false"/>
							<label for="hover2">否</label>
						</span>
					</p>
					<p>
						<span>悬浮文字:</span>
						<textarea v-model="itemMdata.hovertxt">
						
						</textarea>
					</p>
					<p>
						<span>文本位置：</span>
						<span @click="itemMdata.isTxtP = true">
							<input type="radio" name="txtP" id="txtP1"  :checked="itemMdata.isTxtP==true"/>
							<label for="hover1">居中</label>
						</span>
						<span @click="itemMdata.isTxtP = false">
							<input type="radio" name="txtP" id="txtP2"  :checked="itemMdata.isTxtP==false"/>
							<label for="hover2">左对齐</label>
						</span>
					</p>
					<!--p>
						<input type="button" value="设置链接" @click="editDial.setlink = true" />
					</p-->
				</div>
			</div>
		</div>
		<!--uiLink :itemMdata='itemMdata' :editDial="editDial"></uiLink-->
	</div>
</template>
<script>
	import Vue from 'vue'
	import VIscroll from 'viscroll';
	import uiLink from '@/components/m/uiLink.vue'
	import api from '@/api/$ajax.js'
	Vue.use(VIscroll, {
		mouseWheel: true,
		click: false,
		preventDefault: true,
		tap: true,
		bounce: false,
		scrollbars: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		disableTouch: true,
		disablePointer: true,
		disableMouse: true,
	});
	Array.prototype.contains = function(needle) {
		for(var i in this) {
			if(this[i] == needle) return true;
		}
		return false;
	}
	var root = 'http://file.xiaohucloud.cn';
	// 引用axios
	var url = window.location.host;
	console.log(url)
	if(url.indexOf(".com") != -1) {
		root = 'http://file.xiaohucloud.com'
	}

	function initImgLoad(ts) {
		var uploader = WebUploader.create({
			formData: {
				companyId: ts.company_id,
				dirId: ts.curDirId
			},
			// swf文件路径
			swf: 'webuploader/Uploader.swf',
			// 文件接收服务端。
			server: root + '/file/upload.action',
			//server: 'http://localhost:8080/console/file/upload.action',
			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick: {
				id: '#picker',
				multiple: true,
				label: '上传图片'
			},
			auto: true,

			fileNumLimit: 100, //上传数量限制
			fileSingleSizeLimit: 5 * 1024 * 1024, //限制上传单个文件大小
			fileSizeLimit: 20 * 1024 * 1024, //限制上传所有文件大小
			duplicate: true,
			accept: { // 只允许选择图片文件格式
				title: 'Images',
				extensions: 'gif,jpg,bmp,png',
				mimeTypes: 'image/*'
			},
			compress: false,
			// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
			resize: false
		});

		/**
		 * 验证文件格式以及文件大小
		 */
		uploader.on("error", function(type) {
			if(type == "Q_TYPE_DENIED") {
				console.log("请上传JPG、PNG、GIF、BMP格式文件");
			} else if(type == "Q_EXCEED_SIZE_LIMIT") {
				console.log("文件大小不能超过5M");
			} else if(type == "F_EXCEED_SIZE") {
				console.log("文件大小不能超过2M");
			} else if(type == 'F_DUPLICATE') {
				console.log('reply');
			} else {
				console.log("上传出错！请检查后重新上传！错误代码" + type);
			}
		});

		// 当有文件被添加进队列的时候
		uploader.on('fileQueued', function(file) {
			console.log('等待上传...');
		});

		// 文件上传过程中创建进度条实时显示。
		uploader.on('uploadProgress', function(file, percentage) {
			console.log('上传中:' + percentage);
		});

		uploader.on('uploadSuccess', function(file, response) {
			console.log('上传成功');
			var result = response.result;
			//console.log(result);
			//var url = result.url;
			//var name = result.name;
			//var id = result.id;
			//console.log("url", url);
			var imgObj = {
				url: result.url,
				id: result.id,
				name: result.name,
				imgWidth: result.imgWidth,
				imgHeight: result.imgHeight,
				cur: false,
				dir: ""
			}
			ts.fileList.push(imgObj);

		});

		uploader.on('uploadError', function(file) {
			console.log('上传出错');
		});

		uploader.on('uploadComplete', function(file) {
			console.log('上传完成');
		});
	}

	//import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'mImageEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '图片上传',
				dialogImageUrl: '',
				dialogVisible: false,
				mainDirId: "",
				curDirId: "",
				company_id: this.$route.query.company_id,
				uploader: {},
				one_show: 1,
				two_show: 0,
				move_hid: false,
				editDial: {
					artTitle: "设置链接地址",
					setlink: false
				},
				three_show: 0,
				btnShowOne: 0,
				navBread: [],
				dirList: [],
				fileList: [],
				line: [{
					value: 'solid',
					label: '实线'
				}, {
					value: 'dashed',
					label: '虚线'
				}, {
					value: 'dotted',
					label: '点线'
				}, {
					value: 'double',
					label: '双线'
				}],
				options: [{
					value: '选项1',
					label: '按文件名称'
				}, {
					value: '选项2',
					label: '按文件大小'
				}, {
					value: '选项3',
					label: '按上传时间'
				}],
				value: ''
			}
		},
		components: {
			uiLink
		},
		created() {
			console.log(this.itemMdata);
			this.getData();
			this.itemMdata.hoverStyle = this.itemMdata.hoverStyle || {};
			this.itemMdata.imgStyle = this.itemMdata.imgStyle || {};
		},
		mounted() {
			initImgLoad(this);
		},
		watch: {
			'curDirId': function(newVal, oldVal) {
				initImgLoad(this);
			}
		},
		methods: {
			deleteAdd(e) {
				this.itemMdata.isImg = false;
			},
			remaneDir(e, i) {
				e.stopPropagation();
				i.isEditDir = true;
			},
			delData(e, i) {
				console.log(i)
				e.stopPropagation();

				api.get(root + '/file/del.action?ids=' + i.id, false, {}, function() {
					alert('删除成功!');
				});
				this.getData();
			},
			newCeaterDir() {
				///file/createDir.action?params.title=23232323&companyId=232345&dirId=232345001
				var obje = {
					'params.title': '新建文件夹',
					companyId: this.company_id,
					dirId:this.curDirId
				};
				var ts = this;

				api.post(root + "/file/createDir.action", true, obje, function(r) {
					//r = JSON.parse(r);
					var obj = {
						"name": "新建文件夹",
						"id": r.result.dirId
					};
					ts.dirList.push(obj);
				});
			},
			blurRemaneDir(e, i) {
				e.stopPropagation();
				i.isEditDir = false;
				var obje = {
					id: i.id,
					name: i.name
				};
				//console.log("remaneDir");

				api.post(root + "/file/rename.action", true, obje, function(r) {
					//r = JSON.parse(r);
					var obj = {
						"name": "新建文件夹",
						"id": r.result.dirId
					};
					//ts.dirList.push(obj);
				});

				//console.log("blurRemaneDir");
			},
			openDir(m, dir) {
				if(m == 2 && dir.isEditDir) return;
				if(m == 2 && dir && dir.id) {
					this.curDirId = dir.id;
					console.log(this.navBread.contains(dir));
					if(this.navBread.contains(dir)) return;
					this.navBread.push(dir);
				} else if(m == 1 && dir) {
					this.curDirId = dir.id;
				} else {
					this.curDirId = this.mainDirId;
					this.navBread = [];
				}
				this.getData();
			},
			imgSelectCur(i) {
				this.fileList.forEach(function(v) {
					v.cur = false;
				});
				i.cur = true;
				//if(i.tName == 'mImage') {
				this.itemMdata.isShow = false;
				//}
				/*if(this.itemMdata.url){
					this.itemMdata.url = i.url;
				}*/
				//debugger;

				//悬浮的图片
				if(this.btnShowOne == 4) {
					this.itemMdata.hoverUrl = i.url;
					console.log(2)
				}
				//原本的图片
				if(this.one_show == 1) {
					this.itemMdata.url = i.url;
					console.log(1)
					if(this.itemMdata.image) {
						this.itemMdata.image = i.url;
					} else {
						this.itemMdata.url = i.url;
					}
				}

				var ts = this;
				setTimeout(function() {
					ts.itemMdata.isShow = true;
				}, 100);

				//this.itemMdata.width = i.imgWidth;
				//this.itemMdata.height = i.imgHeight;
				//debugger;

				if(this.itemMdata.parentStyle) {
					this.itemMdata.parentStyle.width = i.imgWidth;
					this.itemMdata.parentStyle.height = i.imgHeight;
				}
				//debugger;
				this.$emit('recoent', this.itemMdata);
				//console.log("recoent");
			},
			oneshow: function() {
				this.one_show = 1;
				this.two_show = 0;
				this.three_show = 0;
				this.btnShowOne = 0;
			},
			twoshow: function() {
				this.two_show = 2;
				this.one_show = 0;
				this.three_show = 0;
				this.btnShowOne = 0;
			},
			threeshow() {
				this.three_show = 3;
				this.two_show = 0;
				this.one_show = 0;
				this.btnShowOne = 0;

			},
			btnOneShow() {
				this.btnShowOne = 4;
				this.one_show = 0;
				this.two_show = 0;
				this.three_show = 0;
			},
			getData() {
				var v = this;
				//debugger;
				api.get(root + '/file/list.action?companyId=' + this.company_id + '&dirId=' + this.curDirId, true, {},
					function(r) {
						r.result.files.forEach(function(v) {
							v.cur = false;
						});
						r.result.childrenDir.forEach(function(v) {
							v.isEditDir = false;
						});
						v.dirList = r.result.childrenDir; //isEditDir
						v.fileList = r.result.files;
					});
			}
			/*...mapMutations([
				'orderList'
		    ])*/
		},
		/*computed: {
			...mapGetters(["state"])
		}*/
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	/*.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}*/
	
	.imageEdit {
		background: #FFFFFF;
		.all {
			clear: both;
			overflow: hidden;
			background: #FFFFFF;
			border-bottom: 1px solid #CCCCCC;
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
					border-bottom: 1px solid #CCCCCC;
				}
				.active {
					width: 144px;
					border-bottom: 1px solid #CCCCCC;
					border-left: 5px solid #0D83ED;
					border-right: 1px solid #FFFFFF;
					color: #0D83ED;
				}
			}
			.right {
				float: right;
				width: 84.8%;
				height: 530px;
				.one .set {
					display: flex;
					margin-left: 20px;
					margin-top: 20px;
					button {
						clear: both;
						color: #666666;
						margin: 0 5px;
						cursor: pointer;
						background-color: #FFFFFF;
						height: 30px;
						padding: 0 10px;
						line-height: 30px;
						border-radius: 3px;
						span {
							display: block;
						}
						i {
							display: block;
							float: left;
							width: 25px;
							height: 25px;
							margin-top: 6px;
							background-image: url(/static/image/mbg01.png);
							background-repeat: no-repeat;
						}
					}
					.upload {
						border: 1px solid #E2E3E3;
						i {
							background-position: 5px -927px;
						}
					}
					.new {
						border: 1px solid #E2E3E3;
						i {
							background-position: 5px -959px;
						}
					}
					.move {
						border: 1px solid #E2E3E3;
						i {
							background-position: 5px -893px;
						}
					}
					/*.time {
						border: 1px solid #E2E3E3;
						i {
							float: right;
							background-position: 10px -1287px;
						}
					}*/
					.mark {
						margin-left: 15px;
						display: flex;
						margin-top: 3px;
						input {
							border: 1px solid #E2E3E3;
							background: none;
							width: 15px;
							height: 15px;
							margin-top: 4px;
							margin-right: 5px;
						}
						label {
							color: #666666;
						}
						button {
							height: 24px;
							line-height: 24px;
						}
					}
					.search {
						width: 170px;
						margin-left: 20px;
						border: 1px solid #E3E3E3;
						border-radius: 3px;
						height: 30px;
						input {
							margin-left: 10px;
							height: 30px;
							width: 70%;
						}
						button {
							float: right;
							margin: 0;
							width: 30px;
							height: 30px;
							background-image: url(/static/image/mbg01.png);
							background-repeat: no-repeat;
							background-position: 5px -1055px;
						}
					}
					.move_hid {
						position: absolute;
						top: 40px;
						left: 40px;
						right: 60px;
						bottom: 30px;
						z-index: 99;
						background: #FFFFFF;
						border-radius: 5px;
						box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
						.title {
							clear: both;
							overflow: hidden;
							height: 55px;
							line-height: 55px;
							border-bottom: 1px solid #E3E3E3;
							span {
								float: left;
								display: block;
								font-size: 16px;
								margin-left: 15px;
							}
							.hid {
								float: right;
								color: #888888;
								margin-right: 15px;
								cursor: pointer;
							}
						}
						.width {
							width: 80%;
							margin-left: 10%;
							.address {
								margin-top: 40px;
								clear: both;
								overflow: hidden;
								height: 36px;
								.input {
									clear: both;
									overflow: hidden;
									height: 36px;
									width: 70%;
									float: left;
									span {
										display: block;
										float: left;
										line-height: 35px;
										color: #666666;
									}
									input {
										border: 1px solid #E3E3E3;
										height: 33px;
										line-height: 33px;
										float: left;
										width: 220px;
										padding-left: 10px;
									}
									button {
										float: left;
										margin: 0;
										width: 45px;
										height: 35px;
										background-image: url(/static/image/mbg01.png);
										background-color: #557ce1;
										background-repeat: no-repeat;
										background-position: 13px -1079px;
										clear: none;
										border-radius: 0;
									}
								}
								.shuiying {
									float: right;
									margin-top: 10px;
								}
							}
							.list {
								height: 300px;
								clear: both;
								overflow: hidden;
								margin-top: 30px;
								border: 1px solid #E3E3E3;
								padding: 20px;
								li {
									float: left;
									width: 13%;
									margin-left: 20px;
									img {
										width: 100%;
										border: 1px solid #E3E3E3;
									}
								}
							}
							.button {
								width: 60%;
								margin: 10px auto;
								button:nth-child(1) {
									border: 1px solid #E3E3E3;
									text-align: center;
									color: #666666;
									width: 30%;
									height: 35px;
									line-height: 35px;
								}
								button:nth-child(2) {
									border: 1px solid #E3E3E3;
									text-align: center;
									color: #fff;
									width: 30%;
									height: 35px;
									line-height: 35px;
									background: #557ce1;
								}
							}
						}
					}
				}
				.one .detail ul.fr_con {
					clear: both;
					overflow: hidden;
					margin-top: 20px;
					margin-left: 25px;
					.edit {
						.icon {
							height: 76px;
							width: 82px;
							margin: 0 auto;
							display: block;
							background: url(/static/image/iconIndex2.png) -18px -487px;
						}
					}
					.font {
						input {
							display: none;
						}
						span {
							display: block;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
					.isedit {
						input {
							display: block;
							width: 95px;
							text-align: center;
						}
						span {
							display: none;
						}
					}
					li:last-child {
						padding-bottom: 52px;
					}
					li {
						float: left;
						width: 13%;
						text-align: center;
						.con {
							position: relative;
							border: 1px solid #E3E3E3;
						}
						padding-top: 8px;
						padding-right: 8px;
						margin-right: 15px;
						position: relative;
						img {
							width: 80px;
							height: 76px;
							position: relative;
						}
						p {
							text-align: center;
							color: #666666;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.checked {
							width: 24px;
							height: 18px;
							position: absolute;
							right: 0;
							display: none;
							bottom: 0;
							background: url(/static/image/mbg01.png) -139px -1458px;
						}
						.hid {
							position: absolute;
							right: 0;
							top: 0;
							width: 25px;
							height: 25px;
							display: none;
							background: url(/static/image/iconIndex2.png) -1033px 225px;
						}
					}
					li .cur .checked {
						display: block;
					}
					li:hover .con {
						border: 1px solid #409EFF;
					}
					li:hover .hid {
						display: block;
					}
				}
				.two ul {
					margin-left: 20px;
					margin-top: 20px;
					clear: both;
					overflow: hidden;
					li {
						float: left;
						width: 13%;
						position: relative;
						padding-top: 8px;
						padding-right: 8px;
						margin-right: 15px;
						img {
							width: 100%;
							position: relative;
						}
						p {
							text-align: center;
							color: #666666;
						}
					}
				}
				.three {
					margin: 20px;
					p {
						margin: 5px 0;
						input[type=text] {
							border: 1px solid #ccc;
						}
						textarea {
							width: 60%;
							border: 1px solid #ccc;
							vertical-align: top;
						}
						button,
						input[type=button] {
							background: #409EFF;
							padding: 5px 10px;
							border-radius: 5px;
							color: #fff;
						}
						.imgBack {
							position: relative;
							display: inline-block;
							.imgBack1 {
								width: 80px;
								height: 80px;
							}
							i {
								position: absolute;
								top: 0;
								right: 0;
								width: 25px;
								height: 25px;
								display: none;
								background: url(/static/image/iconIndex2.png) -1033px 225px;
							}
						}
						.imgBack:hover i {
							display: block;
						}
					}
				}
			}
		}
	}
	
	.nav_bread {
		margin-left: 20px;
		overflow: hidden;
		clear: both;
		li {
			float: left;
			cursor: pointer;
		}
	}
	
	.el-select {
		width: 75px;
		height: 30px;
		line-height: 30px;
	}
	
	.el-input {
		height: 30px;
	}
</style>