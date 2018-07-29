<template>
  <div>
  	<h2>按钮编辑</h2>
   <ul>
    	<li>按钮大小</li>
    	<li>按钮位置</li>
   </ul>
  </div>
</template>

<script>
export default {
  name: 'buttonEdit',
  created() {
			console.log(this.button)
	},
	props: ['itemCon'],
  data () {
    return {
      title: 'Welcome'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
