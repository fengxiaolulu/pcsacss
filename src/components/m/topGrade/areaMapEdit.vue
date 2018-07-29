<template>
	<div class="areaMapEdit">
		<!--<div class="top">
			<p @click="oneshow" :class="{active:one_show}">常规</p>
			<p @click="twoshow" :class="{active:two_show}">高级</p>
		</div>-->
		<div class="one">
			<div class="name">
				<span>模块标题：</span>
				<input type="text" value="在线地图" />
			</div>
			<div class="size">
				<span>地图宽高：</span><!--{{itemMdata.parentStyle}}-->
				<input type="text" v-model="itemMdata.parentStyle.width" />
				<span>x</span>
				<input type="text" v-model="itemMdata.parentStyle.height" />
			</div>
			<div class="position">
				<span>所在位置：</span>
				<input type="text" value="itemMdata.addressCity" v-model="itemMdata.addressCity" />-
				<input type="text" value="itemMdata.addressDetails" v-model="itemMdata.addressDetails" />
				<button @click="search">搜索</button>
			</div>
			<div class="text">
				<span>标记信息：</span>
				<textarea></textarea>
			</div>
			<div id="map" class="map"></div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'	
	import { MP } from '../../../utils/map'
	export default {
		name: 'areaMapEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false
			}
		},
		created() {
			console.log(this.itemMdata);
		},
		methods: {
			search: function() {
				// 百度地图API功能
				var map = new BMap.Map("map");
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
			}
		},
		mounted() {
			this.$nextTick(function() {
				MP("eYWcrSI09OYj9GOeeMRpujYDpYX8Zees").then(BMap => {

					var map = new BMap.Map("map");
					var point = new BMap.Point(113.389516, 23.129673);
					map.centerAndZoom(point, 18);
					map.enableScrollWheelZoom();
					map.enableContinuousZoom();
				})
			})

			//			// 创建Map实例
			//			var map = new BMap.Map("map", {
			//				enableMapClick: true
			//			});
			//			// 初始化地图,设置中心点坐标和地图级别
			//			var point = new BMap.Point(113.388552, 23.131026);
			//			map.centerAndZoom(point, 17);
			//			// 添加地图类型控件
			//			map.addControl(new BMap.MapTypeControl());
			//			// 开启鼠标滚轮缩放      
			//			map.enableScrollWheelZoom(true);
			//			var pointIcon = new BMap.Point(113.388552, 23.131026);
			//			// 添加工具条、比例尺控件
			//			map.addControl(new BMap.ScaleControl({
			//				anchor: BMAP_ANCHOR_TOP_LEFT
			//			}));
			//			map.addControl(new BMap.NavigationControl());
			//			map.addControl(new BMap.NavigationControl({
			//				anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
			//				type: BMAP_NAVIGATION_CONTROL_SMALL
			//			}));
			//			// 添加自定义控件类，放大ZoomControl
			//			function ZoomControl() {
			//				//默认停靠位置和偏移量
			//				this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
			//				this.defaultOffset = new BMap.Size(50, 23);
			//			}
			//			// 创建地址解析器实例
			//			var myGeo = new BMap.Geocoder();
			//			var address = this.itemMdata.addressDetails;
			//			// 将地址解析结果显示在地图上,并调整地图视野
			//			myGeo.getPoint(address, function(point) {
			//				if(point) {
			//					map.centerAndZoom(point, 17);
			//					map.addOverlay(new BMap.Marker(point));
			//				} else {
			//					alert("您选择地址没有解析到结果!");
			//				}
			//			}, "广州市");
			//			//通过JavaScript的prototype属性继承于BMap.Control
			//			ZoomControl.prototype = new BMap.Control();
			//			//自定义控件必须实现自己的initialize方法，并且将控件的DOM元素返回
			//			//在本方法中创建div容器，并将其添加到地图容器中
			//			ZoomControl.prototype.initialize = function(map) {
			//				//创建一个DOM元素
			//				var div = document.createElement('div');
			//				//绑定事件，点击触发
			//				div.onclick = function(e) {
			//					map.setZoom(map.getZoom() + 1);
			//				}
			//				//添加DOM元素到地图上
			//				map.getContainer().appendChild(div);
			//				//将DOM元素返回
			//				return div;
			//			}
			//			//创建控件
			//			var myZoomCtrl = new ZoomControl();
			//			map.addControl(myZoomCtrl)
			//			//添加添加城市列表控件
			//			map.addControl(new BMap.CityListControl({
			//				anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
			//				offset: new BMap.Size(130, 23)
			//			}));
			//			//定义新图标
			//			var myIcon = new BMap.Icon("http://api.map.baidu.com/lbsapi/creatmap/images/us_mk_icon.png", new BMap.Size(15, 22));
			//			//创建标注
			//			var marker = new BMap.Marker(pointIcon, {
			//				icon: myIcon
			//			});
			//			//将标注放大地图上
			//			map.addOverlay(marker);
			//			//文字提示
			//			var label = new BMap.Label('骏景广场A座', {
			//				offset: new BMap.Size(20, 0)
			//			});
			//			marker.setLabel(label);
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	html,
	body,
	.map {
		width: 100%;
		height: 200px;
		overflow: hidden;
		margin-top: 15px;
		font-family: "微软雅黑";
		border: 1px solid #E3E3E3;
	}
	
	.areaMapEdit {
		box-sizing: border-box;
		height: 470px;
		overflow: auto;
		.top {
			clear: both;
			overflow: hidden;
			padding-left: 10px;
			background: #F5F5F5;
			border-bottom: 1px solid #CCCCCC;
			p {
				float: left;
				padding: 0 15px;
				line-height: 35px;
				border: 1px solid #E3E3E3;
			}
			.active {
				background: #FFFFFF;
				color: #409EFF;
			}
		}
		.one {
			box-sizing: border-box;
			padding: 20px;
			.name {
				span {
					width: 70px;
					text-align: right;
				}
				input {
					border: 1px solid #E3E3E3;
					padding-left: 10px;
					line-height: 30px;
					width: 185px;
				}
			}
			.size {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				input {
					border: 1px solid #E3E3E3;
					width: 90px;
					text-align: center;
					line-height: 30px;
				}
			}
			.position {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				input:nth-child(2) {
					width: 100px;
					border: 1px solid #E3E3E3;
					line-height: 30px;
					text-align: center;
				}
				input:nth-child(3) {
					border: 1px solid #E3E3E3;
					width: 230px;
					text-align: center;
					line-height: 30px;
					padding-left: 10px;
				}
				button {
					border: 1px solid #E3E3E3;
					width: 70px;
					text-align: center;
					line-height: 30px;
					background: #409EFF;
					color: #FFFFFF;
				}
			}
			.text {
				margin-top: 15px;
				textarea {
					border: 1px solid #E3E3E3;
					width: 350px;
					height: 70px;
					vertical-align: top;
				}
			}
		}
	}
	
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
		background-color: #f1f1f1;
	}
	
	::-webkit-scrollbar-thumb {
		background-color: #b2b2b2;
		width: 16px;
		-webkit-border-radius: 16px;
		-moz-border-radius: 16px;
		border-radius: 16px;
	}
</style>