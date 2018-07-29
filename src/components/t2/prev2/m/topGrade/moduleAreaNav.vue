<template>	
		<div :style="{left:router.parentStyle.left+'px',position: 'absolute',top:router.parentStyle.top+'px',width:router.parentStyle.width+'px'}" class="moduleAreaNav_con">
			<ul class="g-cf nav_i_show0">
				<li class="nav_lifirth" v-for="item in router.navItem">
					<div class="tit_i1">{{item.tText}}</div>
					<ul class="g-cf sec_con">
						<li v-for="second in item.secondNav">
							<div class="tit_i2">{{second.tText}}</div>
							<div class="third_con">
								<div class="third_item" v-for="third in second.thirdNav">{{third.tText}}</div>
							</div>

						</li>
					</ul>
				</li>
			</ul>
		</div>

</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'moduleAreaNav',
		components: {
		
		},
		props: [],
		created() {
			//console.log(this.router);		
			//var parentStyle = router.parentStyle;
			//debugger;
			//var navItem = this.router.navItem;
		},
		methods: {
			
		},
		computed: {
			...mapGetters(["router"])
		},
		data() {
			return {
				title: "栏目导航",
				cons: "图片内容",
				parentStyle:{
					position: 'absolute',
					//left:this.router.parentStyle.left+"px",
					//top:this.router.parentStyle.top+"px",
					//width:this.router.parentStyle.width+'px',
					//height:this.router.parentStyle.height+"px"
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
</style>