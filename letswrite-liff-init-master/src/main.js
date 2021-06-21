window.addEventListener('load', () => {

  let liffID;

  // LIFF ID 有值就執行
  const btnLiffID = document.getElementById('liff-btn');
  btnLiffID.addEventListener('click', () => {
    liffID = document.getElementById('liff-input').value;
    triggerLIFF();
  })

  // 執行範例裡的所有功能
  function triggerLIFF() {

    // LIFF init
    liff.init({
      liffId: '1655727931-j13g84w0'
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
            redirectUri: 'https://erichuang921.github.io/cth-wbx-invite/'
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

      // 發送訊息給朋友
      const btnShareTarget = document.getElementById('sendShareTarget');
      btnShareTarget.addEventListener('click', () => {
        let webexurl = document.getElementById('meeting-url').value;
        let minviter = document.getElementById('meeting-inviter').value;
        let mstart = document.getElementById('meeting-start').value;
        let mend = document.getElementById('meeting-end').value;
        if(isLoggedIn && liff.isApiAvailable('shareTargetPicker')) {
          liff.shareTargetPicker([
            {
              "type": "flex",
              "altText": "WEBEX 線上會議邀請",
              "contents": {
                  "type": "bubble",
                  "hero": {
                    "type": "image",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    },
                    "url": "https://erichuang921.github.io/cth-wbx-invite/WEBEX.png"
                  },
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "WEBEX 會議邀請",
                        "weight": "bold",
                        "size": "xl"
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "margin": "lg",
                        "spacing": "sm",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                              {
                                "type": "text",
                                "text": "邀請人",
                                "color": "#aaaaaa",
                                "size": "sm",
                                "flex": 1
                              },
                              {
                                "type": "text",
                                "text": minviter,
                                "wrap": true,
                                "color": "#666666",
                                "size": "sm",
                                "flex": 5
                              }
                            ]
                          },
                          {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                              {
                                "type": "text",
                                "text": "會議時間",
                                "color": "#aaaaaa",
                                "size": "sm",
                                "flex": 1
                              },
                              {
                                "type": "text",
                                "text": mstart + " ~ " + mend,
                                "wrap": true,
                                "color": "#666666",
                                "size": "sm",
                                "flex": 5
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "button",
                        "style": "primary",
                        "height": "sm",
                        "action": {
                          "type": "uri",
                          "label": "進入會議室",
                          "uri": webexurl
                        }
                      },
                      {
                        "type": "button",
                        "style": "secondary",
                        "height": "sm",
                        "action": {
                          "type": "uri",
                          "label": "下載 WEBEX 軟體",
                          "uri": "https://www.webex.com/zh-tw/downloads.html"
                        },
                        "color": "#FFA5FF"
                      },
                      {
                        "type": "spacer",
                        "size": "sm"
                      }
                    ],
                    "flex": 0
                  }
            }
          ])
          .then(res => window.alert(res.status))
          .catch(error => window.alert(error))
        }
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
      console.log(error);
    });
  
  }

})