<template>
	<div class="productNav hove_con" :style="parentStyle">
		<div class="productNav">
			<div class="productTitle">
				<span>{{itemMdata.navName}}</span>
			</div>
			<ul class="mTypeOne" v-if="itemMdata.productNavLayout == 0 && itemMdata.margin_hid == false">
				<li class="mTypeli" v-for="item in itemMdata.routerProductNav.navItem">
					<span>{{item.tText}}</span>
					<ul class="sec_con">
						<li v-for="second in item.secondNav">
							<span>{{second.tText}}</span>
							<ul class="third_item " v-for="third in second.thirdNav">
								<li>
									<span>{{third.tText}}</span>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
			<el-row class="mTypeOne" v-if="itemMdata.productNavLayout == 1 && itemMdata.margin_hid == false">
				<el-col>
					<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
						<el-submenu :index="getId(idx)" v-for="(item,idx) in itemMdata.routerProductNav.navItem" @click="getIdx(idx)" :key="idx">
							<template slot="title">
								<span>{{item.tText}}</span>
							</template>
							<el-submenu :index="getIdtwo(idx,idxsec)" v-for="(second,idxsec) in item.secondNav" :key="idxsec">
								<template slot="title">
									<span>{{second.tText}}</span>
								</template>
								<el-menu-item :index="getIdthird(idx,idxsec,idxthird)" v-for="(third,idxthird) in second.thirdNav" :key="idxthird">
									<template slot="title">
										<span>{{third.tText}}</span>
									</template>
								</el-menu-item>
							</el-submenu>
						</el-submenu>

					</el-menu>
				</el-col>
			</el-row>
			<ul class="mTypeOne" v-if="itemMdata.productNavLayout == 0 && itemMdata.margin_hid == true">
				<li class="mTypeli" v-for="(item,idx) in itemMdata.routerProductNav.productNavSelected" :keys="idx">
					<span>{{item.productName}}</span>
					<ul class="sec_con">
						<li v-for="second in item.secondNavList">
							<span>{{second.productName}}</span>
							<!--<ul class="third_item " v-for="third in second.thirdNavList">
								<li>
									<span>{{third.productName}}</span>
								</li>
							</ul>-->
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	
</template>

<script>
	
	export default {
		name: 'productNav',
		props: ['itemMdata'],
		created() {
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.zIndex=this.itemMdata.parentStyle.zIndex;
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
		},
		data() {
			return {
				title: "产品导航",
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
		methods: {
			getId(idx){
				return JSON.stringify(idx);
			},
			getIdtwo(idx,idxsec){
				return idx+ '-' +idxsec;
			},
			getIdthird(idx,idxsec,idxthird){
				return idx+ '-' +idxsec + '-' +idxthird;
			},
			getIdx(idx){

			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		width: 100%;
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
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>