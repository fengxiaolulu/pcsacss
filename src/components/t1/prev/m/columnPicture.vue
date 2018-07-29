<template>
	<div class="columnPicture hove_con" :style="parentStyle">
		<div class="detail" :id="columnPictureId" :style="[{height:itemMdata.parentStyle.height+'px'}]">
			<!--one-->
			<ul class="styleone" v-show="itemMdata.styleone">
				<li v-for="(list,idx) in itemMdata.columnPictureLlist" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4,mouseenterFive:itemMdata.mouseenterNumber==5}">
					<div  @dblclick="linkUrl(list)" class="imgHover colimgHover colDiv"  ref="imgHover" :style="[itemMdata.colimgHover,itemMdata.divStyle,{width:itemMdata.imgStyle2.width}]">
						<img :src="list.hoverUrl" ref="imgsFront"  class="front"  v-show="itemMdata.isImg" :style="{width:itemMdata.imgStyle.width}"/>
						<img @mousedown="defaultStop($event)" class="back" :src="list.url" ref="imgsBack"" :style="{width:itemMdata.imgStyle.width}"/>
						<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth}]">
							<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
							<i class="el-icon-search" :style="itemMdata.iStyle"></i>
						</div>
					</div>
					<p class="pW">
						<span :style="itemMdata.pStyle">{{list.text}}</span>
						<span v-show="itemMdata.imgDescription==true" :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></span>
					</p>
				</li>
			</ul>
			<!--two-->
			<div class="carousel-wrap slide1" v-show="itemMdata.styletwo">
				<div class="width" :style="[itemMdata.styleTwo,{height:itemMdata.parentStyle.height+'px'}]" ref="slide1Box">
					<ul class='slideUl' ref="slide1">
						<li v-for="(list,index) in itemMdata.columnPictureLlist"  :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4,mouseenterFive:itemMdata.mouseenterNumber==5}">
							<div @dblclick="linkUrl(list)" class="liDiv colDiv" :style="[itemMdata.divStyle,{width:itemMdata.imgStyle2.width}]">
								<img @mousedown="defaultStop($event)" :src="list.url" :style="[{width:itemMdata.imgStyle2.width},{height:itemMdata.imgStyle.height}]" ref="twoImgs" class="twoImgs"/>
								<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth}]">
									<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="describeHtml(list.describe)"></p>
									<i></i>
								</div>
							</div>
							<p class="pW">
								<span :style="itemMdata.pStyle">{{list.text}}</span>
								<span v-show="itemMdata.imgDescription==true" :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></span>
							</p>
						</li>
					</ul>
				</div>
				<div class="button" v-show="itemMdata.showbtnP == 0">
					<span class="pre1" :id="colBtnPre" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.colPre.url+')'}]"></span>
					<span class="next1" :id="colBtnNext" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.colNext.url+')'}]"></span>
				</div>
				<div class="button bButton" v-show="itemMdata.showbtnP == 1">
					<span class="pre1 bottomBtn" :id="colBtnPre" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.colPre.url+')'}]"></span>
					<span class="next1 bottomBtn" :id="colBtnNext" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.colNext.url+')'}]"></span>
				</div>
				
			</div>
			<!--three-->
			
			<div class="threeStyle" :style="[{width:itemMdata.parentStyle.width+'px'},{height:itemMdata.parentStyle.height+'px'}]" v-show="itemMdata.stylethree">
				
					<table align="center">
					<tr>
						<td :style="[{width:itemMdata.parentStyle.width+'px'},{height:itemMdata.parentStyle.height+'px'}]" align=center >
							<div class="tableBox" :style="[{overflow:'hidden'},{width:itemMdata.parentStyle.width+'px'},{height:itemMdata.parentStyle.height+'px'}]" align=center>
								<table border=0 align=center cellpadding=0 cellspacing=0 cellspace=0 >
									<tr>
										<td valign=top class="old">
											<table cellspacing="5" cellpadding="0">
												<tr>
													<td :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4,mouseenterFive:itemMdata.mouseenterNumber==5}" :style="[{width:itemMdata.liStyle.width}]" v-for="(list,index) in itemMdata.columnPictureLlist">
														<div @dblclick="linkUrl(list)" class="liDiv colDiv" :style="[itemMdata.divStyle,{width:itemMdata.imgStyle2.width},{marginTop:itemMdata.liStyle.marginTop},{marginBottom:itemMdata.liStyle.marginBottom},{marginleft:itemMdata.liStyle.marginleft},{marginRight:itemMdata.liStyle.marginRight}]">
															<img @mousedown="defaultStop($event)" :src="list.url" :style="{width:itemMdata.imgStyle2.width}"/>
															<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth}]">
																<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="describeHtml(list.describe)"></p>
																<i></i>
															</div>
														</div>
														<p class="pW" :style="[{float:itemMdata.divStyle.float},{width:itemMdata.pStyle.width}]">
															<span :style="itemMdata.pStyle">{{list.text}}</span>
															<p v-show="itemMdata.imgDescription==true" :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
														</p>
													</td>
												</tr>
											</table>
										</td>
										<td class="new" valign=top></td>
									</tr>
								</table>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	
</template>

<script>
	///require("../../../../../static/js/emit.js");
	export default {
		name: 'columnPicture',
		props: ['itemMdata', "posCom", 'index'],
		created() {
			console.log(this.itemMdata);
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		data() {
			return {
				title: "列表多图",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
				preview: '/t1/prev/' + this.$route.params.id + "/",
				id: this.$route.params.id,
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					version_id: this.$route.query.version_id,					
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id
				},
				colBtnPre:'colBtnPre' + this.index,
				colBtnNext:'colBtnNext' + this.index,
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					rTitle: '编辑列表多图',
				},
				marginleft: '',
				marginleft2: '',
				currentIndex: 0,
				currentIndex2: 0,
				timer: '',
				columnPictureId: "columnPicture" + this.posCom + this.index
			}
		},
		mounted() {
			//columnPicture.columnPicture1(this.columnPictureId);
			hoverAction.columnPictureHover(this.columnPictureId,this.itemMdata)
			hoverAction.colPreNext(this.columnPictureId,this.itemMdata)
			var t = this;
			$('#'+this.columnPictureId).find('.colDiv').on('click',function(){
				var j = $(this).index();
				
				if(Number(t.itemMdata.columnPictureLlist[j].link)){
					if(t.itemMdata.columnPictureLlist[j].target == '_blank'){
						window.open(t.preview + t.itemMdata.columnPictureLlist[j].link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
					if(t.itemMdata.columnPictureLlist[j].target == '_self'){
						location.href = t.preview + t.itemMdata.columnPictureLlist[j].link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&version_id=' + t.param.version_id + '&column_id=' + t.itemMdata.columnPictureLlist[j].t.itemMdata.columnPictureLlist[j].link;
					}
					if(!t.itemMdata.columnPictureLlist[j].target){
						window.open(t.preview + t.itemMdata.columnPictureLlist[j].link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
				}else{
					if(t.itemMdata.columnPictureLlist[j].link.indexOf("http") > -1 && t.itemMdata.columnPictureLlist[j].target == '_blank'){
						window.open(t.itemMdata.columnPictureLlist[j].link)
					}else if(t.itemMdata.columnPictureLlist[j].link.indexOf("http") <0 && t.itemMdata.columnPictureLlist[j].target == '_blank'){
						window.open(t.preview + t.itemMdata.columnPictureLlist[j].link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}
					if(t.itemMdata.columnPictureLlist[j].link.indexOf("http") > -1 && t.itemMdata.columnPictureLlist[j].target == '_self'){
						location.href = t.itemMdata.columnPictureLlist[j].link
					}else if(t.itemMdata.columnPictureLlist[j].link.indexOf("http") <0 && t.itemMdata.columnPictureLlist[j].target == '_self'){
						location.href = t.preview + t.itemMdata.columnPictureLlist[j].link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id
					}
					if(t.itemMdata.columnPictureLlist[j].link.indexOf("http") > -1 && !t.itemMdata.columnPictureLlist[j].target){
						window.open(t.itemMdata.columnPictureLlist[j].link)
					}else if(t.itemMdata.columnPictureLlist[j].link.indexOf("http") <0 && !t.itemMdata.columnPictureLlist[j].target){
						window.open(t.preview + t.itemMdata.columnPictureLlist[j].link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}
				}
				
			})
			
			//urlt.itemMdata.columnPictureLlist[i].link.t.itemMdata.columnPictureLlist[i].linkUrl(this.itemMdata.columnPictureLlist[i],this.preview,this.param,this.columnPictureId)
			
		},
		methods: {
			describeHtml(s) {
			　　if (s) {
			　　　　return s.replace(/\s/g,'<br/>')
			　　} else return '';
			},
			
			
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
</style>