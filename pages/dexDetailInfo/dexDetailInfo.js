const utils = require('../../utils/utils')

var fish_nh_data = require('../../database/fish_nh.js')
var fish_sh_data = require('../../database/fish_sh.js')
var bug_nh_data = require('../../database/bug_nh.js')
var bug_sh_data = require('../../database/bug_sh.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dexType: 'undefined',
    hemisphere: 'sh',
    name: '',
    inspectData: 'undefined',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var dexType = options.type
    var hemisphere = this.data.hemisphere
    var name = options.name

    var inspectData = this.getInspectData(dexType, hemisphere, name)

    this.setData({
      inspectData: inspectData,
      dexType: dexType,
      name: name,
    })
  },

  getInspectData(type, hemisphere, name) {
    var dataList = 'undefined'
    if (type == 'fish') {
      if (hemisphere == 'nh') {
        dataList = fish_nh_data.data
      } else {
        dataList = fish_sh_data.data
      }
    }
    if (type == 'bug') {
      if (hemisphere == 'nh') {
        dataList = bug_nh_data.data
      } else {
        dataList = bug_sh_data.data
      }
    }
    name = decodeURI(name)
    for (var item of dataList) {
      if (item.name == name)
        return item
    }
    return {}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    var paramsURL = utils.urlEncode(this.options, 1)
    return {
      title: "图鉴详情:" + this.data.inspectData.name,
      path: this.route + paramsURL
    }
  },

  onHemisphereChange: function(e) {
    var h = e.detail.value
    var dexType = this.data.dexType
    var name = this.data.name

    var inspectData = this.getInspectData(dexType, h, name)

    this.setData({
      hemisphere: h,
      inspectData: inspectData
    })
  }
})