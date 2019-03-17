import { API } from '../../utils/api';
const RESTful = require('../../utils/request');
const app = getApp();

Page({
  data: {

  },

  /**
  * 跳转
  * @param {*} e 
  */
  jump(e) {
    let url = "",
      dataset = e.currentTarget.dataset;
    for (let i in dataset) {
      if (i == 'i') {
        continue;
      }
      if (i == 'url') {
        url = dataset[i] + url;
      } else {
        let temp = "";
        if (url.search(/\?/g) > -1) {
          temp = '&';
        } else {
          temp = '?';
        }
        url += temp + i + '=' + dataset[i];
      }
    }
    wx.navigateTo({
      url
    });
  },

  /**
   * 点击搜索事件
   * @param {*} e 
   */
  searchEvent(e) {
    // console.log(e);
    let { tag } = e.detail;
    if (tag == 'search') {
      let { keyword } = e.detail.keyword;
      if (!keyword) {
        wx.showToast({
          title: '请输入要搜索的内容',
          icon: 'none'
        });
      }
      if (this.data.noData) {
        this.setData({
          noData: false
        });
      }
      switch (this.options.tag) {
        case 'hosp':
          this.search({
            url: API.hosp_list,
            data: {
              keyword
            }
          }, (res) => {
            if (res.data.status == 0) {
              let data = {},
                newArr = res.data.data;
              if (newArr.length > 0) {
                data.hospList = newArr;
              } else {
                data.noData = true;
              }
              this.setData(data);
            }
          });
          break;
        default:
          break;
      }
    } else {
      wx.navigateBack();
    }
  },

  /**
   * 搜索列表
   * @param {*} data 
   * @param {*} cb 
   */
  search(data, cb) {
    wx.showLoading({
      title: '搜索中...',
      mask: true
    });
    RESTful.request(data).then(res => {
      // console.log(res);
      wx.hideLoading();
      cb && cb(res);
    }).catch(error => console.error(error));
  },

  onLoad(options) {
    if (options.tag) {
      this.setData({
        tag: options.tag
      });
    }
  }
})