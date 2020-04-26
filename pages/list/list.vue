<template>
  <view>
    <view class="search-bar">
      <input placeholder="输入名称/全拼/简拼查询" type="text" confirm-type="search" @input="onInputSearch" @confirm="onConfirmSearch"></input>
    </view>

    <view class="list">
      <template v-for="(item, idx) in list" v-if="!item.hide">
        <navigator :url="'/pages/detail/detail?type=' + item.type + '&name=' + item.name" class="item" :key="idx">
          <image class="thumbnail" mode="aspectFit" :src="item.imgSource" lazy-load="true"></image>
          <text class="name">{{item.name}} </text>
          <text class="textrice">{{item.price}}铃</text>
        </navigator>
      </template>
    </view>
  </view>
</template>

<script>
  import fish_nh_data from '@/static/data/fish_nh.js'
  import bug_nh_data from '@/static/data/bug_nh.js'

  export default {
    data() {
      return {
        type: 'fish',
        list: [],
        search_val: ''
      }
    },
    onLoad(options) {
      let list = []
      const type = options.type
      if (options.type === 'fish') {
        fish_nh_data.data.sort((a, b) => {
          a.type = type
          return parseInt(a.price) - parseInt(b.price)
        })
        list = fish_nh_data.data
      } else {
        bug_nh_data.data.sort((a, b) => {
          a.type = type
          return parseInt(a.price) - parseInt(b.price)
        })
        list = bug_nh_data.data
      }
      this.list = list
    },
    onShareAppMessage() {

    },
    methods: {
      //搜索输入
      onInputSearch(e) {
        this.search_val = e.detail.value
      },

      //搜索输入完成
      onConfirmSearch(e) {
        this.onSearch(this.search_val)
      },

      onSearch(search_val) {
        let idx = 0
        for (let item of this.list) {
          let hide = true
          if (item.name.includes(search_val) ||
            item.pinyin[0].includes(search_val) ||
            item.pinyin[1].includes(search_val)) {
            hide = false
          }
          idx++
          this.$set(item, 'hide', hide)
        }
      },
    }
  }
</script>

<style>
  /* 搜索框 */
  .search-bar {
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    top: 0;
    background: white;
    z-index: 9999;
    height: 2em;
    box-shadow: 1px 2px 2px gray;
  }

  .search-bar input {
    border: #dddddd;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    font-size: small;
    padding: 0 1em;
    margin: 0 1em;
    height: 85%;
  }

  .list {
    margin-top: 3em;
  }

  .item {
    margin: 0.5em 0.8em;
    border: 1px;
    border-radius: 5px;
    border-style: solid;
    border-color: #dddddd;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  image.thumbnail {
    flex: 1em;
    height: 42px;
    width: 42px;
  }

  .name {
    flex: 10em;
  }

  .price {
    flex: 1em;
  }
</style>
