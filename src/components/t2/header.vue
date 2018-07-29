<template>
	<header class="header">
		<div class="inner">
			theader2
		</div>
	</header>
</template>
<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'headerNav',
		data() {
			return {
				preview: '/app/preview/' + this.$route.params.id,
				id: this.$route.params.id,
				msg: 'header'
			}
		},
		created() {
			console.log(this.id)
		},
		methods: {
			gotoPreview: function() {
				this.setOrderId(this.id);
				this.previewData(this.id);
				window.open(this.preview);      
				//location.href = this.preview;
			},
			gotoSaveCom(){
				
				this.saveData(this.id);
				
				console.log(this.id)
			},
			...mapActions([
				'saveData'
			]),
			...mapMutations([
				'setOrderId','previewData'
			]),
		},

		computed: {
			...mapGetters(["state"])
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header {
		height: 80px;
		background-color: #fff;
		border: 1px solid #ccc;
	}
	
	.h_center {
		.preview {
			width: 80px;
			height: 26px;
			display: inline-block;
			line-height: 26px;
			margin: 0 0 0 20px;
			text-align: center;
			background: #fff;
			color: #EFBF1F;
			border: 1px solid #EFBF1F;
			border-radius: 5px;
			cursor: pointer;
		}
	}
	
	ul li {
		float: left;
		width: 120px;
		font-weight: normal;
	}
</style>