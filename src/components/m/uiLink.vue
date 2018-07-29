<template>
	<el-dialog class="callout_link" ref="callout_link" :append-to-body=true :title="editDial.artTitle" :visible.sync="editDial.setlink" width="40%">
		<div class="link_con">
			<el-form ref="form" :model="form" label-width="120px">
				<el-form-item label="链接类型：" label-width="120px">
					<el-radio-group v-model="form.newLinkTypeSwitch">
						<el-radio label="1">站内链接</el-radio>
						<el-radio label="2">功能</el-radio>
						<el-radio label="3">站外链接</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<el-form v-show="form.newLinkTypeSwitch==1" ref="form0" :model="form" label-width="120px">
				<el-form-item label="一级导航：">
					<el-select v-model="form0.firtTitle" @change="changFistType" placeholder="请选择链接">
						<el-option v-for="rut in navItem" :key="rut.id" :label="rut.column_name" :value="rut.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="二级导航：">
					<el-select v-model="form0.secTitle" @change="changSecType" placeholder="请选择栏目">
						<el-option v-for="(sec,index) in secondNav" :key="sec.id" :label="sec.column_name" :value="sec.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="三级导航：">
					<el-select v-model="form0.thirTitle" @change="changThirType" placeholder="请选择栏目">
						<el-option v-for="(sec,index) in thirdNav" :key="index" :label="sec.column_name" :value="sec.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="打开方式：">
					<el-checkbox-group v-model="form0.openByNewPage"  @change="setOpen()">
						<el-checkbox label="在新页面打开" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<el-form v-show="form.newLinkTypeSwitch==2" ref="form" :model="form1" label-width="120px">
				<el-form-item label="选择功能：">
					<el-select v-model="form1.newMenuWord" placeholder="请选择链接">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择弹窗：">
					<el-select v-model="form1.popupZoneBox" placeholder="请选择栏目">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-form v-show="form.newLinkTypeSwitch==3" ref="form" :model="form2" label-width="120px">
				<el-form-item label="自定义地址：">
					<el-input v-model="form2.cusLink" style="width: 220px;" @blur="changecusLink"></el-input>
				</el-form-item>
				<el-form-item label="打开方式：">
					<el-checkbox-group v-model="form2.openByNewPage" @change="setOpen()">
						<el-checkbox label="在新页面打开" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
		</div>
		<span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="mSave">确 定</el-button>
  </span>
	</el-dialog>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import api from '@/api/$ajax.js'
	export default {
		name: 'uiLink',
		created() {
			this.getData();
		},
		components: {

		},
		props: ['itemMdata', 'editDial'],
		mounted() {

		},
		methods: {
			setOpen(){
				if(this.form.newLinkTypeSwitch==1 &&this.form0.openByNewPage ==true){
					this.itemMdata.target = '_blank';
					console.log(this.itemMdata.target)
				}else if(this.form.newLinkTypeSwitch==1 &&this.form0.openByNewPage ==false){
					this.itemMdata.target = '_self';
					console.log(this.itemMdata.target)
				}
				if(this.form.newLinkTypeSwitch==3 &&this.form2.openByNewPage ==true){
					this.itemMdata.target = '_blank';
					console.log(this.itemMdata.target)
				}else if(this.form.newLinkTypeSwitch==3 &&this.form2.openByNewPage ==false){
					this.itemMdata.target = '_self';
					console.log(this.itemMdata.target)
				}
				
				//this.itemMdata.target = this.form2.checked;
				//this.itemMdata.target = this.form0.checked;
			},
			changFistType() {
				var navItem = this.navItem;
				this.itemMdata.link = this.form0.firtTitle;
				
				for(var i = 0; navItem.length > i; i++) {
					if(navItem[i].id == this.form0.firtTitle) {
						this.secondNav = navItem[i].secondNav || [];
						this.form0.secTitle = "";
					}
				}
			},
			changSecType() {
				var navItem = this.navItem;
				this.itemMdata.link = this.form0.secTitle;
				
				for(var i = 0; navItem.length > i; i++) {
					var secondNav = navItem[i].secondNav;
					for(var j = 0; secondNav.length > j; j++) {
						if(secondNav[j].id == this.form0.secTitle) {
							this.thirdNav = secondNav[j].thirdNav || [];
							this.form0.thirTitle = "";
						}
					}
				}
			},
			cancel() {
				this.editDial.setlink = false;
			},
			mSave() {
				this.editDial.setlink = false;
			},
			getData() {
				api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id,true,{},r => {
					if(r.code == 422) {
						return;
					}
					var list = r.data.list;
					var firstList = [];

					for(let i = 0; list.length > i; i++) {
						list[i].secondNav = [];
						if(list[i].parent_id == 0) {
							firstList.push(list[i])
						}
					}

					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; list.length > k; k++) {
							list[k].thirdNav = [];
							if(firstList[i].id == list[k].parent_id) {
								firstList[i].secondNav.push(list[k]);
							}
						}
					}

					for(let i = 0; firstList.length > i; i++) {
						for(let k = 0; firstList[i].secondNav.length > k; k++) {
							for(let j = 0; list.length > j; j++) {
								if(firstList[i].secondNav[k].id == list[j].parent_id) {
									firstList[i].secondNav[k].thirdNav.push(list[j]);
								}
							}
						}
					}
					this.navItem = firstList;
				});
			},
			changThirType() {
				if(this.form0.thirTitle) {
					this.itemMdata.link = this.form0.thirTitle;
					
				}
			},
			changecusLink() {
				if(this.form2.cusLink) {
					this.itemMdata.link = this.form2.cusLink;
					
				}
			},
			...mapActions([
				'saveloca'
			])

		},
		computed: {
			...mapGetters(["router", "state"])
		},
		data() {
			return {
				title: "设置链接",
				param: {
					id: this.$route.params.id,
					param: this.$route.params.param,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					column_id: this.$route.query.column_id,
					type: this.$route.query.type,
					version_id: this.$route.query.pc_version_id
				},
				form: {
					newLinkTypeSwitch: "1"
				},
				navItem: [],
				secondNav: [],
				thirdNav: [],
				form0: {
					firtTitle: '',
					secTitle: '',
					thirTitle: '',
					openByNewPage: true,
					//checked: ''
				},
				form1: {
					popupZoneBox: '',
					newMenuWord: ''
				},
				form2: {
					cusLink: "",
					openByNewPage: true,
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>