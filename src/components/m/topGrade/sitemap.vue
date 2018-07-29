<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :parent="itemMdata.parent" :active.sync="itemMdata.parentStyle.active" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.cancel'">
		<div :class="['sitemap hove_con',{hover:isHover}]" @mouseenter="hoverSitemap($event)" @mouseleave="leaveSitemap($event)" :style="itemMdata.layoutStyle">
			<p class="edit_con" style="z-index:100;">
				<!--span @click="isFuncur(itemMdata)">管理网站地图</span-->
				<span class="icon style" @click="isFuncur(itemMdata)"><i>设置样式</i></span>
				<!--span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="sitemap_con">
				<ul :class="['g-cf',{sitemap_show0:itemMdata.styleMode==0,sitemap_show1:itemMdata.styleMode==1,sitemap_show2:itemMdata.styleMode==2}] ">
					<li class="sitemap_lifirth" v-for="item in router.navItem">
						<div class="sitemap_i1"><i class="fir_icon"></i><a :href="linkUrl(item)" :target="item.target">{{item.column_name}}</a></div>
						<ul v-if="item.secondNav.length" class="g-cf sitemap_sec_con">
							<li v-for="second in item.secondNav">
								<div class="tit_i2"><i class="sec_icon"></i><a :href="linkUrl(second)" :target="second.target">{{second.column_name}}</a></div>
								<div v-if="second.thirdNav.length" class="sitemap_third_con">
									<div class="sitemap_third_item" v-for="third in second.thirdNav"><a :href="linkUrl(third)" :target="third.target">{{third.column_name}}</a></div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>		
		</div>
	</vue-draggable-resizable>
</template>
<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	//import moduleAreaNavStyle from './moduleAreaNavStyle.vue'
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	export default {
		name: 'sitemap',
		components: {
			//uiDialog,
			//moduleAreaNavStyle,
			VueDraggableResizable
		},
		props: ['itemMdata', 'posCom',"itemInner", 'index'],
		created () {
			this.getData();
		},
		mounted () {
			//hoverAction.moduleNavHover(this.moduleNavId, this.itemMdata);
		},
		methods: {
			setLabelItem(item) {
				for(let k = 0; this.router.navItem.length > k; k++) {
					this.router.navItem[k].cur = false;
				}
				item.cur = true;
			},
			linkUrl(item) {
				var ts = this;
				var link = item.id;
				if(link) {
					if(Number(link)) {
						return this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
					} else if(link.indexOf("http") != -1) {
						return link;
					} else {
						return this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
					}
				}
				//if(Number(item.link)) {
				//return this.$route.query.domain_url + "/col/" + item.id
			},								
			hoverSitemap(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;		
			},
			leaveSitemap(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;		
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
					var list = r.data.list;
					//this.router.navItem
					var firstList = [];
					for(let i = 0; list.length > i; i++) {
						//console.log(list[i].parent_id=1);
						list[i].secondNav = [];
						if(list[i].parent_id == 0) {
							list[i].target ="_blank";
							firstList.push(list[i])
						}
					}
					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; list.length > k; k++) {
							list[k].thirdNav = [];
							if(firstList[i].id == list[k].parent_id) {
								list[k].target ="_blank";
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
									list[j].target = "_blank";
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
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.layoutOuterStyleLi.height = this.itemMdata.parentStyle.height + 'px';
				//this.itemMdata.layoutOuterStyleLi.lineHeight = this.itemMdata.parentStyle.height + 'px';
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
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
				moduleNavId: 'moduleNav' + this.posCom + this.index,
				preview: '/pc/t1/' + this.$route.params.id + "/",
				parentStyle: {

				},
				isHover:false,
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
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
	
	
</style>