<template>
	<div class="sidebarEdit">
		<div class="top">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">内容区</p>
		</div>
		<div class="one" v-if="typenumber==1">
            <div class="oneLevel">
                 <h3>全局样式设置</h3>
                 <p>
                    <span>背景颜色：</span>
                    <el-color-picker v-model="itemMdata.ulStyle.backgroundColor" size="medium"></el-color-picker>
                </p>
               
               
                <h3>一级设置</h3>
                <div class="setoneLevel">
                    <div>
                        <span>加粗</span><input type="radio" :checked="itemMdata.oneStyle.checked" @click="isBold()"/>
                    </div>
                    
                    <div>
                        <span>文本对齐方式:</span>
                        <span>左对齐</span><input type="radio" name="txt" :checked="itemMdata.oneStyle.textAlign=='left'" @click="itemMdata.oneStyle.textAlign='left'"/>
                        <span>右对齐</span><input type="radio" name="txt" :checked="itemMdata.oneStyle.textAlign=='right'" @click="itemMdata.oneStyle.textAlign='right'"/>
                        <span>居中</span><input type="radio" name="txt" :checked="itemMdata.oneStyle.textAlign=='center'" @click="itemMdata.oneStyle.textAlign='center'"/>
                    </div>

                    <p>
                        <span>字体大小</span>
                        <input type="text" v-model="itemMdata.oneStyle.fontSize"/>
                    </p>
                    <p>
                        <span>字体行高</span>
                        <input type="text" v-model="itemMdata.oneStyle.lineHeight"/>
                    </p>
                    <p>
                        <span>左填充</span>
                        <input type="text" v-model="itemMdata.oneStyle.paddingLeft"/>
                    </p>
                    <p>
                        <span>右填充</span>
                        <input type="text" v-model="itemMdata.oneStyle.paddingRight"/>
                    </p>
                    <p>
                        <span>上填充</span>
                        <input type="text" v-model="itemMdata.oneStyle.paddingTop"/>
                    </p>
                    <p>
                        <span>下填充</span>
                        <input type="text" v-model="itemMdata.oneStyle.paddingBottom"/>
                    </p>
                    <p>
                        <span>字体颜色</span>
                        <el-color-picker v-model="itemMdata.oneStyle.color" size="medium"></el-color-picker>
                    </p>
                    <p>
                        <span>背景颜色：</span>
                        <el-color-picker v-model="itemMdata.oneStyle.backgroundColor" size="medium"></el-color-picker>
                    </p>
                   
                </div>
                
            </div>
            <div>
                <p>
                    <span>图片：</span>
                    <button @click="vbgFun(1)">修改图片</button>
                </p>
                <div class="imgBox" v-show="itemMdata.oneImg">
                    <img :src="itemMdata.sidebarAll.url" />
                    <span @click="deleteListIcon(1)" class="hid"></span>
                </div>
            </div>
            <div class="twoLevel">
                <h3>二级设置</h3>
                <div class="settwoLevel">
                    <div>
                        <span>文本对齐方式:</span>
                        <span>左对齐</span><input type="radio" name="txtTwo" :checked="itemMdata.twoStyle.textAlign=='left'" @click="itemMdata.twoStyle.textAlign='left'"/>
                        <span>右对齐</span><input type="radio" name="txtTwo" :checked="itemMdata.twoStyle.textAlign=='right'" @click="itemMdata.twoStyle.textAlign='right'"/>
                        <span>居中</span><input type="radio" name="txtTwo" :checked="itemMdata.twoStyle.textAlign=='center'" @click="itemMdata.twoStyle.textAlign='center'"/>
                    </div>
                    <p>
                        <span>字体大小</span>
                        <input type="text" v-model="itemMdata.twoStyle.fontSize"/>
                    </p>
                    <p>
                        <span>字体行高</span>
                        <input type="text" v-model="itemMdata.twoStyle.lineHeight"/>
                    </p>
                    <p>
                        <span>左填充</span>
                        <input type="text" v-model="itemMdata.twoStyle.paddingLeft"/>
                    </p>
                    <p>
                        <span>右填充</span>
                        <input type="text" v-model="itemMdata.twoStyle.paddingRight"/>
                    </p>
                    <p>
                        <span>上填充</span>
                        <input type="text" v-model="itemMdata.twoStyle.paddingTop"/>
                    </p>
                    <p>
                        <span>下填充</span>
                        <input type="text" v-model="itemMdata.twoStyle.paddingBottom"/>
                    </p>
                    <p>
                        <span>字体颜色</span>
                        <el-color-picker v-model="itemMdata.twoStyle.color" size="medium"></el-color-picker>
                    </p>
                    <p>
                        <span>背景颜色：</span>
                        <el-color-picker v-model="itemMdata.twoStyle.backgroundColor" size="medium"></el-color-picker>
                    </p>
                     <p>
                        <span>左边距</span>
                        <input type="text" v-model="itemMdata.twoStyleMargin.marginLeft"/>
                    </p>
                    <p>
                        <span>右边距</span>
                        <input type="text" v-model="itemMdata.twoStyleMargin.marginRight"/>
                    </p>
                    <p>
                        <span>上边距</span>
                        <input type="text" v-model="itemMdata.twoStyleMargin.marginTop"/>
                    </p>
                    <p>
                        <span>下边距</span>
                        <input type="text" v-model="itemMdata.twoStyleMargin.marginBottom"/>
                    </p>
                </div>
            </div>
            <div>
                <p>
                    <span>图片：</span>
                    <button @click="vbgFun(2)">修改图片</button>
                </p>
                <div class="imgBox" v-show="itemMdata.twoImg">
                    <img :src="itemMdata.arrowImage.url" />
                    <span @click="deleteListIcon(2)" class="hid"></span>
                </div>
            </div>
            <div>
                <span>边框样式：</span>
                <el-select v-model="itemMdata.twoStyle.borderStyle" placeholder="无">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
           
            <div class="serBorder">
                <span>上边框:</span>
                <label>宽度</label><input type="text" v-model="itemMdata.twoStyle.borderTopWidth"/>
                <p>
                    <label>颜色</label><el-color-picker show-alpha color-format="rgb" v-model="itemMdata.twoStyle.borderTopColor"></el-color-picker>
                </p>
                <span>下边框:</span>
                <label>宽度</label><input type="text" v-model="itemMdata.twoStyle.borderBottomWidth"/>
                <p>
                    <label>颜色</label>
                    <el-color-picker show-alpha color-format="rgb" v-model="itemMdata.twoStyle.borderBottomColor"></el-color-picker>
                </p>
                <span>左边框:</span>
                <label>宽度</label><input type="text" v-model="itemMdata.twoStyle.borderLeftWidth"/>
                <p><label>颜色</label><el-color-picker show-alpha color-format="rgb" v-model="itemMdata.twoStyle.borderLeftColor"></el-color-picker></p>
                <span>右边框:</span>
                <label>宽度</label><input type="text" v-model="itemMdata.twoStyle.borderRightWidth"/>
                <p><label>颜色</label><el-color-picker show-alpha color-format="rgb" v-model="itemMdata.twoStyle.borderRightColor"></el-color-picker></p>
            </div>
            <div class="thirdLevel">
                <h3>三级设置</h3>
                <div class="setthirdLevel">
                    
                    <p>
                        <span>字体大小</span>
                        <input type="text" v-model="itemMdata.thirdStyle.fontSize"/>
                    </p>
                    <p>
                        <span>字体行高</span>
                        <input type="text" v-model="itemMdata.thirdStyle.lineHeight"/>
                    </p>
                    <p>
                        <span>左填充</span>
                        <input type="text" v-model="itemMdata.thirdStyle.paddingLeft"/>
                    </p>
                    <p>
                        <span>右填充</span>
                        <input type="text" v-model="itemMdata.thirdStyle.paddingRight"/>
                    </p>
                    <p>
                        <span>上填充</span>
                        <input type="text" v-model="itemMdata.thirdStyle.paddingTop"/>
                    </p>
                    <p>
                        <span>下填充</span>
                        <input type="text" v-model="itemMdata.thirdStyle.paddingBottom"/>
                    </p>
                    <p>
                        <span>字体颜色</span>
                        <el-color-picker v-model="itemMdata.thirdStyle.color" size="medium"></el-color-picker>
                    </p>
                    <p>
                        <span>背景颜色：</span>
                        <el-color-picker v-model="itemMdata.thirdStyle.backgroundColor" size="medium"></el-color-picker>
                    </p>
                </div>
            </div>
            <div>
                <p>
                    <span>图片：</span>
                    <button @click="vbgFun(3)">修改图片</button>
                </p>
                <div class="imgBox" v-show="itemMdata.thirdImg">
                    <img :src="itemMdata.thirdImgicon.url" />
                    <span @click="deleteListIcon(3)" class="hid"></span>
                </div>
            </div>
        </div>
		<div class="two" v-if="typenumber==2">
        
        </div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==2" :itemMdata="itemMdata.arrowImage"></mImageEdit>
					<mImageEdit v-if="flag==1" :itemMdata="itemMdata.sidebarAll"></mImageEdit>
					<mImageEdit v-if="flag==3" :itemMdata="itemMdata.thirdImgicon"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="addVisibleNav = false">取 消</el-button>
		    <el-button type="primary" @click="addVisibleFun">保 存</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	export default {
		name: 'areaLocationEdit',
		props: ['itemMdata'],
		components: {
			mImageEdit
		},
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false,
				color1: '#409EFF',
				color2: '#409EFF',
				color3: '#409EFF',
				typenumber:'1',
				options: [{
					value: 'none',
					label: '无'
				},{
					value: 'solid',
					label: '————'
				}, {
					value: 'dashed',
					label: '············'
				}, {
					value: 'dotted',
					label: '------------'
				}],
				value: '',
				margin_hid: true,
				border_hid: true,
				position_hid:true,
				options2: [{
					value: '微软雅黑',
					label: '微软雅黑'
				}, {
					value: '宋体',
					label: '宋体'
				}, {
					value: '黑体',
					label: '黑体'
				}, {
					value: '幼圆',
					label: '幼圆'
				}],
				value2: '',
				text_hid: true,
				high_hid: true,
				bg_hid: true,
				icon_hid: true,
				boldCur:false,
				pboldCur:false,
				underlineCur:false,
				punderlineCur:false,
				borderTopcur:false,
				borderBottomcur:false,
				borderLeftcur:false,
				borderRightcur:false,
				addVisibleNav: false,
				flag:1
			}
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
            isBold(){
                this.itemMdata.oneStyle.checked = ! this.itemMdata.oneStyle.checked
                 this.itemMdata.oneStyle.fontWeight = this.itemMdata.oneStyle.checked ? "bold" : "normal"
            },
			deleteList: function(list) {
				this.itemMdata.mImage0.url = '';
				
			},
			deleteListIcon(num){
                if(num==1){
                    this.itemMdata.oneImg = false;
                    this.itemMdata.sidebarAll.url = '';
                }
				if(num==2){
                    this.itemMdata.twoImg = false;
                    this.itemMdata.arrowImage.url = '';
                }
                if(num==3){
                    this.itemMdata.thirdImg = false;
                    this.itemMdata.thirdImgicon.url = '';
                }
			},
			
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
                if(flag==1){
                    this.itemMdata.oneImg = true;
                }
				if(flag==2){
                    this.itemMdata.twoImg = true;
                }
                if(flag==2){
                    this.itemMdata.thirdImg = true;
                }
			},
			addVisibleFun() {
				this.addVisibleNav = false;
			},
			changetype:function(number){
				this.typenumber = number
			},
			bold:function() {
				if(itemMdata.position_hid){
					this.pboldCur = !this.pboldCur;
					this.itemMdata.Divstyle.fontWeight = this.pboldCur ? 'bold' : 'normal';
				}
				if(itemMdata.text_hid){
					this.boldCur = !this.boldCur;
					this.itemMdata.Astyle.fontWeight = this.boldCur ? 'bold' : 'normal';
				}
				
			},
			underline:function() {
				if(itemMdata.position_hid){
					this.punderlineCur = !this.punderlineCur;
					this.itemMdata.Divstyle.textDecoration = this.punderlineCur ? 'underline' : 'none';
				}
				if(itemMdata.text_hid){
					this.underlineCur = !this.underlineCur;
					this.itemMdata.Astyle.textDecoration = this.underlineCur ? 'underline' : 'none';
				}
				
			},
			borderTop:function(){
				this.borderTopcur = !this.borderTopcur;
				this.itemMdata.Divstyle.borderTopStyle = this.borderTopcur ? 'none' : this.itemMdata.Divstyle.borderStyle;
			},
			borderBottom:function(){
				this.borderBottomcur = !this.borderBottomcur;
				this.itemMdata.Divstyle.borderBottomStyle = this.borderBottomcur ? 'none' : this.itemMdata.Divstyle.borderStyle;
			},
			borderLeft:function(){
				this.borderLeftcur = !this.borderLeftcur;
				this.itemMdata.Divstyle.borderLeftStyle = this.borderLeftcur ? 'none' : this.itemMdata.Divstyle.borderStyle;
			},
			borderRight:function(){
				this.borderRightcur = !this.borderRightcur;
				this.itemMdata.Divstyle.borderRightStyle = this.borderRightcur ? 'none' : this.itemMdata.Divstyle.borderStyle;
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.sidebarEdit {
		
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
		.one{
            padding:20px;
            box-sizing: border-box;
            height: 400px;
            overflow: auto;
            .oneLevel,.twoLevel,.thirdLevel{
                clear:both;
                overflow:hidden;
                .setoneLevel,.settwoLevel,.setthirdLevel{
                    p{
                        float:left;
                        padding-right:20px;
                        span{
                            padding-right:5px;
                            line-height: 32px;
                        }
                        input{
                            border:1px solid #ccc;
                            width:60px;
                        }
                        div{
                             vertical-align: top;
                        }
                       
                    }
                }
            }
            .imgBox{
                position:relative;
                width: 30px;
               
                .hid {
                    width: 25px;
                    height: 25px;
                    background:url(/static/image/iconIndex2.png) -1028px 228px;
                    display: none;
                }
                img{
                    width: 30px;
                    margin-left: 22%;
                    margin-top: 0;
                }
                span{
                    display:none;
                    position:absolute;
                    top:-10px;
                    right:-22%;
                    color:red;
                }

            }
            .imgBox:hover{
                span{
                    display:inline-block;
                }
            }
           .serBorder{
               margin-top:20px;
                span{
                    float:none;
                    margin-right:20px;
                }
                input{
                    width:60px;
                    border:1px solid #ccc;
                }
                p{
                    float:none;
                    display:inline-block;
                    vertical-align:top;
                    label{
                        line-height:27px;
                    }
                    div{
                        vertical-align: top;
                        margin-top:0;
                        margin-right:60px;
                    }
                }
                
            }
        }
	}
	
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
		background-color: #f1f1f1;
	}
	
	::-webkit-scrollbar-thumb {
		background-color: #b2b2b2;
		width: 16px;
		-webkit-border-radius: 16px;
		-moz-border-radius: 16px;
		border-radius: 16px;
	}
</style>