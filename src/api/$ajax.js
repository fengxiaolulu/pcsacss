// 配置API接口地址
//var root = 'https://cnodejs.org/api/v1'
var root = 'http://api.xiaohucloud.cn'
//var root ="http://119.29.226.11:81"
// 引用axios
//var url = window.location.host;
//console.log(url)
if(window.location.host.indexOf(".com")!=-1){
	root = 'http://api.xiaohucloud.com'
}
// 自定义判断元素类型JS
function toType(obj) {
	return({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
	for(var key in o) {
		if(o[key] === null) {
			delete o[key]
		}
		if(toType(o[key]) === 'string') {
			o[key] = o[key].trim()
		} else if(toType(o[key]) === 'object') {
			o[key] = filterNull(o[key])
		} else if(toType(o[key]) === 'array') {
			o[key] = filterNull(o[key])
		}
	}
	return o
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAjax(method,async, url, params, success, failure) {
	if(params) {
		params = filterNull(params)
	}
	if(url.indexOf("http")==-1){
		url = root + url;
	}
	
	$.ajax({
		type: method,
		url: url,
		data: params,
		async: async,
		//crossDomain: true,
		//contentType: false,
		//processData: false,
		dataType: 'json',
		success: function(data) {		
			if(data.code == 422) {
				alert("请重新登录")
			} else {				
				if(success && typeof success == "function") {
					success(data);
				}
			}
		},
		error: function(err) {
			console.log("error")
			if(failure && typeof failure == "function") {
				failure(err);
			}
		}
	});
	/*axios({
			method: method,
			url: url,
			//contentType:'application/json',
			data: method === 'POST' || method === 'PUT' ? params : null,
			params: method === 'GET' || method === 'DELETE' ? params : null,
			baseURL: root,
			withCredentials: false
		})
		.then(function(res) {
			if(res.data.success === true) {
				if(success) {
					success(res.data)
				}
			} else {
				if(failure) {
					failure(res.data)
				} else {
					window.alert('error: ' + JSON.stringify(res.data))
				}
			}
		})
		.catch(function(err) {
			let res = err.response
			if(err) {
				window.alert('api error, HTTP CODE: ' + res.status)
			}
		})*/
}

// 返回在vue模板中的调用接口
export default {
	get: function(url,async=true, params={}, success, failure) {
		return apiAjax('GET',async, url, params, success, failure)
	},
	post: function(url,async=true, params={}, success, failure) {
		return apiAjax('POST',async, url, params, success, failure)
	},
	put: function(url,async=true, params={}, success, failure) {
		return apiAjax('PUT',async, url, params, success, failure)
	},
	delete: function(url,async=true, params={}, success, failure) {
		return apiAjax('DELETE',async, url, params, success, failure)
	}
}