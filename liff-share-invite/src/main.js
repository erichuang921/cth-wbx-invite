const liffID = '1656122875-BakebXJ3';

window.addEventListener('load', () => {

  // LIFF init
  liff.init({
    liffId: liffID
  }).then(() => {
    
    // 發送訊息給朋友
    const btnShareTarget = document.getElementById('sendShareTarget');
    btnShareTarget.addEventListener('click', () => {
      let inviter = document.getElementById('inviter').value;
      let start = document.getElementById('start').value;
      let end = document.getElementById('end').value;
      let url = document.getElementById('url').value;
      if(isLoggedIn && liff.isApiAvailable('shareTargetPicker')) {
        liff.shareTargetPicker([
          {
            "type": "flex",
            "altText": "您收到一則 WEBEX 線上會議（活動）邀請",
            "contents": {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://line.17team.tk/liff-images/webex.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "WEBEX 線上會議邀請",
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
                              "text": "邀請人員：",
                              "color": "#aaaaaa",
                              "size": "sm"
                            },
                            {
                              "type": "text",
                              "text": inviter,
                              "wrap": true,
                              "color": "#555555",
                              "size": "sm",
                              "flex": 2
                            }
                          ]
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
                          "text": "開始時間：",
                          "color": "#aaaaaa",
                          "size": "sm"
                        },
                        {
                          "type": "text",
                          "text": start,
                          "wrap": true,
                          "color": "#555555",
                          "size": "sm",
                          "flex": 2
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
                          "text": "結束時間：",
                          "color": "#aaaaaa",
                          "size": "sm"
                        },
                        {
                          "type": "text",
                          "text": end,
                          "wrap": true,
                          "color": "#555555",
                          "size": "sm",
                          "flex": 2
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
                  "height": "md",
                  "action": {
                    "type": "uri",
                    "label": "加入會議",
                    "uri": url
                  }
                },
                {
                  "type": "button",
                  "style": "primary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "下載 WEBEX 軟體（APP）",
                    "uri": "https://liff.line.me/1656122875-Rnlb03LP"
                  },
                  "color": "#FF77FF",
                  "offsetTop": "xs"
                }
              ],
              "flex": 0
            }
          }
        }
        ])
        .then(res => window.alert('邀請訊息傳送成功'))
        .catch(error => window.alert('錯誤！無法傳送邀請'))
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