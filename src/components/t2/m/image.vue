<template>
	<div class="img" v-bind:style="tImg.parentStyle">
		<div class="h_tit"><div class="drag_hard"></div><span class="del_icon">X</span></div>
		<div v-bind:style="tImg.style"><img :src="tImg.url" /> </div>
	</div>
</template>

<script>
	export default {
		name: 'tImg',
		data() {
			return {
				text: '默认图片',
			}
		},
		props: ['tImg'],
		created() {
			console.log(this.tImg)
		},
		methods: {

		}

	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img img{
	width: 100%;
	height: 100%;
}
</style>