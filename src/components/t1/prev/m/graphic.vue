<template>
	<div class="graphic hove_con" :style="parentStyle">
		<div class="detail" :id="graphicId">
			<div class="text txtCenter" :style="itemMdata.divStyleL">
				<img :src="itemMdata.mImage0.url" :style="itemMdata.imgStyle" />
			</div>
			
			<div class="text" :style="itemMdata.divStyleR">
				<div>
					<div v-html="itemMdata.defaultMsg"></div>
					<a class="more" :href="itemMdata.moreUrl" :target="itemMdata.moreTarget" v-show="itemMdata.moreShow">更多>></a>
				</div>
			</div>
		
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'graphic',
		props: ['itemMdata'],
		data() {
			return {
				graphicId:"graphicId" + this.index,
				parentStyle: {

				},
				preview: '/t1/prev/' + this.$route.params.id + "/",
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id
				},
			}
		},
		created() {
			console.log(this.itemMdata);
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		methods: {
			linkUrl() {
				if(this.itemMdata.link) {
					if(this.itemMdata.link.indexOf("http") != -1) {
						location.href = this.itemMdata.link;
					} else {
						this.$router.push(this.preview + this.itemMdata.link);
						//location.href = this.preview + this.itemMdata.link;
					}
				}
				console.log(this.preview + this.itemMdata.link);
			},
			
		},
		mounted(){
			urlLink.linkUrl(this.itemMdata,this.preview,this.param,this.graphicId)
			urlLink.showHand(this.graphicId,this.itemMdata)
		}
		
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>