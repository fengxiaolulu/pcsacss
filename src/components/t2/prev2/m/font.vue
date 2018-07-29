<template>
	<div class="hove_con font" :style="parentStyle">
		<div v-bind:id="editorId" class="cancel ckeditor fontHover" :style="itemMdata.iStyle">
			<a v-if="itemMdata.link" :href="linkUrl" :target="itemMdata.target">
				<p class="hoverColor" :style="[{lineHeight:itemMdata.iStyle.lineHeight},{letterSpacing:itemMdata.iStyle.letterSpacing}]" v-html="itemMdata.tCon"></p>
			</a>
			<p v-if="!itemMdata.link" class="hoverColor" :style="[{lineHeight:itemMdata.iStyle.lineHeight},{letterSpacing:itemMdata.iStyle.letterSpacing}]" v-html="itemMdata.tCon"></p>

		</div>
	</div>
</template>

<script>

	export default {
		name: 'mFont',
		props: ['itemMdata', "posCom", 'index'],
		mounted() {
			console.log(this.editorId)
			urlLink.linkUrl(this.itemMdata,this.preview,this.param,this.editorId)
			urlLink.showHand(this.editorId,this.itemMdata)
		},
		methods: {
			
		},
		computed: {
			// 计算属性的 getter
			linkUrl: function() {
				
				
			}
		},
		created() {
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
		},
		data() {
			return {
				title: '文本',
				preview: '/t2/prev/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				parentStyle: {

				},
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					column_id: this.$route.query.column_id,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id
				},
				fontId: 'fontId' + this.index,
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					isEdit: false,
					setlink: false,
					rTitle: '编辑文本',
					editDialzIndex: 1000
				},
				editorId: "editor" + this.posCom + this.index,
				editor: {}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		.edit_con {
			position: absolute;
			top: -40px;
			width: 500px;
			height: 40px;
			line-height: 40px;
			display: none;
			span {
				cursor: pointer;
			}
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>