<template>
  <view class="content">
    <navigator url="/pages/list/list?type=fish" class="navi-button">
      <image class="icon" mode="aspectFit" src="/static/img/koi.png"></image>
      <text class="btn-text">鱼类图鉴</text>
      <image class="icon" mode="aspectFit" src="/static/img/koi.png"></image>
    </navigator>
    <navigator url="/pages/list/list?type=bug" class="navi-button">
      <image class="icon" mode="aspectFit" src="/static/img/butterfly.png"></image>
      <text class="btn-text">昆虫图鉴</text>
      <image class="icon" mode="aspectFit" src="/static/img/butterfly.png"></image>
    </navigator>

    <view class="desc" style="text-align:center">
      <button class="bd mg0101" @click="onTapEncourageAd">激励开发者</button>
      <text class="tips">目前小程序还在不断更新，欢迎反馈。
      </text>
    </view>

    <view class="adContainer">
      <ad unit-id="adunit-d4d8b6881caf61c7" ad-intervals="30"></ad>
    </view>
  </view>
</template>

<script>
  // 在页面中定义激励视频广告
  let encourageAd = null

  export default {
    data() {
      return {
        title: 'Hello'
      }
    },
    onLoad(options) {
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
    methods: {
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
    }
  }
</script>

<style>
  .navi-button {
    margin: 1.2em 2em;
    padding: 1em;
    text-align: center;
    background-color: #f4f4f4;
    border-radius: 5px;
    border: 0.1em solid #ddd;
  }

  .magin-top {
    margin: 2em 2em 1.2em 2em;
  }

  .icon {
    box-sizing: border-box;
    height: 2em;
    width: 2em;
    vertical-align: middle;
  }

  .btn-text {
    box-sizing: border-box;
    padding: 1em;
    color: #333;
    font-size: 14px;
    font-weight: bold;
  }

  .adContainer {
    position: relative;
    top: 1em;
  }

  .bd {
    margin: 8em 8em 1em 8em;
    padding: 0.6em;
    background-color: #fff;
    font-size: small;
    border: 1px solid gainsboro;
    color: #666;
  }

  .tips {
    font-size: 12px;
    color: #666;
  }
</style>
