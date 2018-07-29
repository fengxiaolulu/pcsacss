<template>
	<div class="moduleAreaNav hove_con" :style="[itemMdata.layoutStyle,parentStyle]">
		<div class="moduleAreaNav_con" :style="{width:itemMdata.parentStyle.width,height:itemMdata.parentStyle.height,zIndex:itemMdata.parentStyle.zIndex}">
			<ul :id="moduleNavId" class="g-cf nav_i_show0" :style="[itemMdata.layoutOuterStyle,{fontSize:itemMdata.layoutOuterStyle.fontSize}]">
				<li v-if="item.is_show" class="nav_lifirth" v-for="item in router.navItem" :style="[itemMdata.layoutOuterStyleLi,item.cur==true?itemMdata.hoverColor:itemMdata.layoutOuterStyleLi,{width:itemMdata.layoutOuterStyleLi.width}]" @mouseenter="hoverColor($event)" @mouseleave="moveColor($event,item)" @click="setLabelItem(item)">
					<div class="tit_i1" @click="goDesign(item)">{{item.column_name}}</div>
					<ul class="g-cf sec_con" :style="{fontSize:itemMdata.hoverSec.fontSize,width:itemMdata.hoverSecBg.width,backgroundColor:itemMdata.hoverSecBg.backgroundColor}">
						<li v-if="second.is_show" v-for="second in item.secondNav" :style="[itemMdata.hoverSecBg,{lineHeight:itemMdata.hoverSecBg.height}]">
							<div class="tit_i2" @click="goDesign(second)" :style="{width:itemMdata.hoverSecBg.width}" @mouseenter="hoverSec($event)" @mouseleave="moveSec($event)">{{second.column_name}}</div>
							<div class="third_con" :style="[itemMdata.hoverThrBg,{fontSize:itemMdata.hoverThr.fontSize},{left:itemMdata.hoverSecBg.width}]">
								<div v-if="third.is_show" :style="[itemMdata.hoverThrBg,{lineHeight:itemMdata.hoverThrBg.height+'px'},]" class="third_item" v-for="third in second.thirdNav" @click="goDesign(third)" @mouseenter="hoverThr($event)" @mouseleave="moveThr($event)">{{third.column_name}}</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import api from '@/api/$ajax.js'
	export default {
		name: 'moduleAreaNav',
		components: {

		},
		props: ['itemMdata', 'posCom', 'index'],
		created() {
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
			console.log(this.parentStyle.width);
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
			moveColor(e, item) {
				/*if(item.cur == false) {
					e.target.style.background = '';
					e.target.style.color = this.itemMdata.layoutOuterStyle.color;
					e.target.style.border = "none";
				}*/
			},
			hoverSec(e) {
				//e.target.style.background = this.itemMdata.hoverSec.backgroundColor;
				//e.target.style.color = this.itemMdata.hoverSec.color;
			},
			moveSec(e) {
				//e.target.style.background = '';
				//e.target.style.color = this.itemMdata.hoverSecBg.color;
			},
			hoverThr(e) {
				//e.target.style.background = this.itemMdata.hoverThr.backgroundColor;
				//e.target.style.color = this.itemMdata.hoverThr.color;
			},
			goDesign(item) {
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
			getData() {
				api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id, true, {}, r => {
					if(r.code == 422) {
						console.log(r.message);
						return;
					}
					//var state = JSON.parse(r.data.content);
					//console.log(r.data.list);
					var list = r.data.list;
					//this.router.navItem
					var firstList = [];
					for(let i = 0; list.length > i; i++) {
						//console.log(list[i].parent_id=1);
						if(list[i].parent_id == 0) {
							list[i].secondNav = [];
							firstList.push(list[i])
						}
					}
					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; list.length > k; k++) {
							if(firstList[i].id == list[k].parent_id) {
								list[k].thirdNav = [];
								firstList[i].secondNav.push(list[k])
							}
						}
					}

					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; firstList[i].secondNav.length > k; k++) {
							for(let j = 0; list.length > j; j++) {
								if(firstList[i].secondNav[k].id == list[j].parent_id) {
									//list[k].thirdNav = [];
									firstList[i].secondNav[k].thirdNav.push(list[j])
								}
							}
						}
					}
					this.router.navItem = firstList;
					console.log(this.router.navItem);
				});
			},

			moveThr(e) {
				e.target.style.background = '';
				e.target.style.color = this.itemMdata.hoverThrBg.color;
			}
		},
		computed: {
			...mapGetters(["router", 'itemCon'])
		},
		data() {
			return {
				title: "栏目导航",
				cons: "图片内容",
				preview: '/t1/prev/' + this.$route.params.id + "/",
				moduleNavId: 'moduleNav' + this.posCom + this.index,
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
				parentStyle: {
					position: 'absolute'
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>