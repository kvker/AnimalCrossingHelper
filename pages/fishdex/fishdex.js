const fish_nh_data = require('../../database/fish_nh.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    fish_nh_data.data.sort(function(a, b) {
      return parseInt(a.price) - parseInt(b.price)
    })
    this.setData({
      dataList: fish_nh_data.data
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  //搜索输入
  onInputSearch: function(e) {
    this.setData({
      searchInput: e.detail.value
    })
  },

  //搜索输入完成
  onConfirmSearch: function(e) {
    this.onSearch(this.data.searchInput)
    this.setData({
      dataList: this.data.dataList
    })
  },

  onSearch: function(pattern) {
    for (var i in this.data.dataList) {
      var item = this.data.dataList[i]
      var reg = new RegExp(pattern)
      if (reg.test(item.name) || reg.test(item.pinyin[0]) || reg.test(item.pinyin[1])) {
        this.data.dataList[i].hide = false
      } else {
        this.data.dataList[i].hide = true
      }
    }
  },
})