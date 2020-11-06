import http from '../tools/http'


const getSmartSortTutor = async (id, page = 0, size = 10) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/student/smartSort/${id}/${page}/${size}`).then((res) => {
        ret = res.data
    })
    return ret
};

const getStudentById = async (id, page = 0, size = 10) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/student/${id}`).then((res) => {
        ret = res.data
    })
    return ret
};

const getAllEnableTutor = async (page = 0, size = 10) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.get(`api/student/enable/${page}/${size}`).then((res) => {
        ret = res.data
    })
    return ret
};

const saveStudent = async (param) => {
    let ret = '';
    // 注意兩邊是tab上方的`而不是單引號
    await http.post(`api/student`, param).then((res) => {
        ret = res.data
    })
    return ret
};

// es6语法 import、export、export default
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSmartSortTutor: getSmartSortTutor,
    getStudentById: getStudentById,
    saveStudent: saveStudent,
    getAllEnableTutor: getAllEnableTutor
}
