<template>
	<div class="newDes hove_con" :style="parentStyle">			
			<div class="detail">
				<div>
					<h3>
						<p :style="itemMdata.iStyle">{{itemMdata.newDesInfo.name}}</p>
						<div v-if="itemMdata.pageEleSIds.length>0">
							<p v-if="itemMdata.oneId>-1"><span>发表时间：</span><span>{{itemMdata.newDesInfo.add_time}}</span></p>
							<p v-if="itemMdata.twoId>-1"><span>作者：</span><span>{{itemMdata.newDesInfo.author}}</span></p>
							<p v-if="itemMdata.fourId>-1"><span>来源：</span><span>{{itemMdata.newDesInfo.source}}</span></p>
							<p v-if="itemMdata.fiveId>-1"><span>网址：</span><span>{{itemMdata.newDesInfo.source}}</span></p>
						</div>
					</h3>
					<div class="two" v-if="itemMdata.modelStyle == 1"><img :src="itemMdata.newDesInfo.image"/></div>
					<div style="clear: both;overflow:hidden;">
						<div style="float:left; clear: both;overflow:hidden;" align="center" v-if="itemMdata.modelStyle == 2">
							<img :src="itemMdata.newDesInfo.image"  hspace="8"><br />
						</div>
						
						<img :src="itemMdata.newDesInfo.image"  hspace="8"  v-if="itemMdata.modelStyle == 3" style="float:right; clear: both;"><br />
						<p v-html="itemMdata.newDesInfo.content"></p>
					</div>
					<div class="next">
						<p v-if="itemMdata.sixId>-1&&itemMdata.pageEleSIds.length>0">
							<span>下一篇</span>
							<span>{{itemMdata.newDesInfoList[newsId].name}}</span>
						</p>
						
						<div class="bdsharebuttonbox" v-show="itemMdata.shareId=='1'">
							<span style="float:left;">分享到：</span>
							<a href="javascript:viod(0)" class="bds_qzone" data-cmd="qzone"></a>
							<a href="javascript:viod(0)" class="bds_tsina" data-cmd="tsina"></a>
							<a href="javascript:viod(0)" class="bds_tqq" data-cmd="tqq"></a>
							<a href="javascript:viod(0)" class="bds_renren" data-cmd="renren"></a>
							<a href="javascript:viod(0)" class="bds_weixin" data-cmd="weixin"></a>
							<a href="javascript:viod(0)" class="bds_more" data-cmd="more"></a>
						</div>
					</div>
				</div>				
			</div>
	</div>	
</template>



<script>
	import api from '@/api/$ajax.js'
	//import uiDialog from '@/components/m/uiDialog.vue'
	//require("../../../../static/js/emit.js");
	export default {
		name: 'newDes',
		props: ['itemMdata'],
		created() {			
			this.getData();
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
			this.parentStyle.zIndex = this.itemMdata.parentStyle.zIndex;
		},
		data() {
			return {
				title: "新闻列表",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				token: this.$route.query.token,
				newDesId: this.$route.query.newDesId,
				parentStyle: {

				},				
				newsId:'',
				idNewDes:''
			}
		},
		components: {
			//VueDraggableResizable
			//uiDialog
		},
		methods: {			
			gotolink: function(link, target) {
				//debugger;
				window.open(link, target);
			},			
			getData() {
				var v = this;			
				api.get('/api/data/news?token='+this.token+'&id='+this.newDesId,true,{}, function(data) {	
						console.log(data);			
						v.itemMdata.newDesInfo = data.data;					
					}
				)					
			}
		},
		mounted(){
			//百度分享
			let _this = this;
			this.$nextTick(function(){
				window._bd_share_config={
					"common":{
						"bdSnsKey":{},
						"bdText":"",
						"bdMini":"2",
						"bdPic":"",
						"bdStyle":"0",
						"bdSize":"16"
					},
					"share":{},
					/*
					"image":{
						"viewList":["qzone","tsina","tqq","renren","weixin"],
						"viewText":"分享到：",
						"viewSize":"16"
					},*/
					"selectShare":{
						"bdContainerClass":null,
						"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]
					}
					
				};
				const s = document.createElement('script');
				s.type = 'text/javascript';
				s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
				document.body.appendChild(s);
			})
			//console.log(this.itemMdata.checkList[idx].checked)
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
			span:nth-child(1) {
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon {
				display: block;
				float: left;
				border-right: none;
				background: url(/static/image/bg03.png)no-repeat;
			}
			.icon i {
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
			.style {
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover {
				background-position: -60px -232px;
			}
			.style:hover i {
				display: block;
			}
			.animation {
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover {
				background-position: -372px -232px;
			}
			.animation:hover i {
				display: block;
			}
			.borderhid {
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover {
				background-position: -275px -232px;
			}
			.borderhid:hover i {
				display: block;
			}
			.delete {
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover {
				background-position: -105px -232px;
			}
			.delete:hover i {
				display: block;
			}
		}
		.detail{
			h3{
				line-height:100px;
				border-bottom:3px solid #ccc;
				margin-bottom:30px;
				div{
					p{
						display:inline-block;
						color:#655d5d;
						font-size:12px;
					}
				}
			}
			.next{
				p{
					span{
						display:inline-block;
						margin-right:30px;
					}
					span:last-child{
						font-weight:bold;
					}
				}
			}
			
		}
		
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>