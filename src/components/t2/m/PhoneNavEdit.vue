<template>
	<div class="PhoneNavEdit">
		<div class="top">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">头部</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">侧导航</p>
		</div>
		<div class="one" v-if="typenumber == 1">
			<div class="name">
				<span>导航选择：</span>
				<p @click="namehid(1)">
					<input type="radio" name="name" id="name1" />
					<label for="name1">公司名称</label>
				</p>
				<p @click="namehid(2)">
					<input type="radio" name="name" id="name2" />
					<label for="name2">公司LOGO</label>
				</p>
			</div>
			<div class="name">
				<span>名称位置：</span>
				<p @click="place('left')">
					<input type="radio" name="place" id="place1" />
					<label for="place1">居左</label>
				</p>
				<p @click="place('center')">
					<input type="radio" name="place" id="place2" />
					<label for="place2">居中</label>
				</p>
				<p @click="place('right')">
					<input type="radio" name="place" id="place3" />
					<label for="place3">居右</label>
				</p>
			</div>
			<div class="icon">
				<span>导航ICON：</span>
				<img :src="phoneNav.mainText.web_icon" />
			</div>
			<div class="name">
				<span>返回按钮：</span>
				<p @click="phoneNav.backStyle.display='none'">
					<input type="radio" name="name" id="name1" />
					<label for="name1">隐藏</label>
				</p>
				<p @click="phoneNav.backStyle.display='block'">
					<input type="radio" name="name" id="name2" />
					<label for="name2">显示</label>
				</p>
				<div class="back_hid" v-if="phoneNav.backStyle.display == 'block'">
					<span>按钮样式：</span>
					<p>
						<span>颜色：</span>
						<input type="text" value="phoneNav.backStyle.color" v-model="phoneNav.backStyle.color" />
					</p>
					<p>
						<span>上边距：</span>
						<input type="text" value="phoneNav.backStyle.marginTop" v-model="phoneNav.backStyle.marginTop" />
					</p>
					<p>
						<span>大小：</span>
						<input type="text" value="phoneNav.backStyle.fontSize" v-model="phoneNav.backStyle.fontSize" />
					</p>
				</div>
			</div>
			<div class="textsize">
				<span>导航高度：</span>
				<input type="text" value="phoneNav.navheader.height" v-model="phoneNav.navheader.height" />
			</div>
			<div class="bgcolor">
				<span>背景颜色：</span>
				<el-color-picker v-model="phoneNav.navheader.background" show-alpha size="medium"></el-color-picker>
			</div>
			<div class="textcolor">
				<span>文字颜色：</span>
				<el-color-picker v-model="phoneNav.navheader.color" show-alpha size="medium"></el-color-picker>
			</div>
			<div class="textsize">
				<span>文字大小：</span>
				<input type="text" value="phoneNav.navheader.fontSize" v-model="phoneNav.navheader.fontSize" />
			</div>
			<div class="textsize">
				<span>LOGO大小：</span>
				<input type="text" value="phoneNav.navheaderImg.width" v-model="phoneNav.navheaderImg.width" />
			</div>
			<div class="hover">
				<span>侧导航样式：</span>
				<p>
					<span>背景色：</span>
					<el-color-picker v-model="router.hoverStyle.background" show-alpha size="medium"></el-color-picker>
				</p>
				<p>
					<span>字体颜色：</span>
					<el-color-picker v-model="router.tTextStyle.color" show-alpha size="medium"></el-color-picker>
				</p>
				<p class="all" @click="setStyle">应用全网站？</p>
				<!--<p>
					<span>边框颜色：</span>
					<el-color-picker v-model="mItem[0].liStyle.borderBottomColor" show-alpha size="medium"></el-color-picker>
				</p>-->
			</div>
		</div>
		<div class="two" v-if="typenumber == 2">
			<div class="ad_con"><span class="add_nav" @click="dialogVisible(1)">添加栏目</span></div>
			<div class="g-cf tit_header"><span style="width: 180px;">栏目名称</span><span>栏目类型</span><span>操作</span></div>
			<div class="outer">
				<div class="inner">
					<ul class="nav_i0">
						<li class="nav_lifirth" v-for="(item,index) in router.navItem">
							<p class="order">
								<span @click="navUp(item,index)" v-show="index != 0">↑</span>
								<span @click="navDown(item,index)">↓</span>
							</p>
							<div class="g-cf tit_i1">
								<i class="dt_con arrow"></i>
								<span class="url_name">{{item.column_name}}</span>
								<span class="col_umn ">{{item.column_type==1?"系统栏目":"自定义栏目"}}</span>
								<span class="edit">
								<i @click="editSecon(4,item)">[编辑]</i>
								<em class="design" @click="goDesign(item)">[设计]</em>
								<em class="del" @click="delSecon(1,item)">[删除]</em>
							</span>
								<span @click="dialogVisible(2,index,item)" class="addColIcon"></span>
							</div>
							<ul class="sec_con">
								<li v-for="second in item.secondNav">
									<div class="g-cf tit_i2">
										<i class="dt_con arrow"></i>
										<span class="url_name">{{second.column_name}}</span>
										<span class="col_umn ">{{second.column_type==1?"系统栏目":"自定义栏目"}}</span>
										<span class="edit">
										<i @click="editSecon(4,second)">[编辑]</i>
										<em class=" design" @click="goDesign(second)">[设计]</em>
										<em class="del " @click="delSecon(2,second) ">[删除]</em>
									</span>
										<span class="addColIcon " @click="dialogVisible(3,index,second) "></span>
									</div>
									<div class="third_con">
										<div class="g-cf third_item " v-for="third in second.thirdNav">
											<i class="dt_con arrow "></i>
											<span class="url_name ">{{third.column_name}}</span>
											<span class="col_umn ">{{third.column_type==1?"系统栏目":"自定义栏目"}}</span>
											<span class="edit ">
											<i @click="editSecon(4,third)">[编辑]</i>
											<em class="design" @click="goDesign(third)">[设计]</em> 
											<em class="del" @click="delSecon(3,third)">[删除]</em>
										</span>
										</div>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<el-dialog title="添加栏目" :visible.sync="addVisibleNav" width="50%">
				<div class="g-cf add_nav_cons">
					<ul class="left">
						<li @click="oneshow(0)" :class="{active:one_show}"><i class="icon_side"></i>常规</li>
						<li @click="oneshow(1)" :class="{active:!one_show}"><i class="icon_side"></i>百度优化</li>
					</ul>
					<div class="list_con">
						<div class="lis0" v-show="one_show">
							<el-form ref="form" :model="form" label-width="120px">
								<el-form-item label="栏目名称：">
									<el-input v-model="curObj.column_name" class="wh_220"></el-input>
								</el-form-item>
								<el-form-item label="栏目类型：">
									<el-select v-model="form.navType" placeholder="请选择栏目类型">
										<el-option label="默认" value="default"></el-option>
										<el-option label="自定义链接" value="customlink"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item v-if="form.navType=='default'" label="选择上级栏目(一级导航)：">
									<el-select v-model="parentFirstCur" @change="changFistType" placeholder="请选择栏目类型">
										<el-option label="请选择" value="请选择"></el-option>
										<el-option v-for="rut in router.navItem" :key="rut.id" :label="rut.column_name" :value="rut.id">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item v-if="form.navType=='default'" label="选择上级栏目(二级导航)：">
									<el-select v-model="parentSecCur" @change="changSecType" placeholder="请选择栏目类型">
										<el-option label="请选择" value="请选择"></el-option>
										<el-option v-for="rut in secondNav" :key="rut.id" :label="rut.column_name" :value="rut.id">
										</el-option>
									</el-select>
								</el-form-item>

								<el-form-item v-if="form.navType=='customlink'" label="自定义地址：">
									<el-input v-model="curObj.url" style="width: 220px;"></el-input>
								</el-form-item>

								<!--el-form-item label="打开方式：">
								<el-checkbox-group v-model="form.openByNewPage">
									<el-checkbox label="在新页面打开" name="type"></el-checkbox>
								</el-checkbox-group>
							</el-form-item-->

								<el-form-item label="打开方式：">
									<el-radio-group v-model="curObj.open_type">
										<el-radio label="1">当前窗口</el-radio>
										<el-radio label="2">新窗口</el-radio>
									</el-radio-group>
								</el-form-item>

								<!--el-form-item label="栏目权限：">
									<el-radio-group v-model="curObj.rights">
										<el-radio label="1">所有人可见</el-radio>
										<el-radio label="2">会员可见</el-radio>
									</el-radio-group>
								</el-form-item-->

							</el-form>

						</div>
						<div class="lis1" v-show="!one_show">
							<el-form ref="form" :model="form" label-width="120px">
								<el-form-item label="网页标题：">
									<el-input v-model="curObj.title" class="wh_220"></el-input>
								</el-form-item>
								<el-form-item label="页面关键字：">
									<el-input type="textarea" v-model="curObj.keyword" class="wh_220"></el-input>
								</el-form-item>
								<el-form-item label="页面描述：">
									<el-input type="textarea" v-model="curObj.desc" class="wh_220"></el-input>
								</el-form-item>
								<el-form-item label="导航栏描述：">
									<el-input v-model="curObj.nav_desc" class="wh_220"></el-input>
								</el-form-item>
								<!--el-form-item label="自定义地址：">
								<el-input v-model="curObj.link_url" class="wh_220"></el-input>
							</el-form-item-->
							</el-form>
							<!--form>
							<ul>
								<li><label><span>网页标题 :</span><input value="" v-model="browserTitle" type="text"></label></li>
								<li><label><span>页面关键字:</span><input value="" v-model="searchKey" type="text"></label></li>
								<li><label><span>页面描述 :</span><input value=""  v-model="searchDesc" type="text"></label></li>
								<li><label><span>导航栏描述 :</span><input value="" v-model="navDesc" type="text"></label></li>
								<li><label><span>自定义地址 :</span><input value="" v-model="cusAddressInput" type="text"></label></li>
							</ul>
						</form--->
						</div>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
		    <el-button @click="addVisibleNav = false">取 消</el-button>
		    <el-button type="primary" @click="addVisibleFun">保 存</el-button>
		  </span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from '@/components/t2/m/mImageEdit.vue'
	import api from '@/api/$ajax.js'
	import dat from '../../../../static/js/sideData.js'

	/**
	 * 生成一个用不重复的ID
	 */
	function GenNonDuplicateID(randomLength) {
		return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
	}

	export default {
		name: 'PhoneNavEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '编辑手机导航',
				dialogImageUrl: '',
				addVisibleNav: false,
				typenumber: '1',
				token: this.$route.query.token,
				addVisibleNav: false,
				one_show: true,
				grade: "",
				secondNav: [],
				preview: '/pc/t2/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.mobile_version_id
				},
				link: "",
				curObj: {},
				index: 0,
				browserTitle: "",
				navDesc: '',
				searchDesc: "",
				parentFirstCur: "",
				parentSecCur: "",
				cusAddressInput: '',
				customlink: "",
				searchKey: "",
				form: {
					name: '',
					cusLink: '',
					openByNewPage: '',
					navType: 'default',
					upArea: '',
					openWith: ""
				},
				phoneNav2: '',
				mItem: dat.map((obj, index) => {
					obj.order = index + 1;
					var mtIteml = obj.mtIteml;
					if(mtIteml && mtIteml.length) {
						for(var i = 0; mtIteml.length > i; i++) {
							var itemArr = mtIteml[i].itemArr;
							if(itemArr && itemArr.length) {
								for(var j = 0; itemArr.length > j; j++) {
									if(itemArr[j].tName == 'moduleAreaNav') {
										var moduleAreaNav = itemArr[j];
									}
								}
							}
						}
					}
					return moduleAreaNav;
				})
			}
		},
		components: {
			mImageEdit
		},
		created() {
			//this.phoneNav.backStyle = this.phoneNav.backStyle ||{};
			//this.phoneNav.logoStyle = this.phoneNav.logoStyle ||{};
			this.getData();
			this.phoneNav.backStyle = this.state.phoneNav.backStyle;
			this.phoneNav.logoStyle = this.state.phoneNav.logoStyle;
			//console.log(this.phoneNav.backStyle)
		},
		methods: {
			setStyle(){
				this.setAllStyle(this.param);
			},
			navUp(item, index) {
				this.router.navItem.splice(index - 1, 0, (this.router.navItem[index]));
				this.router.navItem.splice(index + 1, 1);

				var ts = this;
				var Id = new Array;
				var allId = '';
				for(var i = 0; i < ts.router.navItem.length; i++) {
					Id[i] = ts.router.navItem[i].id;
				};
				allId = Id.join(",");

				console.log(Id);
				console.log(allId);

				api.get('/api/data/setColumnSort?ids=' + allId + '&token=' + this.param.token, false, function(data) {
					if(data.code == 422) {} else {
						ts.getData();
					}
				})
			},
			navDown(item, index) {
				this.router.navItem.splice(index + 2, 0, (this.router.navItem[index]));
				this.router.navItem.splice(index, 1);
				if(index == this.router.navItem.length - 1) {
					alert("已经是最后一项啦！");
				};

				var ts = this;
				var Id = new Array;
				var allId = '';
				for(var i = 0; i < ts.router.navItem.length; i++) {
					Id[i] = ts.router.navItem[i].id;
				};
				allId = Id.join(",");

				console.log(Id);
				console.log(allId);

				api.get('/api/data/setColumnSort?ids=' + allId + '&token=' + this.param.token, false, function(data) {
					if(data.code == 422) {} else {
						ts.getData();
					}
				})
				//this.$emit('setColumn', allId);
			},
			place(text) {
				this.phoneNav.logoStyle.textAlign = text;
			},
			oneshow(num) {
				this.one_show = !!!num;
			},
			dialogVisible(grade, index, parent) {
				this.addVisibleNav = true;
				this.grade = grade;
				this.index = index;
				if(parent) {
					this.curObj = parent;
					this.curObj.column_name = "";
					this.curObj.parent_id = parent.id;
				}
			},
			changFistType() {
				var navItem = this.router.navItem;
				this.curObj.parent_id = this.parentFirstCur;
				for(var i = 0; navItem.length > i; i++) {
					if(navItem[i].id == this.parentFirstCur) {
						this.secondNav = navItem[i].secondNav || [];
						this.parentSecCur = "";
					}
				}
			},
			changSecType() {
				this.curObj.parent_id = this.parentSecCur;
			},
			editSecon(grade, curObj) {
				this.addVisibleNav = true;
				this.curObj = curObj;
			},
			goDesign(item) {
				var link = item.id;
				this.curObj = item;
				if(link) {
					if(Number(link)) {
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
					} else if(link.indexOf("http") != -1) {
						location.href = link;
					} else {
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
					}
				}
			},
			delSecon(grade, curObj) {
				var ts = this;
				api.get('/api/data/delColumn?template_id=' + this.param.id + '&column_id=' + curObj.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id, true, {}, r => {
					if(r.code == 422) {
						//return;
					} else {
						ts.getData();
					}
				});
			},
			getData() {
				//				var ts = this;
				//				api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id, r => {
				//					if(r.code == 422) {
				//						console.log(r.message);
				//						return;
				//					}
				//					ts.router.navItem = r.data.list;
				//				});
				api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id, true, {}, r => {
					if(r.code == 422) {
						console.log(r.message);
						return;
					}
					//var state = JSON.parse(r.data.content);
					//console.log(r.data.list);
					var list = r.data.list;
					//this.router.navItem
					var firstList = [];
					for(let i = 0; list.length > i; i++) {
						//console.log(list[i].parent_id=1);
						list[i].secondNav = [];
						if(list[i].parent_id == 0) {

							firstList.push(list[i])
						}
					}
					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; list.length > k; k++) {
							list[k].thirdNav = [];
							if(firstList[i].id == list[k].parent_id) {
								firstList[i].secondNav.push(list[k])
							}
						}
					}

					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; firstList[i].secondNav.length > k; k++) {
							//var thirdNav = firstList[i].secondNav[k]
							for(let j = 0; list.length > j; j++) {
								//firstList[i].secondNav[k].thirdNav = [];
								if(firstList[i].secondNav[k].id == list[j].parent_id) {

									firstList[i].secondNav[k].thirdNav.push(list[j])
								}
							}
						}
					}

					this.router.navItem = firstList;
				});
			},
			addVisibleFun() {
				var navItem = this.router.navItem;
				if(this.form.navType == 'customlink') {
					if(!this.curObj.url) {
						alert("请设置你的自定义地址");
					}
				} else {
					if(this.grade == 1) {
						this.curObj.id = "";
						this.curObj.parent_id = 0;
						this.curObj.url = "count" + navItem.length;
						this.addProps(this.curObj.url);
					} else if(this.grade == 2) {
						this.curObj.url = "count2" + GenNonDuplicateID();
						this.curObj.id = "";
						this.addProps(this.curObj.url);
					} else if(this.grade == 3) {
						this.curObj.url = "count3" + GenNonDuplicateID();
						this.curObj.id = "";
						this.addProps(this.curObj.url);
					}

				}
				this.addVisibleNav = false;
				var ts = this;
				var obj = {
					token: this.param.token,
					column_id: this.curObj.id,
					parent_id: this.curObj.parent_id,
					column_name: this.curObj.column_name,
					version_id: this.param.version_id,
					service_id: this.curObj.service_id,
					open_type: this.curObj.open_type,
					rights: this.curObj.rights,
					title: this.curObj.title,
					keyword: this.curObj.keyword,
					is_show: this.curObj.is_show,
					is_enable: this.curObj.is_enable,
					desc: this.curObj.desc,
					nav_desc: this.curObj.nav_desc,
					url: this.curObj.url,
					column_type: this.curObj.column_type,
					template_id: this.param.id,
					type: this.param.type
				};

				api.post("/api/data/saveColumn", true, obj, function(data) {
					if(data.code == 422) {
						//localStorage.removeItem(obj.id);	
					} else {
						alert("保存成功！");
						ts.getData();
					}
				});

			},
			changetype: function(number) {
				this.typenumber = number
			},

			namehid(i) {
				this.phoneNav.namenumber = i;
			},
			recoent(i) {
				this.itemMdata.conStyle.backgroundImage = 'url("' + i.url + '")';
			},
			beforeRemoveImg() {
				this.itemMdata.conStyle.backgroundImage = '';
				this.itemMdata.mImage.url = "";
				//return this.$confirm(`确定移除 ${ file.name }？`);
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
			...mapActions([
				"saveloca"
			]),
			...mapMutations([
				'orderbyId', 'setDelayed', 'delItemPos', 'copyModule', 'delStreamModule', 'setCurOrder', 'setItemSite', 'pushItemStream', "pushItemPosCom", "pushItemStreamItem", "delItemStream", "change","setAllStyle","addProps"
			])
		},
		computed: {
			...mapGetters(["state", "getDataCur", "router", "phoneNav", "itemCon"])
		},
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.PhoneNavEdit {
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
			.name {
				margin-top: 10px;
				clear: both;
				overflow: hidden;
				span {
					width: 100px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-right: 15px;
				}
				.hid {
					input {
						float: left;
						width: 200px;
						line-height: 30px;
						border: 1px solid #E3E3E3;
						padding-left: 10px;
					}
					img {
						background: #F5F5F5;
						border: 1px solid #E3E3E3;
					}
				}
				.back_hid {
					clear: both;
					overflow: hidden;
					margin-top: 10px;
					p {
						span {
							width: auto;
						}
						input {
							width: 80px;
							border: 1px solid #E3E3E3;
							line-height: 25px;
							text-align: center;
						}
					}
				}
			}
			.icon {
				margin-top: 15px;
				clear: both;
				overflow: hidden;
				span {
					width: 100px;
					text-align: right;
					float: left;
				}
				img {
					width: auto;
				}
			}
			.bgcolor {
				margin-top: 15px;
				clear: both;
				overflow: hidden;
				span {
					width: 100px;
					text-align: right;
					float: left;
				}
			}
			.textcolor {
				margin-top: 15px;
				clear: both;
				overflow: hidden;
				span {
					width: 100px;
					text-align: right;
					float: left;
				}
			}
			.textsize {
				margin-top: 10px;
				clear: both;
				overflow: hidden;
				span {
					width: 100px;
					text-align: right;
					float: left;
				}
				input {
					float: left;
					width: 200px;
					line-height: 30px;
					border: 1px solid #E3E3E3;
					padding-left: 10px;
				}
			}
			.hover {
				margin-top: 10px;
				clear: both;
				overflow: hidden;
				line-height: 35px;
				span {
					width: 100px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
				}
				.all{
					margin-left: 10px;
					color: #FFFFFF;
					background: #5ea6f1;
					font-size: 12px;
					line-height: 25px;
					padding: 0 5px;
					border-radius: 5px;
					margin-top: 5px;
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 15px;
			.ad_con {
				height: 32px;
				line-height: 32px;
			}
			.add_nav {
				float: right;
				border: 1px solid #8f8f8f;
				cursor: pointer;
				line-height: 25px;
				padding: 0 5px;
				background: #f5f5f5;
				color: #666;
			}
			.add_nav:hover {
				border: 1px solid #3298fe;
				background: #e8f3fe;
				color: #666
			}
			.tit_header {
				border: 1px solid #b5c8eb;
				border-bottom: none;
				background-color: #eef3fe;
				line-height: 35px;
				span {
					width: 170px;
					float: left;
					text-align: left;
					padding-left: 15px;
				}
			}
			.outer {
				border: 1px solid #B5C8EB;
				line-height: 30px;
				.inner {
					height: auto;
					position: relative;
					padding-bottom: 15px;
					overflow: hidden;
					ul {}
				}
			}
			.tit_i1,
			.tit_i2,
			.third_con div {
				background-color: whiteSmoke;
				margin: 0 30px 10px 10px;
				border: 1px solid #B5C8EB;
				border-radius: 2px;
			}
			.tit_i1,
			.third_item,
			.tit_i2 {
				.dt_con {
					float: left;
					width: 20px;
					background: url(/static/image/bg01.png) -1545px -65px no-repeat;
					cursor: pointer;
					height: 30px;
				}
				.arrow {
					background-position: -1650px -97px;
				}
				span {
					float: left;
					width: 100px;
				}
				.url_name {
					width: 180px;
				}
				.col_umn {
					width: 160px;
				}
				.edit {
					width: 170px;
					text-align: left;
					padding-left: 10px;
				}
				.open_col {
					width: 50px;
					i {
						cursor: pointer;
						float: left;
						background: url(/static/image/bg02.png) no-repeat -310px -346px;
						height: 23px;
						width: 30px;
						margin: 0 10px;
					}
					.checked_off {
						background: url(/static/image/bg02.png) no-repeat -310px -368px;
					}
				}
				.addColIcon {
					width: 20px;
					height: 20px;
					margin-left: 3px;
					margin-top: 4px;
					float: right;
					position: relative;
					right: -25px;
					background-image: url(/static/image/jh2.gif);
					background-repeat: no-repeat;
					background-size: 10px;
					background-position: 3px 4px;
					cursor: pointer;
				}
			}
			.tit_i2 {
				.url_name {
					width: 160px;
				}
				.edit {
					width: 170px;
					text-align: left;
					padding-left: 10px;
				}
			}
			.third_item {
				.url_name {
					width: 130px;
				}
			}
			.sec_con {
				padding-left: 20px;
				.tit_i2 {
					margin-bottom: 10px;
				}
				li {
					margin-bottom: 10px;
					.third_con {
						padding-left: 30px;
					}
				}
			}
			.third_item {
				.edit {
					width: 170px;
				}
			}
			.nav_i0 {
				padding: 10px 0;
				.nav_lifirth {
					.tit_i1 {
						margin-bottom: 10px;
					}
					.third_item {
						margin-bottom: 10px;
					}
					.order {
						right: 30px;
						position: absolute;
						span {
							display: block;
							float: left;
							color: #fff;
							padding: 0 5px;
							line-height: 22px;
							border-radius: 100%;
							margin-top: 5px;
							margin-left: 5px;
						}
						span:nth-child(1) {
							background: #409eff;
						}
						span:nth-child(2) {
							background: #1e76d2;
						}
					}
				}
			}
		}
		.add_nav_cons {
			border-bottom: 1px solid #e3e2e8;
			.left {
				float: left;
				width: 20%;
				li {
					position: relative;
					height: 44px;
					border-left: 0;
					cursor: pointer;
					border-right: 0;
					text-align: center;
					line-height: 44px;
					border-bottom: 1px solid #e3e2e8;
					.icon_side {
						height: 44px;
						width: 4px;
						display: none;
						float: left;
						background-color: #4e708f;
					}
				}
				li.active {
					width: 100.8%;
					background: #fff;
					.icon_side {
						display: block;
					}
				}
			}
			.list_con {
				float: left;
				border-left: 1px solid #e3e2e8;
				width: 79%;
				.lis0,
				.lis1 {
					padding: 20px 0;
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