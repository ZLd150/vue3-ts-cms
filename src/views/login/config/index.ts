export const accountRules = {
  name: [
    { required: true, message: "用户名为必填内容！", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: "用户名必须为5-10个小写字母或数字组成！",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "密码为必填内容！", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9]{8,20}$/,
      message: "密码必须为8-20个小写、大写字母或数字组成！",
      trigger: "blur"
    }
  ]
};

export const phoneRules = {
  phoneNum: [
    { required: true, message: "请输入手机号！", trigger: "blur" },
    {
      pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
      message: "手机号必须为11位数字组成！",
      trigger: "blur"
    }
  ],
  verifyCode: [
    { required: true, message: "请输入验证码！", trigger: "blur" },
    {
      pattern: /^[0-9]{6}$/,
      message: "输入错误，验证码由6位数字组成！",
      trigger: "blur"
    }
  ]
};
