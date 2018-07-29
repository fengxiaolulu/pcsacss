<template>
	
		<div class="phoneedit siteFormP hove_con" :style="parentStyle">
			
			<div class="detail">
				<div style="{clear:both;overflow:hidden;}">
					<h3 :style="itemMdata.titleStyle">{{itemMdata.formTitle.name}}</h3>
					<p v-for="(list,idx) in itemMdata.onlineFormMsg" :style="itemMdata.pStyle" v-if="list.is_open==1">
						<span :style="itemMdata.spanStyle">{{list.name}}：</span>
						<input type="text" :placeholder="list.placeholder" :style = "itemMdata.inputStyle" />
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
			console.log(this.itemMdata);
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		mounted(){
			siteForm.submitBtn(this.itemMdata,this.token,this.siteFormId)
		},
		methods: {
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},		
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
			}
		},
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					rTitle: '编辑在线表单',
				},
				token: this.$route.query.token,
				siteFormId:'siteFormId'+this.index
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		height: 100%;
		.edit_con {
			position: absolute;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.2);
			padding: 0 15px;
			top: -40px;
			width: auto;
			height: 40px;
			line-height: 40px;
			display: none;
			span {
				float: left;
				cursor: pointer;
				border-right: 1px solid #E3E3E3;
				margin: 0 8px;
			}
			span:nth-child(1){
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon{
				display: block;
				float: left;
				border-right: none;
				background: url(../../../../../static/image/bg03.png)no-repeat;
			}
			.icon i{
				position: absolute;
				display: block;
				font-size: 12px;
				width: auto;
				line-height: 25px;
				padding: 0px 10px;
				background: #FFFFFF;
			    border-radius: 5px;
			    box-shadow: 0 1px 4px 2px rgba(0, 0, 0, 0.1);
			    top: -23px;
			    margin-left: -25px;
			    display: none;
			}
			.style{
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover{
				background-position: -60px -232px;
			}
			.style:hover i{
				display: block;
			}
			.animation{
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover{
				background-position: -372px -232px;
			}
			.animation:hover i{
				display: block;
			}
			.borderhid{
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover{
				background-position: -275px -232px;
			}
			.borderhid:hover i{
				display: block;
			}
			.delete{
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover{
				background-position: -105px -232px;
			}
			.delete:hover i{
				display: block;
			}
		}
		.detail{
			p{
				overflow: hidden;
				line-height: 40px;
				span{
					text-align: right;
				}
				input{
					line-height: 40px;
					border: 1px solid #E3E3E3;
					border-radius: 5px;
					padding-left: 10px;
				}
			}
			textarea{
				border: 1px solid #E3E3E3;
				border-radius: 5px;
				margin-top: 15px;
				padding: 10px;
				box-sizing: border-box;
			}
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
	
</style>