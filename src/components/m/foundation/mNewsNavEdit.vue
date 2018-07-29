<template>
	<div class="productNavEdit">
		<div class="top">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">展示设置</p>
			<p @click="changetype(3)" :class="{active:typenumber == 3}">编辑样式</p>
		</div>
		<div class="one" v-if="typenumber == 1">
			<div class="name">
				<p>
					<span>模块标题：</span><input type="text" v-model="itemMdata.navName"/>
				</p>
				<div class="style clearfloat">
					<span>模块样式：</span>
					<ul>
						<li class="fl"  v-for="(item,idx) in imgSrc" @click="curMapStyle(item,idx)">
							<img :src="item"/>
						</li>
					</ul>
					
				</div>
				<div class="margin clearfloat">
					<span>导航项：</span>
					<p @click="itemMdata.margin_hid = false" class="fl">
						<input type="radio" name="margin" id="default" :checked="itemMdata.margin_hid== false"/>
						<label for="default">使用新闻分类</label>
					</p>
					<p @click="itemMdata.margin_hid = true" class="fl">
						<input type="radio" name="margin" id="custom" :checked="itemMdata.margin_hid" />
						<label for="custom">自定义</label>
					</p>
					<p class="fr">
						<input type="button" v-if="itemMdata.margin_hid == false" value="管理分类" @click="visibleNav()"/>
						<input type="button" v-if="itemMdata.margin_hid == true" value="添加项" @click="visibleNavAdd()"/>
					</p>
				</div>
			</div>
			<div class="managerType" v-if="itemMdata.margin_hid == false">
				<p class="clearfloat"><span class="fl">新闻分类名称</span></p>
				<ul class="mType">
					<li v-for="item in itemMdata.routerProductNav.navItem">
						<span>{{item.tText}}</span>
						<ul class="sec_con">
							<li v-for="second in item.secondNav">
								<span>{{second.tText}}</span>
								<ul class="third_item " v-for="third in second.thirdNav">
									<li>
										<span>{{third.tText}}</span>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="freeType" v-if="itemMdata.margin_hid == true">
				<p class="clearfloat"><span class="fl">新闻分类名称</span><span class="fl">链入产品</span><span class="fr txtR">操作</span></p>
				<ul class="mTypeTwo">
					<li v-for="(item,idx) in itemMdata.routerProductNav.productNavSelected"  @click="goMoved(item,idx,$event)">
						<p class="clearfloat" ref="idx">
							<span class="fl"  v-if="form.idxE!=idx ||inputShow==false">{{item.productName}}</span>
							<input  class="fl" type="text" v-model="form.name" v-if="form.idxE==idx&&inputShow==true" @blur="editHidden(item,idx)" autofocus="autofocus"/>
							<span class="fl">{{item.typeP}}</span>
							<span class="fl moved">
								<a class="goup" title="上移" v-if="idx!=0"></a>
								<a class="godown" title="下移" v-if="idx!=itemMdata.routerProductNav.productNavSelected.length-1"></a>
								<a class="goleft" title="左移" v-if="!idx && idx!=0" ></a>
								<a class="goright" title="右移" v-if="idx!=0"></a>
							</span>
							<span class="fr txtR">
								<i class="editBtn" @click="editSecon(item,idx)" :id="form.idxE"></i>
								<i class="deleteBtn" @click="deleteSelect(item)"></i>
							</span>
						</p>
						<ul class="sec_con" v-if="item.secondNavList">
							<li v-for="(second,idxsec) in item.secondNavList">
								<p class="clearfloat">
									<span class="fl"  v-if="form.idxE!=idxsec ||inputShow==false">{{second.productName}}</span>
									<input class="fl" type="text" v-model="form.name" v-if="form.idxE==idxsec&&inputShow==true" @blur="editHidden(second,idxsec)" autofocus="autofocus"/>
									<span class="fl">{{second.typeP}}</span>
									<span class="fl moved">
										<a class="goup" title="上移" v-if="idx!=0"></a>
										<a class="godown" title="下移" v-if="idxsec!=item.secondNavList.length-1"></a>
										<a class="goleft" title="左移" v-if="idxsec ==0" ></a>
										<a class="goright" title="右移" v-if="idxsec!=0"></a>
									</span>
									<span class="fr txtR">
										<i class="editBtn" @click="editSecon(second,idxsec)" :id="form.idxE"></i>
										<i class="deleteBtn" @click="deleteSelect(second)"></i>
									</span>
								</p>
								
								<!--<ul class="third_item " v-if="second.secondNavList>0">
									<li v-for="(third,idx) in second.secondNavList">
										<p class="clearfloat">
											<span class="fl"  v-if="form.idxE!=idx ||inputShow==false">{{third.productName}}</span>
											<input  class="fl" type="text" v-model="form.name" v-if="form.idxE==idx&&inputShow==true" @blur="editHidden(third,idx)" autofocus="autofocus"/>
											<span class="fl">{{third.typeP}}</span>
											<span class="fl moved">
												<a class="goup" title="上移" v-if="idx!=0"></a>
												<a class="godown" title="下移" v-if="idx!=itemMdata.routerProductNav.productNavSelected.length-1"></a>
												<a class="goleft" title="左移" v-if="idx!=0" ></a>
												<a class="goright" title="右移" v-if="idx!=0" @click="goright(third,idx)"></a>
											</span>
											<span class="fr txtR">
												<i class="editBtn" @click="editSecon(third,idx)" :id="form.idxE"></i>
												<i class="deleteBtn" @click="deleteSelect(third)"></i>
											</span>
										</p>
									</li>
								</ul>-->
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="two" v-if="typenumber == 2">
			<div class="name">
				<p>
					<span>打开方式：</span>
					<select>
						<option value="当前窗口打开">当前窗口打开</option>
						<option value="新窗口">新窗口</option>
					</select>
				</p>
				<div class="margin clearfloat">
					<span>插入分类图标：</span>
					<p @click="margin_hid = false" class="fl">
						<input type="radio" name="margin" id="default" checked="checked" />
						<label for="default">是</label>
					</p>
					<p @click="margin_hid = true" class="fl">
						<input type="radio" name="margin" id="custom" />
						<label for="custom">否</label>
					</p>
				</div>
				<div class="margin clearfloat">
					<span>使用组合条件：</span>
					<p  class="fl">
						<input type="radio" name="open" id="open1" checked="checked" />
						<label for="open1">是</label>
					</p>
					<p  class="fl">
						<input type="radio" name="open" id="open2" />
						<label for="open2">否</label>
					</p>
				</div>
				
			</div>
			<p class="bgY">组合条件是指：设置该选项后，不同的分组条件点击后可进行组合筛选。</p>
			
		</div>
		<div class="three" v-if="typenumber == 3">
			<h3>标题样式</h3>
			<p class="p1">
				<span>标题大小：</span>
				<input type="text" v-model="itemMdata.titleStyle.fontSize" placeholder="如12px"/>
				<span>标题颜色：</span>
				<el-color-picker v-model="itemMdata.titleStyle.color" size="medium"></el-color-picker>
			</p>
			<p>
				<span>标题字体：</span>
				<span>加粗</span>
				<input type="radio" name="boldYes" @click="boldYes()" :checked="itemMdata.showBold==1"/>
				<span>默认</span>
				<input type="radio" name="boldYes"  @click="boldNo()" :checked="itemMdata.showBold==2"/>
			</p>
			<p>
				<span>标题位置：</span>
				<span>居中</span>
				<input type="radio" name="poC" @click="poCenter()" :checked="itemMdata.tAlign==1"/>
				<span>左对齐</span>
				<input type="radio"  name="poC" @click="poLeft()" :checked="itemMdata.tAlign==2"/>
				<span>右对齐</span>
				<input type="radio"  name="poC" @click="poRight()" :checked="itemMdata.tAlign==3"/>
			</p>
			<p>
				<span>标题行高：</span>
				<input type="text" v-model="itemMdata.titleStyle.lineHeight" placeholder="如12px"/>
			</p>
			<div class="borderStyle">
				<p>
					<p>
						<span>是否显示边框：</span>
						<span>是</span>
						<input type="radio" name="showB" @click="showBY()" :checked="itemMdata.showBorder==1"/>
						<span>否</span>
						<input type="radio"  name="showB" @click="showBN()"  :checked="itemMdata.showBorder==2"/>
					</p>
					<el-form>
						<el-form-item label="边框样式：" style="{marginBottom:0;}">
							<el-select v-model="itemMdata.titleStyle.borderBottomStyle" placeholder="请选择线">
								<el-option v-for="item in line" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<span>边框宽度：</span>
					<input type="text" v-model="itemMdata.titleStyle.borderWidth" placeholder="如3px"/>
					<span>边框颜色：</span>
					<el-color-picker v-model="itemMdata.titleStyle.borderColor" size="medium"></el-color-picker>
					
				</p>
			</div>
			<div class="typeOne">
				<h3>分类样式</h3>
				<p class="p1">
					<span>分类大小：</span>
					<input type="text" v-model="itemMdata.typeStyle.fontSize" placeholder="如12px"/>
					<span>分类颜色：</span>
					<el-color-picker v-model="itemMdata.typeStyle.color" size="medium"></el-color-picker>
					
				</p>
				<p>
					<span>分类字体：</span>
					<span>加粗</span>
					<input type="radio" name="typeboldYes" @click="typeboldYes()" :checked="itemMdata.showTypeBold==1"/>
					<span>默认</span>
					<input type="radio" name="typeboldYes" @click="typeboldNo()" :checked="itemMdata.showTypeBold==2"/>
				</p>
				<p>
					<span>分类行高：</span>
					<input type="text" v-model="itemMdata.typeStyle.lineHeight" placeholder="如12px"/>
				</p>
				<p>
					<span>分类位置：</span>
					<span>居中</span>
					<input type="radio" name="typepoC" @click="typepoCenter()" :checked="itemMdata.showTypetAlign==1"/>
					<span>左对齐</span>
					<input type="radio"  name="typepoC" @click="typepoLeft()" :checked="itemMdata.showTypetAlign==2"/>
					<span>右对齐</span>
					<input type="radio"  name="typepoC" @click="typepoRight()" :checked="itemMdata.showTypetAlign==3"/>
				</p>
				<div class="borderStyle">
					<p>
						<p>
							<span>是否显示边框：</span>
							<span>是</span>
							<input type="radio" name="typeshowB" @click="typeshowBY()" :checked="itemMdata.showTypeBN==1"/>
							<span>否</span>
							<input type="radio"  name="typeshowB" @click="typeshowBN()" :checked="itemMdata.showTypeBN==2"/>
						</p>
						<el-form>
							<el-form-item label="边框样式："  style="{marginBottom:0;}">
								<el-select v-model="itemMdata.typeStyle.borderBottomStyle" placeholder="请选择线">
									<el-option v-for="item in line" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
						<span>边框宽度：</span>
						<input type="text" v-model="itemMdata.typeStyle.borderWidth" placeholder="如3px"/>
						<span>边框颜色：</span>
						<el-color-picker v-model="itemMdata.typeStyle.borderColor" size="medium"></el-color-picker>
						
					</p>
				</div>
			</div>
		</div>
		<el-dialog title="新闻分类管理" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">					
					<productNavDialog :itemMdata="itemMdata" v-on:recoent="recoent"></productNavDialog>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisibleNav = false">取 消</el-button>
				<el-button type="primary" @click="addVisibleNav=false">保 存</el-button>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mNewsNavDialog from './mNewsNavDialog.vue' //编辑栏目导航
	export default {
		name: 'productNavEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '编辑产品导航',
				dialogImageUrl: '',
				dialogVisible: false,
				typenumber:'1',
				type_hid:true,
				type_hid2:false,
				addVisibleNav: false,
				imgSrc:['../../../../static/image/productNav1.jpg','../../../../static/image/productNav2.jpg'],
				//margin_hid:false
				inputShow:false,
				form: {
					name: '',
					idxE:'',
					cusLink: '',
					openByNewPage: '',
					navType: '',
					upArea: '',
					openWith: ""
				},
				line: [{
					value: 'solid',
					label: '实线'
				}, {
					value: 'dashed',
					label: '虚线'
				}, {
					value: 'dotted',
					label: '点线'
				}, {
					value: 'double',
					label: '双线'
				}],
			}
		},
		components:{
			mNewsNavDialog
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
			showBY(){
				this.itemMdata.titleStyle.borderBottom = '1px solid #ccc';
				this.itemMdata.showBorder = 1;
			},
			showBN(){
				this.itemMdata.titleStyle.borderBottom = 'none';
				this.itemMdata.showBorder = 2;
			},
			poCenter(){
				this.itemMdata.titleStyle.textAlign = 'center';
				this.itemMdata.tAlign=1;
			},
			poLeft(){
				this.itemMdata.titleStyle.textAlign = 'left';
				this.itemMdata.tAlign=2;
			},
			poRight(){
				this.itemMdata.titleStyle.textAlign = 'right';
				this.itemMdata.tAlign=3;
			},
			boldYes(){
				this.itemMdata.titleStyle.fontWeight = 'bold';
				this.itemMdata.showBold = 1;
			},
			boldNo(){
				this.itemMdata.titleStyle.fontWeight = 'normal';
				this.itemMdata.showBold = 2;
			},
			typeshowBY(){
				this.itemMdata.typeStyle.borderBottom = '1px solid #ccc';
				this.itemMdata.showTypeBN = 1;
			},
			typeshowBN(){
				this.itemMdata.typeStyle.borderBottom = 'none';
				this.itemMdata.showTypeBN = 2;
			},
			typepoCenter(){
				this.itemMdata.typeStyle.textAlign = 'center';
				this.itemMdata.showTypetAlign = 1;
			},
			typepoLeft(){
				this.itemMdata.typeStyle.textAlign = 'left';
				this.itemMdata.showTypetAlign = 2;
			},
			typepoRight(){
				this.itemMdata.typeStyle.textAlign = 'right';
				this.itemMdata.showTypetAlign = 3;
			},
			typeboldYes(){
				this.itemMdata.typeStyle.fontWeight = 'bold';
				this.itemMdata.showTypeBold = 1;
			},
			typeboldNo(){
				this.itemMdata.typeStyle.fontWeight = 'normal';
				this.itemMdata.showTypeBold = 2;
			},
			/*
			goRight(item,index){
				this.itemMdata.routerProductNav.productNavSelected[index-1].secondNavList.push(arr);
				this.itemMdata.routerProductNav.productNavSelected.splice(this.itemMdata.routerProductNav.productNavSelected.indexOf(item), 1);
			},
			goLeft(itemL,indexL){
				let j = index+1;
				this.itemMdata.routerProductNav.productNavSelected.splice(j,0,item.secondNavList[index]);
				this.itemMdata.routerProductNav.productNavSelected[index].secondNavList.splice(this.itemMdata.routerProductNav.productNavSelected[index].secondNavList.indexOf(item), 1)
			}
			*/
			goMoved(item,index,e){
				var arr= JSON.parse(JSON.stringify(item));
				if(e.target.className == 'goright'){
					console.log(arr)
					if(index!=0){
						this.itemMdata.routerProductNav.productNavSelected[index-1].secondNavList.push(arr);
						this.itemMdata.routerProductNav.productNavSelected.splice(this.itemMdata.routerProductNav.productNavSelected.indexOf(item), 1);
					}
				}
				if(e.target.className == 'goleft'){
					let j = index+1;
					this.itemMdata.routerProductNav.productNavSelected.splice(j,0,item.secondNavList[index]);
					this.itemMdata.routerProductNav.productNavSelected[index].secondNavList.splice(this.itemMdata.routerProductNav.productNavSelected[index].secondNavList.indexOf(item), 1)
					
				}
			},
			
			editHidden(curObj,idx){
				this.inputShow = false;
				curObj.productName = this.form.name ;
				idx = this.form.idxE ;
			},
			editSecon(curObj,idx) {
				//console.log(2)
				this.inputShow = true;
				this.form.name = curObj.productName ;
				this.form.idxE = idx;
				
			},
			deleteSelect: function(select) {
				this.itemMdata.routerProductNav.productNavSelected.splice(this.itemMdata.routerProductNav.productNavSelected.indexOf(select), 1);
			},
			curMapStyle(item, idx) {
				this.itemMdata.productNavLayout = idx;
			},
			changetype:function(number){
				this.typenumber = number
			},
			visibleNav() {				
				this.addVisibleNav = true;
				this.itemMdata.routerProductNav.isProduct = false;
				console.log("ssd");
			},
			visibleNavAdd(){
				this.addVisibleNav = true;
				this.itemMdata.routerProductNav.isProduct = true;
			},
			recoent(i) {			
				this.itemMdata.sibleItem.push(i.url);
				for(var i = 0;this.itemMdata.sibleItem.length>i;i++){
					this.itemMdata.imgItem[i] = this.itemMdata.sibleItem[i];										
				}
				console.log("ddssss");
				//console.log(this.itemMdata.imgItem);
				
			},
			onResize: function(x, y, width, height) {
				this.parentStyle.left = x;
				this.parentStyle.top = y;
				this.parentStyle.width = width;
				this.parentStyle.height = height;
				this.itemMdata.parentStyle = this.parentStyle;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.clearfloat:after {display: block;clear: both;content: "";visibility: hidden;height: 0;}
	.fl {float: left;}
	.fr{float: right;}
	.productNavEdit {
		box-sizing: border-box;
		height: 450px;
		overflow: auto;
		.top {
			clear: both;
			overflow: hidden;
			padding-left: 10px;
			background: #F5F5F5;
			border-bottom: 1px solid #CCCCCC;
			p {
				float: left;
				padding: 0 15px;
				line-height: 35px;
				border: 1px solid #E3E3E3;
			}
			.active {
				background: #FFFFFF;
				color: #409EFF;
			}
		}
		.one,.two,.three{
			padding:10px;
			.typeOne{
				h3{
					margin-top:20px;
				}
			}
			
			.name{
				padding-left:30px;
				vertical-align:top;
				p{
					input{
						border:1px solid #ccc;
						padding:0 5px;
					}
					select{border:1px solid #ccc;padding:0 5px 3px 5px;}
				}
				.style{
					padding-top:20px;
					span{
						display:inline-block;
						float:left;
					}
					ul{float:left;
						li{border:1px solid #fff;}
						li:hover{border:1px solid #66b1ff;}
					}
				}
				.margin{
					padding:10px;
					span{display:inline-block;float:left;}
					p{margin-right:10px;}
					
				}
				
				
			}
			.bgY{    
				margin:0 auto;
				border: 1px solid #f4e190;
				background: #fff6d0;
				text-align:center;
			}
			.managerType,.freeType{
				width:100%;
				border:1px solid #ccc;
				input{width:24%;}
				p{
					border-bottom:1px solid #ccc;
					background-color:#F5F5FF;
					padding:10px;
					span{display:inline-block;width:25%;text-align:center;}
					span:first-child{text-align:left;}
					.txtR{
						text-align:right;
						.editBtn,.deleteBtn{
							background: url('/static/image/mbg01.png') 0 -185px;
							height: 20px;
							width: 20px;
							cursor: pointer;
							display: inline-block;
							vertical-align: bottom;
							margin-right: 17px;
						}
						.deleteBtn{
							background: url('/static/image/mbg01.png') -28px -185px;
							margin-right: 0;
						}
					}
				}
				.mTypeTwo{
					p{background-color:#F5F5F5;}
					
					p:hover{
						color: #FFFFFF;
						background: #5874d8;
					}
					.moved{
						a{
							display:inline-block;
							width: 20px;
    						height: 27px;
							text-decoration: none;
						}
						.goup{
							background: url('/static/image/bg02.png') -251px -421px no-repeat;
						}
						.godown{
							background: url('/static/image/bg02.png') -270px -421px no-repeat;
						}
						.goleft{
							background: url('/static/image/bg02.png') -289px -421px no-repeat;
						}
						.goright{
							background: url('/static/image/bg02.png') -308px -421px no-repeat;
						}
					}
					.sec_con{
						margin-left:20px;
						.third_item{
							margin-left:20px;
						}
					}
				}
				
				.mType{
					li{
						span{
							display:block;
							width:96%;
							padding:5px;
							margin:7px;
							background-color:#F5F5F5;
						}
						.sec_con{
							margin-left:20px;
							.third_item{
								margin-left:20px;
							}
						}
					}
				}
			}
			.p1{
				span{
					vertical-align: middle;
				}
				
			}
			input[type=text]{
				border:1px solid #ccc;
			}
		}
	}
</style>