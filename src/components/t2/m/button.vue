<template>
  <div class="button">
  		<div class="h_tit"><div class="drag_hard"></div><span class="del_icon">X</span></div>
     <button>{{text}}</button>
  </div>
</template>

<script>
export default {
  name: 'mButton',
  props: ['btn'],
  created() {
		console.log(this.btn)
	},
  data () {
    return {
      text: this.btn.text
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.button{
		text-align: center;
	}
 button{
 	padding:3px 6px;
 	color: #fff;
 	background-color: rgb(52, 182, 253);
 }
</style>
