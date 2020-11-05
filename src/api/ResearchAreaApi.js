import http from '../tools/http'
// async 是 ES7 才有的与异步操作有关的关键字
const getAllResearchArea = async (page = 0, size = 10) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/researchArea/${page}/${size}`).then((res) => {
        ret = res.data
    })
    return ret
};

const saveResearchArea = async (param) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.post(`api/researchArea`, param).then((res) => {
        ret = res.data
    })
    return ret
};

// es6语法 import、export、export default
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllResearchArea: getAllResearchArea,
    saveResearchArea: saveResearchArea
}
