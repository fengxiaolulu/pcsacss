<template>
	<div class="moduleAreaNavEdit">
		<div class="ad_con"><span class="add_nav" @click="dialogVisible(1)">添加栏目</span></div>
		<div class="g-cf tit_header"><span style="width: 174px;">栏目名称</span><span>栏目类型</span><span style="width: 120px;">开启栏目</span><span>操作</span></div>
		<div class="outer">
			<div v-iscroll class="inner">
				<ul class="nav_i0">
					<li class="nav_lifirth" v-for="(item,index) in router.navItem">
						<div class="g-cf tit_i1"><i class="dt_con arrow"></i><span class="url_name">{{item.tText}}</span><span class="col_umn">{{item.columnType}}</span><span class="open_col"><i class="checked_off">{{item.openColumn}}</i></span><span class="open_col"></span><span class="edit"><i @click="editSecon(4,item)">[编辑]</i> <em class="design" @click="goDesign(item.link)">[设计]</em> <em class="del" @click="delSecon(1,item)">[删除]</em></span><span @click="dialogVisible(2,index,item)" class="addColIcon">11</span></div>
						<ul class="sec_con">
							<li v-for="second in item.secondNav">
								<div class="g-cf tit_i2"><i class="dt_con arrow"></i><span class="url_name">{{second.tText}}</span><span class="col_umn">{{second.columnType}}</span><span class="open_col"><i>{{second.openColumn}}</i></span><span class="edit"><i @click="editSecon(4,second)">[编辑]</i> <em class=" design" @click="goDesign(second.link)">[设计]</em> <em class="del " @click="delSecon(2,second) ">[删除]</em></span><span class="addColIcon " @click="dialogVisible(3,index,second) "></span></div>
								<div class="third_con ">
									<div class="g-cf third_item " v-for="third in second.thirdNav "><i class="dt_con arrow "></i><span class="url_name ">{{third.tText}}</span><span class="col_umn ">{{third.columnType}}</span><span class="open_col "><i>{{third.openColumn}}</i></span><span class="edit "><i @click="editSecon(4,third)">[编辑]</i> <em class="design" @click="goDesign(third.link)">[设计]</em> <em class="del" @click="delSecon(3,third)">[删除]</em></span>
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
								<el-input v-model="form.name" class="wh_220"></el-input>
							</el-form-item>
							<el-form-item label="栏目类型：">
								<el-select v-model="form.navType" placeholder="请选择栏目类型">
									<el-option label="默认" value="default"></el-option>
									<el-option label="自定义链接" value="customlink"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item v-if="form.navType=='default'" label="选择上级栏目：">
								<el-select v-model="form.upArea" placeholder="请选择栏目类型">
									<!--el-option v-for = "i in router.navItem" label="区域一" value="shanghai"></el-option-->
									<el-option v-for="rut in router.navItem" :key="rut.link" :label="rut.tText" :value="rut.link">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item v-if="form.navType=='customlink'" label="自定义地址：">
								<el-input v-model="form.cusLink" style="width: 220px;"></el-input>
							</el-form-item>
							<el-form-item label="打开方式：">
								<el-checkbox-group v-model="form.openByNewPage">
									<el-checkbox label="在新页面打开" name="type"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>

							<!--el-form-item label="打开方式：">
								<el-radio-group v-model="form.openWith">
									<el-radio label="当前窗口"></el-radio>
									<el-radio label="新窗口"></el-radio>
								</el-radio-group>
							</el-form-item-->

							<el-form-item label="栏目权限：">
								<el-radio-group v-model="form.openWith">
									<el-radio label="所有人可见"></el-radio>
									<el-radio label="会员可见"></el-radio>
								</el-radio-group>
							</el-form-item>
						</el-form>

					</div>
					<div class="lis1" v-show="!one_show">
						<el-form ref="form" :model="form" label-width="120px">
							<el-form-item label="网页标题：">
								<el-input v-model="form.browserTitle" class="wh_220"></el-input>
							</el-form-item>
							<el-form-item label="页面关键字：">
								<el-input type="textarea" v-model="form.searchKey" class="wh_220"></el-input>
							</el-form-item>
							<el-form-item label="页面描述：">
								<el-input type="textarea" v-model="form.desc" class="wh_220"></el-input>
							</el-form-item>
							<el-form-item label="导航栏描述：">
								<el-input v-model="form.navDesc" class="wh_220"></el-input>
							</el-form-item>
							<el-form-item label="自定义地址：">
								<el-input v-model="form.cusAddressInput" class="wh_220"></el-input>
							</el-form-item>
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
	export default {
		name: 'moduleAreaNavEdit',
		props: ['itemMdata'],
		created() {
			console.log(this.router);
		},
		methods: {
			oneshow(num) {
				this.one_show = !!!num;
			},
			dialogVisible(grade, link) {
				this.grade = grade;
				this.link = link;
				this.addVisibleNav = true;
			},
			editSecon(grade, curObj) {
				this.form.name = curObj.tText;
				this.form.upArea = curObj.link;
				this.addVisibleNav = true;
				this.link = curObj;
				this.grade = grade;
			},
			goDesign(link) {
				this.saveloca(this.id);
				if(link) {
					if(link.indexOf("http") != -1) {
						location.href = link;					
					} else {
						//this.$router.push(this.preview + link);
						location.href = this.preview + link;
					}
				}
				console.log(this.preview + link);
			},
			delSecon(grade, curObj) {
				var navItem = this.router.navItem;
				if(grade == 1) {
					navItem.splice(navItem.indexOf(curObj), 1);
				} else if(grade == 2) {
					for(let j = 0; navItem.length > j; j++) {
						let secondNav = navItem[j].secondNav;
						secondNav.splice(secondNav.indexOf(curObj), 1);
					}
				} else if(grade == 3) {
					for(let j = 0; navItem.length > j; j++) {
						let secondNav = navItem[j].secondNav;
						if(secondNav) {
							for(let k = 0; secondNav.length > k; k++) {
								var thirdNav = secondNav[k].thirdNav;
								if(thirdNav) {
									console.log(thirdNav)
									thirdNav.splice(thirdNav.indexOf(curObj), 1);
								}

							}
						}

					}
				}
				/*for(var j = 0; stream.length > j; j++) {
					var itemInner = stream[j].itemInner;
					itemInner.splice(itemInner.indexOf(comp), 1);
				}*/
			},
			addVisibleFun() {
				var navItem = this.router.navItem;
				console.log(this.grade);
				console.log(this.link);
				if(this.grade == 1) {
					let item = {
						tName: "count" + navItem.length,
						tText: this.form.name,
						columnType: "自定义栏目",
						isEdit: false,
						openColumn: 1,
						isDel: true,
						link: "count" + navItem.length,
						secondNav: []
					};
					var flag = true;
					if(this.form.upArea) {
						for(var i = 0; navItem.length > i; i++) {
							console.log('navItem:' + navItem[i])
							console.log(navItem[i])
							if(this.form.upArea == navItem[i].link) {
								flag = false;
								let item = {
									tName: "count2" + navItem[i].secondNav.length || 0,
									tText: this.form.name,
									columnType: "自定义栏目",
									isEdit: false,
									openColumn: 1,
									isDel: true,
									link: "count" + navItem[i].secondNav.length || 0,
									thirdNav: []
								};
								navItem[i].secondNav.push(item);
							}
						}
					}

					flag && navItem.push(item);
				} else if(this.grade == 2) {
					let item = {
						tName: "count2" + this.link.secondNav.length,
						tText: this.form.name,
						columnType: "自定义栏目",
						isEdit: false,
						openColumn: 1,
						isDel: true,
						thirdNav: [],
						link: "count2" + this.link.secondNav.length,
					};
					if(this.link.secondNav) {
						this.link.secondNav.push(item);
					} else {
						this.link.secondNav = [];
						this.link.secondNav.push(item);
					}
				} else if(this.grade == 3) {
					let item = {
						tName: "count3" + (this.link.thirdNav && this.link.thirdNav.length) || 0,
						tText: this.form.name,
						columnType: "自定义栏目",
						isEdit: false,
						openColumn: 1,
						isDel: true,
						link: "count3" + (this.link.thirdNav && this.link.thirdNav.length) || 0,
					};
					if(this.link.thirdNav) {
						this.link.thirdNav.push(item);
					} else {
						this.link.secondNav = [];
						this.link.secondNav.push(item);
					}

				} else if(this.grade == 4) {
					this.link.tText = this.form.name;
					//this.link.link = this.form.name;
				}

				this.addVisibleNav = false;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
			}	,
			...mapActions([
				'saveloca'
			])
		},
		computed: {
			...mapGetters(["router"])
		},
		data() {
			return {
				title: "编辑栏目导航",
				addVisibleNav: false,
				one_show: true,
				grade: "",
				preview: '/t1/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				link: "",
				browserTitle: "",
				navDesc: '',
				searchDesc: "",
				cusAddressInput: '',
				customlink: "",
				searchKey: "",
				form: {
					name: '',
					cusLink: '',
					openByNewPage: '',
					navType: '',
					upArea: '',
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
				width: 100px;
			}
			.url_name {
				width: 170px;
			}
			.col_umn {
				width: 150px;
			}
			.edit {
				width: 170px;
				text-align: center;
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