// 在页面中定义激励视频广告
let encourageAd = null

Page({
  data: {

  },

  onTapEncourageAd(e) {
    // 用户触发广告后，显示激励视频广告
    if (encourageAd) {
      encourageAd.show().catch(() => {
        // 失败重试
        encourageAd.load()
          .then(() => encourageAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  },

  onLoad() {
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      encourageAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-9c98038b1ac978e2'
      })
      encourageAd.onLoad(() => {})
      encourageAd.onError((err) => {})
      encourageAd.onClose((res) => {})
    }
  },

  onShareAppMessage() {
    return {
      title: "动物之森小助手",
      path: "/pages/index/index",
    }
  },
})