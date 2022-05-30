<template>
  <view
    :class="'keyboardBox ' + (NokeyboardType ? 'hide' : '')"
    :style="'padding-bottom: ' + (submitType ? 16 : 80) + 'rpx;'"
  >
    <view
      :class="'codeBth ' + (codeType && !codeTimeType ? 'codeActive' : '')"
      @tap.stop.prevent="getCode"
      v-if="codeShow"
    >
      {{ !codeTimeType ? '获取验证码' : codeTime + '秒后' }}
    </view>
    <view class="numberBox">
      <view
        class="numberItem"
        @tap.stop.prevent="addValue"
        :data-num="item"
        v-for="(item, index) in numberArr"
        :key="index"
        >{{ item }}</view
      >
      <view
        :class="'numberItem ' + (diantype ? '' : 'noDian')"
        @tap.stop.prevent="addValue"
        data-num="."
      >
        <view class="dian" v-if="diantype" />
      </view>
      <view class="numberItem" @tap.stop.prevent="addValue" data-num="0"
        >0</view
      >
      <view
        class="numberItem"
        @tap="deleteNum"
        style="background-color: #ccced3; box-shadow: none"
      >
        <image class="deleteIcon" src="/static/tuige.png" mode="aspectFill" />
      </view>
    </view>
    <view class="submit" v-if="submitType" @tap="closebtn">确定</view>
  </view>
</template>

<script>
const app = getApp();
export default {
  data() {
    return {
      // submitType: true,
      // diantype: true,
      nopage: false, //节流开关
      numberArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      // value: '',
      // maxLength: null,
      // phoneType: false,
      // codeType: false, //是否可以点击验证码
      codeTimeType: false, //倒计时是否开始
      codeTime: 60, //短信倒计时
    };
  },
  /**
   * 组件的属性列表
   */
  props: {
    submitType: {
      type: Boolean,
    },
    diantype: {
      type: Boolean,
    },
    NokeyboardType: {
      type: Boolean,
    },
    forbidCode: {
      type: Boolean,
    },
    clearValue: {
      type: Boolean,
    },
    value: {
      type: String,
    },
    maxLength: {
      //输入最大长度11
      type: Number,
    },
    codeShow: {
      //是否展示获取验证码按钮
      type: Boolean,
    },
    codeType: {
      type: Boolean,
    },
    phoneType: {
      type: Boolean,
    },
  },
  destroyed: function () {
    this.codeTimeType = false;
    // this.setData({
    //   codeTimeType: false,
    // });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closebtn() {
      this.$emit('closebtn');
    },

    closeCode() {
      this.codeTimeType = false;
      //   this.setData({
      //     codeTimeType: false,
      //   });
    },

    addValue(e) {
      let { num } = e.currentTarget.dataset;
      // let { value, maxLength } = this.data;
      let value = this.value;
      let maxLength = this.maxLength;
      if (value.length == maxLength) {
        return;
      }

      if (value == '') {
        value = String(num);
      } else {
        value = value + String(num);
      }
      //   this.setData({
      //     value,
      //   });
      this.$emit('value', value);
      uni.vibrateShort({
        type: 'medium',
      });

      this.$emit('setValue', {
        detail: value,
      });
    },

    getCode() {
      if (this.codeType && !this.codeTimeType) {
        //获取验证码
        if (this.nopage) {
          return;
        }
        // 短信接口
        this.nopage = true;
        this.codeTimeType = true;
        this.codeTimeFun();
        // this.setData(
        //   {
        //     codeTimeType: true,
        //     nopage: true,
        //   },
        //   () => {
        //     this.codeTimeFun();
        //   },
        // );
        this.$emit('closeCodeType', {
          detail: false,
        });
        let that = this;
        setTimeout(() => {
          that.nopage = false;
          // this.setData({
          //   nopage: false,
          // });
        }, 6000);
      }
    },

    codeTimeFun() {
      let that = this;
      let codeTime = that.codeTime;

      if (that.codeTimeType == false) {
        return;
      }

      if (codeTime < 0) {
        this.codeTime = 60;
        this.codeTimeType = false;
        // that.setData({
        //   codeTime: 60,
        //   codeTimeType: false,
        // });
        this.$emit('closeCodeType', {
          detail: true,
        });
        return;
      }

      setTimeout(() => {
        codeTime--;
        that.codeTime = codeTime;
        // this.$emit('codeTime', );
        // that.setData({
        //   codeTime,
        // });
        that.codeTimeFun();
      }, 1000);
    },

    deleteNum(e) {
      uni.vibrateShort({
        type: 'light',
      });
      this.$emit('deleteValue');
    },
  },
  watch: {
    forbidCode: {
      handler: function (e) {
        this.codeTimeType = false;
        // this.setData({
        //     forbidCode: e,
        //     codeTimeType: false
        // });
      },

      immediate: true,
    },

    clearValue: {
      handler: function (e) {
        this.value = '';
        // this.setData({
        //     value: ''
        // });
      },

      immediate: true,
    },

    value: {
      handler: function (e) {
        this.value = e;
        // this.setData({
        //     value: e
        // });
      },

      immediate: true,
    },

    maxLength: {
      handler: function (e) {
        this.maxLength = e;
        // this.setData({
        //     maxLength: e
        // });
      },

      immediate: true,
    },

    codeShow: {
      handler: function (e) {
        this.codeShow = e;
        // this.setData({
        //     codeShow: e
        // });
      },

      immediate: true,
    },

    codeType: {
      handler: function (e) {
        this.codeType = e;
        // this.setData({
        //     codeType: e
        // });
      },

      immediate: true,
    },

    phoneType: {
      handler: function (e) {},
      immediate: true,
    },
  },
};
</script>
<style>
.keyboardBox {
  width: 100%;
  background: #ccced3;
  padding: 16rpx 12rpx 80rpx;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  z-index: 2;
}

.hide {
  bottom: -300%;
}

.codeBth {
  width: 726rpx;
  height: 92rpx;
  background: #efefef;
  box-shadow: 0 2rpx 0 #898a8d;
  border-radius: 10rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #bbbbbb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
}

.codeActive {
  color: #4c8afc;
  background: #fff;
}

.numberBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.numberItem {
  width: 234rpx;
  height: 92rpx;
  background: #fcfcfe;
  box-shadow: 0 2rpx 0 #898a8d;
  border-radius: 10rpx;
  font-size: 50rpx;
  font-family: Segoe UI;
  font-weight: 400;
  color: #000000;
  letter-spacing: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12rpx;
  margin-bottom: 14rpx;
}

.numberItem:nth-child(3n) {
  margin-right: 0;
}

.deleteIcon {
  width: 48rpx;
  height: 34rpx;
}

.submit {
  width: 726rpx;
  height: 92rpx;
  background: #fff;
  box-shadow: 0 2rpx 0 #898a8d;
  border-radius: 10rpx;
  font-size: 36rpx;
  font-weight: bold;
  color: #4c8afc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6rpx;
}

.dian {
  width: 10rpx;
  height: 10rpx;
  background: #262626;
  border-radius: 50%;
}

.noDian {
  background: transparent;
  box-shadow: 0 0 0 transparent;
}
</style>
