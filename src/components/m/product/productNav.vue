<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" v-on:dragging="onDrag" :parent="itemMdata.parent" :active.sync="itemMdata.parentStyle.active" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['productNav hove_con',{hover:isHover}]" @mouseenter="hoverProductNav($event)" @mouseleave="leaveProductNav($event)" @contextmenu="showMenu">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑产品导航</span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="productNav">
				<div class="productTitle" :style="itemMdata.titleStyle">
					<span>{{itemMdata.tText}}</span>
				</div>
				<ul class="mTypeOne" v-if="itemMdata.productNavLayout == 0 && itemMdata.margin_hid == false">
					<li class="mTypeli" v-for="item in itemMdata.routerProductNav.navItem">
						<div :style="itemMdata.typeStyle">
							<span>{{item.category_name}}</span>
						</div>
						<ul class="sec_con">
							<li v-for="second in item.secondNav">
								<div :style="itemMdata.typeStyle">
									<span>{{second.name}}</span>
								</div>
								<ul class="third_item " v-for="third in second.thirdNav">
									<li>
										<div :style="itemMdata.typeStyle">
											<span>{{third.name}}</span>
										</div>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
				<el-row class="mTypeOne" v-if="itemMdata.productNavLayout == 1 && itemMdata.margin_hid == false" :style="itemMdata.typeStyle">
					<el-col>
						<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
							<el-submenu :index="getId(idx)" v-for="(item,idx) in itemMdata.routerProductNav.navItem" @click="getIdx(idx)" :key="idx">
								<template slot="title">
									<span>{{item.category_name}}</span>
								</template>
								<el-submenu :index="getIdtwo(idx,idxsec)" v-for="(second,idxsec) in item.secondNav" :key="idxsec">
									<template slot="title">
										<span>{{second.name}}</span>
									</template>
									<el-menu-item :index="getIdthird(idx,idxsec,idxthird)" v-for="(third,idxthird) in second.thirdNav" :key="idxthird">
										<template slot="title">
											<span>{{third.name}}</span>
										</template>
									</el-menu-item>

								</el-submenu>

							</el-submenu>

						</el-menu>
					</el-col>
				</el-row>
				<ul class="mTypeOne" v-if="itemMdata.productNavLayout == 0 && itemMdata.margin_hid == true">
					<li class="mTypeli" v-for="(item,idx) in itemMdata.routerProductNav.productNavSelected" :keys="idx">
						<span>{{item.productName}}</span>
						<ul class="sec_con">
							<li v-for="second in item.secondNavList">
								<span>{{second.productName}}</span>
								<!--<ul class="third_item " v-for="third in second.thirdNavList">
									<li>
										<span>{{third.productName}}</span>
									</li>
								</ul>-->
							</li>
						</ul>
					</li>
				</ul>
				
			</div>

			<!--分页-->
			<div class="page" v-show="itemMdata.articleSelected.length >= itemMdata.pageNum">
				<p>
					<a href="">首页</a>
				</p>
				<p v-for="index in 4">
					<a href="">{{index}}</a>
				</p>
				<p>
					<a href="">末页</a>
				</p>
			</div>
		</div>
		<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	export default {
		name: 'productNav',
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			console.log(this.itemMdata);
			api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id, false, {}, function(r) {
				if(r.code == 422) {
					return;
				}
				for(let i = 0; r.data.list.length > i; i++) {
					if(r.data.list[i].url == "productDetail") {
						console.log("productDetail");
						ts.param.id = r.data.list[i].id;
					}
				}
				//ts.getData(ts.param);
			});
			this.getData();
		},
		data() {
			return {
				title: "产品导航",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				param: {
					id: this.$route.params.id,
					//param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					column_id: this.$route.query.column_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					version_id: this.$route.query.pc_version_id
				},
				parentStyle: {

				},
				curIndex: 0,
				isHover: false,
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					isEdit: true,
					rTitle: '编辑产品导航',
				},
				contextMenuData: {
					//the contextmenu name(@1.4.1 updated)
					menuName: this.$utils.guid(),
					axios: {
						x: null,
						y: null
					},
					//Menu options (菜单选项)
					menulists: [{
							fnHandler: 'upFloor', // Binding events(绑定事件)
							btnName: '置于顶层' // The name of the menu option (菜单名称)
						},
						{
							fnHandler: 'moveUpFloor',
							btnName: '上移一层'
						},
						{
							fnHandler: 'moveDownFloor',
							btnName: '下移一层'
						},
						{
							fnHandler: 'copyItem',
							btnName: '复制模块'
						},
						{
							fnHandler: 'downFloor',
							btnName: '置于底层'
						}
					]
				}
			}
		},
		components: {
			VueDraggableResizable,
			//uiDialog
		},
		methods: {
			getId(idx) {
				return JSON.stringify(idx);
			},
			getData() {
				//console.log(this.param)
				var ts = this;
				api.get('/api/data/productCategory?token=' + ts.param.token, true, {}, function(dat) {
					//console.log(dat);

					for(var t = 0; dat.data.length > t; t++) {
						//console.log(dat.data[t].id);
						//ts.itemMdata.routerProductNav.navItem.push(dat.data[t]);
						api.get('/api/data/productListPageByCategoryIds?token=' + ts.param.token + '&ids=' + dat.data[t].id,
							true, {},
							function(data) {
								dat.data[t].secondNav = [];
								for(var j = 0; data.data.list.length > j; j++) {
									dat.data[t].secondNav.push(data.data.list[j]);
									console.log(dat.data[t].secondNav)
								}

							}
						);
						ts.itemMdata.routerProductNav.navItem.push(dat.data[t]);
					}
					console.log("done");
				});
			},
			getIdtwo(idx, idxsec) {
				return idx + '-' + idxsec;
			},
			getIdthird(idx, idxsec, idxthird) {
				return idx + '-' + idxsec + '-' + idxthird;
			},
			getIdx(idx) {

			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			showMenu(index) {
				event.preventDefault();
				event.stopPropagation();
				var x = event.clientX;
				var y = event.clientY;
				this.contextMenuData.axios = {
					x,
					y
				}
			},
			upFloor(i) {
				console.log(i.parentStyle);
				i.parentStyle.zIndex += this.itemInner.itemInner.length;
				console.log("upFloor");
			},
			moveUpFloor(i) {
				++i.parentStyle.zIndex;
				console.log('moveUpFloor!');
			},
			moveDownFloor(i) {
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			copyItem(item) {
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.itemInner.length + 1;
				this.itemInner.itemInner.push(i);
			},
			downFloor(i) {
				i.parentStyle.zIndex = 0;
				console.log('downFloor!')
			},
			onResize: function(x, y, width, height) {
				this.parentStyle.left = x;
				this.parentStyle.top = y;
				this.parentStyle.width = width;
				this.parentStyle.height = height;
				this.itemMdata.parentStyle = this.parentStyle;
			},
			hoverProductNav(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leaveProductNav(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		},
		computed: {

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.productNav {
		.productTitle {
			line-height: 100px;
			font-size: 22px;
			border: 3px solid #ccc;
			color: #0D83ED;
			span {}
		}
		.mTypeOne {
			.mTypeli {
				div {
					line-height: 50px;
					border-bottom: 1px solid #ccc;
					color: black;
					font-size: 16px;
				}
			}
		}
	}
	
	.hove_con {
		position: relative;
		z-index: 100;
		width: 100%;
		height: 100%;
		.edit_con {
			position: absolute;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.2);
			padding: 0 15px;
			top: -40px;
			width: auto;
			height: 40px;
			line-height: 40px;
			display: none;
			span {
				float: left;
				cursor: pointer;
				border-right: 1px solid #E3E3E3;
				margin: 0 8px;
			}
			span:nth-child(1) {
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon {
				display: block;
				float: left;
				border-right: none;
				background: url(/static/image/bg03.png)no-repeat;
			}
			.icon i {
				position: absolute;
				display: block;
				font-size: 12px;
				width: auto;
				line-height: 25px;
				padding: 0px 10px;
				background: #FFFFFF;
				border-radius: 5px;
				box-shadow: 0 1px 4px 2px rgba(0, 0, 0, 0.1);
				top: -23px;
				margin-left: -25px;
				display: none;
			}
			.style {
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover {
				background-position: -60px -232px;
			}
			.style:hover i {
				display: block;
			}
			.animation {
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover {
				background-position: -372px -232px;
			}
			.animation:hover i {
				display: block;
			}
			.borderhid {
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover {
				background-position: -275px -232px;
			}
			.borderhid:hover i {
				display: block;
			}
			.delete {
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover {
				background-position: -105px -232px;
			}
			.delete:hover i {
				display: block;
			}
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>