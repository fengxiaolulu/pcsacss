<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :active.sync = "itemMdata.parentStyle.active" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['serviceOnline hove_con',{hover:isHover}]" @contextmenu="showMenu" @mouseenter="hoverServiceOnline($event)" @mouseleave="leaveServiceOnline($event)" :id="serviceOnlineId" :style="itemMdata.serIdStyle">
			<p class="edit_con"  style="z-index:100;" :style="itemMdata.editConStyle">
				<span @click="isFuncur(itemMdata)">编辑在线客服</span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail">
				<div class="styleone" v-if="itemMdata.styleShow == 1">
					<div class="kefu">						
						<p class="title">在线客服</p>
						<ul>
							<li class="text" v-for="table in itemMdata.serviceOnlineTable" :style="{float:itemMdata.float}">
								<a target="_blank" rel="nofollow" title="业务经理" :href="table.openUrl"><img :src="itemMdata.icon" @mousedown="defaultStop($event)"></img>
								<span>{{table.online_name}}</span></a>
							</li>
						</ul>
					</div>
					<div class="time">
						<p class="title">工作时间</p>
						<p class="text" v-for="(item,idx) in itemMdata.time">
							<span>{{item.date_begin}}至{{item.date_end}}</span>
							<span>{{item.time_begin}}-{{item.time_end}}</span>
						</p>
					</div>
				</div>
				<div class="styletwo" v-show="itemMdata.styleShow == 2">
					<div class="floating_ck">
						<dl>
							<dt></dt>
							<dd v-for="itJ in itemMdata.floatPhone" class="consult" :style="itemMdata.fWtyle">
								<span :style="[{color:itemMdata.fWtyle.color}]">在线咨询</span>
								<div class="floating_left" :style="itemMdata.fWltyle">
									<a href="" :style="[{color:itemMdata.fWltyle.color}]">{{itJ.contact_content}}</a>
								</div>
							</dd>
							<dd v-if="itJ.online_type==1" v-for="itJ in itemMdata.serviceOnlineTable" class="words" :style="itemMdata.fWtyle">
								<span :style="[{color:itemMdata.fWtyle.color}]">在线QQ</span>
								<div class="floating_left" :style="itemMdata.fWltyle">
									<a target="_blank" rel="nofollow" title="业务经理" :href="itJ.openUrl">问题在线咨询</a>
								</div>
							</dd>
							<!--dd class="qrcord" :style="itemMdata.fWtyle">
								<span :style="[{color:itemMdata.fWtyle.color}]">微信公众号</span>
								<div class="floating_left floating_ewm" :style="itemMdata.fWltyle">
									<img :src="itemMdata.floatPublic.url" />
									<p class="qrcord_p01" :style="[{color:itemMdata.fWltyle.color}]">扫一扫<br>感谢您的关注！</p>
								</div>
							</dd-->
							<dd v-if="itWx.online_type==2" v-for="itWx in itemMdata.serviceOnlineTable" class="qrcord" :style="itemMdata.fWtyle">
								<span :style="[{color:itemMdata.fWtyle.color}]">{{itWx.online_account}}</span>
								<div class="floating_left floating_ewm2" :style="itemMdata.fWltyle">
									<img :src="itWx.online_image" />
									<p class="qrcord_p01" :style="[{color:itemMdata.fWltyle.color}]">扫一扫<br>了解更多信息！</p>
								</div>
							</dd>
							<dd class="returnTop" :style="itemMdata.fWtyle" @click="toTop()">
								<span :style="[{color:itemMdata.fWtyle.color}]">返回顶部</span>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
		<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	//import uiDialog from './uiDialog.vue'
	//require("../../../../static/js/emit.js")
	export default {
		name: 'serviceOnline',
		props: ['itemMdata',"posCom", "index", "itemInner"],
		created() {
			console.log(this.itemMdata);
			this.getData();
			this.itemMdata.serviceOnlineId = this.serviceOnlineId;
			this.itemMdata.fWtyle = this.itemMdata.fWtyle ||{};
			this.itemMdata.fWltyle = this.itemMdata.fWltyle ||{}
		},
		data() {
			return {
				title: "在线客服",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				token:this.$route.query.token,
				parentStyle: {

				},				
				curIndex:0,
				isHover:false,
				serviceOnlineId:'serviceOnlineId'+this.index,
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "600px",
					isEdit:true,
					rTitle: '编辑在线客服',
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
			VueDraggableResizable
			//uiDialog
		},
		mounted(){
			goTop.serReturnTop(this.itemMdata.serviceOnlineId);
		},
		methods: {
			defaultStop(e) {
				e.preventDefault();
			},
			toTop(){
				goTop.serReturnTop(this.itemMdata.serviceOnlineId);
			},
			hoverServiceOnline(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leaveServiceOnline(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;	
			},
			getData(){	
				var v = this;				
				api.get('/api/data/kfList?token='+this.token,true,{},function(data){
						console.log(data)
						for(var i = 0;data.data.length>i;i++) {							
							if(data.data[i].online_type==1){//http://wpa.qq.com/msgrd?v=3&uin=896115118&site=qq&menu=yes
								data.data[i].openUrl = "http://wpa.qq.com/msgrd?v=3&uin="+data.data[i].online_account+"&site=qq&menu=yes";						
							}
						}
						v.itemMdata.serviceOnlineTable = data.data;
					}
				)
				api.get('/api/data/worktimeList?token='+this.token,true,{},function(data){
						console.log(data);
						v.itemMdata.time = data.data;
					}
				)
				api.get('/api/data/contactList?token='+this.token,true,{},function(data){
						console.log(data);						
						v.itemMdata.floatPhone = data.data;
					}
				)
				
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
				this.$emit('isFuncur', i,this.editDial);
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
			width:150px;
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
			p {
				clear: both;
				overflow: hidden;
			}
			.title {
				font-weight: bold;
				border-bottom: 1px dashed #E3E3E3;
				font-size: 16px;
				color: #888888;
				line-height: 35px;
				margin-top: 10px;
			}
			ul {
				clear: both;
				overflow: hidden;
				li {
					width: auto;
				}
			}
			.text {
				color: #888888;
				line-height: 30px;
				margin-left: 20px;
				img {
					margin-right: 5px;
				}
				span {
					margin-right: 10px;
				}
			}
		}
	}
	
	.hove_con.hover {
		.edit_con {
			display: block;
		}
	}
</style>