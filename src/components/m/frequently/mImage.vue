<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :parent="itemMdata.parent" :active.sync="itemMdata.parentStyle.active" :z="itemMdata.parentStyle.zIndex" :minw="1" :minh="1" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['hove_con',{hover:isHover}]" @mouseenter="hoverImg($event)" @mouseleave="leaveImg($event)">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑图片</span>
				<span @click="editDial.setlink=true" class="icon style"><i>设置链接</i></span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<!--<span class="icon style" @click="styleSet(itemMdata)"><i>设置样式</i></span>-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div @contextmenu="showMenu" class="imgHover" ref="imgHover" @dblclick="linkUrl(itemMdata)" :id="imageId">
				<img :src="itemMdata.hoverUrl" class="imgs front" :style="itemMdata.imgStyle" v-show="itemMdata.isRotate ||itemMdata.isImg" />
				<img class="imgs back imgsModel" ref="imgs" :src="itemMdata.url" @mousedown="defaultStop($event)" :style="itemMdata.imgStyle" />
				<p ref="imgP" :class="['imgP',{centerP:itemMdata.isTxtP == true,leftP:itemMdata.isTxtP == false}]">
					<span v-html="hoverHtml(itemMdata.hovertxt)"></span>
				</p>

			</div>
		</div>
		<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
		<uiLink :itemMdata='itemMdata' v-if="editDial.setlink" :editDial="editDial"></uiLink>
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import uiLink from '../uiLink.vue'
	import VueDraggableResizable from 'vue-draggable-resizable'
	//import uiDialog from './uiDialog.vue'
	export default {
		name: 'tImg',
		components: {
			VueDraggableResizable,
			uiLink
			//uiDialog
		},
		data() {
			return {
				text: '默认图片',
				preview: '/t1/' + this.$route.params.id + "/",
				imageId:'imageId'+ this.index,
				id: this.$route.params.id,
				outerVisible: false,
				isHover:false,
				curIndex:1,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {
					//zIndex:this.itemMdata.parentStyle.zIndex
				},
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.mobile_version_id
				},
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					editDialzIndex: 1000,
					setlink: false,
					isEdit: false,
					rTitle: '编辑图片<span style="font-size:12px; color:white;"> (&nbsp;只能添加jpg,jpeg,gif,png, 免费版大小不超过1MB&nbsp;)</span>'
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
		props: ['itemMdata', "posCom", 'index', "itemInner"],
		created() {
			// console.log(JSON.stringify(this.itemMdata.parentStyle));
			// console.log(this.itemMdata.parentStyle.height);
			this.itemMdata.hoverStyle = this.itemMdata.hoverStyle || {};
			this.itemMdata.imgStyle = this.itemMdata.imgStyle || {};
			this.itemMdata.imgStyle.width = this.itemMdata.parentStyle.width+'px'
			this.itemMdata.imgStyle.height = this.itemMdata.parentStyle.height+'px;'
		},
		mounted(){
			//hoverAction.imageHover(this.imageId,this.itemMdata);
			//urlLink.linkUrl(this.itemMdata,this.preview,this.param,this.imageId)
			urlLink.showHand(this.imageId,this.itemMdata)
		},
		computed: {
			// 计算属性的 getter
			eImgId: function() {
				// this 指向 vm 实例
				return "img" + this.posCom + this.index
			}
		},
		methods: {
			hoverHtml(s) {　　
				if(s) {　　　　
					return s.replace(/\s/g, '<br/>')
				} else return '';
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
			hoverImg(e) {	
				var imgP = document.querySelector('.imgP');
				var imgs = document.querySelector('.imgsModel');
				if(this.itemMdata.isHover == true) {
					imgs.style.borderColor = this.itemMdata.hoverStyle.borderColor;
					imgs.style.borderStyle = this.itemMdata.hoverStyle.borderStyle;
				}
				if(this.itemMdata.isTxt == true) {
					imgP.style.display = 'flex';
				}
				if(this.itemMdata.isRotate == true&&this.itemMdata.isImg == true) {
					document.querySelector('.imgHover').style.transform = 'rotateY(180deg)';
					$('#'+this.imageId).find('.front').css({
						'transform': 'rotateY(180deg)'
					})
				}
				if(this.itemMdata.isImg == true&&this.itemMdata.isRotate == false){
					document.querySelector('.imgHover').style.transform = 'rotateY(0deg)';
					$('#'+this.imageId).find('.front').css({
						'transform': 'rotateY(0deg)'
					})
					$('#'+this.imageId).find('.back').css({
						'position': 'static'
					})
				}
				urlLink.showHand(this.imageId,this.itemMdata);			
				this.isHover = true;	
				//console.log(this.itemInner);
				//debugger;
				this.itemInner.isStopPropagation = true;				
				this.itemInner.isHover = false;	
				//this.onActivated();				
			},
			leaveImg(e) {
				var imgP = document.querySelector('.imgP');
				var imgs = document.querySelector('.imgsModel');
				imgs.style.borderColor = '';
				imgs.style.borderStyle = '';
				imgP.style.display = 'none';
				document.querySelector('.imgHover').style.transform = 'rotateY(0)';
				$('#'+this.imageId).find('.back').css({
					'position': 'absolute'
				})
				
				this.isHover = false;
				this.itemInner.isStopPropagation = false;	
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				this.itemMdata.imgStyle.width = width+'px';
				this.itemMdata.imgStyle.height = height+'px;';
			},
			/*onActivated() {
				this.isHover = true;
				this.curIndex = this.itemMdata.parentStyle.zIndex;
				//console.log(this.itemInner.length)
				this.itemMdata.parentStyle.zIndex = 1000;			
			},
			onDeactivated() {
				this.isHover = false;
				this.itemMdata.parentStyle.zIndex = this.curIndex;
			},*/
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
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
				// console.log(i.parentStyle);
				i.parentStyle.zIndex = this.itemInner.itemInner.length;
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
				i.parentStyle.zIndex = this.itemInner.itemInner.length + 1;
				this.itemInner.itemInner.push(i);
			},
			downFloor(i) {//置于底层
				i.parentStyle.zIndex = 0;
				console.log('downFloor!');
			},

			defaultStop(e) {
				e.preventDefault();
			},
			removeComponent(i) {
				console.log(i);
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;		
				// this.$emit('moverModule',this.itemMdata.parentStyle);
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		width: 100%;
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
				margin-top: 3px;
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
		.imgHover {
			position: relative;
			transition: 1s;
			transform-style: preserve-3d;
			height: 100%;
			.imgs {
				border: 1px solid transparent;
			}
			p {
				box-sizing: border-box;
				padding: 20px;
				width: 100%;
				height: 100%;
				display: none;
				flex-direction: column;
				font-size: 14px;
				/*text-indent: 28px;*/
				text-align: left;
				background-color: rgba(33, 33, 33, 0.8);
				color: #ccc;
				position: absolute;
				left: 0;
				top: 0;
				overflow: hidden;
				transition: all 0.5s ease;
			}
			.centerP {
				text-align: center;
				span {
					display: block;
					margin: auto;
				}
			}
			.leftP {
				text-align: left;
				span {
					display: block;
					margin: auto 0;
				}
			}
			.front {
				position: absolute;
				top: 0;
				/*backface-visibility: hidden;*/
				transform: rotateY(180deg);
			}
			.back {
				position: absolute;
				top: 0;
				left: 0;
				backface-visibility: hidden;
			}
		}
		span {
			display: block;
			padding: 5px 0;
		}
		li:hover p {
			left: 0px;
		}
	}
	
	/*.hove_con:hover,*/.hove_con.hover {
		.edit_con {
			display: block;
		}
	}
	
	img {
		/*position: absolute;*/
	}
</style>