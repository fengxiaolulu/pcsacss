<template>

	<div class="hove_con mImageModel" :style="parentStyle" >
		<div class="imgHover" ref="imgHover" :id="imageId">
			<img :src="itemMdata.hoverUrl" class="imgs front" :style="itemMdata.imgStyle" v-show="itemMdata.isRotate ||itemMdata.isImg" />
			<a v-if="itemMdata.link" :href="linkUrl" :target = "itemMdata.target">
				<img class="imgs back imgsModel" ref="imgs" :src="itemMdata.url" @mousedown="defaultStop($event)" :style="itemMdata.imgStyle" />
			</a>
			<img v-if="!itemMdata.link" class="imgs back imgsModel" ref="imgs" :src="itemMdata.url" @mousedown="defaultStop($event)" :style="itemMdata.imgStyle" />
			<p ref="imgP" :class="['imgP',{centerP:itemMdata.isTxtP == true,leftP:itemMdata.isTxtP == false}]">
				<span v-html="hoverHtml(itemMdata.hovertxt)"></span>
			</p>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'tImg',
		data() {
			return {
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.mobile_version_id
				},				
				text: '默认图片',
				preview: '/t1/prev/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {},
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					setlink: false,
					rTitle: '编辑图片<span style="font-size:12px; color:#666;"> (&nbsp;只能添加jpg,jpeg,gif,png, 免费版大小不超过1MB&nbsp;)</span>'
				},
				imageId:'imageId'+this.posCom + this.index,
				width: 0,
				height: 0,
				x: 0,
				y: 0
			}
		},
		props: ['itemMdata', "posCom", 'index', "itemInner"],
		created() {
			//console.log(this.itemMdata);
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
			this.parentStyle.zIndex = this.itemMdata.parentStyle.zIndex;
		},
		mounted(){
			hoverAction.imageHover(this.imageId,this.itemMdata);
			urlLink.linkUrl(this.itemMdata,this.preview,this.param,this.imageId)
			urlLink.showHand(this.imageId,this.itemMdata)
		},
		methods: {
			hoverHtml(s) {
			　　if (s) {
			　　　　return s.replace(/\s/g,'<br/>')
			　　} else return '';
			},
			// 计算属性的 getter
			linkUrl: function() {
				var ts = this;		
				console.log(ts.itemMdata.link);
				//debugger;
				if(ts.itemMdata.link){
					if(Number(ts.itemMdata.link)){
						/*if(location.href.indexOf("news")>=-1){
							return "http://www.100022.xiaohucloud.com/news/"+this.newDesId
						}else if(location.href.indexOf("product")>=-1){
							return "http://www.100022.xiaohucloud.com/product/"+this.productId
						}*/
						return this.$route.query.domain_url + "/col/" + this.param.param
					} else if(ts.itemMdata.link.indexOf("http") > -1){
						return ts.itemMdata.link
					}
				}
				
			},
			defaultStop(e) {
				e.preventDefault();
			},
			
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>