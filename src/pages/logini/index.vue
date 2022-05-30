<template>
  <view class="p-page">
    <view class="layout-col-center">
      <img class="login-img pt20 pb20" src="../../static/login/login.svg" />
    </view>
    <view>
      <u-row>
        <text class="title">即账</text>
      </u-row>
      <u-row>
        <view class="des-box">
          <img class="check-img pr5" src="../../static/login/check.svg" />
          <text class="des"
            >输入手机号即代表您已阅读并同意
            <text class="des-active" @click="goProtical">《服务协议》</text>
          </text>
        </view>
      </u-row>
      <u-row class="pt15 pb15">
        <u-input
          placeholder="请输入手机号"
          v-model="phone"
          border="bottom"
          @focus="handleClick"
          size="large"
          :disabled-keyboard="true"
        >
          <text class="num" slot="prefix">
            + 86 <text class="color pl5">|</text></text
          >
        </u-input>
      </u-row>
      <u-row>
        <text class="des pt15 pb15">验证手机号</text>
      </u-row>
      <u-row class="pt15 pb15">
        <u-input placeholder="请输入验证码" border="bottom"></u-input>
      </u-row>
    </view>

    <u-keyboard
      mode="number"
      @change="valChange"
      @backspace="backspace"
      :dotDisabled="true"
      :show="show"
      :overlay="false"
      :tooltip="false"
    >
      <!-- <slot>
        <view class="wrap">
          <u-toast ref="uToast"></u-toast>
          <u-code
            :seconds="seconds"
            @end="end"
            @start="start"
            ref="uCode"
            @change="codeChange"
          ></u-code>
          <u-button @tap="getCode" :disabled="!phone">{{ tips }}</u-button>
        </view>
      </slot> -->
    </u-keyboard>
  </view>
</template>

<script>
import listApi from '@/api/list';

export default {
  data() {
    return {
      show: false,
      phone: '',
      tips: '',
      seconds: 60,
      value: '',
    };
  },
  computed: {
    readOnly() {
      return false;
    },
  },
  onLoad() {},
  onReady() {
    // 如果想一进入页面就打开键盘，请在此生命周期调用
    this.handleClick();
  },
  methods: {
    change() {
      console.log('输入框类型一');
    },
    // 查看服务协议
    goProtical() {
      // todo
    },
    handleClick() {
      console.log('点击键盘');
      this.show = true;
    },
    // 按键被点击(点击退格键不会触发此事件)
    valChange(val) {
      // 将每次按键的值拼接到value变量中，注意+=写法
      this.phone += val;
    },
    // 退格键被点击
    backspace() {
      // 删除value的最后一个字符
      if (this.phone.length)
        this.phone = this.phone.substr(0, this.phone.length - 1);
    },

    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码',
        });
        setTimeout(() => {
          uni.hideLoading();
          // 这里此提示会被this.start()方法中的提示覆盖
          uni.$u.toast('验证码已发送');
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start();
        }, 2000);
      } else {
        uni.$u.toast('倒计时结束后再发送');
      }
    },
    end() {
      uni.$u.toast('倒计时结束');
    },
    start() {
      uni.$u.toast('倒计时开始');
    },

    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          uni.showLoading({ title: '正在提交...' });
          listApi
            .save(this.form)
            .then((res) => {})
            .finally(() => {
              this.btnLoading = false;
              uni.hideLoading();
            });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.title {
  font-size: 40rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: $uni-text-color;
  margin-bottom: 34rpx;
}
.num {
  font-size: 48rpx;
}
.login-img {
  $h: 40px;
  height: $h;
  width: $h;
  border-radius: 6px;
}
.check-img {
  $h: 11px;
  height: $h;
  width: $h;
}
.des-box {
  height: 42rpx;
  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: 400;
  margin-bottom: 20rpx;
}
.des {
  color: $uni-text-color-grey;
  font-size: 30rpx;
}
.des-active {
  color: $uni-text-color-click;
  font-size: 30rpx;
}
.color {
  color: $uni-text-color-grey;
  font-weight: lighter;
}
</style>
