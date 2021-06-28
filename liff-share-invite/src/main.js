const liffID = '1656122875-BakebXJ3';

window.addEventListener('load', () => {

  // LIFF init
  liff.init({
    liffId: liffID
  }).then(() => {
    
    // 取得基本環境資訊
    // 參考：https://engineering.linecorp.com/zh-hant/blog/liff-our-latest-product-for-third-party-developers-ch/
    let language, version, isInClient, isLoggedIn, os, lineVersion;

    language = liff.getLanguage(); // String。引用 LIFF SDK 的頁面，頁面中的 lang 值
    version = liff.getVersion(); // String。LIFF SDK 的版本
    isInClient = liff.isInClient(); // Boolean。回傳是否由 LINE App 存取
    isLoggedIn = liff.isLoggedIn(); // Boolean。使用者是否登入 LINE 帳號。true 時，可呼叫需要 Access Token 的 API
    os = liff.getOS(); // String。回傳使用者作業系統：ios、android、web
    lineVersion = liff.getLineVersion(); // 使用者的 LINE 版本

    const outputBasic = document.getElementById('result-basic');
    outputBasic.value = `language: ${language}\nversion: ${version}\nisInClient: ${isInClient}\nisLoggedIn: ${isLoggedIn}\nos: ${os}\nlineVersion: ${lineVersion}`;



    // 登入
    // redirectUri 是使用者登入後要去到哪個頁面，這個頁面必須要在後台中的「Callback URL」先設定好，不然會 400 error
    const btnLogin = document.getElementById('login');
    btnLogin.addEventListener('click', () => {
      // 先確認使用者未登入
      if(!isLoggedIn) {
        liff.login({
          redirectUri: redirectUri // 使用者登入後要去到哪個頁面
        });
      }
    });

    const btnLogout = document.getElementById('logout');
    btnLogout.addEventListener('click', () => {
      // 先確認使用者是否是登入的狀態
      if(isLoggedIn) {
        liff.logout();
        window.location.reload(); // 登出後重整一次頁面
      }
    });



    // 取得使用者類型資料
    const btnContent = document.getElementById('getContext');
    btnContent.addEventListener('click', () => {
      const context = liff.getContext();
      const outputContent = document.getElementById('result-info');
      outputContent.value = `${JSON.stringify(context)}`
    });

    // 取得使用者資料
    // 後台的「Scopes」要設定開啟 profile, openid
    function getProfile() {
      // 先確認使用者是登入狀態
      if(isLoggedIn) {
        return liff.getProfile().then(profile => profile);
      }
    }
    const btnProfile = document.getElementById('profile');
    btnProfile.addEventListener('click', () => {
      // 先確認使用者是登入狀態
      if(isLoggedIn) {
        liff.getProfile().then(profile => {
          const outputContent = document.getElementById('result-info');
          outputContent.value = `${JSON.stringify(profile)}`
        })
      }
    });

    // 取使用者 email
    const btnEmail = document.getElementById('getEmail');
    btnEmail.addEventListener('click', () => {
      const user = liff.getDecodedIDToken();
      const email = user.email;
      const outputContent = document.getElementById('result-info');
      outputContent.value = `${email}`;
    });



    // 傳送訊息
    const btnMessage = document.getElementById('sendMessage');
    btnMessage.addEventListener('click', () => {
      let message = document.getElementById('message').value;
      liff.sendMessages([
        {
            type: "flex",
            altText: "您收到一則 WEBEX 線上會議（活動）邀請",
            contents: {
            type: "bubble",
            hero: {
              type: "image",
              url: "https://line.17team.tk/liff-images/webex.png",
              size: "full",
              aspectRatio: "20:13",
              aspectMode: "cover"
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "WEBEX 線上會議邀請",
                  weight: "bold",
                  size: "xl"
                },
                {
                  type: "box",
                  layout: "vertical",
                  margin: "lg",
                  spacing: "sm",
                  contents: [
                    {
                      type: "box",
                      layout: "vertical",
                      margin: "lg",
                      spacing: "sm",
                      contents: [
                        {
                          type: "box",
                          layout: "baseline",
                          spacing: "sm",
                          contents: [
                            {
                              type: "text",
                              text: "邀請人員：",
                              color: "#aaaaaa",
                              size: "sm"
                            },
                            {
                              type: "text",
                              text: inviter,
                              wrap: true,
                              color: "#555555",
                              size: "sm",
                              flex: 2
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: "box",
                      layout: "baseline",
                      spacing: "sm",
                      contents: [
                        {
                          type: "text",
                          text: "開始時間：",
                          color: "#aaaaaa",
                          size: "sm"
                        },
                        {
                          type: "text",
                          text: start,
                          wrap: true,
                          color: "#555555",
                          size: "sm",
                          flex: 2
                        }
                      ]
                    },
                    {
                      type: "box",
                      layout: "baseline",
                      spacing: "sm",
                      contents: [
                        {
                          type: "text",
                          text: "結束時間：",
                          color: "#aaaaaa",
                          size: "sm"
                        },
                        {
                          type: "text",
                          text: end,
                          wrap: true,
                          color: "#555555",
                          size: "sm",
                          flex: 2
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: [
                {
                  type: "button",
                  style: "primary",
                  height: "md",
                  action: {
                    type: "uri",
                    label: "加入會議",
                    uri: url
                  }
                },
                {
                  type: "button",
                  style: "primary",
                  height: "sm",
                  action: {
                    type: "uri",
                    label: "下載 WEBEX 軟體（APP）",
                    uri: "https://liff.line.me/1656122875-Rnlb03LP"
                  },
                  color: "#FF77FF",
                  offsetTop: "xs"
                }
              ],
              "flex": 0
            }
          }
        }
      ]).then(res => window.alert(res.status))
        .catch(error => window.alert(error));
    });

    // 發送訊息給朋友
    const btnShareTarget = document.getElementById('sendShareTarget');
    btnShareTarget.addEventListener('click', () => {
      let message = document.getElementById('message').value;
      if(isLoggedIn && liff.isApiAvailable('shareTargetPicker')) {
        liff.shareTargetPicker([
          {
            type: "text",
            text: message
          }
        ])
        .then(res => window.alert(res.status))
        .catch(error => window.alert(error))
      }
    });



    // 開啟連結
    const btnOpenWindow = document.getElementById('openWindow');
    btnOpenWindow.addEventListener('click', () => {
      let uri = document.getElementById('uri').value;
      liff.openWindow({
        url: uri,
        external: true
      })
    });

    // 取得當前網址
    const btnLink = document.getElementById('getLink');
    btnLink.addEventListener('click', () => {
      let uriInput = liff.permanentLink.createUrl();
      document.getElementById('result-uri').value = uriInput;
    });



    // 打開 LINE 的 QR code 掃描器
    const btnScan = document.getElementById('qrScan');
    btnScan.addEventListener('click', () => {
      // 先確認使用者要是登入狀態，並且 scanCode 可用
      if(isLoggedIn && liff.scanCode) {
        liff.scanCode()
            .then(result => {
              document.getElementById('result-qr').value = result;
            })
            .catch(error => {
              document.getElementById('result-qr').value = error;
            });
      }
    });



    // 關閉 LIFF
    const btnClose = document.getElementById('closeLIFF');
    btnClose.addEventListener('click', () => {
      // 先確認是否在 LINE App 內
      if(isInClient) {
        liff.closeWindow();
      }
    });

  }).catch(error => {
    console.lo(error);
  });

})
