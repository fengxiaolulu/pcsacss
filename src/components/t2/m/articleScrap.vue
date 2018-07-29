<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :z="itemMdata.parentStyle.zIndex" :active.sync="itemMdata.parentStyle.active" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height"  v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit articleScrapP hove_con">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">编辑文章列表</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" @contextmenu="showMenu" :id="articleScrapId"> 
				<ul style="clear: both;overflow: hidden;" class="oneUl">
					<li v-for="(list,index) in itemMdata.articleSelected" :style="itemMdata.liStyle" v-show="itemMdata.page.pageNum>index">
						<div @dblclick="gotolink(list.id,list.target)">
							<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
							<div class="text" :style="itemMdata.textStyle">
								<p class="title" :style="itemMdata.titleStyle">{{list.name}}</p>
								<p class="time" :style="itemMdata.timeStyle">{{list.add_time}}</p>
								<p class="describe" :style="itemMdata.describeStyle">{{list.image_text}}</p>
								<a :target="list.target" :href="list.url" v-show="itemMdata.moreShow" :style="itemMdata.moreStyle">更多>></a>
							</div>
						</div>
					</li>
				</ul>
				<!--分页-->
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
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	//import uiDialog from './uiDialog.vue'

	export default {
		name: 'articleScrap',
		props: ['itemMdata', "posCom", 'index',"itemInner"],
		created() {
			console.log(this.itemMdata);
		},
		mounted() {
			articleScrap.articleScrap(this.articleScrapId, this.itemMdata);
		},
		data() {
			return {
				title: "文章列表",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				token: this.$route.query.token,
				id: this.$route.params.id,
				articleScrapId: "articleScrap" + this.posCom + this.index,
				parentStyle: {
				},
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					isEdit: false,
					rTitle: '编辑文章列表',
				},
				newDesId: this.$route.query.newDesId,			
				param:{
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					version_id: this.$route.query.mobile_version_id
				},
				contextMenuData: {
					// the contextmenu name(@1.4.1 updated)
					menuName: this.$utils.guid(),
					axios: {
						x: null,
						y: null
					},
					//Menu options (菜单选项)
					menulists: [{
							fnHandler: 'upFloor', //Binding events(绑定事件)
							btnName: '置于顶层' //The name of the menu option (菜单名称)
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
//			gotolink: function(id, target) {
//				var link = '/pc/t2/new/' + this.id + '/'+this.param.id+'?newDesId=' + id + '&token='+this.param.token+"&company_id="+this.param.company_id+"&type="+this.param.type+ '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
//				window.open(link, target);
//			},
            gotolink: function(id, target) {				
				var link = '/t2/new/' + this.id + '/'+this.param.id+'?newDesId=' + id + '&token='+this.param.token+"&company_id="+this.param.company_id+"&type="+this.param.type+"&version_id="+this.param.version_id+"&mobile_version_id="+this.param.mobile_version_id;
				window.open(link, target);
			},	
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				// this.itemMdata.parentStyle = this.parentStyle;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
			},
			delModule(i) {
				this.$emit('delModule', i);
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i,this.editDial);
			},
			defaultStop(e) {
				e.preventDefault();
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
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
			upFloor(i) {//置于顶层
				//console.log(i.parentStyle);
				i.parentStyle.zIndex = this.itemInner.length;
				console.log("upFloor");
			},
			moveUpFloor(i) {//上移一层
				++i.parentStyle.zIndex;
				console.log('moveUpFloor!');
			},
			moveDownFloor(i) {//下移一层
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			copyItem(item) {//复制模块
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.length + 1;
				this.itemInner.push(i);
			},
			downFloor(i) {//置于底层
				i.parentStyle.zIndex = 0;
				console.log('downFloor!');
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		
		/*.detail {
			ul {
				li {
					a{
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
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
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
		}*/
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>