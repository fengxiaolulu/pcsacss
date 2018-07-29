import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/$ajax.js'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const state = {
	itemAllSite: [],
	id: 1,
	curOrder: null,
	delayed: 'index',
	width: '990px',
	flag: true,
	router: {		
		hoverStyle:{}
	},
	phoneNav: {
		tName: "PhoneNav",
		tText: '手机导航',
		isEdit: false,
		isShow: false,
		draging: false,
		isShowUp: false,
		isShowDown: false,
		mClass: "Typesetting",
		diesc: "",
		mImage: {
			url: "",
		},
		zinStyle: {
			zIndex: 0
		},
		conStyle: {
			paddingTop: '0',
			paddingLeft: '0',
			paddingRight: '0',
			paddingBottom: '0',
			borderWidth: "0",
			height: "120px"
		},
		navheader: {
			fontSize: '14px',
			color: '#fff',
			height: '60px',
			background: '#409EFF'
		},
		logoStyle: {
			textAlign: 'left'
		},
		iconStyle: {
			textAlign: 'right'
		},
		backStyle: {
			display: 'none',
			color: '#ffffff',
			marginTop: '0px',
			fontSize: '20px'
		},
		navheaderImg: {
			width: '100%'
		},
		namenumber: '1',
		mainText: {
			web_name: '',
			web_logo: '',
			web_icon: ''
		},
		itemInner: [],
		aloneIcon: "panelModuleIcon_pack moduleArea_pack",
		aloneText: "moduleAloneText",
	},
	itemCon: {
		"index": {
			stream: [],
			posCom: []
		}		
	}
}

const mutations = {
	setState(state, data) {
		//console.log(data);
		//var itemAllSite = JSON.parse(localStorage.getItem("itemAllSite"));
		state.itemAllSite = data.itemAllSite; //
		state.delayed = data.delayed; //
		state.router = data.router; //
		state.phoneNav = data.phoneNav;
		state.itemCon = data.itemCon; //
	},
	setAllStyle(state, style) {
		//state.router.liStyle = style;
		state.router.push($.extend(true, state.router.liStyle, style));
		console.log(style)
	},
	setAllSite(state, allSite) {
		//debugger		
		//state.itemAllSite.remove();
		state.itemAllSite.splice(0, state.itemAllSite.length);
		for(var i = 0; allSite.length > i; i++) {
			state.itemAllSite.push($.extend(true, allSite[i], {}));
			//console.log(JSON.parse(JSON.stringify(allSite)))
			//if(allSite[i].zinStyle) console.log(state.itemAllSite[i].zinStyle)
			//debugger
		}

		//state.itemAllSite =$.extend(allSite); //
		//debugger

		//console.log(JSON.parse(JSON.stringify(allSite)))
		//console.log($.extend(true,allSite[3],allSite[4]))
	},
	setOrderId(state, id) {
		state.id = id; //
	},
	setDelayed(state, id) {
		state.delayed = id; //
	},
	orderbyId(state) {
		var stream = state.itemCon[state.delayed].stream;
		//debugger;
		var isNav = {
			zinStyle: {

			}
		};
		stream = stream.map((obj, index) => {
			obj.order = index + 1;
			console.log(obj.order);
			obj.zinStyle.zIndex = index + 1;
			if(obj.itemInner && obj.itemInner.length) {
				for(var i = 0; obj.itemInner.length > i; i++) {
					var flagItem = obj.itemInner[i];
					flagItem.parentStyle.zIndex = i;
					if(flagItem.tName == "moduleAreaNav") {
						isNav = obj;
					}
					//console.log(flagItem);
				}
			} else if(obj.labelTitle && obj.labelTitle.length) {
				for(var h = 0; h < obj.labelTitle.length; h++) {
					var lblinner = obj.labelTitle[h].itemInner;
					if(lblinner) {
						for(let k = 0; lblinner.length > k; k++) {
							var flagItem = lblinner[k];
							flagItem.parentStyle.zIndex = k;
							//console.log("itemInner");
						}
					}
				}
			}
			return obj;
		});
		console.log(isNav);
		isNav.zinStyle.zIndex = stream.length;
	},
	change(state, k) {
		var arr = state.itemCon[state.delayed].stream;
		arr[k.k].isShow = false;
		arr[k.j].isShow = false;
		var tempOption = arr[k.j];
		Vue.set(arr, k.j, arr[k.k]);
		//location.href = ""
		Vue.set(arr, k.k, tempOption);
		setTimeout(function() {
			arr[k.k].isShow = true;
			arr[k.j].isShow = true;
		}, 1);
	},
	addProps(state, props) {
		Vue.set(state.itemCon, props, {
			stream: [],
			posCom: []
		});
	},
	pushItemStream(state, item) {
		state.itemCon[state.delayed].stream.push(item); //追加组件
	},
	delItemStream(state, item) { //删除组件
		var stream = state.itemCon[state.delayed].stream;
		//console.log(stream);
		for(let j = 0; stream.length > j; j++) {
			var itemInner = stream[j].itemInner;
			var labelTitle = stream[j].labelTitle;
			var itemInner1 = stream[j].itemInner1;
			var itemInner2 = stream[j].itemInner2;

			if(itemInner && itemInner.length && itemInner.indexOf(item) != -1) {

				var dd = itemInner.splice(itemInner.indexOf(item), 1);
				stream[j].isShow = false;
				setTimeout(function() {
					stream[j].isShow = true;
				}, 10);
			} else if(labelTitle) {
				for(let i = 0; labelTitle.length > i; i++) {
					var itemInner2 = labelTitle[i].itemInner;
					if(itemInner2 && itemInner2.length && itemInner2.indexOf(item) != -1) {
						itemInner2.splice(itemInner2.indexOf(item), 1);
					}

					stream[j].isShow = false;
					setTimeout(function() {
						stream[j].isShow = true;
					}, 10);
				}
			} else if(itemInner1 && itemInner1.length && itemInner1.indexOf(item) != -1) {
				itemInner1.splice(itemInner1.indexOf(item), 1);
				stream[j].isShow = false;
				setTimeout(function() {
					stream[j].isShow = true;
				}, 10);
			} else if(itemInner2 && itemInner2.length && itemInner2.indexOf(item) != -1) {
				itemInner2.splice(itemInner2.indexOf(item), 1);
				stream[j].isShow = false;
				setTimeout(function() {
					stream[j].isShow = true;
				}, 10);
			}

		}
	},
	delItemPos(state, item) {
		var posCom = state.itemCon[state.delayed].posCom;
		if(posCom.length) {
			for(var j = 0; posCom.length > j; j++) {
				console.log(posCom.indexOf(item));
				if(posCom.indexOf(item) != -1) {
					posCom.splice(posCom.indexOf(item), 1);
				}
			}
			//item.isShow = false;
		}
	},
	pushItemPosCom(state, item) {
		state.itemCon[state.delayed].posCom.push(item); //拖动排序
	},
	delStreamModule(state, obj) {
		var stream = state.itemCon[state.delayed].stream;
		var j = stream.indexOf(obj.order);
		stream.splice(j, 1);
		if(stream[j]) {
			stream[j].isShow = false;
			setTimeout(function() {
				stream[j].isShow = true;
			}, 10);
		}

	},
	pushItemStreamItem(state, it) {
		var i = state.itemCon[state.delayed].stream.indexOf(it.i); //
		if(state.itemCon[state.delayed].stream[i].itemInner) {
			state.itemCon[state.delayed].stream[i].itemInner.push(it.item); //追加组件	
		} else if(state.itemCon[state.delayed].stream[i].itemInner1) {
			state.itemCon[state.delayed].stream[i].itemInner1.push(it.item);
		} else if(state.itemCon[state.delayed].stream[i].itemInner2) {
			state.itemCon[state.delayed].stream[i].itemInner2.push(it.item);
		}
	},
	setItemSite(state, item) {
		var index = state.itemCon[state.delayed].stream.indexOf(item.order);
		console.log(index);
		//debugger;
		//state.itemCon[state.delayed].stream[index]
		if(index != -1) {
			var isAllSite = true; //全站模块（临时保存）	
			var itemObj = state.itemCon[state.delayed].stream[index];
			//console.log(state.itemAllSite.indexOf(itemObj));
			for(var i = 0; state.itemAllSite.length > i; i++) {
				if(itemObj.allId == state.itemAllSite[i].allId) {
					state.itemAllSite[i] = itemObj;
					isAllSite = false;
					localStorage.setItem(item.id + item.type + "itemAllSite", JSON.stringify(state.itemAllSite));
				}
			}
			if(isAllSite) {
				itemObj.allId = item.guid;
				state.itemAllSite.push(itemObj);
				localStorage.setItem(item.id + item.type + "itemAllSite", JSON.stringify(state.itemAllSite));
			}			

		}
	},
	
	getAllSite(state, item) {
		// console.log("getAllSite");
		var allSite = JSON.parse(localStorage.getItem(item.id + item.type + "itemAllSite"));
		var stream = state.itemCon[state.delayed].stream;
		state.itemAllSite = allSite||[];
		//console.log(stream);
		if(allSite && allSite.length) {
			for(var i = 0; allSite.length > i; i++) {
				var emSite = allSite[i];
				var flag = true;
				for(let j = 0; stream.length > j; j++) {
					console.log(stream[j]);
					if(emSite.allId == stream[j].allId) {
						//console.log("sdssssds");
						stream[j] = emSite;
						flag = false;
						return;
					}
				}
				if(flag) {
					stream.push(emSite);
				}
			}
		}
		//return state.itemAllSite;
	},
	setAllStyle(state, item) {
		localStorage.setItem(item.id + item.type + "itemAllStyle", JSON.stringify(state.router));
	},
	copyModule(state, obj) {
		state.itemCon[state.delayed].stream.splice(obj.index, 0, obj.order); // 
	},
	setPosSite(state, item) {
		if(!(state.itemAllSite && state.itemAllSite.indexOf(item.order) != -1)) {
			item.order.isAllSite = true;
			var flag = true;
			item.order.allOrder = item.order.allOrder || state.itemAllSite.length + 1;
			for(var i = 0; state.itemAllSite.length > i; i++) {
				//console.log(state.itemAllSite[i])				
				if(item.order.allOrder == state.itemAllSite[i].allOrder) {
					item.order.isShow = true;
					state.itemAllSite[i] = item.order;
					flag = false;
					break;
				}
			}

			if(flag) {
				state.itemAllSite.push(item.order); //全站模块（临时保存）	
			}

			localStorage.setItem(item.id + item.type + "itemAllSite", JSON.stringify(state.itemAllSite));
		}
	},
	setCurOrder(state, order) {
		state.curOrder = order; //正在的拖动组件（临时保存）
	}
}
const getters = {
	state: function(state) {
		return state
	},
	itemCon(state) {
		return state.itemCon
	},
	getDataCur(state) {
		if(!state.itemCon[state.delayed]) {
			Vue.set(state.itemCon, state.delayed, {
				stream: [],
				posCom: []
			});
		}
		return state.itemCon[state.delayed];
	},
	router: function(state) {
		return state.router
	},
	phoneNav: function(state) {
		return state.phoneNav
	}
}
const actions = {
	saveData(context, obj) {
		context.commit('setOrderId', obj.id);

		var objdata = {
			template_id: obj.id,
			token: obj.token,
			html: obj.html || "",
			column_id: obj.param,
			version_id: obj.version_id,
			type: obj.type,
			content: JSON.stringify(state)
		};
		console.log(obj);
		//debugger;
		api.post('/api/diy/saveTemplateVersionWithColumnId', true, objdata, function(r) {
			if(r.data.version_id) {
				alert("生成页面完成");
			} else if(r.data.result_msg) {
				alert(r.data.result_msg);
			}
			localStorage.removeItem(obj.id + obj.type + obj.param);
			//localStorage.removeItem(obj.id + obj.type + "itemAllSite");
		});

		/*$.ajax({
			type: "POST",
			url: "http://api.xiaohucloud.cn/api/diy/saveTemplateVersionWithColumnId",
			data: objdata,
			async: true,
			//crossDomain: true,
			//contentType: false,
			//processData: false,
			dataType: 'json',
			success: function(data) {
				if(data.code == 422) {
					alert("请重新登录")
				} else {
					alert("保存成功！");
					localStorage.removeItem(obj.id + obj.type + obj.param);
				}
			}
		});*/

	},
	saveloca(context, obj) {
		for(let key in state.itemCon) {
			if(key != state.delayed) {
				state.itemCon[key] = {
					stream: [],
					posCom: []
				};
			}
		}
		//localStorage.setItem(obj.id + obj.type + 'itemAllSite', JSON.stringify(state.itemAllSite));
		localStorage.setItem(obj.id + obj.type + obj.param, JSON.stringify(state));
	},
	getData(context, obj) {
		var state = JSON.parse(localStorage.getItem(obj.id + obj.type + obj.param));
		//var itemAllSite = JSON.parse(localStorage.getItem("itemAllSite"));
		//var itemAllSite = JSON.parse(localStorage.getItem(obj.id + obj.type + "itemAllSite"));
		//console.log(api);
		if(!state) {
			api.get('/api/diy/getTemplateVersionByColumnId?template_id=' + obj.id + '&token=' + obj.token + "&version_id=" + obj.version_id + "&column_id=" + obj.param + "&type=" + obj.type, false, {}, function(r) {
				if(!r) {
					return;
				}

				if(r.data.content) {
					var state = JSON.parse(r.data.content);
					if(state) {
						context.commit('setState', state);
					}
				}

				return;
			});
		}
		//debugger
		state && context.commit('setState', state);
	}
}

export default new Vuex.Store({
	state,
	actions,
	getters,
	plugins: [createLogger()],
	mutations
});