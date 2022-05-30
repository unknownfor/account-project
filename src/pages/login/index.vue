<template>
  <block>
    <view class="showBox" @tap.stop.prevent="closePasteType">
      <image src="/static/login/login.svg" class="logo" />
      <view class="title">即账</view>
      <view class="AgreementBox">
        输入手机号即代表您已阅读并同意
        <text style="margin-left: -10rpx" @tap="lookAgreement"
          >《服务协议》</text
        >
      </view>
      <view class="phoneBox">
        <view class="phoneTips">
          <text>+</text>
          86
        </view>
        <view class="line" />

        <view
          class="phoneTips"
          @tap.stop.prevent="checkArea"
          data-index="0"
          style="position: relative"
          @longpress.stop.prevent="showgetClip"
        >
          <view class="phoneItem" v-for="(item, index) in phone" :key="index">{{
            item
          }}</view>
          <view class="kongtis" />
          <view class="pasteBox" @tap.stop.prevent="getClip" v-if="clipType"
            >粘贴</view
          >
        </view>
        <view
          class="fillLine"
          v-if="type != 0 || NokeyboardType"
          @tap.stop.prevent="checkmoreArea"
          @longpress.stop.prevent="showgetClip"
        />
      </view>
      <view class="codeTipsWord">验证手机号</view>
      <view class="codeBox">
        <block v-if="platform == 2">
          <view
            :class="'code ' + (fIndex == index ? 'borderLine' : '')"
            :data-index="index"
            @tap="changeType"
            v-for="(item, index) in codeArr"
            :key="index"
          >
            {{ item.word }}

            <view
              class="fillLine"
              v-if="fIndex != index || fIndex == undefined"
            />
          </view>
        </block>

        <block v-else>
          <view
            :class="'code ' + (item.show ? 'borderLine' : '')"
            @tap="checkArea"
            :data-index="index + 1"
            @longpress.stop.prevent="
              parseEventDynamicCode(type == 1 ? 'showPasterBox' : '')
            "
            v-for="(item, index) in codeArr"
            :key="index"
          >
            {{ item.word }}

            <view class="fillLine" v-if="item.show" />

            <view
              class="pasteBox"
              v-if="item.show && pasteType"
              @tap.stop.prevent="pasterCode"
              :data-index="index"
              >粘贴</view
            >
          </view>
        </block>
      </view>
    </view>

    <keyboard
      @setValue="setValue"
      @deleteValue="deleteValue"
      @closeCodeType="closeCodeType"
      :codeShow="true"
      :value="type == 0 ? phone : codeStr"
      :maxLength="type == 0 ? phoneMaxLength : codeMaxLength"
      :codeType="codeType"
      slotNum=""
      :forbidCode="forbidCode"
      id="keyboard"
      :NokeyboardType="NokeyboardType"
    />

    <view class="hideBox">
      <input
        class="codeOne"
        placeholder-class="codeOne"
        type="number"
        always-embed
        :maxlength="4 - index"
        :value="item.word"
        :data-index="index"
        :focus="NokeyboardType && item.focus"
        :hold-keyboard="NokeyboardType"
        confirm-hold
        @input="fillWord"
        :cursor="item.cursor ? item.cursor : 1"
        :adjust-position="false"
        @tap="parseEventDynamicCode(!NokeyboardType ? 'changeType' : '')"
        v-for="(item, index) in codeArr"
        :key="index"
      />
    </view>
  </block>
</template>

<script>
import listApi from '@/api/list';
import keyboard from '@/components/keyboard/index';
const app = getApp();
const regMobile = /^1[0-9]{10}$/;
export default {
  components: {
    keyboard,
  },
  data() {
    return {
      // 自由数据
      customData: {
        autofillType: false,
        autoType: false,
        checkType: null,
        fIndex: null,
      },
      fIndex: null,
      nopage: false,

      //节流开关
      type: 0,

      //0是手机号 1是短信码
      phone: '',

      phoneArr: [
        {
          num: 1,
        },
        {
          num: 1,
        },
        {
          num: 1,
        },
      ],

      phoneCheckindex: null,
      codeStr: '',
      phoneMaxLength: 11,
      codeMaxLength: 4,

      codeArr: [
        {
          show: false,
          word: '',
        },
        {
          show: false,
          word: '',
        },
        {
          show: false,
          word: '',
        },
        {
          show: false,
          word: '',
        },
      ],

      codeIndex: 0,

      //2是苹果 1 是安卓
      platform: app.globalData.platform,

      pasteSuccess: false,
      NokeyboardType: false,
      clipType: false,
      pasteType: false,
      codeType: '',
      forbidCode: false,
      noNetwork: '',
      //   refresherType: false,
      undefined: '',
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    app.globalData.watch(this.watchBack); //注册监听
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    let that = this;
    let { platform, type } = that;

    if (that.customData.autofillType && platform != 2 && type == 1) {
      uni.getClipboardData({
        success(res) {
          let code = new Number(res.data);

          if (code != NaN && res.data.length == 4) {
            code = res.data.split('');
            let codeArr = that.codeArr;
            code.forEach((item, index) => {
              codeArr[index].word = item;
            });
            uni.showToast({
              title: '复制成功',
              icon: 'none',
            });

            // that.setData(
            //   {
            //     codeArr,
            //     pasteSuccess: true,
            //   },
            //   () => {
            // setTimeout(() => {
            //   that.submit();
            // }, 1000);
            //   },
            // );
            this.codeArr = codeArr;
            this.pasteSuccess = true;
            this.$nextTick(function () {
              that.submit();
            });
          }
        },

        fail() {
          uni.showToast({
            title: '复制失败',
            icon: 'none',
          });
        },
      });
    }
  },
  methods: {
    lookAgreement() {
      uni.navigateTo({
        url: '/pages/agreement/index',
      });
    },

    changeType(e) {
      //   let index = e.currentTarget.dataset.index;

      if (this.phone.length != 11) {
        return;
      }

      if (this.type == 0) {
        let codeArr = this.codeArr;
        let index = this.customData.fIndex;
        codeArr.forEach((item, id) => {
          if (id <= index) {
            codeArr[id].focus = true;
            codeArr[id].show = true;
          } else {
            codeArr[id].show = false;
          }
        });
        this.NokeyboardType = true;
        this.codeArr = codeArr;
        this.fIndex = index;
        this.type = index + 1;
        // this.setData({
        //   NokeyboardType: true,
        //   codeArr,
        //   fIndex: index,
        //   type: index + 1,
        // });
      } else {
        let fIndex = this.fIndex;

        if (fIndex && fIndex > 0) {
          fIndex = fIndex;
        } else {
          fIndex = 0;
        }

        this.codeArr[this.fIndex].focus = true;
      }
    },

    checkArea(e) {
      let { index } = e.currentTarget.dataset;
      let codeArr = this.codeArr;
      console.log(codeArr, 'codeArr');

      if (this.platform == 2 && index == 0) {
        uni.hideKeyboard();
        this.customData.fIndex = this.fIndex;

        for (let obj of codeArr) {
          obj.focus = false;
        }

        this.NokeyboardType = false;
        this.codeArr = codeArr;
        this.fIndex = null;

        // this.setData({
        //   NokeyboardType: false,
        //   codeArr,
        //   fIndex: null,
        // });
      }

      if (this.phone.length != 11) {
        return;
      }

      console.log(codeArr, 'codeArr');
      let type = this.type;

      if (index == 0) {
        this.customData.checkType = type;

        for (let obj of codeArr) {
          obj.show = false;
        }
        this.type = 0;
        this.codeArr = codeArr;
        // this.setData({
        //   type: 0,
        //   codeArr,
        // });
      } else {
        if (type == 0) {
          let checkType = this.customData.checkType;
          this.codeArr[checkType - 1].show = true;
          this.type = checkType;
          //   this.setData({
          //     type: checkType,
          //   });
        }
      }
    },

    showgetClip() {
      this.clipType = true;
      //   this.setData({
      //     clipType: true,
      //   });
    },

    getClip() {
      let that = this;
      uni.getClipboardData({
        success(res) {
          let code = res.data;

          if (code == '') {
            return;
          }

          if (code.length > 11) {
            code = code.substring(0, 11);
          } else {
            code = code;
          }

          that.setPhone(code);
          that.clipType = false;
          //   that.setData({
          //     clipType: false,
          //   });
        },
      });
    },

    pasterCode(e) {
      let zindex = e.currentTarget.dataset.index;
      let that = this;
      uni.getClipboardData({
        success(res) {
          let code = new Number(res.data);
          if (code != NaN && res.data.length == 4) {
            code = res.data.split('');
            let codeArr = that.codeArr;
            code.forEach((item, index) => {
              codeArr[index].word = item;
            });
            codeArr[zindex].show = false;
            codeArr[3].show = true;
            uni.showToast({
              title: '复制成功',
              icon: 'none',
            });
            // that.setData(
            //   {
            //     codeArr,
            //     pasteType: false,
            //   },
            //   () => {
            //     setTimeout(() => {
            //       that.submit();
            //     }, 1000);
            //   },
            // );
            this.codeArr = codeArr;
            this.pasteType = false;
            this.$nextTick(function () {
              that.submit();
            });
          }
        },

        fail() {
          uni.showToast({
            title: '复制失败',
            icon: 'none',
          });
        },
      });
    },

    closePasteType() {
      this.clipType = false;
      //   this.setData({
      //     clipType: false,
      //   });
    },

    showPasterBox() {
      this.pasteType = true;
      //   let that = this;
      //   that.setData({
      //     pasteType: true,
      //   });
      let that = this;
      setTimeout(() => {
        that.pasteType = false;
        // that.setData({
        //   pasteType: false,
        // });
      }, 3000);
    },

    getpasteCode(e) {
      let that = this;
      let value = e.detail.value;
      let codeArr = that.codeArr;

      if (value != '' && value.length == 4) {
        code = value.split('');
        code.forEach((item, index) => {
          codeArr[index].word = item;
        });
        that.codeArr = codeArr;
        this.$nextTick(function () {
          that.submit();
        });
        // that.setData(
        //   {
        //     codeArr,
        //   },
        //   () => {
        //     setTimeout(() => {
        //       that.submit();
        //     }, 1000);
        //   },
        // );
      }
    },

    closeCodeType(e) {
      //   this.setData({
      //     codeType: e.detail,
      //   });

      this.codeType = e.detail;
      if (e.detail === false) {
        this.getSms();
      }
    },

    setValue(e) {
      let that = this;
      let wordStr = e.detail;
      let type = that.type;

      if (type == 0) {
        that.setPhone(wordStr);
      } else {
        that.setCode(wordStr);
      }
    },

    getcode(e) {
      if (e.detail.keyCode == 8) {
        this.deleteCode();
        return;
      }

      if (!this.type) {
        this.type = 1;
        // this.setData({
        //   type: 1,
        // });
      }

      let str = e.detail.value;
      str = str.charAt(str.length - 1);
      this.setCode(str);
    },

    setPhone(wordStr) {
      //   this.setData({
      //     phone: wordStr,
      //   });
      this.phone = wordStr;

      if (wordStr.length == 11) {
        if (!regMobile.test(wordStr)) {
          uni.showToast({
            title: '手机号不符合规则',
            icon: 'none',
          });
          return;
        } // 手机号正确下可以点击验证码
        this.codeType = true;
        // this.setData({
        //   codeType: true,
        // });
      }
    },

    setCode(wordStr) {
      let that = this;
      let { codeArr, type } = that;
      let curCodeIndex = 0;

      if (codeArr[type - 1].word != '') {
        return;
      }

      codeArr[type - 1].word = wordStr;
      that.codeArr[type - 1].word = wordStr;
      //   that.setData({}, () => {
      //     let num = 0;

      //     for (let i = 0; i < that.codeArr.length; i++) {
      //       if (codeArr[i].word != '') {
      //         num++;
      //       }
      //     }

      //     if (num == 4) {
      //       that.submit();
      //     }
      //   });

      for (let i = 0; i < codeArr.length; i++) {
        if (codeArr[i].word == '') {
          curCodeIndex = i + 1;
          that.codeArr[i].show = true;
          that.codeArr[type - 1].show = false;
          //   that.setData({
          //     type: curCodeIndex,
          //   });
          that.type = curCodeIndex;
          break;
        }
      }
    },

    deleteValue() {
      let type = this.type;

      if (type == 0) {
        this.deletePhone();
      } else {
        this.deleteCode();
      }
    },

    deletePhone() {
      let { phone, codeType } = this;

      if (phone.length == 0) {
        return;
      }

      this.phone = phone.slice(0, phone.length - 1);
      //   this.setData({
      //     phone,
      //   });

      if (phone.length < 11 && codeType) {
        this.codeType = false;
        // this.setData({
        //   codeType: false,
        // });
      }
    },

    deleteCode() {
      let { codeArr, type } = this;

      if (type == 1 && codeArr[type - 1].word == '') {
        return;
      }

      if (codeArr[type - 1].word != '') {
        this.codeArr[type - 1].word = '';
      } else {
        if (codeArr[type - 2].word != '') {
          this.codeArr[type - 2].word = '';
          this.codeArr[type - 2].show = true;
          this.codeArr[type - 1].show = false;
          //   this.setData({
          //     type: type - 1,
          //   });
        } else if (codeArr[type - 3].word != '') {
          this.codeArr[type - 3].show = true;
          this.codeArr[type - 1].show = false;
          //   this.setData({
          //     type: type - 2,
          //   });
        } else {
          this.codeArr[0].show = true;
          this.codeArr[type - 1].show = false;
          //   this.setData({
          //     type: 1,
          //   });
        }
      }
    },

    checkItem(e) {
      let { index, sindex } = e.currentTarget.dataset;
      let phoneCheckindex = this.phoneCheckindex;

      if (phoneCheckindex >= 0) {
        this.phoneArr[phoneCheckindex].sindex = null;
      }

      this.phoneArr[index].sindex = sindex;
    },

    checkfIndex(e) {
      let zindex = e.currentTarget.dataset.index;

      if (e.detail.keyCode == 8) {
        if (this.fIndex != 0) {
          //   this.setData({
          //     fIndex: this.fIndex - 1,
          //   });
        }
      } else {
        // this.setData({
        //   fIndex: zindex,
        // });
      }
    },

    fillWord(e) {
      let that = this;
      let codeArr = that.codeArr;
      let zindex = e.currentTarget.dataset.index;
      let value = e.detail.value;

      if (value == '' && zindex > 0) {
        that.codeArr[zindex].word = value;
        that.codeArr[zindex].cursor = 0;
        that.codeArr[zindex - 1].cursor = 1;
        that.codeArr[zindex - 1].focus = true;
        // that.setData({
        //   fIndex: zindex,
        // });
      } else {
        let valueArr = value.split('');

        if (valueArr.length > 0) {
          valueArr.forEach((item, index) => {
            if (item == '') {
              return;
            }

            that.codeArr[index + zindex].focus = true;
            that.codeArr[index + zindex].word = item;

            // that.setData(
            //   {
            //     fIndex: index + zindex,
            //   },
            //   () => {
            //     let num = 0;

            //     for (let obj of that.codeArr) {
            //       if (obj.word && obj.word != '') {
            //         num++;
            //       }
            //     }

            //     if (num == 4) {
            //       that.submit();
            //     }
            //   },
            // );
          });
        } else {
          that.codeArr[0].word = '';
          //   that.setData({
          //     fIndex: zindex,
          //   });
        }
      }
    },

    checkmoreArea() {
      if (this.platform == 2) {
        uni.hideKeyboard();
        let codeArr = this.codeArr;

        for (let obj of codeArr) {
          obj.focus = false;
        }

        // this.setData({
        //   NokeyboardType: false,
        //   codeArr,
        // });
      }
    },

    judgeType(index, type) {
      let { codeArr, codeStr } = this;

      for (let obj of codeArr) {
        obj.show = false;
      }

      if (type != 0) {
        if (this.platform == 2) {
          if (this.customData.autoType) {
          } else {
            codeArr[index].show = true;
            this.customData.autoType = true;
          }
        }
      }

      //   this.setData({
      //     codeArr,
      //   });
    },

    judgeCodeAll() {
      let num = 0;

      for (let obj of this.codeArr) {
        if (obj != '') {
          num++;
        }
      }

      if (num == 4) {
        this.submit();
      }
    },

    submit() {
      let that = this;
      let codeStr = '';

      for (let obj of this.codeArr) {
        if (codeStr.length == 0) {
          codeStr = obj.word;
        } else {
          codeStr = codeStr + obj.word;
        }
      }

      let params = {
        msmCode: codeStr,
        mobile: this.phone,
      };
      //   api
      //     .userLoginMsm(params)
      //     .then((res) => {
      //       let { token, user } = res.data;

      //       if (uni.getStorageSync('token')) {
      //         uni.clearStorageSync();
      //         uni.setStorageSync('token', token);
      //         uni.setStorageSync('userId', user.id);
      //       } else {
      //         uni.setStorageSync('token', token);
      //         uni.setStorageSync('userId', user.id);
      //       }

      //       that.customData.autofillType = false;
      //       uni.navigateTo({
      //         url: '../index/companyList/companyList',
      //         success: () => {
      //           that.setData({
      //             forbidCode: true,
      //             codeArr: [
      //               {
      //                 show: true,
      //                 word: '',
      //               },
      //               {
      //                 show: false,
      //                 word: '',
      //               },
      //               {
      //                 show: false,
      //                 word: '',
      //               },
      //               {
      //                 show: false,
      //                 word: '',
      //               },
      //             ],
      //           });
      //         },
      //       });
      //     })
      //     .catch((err) => {});
    },

    async getSms() {
      let that = this;
      let params = {
        busType: '2',
        mobileNo: this.phone,
      };
      uni.showToast({
        title: '验证码已发送',
        icon: 'none',
      });
      const {result} = await listApi.mainList()
      
      // listApi
      //   .getSms(params)
      //   .then((res) => {
      //     uni.showToast({
      //       title: '验证码已发送',
      //       icon: 'none',
      //     });
      //     that.customData.autofillType = true;
      //     that.codeArr[0].focus = true;
      //     that.codeArr[0].show = true;
      //     that.fIndex = 0;
      //     that.type = 1;
      //     that.NokeyboardType = that.platform == 2 ? true : false;
      //   })
      //   .catch((err) => {
      //     console.log(err, 'err');
      //     that.codeArr[0].focus = true;
      //     that.codeArr[0].show = true;
      //     that.fIndex = 0;
      //     that.type = 1;
      //     that.NokeyboardType = that.platform == 2 ? true : false;
      //     that.forbidCode = true;
      //   })
      //   .finally(() => {
      //     this.btnLoading = false;
      //     uni.hideLoading();
      //   });
    },

    watchBack: function (value) {
      //要执行的方法
      //   this.setData({
      //     noNetwork: value,
      //   });

      this.noNetwork = value;
      if (value) {
        // this.refresherType = false;
        // this.setData({
        //   refresherType: false,
        // });
      }
    },
  },
};
</script>
<style src="./style.scss" lang="scss" scoped></style>
