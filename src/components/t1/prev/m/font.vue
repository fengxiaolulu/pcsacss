<template>
	<div class="hove_con font" :style="parentStyle">
		<div v-bind:id="editorId" class="cancel ckeditor fontHover" :style="[{lineHeight:itemMdata.iStyle.lineHeight},{letterSpacing:itemMdata.iStyle.letterSpacing}]">
			<a v-if="itemMdata.link" :href="itemMdata.linkUrl" :target = "itemMdata.target">
				<p class="hoverColor" :style="[{lineHeight:itemMdata.iStyle.lineHeight},{letterSpacing:itemMdata.iStyle.letterSpacing}]" v-html="itemMdata.tCon"></p>
			</a>
			<p v-if="!itemMdata.link" class="hoverColor" :style="[{lineHeight:itemMdata.iStyle.lineHeight},{letterSpacing:itemMdata.iStyle.letterSpacing}]" v-html="itemMdata.tCon"></p>
			
		</div>
	</div>

</template>

<script>
	export default {
		name: 'mFont',
		props: ['itemMdata', "posCom", 'index'],
		mounted() {
			console.log(this.editorId)
			hoverAction.fontHover(this.editorId, this.itemMdata)
			urlLink.linkUrl(this.itemMdata,this.preview,this.param,this.editorId)
			urlLink.showHand(this.editorId,this.itemMdata)
		},
		methods: {
			linkUrl(item) {
				var link = item.link;
				var t = this;				
				if(Number(link)) {
					if(item.target == '_blank') {
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
					if(item.target == '_self') {
						location.href = t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id;
					}
					if(!item.target) {
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
				} else {
					if(link.indexOf("http") > -1 && item.target == '_blank') {
						window.open(link)
					} else if(link.indexOf("http") < 0 && item.target == '_blank') {
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}

					if(link.indexOf("http") > -1 && item.target == '_self') {
						location.href = link
					} else if(link.indexOf("http") < 0 && item.target == '_self') {
						location.href = t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id
					}
					if(link.indexOf("http") > -1 && !item.target) {
						window.open(link)
					} else if(link.indexOf("http") < 0 && !item.target) {
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}
				}
			}
		},
		computed: {
			// 计算属性的 getter
			linkUrlty: function() {
				var ts = this;		
				//console.log(ts.itemMdata.link);
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
				
			}
		},
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
				title: '文本',
				preview: '/t1/prev/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				parentStyle: {

				},
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					column_id: this.$route.query.column_id,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id
				},
				editDial: {
					artTitle: "设置链接地址",
					setlink: false
				},
				editorId: "editor" + this.posCom + this.index,
				editor: {}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>