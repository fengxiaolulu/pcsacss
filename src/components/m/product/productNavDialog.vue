<template>
	<div class="productNavDialog">
		<div v-if="!itemMdata.routerProductNav.isProduct">
			<div class="ad_con"><span class="add_nav" @click="dialogVisible(1)">添加产品分类</span></div>
			<div class="g-cf tit_header"><span style="width: 174px;">产品分类名称</span><span class="edit fr">操作</span></div>
			<div class="outer">
				<div v-iscroll class="inner">
					<ul class="nav_i0">
						<li class="nav_lifirth" v-for="item in itemMdata.routerProductNav.navItem">
							<div class="g-cf tit_i1">
								<i class="dt_con arrow"></i>
								<span class="url_name">{{item.tText}}</span>
								<span @click="dialogVisible(2,item)" class="addColIcon"></span>
								<span class="edit fr">
									<i @click="editSecon(4,item)">[编辑]</i>
									
									<em class="del" @click="delSecon(1,item)">[删除]</em>
								</span>
								
							</div>
							<ul class="sec_con">
								<li v-for="second in item.secondNav">
									<div class="g-cf tit_i2">
										<i class="dt_con arrow"></i>
										<span class="url_name">{{second.tText}}</span>
										<span class="addColIcon " @click="dialogVisible(3,second) "></span>
										<span class="edit">
											<i @click="editSecon(4,second)">[编辑]</i> 
											<em class="del " @click="delSecon(2,second) ">[删除]</em>
										</span>
									</div>
									<div class="third_con ">
										<div class="g-cf third_item " v-for="third in second.thirdNav ">
											<i class="dt_con arrow "></i>
											<span class="url_name ">{{third.tText}}</span>
											<span class="edit ">
												<i @click="editSecon(4,third)">[编辑]</i>  
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
			<el-dialog title="添加分类" :visible.sync="addVisibleNav" width="30%">
				<div class="g-cf add_nav_cons">
					<div class="list_con">
						<div class="lis0" v-show="one_show">
							<el-form ref="form" :model="form" label-width="120px">
								<el-form-item label="分类名称：">
									<el-input v-model="form.name" class="wh_220"></el-input>
								</el-form-item>
								<el-form-item label="选择上级分类：">
									<el-select v-model="form.navType" placeholder="--无--">
										<el-option label="--无--" value="default"></el-option>
										<el-option :label="item.tText" :key="item.link" :value="item.link"  v-for="item in itemMdata.routerProductNav.navItem">
										
										</el-option>
										
									</el-select>
								</el-form-item>
								<el-form-item v-if="form.navType=='default'" label="选择上级分类：">
									<el-select v-model="form.upArea" placeholder="请选择产品分类">
										<!--el-option v-for = "i in itemMdata.routerProductNav.navItem" label="区域一" value="shanghai"></el-option-->
										<el-option v-for="rut in itemMdata.routerProductNav.navItem" :key="rut.link" :label="rut.tText" :value="rut.link">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item v-if="form.navType=='customlink'" label="自定义地址：">
									<el-input v-model="form.cusLink" style="width: 220px;"></el-input>
								</el-form-item>
					
							</el-form>

						</div>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="addVisibleNav = false">取 消</el-button>
					<el-button type="primary" @click="addVisibleFun">保 存</el-button>
				</span>
			</el-dialog>
		</div>
		<div v-if="itemMdata.routerProductNav.isProduct">
			<div class="productNavEdit">
				<div class="right">
					<div class="one">
						<p class="name">
							<span>项名称：</span>
							<input type="text" v-model="projectName" /><span ref="nameEmty" class="nameEmty">项名称不能为空!</span>
						</p>
						
						<div class="article">
							<div class="type">
								<span>链入产品：</span>
								<p @click="changeset(1)">
									<input type="radio" name="type" id="type1" checked="checked" />
									<label for="type1">使用指定产品</label>
								</p>
								<p @click="changeset(2)">
									<input type="radio" name="type" id="type2" />
									<label for="type2">使用筛选条件</label>
								</p>
							</div>
							<div class="type_one clearfloat" v-if="setnumber == 1">
								<ul class="list fl">
									<li v-for="(productNav,index) in itemMdata.routerProductNav.productNavList">
										<p @click="removeArticle(productNav)">{{productNav.title}}</p>
									</li>
								</ul>
								<div class="icon fl">〉</div>
								<ul class="selected fr">
									<li v-for="(select,index) in itemMdata.routerProductNav.productNavSelected">
										<span>{{select.title}}</span>
										<span @click="deleteSelect(select)">X</span>
									</li>
								</ul>
							</div>
							
							<div class="type_two" v-if="setnumber == 2">
								<p v-for="(item,idx) in itemMdata.routerProductNav.navItem">
									<input type="checkbox" :id="idx" />
									<label :for="idx">{{item.tText}}</label>
								</p>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
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
		name: 'productNavDialog',
		props: ['itemMdata'],
		created() {
			//console.log(this.itemMdata);
		},
		methods: {
			changeset:function(number){
				this.setnumber = number
			},
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
						//this.$routerProductNav.push(this.preview + link);
						location.href = this.preview + link;
					}
				}
				console.log(this.preview + link);
			},
			delSecon(grade, curObj) {
				var navItem = this.itemMdata.routerProductNav.navItem;
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
				var navItem = this.itemMdata.routerProductNav.navItem;				
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
								this.addProps("count" + navItem[i].secondNav.length);
							}
						}
					}
					flag && this.addProps(item.link);
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
						this.addProps(item.link);
						this.link.secondNav.push(item);						
					} else {
						this.link.secondNav = [];
						this.link.secondNav.push(item);
						this.addProps(item.link);
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
						this.addProps(item.link);
					} else {
						this.link.secondNav = [];
						this.addProps(item.link);
						this.link.secondNav.push(item);						
					}

				} else if(this.grade == 4) {
					this.link.tText = this.form.name;
					//this.link.link = this.form.name;
				}
				
					this.addVisibleNav = false;
				
				//this.addProps("cretttt");
				
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
			},
			...mapMutations([
				'addProps'
			]),
			...mapActions([
				'saveloca'
			]),
			deleteSelect: function(select) {
				this.itemMdata.routerProductNav.productNavSelected.splice(this.itemMdata.routerProductNav.productNavSelected.indexOf(select), 1);
			},
			removeArticle: function(productNav) {
				productNav.productName = this.projectName;
				var newArticle = JSON.parse(JSON.stringify(productNav));
				if(this.projectName!=''){
					this.itemMdata.routerProductNav.productNavSelected.push(newArticle);
					this.$refs.nameEmty.style.display = 'none';
				}else{
					this.$refs.nameEmty.style.display = 'inline-block';
				}
				
			}
		},
		computed: {
			...mapGetters(["routerProductNav",'itemCon'])
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
				},
				setnumber:'1',
				newArticle: '',
				projectName:'',
				len:0
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .clearfloat:after {display: block;clear: both;content: "";visibility: hidden;height: 0;}
	.fl {float: left;}
	.fr{float: right;}
	.productNavDialog {
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
            .fr{float:right;}
            .edit{display:inline-block;}
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
                float:right;
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
                margin-right:22px;
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
		.productNavEdit{
			padding:10px;
			.nameEmty{display:none;color:red;margin-left:10px;}
			.name{
				padding:10px 0;
				input{border:1px solid #ccc;}
			}
			.type{
				p{display:inline-block;margin-right:10px;}
			}
			.type_one{
				position:relative;
				padding:10px;
				.list,.selected{
					width:30%;
					border:1px solid #ccc;
					text-align:center;
					padding:10px;
					min-height:142px;
					li:nth-child(2n) {
						background: #f1f5ff;
					}
					li:hover {
						color: #FFFFFF;
						background: #5874d8;
					}
				}
				.icon{
					position:absolute;
					top:50%;
					left:50%;
					font-size:30px;
					transform:translate(-50%,-50%);
				}
				.selected{
					span{
						display:inline-block;
						width:49%;
					}
					span:last-child{
						text-align:right;
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
            padding-left:100px;
			.lis0,
			.lis1 {
				padding: 20px 0;
			}
		}
	}
</style>