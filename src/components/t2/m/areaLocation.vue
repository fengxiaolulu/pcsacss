<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :z="itemMdata.parentStyle.zIndex" :active.sync="itemMdata.parentStyle.active" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit areaLocationP hove_con">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">编辑当前位置</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" :style="[itemMdata.Divstyle,{backgroundImage:'url('+itemMdata.mImage0.url+')'}]">
				<p>
					<img :src="itemMdata.mImage1.url"  @mousedown="defaultStop($event)"  class="arrowImg"/>
					<span :style="itemMdata.spanStyle">{{itemMdata.textTitle}}</span>

					<span v-for="(item,index) in itemMdata.crumbs">
						<i :style="itemMdata.Astyle" @dblclick="goDesign(item)">{{item.column_name}}</i>
						<img :src="itemMdata.mImage2.url"  @mousedown="defaultStop($event)" class="arrowImg"/>
					</span>
					
				</p>

			</div>
		</div>
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	//import uiDialog from './uiDialog.vue'
	export default {
		name: 'areaLocation',
		props: ['itemMdata', "posCom", 'index'],
		created() {
			console.log(this.itemMdata);
			this.getData();
			this.itemMdata.crumbs = this.itemMdata.crumbs || crumbs;
			this.itemMdata.mImage2 = this.itemMdata.mImage2 ||{};
			this.itemMdata.spanStyle = this.itemMdata.spanStyle ||{}
		},
		data() {
			return {
				title: "当前位置",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
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
				preview: '/pc/t2/' + this.$route.params.id + "/",
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "600px",
					rTitle: '编辑当前位置',
					isEdit: false
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
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
					} else if(link.indexOf("http") != -1) {
						location.href = link;
					} else {
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
					}
				}
			},
			getData(){
				api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.mobile_version_id, true, {}, r => {
					if(r.code == 422) {
						//console.log(r.message);
						return;
					}
					var list = r.data.list;
					var firstList = [];
					for(let i=0;i<list.length;i++){
						if(list[i].id==this.$route.params.param){
							firstList.push(list[i])
							
						}
					}
					
					for(let i=0;i<list.length;i++){
						if(firstList[0].parent_id == list[i].id){
							//firstList.push(list[i])
							firstList.splice(0,0,list[i]);
						}
					}
					
					this.itemMdata.crumbs = firstList;
					
					console.log(this.itemMdata.crumbs)
				});
			},
			defaultStop(e) {
				e.preventDefault();				
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
				i.parentStyle.zIndex += this.itemInner.length;
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
				i.parentStyle.zIndex = this.itemInner.length + 1;
				this.itemInner.push(i);
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
		
		/*.detail{
			background-repeat: no-repeat;
			background-position: center;
		}*/
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>