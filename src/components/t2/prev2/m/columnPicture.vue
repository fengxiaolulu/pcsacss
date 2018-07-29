<template>

		<div class="phoneedit columnPictureP hove_con" :style="parentStyle">
			
			<div class="detail"  :id="columnPictureId">
				<!--one-->
				<ul class="styleone" v-show="itemMdata.styleone">
					<li v-for="list in itemMdata.columnPictureLlist" :style="itemMdata.liStyle" :class="{mouseenterOne:itemMdata.mouseenterNumber==1,mouseenterThree:itemMdata.mouseenterNumber==3}">
						<div  @dblclick="linkUrl(list)" class="colBox" :style="itemMdata.divStyle">
							<img @mousedown="defaultStop($event)" :src="list.url" :style="itemMdata.imgStyle2" />
							<div class="hid" :style="[itemMdata.hidStyle,{background:'none'}]" v-if="itemMdata.mouseenterNumber==2">
								<p :style="[{display:'none'},{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
								<i></i>
							</div>
							<div class="hid"  v-if="itemMdata.mouseenterNumber==4">
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
								<i></i>
							</div>
							<div class="hid5" v-if="itemMdata.mouseenterNumber==5">
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
								<i></i>
							</div>
						</div>
						<p :style="itemMdata.pStyle">{{list.text}}</p>
						<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.phoneP,itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
					</li>
				</ul>
				<!--two-->
				<div class="swiper slide1" v-show="itemMdata.styletwo">
					<!--<swiper class="swiper-container" swipeid="swipe5" ref="swiper" :speed="2000" effect="slide" :slidesPerView="2" :swiperbutton="true" :pagination="false">
						<div v-for="(list,index) in itemMdata.columnPictureLlist" :key="index" class="swiper-slide" slot="swiper-con" :style="itemMdata.slideStyle">
							<img @mousedown="defaultStop($event)" :src="list.url" @dblclick="gotolink(list.link,list.target)"/>
							<p :style="itemMdata.pStyle">{{list.text}}</p>
							<div class="hid" :style="itemMdata.hidStyle">
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.phoneP,itemMdata.hoverP,{fontSize:itemMdata.hoverP.fontSize+'px'},{lineHeight:itemMdata.hoverP.lineHeight+'px'}]"  v-html="describeHtml(list.describe)"></p>
								<i></i>
							</div>
						</div>
					</swiper>-->
					<div class="swiper-container" :id="this.swiperId1">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(list,index) in itemMdata.columnPictureLlist" :key="index" :style="itemMdata.slideStyle">
								<img @mousedown="defaultStop($event)" :src="list.url">
								<p :style="itemMdata.pStyle">{{list.text}}</p>
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.phoneP,itemMdata.hoverP]"  v-html="describeHtml(list.describe)"></p>
							</div>
						</div>					
						<!-- 如果需要导航按钮 -->
						<div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div>
					</div>
				</div>
				<!--three-->
				<div class="swiper slide2" v-show="itemMdata.stylethree">
					<!--<swiper class="swiper-container" swipeid="swipe4" ref="swiper" :speed="1000" effect="slide" :swiperbutton="true" :pagination="false">
						<div v-for="(list,index) in itemMdata.columnPictureLlist" :key="index" class="swiper-slide" slot="swiper-con">
							<img @mousedown="defaultStop($event)" :src="list.url" @dblclick="gotolink(list.link,list.target)" />
							<p :style="itemMdata.pStyle">{{list.text}}</p>
							<div class="hid" :style="itemMdata.hidStyle">
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.phoneP,itemMdata.hoverP,{fontSize:itemMdata.hoverP.fontSize+'px'},{lineHeight:itemMdata.hoverP.lineHeight+'px'}]"  v-html="describeHtml(list.describe)"></p>
								<i></i>
							</div>
						</div>
					</swiper>-->
					<div class="swiper-container" :id="this.swiperId2">
						<div class="swiper-wrapper">
							<div class="swiper-slide phoneliDiv" v-for="(list,index) in itemMdata.columnPictureLlist" :key="index">
								<img @mousedown="defaultStop($event)" :src="list.url">
								<p :style="itemMdata.pStyle">{{list.text}}</p>
								<p :style="[{textAlign:itemMdata.hidStyle.textAlign},itemMdata.phoneP,itemMdata.hoverP,{fontSize:itemMdata.hoverP.fontSize+'px'},{lineHeight:itemMdata.hoverP.lineHeight+'px'}]"  v-html="describeHtml(list.describe)"></p>
							</div>
						</div>					
						<!-- 如果需要导航按钮 -->
						<div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div>
					</div>
				</div>
			</div>
		</div>
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->

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
			//			this.$nextTick(() => {
			//				setInterval(() => {
			//					this.marginleft2 -= 300;
			//					this.currentIndex2++;
			//					if(this.currentIndex2 > this.itemMdata.columnPictureLlist.length - 1) {
			//						this.marginleft2 = 0;
			//						this.currentIndex2 = 0;
			//					}
			//				}, 2000)
			//			})
		},
		data() {
			return {
				title: "列表多图",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					rTitle: '编辑列表多图',
					isEdit: false
				},
				preview: '/pc/t2/' + this.$route.params.id + "/",
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
				columnPictureId: "columnPicture" + this.posCom + this.index,
				swiperId1: "swiper1" + this.posCom + this.index,
				swiperId2: "swiper2" + this.posCom + this.index
			}
		},
		mounted() {
			var t = this;
			$('#'+this.columnPictureId).find('.phoneliDiv').on('click',function(){
				var j = $(this).index();
				
				if(Number(t.itemMdata.columnPictureLlist[j].link)){
					if(t.itemMdata.columnPictureLlist[j].target == '_blank'){
						window.open(t.preview + t.itemMdata.columnPictureLlist[j].link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
					if(t.itemMdata.columnPictureLlist[j].target == '_self'){
						location.href = t.preview + t.itemMdata.columnPictureLlist[j].link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&version_id=' + t.param.version_id + '&column_id=' + t.itemMdata.columnPictureLlist[j].t.itemMdata.columnPictureLlist[j].link;
						//window.open(t.preview + t.itemMdata.columnPictureLlist[j].link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
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
			var mySwiper = new Swiper('#'+this.swiperId1 , {
				direction: 'horizontal',
				autoplay: false,
				loop: true,
				speed: 700,
				slidesPerView : 2,
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
			
			var mySwiper2 = new Swiper('#'+this.swiperId2 , {
				direction: 'horizontal',
				autoplay: {
					delay: 1000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
				loop: true,
				speed: 700,
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			})
		},
		methods: {
			linkUrl(item){
				var link = item.link;
				var t = this;
				console.log(link)
				if(Number(link)){
					if(item.target == '_blank'){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
					if(item.target == '_self'){
						location.href = t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id;
					}
					if(!item.target){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id);
					}
				}else{
					if(link.indexOf("http") > -1 && item.target == '_blank'){
						window.open(link)
					}else if(link.indexOf("http") < 0 && item.target == '_blank'){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}

					if(link.indexOf("http") > -1 && item.target == '_self'){
						location.href = link
					}else if(link.indexOf("http") < 0 && item.target == '_self'){
						location.href = t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' +t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id
					}

					if(link.indexOf("http") > -1 && !item.target){
						window.open(link)
					}else if(link.indexOf("http") < 0 && !item.target){
						window.open(t.preview + link + '?token=' + t.param.token + '&company_id=' + t.param.company_id + '&type=' + t.param.type + '&pc_version_id=' + t.param.pc_version_id + '&mobile_version_id=' + t.param.mobile_version_id)
					}
					
				}
				
			},
			describeHtml(s) {
			　　if (s) {
			　　　　return s.replace(/\s/g,'<br/>')
			　　} else return '';
			},
			gotolink: function(link, target) {
				window.open(link, target);
			},
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
				this.$emit('isFuncur', i, this.editDial);
			},
			defaultStop(e) {
				e.preventDefault();
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			},
			//			prev: function() {
			//				this.marginleft -= 300;
			//				this.currentIndex++;
			//				if(this.currentIndex > this.itemMdata.columnPictureLlist.length - 1) {
			//					this.marginleft = 0;
			//					this.currentIndex = 0;
			//				}
			//			},
			//			next: function() {
			//				this.marginleft += 300;
			//				this.currentIndex--;
			//				if(this.currentIndex == -1) {
			//					alert("已经是第一项啦！");
			//					this.marginleft = 0;
			//					this.currentIndex = 0;
			//				}
			//			}

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		/*.detail {
			clear: both;
			overflow: hidden;
			ul {
				clear: both;
				overflow: hidden;
				li {
					text-align: center;
					overflow: hidden;
					position: relative;
					img {
						height: auto;
						position: relative;
					}
					p {
						line-height: 25px;
						text-align: center;
						width: 100%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.hid {
						display: none;
						position: absolute;
						left: 0;
						right: 0;
						top: 0;
						bottom: 25px;
						transition: all 0.7s;
						-moz-transition: all 0.7s;
						-webkit-transition: all 0.7s;
						-o-transition: all 0.7s;
					}
				}
				.mouseenterOne:hover .hid {
					display: none;
				}
				.mouseenterTwo:hover .hid {
					display: block;
					background: none !important;
				}
				.mouseenterTwo:hover .hid p {
					display: none;
				}
				.mouseenterThree:hover .hid {
					border: none !important;
					left: 32%;
					right: 32%;
					top: 20%;
					bottom: 60px;
					display: block;
					background: rgba(0, 0, 0, 0.7) !important;
					border-radius: 100%;
				}
				.mouseenterThree:hover .hid p {
					display: none;
				}
				.mouseenterThree:hover .hid i {
					display: block;
					width: 20px;
					height: 20px;
					margin-left: 39%;
					margin-top: 37%;
					background: url(../../../../static/image/mbg01.png)no-repeat center;
					background-position: 0 -1085px;
				}
				.mouseenterFour:hover .hid {
					border: none !important;
					display: block;
					background: rgba(0, 0, 0, 0.7);
					text-align: center;
					padding-top: 30%;
				}
				.mouseenterFour:hover .hid p {
					color: #FFFFFF;
				}
				.mouseenterFive:hover .hid {
					border: none !important;
					display: block;
					top: auto;
					height: 25px;
					line-height: 25px;
				}
				.mouseenterFive:hover .hid p {
					color: #FFFFFF;
				}
			}
		}*/
	}
	.colBox{position:relative;
		.hid{
			background: rgba(0, 0, 0, 0.4);
			p{
				position:absolute;
				transform:translate(0,-50%);
			}
		}
	}
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>