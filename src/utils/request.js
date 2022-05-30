import setting from '../setting';

const BASEURL = setting.test.baseUrl;

const isDev = process.env.NODE_ENV === 'development';

// #ifdef H5
devUrl = '';
// #endif

// import { BASEURL } from './index.js'
// import { getToken } from './auth.js'
 
const request = (config) => {
	let header = {
		"Content-Type": config.contentType || "application/json;charset=utf-8",
	}
	// if(getToken()) {
		header['token'] = uni.getStorageSync('accessToken') || '';
	// }
	return new Promise((resove, reject) => {
		uni.showLoading({
			title: "加载中",
			mask: true
		})
		uni.request({
			url: BASEURL + config.url,
			data: config.data || '',
			header: header,
			method: config.method,
			dataType: "json",
			success: (res) => {
				console.log(res.data, '=======请求结果=======')
				const { data } = res
				const { code, result } = data
				switch(code){
					case 200:
					resove(res.data)
					break
					case 500:
					uni.showToast({
						title:"请求错误",
						duration:1500,
						mask:false,
						icon:"none"
					})
					break
					default:
					uni.showToast({
						title: data.msg,
						duration:2000,
						mask:false,
						icon:"none"
					})
				}
			},
			fail: (error) => {
				uni.showToast({
					title:"请求错误",
					duration:1500,
					mask:false,
					icon:"none"
				});
				reject(error)
			},
			complete: () => {
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			}
		})
	})
}
export default request