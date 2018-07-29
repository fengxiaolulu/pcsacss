<template>
	<span class="ui-spinn">
		<input type="text" v-on:input="chooseMedicine" v-model="reversed" />
		<span class="side_sp">
			<a @click="add" class="ui-up-button">▲</a>
			<a @click="reduce" class="ui-down-button">▼</a>
		</span>
	</span>
</template>
<script>
	export default {
		name: 'mSelect',
		created() {
			console.log(this.mStyle.fontSize)
			
			if(this.flag=='fontSize'){
					this.mSize = this.mStyle.fontSize;
			}else if(this.flag=='width'){
				this.mSize = this.mStyle.width;
			}else if(this.flag=='lineHeight'){
				this.mSize = this.mStyle.lineHeight;
			}
			//&&
		//	this.flag=='width'&&this.mSize = this.mStyle.style.width;
			//this.flag=='lineHeight'&&this.mSize = this.mStyle.style.lineHeight;
			if(!Number(this.mSize)) {
				this.count = String(this.mSize).replace(/[^0-9]/ig, "");
				this.fdlag = String(this.mSize).replace(/[0-9]/ig,"");				
			} else {
				count = this.mSize;
			}
			this.reversed = this.mSize
		},
		props: ['mStyle','flag'],
		methods: {
			add() {
				this.count = Number(this.count) + 1;
				this.reversed = this.count + this.fdlag;
				this.$emit('changeFontSize', this.reversed,this.flag);
			},
			chooseMedicine: function(v) {
				console.log(v)
				this.$emit('changeFontSize',this.reversed,this.flag);
			},
			reduce() {
				this.count = Number(this.count) - 1;
				this.reversed = this.count + this.fdlag;
				this.$emit('changeFontSize', this.reversed,this.flag);
			}
		},
		computed: {

		},
		data() {
			return {
				count: 0,
				mSize:"",
				reversed: "",
				fdlag: ""
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-spinn {
		border: 1px solid #aaaaaa;
		display: block;
		border-radius: 4px;
		input {
			height: 30px;
			width: 79%;
			padding-left: 4%;
		}
		.side_sp {
			float: right;
			width: 5%;
			padding-right: 1%;
			a {
				line-height: 15px;
				font-size: 12px;
				float: right;
				cursor: pointer;
				color: #888;
			}
			a.ui-down-button {}
		}
	}
</style>