import { tdist } from '../../utils/region';
const app = getApp();

Page({
    /**
     * 选择区域
     * @param {*} e 
     */
    chooseRegion(e) {
        let { id, name } = e.currentTarget.dataset;
        let region = this.options.region ? this.options.region + ' ' + name : name;
        if (this.getRegionList(id).length > 0) {
            wx.navigateTo({
                url: `/pages/region/region?id=${id}&time=${parseInt(this.options.time) + 1}&region=${region}`
            });
        } else {
            app.globalData.region = region;
            wx.navigateBack({
                delta: parseInt(this.options.time)
            });
        }
    },
    
    /**
     * 获取区域列表
     * @param {*} id 
     */
    getRegionList(id = 1) {
        let temp = [];
        let keys = Object.keys(tdist);
        keys.map(value => {
            if (tdist[value][1] == id) {
                temp.push(tdist[value].concat([value]));
            }
        });
        return temp;
    },

    onLoad(options) {
        wx.showLoading({
            title: '加载中'
        });
        this.setData({
            regionList: this.getRegionList(options.id)
        }, () => {
            wx.hideLoading();
        });
    }
})