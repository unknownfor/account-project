<script>
export default {
  onLaunch: function () {
    // this.globalData.judgeIsFullSucreen();
    // this.globalData.getNowMonth();
    // this.globalData.getfrontMonth(); // 版本检测更新
  },
  onShow: function () {
    // console.log('App Show');
  },
  onHide: function () {
    // console.log('App Hide');
  },
  globalData: {
    noNetwork: false,

    //当前有无网络
    screenHeight: null,

    //屏幕可操作高度
    platform: null,

    //系统判断  1是安卓2是苹果
    windowHeight: 0,

    navHeight: 0,
    isFullSucreen: false,

    //是否全面屏
    safeAreaHeight: null,

    //手机底部安全区域高度
    frontMonth: null,

    //上一个月
    nowMonth: null,

    //当前月份
    startType: false,

    //商品页启动页面 true 开启
    uploadInchPhoto: 'usermanager/employee/v1/uploadInchPhoto',

    ////上传一寸照片
    updateDiplomaImge: 'usermanager/employee/v2/updateDiplomaImge',

    //上传学历证照片
    //上传身份证照片
    uploadIDCard: 'usermanager/employee/v2/uploadIDCard',

    judgeIsFullSucreen() {
      let _this = this;

      uni.getSystemInfo({
        success: (res) => {
          _this.globalData.screenHeight = res.safeArea.bottom;
          _this.globalData.platform = res.platform == 'ios' ? 2 : 1;
          const rate = res.windowHeight / res.windowWidth;
          let limit = res.windowHeight == res.screenHeight ? 1.8 : 1.65; // 临界判断值

          if (rate > limit) {
            _this.globalData.isFullSucreen = true;
          }

          _this.globalData.safeAreaHeight = 34;
        },
      });
    },

    getNowMonth() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      month = month + 1;
      month = month < 10 ? '0' + month : month;
      this.nowMonth = year + '-' + month;
    },

    getfrontMonth() {
      var date = new Date();
      var year = date.getFullYear(); //当前年：四位数字

      var month = date.getMonth(); //当前月：0-11

      if (month == 0) {
        //如果是0，则说明是1月份，上一个月就是去年的12月
        year -= 1;
        month = 12;
      }

      month = month < 10 ? '0' + month : month; //月份格式化：月份小于10则追加个0

      this.frontMonth = year + '-' + month;
    },

    getNetWork() {
      uni.onNetworkStatusChange((res) => {
        this.isConnected = res.isConnected;
      });
    },

    isConnected: '',

    watch: function (method) {
      //监听函数
      const obj = this;
      Object.defineProperty(obj, 'noNetwork', {
        configurable: true,
        enumerable: true,
        set: function (value) {
          this._name = value;
          method(value);
        },
        get: function () {
          return this._name;
        },
      });
    },
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
</style>
