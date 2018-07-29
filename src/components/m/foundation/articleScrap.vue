<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :parent="itemMdata.parent" :active.sync="itemMdata.parentStyle.active" v-on:dragging="onDrag" :minw="1" :minh="1" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['articleScrap hove_con',{hover:isHover}]" @mouseenter="hoverArticleScrap($event)" @mouseleave="leaveArticleScrap($event)" >
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑文章列表</span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" @contextmenu="showMenu" :id="articleId">
				<ul :style="[itemMdata.ulStyle,{listStyleType:itemMdata.ulStyle.listStyleType},{listStyleImage:'url('+itemMdata.ulStyle.listStyleImage+')'}]" v-show="itemMdata.styleFive==false">
					<li v-for="(list,index) in itemMdata.articleSelected" :style="itemMdata.liStyle" class="articleLi">
						<div @dblclick="gotolink(list.id,list.target)" class="inlineBlock">
							<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
							<div class="text" :style="itemMdata.textStyle">
								<p class="title" :style="itemMdata.titleStyle">{{list.name}}</p>
								<p class="time" :style="itemMdata.timeStyle">{{list.add_time}}</p>
								<p class="describe" :style="[itemMdata.describeStyle]">{{list.image_text}}</p>
								<a :target="list.target" :href="list.url" v-show="itemMdata.moreShow">更多>></a>
							</div>
						</div>
					</li>
				</ul>
				<div v-show="itemMdata.styleFive">
					<div class="firstAticle" @dblclick="gotolink(itemMdata.styleFive.id,itemMdata.styleFive.target)" :style="itemMdata.firsttextStyle">
						<div class="imgLeft">
							<img :src="itemMdata.firstArticle.image" :style="[{width:itemMdata.moreStyle.width},{height:itemMdata.moreStyle.height}]" />
						</div>
						<div class="text" :style="[{width:itemMdata.textStyleH.width},{height:itemMdata.textStyleH.height}]">
							<p class="title" :style="itemMdata.firsttitleStyle">{{itemMdata.firstArticle.name}}</p>
							<p class="time" :style="itemMdata.firsttimeStyle">{{itemMdata.firstArticle.add_time}}</p>
							<p class="describe" :style="itemMdata.firstdescribeStyle">{{itemMdata.firstArticle.image_text}}</p>
							<a :target="itemMdata.firstArticle.target" :href="itemMdata.firstArticle.url" v-show="itemMdata.moreShow">更多>></a>
						</div>
					</div>
					<div>
						<ul :style="[itemMdata.ulStyle,{listStyleType:itemMdata.ulStyle.listStyleType},{listStyleImage:'url('+itemMdata.ulStyle.listStyleImage+')'}]">
							<li v-for="(list,index) in itemMdata.articleSelected" :style="itemMdata.liStyle" class="articleLi" :class="{oneLi:itemMdata.styleFive}">
								<div @dblclick="gotolink(list.id,list.target)" class="inlineBlock">
									<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
									<div class="text" :style="itemMdata.textStyle">
										<p class="title" :style="itemMdata.titleStyle">{{list.name}}</p>
										<p class="time" :style="itemMdata.timeStyle">{{list.add_time}}</p>
										<p class="describe" :style="itemMdata.describeStyle">{{list.image_text}}</p>
										<a :target="list.target" :href="list.url" v-show="itemMdata.moreShow">更多>></a>
									</div>
								</div>
							</li>
						</ul>
					</div>
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
		</div>
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	export default {
		name: 'articleScrap',
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			console.log(this.itemMdata);
			var ts = this;
			this.itemMdata.ulStyle = this.itemMdata.ulStyle || {};
			api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id,
				false, {},
				function(r) {
					if(r.code == 422) {
						return;
					}
					for(let i = 0; r.data.list.length > i; i++) {
						if(r.data.list[i].url == "newsDetail") {
							console.log("newsList");
							ts.param.id = r.data.list[i].id;
						}
					}
				}
			);

			this.itemMdata.firsttitleStyle = this.itemMdata.firsttitleStyle || {};
			this.itemMdata.firsttimeStyle = this.itemMdata.firsttimeStyle || {}
			this.itemMdata.firstdescribeStyle = this.itemMdata.firstdescribeStyle || {}
			this.itemMdata.firsttextStyle = this.itemMdata.firsttextStyle || {};
			this.itemMdata.firstArticle = this.itemMdata.firstArticle || {}
			this.itemMdata.textStyleH = this.itemMdata.textStyleH || {}
			this.itemMdata.titleStyleH = this.itemMdata.titleStyleH || {}
			this.itemMdata.timeStyleH = this.itemMdata.timeStyleH || {}
			this.itemMdata.describeStyleH = this.itemMdata.describeStyleH || {}
			this.itemMdata.moreStyle = this.itemMdata.moreStyle || {}
		},
		data() {
			return {
				title: "文章列表",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				token: this.$route.query.token,
				newDesId: this.$route.query.newDesId,
				id: this.$route.params.id,
				param: this.$route.params.param,
				articleId: 'articleId' + this.posCom + this.index,
				param: {
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id
				},
				isHover:false,
				parentStyle: {

				},
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					isEdit: false,
					rTitle: '编辑文章列表',
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
			VueDraggableResizable
			//uiDialog
		},
		methods: {
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
			defaultStop(e) {
				e.preventDefault();
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
			gotolink: function(id, target) {
				var link = '/t1/new/' + this.id + '/' + this.param.id + '?newDesId=' + id + '&token=' + this.param.token + "&company_id=" + this.param.company_id + "&type=" + this.param.type + "&version_id=" + this.param.version_id + "&pc_version_id=" + this.param.pc_version_id;
				window.open(link, target);
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			hoverArticleScrap(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leaveArticleScrap(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;	
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
				//if(this.itemMdata.liStyle.marginLeft){
				//	this.itemMdata.liStyle.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.liStyle.marginLeft))  +'px';
				//	console.log(this.itemMdata.liStyle.width)
				//	}
				//if(this.itemMdata.liStyle.float == "left"&&this.itemMdata.liStyle.marginLeft){
				//this.itemMdata.liStyle.width = (this.itemMdata.parentStyle.width - parseInt(this.itemMdata.liStyle.marginLeft)*this.itemMdata.articleSelected.length)/this.itemMdata.articleSelected.length  +'px';
				//console.log(this.itemMdata.liStyle.width)
				//}
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},
			getData() {
				var v = this;
			},
			update() {
				console.log(this.itemMdata.liStyle)
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		},
		mounted() {
			urlLink.showHand(this.articleId, this.itemMdata)
			hoverAction.articleSHover(this.articleId, this.itemMdata);
		}

	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
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
			height: 220px;
			ul {
				box-sizing: border-box;
				li {
					box-sizing: border-box;
					div {
						box-sizing: border-box;
					}
					/*.inlineBlock{
						display:inline-block;
						width:100%;
					}*/
					a {
						color: #666666;
					}
					.text {
						box-sizing: border-box;
						.title {
							width: 100%;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.describe {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}
				}
				.oneLi:first-child {
					display: none;
				}
			}
			.firstAticle {
				clear: both;
				overflow: hidden;
				.imgLeft {
					float: left;
					width: 30%;
				}
				.text {
					float: right;
					width: 67%;
					.title {
						font-size: 22px;
						color: #000;
					}
					.describe {
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						display: -webkit-box;
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