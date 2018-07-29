<template>
	
		<div class="phoneedit newsDesP hove_con">
			
			<div class="detail" :id="newDesId">
				<div class="top">
					<p>
						<span class="name" :style="itemMdata.nameStyle">{{itemMdata.newDesInfo.name}}</span>
						<span class="time">发表时间：{{itemMdata.newDesInfo.add_time}}</span>
						<span class="time">作者：{{itemMdata.newDesInfo.author}}</span>
					</p>									
				</div>
				<div class="text">
					<img :src="itemMdata.newDesInfo.image" />
					<p v-html="itemMdata.newDesInfo.content"></p>
				</div>
				<div class="buttom">
					<p>
						<span>上一个：</span>
						<span>{{itemMdata.newDesInfoList[newsPrev].name}}</span>
					</p>
					<p>
						<span>下一个：</span>
						<span>{{itemMdata.newDesInfoList[newsNext].name}}</span>
					</p>
				</div>
			</div>
		</div>

</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'

	export default {
		name: 'mNewDes',
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			this.getData();
			//this.idNewDes = this.itemMdata.pageEleSIds.indexOf(this.itemMdata.pageEleSId)
			//console.log(this.idNewDes);
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
				newsPrev: 5,
				newsNext:7,
				idNewDes: '',
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					isEdit: true,
					rTitle: '编辑文章列表',
				},
				contextMenuData: {
					// the contextmenu name(@1.4.1 updated)
					menuName: this.$utils.guid(),
					axios: {
						x: null,
						y: null
					},
					//Menu options (菜单选项)
					menulists: [{
							fnHandler: 'upFloor', // Binding events(绑定事件)
							btnName: '置于顶层' // The name of the menu option (菜单名称)
						},
						{
							fnHandler: 'moveUpFloor',
							btnName: '上移一层'
						},
						{
							fnHandler: 'moveDownFloor',
							btnName: '下移一层'
						},
						{
							fnHandler: 'copyItem',
							btnName: '复制模块'
						},
						{
							fnHandler: 'downFloor',
							btnName: '置于底层'
						}
					]
				}
			}
		},
		components: {
			VueDraggableResizable
			//uiDialog
		},
		methods: {
			showMenu(index) {
				event.preventDefault();
				event.stopPropagation();
				var x = event.clientX;
				var y = event.clientY;
				this.contextMenuData.axios = {
					x,
					y
				}
			},
			upFloor(i) {
				console.log(i.parentStyle);
				i.parentStyle.zIndex += this.itemInner.length;
				console.log("upFloor");
			},
			moveUpFloor(i) {
				++i.parentStyle.zIndex;
				console.log('moveUpFloor!');
			},
			moveDownFloor(i) {
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			copyItem(item) {
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.length + 1;
				this.itemInner.push(i);
			},
			downFloor(i) {
				i.parentStyle.zIndex = 0;
				console.log('downFloor!')
			},
			isNewEd(i) {
				i.isEdit = true;
				i.isNewDes = false;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
				console.log(i.isNewDes)

			},
			gotolink: function(link, target) {
				//debugger;
				window.open(link, target);
			},
			isFuncur(i) {
				i.isEdit = true;
				i.isNewDes = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
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
				this.$emit('recomponent', i);
			},
			getData() {
				var v = this;
				api.get('/api/data/news?token=' + this.token + '&id=' + this.newDesId, false, {}, function(data) {
					//console.log(data)
					v.itemMdata.newDesInfo = data.data;
				});
				api.get('/api/data/newsList?token=' + this.token, false, {}, function(data) {
					//console.log(data)
					//var result = JSON.stringify(data); //json对象转成字符串
					v.itemMdata.newDesInfoList = data.data;
					for (var i= 0 ; i< v.itemMdata.newDesInfoList.length ; i++) {
						if (v.itemMdata.newDesInfoList[i].id == v.itemMdata.newDesInfo.id) {
							//debugger
							v.newsPrev = i-1;
							v.newsNext = i+1;
							if (i == 0) {
								v.newsPrev = 0;
							}
							if (i == v.itemMdata.newDesInfoList.length-1) {
								v.newsNext = i;
							}
						}
					};
					//console.log(v.itemMdata.newDesInfoList[v.newsPrev].name);
					//console.log(v.itemMdata.newDesInfoList[v.newsNext].name);
				});
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		},
		mounted() {
			//百度分享
			let _this = this;
			this.$nextTick(function() {
				window._bd_share_config = {
					"common": {
						"bdSnsKey": {},
						"bdText": "",
						"bdMini": "2",
						"bdPic": "",
						"bdStyle": "0",
						"bdSize": "16"
					},
					"share": {},
					/*
					"image":{
						"viewList":["qzone","tsina","tqq","renren","weixin"],
						"viewText":"分享到：",
						"viewSize":"16"
					},*/
					"selectShare": {
						"bdContainerClass": null,
						"bdSelectMiniList": ["qzone", "tsina", "tqq", "renren", "weixin"]
					}

				};
				const s = document.createElement('script');
				s.type = 'text/javascript';
				s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
				document.body.appendChild(s);
			})

			console.log($("#" + this.newDesId).parents(".freeContainer").height());
			var newDesH = $("#" + this.newDesId).height();
			if($("#" + this.newDesId).parents(".freeContainer").height() < newDesH+50) {
				var conDes = $("#" + this.newDesId).parents(".freeContainer").height(newDesH + 50);
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	
</style>