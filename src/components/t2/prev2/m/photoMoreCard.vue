<template>
	<div class="graphic" :style="parentStyle">
		<div class="h_tit">
			<div class="drag_hard"></div><span class="del_icon">X</span></div>
		<div class="cont">
			<div class="tit">
				<dl class="tle_ft">
					<dd>
						<div class="con">{{cons}}</div>
					</dd>
					<dd>
						<div class="con">{{cons}}</div>
					</dd>
					<dd>
						<div class="con">{{cons}}</div>
					</dd>
					<dd>
						<div class="con">{{cons}}</div>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'articleScrap',
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata);
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		methods: {
			removeComponent(i) {
				//this.count = Number(this.count) + 1;
				//this.reversed = this.count + this.fdlag;
				this.$emit('removeComponent', i);
			}
		},
		data() {
			return {
				title: "文章列表",
				cons: "图片内容"
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.button {
		text-align: center;
	}
	
	button {
		padding: 3px 6px;
		color: #fff;
		background-color: rgb(52, 182, 253);
	}
</style>