<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['productShow hove_con',{hover:isHover}]" @mouseenter="hoverProductShow($event)" @mouseleave="leaveProductShow($event)" @contextmenu="showMenu">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑产品列表</span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" :id="productShowId">
				<!--one-->
				<ul v-show="itemMdata.styleone" class="oneUl">
					<li v-if="itemMdata.page.isShow==1" v-show="itemMdata.page.pageNum>index" v-for="(list,index) in itemMdata.productSelected" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4}">
						<div @dblclick="gotolink(list.id,list.target)" class="clearfloat colimgHover">
							<div class="pdsRelative" :style="itemMdata.imgStyle">
								<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
								<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth+'px'}]">
									<!--<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="list.content"></p>
									<i class="el-icon-search" :style="itemMdata.iStyle"></i>-->
								</div>
							</div>
							<p v-show="itemMdata.productName" :style="itemMdata.pStyle">{{list.name}}</p>
							<p v-show="itemMdata.productDesShow" :style="itemMdata.desStyle" class="desStyle">{{list.image_text}}</p>	
							<p v-show="itemMdata.productcontent" v-html="list.content" :style="itemMdata.contentStyle" class="contentStyle"></p>						
						</div>
					</li>
					<li v-if="itemMdata.page.isShow!=1" v-for="(list,index) in itemMdata.productSelected" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4}">
						<div @dblclick="gotolink(list.id,list.target)" class="clearfloat colimgHover">
							<div class="pdsRelative" :style="itemMdata.imgStyle">
								<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
								<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth+'px'}]">
									<!--<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="list.content"></p>
									<i class="el-icon-search" :style="itemMdata.iStyle"></i>-->
								</div>
							</div>
							<p v-show="itemMdata.productName" :style="itemMdata.pStyle">{{list.name}}</p>
							<p v-show="itemMdata.productDesShow" :style="itemMdata.desStyle" class="desStyle">{{list.image_text}}</p>	
							<p v-show="itemMdata.productcontent" v-html="list.content" :style="itemMdata.contentStyle" class="contentStyle"></p>
						</div>
					</li>
				</ul>

				<!--two-->
				<div class="carousel-wrap slide1" v-show="itemMdata.styletwo">
					<div class="width">
						<ul class='slideUl'>
							<li v-for="(list,index) in itemMdata.productSelected" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4}">
								<div @dblclick="gotolink(list.id,list.target)" class="liDiv colimgHover">
									<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
									<p v-show="itemMdata.productName" :style="itemMdata.pStyle">{{list.name}}</p>
									<p v-show="itemMdata.productDesShow" :style="itemMdata.desStyle" class="desStyle">{{list.image_text}}</p>	
									<p v-show="itemMdata.productcontent" v-html="list.content" :style="itemMdata.contentStyle" class="contentStyle"></p>	
									<!--<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth+'px'}]">
									<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="list.content"></p>
									<i class="el-icon-search" :style="itemMdata.iStyle"></i>
								</div>-->
								</div>
							</li>
						</ul>
					</div>
					<div class="button" v-show="itemMdata.showbtnP == 0">
						<span class="pre1" :id="productShowBtnPre" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.pdsPre.url+')'}]"></span>
						<span class="next1" :id="productShowBtnNext" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.pdsNext.url+')'}]"></span>
					</div>
					<div class="button bButton" v-show="itemMdata.showbtnP == 1">
						<span class="pre1 bottomBtn" :id="productShowBtnPre" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.pdsPre.url+')'}]"></span>
						<span class="next1 bottomBtn" :id="productShowBtnNext" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.pdsNext.url+')'}]"></span>
					</div>
				</div>

				<!--three-->
				<div class="threeStyle" :style="[{width:itemMdata.parentStyle.width+'px'}]" v-show="itemMdata.stylethree">
					<table align="center">
						<tr>
							<td :style="[{width:itemMdata.parentStyle.width+'px'}]" align=center>
								<div class="tableBox" :style="[{overflow:'hidden'},{width:itemMdata.parentStyle.width+'px'}]" align=center>
									<table border=0 align=center cellpadding=0 cellspacing=0 cellspace=0>
										<tr>
											<td valign=top class="old">
												<table cellspacing="5" cellpadding="0">
													<tr>
														<td :style="{width:itemMdata.liStyle.width}" v-for="(list,index) in itemMdata.productSelected" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4}">
															<div @dblclick="gotolink(list.id,list.target)" class="colimgHover">
																<img @mousedown="defaultStop($event)" :src="list.image" :style="{width:itemMdata.liStyle.width}" />
																<p v-show="itemMdata.productName" :style="itemMdata.pStyle">{{list.name}}</p>
																<p v-show="itemMdata.productDesShow" :style="itemMdata.desStyle">{{list.image_text}}</p>	
																<p v-show="itemMdata.productcontent" v-html="list.content" :style="itemMdata.contentStyle"></p>	
																<!--<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth+'px'}]">
																	<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="list.content"></p>
																	<i class="el-icon-search" :style="itemMdata.iStyle"></i>
																</div>-->
															</div>
														</td>
													</tr>
												</table>
											</td>
											<td class="new" valign=top></td>
										</tr>
									</table>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="page" v-if="itemMdata.page.isShow==1">
					<p data-index="up">
						<span>上一页</span>
					</p>
					<p :data-index="index" v-for="(index) in Math.ceil(itemMdata.page.talNum/itemMdata.page.pageNum)">
						<span>{{index}}</span>
					</p>
					<!--p>
						<span>1</span>
					</p>
					<p>
						<span>2</span>
					</p>
					<p>
						<span>3</span>
					</p>
					<p>
						<span>4</span>
					</p-->
					<p data-index="down">
						<span>下一页</span>
					</p>
				</div>
			</div>

		</div>
		<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	//import uiDialog from './uiDialog.vue'
	export default {
		name: 'productShow',
		components: {
			VueDraggableResizable,
			//	uiDialog
		},
		props: ['itemMdata', "posCom", "index", "itemInner"],
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				curIndex: 0,
				isHover: false,
				productShowBtnPre: 'productShowBtnPre' + +this.posCom + this.index,
				productShowBtnNext: 'productShowBtnNext' + +this.posCom + this.index,
				id: this.$route.params.id,
				param: this.$route.params.param,
				productId: this.$route.query.productId,
				param: {
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id
				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					isEdit: true,
					rTitle: '编辑产品列表',
				},
				marginleft: '',
				marginleft2: '',
				currentIndex: 0,
				currentIndex2: 0,
				productShowId: "productShow" + this.posCom + this.index,
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
		created() {
			
			this.itemMdata.pdsPre = this.itemMdata.pdsPre || {};
			this.itemMdata.pdsNext = this.itemMdata.pdsNext || {};
			this.itemMdata.spanStyle = this.itemMdata.spanStyle || {}
			this.itemMdata.styleTwo = this.itemMdata.styleTwo || {}
			this.itemMdata.iStyle = this.itemMdata.iStyle || {}
			this.itemMdata.liStyleH = this.itemMdata.liStyleH || {}
			this.itemMdata.hoverP = this.itemMdata.hoverP || {}
			this.itemMdata.contentStyle = this.itemMdata.contentStyle || {}
			this.itemMdata.desStyle = this.itemMdata.desStyle || {}
			//console.log(this.$route);
			var ts = this;
			api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id, false, {}, function(r) {
				if(r.code == 422) {
					return;
				}
				//debugger;
				console.log("api/data/columnList");
				for(let i = 0; r.data.list.length > i; i++) {
					if(r.data.list[i].url == "productDetail") {
						console.log("productDetail");
						ts.param.id = r.data.list[i].id;
					}
				}
				//ts.getData(ts.param);
			});
			
			if(this.$route.query.keyword){
				
				api.get('/api/data/productSearch?token=' + this.param.token+'&keyword='+this.$route.query.keyword, true, {}, function(data) {
					console.log(data.data.list)
					ts.itemMdata.productSelected = data.data.list;
				});
			}
		},
		mounted() {
			this.itemMdata.page = this.itemMdata.page ||{};
			productShow.productShow1(this.productShowId,this.itemMdata);
			hoverAction.productShowHover(this.productShowId, this.itemMdata)
			hoverAction.productShowPreNext(this.productShowId, this.itemMdata)
		},
		methods: {
			describeHtml(s) {　　
				if(s) {　　　　
					return s.replace(/\s/g, '<br/>')　　
				} else return '';
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
				console.log('downFloor!');
			},
			gotolink: function(id, target) {
				var link = '/pc/t1/product/' + this.id + '/' + this.param.id + '?productId=' + id + '&token=' + this.param.token + "&company_id=" + this.param.company_id + "&type=" + this.param.type + "&version_id=" + this.param.version_id + "&pc_version_id=" + this.param.pc_version_id;
				window.open(link, target);
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
				var ts = this;
				ts.itemMdata.isShow = false;
				console.log(this.itemMdata.MyMar)
				if(ts.itemMdata.MyMar) {
					clearInterval(ts.itemMdata.MyMar);
				}
				setTimeout(function() {
					ts.itemMdata.isShow = true;
				}, 10);
			},
			defaultStop(e) {
				e.preventDefault();
			},
			hoverProductShow(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leaveProductShow(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			onResize: function(x, y, width, height) {
				this.parentStyle.left = x;
				this.parentStyle.top = y;
				this.parentStyle.width = width;
				this.parentStyle.height = height;
				this.itemMdata.parentStyle = this.parentStyle;
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0;
	}
	
	.hove_con {
		position: relative;
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
		.detail {
			ul {
				clear: both;
				overflow: hidden;
				li {
					/*text-align: center;
					overflow: hidden;
					position: relative;*/
					img {
						height: auto;
						position: relative;
					}
					p {
						line-height: 25px;
						width: 100%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.pdsRelative {
						position: relative;
					}
					.hid {
						/*
						position: absolute;
						left: 0;
						right: 0;
						top: 0;
						bottom: 0;
						transition: all 0.5s ease;*/
						i {
							display: none;
						}
					}
				}
				.mouseenterOne .hid {
					border: none !important;
				}
				.mouseenterOne:hover .hid {
					display: none;
				}
				.mouseenterTwo:hover .hid {
					display: block;
					background: none !important;
				}
				.mouseenterTwo:hover .hid p {
					display: none;
				}
				.mouseenterThree:hover .hid p {
					display: none;
				}
				.mouseenterFour:hover .hid {
					border: none !important;
					display: block;
					background: rgba(0, 0, 0, 0.7);
					text-align: center;
					padding-top: 30%;
				}
				.mouseenterFour:hover .hid p {
					color: #FFFFFF;
				}
			}
			.carousel-wrap {
				width: 100%;
				clear: both;
				overflow: hidden;
				position: relative;
				.width {
					width: 90%;
					margin: 0 auto;
					overflow: hidden;
				}
				.slide-ul {
					width: auto;
					overflow: hidden;
					position: relative;
				}
				.bButton {
					position: absolute;
					left: 50%;
					bottom: -2%;
					transform: translate(-50%, 0);
				}
				.button,
				.bButton {
					.bottomBtn {
						position: static;
						display: inline-block;
					}
					.pre1 {
						left: 0px;
						top: 50%;
						transform: translate(0, -50%);
					}
					.next1 {
						left: auto;
						right: 0px;
						top: 50%;
						transform: translate(0, -50%);
					}
				}
			}
			.page {
				margin-top: 10px;
				display: table;
				text-align: center;
				margin-left: auto;
				margin-right: auto;
			}
			.page p {
				float: left;
				margin-right: 10px;
			}
			.page p a {
				display: block;
				border-radius: 3px;
				color: #666;
				border: 1px solid #b3b3b3;
				text-decoration: none;
				padding: 2px 10px;
				font-size: 14px;
			}
			.page p a:hover {
				background: #5874d8;
				color: #FFFFFF;
			}
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>