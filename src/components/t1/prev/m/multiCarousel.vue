<template>
	<div class="multiCarousel hove_con" @click="linkUrl" :style="parentStyle">
		<div class="carousel-wrap" :id="carouselId" :data-speedindex = "itemMdata.speedIndex" :style="style">
			<ul class="slide-ul activeimg" :style="style" ref="slide" id="activeimg">
				
				<li v-for="(list,index) in itemMdata.slideList" :style="{width:itemMdata.parentStyle.width+'px',height:itemMdata.parentStyle.height+'px'}" :key="index">
					<img @mousedown="defaultStop($event)" :src="list.image" :alt="list.name" :style="[itemMdata.imgStyle]">
					<div v-show="itemMdata.txtMul" class="txt" :style="itemMdata.txtStyle" v-html="list.content"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	//require("../../../../../static/js/emit.js");
	export default {
		name: 'multiCarousel',
		props: ['itemMdata', "posCom", 'index'],
		created() {
			//console.log(this.itemMdata);
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
		},
		data() {
			return {
				outerVisible: false,
				carouselId: "carousel" + this.posCom + this.index,
				width: 0,
				carouse: 300,
				height: 0,
				style: {
					width: this.itemMdata.parentStyle.width + 'px',
					height: this.itemMdata.parentStyle.height + 'px'
				},
				x: 0,
				y: 0,
				parentStyle: {

				},
				currentIndex: 0,
				timer: '',
			}
		},
		mounted() {
			multiCarouse.multiCarousel1(this.carouselId,this.itemMdata);
			var btnPages = document.querySelectorAll('.btnPage');
			console.log(btnPages);
			if(btnPages.length>0){
				btnPages[0].classList.add('active');
			}
		},
		methods: {
			pageChange(e,index){
				if(this.itemMdata.autoPlay==false){
					var w = this.itemMdata.parentStyle.width;
					var btnPages = document.querySelectorAll('.btnPage');
					console.log(btnPages)
					var activeimg = document.querySelector('#activeimg');
					
					if(index>=btnPages.length){//0,1,2,3,4
						$(activeimg).css('left', 0);
						index = 0;
					}
					// 页码高亮
					// 先清除所有高亮
					for(var i=0;i<btnPages.length;i++){
						btnPages[i].className = 'btnPage';
					}
					if(index==btnPages.length){
						btnPages[0].classList.add('active')
						$(activeimg).css('left', 0);
					}else{
						btnPages[index].classList.add('active');
						$(activeimg).css('left', -index*w);
					}
				}
			},
			defaultStop(e) {
				//console.log("dd")
				e.preventDefault();
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

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>