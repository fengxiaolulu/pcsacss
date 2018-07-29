<template>
	<div class="imageEdit">
		<ul>
			<li>图片组件</li>
			<li>组件样式</li>
		</ul>
		<div class="img">
			<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess" :on-remove="handleRemove">
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'buttonEdit',
		props: ['tImgEdit'],
		data() {
			return {
				title: '图片上传',
				dialogImageUrl: '',
				dialogVisible: false
			}
		},
		created() {
			console.log(this.tImgEdit)
		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = file.url;
				console.log(this.state.itemCon)
				for(var i = 0; this.state.itemCon.length > i; i++) {
					var itemCon = this.state.itemCon[i];
					console.log(itemCon.order)
					if(this.tImgEdit.order == itemCon.order) {
						itemCon.url = this.imageUrl;
						break;
					}
				}
				this.orderList(this.state.itemCon);

			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				console.log(this.dialogImageUrl);
				this.dialogVisible = true;
			},
			beforeAvatarUpload(file) {
				console.log(file);
				const isJPG = file.type === 'image/jpeg';
				const isPng = file.type === 'image/png';
				const isGif = file.type === 'image/gif';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!(isJPG || isPng || isGif)) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			...mapMutations([
				'orderList'
			])
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>