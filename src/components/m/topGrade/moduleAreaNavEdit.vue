<template>
	<div class="moduleAreaNavEdit">
		<div class="ad_con"><span class="add_nav" @click="dialogVisible(1)">添加栏目</span></div>
		<div class="g-cf tit_header"><span style="width: 174px;">栏目名称</span><span>栏目类型</span><span style="width: 70px;">开启栏目</span><span style="width: 70px;">显示栏目</span><span style="width: 183px;">操作</span></div>
		<div class="outer">
			<div v-iscroll class="inner">
				<ul class="nav_i0">
					<li class="nav_lifirth" v-for="(item,index) in router.navItem">
						<p class="order">
							<span @click="navUp(item,index)" v-show="index != 0">↑</span>
							<span @click="navDown(item,index)">↓</span>
						</p>
						<div class="g-cf tit_i1">
							<i class="dt_con arrow"></i>
							<span class="url_name">{{item.column_name}}</span>
							<span class="col_umn">{{item.column_type==1?"系统栏目":"自定义栏目"}}</span>
							<span class="open_col" @click="updownColumn(item)">
								<i :class="{checked_off:item.is_enable==0}"></i>
							</span>
							<span class="open_col" @click="fucOpenColumn(item)">
								<i :class="{checked_off:item.is_show==0}"></i>
							</span>
							<span class="open_col"></span>
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
									<span class="col_umn">{{second.column_type==1?"系统栏目":"自定义栏目"}}</span>
									<span class="open_col" @click="updownColumn(second)">
										<i :class="{checked_off:second.is_enable==0}"></i>
									</span>
									<span class="open_col" @click="fucOpenColumn(second)">
										<i :class="{checked_off:second.is_show==0}"></i>
									</span>
									<span class="edit">
										<i @click="editSecon(4,second)">[编辑]</i>
										<em class=" design" @click="goDesign(second)">[设计]</em>
										<em class="del " @click="delSecon(2,second) ">[删除]</em>
									</span>
									<span class="addColIcon" @click="dialogVisible(3,index,second)"></span>
								</div>
								<div class="third_con">
									<div class="g-cf third_item" v-for="third in second.thirdNav">
										<i class="dt_con arrow "></i>
										<span class="url_name ">{{third.column_name}}</span>
										<span class="col_umn ">{{third.column_type==1?"系统栏目":"自定义栏目"}}</span>
										<span class="open_col" @click="updownColumn(third)">
											<i :class="{checked_off:third.is_enable==0}"></i>
										</span>
										<span class="open_col" @click="fucOpenColumn(third)">
											<i :class="{checked_off:third.is_show==0}"></i>
										</span>
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
		<el-dialog title="添加栏目" :visible.sync="addVisibleNav" width="30%">
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
								<el-input v-model="curObj.url" style="width:220px;"></el-input>
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
</template>
<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import api from '@/api/$ajax.js'
	import Vue from 'vue'
	import VIscroll from 'viscroll';
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

	/**
	 * 生成一个用不重复的ID
	 */
	function GenNonDuplicateID(randomLength) {
		return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
	}
	//GenNonDuplicateID()将生成 rfmipbs8ag0kgkcogc 类似的ID

	export default {
		name: 'moduleAreaNavEdit',
		props: ['itemMdata'],
		created() {
			console.log(this.router);
			this.getData();
		},
		methods: {
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
				} else {
					this.curObj = {};
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
				//	var navItem = this.navItem;
				this.curObj.parent_id = this.parentSecCur;

				/*for(var i = 0; navItem.length > i; i++) {
					var secondNav = navItem[i].secondNav;
					for(var j = 0; secondNav.length > j; j++) {
						if(secondNav[j].id == this.parentSecCur) {
							this.thirdNav = secondNav[j].thirdNav || [];
							this.form0.thirTitle = "";
						}
					}
				}*/
			},
			updownColumn(item) {
				var ts = this;
				if(item.is_enable == 1) {
					item.is_enable = 0;
				} else {
					item.is_enable = 1;
				}
				console.log(item);
				var obj = {
					token: this.param.token,
					column_id: item.id,
					parent_id: item.parent_id,
					column_name: item.column_name,
					version_id: this.param.version_id,
					service_id: item.service_id,
					open_type: item.open_type,
					rights: item.rights,
					title: item.title,
					is_show: item.is_show,
					is_enable: item.is_enable,
					keyword: item.keyword,
					desc: item.desc,
					nav_desc: item.nav_desc,
					url: item.url,
					template_id: this.param.id,
					type: this.param.type
				};
				api.post("/api/data/saveColumn", true, obj, function(data) {
					if(data.code == 422) {
						
					} else {
						ts.getData();
					}
				});
			},
			fucOpenColumn(item) {
				var ts = this;
				if(item.is_show == 1) {
					item.is_show = 0;
				} else {
					item.is_show = 1;
				}
				console.log(item);
				var obj = {
					token: this.param.token,
					column_id: item.id,
					parent_id: item.parent_id,
					column_name: item.column_name,
					version_id: this.param.version_id,
					service_id: item.service_id,
					open_type: item.open_type,
					rights: item.rights,
					title: item.title,
					is_show: item.is_show,
					is_enable: item.is_enable,
					keyword: item.keyword,
					desc: item.desc,
					nav_desc: item.nav_desc,
					url: item.url,
					column_type: item.column_type,
					template_id: this.param.id,
					type: this.param.type
				};

				api.post("/api/data/saveColumn", true, obj, function(data) {
					if(data.code == 422) {} else {
						ts.getData();
					}
				});
			},
			editSecon(grade, curObj) {
				//this.form.name = curObj.column_name;
				//this.form.upArea = curObj.url;
				this.addVisibleNav = true;
				this.curObj = curObj;
				//this.grade = grade;

			},
			goDesign(item) {
				//this.saveloca(this.param);
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
			removeComponent(i) {
				this.$emit('removeComponent', i);
			},
			getData() {
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
			...mapMutations([
				'addProps'
			]),
			...mapActions([
				'saveloca'
			])
		},
		computed: {
			...mapGetters(["router", 'itemCon'])
		},
		data() {
			return {
				title: "编辑栏目导航",
				addVisibleNav: false,
				one_show: true,
				grade: "",
				secondNav: [],
				preview: '/pc/t1/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				param: {
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id
				},
				curObj: {},
				index: 0,
				browserTitle: "",
				navDesc: '',
				parentFirstCur: "",
				parentSecCur: "",
				searchDesc: "",
				cusAddressInput: '',
				customlink: "",
				searchKey: "",
				form: {
					name: '',
					cusLink: '',
					openByNewPage: '',
					navType: 'default',
					upArea: '',
					open_type: "",
					openWith: ""
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.moduleAreaNavEdit {
		padding: 0 10px;
		.ad_con {
			height: 32px;
			line-height: 32px;
			padding: 10px;
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
			span {
				width: 130px;
				float: left;
				text-align: center;
			}
		}
		.outer {
			border: 1px solid #B5C8EB;
			line-height: 30px;
			.inner {
				height: 365px;
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
				width: 110px;
			}
			.url_name {
				width: 170px;
			}
			.col_umn {
				width: 110px;
			}
			.edit {
				width: 170px;
				text-align: center;
			}
			.open_col {
				width: 70px;
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
				width: 150px;
			}
			.edit {
				width: 170px;
				text-align: center;
			}
		}
		.third_item {
			.url_name {
				width: 120px;
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
</style>