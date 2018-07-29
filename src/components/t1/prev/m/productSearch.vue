<template>
	
		<div class="productSearch hove_con" :style="parentStyle" :id="productSearchId">
			
			<div class="detail" :style="itemMdata.divStyle">
				<input type="text"  class="searchCon"/>
				<button type="submit" :style="itemMdata.buttonStyle" class="searchBtn">
					<i v-if="itemMdata.setProductSearch ==1||itemMdata.setProductSearch ==2" :style="{color:itemMdata.buttonStyle.color}">搜索</i>
					<span class="el-icon-search" v-if="itemMdata.setProductSearch ==3||itemMdata.setProductSearch ==4||itemMdata.setProductSearch ==5||itemMdata.setProductSearch ==6"></span>
				</button>
			</div>
			<p class="keyword">
				<span v-for="item in itemMdata.productSearchText">{{item.text}}</span>
			</p>
		</div>
	
</template>

<script>
	export default {
		name: 'productSearch',
		props: ['itemMdata','index'],
		created() {
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
			
		},
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				productSearchId:'productSearchId'+this.index,
				paramUrl: '',
				preview: '/t1/prev/' + this.$route.params.id + "/",
				param: {
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					pc_version_id: this.$route.query.pc_version_id,
					mobile_version_id:this.$route.query.mobile_version_id,
					version_id: this.$route.query.pc_version_id
				},
			}
		},
		mounted(){
			siteForm.goProduct(this.productSearchId,this.itemMdata.param,this.itemMdata.preview,this.itemMdata.paramUrl);
		},
		methods: {
			
		},
		
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
</style>