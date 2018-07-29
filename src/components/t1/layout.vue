<template>
	<div>
		<!--myHeader></myHeader-->
		<div class="conect_outer">
			<div :is="tm" :tm="tm" :state="state" class="g-cf inner">
				<p>layout2</p>
			</div>
		</div>
		<!--myFooter></myFooter-->
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import index from './index.vue'
	import about from './about.vue'
	import count from './count.vue'
	export default {
		name: 'layout',
		components: {
			//myHeader,
			//myFooter,
			index,
			count,
			about
		},
		created() {
			var temp = this.$route.params.param;
			this.setDelayed(temp);
			var flag1 = true,
				flag2 = true,
				flag3 = true;
			if(temp.indexOf("count") != -1) {
				this.tm = "count"
			} else {
				var router = this.state.router.navItem;
				for(let j = 0; router.length > j; j++) {
					if(router[j].link == temp) {
						this.tm = temp;
						flag1 = false;
					}

				}
				if(flag1) {
					for(let j = 0; router.length > j; j++) {
						let secondNav = router[j].secondNav || [];
						for(let k = 0; secondNav.length > k; k++) {
							if(secondNav[k].link == temp) {
								this.tm = temp;
								flag2 = false;
							}
						}
					}
					if(flag2) {
						for(let j = 0; router.length > j; j++) {
							let secondNav = router[j].secondNav || [];
							for(let k = 0; secondNav.length > k; k++) {

								let thirdNav = secondNav[k].thirdNav || [];
								for(let i = 0; thirdNav.length > i; i++) {

									if(thirdNav[i].link == temp) {
										this.tm = temp;
										flag3 = false;
									}
								}
							}
						}
						if(flag3) {
							//debugger;
							this.$router.push("/404");
						}
					}
				}
				//this.tm = temp;
			}
			//this.getData();
		},
		methods: {
			...mapMutations([
				'setDelayed'
			]),
			...mapActions([
				'getData'
			])
		},
		computed: {
			...mapGetters(["state"])
		},
		data() {
			return {
				title: '',
				tm: "",
				pm: this.$route.params.param
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>