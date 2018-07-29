<template>
	
		<div class="serviceOnline hove_con" @click="linkUrl" :style="parentStyle" :id="itemMdata.serviceOnlineId">
			<div class="detail" :style="itemMdata.serIdStyle">
				<div class="styleone" v-if="itemMdata.styleShow == 1">
					<div class="kefu">
						<p class="title">在线客服</p>
						<ul>
							<li class="text" v-for="table in itemMdata.serviceOnlineTable" :style="{float:itemMdata.float}">
								<a target="_blank" rel="nofollow" title="业务经理" :href="table.openUrl"><img :src="itemMdata.icon" @mousedown="defaultStop($event)"></img>
								<span>{{table.online_name}}</span></a>
							</li>
						</ul>
					</div>
					<div class="time">
						<p class="title">工作时间</p>
						<p class="text" v-for="(item,idx) in itemMdata.time">
							<span>{{item.date_begin}}至{{item.date_end}}</span>
							<span>{{item.time_begin}}-{{item.time_end}}</span>
						</p>
					</div>
				</div>
				<div class="styletwo" v-show="itemMdata.styleShow == 2">
					<div class="floating_ck">
						<dl>
							<dt></dt>
							<dd v-for="itJ in itemMdata.floatPhone" class="consult" :style="itemMdata.fWtyle">
								<span :style="[{color:itemMdata.fWtyle.color}]">在线咨询</span>
								<div class="floating_left" :style="itemMdata.fWltyle">
									<a href="" :style="[{color:itemMdata.fWltyle.color}]">{{itJ.contact_content}}</a>
								</div>
							</dd>
							<dd v-if="itJ.online_type==1" v-for="itJ in itemMdata.serviceOnlineTable" class="words" :style="itemMdata.fWtyle">
								<span :style="[{color:itemMdata.fWtyle.color}]">在线QQ</span>
								<div class="floating_left" :style="itemMdata.fWltyle">
									<a target="_blank" rel="nofollow" title="" :href="itJ.openUrl">问题在线咨询</a>
								</div>
							</dd>
							<!--dd class="qrcord" :style="itemMdata.fWtyle">
								<span :style="[{color:itemMdata.fWtyle.color}]">微信公众号</span>
								<div class="floating_left floating_ewm" :style="itemMdata.fWltyle">
									<img :src="itemMdata.floatPublic.url" />
									<p class="qrcord_p01" :style="[{color:itemMdata.fWltyle.color}]">扫一扫<br>感谢您的关注！</p>
								</div>
							</dd-->
							<dd v-if="itWx.online_type==2" v-for="itWx in itemMdata.serviceOnlineTable" class="qrcord" :style="itemMdata.fWtyle">
								<span :style="[{color:itemMdata.fWtyle.color}]">{{itWx.online_account}}</span>
								<div class="floating_left floating_ewm2" :style="itemMdata.fWltyle">
									<img :src="itWx.online_image" />
									<p class="qrcord_p01" :style="[{color:itemMdata.fWltyle.color}]">扫一扫<br>了解更多信息！</p>
								</div>
							</dd>
							<dd class="returnTop" :style="itemMdata.fWtyle" @click="toTop()">
								<span>返回顶部</span>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>
	
</template>

<script>
	import api from '@/api/$ajax.js'
	export default {
		name: 'serviceOnline',
		props: ['itemMdata'],
		created() {
			this.parentStyle.top=this.itemMdata.parentStyle.top+"px";
			this.parentStyle.left=this.itemMdata.parentStyle.left+"px";
			this.parentStyle.position="absolute";
			this.parentStyle.width=this.itemMdata.parentStyle.width+"px";
			this.parentStyle.height=this.itemMdata.parentStyle.height+"px";
			this.getData();
		},
		data() {
			return {
				token:this.$route.query.token,
				parentStyle: {

				}
			}
		},
		mounted(){
			goTop.serReturnTop(this.itemMdata.serviceOnlineId,this.itemMdata);
		},
		methods: {
			getData(){	
				var v = this;				
				api.get('/api/data/kfList?token='+this.token,true,{},function(data){
						//console.log(data)
						for(var i = 0;data.data.length>i;i++) {							
							if(data.data[i].online_type==1){//http://wpa.qq.com/msgrd?v=3&uin=896115118&site=qq&menu=yes
								data.data[i].openUrl = "http://wpa.qq.com/msgrd?v=3&uin="+data.data[i].online_account+"&site=qq&menu=yes"							
							}
						}
						v.itemMdata.serviceOnlineTable = data.data;
					}
				)
				api.get('/api/data/worktimeList?token='+this.token,true,{},function(data){
						console.log(data);
						v.itemMdata.time = data.data;
					}
				)
				api.get('/api/data/contactList?token='+this.token,true,{},function(data){
						console.log(data);						
						v.itemMdata.floatPhone = data.data;
					}
				)
				
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