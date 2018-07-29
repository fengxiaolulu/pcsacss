<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top"  :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :active.sync = "itemMdata.parentStyle.active" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['columnPicture hove_con',{hover:isHover}]" @mouseenter="hoverColumnPicture($event)" @mouseleave="leaveColumnPicture($event)" >
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑列图多表</span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" :id="columnPictureId" @contextmenu="showMenu" :style="[{height:itemMdata.parentStyle.height+'px'}]">
				<!--one-->
				<ul class="styleone" v-show="itemMdata.styleone">
					<li v-for="(list,idx) in itemMdata.columnPictureLlist" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4,mouseenterFive:itemMdata.mouseenterNumber==5}">
						<div  @dblclick="linkUrl(list)" class="imgHover colimgHover colDiv"  ref="imgHover" :style="[itemMdata.colimgHover,itemMdata.divStyle,{width:itemMdata.imgStyle2.width}]">
							<img :src="list.hoverUrl" ref="imgsFront"  class="front"  v-show="itemMdata.isImg" :style="[{width:itemMdata.imgStyle2.width},{height:itemMdata.imgStyle.height}]"/>
							<img @mousedown="defaultStop($event)" class="back" :src="list.url" ref="imgsBack"" :style="[{width:itemMdata.imgStyle2.width},{height:itemMdata.imgStyle.height}]"/>
							<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth}]">
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="describeHtml(list.describe)"></p>
								<i class="el-icon-search" :style="itemMdata.iStyle"></i>
							</div>
						</div>
						<p class="pW">
							<span :style="itemMdata.pStyle">{{list.text}}</span>
							<span v-show="itemMdata.imgDescription==true" :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></span>
						</p>
					</li>
				</ul>
				<!--two-->
				<div class="carousel-wrap slide1" v-show="itemMdata.styletwo">
					<div class="width" :style="[itemMdata.styleTwo,{height:itemMdata.parentStyle.height+'px'}]" ref="slide1Box">
						<ul class='slideUl' ref="slide1">
							<li v-for="(list,index) in itemMdata.columnPictureLlist"  :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4,mouseenterFive:itemMdata.mouseenterNumber==5}">
								<div @dblclick="linkUrl(list)" class="liDiv colDiv" :style="[itemMdata.divStyle,{width:itemMdata.imgStyle2.width}]">
									<img @mousedown="defaultStop($event)" :src="list.url" :style="[{width:itemMdata.imgStyle2.width},{height:itemMdata.imgStyle.height}]" ref="twoImgs" class="twoImgs"/>
									<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth}]">
										<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="describeHtml(list.describe)"></p>
										<i></i>
									</div>
								</div>
								<p class="pW">
									<span :style="itemMdata.pStyle">{{list.text}}</span>
									<span v-show="itemMdata.imgDescription==true" :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></span>
								</p>
							</li>
						</ul>
					</div>
					<div class="button" v-show="itemMdata.showbtnP == 0">
						<span class="pre1" :id="colBtnPre" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.colPre.url+')'}]"></span>
						<span class="next1" :id="colBtnNext" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.colNext.url+')'}]"></span>
					</div>
					<div class="button bButton" v-show="itemMdata.showbtnP == 1">
						<span class="pre1 bottomBtn" :id="colBtnPre" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.colPre.url+')'}]"></span>
						<span class="next1 bottomBtn" :id="colBtnNext" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.colNext.url+')'}]"></span>
					</div>
					
				</div>
				<!--three-->
				
				<div class="threeStyle" :style="[{width:itemMdata.parentStyle.width+'px'},{height:itemMdata.parentStyle.height+'px'}]" v-if="itemMdata.stylethree">
					 <table align="center">
						<tr>
							<td :style="[{width:itemMdata.parentStyle.width+'px'},{height:itemMdata.parentStyle.height+'px'}]" align=center >
								<div class="tableBox" :style="[{overflow:'hidden'},{width:itemMdata.parentStyle.width+'px'},{height:itemMdata.parentStyle.height+'px'}]" align=center>
									<table border=0 align=center cellpadding=0 cellspacing=0 cellspace=0 >
										<tr>
											<td valign=top class="old">
												<table cellspacing="5" cellpadding="0">
													<tr>
														<td :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4,mouseenterFive:itemMdata.mouseenterNumber==5}" :style="[{width:itemMdata.liStyle.width}]" v-for="(list,index) in itemMdata.columnPictureLlist">
															<div @dblclick="linkUrl(list)" class="liDiv colDiv" :style="[itemMdata.divStyle,{width:itemMdata.imgStyle2.width},{marginTop:itemMdata.liStyle.marginTop},{marginBottom:itemMdata.liStyle.marginBottom},{marginleft:itemMdata.liStyle.marginleft},{marginRight:itemMdata.liStyle.marginRight}]">
																<img @mousedown="defaultStop($event)" :src="list.url" :style="{width:itemMdata.imgStyle2.width}"/>
																<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth}]">
																	<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="describeHtml(list.describe)"></p>
																	<i></i>
																</div>
															</div>
															<p class="pW" :style="[{float:itemMdata.divStyle.float},{width:itemMdata.pStyle.width}]">
																<span :style="itemMdata.pStyle">{{list.text}}</span>
																<p v-show="itemMdata.imgDescription==true" :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
															</p>
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
				
			</div>
		</div>
		<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	//require("../../../../static/js/emit.js");
	//import uiDialog from '@/components/m/uiDialog.vue'


	
	export default {
		name: 'columnPicture',
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			if(document.querySelector('.back')&&this.itemMdata.isImg==true){
				this.itemMdata.imgHeight = document.querySelectorAll('.back')[0].naturalHeight;
				this.itemMdata.imgWidth = document.querySelectorAll('.back')[0].naturalWidth;
			}
			this.itemMdata.liStyle = this.itemMdata.liStyle||{}
			this.itemMdata.ulStyle = this.itemMdata.ulStyle ||{};
			this.itemMdata.colimgHover = this.itemMdata.colimgHover ||{};
			this.itemMdata.spanStyle = this.itemMdata.spanStyle || {};
			this.itemMdata.colPre = this.itemMdata.colPre || {};
			this.itemMdata.colNext = this.itemMdata.colNext || {};
			this.itemMdata.columnPictureIdEdit = this.columnPictureId
			this.itemMdata.slideStyle = this.itemMdata.slideStyle||{};
			this.itemMdata.styleTwo = this.itemMdata.styleTwo||{}
			this.itemMdata.itemCur = this.itemMdata.itemCur||{}
			this.itemMdata.iStyle = this.itemMdata.iStyle||{}
			this.itemMdata.liStyleH = this.itemMdata.liStyleH ||{}
			this.itemMdata.divStyle = this.itemMdata.divStyle ||{};
		},
		data() {
			return {
				title: "列表多图",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				colBtnPre:'colBtnPre' + this.index,
				colBtnNext:'colBtnNext' + this.index,
				preview: '/t1/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				curIndex: 0,
				isHover: false,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					version_id: this.$route.query.version_id,					
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id
				},
				parentStyle: {

				},
				isHover:false,
				hoverUrl:'',
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					isEdit: false,
					rTitle: '编辑列表多图',
				},
				marginleft: 0,
				marginleft2: 0,
				currentIndex: 0,
				currentIndex2: 0,
				timer: '',
				columnPictureId: "columnPicture" + this.posCom + this.index,
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
		mounted() {
			this.itemMdata.colId = this.columnPictureId
			
			hoverAction.columnPictureHover(this.columnPictureId,this.itemMdata)
			console.log("this.itemMdata")
			console.log(this.itemMdata)
			//debugger;
			hoverAction.colPreNext(this.columnPictureId,this.itemMdata)
			
			urlLink.showHand(this.columnPictureId,this.itemMdata)
			
			if(document.querySelectorAll('.back').length>0){
				this.itemMdata.imgHeight = document.querySelectorAll('.back')[0].naturalHeight;
				this.itemMdata.imgWidth = document.querySelectorAll('.back')[0].naturalWidth;
			}
			console.log($('.threeStyle'))
			
				
		},
		components: {
			VueDraggableResizable,
			//uiDialog
		},
		methods: {
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
			
			describeHtml(s) {
			　　if (s) {
			　　　　return s.replace(/\s/g,'<br/>')
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
				console.log('downFloor!')
			},
			//gotolink:function(link,target){
				//window.open(link,target); 
			//},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				i.colPicEdtStyle = true;
				this.$emit('isFuncur', i,this.editDial);				
			},
			hoverColumnPicture(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leaveColumnPicture(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;
			},
			defaultStop(e) {
				e.preventDefault();
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
				this.itemMdata.widthW = parseInt($('#'+this.itemMdata.columnPictureIdEdit).find('.width').css('width'));
				if(this.itemMdata.showbtnP == 0){
					this.itemMdata.styleTwo.width = (this.itemMdata.parentStyle.width-parseInt(this.itemMdata.spanStyle.width)*2)+'px'
				}
				else{
					this.itemMdata.styleTwo.width = this.itemMdata.parentStyle.width + 'px'
				}
				
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
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			},
			pre: function() {
				//var imgW = this.$refs.twoImgs[0].naturalWidth
				var imgW = document.querySelectorAll('.twoImgs')[0].naturalWidth
				this.currentIndex++;
				if(this.currentIndex <= this.itemMdata.columnPictureLlist.length-1 ){
					console.log()
					this.marginleft = -imgW*this.currentIndex;
					//this.$refs.slide1.style.left = this.marginleft + 'px';
					document.querySelector('.slideUl').style.left = this.marginleft + 'px';
				}
				console.log(this.marginleft)
			},
			next: function() {
				var imgW = document.querySelectorAll('.twoImgs')[0].naturalWidth
				if(this.marginleft==0){
					//this.$refs.slide1.style.left = 0;
					document.querySelector('.slideUl').style.left = 0;
				}
				if(this.marginleft<0){
					this.currentIndex--;
					this.marginleft = -imgW*this.currentIndex;
					console.log(this.marginleft)
					//this.$refs.slide1.style.left = this.marginleft + 'px';
					document.querySelector('.slideUl').style.left = this.marginleft + 'px';
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style id="dynamic" lang="scss" scoped >
	.columnPicture .detail ul .mouseenterOne .hid{
		border:none !important;
	}
	.hove_con {
		position: relative;
		width:100%;
		height:100%;
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
			span:nth-child(1){
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon{
				display: block;
				float: left;
				border-right: none;
				background: url(/static/image/bg03.png)no-repeat;
			}
			.icon i{
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
			.style{
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover{
				background-position: -60px -232px;
			}
			.style:hover i{
				display: block;
			}
			.animation{
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover{
				background-position: -372px -232px;
			}
			.animation:hover i{
				display: block;
			}
			.borderhid{
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover{
				background-position: -275px -232px;
			}
			.borderhid:hover i{
				display: block;
			}
			.delete{
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover{
				background-position: -105px -232px;
			}
			.delete:hover i{
				display: block;
			}
		}
		.liDiv{
			position:relative;
			clear:both;
			overflow:hidden;
			
		}
		.imgHover{
			position:relative;
			transition: 1s; 
			transform-style: preserve-3d;
			
			img{width:100%;}
			.front{ position: absolute; top: 0;left:0;
				transform:rotateY(180deg);
			}

			.back{ position: absolute; top: 0; left:0;
				backface-visibility: hidden;
				
			}
			
		}
		
		.detail {
			clear: both;  
			overflow: hidden;
			.styleone{
				li{
					p{
						top:0;
					}
				}
			}
			ul {
				clear: both;
				overflow: hidden;
			
				li {
					text-align: center;
					overflow: hidden;
					position: relative;
					
					img {
						
						position: relative;
					}
					p {
						line-height: 25px;
						text-align: center;
						overflow: hidden;
						/*padding:10px;
						white-space: nowrap;
						text-overflow: ellipsis;*/
						top: 30%;
    					position: relative;
					}
					
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
				.mouseenterThree:hover .hid {
					display: block;
					background: rgba(0, 0, 0, 0.7) !important;
					border-radius: 100%;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					
				}
				.mouseenterThree:hover .hid p {
					display: none;
				}
				
				.mouseenterFour:hover .hid {
					border: none !important;
					display: block;
					background: rgba(0, 0, 0, 0.7);
					text-align: center;
					
				}
				.mouseenterFour:hover .hid p {
					color: #FFFFFF;
				}
				.mouseenterFive:hover .hid {
					border: none !important;
					display: block;
					top: auto;
					height: 25px;
					line-height: 25px;
				}
				.mouseenterFive:hover .hid p {
					color: #FFFFFF;
				}
			}
			.carousel-wrap {
				width: 100%;
				clear: both;
				overflow: hidden;
				position: relative;
			}
			.carousel-wrap.slide1{
				.width {
					width: 90%;
					margin: 0 auto;
					overflow: hidden;
					position: relative;
					
				}
				.slide-ul {
					width: auto;
					overflow: hidden;
					position: absolute;
					left:0;
				}
				.bButton{
					position: absolute;
					left: 50%;
    				bottom: -2%;
					transform: translate(-50%,0);
				}
				.button,.bButton {
					span {
						font-size: 24px;
						color: #FFFFFF;
						text-align:center;
						position: absolute;
						cursor: pointer;
						display:block;
					}
					.bottomBtn{
						position: static;
						display:inline-block;
					}
					.pre1 {
						left: 0px;
						top: 50%;
						transform: translate(0,-50%);
					
					}
					.next1 {
						left: auto;
						right: 0px;
						top: 50%;
						transform: translate(0,-50%);
					
					}
				}
			}
			
		}
	}
	.threeStyle{
		
  	 	overflow: hidden;
		ul{
			position: relative;
		}
	}
	.hove_con.hover {
		.edit_con {
			display: block;
		}
	}
</style>