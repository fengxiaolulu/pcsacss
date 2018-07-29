<template>
	<div class="articleScrap hove_con" :style="parentStyle">
		<div class="detail" :id="articleId">
			<ul :style="[itemMdata.ulStyle,{listStyleType:itemMdata.ulStyle.listStyleType},{listStyleImage:'url('+itemMdata.ulStyle.listStyleImage+')'}]"  v-show="itemMdata.styleFive==false">
				<li v-for="(list,index) in itemMdata.articleSelected" :style="itemMdata.liStyle" class="articleLi">
					<div @click="gotolink(list.id,list.target)" class="inlineBlock">
						<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
						<div class="text" :style="itemMdata.textStyle">
							<p class="title" :style="itemMdata.titleStyle">{{list.name}}</p>
							<p class="time" :style="itemMdata.timeStyle">{{list.add_time}}</p>
							<p class="describe" :style="itemMdata.describeStyle">{{list.image_text}}</p>
							<a :target="list.target" :href="list.url" v-show="itemMdata.moreShow">更多>></a>
						</div>
					</div>
				</li>
			</ul>
			<div v-show="itemMdata.styleFive">
				<div class="firstAticle" @click="gotolink(itemMdata.styleFive.id,itemMdata.styleFive.target)" :style="itemMdata.firsttextStyle">
					<div class="imgLeft">
						<img :src="itemMdata.firstArticle.image" :style="[{width:itemMdata.moreStyle.width},{height:itemMdata.moreStyle.height}]" />
					</div>
					<div class="text" :style="[{width:itemMdata.textStyleH.width},{height:itemMdata.textStyleH.height}]">
						<p class="title" :style="itemMdata.firsttitleStyle">{{itemMdata.firstArticle.name}}</p>
						<p class="time" :style="itemMdata.firsttimeStyle">{{itemMdata.firstArticle.add_time}}</p>
						<p class="describe" :style="itemMdata.firstdescribeStyle">{{itemMdata.firstArticle.image_text}}</p>
						<a :target="itemMdata.firstArticle.target" :href="itemMdata.firstArticle.url" v-show="itemMdata.moreShow">更多>></a>
					</div>
				</div>
				<div>
					<ul :style="[itemMdata.ulStyle,{listStyleType:itemMdata.ulStyle.listStyleType},{listStyleImage:'url('+itemMdata.ulStyle.listStyleImage+')'}]">
						<li v-for="(list,index) in itemMdata.articleSelected" :style="itemMdata.liStyle" class="articleLi" :class="{oneLi:itemMdata.styleFive}">
							<div @click="gotolink(list.id,list.target)" class="inlineBlock">
								<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
								<div class="text" :style="itemMdata.textStyle">
									<p class="title" :style="itemMdata.titleStyle">{{list.name}}</p>
									<p class="time" :style="itemMdata.timeStyle">{{list.add_time}}</p>
									<p class="describe" :style="itemMdata.describeStyle">{{list.image_text}}</p>
									<a :target="list.target" :href="list.url" v-show="itemMdata.moreShow">更多>></a>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			<!--分页-->
			<div class="page" v-show="itemMdata.articleSelected.length >= itemMdata.pageNum">
				<p>
					<a href="">首页</a>
				</p>
				<p v-for="index in 4">
					<a href="">{{index}}</a>
				</p>
				
				<p>
					<a href="">末页</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/$ajax.js'
	export default {
		name: 'articleScrap',
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			console.log(this.itemMdata);
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
			var ts = this;			
			api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id,
				 false,{}, function(r) {
					if(r.code == 422) {
						return;
					}
					for(let i = 0; r.data.list.length > i; i++) {
						if(r.data.list[i].url == "newsDetail") {
							console.log("newsList");
							ts.param.id = r.data.list[i].id;
						}
					}
				}
			);
			//this.getData();
		},
		data() {
			return {
				id: this.$route.params.id,
				param: this.$route.params.param,	
				articleId:'articleId'+this.posCom+this.index,		
				param:{
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id
				},
				parentStyle: {

				}
			}
		},
		methods: {
			gotolink: function(id, target) {								
				var link = '/t1/prev/new/' + this.id + '/'+this.param.id+'?newDesId=' + id + '&token='+this.param.token+"&company_id="+this.param.company_id+"&type="+this.param.type+"&version_id="+this.param.version_id+"&pc_version_id="+this.param.pc_version_id;
				window.open(link, target);
			},	
			linkUrl() {
				if(this.itemMdata.link) {
					if(this.itemMdata.link.indexOf("http") != -1) {
						location.href = this.itemMdata.link;
					} else {
						this.$router.push(this.preview + this.itemMdata.link);
						//location.href = this.preview + this.itemMdata.link;
					}
				}
				console.log(this.preview + this.itemMdata.link);
			}
		},
		mounted(){
			urlLink.showHand(this.articleId,this.itemMdata)
			hoverAction.articleSHover(this.articleId,this.itemMdata);
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
</style>