import http from '../tools/http'


const getSmartSortTutor = async (page = 0, size = 10, id) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/student/smartSort/${id}/${page}/${size}`).then((res) => {
        ret = res.data
    })
    return ret
};

const getStudentById = async (page = 0, size = 10, id) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/student/${id}`).then((res) => {
        ret = res.data
    })
    return ret
};

// es6语法 import、export、export default
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSmartSortTutor: getSmartSortTutor,
    getStudentById: getStudentById
}

export {getSmartSortTutor, getStudentById}
