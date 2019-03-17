import { uploadFile } from "../../utils/request";

Page({
  data: {
    cardData: {
      title: '弹窗',
      cancel: '取消',
      confirm: '确定'
    }
  },
  chooseImage(e) {
    let that = this;
    wx.chooseImage({
      success(res) {
        console.log(res);
        that.setData({
          filePath: res.tempFiles[0].path,
          fileSize: res.tempFiles[0].size
        });
      }
    });
  },
  upload(e) {
    let { filePath, fileSize } = this.data;
    if (filePath && fileSize) {
      uploadFile({
        url: "http://127.0.0.1:7001/common/upload",
        method: "post",
        filePath,
        name: "file",
        header: { "content-type": "multipart/form-data" },
        formData: { fileSize }
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => console.error(error));
    } else {
      wx.showToast({
        title: "请先选择文件",
        icon: "none"
      });
    }
  },

  /**
   * 卡片输入
   * @param {*} e 
   */
  cardInput(e) {

  },

  /**
   * 卡片按钮点击事件
   * @param {*} e 
   */
  cardTap(e) {
    let { tag } = e.currentTarget.dataset;
    if (tag == 'confirm') {

    }
    this.setData({
      show_pop: false
    });
  },
});
