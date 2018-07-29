<template>
	<div class="productCondiEdit">
		编辑产品容器
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	export default {
		name: 'productCondiEdit',
		props: ['itemMdata'],
		components: {
			mImageEdit
		},
		data() {
			return {
				title: '编辑产品容器',
				carousel_hid: true
			}
		},
		created() {

		},
		methods: {

		},
		computed: {

		}
	}
</script>

<style lang="scss" scoped>

</style>