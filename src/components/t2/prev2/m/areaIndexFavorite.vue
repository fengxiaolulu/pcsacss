<template>
	
		<div class="phoneedit areaIndexFavoriteP hove_con" :style="parentStyle">
			
			<div class="detail" :style="[itemMdata.Divstyle,backgroundDiv]">
				<p>
					<img :src="itemMdata.mImage1.url" :style="{height:itemMdata.Divstyle.lineHeight}" />
					<a href="" :style="itemMdata.Astyle" @click="SetHome(this,'http://www.xyz.com')">设为首页</a>
					<a href="" :style="itemMdata.Astyle" @click="AddFavorite('我的网站',location.href)">收藏本站</a>
				</p>
			</div>
		</div>

</template>

<script>
	
	export default {
		name: 'areaIndexFavorite',
		props: ['itemMdata'],
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
				title: "",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "600px",
					rTitle: '编辑收藏本站',
				},
				backgroundDiv: {
					backgroundImage: 'url(' + this.itemMdata.mImage0.url + ')',
				},
				icon: {
					backgroundImage: 'url(' + this.itemMdata.mImage1.url + ')',
				}
			}
		},
		methods: {
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
			},
			SetHome: function(obj, url) {
				try {
					obj.style.behavior = 'url(#default#homepage)';
					obj.setHomePage(url);
				} catch(e) {
					if(window.netscape) {
						try {
							netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
						} catch(e) {
							alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
						}
					} else {
						alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
					}
				}
			},
			AddFavorite: function(title, url) {
				try {
					window.external.addFavorite(url, title);
				} catch(e) {
					try {
						window.sidebar.addPanel(title, url, "");
					} catch(e) {
						alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
					}
				}
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
			background-repeat: no-repeat;
			background-position: center;
			p {
				a {
					border-right: 1px solid #E3E3E3;
					padding: 0 5px;
				}
				a:nth-last-child(1) {
					border: none;
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