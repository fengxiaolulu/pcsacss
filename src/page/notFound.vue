<template>
	<div class="fluid container">
		<!--div class="form-group form-group-lg panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Sortbale control</h3>
      </div>
      <div class="panel-body">
        <div class = "checkbox">
          <label><input type = "checkbox" v-model="editable">Enable drag and drop</label>      
        </div>
        <button type="button" class="btn btn-default" @click="orderList">Sort by original order</button>
      </div>
    </div-->
		<myHeader></myHeader>
		<div class="conect">
			<div class="g-cf inner">
				<p style="text-align: center;">404</p>	
			</div>
		</div>
		<myFooter></myFooter>
		<!--div class="list-group col-md-3">
	      <pre>{{listString}}</pre>
	    </div>
	     <div  class="list-group col-md-3">
	      <pre>{{list2String}}</pre>
	    </div-->
	</div>
</template>

<script>
	import myHeader from '../components/header.vue'
	import myFooter from '../components/footer.vue'
	export default {
		name: 'notFound',
		components: {
			myHeader,
			myFooter
		},
		data() {
			return {				
				//delayedDragging: false
			}
		},
		methods: {
			
		},
		computed: {
		
		},
		watch: {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>