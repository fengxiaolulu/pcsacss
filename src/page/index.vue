<template>
	<div>
		<router-link :to="{path:'/t2/' + id+'/'+param,query:{company_id:'100005',token:'f1184b95877240efbc1e067df3f88f8eGry5pj',version_id:'5',type:2}}">
			编辑2
		</router-link>
		<router-link :to="{path:'/content/' + id+'/'+product,query:{company_id:'100005',productId:1,token:'13554fc7b99a404490395b31b5dd63b0T9pWeL',version_id:'5',type:1}}">
			产品展示1
		</router-link>
		<router-link :to="{path:'/new/' + id+'/'+newDes,query:{company_id:'100005',productId:1,token:'13554fc7b99a404490395b31b5dd63b0T9pWeL',version_id:'5',type:1}}">
			产品展示1
		</router-link>
		<router-link :to="{path:'/t1/' + id+'/'+param,query:{company_id:'100005',token:'f1184b95877240efbc1e067df3f88f8eGry5pj',version_id:'5',type:1}}">
			编辑1
		</router-link>

		<div class="wrapper">
			<div class="box1"></div>
			<div class="box2"></div>
			<div class="box3"></div>
			<div class="box4"></div>
			<div class="box5"></div>
		</div>
	</div>
</template>
<script>
	//import IScrollView from 'vue-iscroll-view'
	//import IScroll from 'iscroll'
	//Vue.use(IScrollView, IScroll)
	/*import VIscroll from 'viscroll';
	Vue.use(VIscroll, {
		mouseWheel: true,
		click: false,
		preventDefault: true,
		tap: true,
		bounce: false,
		scrollbars: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		//disableTouch: true,
		//disablePointer: true,
		//disableMouse: true,
	});*/

	export default {
		components: {
			//draggable,
			//mButton,
			//mImage,
			//mFont
		},
		data() {
			return {
				id: '1' || this.$utils.guid(),
				product: "count",
				newDes: "newDes",
				productId: 1,
				param: "index"
			}
		},
		created() {
			//this.getData()
		},
		methods: {
			getData() {
				var v = this;
				//http://119.29.226.11:88/api/account/getInfo?token=f050b2e9bfdf4a1fa475ca782ef023c0zy8Fct
				v.$api.get('headlines-pc-api/getAdvMap?cityId=27833&code=WEB-SCL-01,WEB-SCL-02', null, function(r) {
					console.log(r)
					v.list = r.data
				})
			}
		}
	}
</script>
<style lang="scss">
	.wrapper div {
		height: 1rem;
	}
	
	.box1 {
		/* 750 * 20% */
		width: 150px;
		background-color: coral;
	}
	
	.box2 {
		/* 750 * 40% */
		width: 300px;
		background-color: skyblue;
	}
	
	.box3 {
		/* 750 * 60% */
		width: 450px;
		background-color: palegreen;
	}
	
	.box4 {
		/* 750 * 80% */
		width: 600px;
		background-color: wheat;
	}
	
	.box5 {
		/* 750 * 100% */
		width: 750px;
		background-color: darkred;
	}
</style>