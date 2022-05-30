export default {
  required: (text, method = ['blur', 'change']) => ({
    required: true,
    message: text,
    trigger: method,
  }),
  phone: {
    pattern:
      /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
    message: '请填写符合要求的11位手机号',
    trigger: 'blur',
  },
  idCard: {
    pattern:
      /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
    message: '请填写符合要求的身份证号',
    trigger: 'blur',
  },
  // rules: {
  //   /**
  //    * 必填项
  //    * @param {String} label
  //    */
  //   required(label, options = {}) {
  //     return {
  //       required: true,
  //       message: makeMsg(`${label}不能为空`, options.extraMsg),
  //       trigger: 'blur',
  //       ...options,
  //     };
  //   },

  //   /**
  //    * 限制长度
  //    * @param {Number} min
  //    * @param {Number} max
  //    */
  //   len(min = 0, max = Infinity, options = {}) {
  //     let message;
  //     if (min === 0) {
  //       message = `长度不能超过${max}个字符`;
  //     } else if (max === Infinity) {
  //       message = `长度不能少于${min}个字符`;
  //     } else {
  //       message = `长度须在${min}到${max}个字符之间`;
  //     }
  //     return {
  //       min,
  //       max,
  //       message: makeMsg(message, options.extraMsg),
  //       trigger: 'blur',
  //     };
  //   },

  //   /*
  //     不允许输入空格
  //    */
  //   notBlank(label) {
  //     return {
  //       validator: (rule, value = '', callback) => {
  //         value += '';
  //         let arr = [];
  //         if (value) {
  //           arr = value.split(' ');
  //         }
  //         if (arr.length > 1) {
  //           callback(new Error(`${label}不能包含空格`));
  //         } else {
  //           callback();
  //         }
  //       },
  //       trigger: 'blur',
  //     };
  //   },
  // },
};
