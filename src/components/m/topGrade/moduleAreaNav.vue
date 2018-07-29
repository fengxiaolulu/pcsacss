<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :parent="itemMdata.parent" :active.sync="itemMdata.parentStyle.active" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.cancel'">
		<div :class="['moduleAreaNav hove_con',{hover:isHover}]" :style="itemMdata.layoutStyle" @mouseover="hoverModuleAreaNav($event)" @mouseleave="leaveModuleAreaNav($event)">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">管理导航</span>
				<span class="icon style" @click="itemMdata.isStyleEdit = true"><i>设置样式</i></span>
				<!--span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="moduleAreaNav_con" :style="{width:itemMdata.parentStyle.width,height:itemMdata.parentStyle.height,zIndex:itemMdata.parentStyle.zIndex}">
				<ul :id="moduleNavId" class="g-cf nav_i_show0" :style="[itemMdata.layoutOuterStyle,{fontSize:itemMdata.layoutOuterStyle.fontSize}]">
					<li v-if="item.is_show" class="nav_lifirth" v-for="item in router.navItem" :style="[itemMdata.layoutOuterStyleLi,item.cur==true?itemMdata.hoverColor:itemMdata.layoutOuterStyleLi,{width:itemMdata.layoutOuterStyleLi.width}]" @mouseenter="hoverColor($event)" @mouseleave="moveColor($event,item)" @click="setLabelItem(item)">
						<div class="tit_i1" @dblclick="goDesign(item)">{{item.column_name}}</div>
						<ul v-if="item.secondNav.length" class="g-cf sec_con" :style="{fontSize:itemMdata.hoverSec.fontSize,width:itemMdata.hoverSecBg.width,backgroundColor:itemMdata.hoverSecBg.backgroundColor}">
							<li v-if="second.is_show" v-for="second in item.secondNav" :style="[itemMdata.hoverSecBg,{lineHeight:itemMdata.hoverSecBg.height}]">
								<div class="tit_i2" @dblclick="goDesign(second)" :style="{width:itemMdata.hoverSecBg.width}" @mouseenter="hoverSec($event)" @mouseleave="moveSec($event)">{{second.column_name}}</div>
								<div class="third_con" :style="[itemMdata.hoverThrBg,{fontSize:itemMdata.hoverThr.fontSize},{left:itemMdata.hoverSecBg.width}]">
									<div v-if="third.is_show" :style="[itemMdata.hoverThrBg,{lineHeight:itemMdata.hoverThrBg.height},]" class="third_item" v-for="third in second.thirdNav" @dblclick="goDesign(third)" @mouseenter="hoverThr($event)" @mouseleave="moveThr($event)">{{third.column_name}}</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
			<!--vue-context-menu :contextMenuData="contextMenuData" @setAllModule="setAllModule(itemMdata)">
			</vue-context-menu-->
			<moduleAreaNavStyle v-if="itemMdata.isStyleEdit" :itemMdata='itemMdata' :editDial="editDial"></moduleAreaNavStyle>
		</div>
	</vue-draggable-resizable>
</template>
<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import moduleAreaNavStyle from './moduleAreaNavStyle.vue'
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	export default {
		name: 'moduleAreaNav',
		components: {
			//uiDialog,
			moduleAreaNavStyle,
			VueDraggableResizable
		},
		props: ['itemMdata', 'posCom',"itemInner", 'index'],
		created() {
			this.getData();
		},
		mounted() {
			hoverAction.moduleNavHover(this.moduleNavId, this.itemMdata);
		},
		methods: {
			setLabelItem(item) {
				for(let k = 0; this.router.navItem.length > k; k++) {
					this.router.navItem[k].cur = false;
				}
				item.cur = true;
			},
			hoverColor(e) {
				//e.target.style.background = this.itemMdata.hoverColor.backgroundColor;
				//e.target.style.color = this.itemMdata.hoverColor.color;
				//e.target.style.border = this.itemMdata.hoverColor.border;
			},		
			setAllModule(i) {
				var obj = {
					id: this.param.id,
					type: this.param.type,
					order: i
				};
				this.setPosSite(obj);
			},
			
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			removeComponent(i) {
				this.$emit('removeComponent', i); //删除该项
				this.$emit('recomponent', i);
			},
			getData() {
				api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.pc_version_id, true, {}, r => {
					if(r.code == 422) {
						console.log(r.message);
						return;
					}
					//console.log(r.data.list)

					var list = r.data.list;
					//this.router.navItem
					var firstList = [];
					for(let i = 0; list.length > i; i++) {
						//console.log(list[i].parent_id=1);
						list[i].secondNav = [];
						if(list[i].parent_id == 0) {

							firstList.push(list[i])
						}
					}
					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; list.length > k; k++) {
							list[k].thirdNav = [];
							if(firstList[i].id == list[k].parent_id) {
								firstList[i].secondNav.push(list[k])
							}
						}
					}

					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; firstList[i].secondNav.length > k; k++) {
							//var thirdNav = firstList[i].secondNav[k]
							for(let j = 0; list.length > j; j++) {
								//firstList[i].secondNav[k].thirdNav = [];
								if(firstList[i].secondNav[k].id == list[j].parent_id) {
									firstList[i].secondNav[k].thirdNav.push(list[j])
								}
							}
						}
					}

					this.router.navItem = firstList;
					console.log(this.router.navItem)
				});
			},
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
			hoverModuleAreaNav(e) {
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;
			},
			leaveModuleAreaNav(e) {
				this.isHover = false;
				this.itemInner.isStopPropagation = false;			
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				this.itemMdata.layoutOuterStyleLi.height = this.itemMdata.parentStyle.height + 'px';
				this.itemMdata.layoutOuterStyleLi.lineHeight = this.itemMdata.parentStyle.height + 'px';
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			},
			onDeactivated() {
				this.itemMdata.parentStyle.zIndex = this.curIndex;
				this.isHover = false;
			},
			onActivated() {
				this.isHover = true;
				this.curIndex = this.itemMdata.parentStyle.zIndex;
				this.itemMdata.parentStyle.zIndex = 1000;
				// console.log("imgonActivated");
			},
			...mapMutations([
				'setPosSite'
			]),
			...mapActions([
				'saveloca'
			])
		},
		computed: {
			...mapGetters(["router", 'itemCon'])
		},
		data() {
			return {
				title: "栏目导航",
				cons: "图片内容",
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
				curIndex: 0,
				isHover: false,
				moduleNavId: 'moduleNav' + this.posCom + this.index,
				preview: '/pc/t1/' + this.$route.params.id + "/",
				parentStyle: {

				},
				contextMenuData: {
					menuName: this.$utils.guid(),
					axios: {
						x: null,
						y: null
					},
					menulists: [{
						fnHandler: 'setAllModule',
						btnName: '设置为全局导航'
					}]
				},
				editDial: {
					editDialWidth: "700px",
					editDialHeight: "580px",
					isEdit: true,
					rTitle: '管理栏目'
				},
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		z-index: 100;
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
	
	.moduleAreaNav_con li {
		box-sizing: border-box;
	}
	
	.hove_con.hover {
		.edit_con {
			display: block;
		}
	}
</style>