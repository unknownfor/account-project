import request from '@/utils/request';

// const { requestOld } = require('@/utils/requestOld');
const baseUrl = '/usermanager/';
// const { baseUrl } = require('./env').test;

// const request = (url, ...arg) => _request(baseUrl + url, ...arg);

console.log(request)
export default {
  // 获取短信验证码
  getSms: (data) => {
    return request(
      'verificationCode/v1/getSms',
      data
    );
  },
  mainList: (data) => {
    return request({
      url: '/usermanager/verificationCode/v1/getSms',
      method: 'post',
      data
    })
  },
  getSmso: (data) => {
    return requestOld(
      'usermanager/verificationCode/v1/getSms',
      'POST',
      data,
      false,
    );
  },
  list(data) {
    // mock
    return new Promise((resolve, reject) => {
      const data = {
        list: [
          {
            img: 'http://dummyimage.com/212x212/FF6600',
            title: '环球科学',
            desc: 21,
          },
          {
            img: 'http://dummyimage.com/212x212/FF6600',
            title: '媒体视点',
            desc: 21,
          },
          {
            img: 'http://dummyimage.com/212x212/FF6600',
            title: '科技知道',
            desc: 21,
          },
          {
            img: 'http://dummyimage.com/212x212/FF6600',
            title: '管窥天下',
            desc: 21,
          },
        ],
        total: 4,
        pageNum: 1,
      };
      setTimeout(() => {
        resolve(data);
      }, 600);
    });
    return request('list', data, 'get');
  },
  save(data) {
    return request('save', data);
  },
  detail(data) {
    return request('detail', data);
  },
  del(data) {
    return request('del', data);
  },
};
