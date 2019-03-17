const app = getApp();

Page({
    data: {
        loading: false,
        focus: true,
        keyword: '',
        hospList: 2,
        deptList: 2,
        doctorList: 2
    },
    /**
     * 点击搜索图标
     */
    searchHandle(e) {
        let { tag } = e.currentTarget.dataset;
        this.searchType(tag);
    },
    /**
     * 键盘输入事件
     */
    inputHandle(e) {
        this.setData({
            keyword: e.detail.value
        });
    },
    /**
     * 输入框聚焦事件
     */
    focusHandle(e) {
        this.setData({
            focus: true
        });
    },
    /**
     * 输入框失去焦点事件
     */
    blurHandle(e) {
        this.setData({
            focus: false
        });
    },
    /**
     * 点击完成按钮事件
     */
    confirmHandle(e) {
        let { tag } = e.currentTarget.dataset;
        this.searchType(tag);
    },
    /**
     * 选择搜索类型
     */
    searchType(tag) {
        if (tag == 'dept') {
            this.deptSearch();
        } else if (tag == 'hosp') {
            this.hopsSearch();
        }
    },
    /**
     * 搜索科室
     */
    deptSearch(keyword) {

    },
    /**
     * 搜索医院
     */
    hopsSearch(keyword) {

    },
    /**
     * 清空输入框
     */
    reset(e) {
        this.setData({
            keyword: '',
            focus: true
        });
    },
    /**
     * 点击取消事件
     */
    cancal(e) {
        wx.navigateBack();
    },
    /**
     * 进入医院详情
     */
    jump(e) {
        let { tag } = e.currentTarget.dataset;
        if (tag == 'hosp') {
            wx.navigateTo({
                url: '/pages/dept/dept?id=' + e.currentTarget.dataset.i
            });
        }
    },
    loadData() {
        // request({
        //     url: '',
        //     data: {
        //         p: 1,
        //         page_size: 10
        //     }
        // }).then(res => {
        //     console.log(res);
        // }).catch(error => {
        //     console.error(error)
        // });
        // this.setData({
        //     loading: false
        // })
    },
    loadMoreData() {
        // this.setData({
        //     loadMore: true
        // });
        // let p = this.data.currentPage;
        // request({
        //     url: '',
        //     data: {
        //         p,
        //         page_size: 10
        //     }
        // }).then(res => {
        //     console.log(res);
        // }).catch(error => {
        //     console.error(error)
        // });
        // this.setData({
        //     loadMore: false
        // })
    },
    /**
     * 第一次进入页面
     * @param {*} options 
     */
    onLoad: function (options) {
        if (options.keyword) {
            this.setData({
                keyword: options.keyword
            });
        }
        if (options.dept) {
            this.setData({
                dept: true
            });
        }
        this.loadData();
    },
    /**
     * 上拉触底事件
     */
    onReachBottom() {
        this.loadMoreData();
    }
})