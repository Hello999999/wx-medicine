const app = getApp();

Page({
    data: {
        
    },
    jump(e) {
        let { tag } = e.currentTarget.dataset;
        if (tag == 'search') {
            wx.navigateTo({
                url: '/pages/search/search?dept=1'
            });
        } else if (tag == 'dept') {
            wx.navigateTo({
                // url: '/pages/search/search?dept=1'
            });
        }
    },
    onLoad(options) {
        if (options.dept) {
            this.setData({
                dept: true
            });
        }
    }
})