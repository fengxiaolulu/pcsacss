<template>
	
		<div class="areaLocation hove_con" :style="parentStyle">
			<div class="detail" :style="[itemMdata.Divstyle,{backgroundImage:'url('+itemMdata.mImage0.url+')'}]">
				<p>
					<img :src="itemMdata.mImage1.url"  @mousedown="defaultStop($event)"  class="arrowImg"/>
					<span :style="itemMdata.spanStyle">{{itemMdata.textTitle}}</span>

					<span v-for="(item,index) in itemMdata.crumbs">
						<i :style="itemMdata.Astyle" @click="goDesign(item)">{{item.column_name}}</i>
						<img :src="itemMdata.mImage2.url"  @mousedown="defaultStop($event)" class="arrowImg"/>
					</span>
				</p>
			</div>
		</div>

</template>

<script>
	
	export default {
		name: 'areaLocation',
		props: ['itemMdata'],
		created() {
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		data() {
			return {
				
				parentStyle: {

				},
				backgroundDiv: {
					backgroundImage: 'url(' + this.itemMdata.mImage0.url + ')',
				},
				icon: {
					backgroundImage: 'url(' + this.itemMdata.mImage1.url + ')',
				},
				preview: '/t1/prev/' + this.$route.params.id + "/",
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id
				},
			}
		},
		methods: {
			goDesign(item) {
				//this.saveloca(this.param);
				if(!item.is_enable) {
					return;
				}
				var link = item.id;
				if(link) {
					if(Number(link)) {
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
					} else if(link.indexOf("http") != -1) {
						location.href = link;
					} else {
						location.href = this.preview + link + '?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type + '&pc_version_id=' + this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id;
					}
				}
			},
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
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
			background-repeat: no-repeat;
			background-position: center;
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>