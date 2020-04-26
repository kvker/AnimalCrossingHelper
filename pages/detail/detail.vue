<template>
  <view>
    <view class="detail-img">
      <image class="detail-img" mode="aspectFit" :src="inspectData.imgSource"></image>
    </view>

    <view>
      <radio-group @change="onHemisphereChange">
        <view class="radios">
          <radio value='sh' checked="true">南半球</radio>
        </view>
        <view class="radios">
          <radio value='nh'>北半球</radio>
        </view>
      </radio-group>
    </view>

    <view class="detail">
      <text class="info">{{inspectData.name}}</text>
      <text class="info">价格:{{inspectData.price}}</text>
      <text class="info" v-if="inspectData.shadowSize">体型:{{inspectData.shadowSize}}</text>
      <text class="info">出现地点:{{inspectData.location}}</text>
      <view class="month-list">
        <view class="item">
          <text class="month">一月</text>
          <text class="enable">{{inspectData.Jan}}</text>
        </view>
        <view class="item">
          <text class="month">二月</text>
          <text class="enable">{{inspectData.Feb}}</text>
        </view>
        <view class="item">
          <text class="month">三月</text>
          <text class="enable">{{inspectData.Mar}}</text>
        </view>
        <view class="item">
          <text class="month">四月</text>
          <text class="enable">{{inspectData.Apr}}</text>
        </view>
        <view class="item">
          <text class="month">五月</text>
          <text class="enable">{{inspectData.May}}</text>
        </view>
        <view class="item">
          <text class="month">六月</text>
          <text class="enable">{{inspectData.Jun}}</text>
        </view>
        <view class="item">
          <text class="month">七月</text>
          <text class="enable">{{inspectData.Jul}}</text>
        </view>
        <view class="item">
          <text class="month">八月</text>
          <text class="enable">{{inspectData.Aug}}</text>
        </view>
        <view class="item">
          <text class="month">九月</text>
          <text class="enable">{{inspectData.Sep}}</text>
        </view>
        <view class="item">
          <text class="month">十月</text>
          <text class="enable">{{inspectData.Oct}}</text>
        </view>
        <view class="item">
          <text class="month">十一月</text>
          <text class="enable">{{inspectData.Nov}}</text>
        </view>
        <view class="item">
          <text class="month">十二月</text>
          <text class="enable">{{inspectData.Dec}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import fish_nh_data from '@/static/data/fish_nh.js'
  import fish_sh_data from '@/static/data/fish_sh.js'
  import bug_nh_data from '@/static/data/bug_nh.js'
  import bug_sh_data from '@/static/data/bug_sh.js'

  export default {
    data() {
      return {
        dexType: '',
        hemisphere: 'sh',
        name: '',
        inspectData: '',
      }
    },
    onLoad(options) {
      const dexType = options.type
      const hemisphere = this.hemisphere
      const name = options.name
      const inspectData = this.getInspectData(dexType, hemisphere, name)

      this.inspectData = inspectData
      this.dexType = dexType
      this.name = name
    },
    onShareAppMessage() {
      const paramsURL = utils.urlEncode(this.options, 1)
      return {
        title: "图鉴详情:" + this.inspectData.name,
        path: `/pages/detail/detail?type=${this.dexType}&name=${this.name}`
      }
    },
    methods: {
      getInspectData(type, hemisphere, name) {
        let list = []
        if (type == 'fish') {
          if (hemisphere == 'nh') {
            list = fish_nh_data.data
          } else {
            list = fish_sh_data.data
          }
        }
        if (type == 'bug') {
          if (hemisphere == 'nh') {
            list = bug_nh_data.data
          } else {
            list = bug_sh_data.data
          }
        }
        return list.find(i => i.name === name) || {}
      },
      onHemisphereChange(e) {
        const h = e.detail.value
        const dexType = this.dexType
        const name = this.name

        const inspectData = this.getInspectData(dexType, h, name)

        this.hemisphere = h
        this.inspectData = inspectData
      }
    }
  }
</script>

<style>
  view.detail-img {
    display: flex;
    height: 33%;
    justify-content: center;
  }

  image.detail-img {
    width: 128px;
    height: 128px;
    padding: 2em 4em 2em 4em;
  }

  view.detail {
    margin: 2em 1em 2em 1em;
    display: flex;
    flex-direction: column;
  }

  view.month-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: flex-start;
    margin: 2em 0 0 0;
  }

  view.month-list .item {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    flex: 1 1 15%;
    margin: 0.1em;
  }

  p.detail {
    font-weight: 10px;
    padding: 0 0 0 1em;
  }

  .radios {
    float: left;
    padding: 0.2em 1em;
    background: white;
    font-size: small;
  }
</style>
