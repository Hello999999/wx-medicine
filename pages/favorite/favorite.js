import { rpxToPx, pxToRpx } from '../../utils/util';

Page({
    data: {
        statusWidth: 30,
        currentIndex: 0,
        list: 2
    },
    tabTap(e) {
        let { i } = e.currentTarget.dataset;
        if (this.data.currentIndex == i) {
            return;
        }
        this.setData({
            currentIndex: i
        });
    },
    jump(e) {
        let { tag, i } = e.currentTarget.dataset;
        if (tag == 'hosp') {
            wx.navigateTo({
                url: '/pages/hosp/hosp?id=' + i
            });
        } else if (tag == 'doctor') {
            wx.navigateTo({
                url: '/pages/doctor/doctor?id=' + i
            });
        }
    },
    pageInit() {
        let that = this;
        wx.createSelectorQuery().selectAll(".tab .label").boundingClientRect((rect) => {
            let tabStatus = [(rect[0].width - rpxToPx(that.data.statusWidth)) / 2, rect[0].width + (rect[0].width - rpxToPx(that.data.statusWidth)) / 2];
            that.setData({
                tabStatus
            });
        }).exec();
    },
    onLoad(options) {
        this.pageInit();
    }
})