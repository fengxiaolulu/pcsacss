<template>
	<div class="m_button_con hove_con" :style="parentStyle">
		<button :id="buttonId" :style="[{borderRadius:itemMdata.borderRadius+'px'},{width:itemMdata.buttonStyle.width+'px'},{height:itemMdata.buttonStyle.height+'px'},itemMdata.hoverS==1?itemMdata.hoverStyle:itemMdata.buttonStyle]">
			<span :style="[itemMdata.spanStyle,{borderRadius:itemMdata.borderRadius+'px'}]"><i :style="[itemMdata.hoverS==1?itemMdata.hoverStyle:itemMdata.iStyle]">{{itemMdata.tText}}</i></span>
		</button>
	</div>
</template>

<script>
	export default {
		name: 'mButton',
		props: ['itemMdata',"posCom", 'index'],
		created() {
			//console.log(this.itemMdata);
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.zIndex=this.itemMdata.parentStyle.zIndex;
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
		},
		mounted(){
			hoverAction.buttonHover(this.buttonId,this.itemMdata)
			urlLink.linkUrl(this.itemMdata,this.preview,this.param,this.buttonId)
			urlLink.showHand(this.buttonId,this.itemMdata)
		},
		methods: {
		},
		data() {
			return {
				parentStyle: {},
				buttonId:'buttonId'+ this.posCom + this.index,
				preview: '/t1/prev/' + this.$route.params.id + "/",
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	button {}
</style>