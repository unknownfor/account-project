// const {
//   baseUrl
// } = require('./env').test

import setting from '../setting';

let baseUrl = setting.test.baseUrl;

const app = getApp()
// 封装ajax
module.exports = {
  requestOld: function (url, method = 'POST', data = {}, isLoading = true) {
    // 操作url
    url = `${baseUrl}/${url}`
    // wx.setStorageSync('token', 'dad777f28f779d6d547f3c9caa086cf90c0fe56d19c188ac558f9ae8e640b2a54cc00a5ccfa62a96c8bf55335f0e224d')
    // wx.setStorageSync('userId', '110455376974970880')
    // wx.setStorageSync('companyName', '大大王的体验公司')
    // wx.setStorageSync('companyId', '210781574347489280')

    // wx.setStorageSync('token', '1089cc410807ad2c2f0fd73bcec1f58a1bfaae4609cee1eb61ba9e0a1ba6928d594e2b9cca042ba8cbd56fd66904a99e')
    // wx.setStorageSync('userId', '16668400797155328')
    // // wx.setStorageSync('companyName', '大大王的体验公司')
    // wx.setStorageSync('companyId', '29126775740170240 ')

    // wx.setStorageSync('token', 'b45d860d126503338cd63e4b9ef48b053de720c9aac65a73e0c90db6f60973093103ce1468f1ee20a9d9ea587019aebe')
    // wx.setStorageSync('userId', '16656106735599616')
    // wx.setStorageSync('companyName', '北京前景云通信股份有限公司')
    // wx.setStorageSync('companyId', '26659459141599232')

    //  wx.setStorageSync('token', '3e310ce08897ae0772da58fd1fa51db3646ce6fb39d8fa128181a37f49b1dbd12ba58c5e24c79290372fdf96e297ebd2')
    //     wx.setStorageSync('userId', '16656857516277760')
    //     // wx.setStorageSync('companyName', '北京轻赢数据科技有限公司')
    //     wx.setStorageSync('companyId', '210868496683761664')

    let token = wx.getStorageSync('token') ? wx.getStorageSync('token') : ''

    if (isLoading) 
    wx.showLoading({
      title: '加载中...'
    })
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success: res => {
          if (res.networkType == 'none') {
            wx.hideLoading()
            wx.showToast({
              title: '当前网络不给力',
              icon: 'none'
            })
            app.globalData.noNetwork = true
          } else {
            app.globalData.noNetwork = false
            wx.request({
              url,
              method,
              data,
              header: {
                'Content-type': 'application/json;charset=UTF-8',
                'token': token
              },
              success(res) {
                if (res.statusCode === 200 && res.data.code === 0) {
                  resolve(res.data)
                } else {
                  if (res.data.code == -9999) {
                    resolve(res.data)
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none'
                    })
                    reject(res.data)
                  }

                }
              },
              fail() {
                wx.showToast({
                  title: '接口有问题',
                  icon: 'none'
                })
                reject(res.data)
              }
            })
          }
        },
      })

    })
  }
}