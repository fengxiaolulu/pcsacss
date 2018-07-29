<template>
	<div class="articleScrap hove_con" :style="parentStyle">							
		<p v-html="itemMdata.singleDes.content"></p>					
	</div>	
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	//import uiDialog from '@/components/m/uiDialog.vue'
	export default {
		name: 'singlePage',
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.zIndex = this.itemMdata.parentStyle.zIndex;
			//console.l
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
		},
		data() {
			return {
				title: "单页管理",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				token: this.$route.query.token,
				newDesId: this.$route.query.newDesId,
				id: this.$route.params.id,
				param: this.$route.params.param,			
				param:{
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					version_id: this.$route.query.pc_version_id
				},
				parentStyle: {

				},
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					isEdit: false,
					rTitle: '编辑单页管理',
				}
				
			}
		},
		components: {
			VueDraggableResizable
			//uiDialog
		},
		methods: {			
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
</style>