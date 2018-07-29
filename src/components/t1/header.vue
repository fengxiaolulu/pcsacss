<template>
	<header class="header">
		<div class="inner">
			theader13
		</div>
	</header>
</template>
<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 't1HeaderNav',
		data() {
			return {
				preview: '/pc/prev/' + this.$route.params.id+"index",
				id: this.$route.params.id,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					column_id: this.$route.query.column_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					version_id: this.$route.query.pc_version_id
				},
				msg: 'header'
			}
		},
		created() {
			console.log("create header!")
		},
		methods: {
			gotoPreview: function() {
				this.setOrderId(this.id);
				this.previewData(this.id);
				window.open(this.preview);      
			},
			gotoSaveCom(){				
				this.saveData(this.id);				
				//console.log(this.id)
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
<style lang="scss" scoped>
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