<template>
	<div class="newsCondiEdit">
		编辑新闻容器
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	export default {
		name: 'newsCondiEdit',
		props: ['itemMdata'],
		components: {
			mImageEdit
		},
		data() {
			return {
				title: '编辑新闻容器',
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