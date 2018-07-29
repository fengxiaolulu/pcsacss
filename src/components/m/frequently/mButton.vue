<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :parent="itemMdata.parent" :z="itemMdata.parentStyle.zIndex" :active.sync = "itemMdata.parentStyle.active" :minw="1" :minh="1" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['m_button_con hove_con',{hover:isHover}]" @mouseenter="hoverBtn($event)" @mouseleave="leaveBtn($event)" @dblclick="linkUrl" @contextmenu="showMenu">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑按钮</span>
				<span @click="editDial.setlink=true" class="icon style"><i>设置链接</i></span>
				<!--span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<button @mouseover="btnRefresh()" @dblclick="linkUrl(itemMdata)" :id="buttonId" :style="[itemMdata.buttonStyle,{borderRadius:itemMdata.borderRadius+'px'},{width:itemMdata.buttonStyle.width+'px'},{height:itemMdata.buttonStyle.height+'px'},itemMdata.hoverS==1?itemMdata.hoverStyle:itemMdata.buttonStyle]">
				<span :style="[itemMdata.spanStyle,{borderRadius:itemMdata.borderRadius+'px'}]"><i :style="[itemMdata.hoverS==1?itemMdata.hoverStyle:itemMdata.iStyle]">{{itemMdata.tText}}</i></span>
			</button>
			<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
			<uiLink v-if="editDial.setlink" :itemMdata='itemMdata' :editDial="editDial"></uiLink>
		</div>
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import uiLink from '../uiLink.vue'
	import VueDraggableResizable from 'vue-draggable-resizable'
	//import uiDialog from '../uiDialog.vue'	 
	export default {
		name: 'mButton',
		components: {
			VueDraggableResizable,
			uiLink,
			//uiDialog
		},
		props: ['itemMdata',"posCom", 'index',"itemInner"],
		created() {
			console.log(this.itemMdata);
		},
		mounted(){
			hoverAction.buttonHover(this.buttonId,this.itemMdata)
			urlLink.showHand(this.buttonId,this.itemMdata)
		},
		methods: {	
			btnRefresh(){
				urlLink.showHand(this.buttonId,this.itemMdata)
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
			hoverBtn(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leaveBtn(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;			
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
			enterStyle(e,buttonData) {
				hoverAction.enterStyle(e,buttonData)				
			},
			leaveStyle(e,buttonData) {
				hoverAction.leaveStyle(e,buttonData)
			},
			onActivated() {
				this.isHover = true;
				this.curIndex = this.itemMdata.parentStyle.zIndex;
				//console.log(this.itemInner.length)
				this.itemMdata.parentStyle.zIndex = 1000;			
			},
			onDeactivated() {
				this.isHover = false;
				this.itemMdata.parentStyle.zIndex = this.curIndex;
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.buttonStyle.height = height+'px';
				//this.itemMdata.buttonStyle.width = width+'px';
				//this.itemMdata.buttonStyle.lineHeight = height+'px';
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			linkUrl(item){
				var link = item.link;
				var t = this;
				console.log(link)
				if(!link){
					return;
				}
				
				if(Number(link)){
					if(item.target == '_blank'){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
					if(item.target == '_self'){
						location.href = t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id;
					}
					if(!item.target){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
				}else{
					if(link.indexOf("http") > -1 && item.target == '_blank'){
						window.open(link)
					}else if(link.indexOf("http") < 0 && item.target == '_blank'){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}

					if(link.indexOf("http") > -1 && item.target == '_self'){
						location.href = link
					}else if(link.indexOf("http") < 0 && item.target == '_self'){
						location.href = t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id
					}
					if(link.indexOf("http") > -1 && !item.target){
						window.open(link)
					}else if(link.indexOf("http") < 0 && !item.target){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}
				}
				
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		},
		data() {
			return {
				title: "按钮组件",
				outerVisible: false,
				preview: '/t1/' + this.$route.params.id + "/",
				parentStyle: {},
				buttonId:'buttonId'+ this.posCom + this.index,
				curIndex:0,
				isHover:false,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id
				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "650px",
					isEdit: true,
					setlink:false,
					rTitle: '编辑按钮',
					editDialzIndex:1000
				},
				hoverS: 2,
				backgroundDiv: {
					backgroundImage: 'url(' + this.itemMdata.mImage0.url + ')',
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
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
			width: 160px;
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
	
	.hove_con.hover {
		.edit_con {
			display: block;
		}
	}
	
	button {}
</style>