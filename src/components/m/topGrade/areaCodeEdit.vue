<template>
	<div class="areaCodeEdit">
		<div class="html">
			<div class="g-cf con">
				<span class="tit">html:</span>

				<textarea @blur="blurDataFun" v-model="itemMdata.dataHtml"></textarea>
			</div>
			<div class="g-cf con">
				<span class="tit">CSS:</span>

				<textarea @blur="blurDataFun" v-model="itemMdata.dataCss"></textarea>
			</div>
			<div class="g-cf con">
				<span class="tit">javascript:</span>
				<textarea @blur="blurDataFun" v-model="itemMdata.dataScript"></textarea>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'areaCodeEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '编辑接入代码',
				data: "",
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
			blurDataFun() {
				//this.dataHtml
				var th = this;
				Vue.nextTick(function() {
					var script = document.createElement("script");
					var style = document.createElement("style");
					
					script.type = "text/javascript";
					if(th.itemMdata.dataScript) {
						script.appendChild(document.createTextNode(th.itemMdata.dataScript));
					}
					document.body.appendChild(script);
					
					if(th.itemMdata.dataCss) {
						style.appendChild(document.createTextNode(th.itemMdata.dataCss));
					}
					document.body.appendChild(style);
					//sayHi();
					//alert('new message');
				})
				//console.log("ddsdsf")
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

		}
	}
</script>

<style lang="scss" scoped>
	.html {
		.tit {
			float: left;
			width: 80px;
			text-align: right;
			margin-right: 10px;
			height: 125px;
		}
		.con {
			margin-top: 20px;
			textarea {
				width: 500px;
				height: 125px;
				border: 1px solid #ccc;
			}
		}
	}
</style>