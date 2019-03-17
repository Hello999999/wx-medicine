import { initialList, cityList } from '../../utils/city';
const app = getApp();

Page({
    data: {
        initialList,
        cityList
    },
    /**
     * 登录
     */
    login: function () {
        wx.login({
            success: function (res) {
                // console.log(res)
                // if (res.code) {
                //     wx.request({
                //         url: 'http://127.0.0.1:7001/login',
                //         data: {
                //             code: res.code
                //         },
                //         success: function(result) {
                //             console.log(result);
                //         }
                //     });
                // } else {
                //     wx.showModal({
                //         title: '提示',
                //         content: '登录失败：' + res.errMsg,
                //         showCancel: false
                //     });
                // }
            }
        })
    },
    /**
     * 输入事件
     */
    input(e) {
        if (e.detail.value) {
            this.search(e.detail.value);
        } else {
            this.setData({
                cityList,
                searching: false
            });
        }
    },
    /**
     * 点击搜索事件
     */
    confirm(e) {
        if (event.detail.value && this.data.cityList.lenth > 0) {
            app.globalData.location.selectedCity = this.data.cityList[0].name;
        }
    },
    /**
     * 搜索
     */
    search(value) {
        let temp = [];
        for (let item of cityList) {
            let key = new RegExp(value, 'i');
            if (key.test(item.name) || (item.fullName && key.test(item.fullName)) || key.test(item.idx) || key.test(item.pinyin)) {
                temp.push(item);
            }
        }
        this.setData({
            cityList: temp,
            searching: true
        });
    },
    /**
     * 首字母查询
     * @param {*} e 
     */
    initialTap(e) {
        let { i } = e.currentTarget.dataset,
            id = 'top';
        if (i != 0) {
            id = this.data.initialIdList[i - 1];
        }
        if (this.data.id != id) {
            this.setData({
                id
            });
        }
    },
    /**
     * 选择城市
     */
    selected(e) {
        let { tag } = e.currentTarget.dataset;
        app.globalData.location.selectedCity = tag;
        wx.navigateBack();
    },
    /**
     * 页面初始化
     */
    pageInit() {
        let that = this;
        let query = wx.createSelectorQuery();
        query.select('.header').boundingClientRect();
        query.exec(rect => {
            that.setData({
                containerHeight: app.globalData.sys.screenHeight - rect[0].height
            });
        });
        let initialIdList = [];
        cityList.map((currentValue, index, arr) => {
            if (index == 0 || (index != 0 && currentValue.idx != arr[index - 1].idx)) {
                initialIdList.push(currentValue.id);
            }
        });
        this.setData({
            initialIdList
        })
    },
    onLoad(options) {
        this.login();
        this.pageInit();
        this.setData({
            localCity: app.globalData.location.localCity
        });
    }
})