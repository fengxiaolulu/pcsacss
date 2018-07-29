<template>
	<div>
		<!--myHeader></myHeader-->
		<div class="conect_outer">
			<div :is = "tm" :tm ="tm" :state ="state" class="g-cf inner">
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
			if(temp.indexOf("count")!=-1){
				this.tm="count"
			}else{
				this.tm=temp
			}
		
		},
		computed: {			
			...mapGetters(["state"])
		},
		data() {
			return {
				title: '',
				tm:"",
				pm : this.$route.params.param
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>