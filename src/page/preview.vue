<template>
	<div class="f_prewview">
		<!--myHeader></myHeader-->
		<div class="conect_outer">
			<!--div :is="tm" :tm="tm" :state="state" class="g-cf inner">
				<p>layout2</p>
			</div-->
			<router-view></router-view>
		</div>
		<!--myFooter></myFooter-->
	</div>
</template>

<script>
	import myHeader from '../components/header.vue'
	import myFooter from '../components/footer.vue'
	import index from '../components/t1/prev/index.vue'
	import index2 from '../components/t2/prev2/index.vue'
	//import about from '../components/t1/prev/about.vue'
	//import count from '../components/t1/prev/count.vue'

	export default {
		name: 'prewview',
		components: {
			myHeader,
			index,
			index2,
			//	about,
			//	count,
			myFooter
		},
		created() {
			/*var temp = this.$route.params.param;
			this.setDelayed(temp);
			if(temp.indexOf("count")!=-1){
				this.tm="count"
			}else{
				this.tm=temp
			}*/
		},
		data() {
			return {
				itemCon: [],
				router: "",
				tm: this.$route.params.tm,
				id: this.$route.params.id,
				param: this.$route.params.param,
			}
		},
		methods: {

		}

	}
</script>

<style lang="scss" scoped="">

</style>