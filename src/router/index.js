import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/components/t1/product'
import Content2 from '@/components/t2/product'
import newDes from '@/components/t1/newDes'
import newDes2 from '@/components/t2/newDes'
import templateEdit from '@/page/templateEdit'
import t1Index from '@/components/t1/index'
import t2Index from '@/components/t2/index'
import t1About from '@/components/t1/about'
import notFound from '@/page/notFound'
import preview from '@/page/preview' //预览
import prevIndex from '@/components/t1/prev/index'
import prevIndex2 from '@/components/t2/prev2/index'

import prevNewDes from '@/components/t1/prev/newDes'
import prevNewDes2 from '@/components/t2/prev2/newDes'

import prevCount from '@/components/t1/prev/product'
import prevCount2 from '@/components/t2/prev2/product'
//import prevAbout from '@/components/t1/prev/about'

Vue.use(Router)
//router.beforeResolve
export default new Router({
	mode: "history",
	base: '/pc/',
	routes: [{
			path: '/',
			name: "index",
			component: Index
		},{
			path: '/allsite',
			name: "allsite",
			component: templateEdit,
			children: [{
				path: ':id',
				name: "t2",
				component: t1About
			}]
			//component: t1About
		},  {
			path: '/t1/product/:id',
			component: templateEdit,
			children: [{
				path: ':param',
				name: "t1",
				component: Content
			}]
		},{
			path: '/t2/product/:id',
			component: templateEdit,
			children: [{
				path: ':param',
				name: "t2",
				component: Content2
			}]
		}, {
			path: '/t1/new/:id',
			component: templateEdit,
			children: [{
				path: ':param',
				name: "t1",
				component: newDes
			}]
		},{
			path: '/t2/new/:id',
			component: templateEdit,
			children: [{
				path: ':param',
				name: "t2",
				component: newDes2
			}]
		}, {
			path: '/t1/:id',
			component: templateEdit,
			children: [{
				path: ':param',
				name: "t1",
				component: t1Index
			}]
		},
		{
			path: '/t2/:id',
			component: templateEdit,
			children: [{
				path: ':param',
				name: "t2",
				component: t2Index
			}]
		}, {
			path: '/t1/prev/:id',
			component: preview,
			children: [{
				path: ':param',
				component: prevIndex
			}]
		},{
			path: '/t1/prev/new/:id',
			component: preview,
			children: [{
				path: ':param',
				component: prevNewDes
			}]
		}, {
			path: '/t1/prev/product/:id',
			component: preview,
			children: [{
				path: ':param',
				component: prevCount
			}]
		}, {
			path: '/t2/prev/:id',
			component: preview,
			children: [{
				path: ':param',
				component: prevIndex2
			}]
		}, {
			path: '/t2/prev/product/:id',
			component: preview,
			children: [{
				path: ':param',
				component: prevCount2
			}]
		}, {
			path: '/t2/prev/new/:id',
			component: preview,
			children: [{
				path: ':param',
				component: prevNewDes2
			}]
		}, {
			path: '*',
			component: notFound
		}
	]
})