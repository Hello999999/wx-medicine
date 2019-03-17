import { HOST } from '../config';

const API = {
    // 登录
    login: HOST + '/common/login',

    // 地址解析
    geocoder: HOST + '/common/geocoder',

    // 上传文件
    upload: HOST + "/common/upload",

    // 保存用户信息
    set_userinfo: HOST + '/user/set_userinfo',

    // 获取用户信息
    get_userinfo: HOST + '/user/get_userinfo',

    // 医院
    hosp: HOST + "/hospital",

    // 获取医院列表
    hosp_list: HOST + "/hosp_list",

    // 批量删除医院
    hosp_delete: HOST + "/hosp_delete",

    // 科室
    dept: HOST + "/department",

    // 获取科室列表
    dept_list: HOST + "/dept_list",

    // 批量删除科室
    dept_delete: HOST + "/dept_delete",

    // 医生
    doctor: HOST + "/doctor",

    // 获取医生列表
    doctor_list: HOST + "/doctor_list",

    // 批量删除医生
    doctor_delete: HOST + "/doctor_delete",

    // 用户
    user: HOST + "/user",

    // 获取用户列表
    user_list: HOST + "/user_list",

    // 批量删除用户
    user_delete: HOST + "/user_delete",

    // 就诊人
    patient: HOST + "/patient",

    // 获取就诊人列表
    patient_list: HOST + "/patient_list",

    // 批量删除就诊人
    patient_delete: HOST + "/patient_delete",

};

module.exports = {
    API
}