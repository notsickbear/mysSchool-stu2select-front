import http from '../tools/http'
// async
var getSaltedPro = async (num = 10) => {
    var ret = ''
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/pro/${num}`).then((res) => {
        ret = res.data
    })
    return ret
}

export default {
    getSaltedPro: getSaltedPro
};