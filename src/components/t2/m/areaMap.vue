<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :z="itemMdata.parentStyle.zIndex" :active.sync="itemMdata.parentStyle.active" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit areaMapP hove_con">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">编辑在线地图</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div id="map2" class="map" :style="itemMdata.mapStyle"></div>
		</div>
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	//import uiDialog from './uiDialog.vue'
	import { MP } from '../../../utils/map'
	export default {
		name: 'areaMap',
		props: ['itemMdata', "posCom", 'index'],
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
					isEdit: false
				}
			}
		},
		components: {
			VueDraggableResizable,
			//uiDialog
		},
		methods: {
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
			},
			delModule(i) {
				this.$emit('delModule', i);
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i,this.editDial);
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		height: 100%;
		
		/*.map {
			width: 100%;
			height: 100%;
			overflow: hidden;
			border: 1px solid #E3E3E3;
		}*/
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>