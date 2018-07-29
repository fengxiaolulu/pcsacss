<template>
	
		<div class="areaMap hove_con" :style="parentStyle">
			
			<div id="map2" class="map"></div>
		</div>

</template>

<script>
	import { MP } from '../../../../utils/map'
	export default {
		name: 'areaMap',
		props: ['itemMdata'],
		mounted() {
			this.$nextTick(function() {
				MP("eYWcrSI09OYj9GOeeMRpujYDpYX8Zees").then(BMap => {
					var map = new BMap.Map("map2");
					var point = new BMap.Point(113.389516, 23.129673);
					map.centerAndZoom(point, 18);
					map.enableScrollWheelZoom();
					map.enableContinuousZoom();
					// 创建地址解析器实例
					var myGeo = new BMap.Geocoder();
					var address = this.itemMdata.addressDetails;
					var city = this.itemMdata.addressCity;
					// 将地址解析结果显示在地图上,并调整地图视野
					myGeo.getPoint(address, function(point) {
						if(point) {
							map.centerAndZoom(point, 18);
							map.addOverlay(new BMap.Marker(point));
						} else {
							alert("您选择地址没有解析到结果!");
						}
					}, city);

					var local = new BMap.LocalSearch(map, {
						renderOptions: {
							map: map
						}
					});
					local.search(address);
				})
			})
			/*this.$nextTick(() => {
				// 百度地图API功能
				var map = new BMap.Map("map2");
				var point = new BMap.Point(113.389516, 23.129673);
				map.centerAndZoom(point, 18);
				map.enableScrollWheelZoom();
				map.enableContinuousZoom();
				// 创建地址解析器实例
				var myGeo = new BMap.Geocoder();
				var address = this.itemMdata.addressDetails;
				var city = this.itemMdata.addressCity;
				// 将地址解析结果显示在地图上,并调整地图视野
				myGeo.getPoint(address, function(point) {
					if(point) {
						map.centerAndZoom(point, 18);
						map.addOverlay(new BMap.Marker(point));
					} else {
						alert("您选择地址没有解析到结果!");
					}
				}, city);

				var local = new BMap.LocalSearch(map, {
					renderOptions: {
						map: map
					}
				});
				local.search(address);
			})*/
		},
		data() {
			return {
				title: "在线地图",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "600px",
					rTitle: '编辑在线地图',
				}
			}
		},
		created() {
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		methods: {
			
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
		.map {
			width: 100%;
			height: 100%;
			overflow: hidden;
			margin-top: 15px;
			border: 1px solid #E3E3E3;
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>