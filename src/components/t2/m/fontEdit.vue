<template>
	<div class="fontEdit">
		<p class="p">
			<span>设置行高：</span>
			<input type="text" v-model="itemMdata.iStyle.lineHeight" value="itemMdata.iStyle.lineHeight" @blur="parent()" />
		</p>
		<p class="p">
			<span>设置字间距：</span>
			<input type="text" v-model="itemMdata.iStyle.letterSpacing" value="itemMdata.iStyle.letterSpacing" />
		</p>
		<div class="margin">
			<span>模块间距：</span>
			<p>
				<span>上：</span>
				<input type="text" v-model="itemMdata.iStyle.paddingTop" />
			</p>
			<p>
				<span>下：</span>
				<input type="text" v-model="itemMdata.iStyle.paddingBottom" />
			</p>
			<p>
				<span>左：</span>
				<input type="text" v-model="itemMdata.iStyle.paddingLeft" />
			</p>
			<p>
				<span>右：</span>
				<input type="text" v-model="itemMdata.iStyle.paddingRight" />
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'fontEdit',
		components: {},
		data() {
			return {}
		},
		props: ['itemMdata'],
		created() {

		},
		methods: {
			parent() {
				this.itemMdata.parentStyle.height = parseInt(this.itemMdata.iStyle.lineHeight) + 20;
				console.log(this.itemMdata.parentStyle.height);
			}
		},

		computed: {},

	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.fontEdit {
		height: 460px;
		overflow-x: hidden;
		margin: 20px;
		.p {
			margin: 10px 0;
			input[type=text] {
				border: 1px solid #ccc;
				text-align: center;
			}
		}
		.margin {
			margin-top: 20px;
			clear: both;
			overflow: hidden;
			span {
				width: 70px;
				text-align: right;
				float: left;
				line-height: 30px;
			}
			p {
				float: left;
				width: 20%;
				line-height: 30px;
				span {
					width: auto;
					float: left;
				}
				input {
					float: left;
					width: 60px;
					margin-right: 6px;
					text-align: center;
					border: 1px solid #E3E3E3;
					line-height: 30px;
				}
			}
		}
	}
</style>