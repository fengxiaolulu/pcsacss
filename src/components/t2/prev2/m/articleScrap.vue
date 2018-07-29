<template>

		<div class="phoneedit articleScrapP hove_con" :style="parentStyle">
			
			<div class="detail" :id="articleScrapId">
				<ul style="clear: both;overflow: hidden;" class="oneUl">
					<li v-for="(list,index) in itemMdata.articleSelected" :style="itemMdata.liStyle" v-show="itemMdata.page.pageNum>index">
						<div @dblclick="gotolink(list.id,list.target)">
							<img @mousedown="defaultStop($event)" :src="list.image" :style="itemMdata.imgStyle" />
							<div class="text" :style="itemMdata.textStyle">
								<p class="title" :style="itemMdata.titleStyle">{{list.name}}</p>
								<p class="time" :style="itemMdata.timeStyle">{{list.add_time}}</p>
								<p class="describe" :style="itemMdata.describeStyle">{{list.image_text}}</p>
								<a :target="list.target" :href="list.url" v-show="itemMdata.moreShow" :style="itemMdata.moreStyle">更多>></a>
							</div>
						</div>
					</li>
				</ul>
				<!--分页-->
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

	export default {
		name: 'articleScrap',
		props: ['itemMdata'],
		created() {
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
		},
		mounted() {
			articleScrap.articleScrap(this.articleScrapId, this.itemMdata);
		},
		data() {
			return {
				title: "文章列表",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
				articleScrapId: "articleScrap" + this.posCom + this.index
			}
		},
		methods: {
			gotolink:function(link,target){
				window.open(link,target); 
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
			span:nth-child(1){
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon{
				display: block;
				float: left;
				border-right: none;
				background: url(../../../../../static/image/bg03.png)no-repeat;
			}
			.icon i{
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
			.style{
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover{
				background-position: -60px -232px;
			}
			.style:hover i{
				display: block;
			}
			.animation{
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover{
				background-position: -372px -232px;
			}
			.animation:hover i{
				display: block;
			}
			.borderhid{
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover{
				background-position: -275px -232px;
			}
			.borderhid:hover i{
				display: block;
			}
			.delete{
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover{
				background-position: -105px -232px;
			}
			.delete:hover i{
				display: block;
			}
		}
		.detail {

		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>