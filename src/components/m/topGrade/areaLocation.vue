<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" v-on:dragging="onDrag" :parent="itemMdata.parent" :active.sync="itemMdata.parentStyle.active" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['areaLocation hove_con',{hover:isHover}]" @mouseenter="hoverAreaLocation($event)" @mouseleave="leaveAreaLocation($event)" @contextmenu="showMenu">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑当前位置</span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" :style="[itemMdata.Divstyle,{backgroundImage:'url('+itemMdata.mImage0.url+')'}]">
				<p>
					<img :src="itemMdata.mImage1.url" @mousedown="defaultStop($event)" class="arrowImg" />
					<span :style="itemMdata.spanStyle">{{itemMdata.textTitle}}</span>

					<span v-for="(item,index) in itemMdata.crumbs">
						<i :style="itemMdata.Astyle" @dblclick="goDesign(item)">{{item.column_name}}</i>
						<img :src="itemMdata.mImage2.url"  @mousedown="defaultStop($event)" class="arrowImg"/>
					</span>

				</p>

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

	export default {
		name: 'areaLocation',
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			//console.log(this.$route.params.param)
			this.getData();
			this.itemMdata.crumbs = this.itemMdata.crumbs || crumbs;
			this.itemMdata.mImage2 = this.itemMdata.mImage2 || {};
			this.itemMdata.spanStyle = this.itemMdata.spanStyle || {}
		},
		data() {
			return {
				title: "当前位置",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
				isHover: false,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id
				},
				preview: '/pc/t1/' + this.$route.params.id + "/",
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "600px",
					isEdit: true,
					rTitle: '编辑当前位置',
				},
				backgroundDiv: {
					backgroundImage: 'url(' + this.itemMdata.mImage0.url + ')',
				},
				icon: {
					backgroundImage: 'url(' + this.itemMdata.mImage1.url + ')',
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
			goDesign(item) {
				//this.saveloca(this.param);
				if(!item.is_enable) {
					return;
				}
				var link = item.id;
				if(link) {
					if(Number(link)) {
						//location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
						window.open(this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id)
					} else if(link.indexOf("http") != -1) {
						//location.href = link;
						window.open(link)
					} else {
						//location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
						window.open(this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id)
					}
				}
			},
			getData() {
				api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.pc_version_id, true, {}, r => {
					if(r.code == 422) {
						//console.log(r.message);
						return;
					}
					var list = r.data.list;
					var firstList = [];
					for(let i = 0; i < list.length; i++) {
						if(list[i].id == this.$route.params.param) {
							firstList.push(list[i])

						}
					}

					for(let i = 0; i < list.length; i++) {
						if(firstList[0].parent_id == list[i].id) {
							//firstList.push(list[i])
							firstList.splice(0, 0, list[i]);
						}
					}
					for(let i = 0; i < list.length; i++) {
						if(firstList[0].parent_id == list[i].id) {
							//firstList.push(list[i])
							firstList.splice(0, 0, list[i]);
						}
					}
					this.itemMdata.crumbs = firstList;

					console.log(this.itemMdata.crumbs)
				});
			},
			defaultStop(e) {
				e.preventDefault();
			},
			hoverAreaLocation() {
				this.isHover = true;
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;
			},
			leaveAreaLocation() {
				this.isHover = false;
				this.itemInner.isStopPropagation = false;
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
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
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
			background-repeat: no-repeat;
			background-position: center;
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>