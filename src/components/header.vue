<template>
	<header class="header">
		<div class="fixedH">
			<div class="inner">
				<h1 class="logo"><a href="http://console.xiaohucloud.com/admin" class="logo" title="广东网联实业有限公司"><img src="/static/image/logo.png"/></a></h1>
				<ul>
					<li>
						<a @click="goToStr('pc')" href="javascript:;">
							<i></i><span>PC版</span>
						</a>
					</li>
					<li>
						<a @click="goToStr('m')" href="javascript:;">
							<i></i><span>手机版</span>
						</a>
					</li>
					<!--li>帮助</li>
					<li>客服</li-->
				</ul>
				<div class="h_center g-fr">
					<span> <a href="http://console.xiaohucloud.com/admin" target="_blank">会员中心</a></span>
					<!--router-link :to="preview">预览</router-link -->
					<input type="button" @click="gotoSaveCom" class="preview purpleBg" value="保存" />
					<input type="button" @click="gotoPreview" class="preview" value="预览" />
				</div>
			</div>
		</div>
	</header>
</template>
<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import api from '@/api/$ajax.js'
	export default {
		name: 'headerNav',
		data() {
			return {
				id: this.$route.params.id,
				//idPC: '1' || this.$utils.guid(),
				//paramPC:'index',
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					column_id: this.$route.query.column_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					domain_url: this.$route.query.domain_url,
					pc_version_id: this.$route.query.pc_version_id,
					mobile_version_id: this.$route.query.mobile_version_id
				},
				msg: 'header'
			}
		},
		created() {
			console.log(this.id);
		},
		methods: {
			gotoPreview: function() {
				this.setOrderId(this.param);
				var url = "";
				if(this.$route.name == 't1') {
					if(window.location.href.indexOf("product") != -1) {
						url = '/t1/prev/product/' + this.$route.params.id + "/" + this.$route.params.param + '?token=' + this.$route.query.token + '&company_id=' + this.$route.query.company_id + '&type=' + this.$route.query.type + '&pc_version_id=' + this.$route.query.pc_version_id + '&mobile_version_id=' + this.$route.query.mobile_version_id + '&productId=' + this.$route.query.productId + '&domain_url=' + this.$route.query.domain_url;
					} else if(window.location.href.indexOf("new") != -1) {
						url = '/t1/prev/new/' + this.$route.params.id + "/" + this.$route.params.param + '?token=' + this.$route.query.token + '&company_id=' + this.$route.query.company_id + '&type=' + this.$route.query.type + '&pc_version_id=' + this.$route.query.pc_version_id + '&mobile_version_id=' + this.$route.query.mobile_version_id + '&newDesId=' + this.$route.query.newDesId + '&domain_url=' + this.$route.query.domain_url;
					} else {
						url = '/t1/prev/' + this.$route.params.id + "/" + this.$route.params.param + '?token=' + this.$route.query.token + '&company_id=' + this.$route.query.company_id + '&type=' + this.$route.query.type + '&pc_version_id=' + this.$route.query.pc_version_id + '&mobile_version_id=' + this.$route.query.mobile_version_id + '&domain_url=' + this.$route.query.domain_url;
					}
				} else {
					if(window.location.href.indexOf("product") != -1) {
						url = '/t2/prev/product/' + this.$route.params.id + "/" + this.$route.params.param + '?token=' + this.$route.query.token + '&company_id=' + this.$route.query.company_id + '&type=' + this.$route.query.type + '&mobile_version_id=' + this.$route.query.mobile_version_id + '&productId=' + this.$route.query.productId + '&pc_version_id=' + this.$route.query.pc_version_id  + '&domain_url=' + this.$route.query.domain_url;
					} else if(window.location.href.indexOf("new") != -1) {
						url = '/t2/prev/new/' + this.$route.params.id + "/" + this.$route.params.param + '?token=' + this.$route.query.token + '&company_id=' + this.$route.query.company_id + '&type=' + this.$route.query.type + '&mobile_version_id=' + this.$route.query.mobile_version_id + '&newDesId=' + this.$route.query.newDesId + '&pc_version_id=' + this.$route.query.pc_version_id + '&domain_url=' + this.$route.query.domain_url;
					} else {
						url = '/t2/prev/' + this.$route.params.id + "/" + this.$route.params.param + '?token=' + this.$route.query.token + '&company_id=' + this.$route.query.company_id + '&type=' + this.$route.query.type + '&mobile_version_id=' + this.$route.query.mobile_version_id + '&pc_version_id=' + this.$route.query.pc_version_id + '&domain_url=' + this.$route.query.domain_url;
					}
				}
				window.open(window.location.origin + url);
				
				//localStorage.setItem(item.id + item.type + "itemAllSite", JSON.stringify(state.itemAllSite));
				
				this.saveloca(this.param);
			},
			gotoSaveCom() {
				if(this.$route.name == 't1') {
					this.param.version_id = this.$route.query.pc_version_id;
				} else {
					this.param.version_id = this.$route.query.mobile_version_id;
				}
				this.saveData(this.param);
			},
			goToStr(param) {
				var url = "";
				if(param == "pc") {
					api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.pc_version_id, true, {}, r => {
						if(r.code == 422) {
							console.log(r.message);
							return;
						}

						url = '/t1/' + this.$route.params.id + '/' + r.data.list[0].id + '?token=' + this.$route.query.token + '&company_id=' + this.$route.query.company_id + '&type=1'  + '&mobile_version_id=' + this.$route.query.mobile_version_id + '&pc_version_id=' + this.$route.query.pc_version_id;
						console.log(url);
						window.open(window.location.origin + url);
					});
				} else {
					api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.mobile_version_id, true, {}, r => {
						if(r.code == 422) {
							console.log(r.message);
							return;
						}
						url = '/t2/' + this.$route.params.id + '/' + r.data.list[0].id + '?token=' + this.$route.query.token + '&company_id=' + this.$route.query.company_id + '&type=2' + '&mobile_version_id=' + this.$route.query.mobile_version_id + '&pc_version_id=' + this.$route.query.pc_version_id;
						console.log(url);
						window.open(window.location.origin + url);
					});
				}
			},
			...mapActions([
				'saveData', 'saveloca'
			]),
			...mapMutations([
				'setOrderId', 'previewData'
			]),
		},
		computed: {
			...mapGetters(["state"])
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.header {
		height: 80px;
		margin-bottom: 50px;
	}
	
	.fixedH {
		box-sizing: border-box;
		width: 100%;
		height: 80px;
		margin: 0;
		background-color: #fff;
		padding: 0 40px;
		box-shadow: 0 2px 10px 0px rgba(0, 0, 0, 0.15);
		position: fixed;
		z-index: 990;
	}
	
	.inner {
		clear: both;
		overflow: hidden;
	}
	
	.h_center {
		padding-top: 20px;
		span {
			width: 100px;
			height: 35px;
			display: inline-block;
			line-height: 35px;
			margin: 0 0 0 20px;
			text-align: center;
			background: #fff;
			color: #777;
			border: 1px solid #d4d4d4;
			border-radius: 5px;
			cursor: pointer;
			transition: all 0.5s;
			-moz-transition: all 0.5s;
			-webkit-transition: all 0.5s;
			-o-transition: all 0.5s;
		}
		span:hover {
			background: #0D83ED;
			color: #FFFFFF;
			border: 1px solid #0D83ED;
		}
		.preview {
			width: 100px;
			height: 35px;
			display: inline-block;
			line-height: 35px;
			margin: 0 0 0 20px;
			text-align: center;
			background: #fff;
			color: #777;
			border: 1px solid #d4d4d4;
			border-radius: 5px;
			cursor: pointer;
			transition: all 0.5s;
			-moz-transition: all 0.5s;
			-webkit-transition: all 0.5s;
			-o-transition: all 0.5s;
		}
		.purpleBg {
			background: #0D83ED;
			color: #fff;
		}
		.preview:hover {
			background: #0D83ED;
			color: #FFFFFF;
			border: 1px solid #0D83ED;
		}
	}
	
	.logo {
		float: left;
		line-height: 80px;
		margin-right: 30px;
	}
	
	ul {
		float: left;
		li {
			float: left;
			width: 110px;
			font-weight: normal;
			border-right: 1px solid #E3E3E3;
			line-height: 80px;
			text-align: center;
			cursor: pointer;
			font-size: 14px;
			color: #555555;
			a {
				color: #555555;
				display: inline-block;
				position: relative;
				i {
					display: block;
					position: absolute;
					top: 46%;
					margin-top: -12px;
					width: 28px;
					height: 24px;
					background: url(/static/image/indexNav.png);
				}
				span {
					padding-left: 38px;
				}
			}
		}
		li:nth-child(1) a i {
			background-position: -7px -8px;
		}
		li:nth-child(2) a i {
			background-position: -40px -8px;
		}
		li:nth-child(2) a {
			i {
				width: 20px;
			}
			span {
				padding-left: 32px;
			}
		}
		li:first-child {
			border-left: 1px solid #E3E3E3;
		}
		li:hover a {
			color: #0D83ED;
		}
		li:nth-child(1):hover a i {
			background-position: -65px -8px;
		}
		li:nth-child(2):hover a i {
			background-position: -98px -8px;
		}
	}
</style>