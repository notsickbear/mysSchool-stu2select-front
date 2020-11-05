import http from '../tools/http'

const getSmartSortStudent = async (id, period, page = 0, size = 10) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/tutor/smartSort/${period}/${id}/${page}/${size}`).then((res) => {
        ret = res.data
    })
    return ret
};

const getAllStudentByTutorIdAndPeriod = async (id, period, page = 0, size = 10) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/tutor/select/${period}/${id}/${page}/${size}`).then((res) => {
        ret = res.data
    })
    return ret
};

const getAllEnableStudent = async (id, period, page = 0, size = 10) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/tutor/enable/${period}/${id}/${page}/${size}`).then((res) => {
        ret = res.data
    })
    return ret
};

const getTutorById = async (id) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/tutor/${id}`).then((res) => {
        ret = res.data
    })
    return ret
};

const saveTutor = async (param) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.post(`api/tutor`, param).then((res) => {
        ret = res.data
    })
    return ret
};

// es6语法 import、export、export default
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSmartSortStudent: getSmartSortStudent,
    getTutorById: getTutorById,
    getAllStudentByTutorIdAndPeriod: getAllStudentByTutorIdAndPeriod,
    saveTutor: saveTutor,
    getAllEnableStudent: getAllEnableStudent
}
