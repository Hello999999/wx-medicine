import { API } from '../utils/api';
import { request } from './request';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const rpxToPx = (rpx) => {
  let px = rpx * wx.getSystemInfoSync().windowWidth / 750;
  return px;
}

const pxToRpx = (px) => {
  let rpx = px * 750 / wx.getSystemInfoSync().windowWidth;
  return rpx;
}

/**
 * 获取定位权限
 * @param {*} that 
 */
const getLocationAuth = (that, app) => {
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userLocation']) {
        getLocation(that, app);
        that.setData({
          locationAuth: true
        });
      } else {
        if (res.authSetting['scope.userLocation'] == undefined) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              getLocation(that, app);
              that.setData({
                locationAuth: true
              });
            },
            fail() {
              that.setData({
                city: app.globalData.location.localCity || app.globalData.location.defaultCity
              });
            }
          });
        } else {
          that.setData({
            city: app.globalData.location.localCity || app.globalData.location.defaultCity
          });
        }
      }
    }
  });
}

/**
 * 获取当前地理位置
 */
const getLocation = (that, app) => {
  wx.getLocation({
    success(res) {
      let pos = {
        x: res.longitude,
        y: res.latitude
      }
      rGeocoder(pos, that, app);
    }
  })
}

/**
 * 地址正向解析
 */
const fGeocoder = () => {
  request({
    url: API.geocoder,
    data: {
      address: "",
      tag: 'forward'
    }
  }).then(res => {
    console.log(res)
  }).catch(error => console.error(error));
}

/**
 * 地址逆向解析
 */
const rGeocoder = (pos, that, app) => {
  request({
    url: API.geocoder,
    data: {
      location: pos.y + ',' + pos.x,
      coordtype: 'wgs84ll',
      tag: 'reverse'
    }
  }).then(res => {
    let localCity = res.data.result.addressComponent.city.replace('市', (value) => {
      return value.substr(0, value.length - 1);
    });
    if (app.globalData.location.localCity) {
      if (app.globalData.location.localCity != localCity) {
        app.globalData.location.localCity = localCity;
        wx.setStorageSync('localCity', localCity);
        wx.showModal({
          title: '提示',
          content: '检测到您位于' + localCity + ',是否切换至' + localCity,
          success(res) {
            if (res.confirm) {
              that.setData({
                city: localCity
              });
            }
          }
        });
      }
    } else {
      app.globalData.location.localCity = localCity;
      wx.setStorageSync('localCity', localCity);
      that.setData({
        city: localCity
      });
    }

    // that.setData({
    //   location: {
    //     province: addressComponent.province,
    //     city: addressComponent.city,
    //     district: addressComponent.district
    //   }
    // });
  }).catch(error => console.error(error));
}

const login = (app, cb) => {
  wx.login({
    success(res) {
      if (res.code) {
        // console.log(res.code);
        request({
          url: API.login,
          data: {
            code: res.code
          }
        }).then(res => {
          // console.log(res);
          app.globalData.token = res.data.token;
          cb && cb(app);
        }).catch(error => console.error(error));
      } else {
        wx.showToast({
          title: '登录错误，请检查网络连接',
          icon: 'none'
        });
      }
    }
  });
}

const get_userinfo = (app) => {
  request({
    url: API.get_userinfo,
    data: {
      token: app.globalData.token
    },
    method: "post"
  }).then(res => {
    // console.log(res);
    if (res.data.status == 0) {
      app.globalData.userInfo = res.data.data;
    }
  }).catch(error => console.error(error));
}

module.exports = {
  formatTime,
  rpxToPx,
  pxToRpx,
  getLocationAuth,
  getLocation,
  login,
  request,
  get_userinfo
}
