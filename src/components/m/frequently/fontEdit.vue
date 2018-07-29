<template>
	<div class="fontEdit">
	
		<p>
			<span>设置行高：</span>
			<input type="text" v-model="itemMdata.iStyle.lineHeight" placeholder="22" @blur="parent()"/>
		</p> 
		<p>
			<span>设置字间距：</span>
			<input type="text" v-model="itemMdata.iStyle.letterSpacing" placeholder="1"/>
		</p> 
		<div class="fontHover">
			<p>是否设置悬浮效果：</p>
			<p @click="itemMdata.iStyle.isHover=true">
				<input type="radio" name="type" id="type1" :checked="itemMdata.iStyle.isHover==true" />
				<label for="type1">是</label>
			</p>
			<p @click="itemMdata.iStyle.isHover=false">
				<input type="radio" name="type" id="type2"  :checked="itemMdata.iStyle.isHover==false" />
				<label for="type2">否</label>
			</p>
		</div>
		<p v-show="itemMdata.iStyle.isHover==true">
			<span>颜色：</span>
			<el-color-picker v-model="itemMdata.iStyle.hoverColor" size="medium"></el-color-picker>
		</p>
	</div>
</template>

<script>
	export default {
		name: 'fontEdit',
		components: {
		},
		data() {
			return {
			}
		},
		props: ['itemMdata'],
		created() {
			
		},
		methods: {
			parent(){
				this.itemMdata.parentStyle.height = parseInt(this.itemMdata.iStyle.lineHeight) +20;
				console.log(this.itemMdata.parentStyle.height);
			} 
		},
		
		computed: {
		},
		
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.fontEdit{
		height:460px;
		overflow-x:hidden;
		margin:20px;
		p{
			margin:10px 0;
			input[type=text]{
				border:1px solid #ccc;
				text-align:center;
			}
		}
		.fontHover{
			p{
				display:inline-block;
			}
		}
	}
</style>