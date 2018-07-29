<template>
	<div class="fluid container">			
		<div class="conect">
			<div class="g-cf inner">
				<p>about1</p>	
			</div>
		</div>				
	</div>
</template>

<script>
	//import myHeader from '../components/header.vue'
	//import myFooter from '../components/footer.vue'
	export default {
		name: 'about',
		components: {
			
		},
		data() {
			return {				
				tm: this.$route.params
			}
		},
		methods: {
			
		},
		created() {
			console.log(this.tm)
		},
		computed: {
		
		},
		watch: {

		}
	}
</script>

<style scoped>
	.container .conect_inner {
		width: 990px;
		background-color: #fff;
		position: relative;
		margin: 0 auto;
		.columnLayout {
			position: relative;
			margin-left: -45%;
			margin-right: -45%;
		}
	}
	
	.in_outer {
		position: relative;
	}
	
	.container .warning {
		border: 1px dashed red;
	}
	
	.in_inner {
		border: 1px dashed #fff;
		position: relative;
		.del_icon {
			text-align: left;
		}
		.multi_edit {
			position: absolute;
			top: -40px;
			width: 450px;
			height: 40px;
			line-height: 40px;
			display: none;
			span {
				cursor: pointer;
				margin-right: 10px;
			}
		}
	}
	
	.in_inner:hover {
		border-color: #ccc;
		.multi_edit {
			display: block;
		}
	}
	
	.multi_con {
		.clm {
			border: 1px dashed #fff;
			float: left;
			position: relative;
		}
		.clm2 {
			width: 50%;
		}
		.clm3 {
			width: 33.13%;
		}
		.clm4 {
			width: 25%;
		}
		.clm5 {
			width: 20%;
		}
	}
	
	.longitud {
		.tit_con {
			float: left;
			width: 20%;
			ul {}
		}
		.long_con {
			float: left;
			width: 80%;
		}
	}
	
	.ateralLabel {
		ul {
			li {
				float: left;
				width: 100px;
				text-align: center;
			}
		}
		.long_con {}
	}
	
	.container .enter {
		border: #5874d8 1px dashed;
	}
	
	.addMern {
		width: 990px;
		margin: 0 auto;
		.dragNew {
			min-height: 100px;
			padding-top: 35px;
			text-align: center;
			background-color: rgba(204, 204, 204, 0.36);
			p {
				text-align: center;
				cursor: pointer;
				width: 150px;
				margin: 0 auto;
				line-height: 30px;
				height: 30px;
				background-color: #ccc;
				border: 1px solid #666;
				border-radius: 4px;
			}
		}
	}
</style>