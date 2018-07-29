<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height||30" :parent="itemMdata.parent" :active.sync = "itemMdata.parentStyle.active" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.cancel'">
	<div class="photoMoreCard">
		<div :class="['mCon hove_con',{hover:isHover}]" @mouseenter="hoverPhotoMoreCard($event)" @mouseleave="leavePhotoMoreCard($event)" @contextmenu="showMenu">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑魔方多图</span>
				<!--span class="icon style" @click="itemMdata.isStyleEdit = true"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="styleone clearfloat" v-if="itemMdata.styleLayout == 0">
				<div class="oneLeft fl positionR"  @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/>
					<div class="hid" :style="itemMdata.hidStyle" ref="hid">
						<i></i>
					</div>
				</div>
				<div class="oneRight">
					<div class="oneRTop positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[1]"/>
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="oneRBottom">
						<div class="oneBLeft fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
							<img :src="itemMdata.imgItem[2]"/>
							<div class="hid" :style="itemMdata.hidStyle">
								<i></i>
							</div>
						</div>
						<div class="oneBRight positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
							<img :src="itemMdata.imgItem[3]"/>
							<div class="hid" :style="itemMdata.hidStyle">
								<i></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="styletwo clearfloat" v-if="itemMdata.styleLayout == 1">
				<div class="oneLeft fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/>
					<div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
				</div>
				<div class="oneRight">
					<div class="oneRTop">
						<div class="oneBLeft fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
							<img :src="itemMdata.imgItem[1]"/>
							<div class="hid" :style="itemMdata.hidStyle">
								<i></i>
							</div>
						</div>
						<div class="oneBRight positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
							<img :src="itemMdata.imgItem[2]"/>
							<div class="hid" :style="itemMdata.hidStyle">
								<i></i>
							</div>
						</div>
					</div>
					<div class="oneRBottom positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)"><img :src="itemMdata.imgItem[3]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					
				</div>
			</div>
			<div class="stylethree clearfloat" v-if="itemMdata.styleLayout == 2">
				<div class="oneLeft fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/>
					<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
					</div>
				</div>
				<div class="oneCenter fl">
					<div class="oneCTop three threeMargin positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[1]"/>
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="oneCBottom three positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[2]"/>
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="threeRight fr">
					<div class="threeRTop three threeMargin positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[3]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="threeRBottom three positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[4]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
			</div>
			<div class="stylefour" v-if="itemMdata.styleLayout == 3">
				<div class="fourTop  clearfloat">
					<div class="fourTLeft fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="fourTRight fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[1]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				<div class="fourBottom  clearfloat">
					<div class="fourB fl w33 positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[2]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="fourB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[3]"/>
						<div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
					<div class="fourB fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[4]"/>
						<div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
				</div>
			</div>
			<div class="stylefive" v-if="itemMdata.styleLayout == 4">
				<div class="fourTop  clearfloat">
					<div class="fourTRight fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="fourTLeft fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[1]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				<div class="fourBottom  clearfloat">
					<div class="fourB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[2]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="fourB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[3]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
					<div class="fourB fr w33 positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[4]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
				</div>
			</div>
			<div class="stylesix" v-if="itemMdata.styleLayout == 5">
				<div class="fourBottom  clearfloat">
					<div class="sixB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="sixB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[1]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
					<div class="sixB fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[2]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
				</div>
				<div class="fourTop  clearfloat">
					<div class="fourTRight fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[3]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="fourTLeft fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[4]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				
			</div>
			<div class="styleseven" v-if="itemMdata.styleLayout == 6">
				<div class="sevenTop clearfloat">
					<div class="sevenT fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="sevenT fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[1]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
					<div class="sevenT fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[2]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
					<div class="sevenT fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[3]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				<div class="sevenBottom clearfloat">
					<div class="sevenB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[4]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="sevenB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[5]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="sevenB fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[6]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				
			</div>
			<div class="styleeight" v-if="itemMdata.styleLayout == 7">
				<div class="fourBottom  clearfloat">
					<div class="sixB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="sixB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[1]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
					<div class="sixB fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[2]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
				</div>
				<div class="fourTop  clearfloat">
					<div class="eightTRight fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[3]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="eightTRight fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[4]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				
			</div>
			<div class="stylenight" v-if="itemMdata.styleLayout == 8">
				
				<div class="fourTop  clearfloat">
					<div class="eightTRight fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="eightTRight fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[1]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				<div class="fourBottom  clearfloat">
					<div class="sixB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[2]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="sixB fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[3]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
					<div class="sixB fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[4]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div>
					</div>
				</div>
			</div>
			<div class="styleten" v-if="itemMdata.styleLayout == 9">
				<div class="fourBottom clearfloat">
					<div class="eightTRight fl  positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[0]"/>
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
					<div class="eightTRight fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[1]"/>
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
				<div class="fourTop">
					<div class="tenB positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
						<img :src="itemMdata.imgItem[2]"/>
						<div class="hid" :style="itemMdata.hidStyle">
							<i></i>
						</div>
					</div>
				</div>
			</div>
			<div class="styleeleven" v-if="itemMdata.styleLayout == 10">
				<div class="elevenTop clearfloat">
					<div class="elevenT fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="elevenT fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[1]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="elevenT fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[2]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				<div class="elevenBottom clearfloat">
					<div class="elevenT fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[3]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="elevenT fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[4]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="elevenT fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[5]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				
			</div>
			<div class="styletwelfth" v-if="itemMdata.styleLayout == 11">
				<div class="twelfthTop clearfloat">
					<div class="twelfthT fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[0]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="twelfthT fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[1]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				<div class="twelfthBottom clearfloat">
					<div class="twelfthT fl positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[2]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
					<div class="twelfthT fr positionR" @mouseenter="hoverPotion($event)"@mouseleave="leavePotion($event)">
					<img :src="itemMdata.imgItem[3]"/><div class="hid" :style="itemMdata.hidStyle">
						<i></i>
					</div></div>
				</div>
				
			</div>
		</div>
	
		<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata'  :editDial="editDial"></uiDialog-->
	</div>
	<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
	</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
//	import uiDialog from '../uiDialog.vue'
	import VueDraggableResizable from 'vue-draggable-resizable'
	
	export default {
		name: 'photoMoreCard',
		props: ['itemMdata', 'posCom',"itemInner", 'index'],
		created() {
			console.log(this.itemMdata);
		},
		components: {
			//uiDialog,
			VueDraggableResizable
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
			moveDownFloor(i) {
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			hoverPhotoMoreCard(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leavePhotoMoreCard(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;	
			},
			copyItem(item) {
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.itemInner.length + 1;
				this.itemInner.itemInner.push(i);
			},
			downFloor(i) {
				i.parentStyle.zIndex =  0;
				console.log('downFloor!')
			},	
			hoverPotion(e){
				var positionRs = document.querySelectorAll('.positionR');
				var hid = document.querySelectorAll('.hid');
				for(var i=0;i<positionRs.length;i++){
					if(e.target == positionRs[i] && this.itemMdata.mouseenterNumber == 1){
						hid[i].style.display = 'block';
						this.itemMdata.hidStyle.background= "#fff";
						hid[i].querySelector('i').style.display = 'none';
					}
					if(e.target == positionRs[i] && this.itemMdata.mouseenterNumber == 2){
						hid[i].style.display = 'block';
						this.itemMdata.hidStyle.borderColor = "#fff";
						this.itemMdata.hidStyle.background= "#fff";
						hid[i].querySelector('i').style.display = 'block';
					}
					if(e.target == positionRs[i] && this.itemMdata.mouseenterNumber == 3){
						hid[i].style.display = 'block';
						this.itemMdata.hidStyle.borderColor = "#fff";
						hid[i].querySelector('i').style.display = 'none';
					}
				}
				
			},
			leavePotion(e){
				var positionRs = document.querySelectorAll('.positionR');
				var hid = document.querySelectorAll('.hid');
				for(var i=0;i<positionRs.length;i++){
					if(e.target == positionRs[i]  && this.itemMdata.mouseenterNumber == 1||this.itemMdata.mouseenterNumber == 2||this.itemMdata.mouseenterNumber == 3){
						hid[i].style.display = 'none';
					}
					
				}
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i,this.editDial);
			},
			
			removeComponent(i) {//this.count = Number(this.count) + 1;
					//this.reversed = this.count + this.fdlag;
					this.$emit('removeComponent', i);
					this.$emit('recomponent', i);
			}
		},
		data() {
			return {
				title: "魔方多图",
				cons: "图片内容",
				parentStyle: {
					
				},
				isHover:false,
				styleone:true,
				editDial: {
					editDialWidth: "650px",
						isEdit:true,
					editDialHeight: "580px",
					rTitle: '管理魔方多图'
				},
				styletwo:false,
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
<style  lang="scss" scoped>
	.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0} 
	.fl{float:left;}
	.fr{float:right;}
	.positionR{
		position:relative;
		.hid{
			display:none;
			position: absolute;
			left: 0;
			top: 0;
			right:0;
			bottom:0;
			opacity:0.6;
			transition: all 0.7s;
			-moz-transition: all 0.7s;
			-webkit-transition: all 0.7s;
			-o-transition: all 0.7s;
			i{
				display: block;
				position:absolute;
				width: 40px;
				height: 40px;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
				background-image: url(/static/image/mbg01.png);
				background-color: rgba(0, 0, 0, 0.7) !important;
				background-position: 12px -1078px;
				border-radius:100%;
				background-repeat: no-repeat;
			}
		}
	}
	.photoMoreCard{
		height:100%;
		width:100%;
		.styleone ,.styletwo ,.stylethree,.stylefour,.stylefive,.stylesix,.styleseven,.styleeight,.stylenight,.styleten,.styleeleven,.styletwelfth{
			width:100%;
			height:100%;
			.oneLeft{
				width:33%;
				height:100%;
				
			}
			
			.oneRight{
				float:right;
				width:66%;
				height:100%;
				.oneRTop{height:59%;margin-bottom:1%;}
				.oneRBottom{height:39%;}
			}
		}
	}
	img{
		height:100%;
		width:100%;
	}
	.oneBLeft{width:49.5%;height:100%;}
	.oneBRight{width:49%;height:100%;float:right;}
	.oneCenter{width:37%;margin:0 1%;height:100%;}
	.threeRight{width:28%;height:100%;}
	.three{height:49%;}
	.threeMargin{margin-bottom:2%;}
	.fourTop{height:60%;}
	.fourTLeft{width:33%;height:100%;}
	.fourTRight{width:66%;height:100%;}
	.fourBottom  {height:38%;}
	
	.fourB{width:32.5%;height:100%;margin:1% 1% 0 0;}
	.w33{
		width:33%;
	}
	.fourB.fr{margin-right:0;}
	.sixB:last-child{
		width:33%;
	}
	.sixB{width:32.5%;height:100%;margin:0 1% 1% 0;}
	.sixB.fr{margin-right:0;}
	.sevenTop{
		height:50%;
		.sevenT{
			height:100%;
			width:24%;
			margin-right:1%;
		}
		.sevenT:last-child{margin-right:0;width:25%;}
	}
	.sevenBottom{
		margin-top:1%;
		height:49%;
		.sevenB{
			height:100%;
			width:24%;
		}
		.sevenB:first-child{width:49%;margin-right:1%;}
		.sevenB:last-child{width:25%;}
	}
	.eightTRight{width:49%;height:100%;}
	.eightTRight:first-child{width:50%;}
	.stylenight{
		.fourBottom{
			.sixB{margin:1% 1% 0 0;}
			.sixB.fr{margin-right:0;}
		}
	}
	.tenB{width:100%;height:100%;margin-top:1%;}
	.elevenTop,.twelfthTop{
		height:49%;
		margin-bottom:1%;
		.elevenT:first-child{
			width:43%;
		}
		.elevenT{
			height:100%;
			width:30%;
			margin-right:1%;
		}
		.elevenT:last-child{
			width:25%;
			margin-right:0;
		}
		.twelfthT{
			height:100%;
			width:60%;
			margin-right:1%;
		}
		.twelfthT:last-child{
			width:39%;
			margin-right:0;
		}
	}
	.elevenBottom,.twelfthBottom{
		height:50%;
		.elevenT:first-child{
			width:25%;
		}
		.elevenT{
			height:100%;
			width:30%;
			margin-right:1%;
		}
		.elevenT:last-child{
			width:43%;
			margin-right:0;
		}
		.twelfthT{
			height:100%;
			width:39%;
			margin-right:1%;
		}
		.twelfthT:last-child{
			width:60%;
			margin-right:0;
		}
	}
	.button {
		text-align: center;
	}
	
	button {
		padding: 3px 6px;
		color: #fff;
		background-color: rgb(52, 182, 253);
	}
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
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>