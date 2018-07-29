<template>
	<div class="articleScrap hove_con" :style="parentStyle">
		<div class="detail" :id="friendLinkId">
			<ul style="clear: both;overflow: hidden;">
				<li v-for="(list,index) in itemMdata.articleSelected" :style="itemMdata.liStyle">
					<div @dblclick="gotolink(list.id,list.target)">
						<img :src="list.link_logo" :style="itemMdata.imgStyle" />
						<div class="text" :style="itemMdata.textStyle">
							<a :href="list.link_url" class="title" :style="itemMdata.titleStyle">{{list.link_name}}</a>
							<p class="describe" :style="itemMdata.describeStyle">{{list.link_abstract}}</p>
							<a :target="list.target" :href="list.link_url" v-show="itemMdata.moreShow">更多>></a>
						</div>
					</div>
				</li>
			</ul>
			
		</div>
	</div>
		
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	//import uiDialog from '@/components/m/uiDialog.vue'
	export default {
		name: 'friendLink',
		props: ['itemMdata'],
		created() {
			//console.log(this.itemMdata);
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.zIndex = this.itemMdata.parentStyle.zIndex;
			//console.l
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
		},
		data() {
			return {
				friendLinkId:"friendLinkId" + this.index,
				parentStyle: {

				}
			}
		},
		mounted(){
			hoverAction.friendLinkHover(this.friendLinkId,this.itemMdata)
		},
		methods: {
			
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
</style>