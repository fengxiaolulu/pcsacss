<template>
	<div class="areaFlvEdit">
		<div class="one">
			<div class="name">
				编辑当前时间
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'productNavEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '编辑接入代码',
				dialogImageUrl: '',
				dialogVisible: false,
				type_hid:true,
				type_hid2:false
			}
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
			onResize: function(x, y, width, height) {
				this.parentStyle.left = x;
				this.parentStyle.top = y;
				this.parentStyle.width = width;
				this.parentStyle.height = height;
				this.itemMdata.parentStyle = this.parentStyle;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
		
</style>