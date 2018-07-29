<template>

		<div class="hove_con" :style="parentStyle">
			
			<div class="s_con">
				<div v-html="itemMdata.dataHtml"></div>
				<!--<div v-html="itemMdata.dataCss"></div>-->
				<!--div v-html="itemMdata.dataScript"></div-->
			</div>
		</div>

</template>

<script>
	export default {
		name: 'areaCode',
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata);
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		data() {
			return {
				title: "接入代码",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					rTitle: '编辑在线视频',
				}
			}
		},
		mounted: function() {
			var th = this;
			this.$nextTick(function() {
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
			})
			
		},
		methods: {
			
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		width: 100%;
		height: 100%;
		
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>