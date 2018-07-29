<template>
	
		<div class="siteForm hove_con" :style="parentStyle" :id="siteFormId">
			<div class="detail">
				<div style="{clear:both;overflow:hidden;}">
					<h3 class="siteFormH">{{itemMdata.formTitle.name}}</h3>
					<p v-for="(list,idx) in itemMdata.onlineFormMsg" :style="itemMdata.pStyle">
						<span :style="itemMdata.spanStyle">{{list.name}}：</span>
						<input type="text" :placeholder="list.placeholder" :style="itemMdata.inputStyle" />
					</p>
				</div>
				
				<p class="btn">
					<button :style="[itemMdata.buttonEdit.buttonStyle,{borderRadius:itemMdata.buttonEdit.borderRadius + 'px'},itemMdata.buttonEdit.iStyle]">{{itemMdata.formTitle.btnName}}</button>
				</p>
			</div>
		</div>
	
</template>

<script>
	import api from '@/api/$ajax.js'
	export default {
		name: 'siteForm',
		props: ['itemMdata','index'],
		created() {
			console.log(this.itemMdata)
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		methods: {
			
			/*
			submitBtn(){
				var v = this;
				//v.itemMdata.onlineFormMsg	
				var str = '';
				for(var i=0;i<this.itemMdata.onlineFormMsg.length;i++){
					var j = i+1
					str = str+'id'+j+'='+this.itemMdata.onlineFormMsg[i].placeholder+'&'
				}	
				str = str.slice(0,str.length-1);
				console.log(str)		
				
			},*/
		},
		data() {
			return {
				
				parentStyle: {

				},
				token: this.$route.query.token,
				siteFormId:'siteFormId'+this.index,
			}
		},
		mounted(){
			siteForm.submitBtn(this.itemMdata,this.token,this.siteFormId)
			siteForm.vailImg(this.msgSubmitId,root,this.param.token);
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
</style>