import http from "./http-common";

const getDepartments = (name) => {
    return http.get(`/dept/${name}`)
}

const DeptService = {
    getDepartments
}

export default DeptService