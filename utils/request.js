function request(params) {
  if (params.header) {
    if (!params.header['content-type']) {
      params.header['content-type'] = 'application/x-www-form-urlencoded';
    }
  } else {
    params.header = { 'content-type': 'application/x-www-form-urlencoded' }
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success(res) {
        resolve(res);
      },
      fail(error) {
        reject(error);
      }
    });
  });
}

function uploadFile(params) {
  if (params.header) {
    if (!params.header['content-type']) {
      params.header['content-type'] = 'multipart/form-data';
    }
  } else {
    params.header = { 'content-type': 'multipart/form-data' }
  }
  params.name = "file";
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      ...params,
      success(res) {
        res.data = JSON.parse(res.data);
        resolve(res);
      },
      fail(error) {
        reject(error);
      }
    });
  })
}

function show(params) {
  params.url += '/' + params.data.id;
  delete params.data;
  return request(params);
}

function update(params) {
  params.url += '/' + params.data.id;
  delete params.data.id;
  params.method = 'PUT';
  return request(params);
}

function destroy(params) {
  params.url += '/' + params.data.id;
  delete params.data;
  params.method = 'DELETE';
  return request(params);
}

module.exports = {
  request,
  uploadFile,
  show,
  update,
  destroy
}