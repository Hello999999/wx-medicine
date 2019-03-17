Page({
    data: {

    },
    input(e) {
        let { tag } = e.currentTarget.dataset;
        if (tag == 1) {
            this.setData({
                value: e.detail.value
            });
        } else if (tag == 2) {
            this.setData({
                money: e.detail.value,
                length: e.detail.value.toString().length
            });
            if (e.detail.value.length == 6) {
                wx.showLoading({
                    title: '充值中...',
                    mask: true
                });
                this.putRequest(() => {
                    wx.hideLoading();
                    wx.showToast({
                        title: '充值成功',
                        icon: 'none'
                    });
                    let id = setTimeout(() => {
                        wx.navigateBack();
                        clearTimeout(id);
                    }, 1000);
                });
            }
        }
    },
    put(e) {
        if (!this.data.value || /^\.|^.+\..{3,}/.test(this.data.value)) {
            wx.showToast({
                title: '请输入正确金额',
                icon: 'none'
            });
            return;
        }
        let valueStr = this.data.value,
            idx = valueStr.indexOf('.');
        if (idx > -1) {
            if (idx == valueStr.length - 1) {
                valueStr += '00';
            } else if (idx == valueStr.length - 2) {
                valueStr += '0';
            }
        } else {
            valueStr += '.00';
        }
        let that = this;
        wx.showLoading({
            title: '正在加载',
            mask: true
        });
        let id = setTimeout(() => {
            wx.hideLoading();
            that.setData({
                showPop: true,
                focus: true,
                valueStr
            });
            clearTimeout(id);
        }, 200);
    },
    close() {
        this.setData({
            showPop: false
        });
    },
    itemTap() {
        this.setData({
            focus: true
        });
    },
    putRequest(cb) {
        cb && cb();
    }
})