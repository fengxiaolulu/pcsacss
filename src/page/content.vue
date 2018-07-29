<template>
  <div>index page1111111111</div>
</template>
<script>
	//import Header from '../components/header.vue'
	//import Footer from '../components/footer.vue'
	export default {
		components: {
		//	Header,
		//	Footer
		},
		data() {
			return {
				id:'32422443esffs'||this.$utils.guid(),
				list: []
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				var v = this
				v.$api.get('headlines-pc-api/getAdvMap?cityId=27833&code=WEB-SCL-01,WEB-SCL-02', null, function(r) {
					v.list = r.data
				})
			}
		}
	}
</script>
<style lang="scss">
	@import "../style/scss/index";
</style>