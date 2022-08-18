export const getVcodefun = () =>
  new Promise((reslove) => {
    window.initGeetest4(
      {
        captchaId: '6e565a95d7da27b5d1c949357761a8e4',
        nativeButton: {
          height: '100%',
          width: '100%',
        },
        protocol: 'https://',
        rem: 1,
      },
      function (captcha) {
        // captcha为验证码实例
        // document.querySelector('#captcha .geetest_logo').setAttribute('href', 'https://www.apipost.cn');
        captcha.appendTo('#captcha').onSuccess(function (e) {
          const result = captcha.getValidate();
          // result.dom = captcha;
          reslove({ result, captcha });
        });
      }
    );
  });

export default getVcodefun;
