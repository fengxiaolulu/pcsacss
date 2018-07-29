<template>
	
		<div class="siteQrCode hove_con" @click="linkUrl" :style="parentStyle">
			
			<div class="detail" :style="{width:itemMdata.imgWidth}">
				<img :src="itemMdata.imgUrl.url" :style="{background:itemMdata.imgColor,width:itemMdata.imgWidth}" />
				<p>{{itemMdata.imgName}}</p>
			</div>
		</div>
	
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	export default {
		name: 'siteQrCode',
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata)
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
			}
		},
		data() {
			return {
				
				parentStyle: {

				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
	
</style>