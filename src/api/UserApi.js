import http from '../tools/http'

const isCorrectLogin = async (param) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.post(`api/user/login`, param).then((res) => {
        ret = res.data
    })
    return ret
};

const getUserById = async (id) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/user/${id}`).then((res) => {
        ret = res.data
    })
    return ret
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    isCorrectLogin: isCorrectLogin,
    getUserById: getUserById
}