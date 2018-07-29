<template>
	<div class="productShow hove_con" :style="parentStyle">
		<div class="detail" :id="productShowId">
			<!--one-->
			<ul v-show="itemMdata.styleone" class="oneUl">
				<li v-if="itemMdata.page.isShow==1" v-show="itemMdata.page.pageNum>index" v-for="(list,index) in itemMdata.productSelected" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4}">
					<div @click="gotolink(list.id,list.target)" class="clearfloat colimgHover">
						<div class="pdsRelative" :style="itemMdata.imgStyle">
							<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
							<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth+'px'}]">
								<!--<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="list.content"></p>
								<i class="el-icon-search" :style="itemMdata.iStyle"></i>-->
							</div>
						</div>
						<p v-show="itemMdata.productName" :style="itemMdata.pStyle">{{list.name}}</p>
						<p v-show="itemMdata.productDesShow" :style="itemMdata.desStyle" class="desStyle">{{list.image_text}}</p>	
						<p v-show="itemMdata.productcontent" v-html="list.content" :style="itemMdata.contentStyle" class="contentStyle"></p>						
					</div>
				</li>
				<li v-if="itemMdata.page.isShow!=1" v-for="(list,index) in itemMdata.productSelected" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4}">
					<div @click="gotolink(list.id,list.target)" class="clearfloat colimgHover">
						<div class="pdsRelative" :style="itemMdata.imgStyle">
							<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
							<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth+'px'}]">
								<!--<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="list.content"></p>
								<i class="el-icon-search" :style="itemMdata.iStyle"></i>-->
							</div>
						</div>
						<p v-show="itemMdata.productName" :style="itemMdata.pStyle">{{list.name}}</p>
						<p v-show="itemMdata.productDesShow" :style="itemMdata.desStyle" class="desStyle">{{list.image_text}}</p>	
						<p v-show="itemMdata.productcontent" v-html="list.content" :style="itemMdata.contentStyle" class="contentStyle"></p>
					</div>
				</li>
			</ul>

			<!--two-->
			<div class="carousel-wrap slide1" v-show="itemMdata.styletwo">
				<div class="width">
					<ul class='slideUl'>
						<li v-for="(list,index) in itemMdata.productSelected" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4}">
							<div class="liDiv colimgHover" @click="gotolink(list.id,list.target)">
								<img :src="list.image" :style="itemMdata.imgStyle" />
								<p :style="itemMdata.pStyle">{{list.name}}</p>
								<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth+'px'}]">
									<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="describeHtml(list.describe)"></p>
									<i></i>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="button" v-show="itemMdata.showbtnP == 0">
					<span class="pre1" :id="productShowBtnPre" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.pdsPre.url+')'}]"></span>
					<span class="next1" :id="productShowBtnNext" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.pdsNext.url+')'}]"></span>
				</div>
				<div class="button bButton" v-show="itemMdata.showbtnP == 1">
					<span class="pre1 bottomBtn" :id="productShowBtnPre" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.pdsPre.url+')'}]"></span>
					<span class="next1 bottomBtn" :id="productShowBtnNext" :style="[itemMdata.spanStyle,{backgroundImage:'url('+itemMdata.pdsNext.url+')'}]"></span>
				</div>
			</div>

			<!--three-->
			<div class="threeStyle" :style="[{width:itemMdata.parentStyle.width+'px'}]" v-show="itemMdata.stylethree">
				<table align="center">
					<tr>
						<td :style="[{width:itemMdata.parentStyle.width+'px'}]" align=center>
							<div class="tableBox" :style="[{overflow:'hidden'},{width:itemMdata.parentStyle.width+'px'}]" align=center>
								<table border=0 align=center cellpadding=0 cellspacing=0 cellspace=0>
									<tr>
										<td valign=top class="old">
											<table cellspacing="5" cellpadding="0">
												<tr>
													<td :style="{width:itemMdata.liStyle.width}" v-for="(list,index) in itemMdata.productSelected" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterTwo:itemMdata.mouseenterNumber==2,mouseenterThree:itemMdata.mouseenterNumber==3,mouseenterFour:itemMdata.mouseenterNumber==4}">
														<div  class="colimgHover" @click="gotolink(list.id,list.target)">
															<img :src="list.image" :style="{width:itemMdata.liStyle.width}" />
															<p :style="itemMdata.pStyle">{{list.name}}</p>
															<div class="hid" :style="[itemMdata.hidStyle,{borderWidth:itemMdata.hidStyle.borderWidth+'px'}]">
																<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]" v-html="describeHtml(list.describe)"></p>
																<i></i>
															</div>
														</div>
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
			<div class="page" v-if="itemMdata.page.isShow==1">
				<p data-index="up">
					<span>上一页</span>
				</p>
				<p :data-index="index" v-for="(index) in Math.ceil(itemMdata.page.talNum/itemMdata.page.pageNum)">
					<span>{{index}}</span>
				</p>
				<!--p>
					<span>1</span>
				</p>
				<p>
					<span>2</span>
				</p>
				<p>
					<span>3</span>
				</p>
				<p>
					<span>4</span>
				</p-->
				<p data-index="down">
					<span>下一页</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	//require("../../../../../static/js/emit.js");
	import api from '@/api/$ajax.js'
	export default {
		name: 'productShow',
		props: ['itemMdata', "posCom", 'index'],
		data() {
			return {
				id: this.$route.params.id,
				param: this.$route.params.param,
				productId: this.$route.query.productId,
				param: {
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id,
					
				},
				parentStyle: {

				},
				
				productShowBtnPre:'productShowBtnPre' + + this.posCom + this.index,
				productShowBtnNext:'productShowBtnNext' + + this.posCom + this.index,
				productShowId: "productShow" + this.posCom + this.index
			}
		},
		created() {
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
			//console.log(this.param.productId)
			var ts = this;
			api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id, false, {}, function(r) {
				if(r.code == 422) {
					return;
				}
				//debugger;
				//console.log("api/data/columnList");
				for(let i = 0; r.data.list.length > i; i++) {
					if(r.data.list[i].url == "productDetail") {
						console.log("productDetail");
						ts.param.id = r.data.list[i].id;
					}
				}
				//ts.getData(ts.param);
			});
		},
		mounted() {
			productShow.productShow1(this.productShowId);
			hoverAction.productShowHover(this.productShowId,this.itemMdata)
			hoverAction.productShowPreNext(this.productShowId,this.itemMdata)
			
			
		},
		methods: {
			describeHtml(s) {
			　　if (s) {
			　　　　return s.replace(/\s/g,'<br/>')
			　　} else return '';
			},
			gotolink: function(id, target) {
				
				var link = '/t1/prev/product/' + this.id + '/' + this.param.id + '?productId=' + id + '&token=' + this.param.token + "&company_id=" + this.param.company_id + "&type=" + this.param.type  + "&pc_version_id=" + this.param.pc_version_id+'&mobile_version_id=' + this.param.mobile_version_id;
				window.open(link, target);
			},
			
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
</style>
