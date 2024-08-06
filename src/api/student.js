import request from "@/utils/request";
// 获取学员列表
export const getStudentList = (params) => {
  return request({
    url: '/student/studentList',
    params
  })
}

// 获取分类课程对象
export const getCourseObj = () => {
  return request({
    url: '/student/courseObj',
  })
}


// 修改学生信息 
export const reviseStudent = (data) => {
  return request({
    method: 'POST',
    url: '/student/reviseStudent',
    data
  })
}

// 修改学员班期
export const reviseStudentClass = (data) => {
  return request({
    method: 'POST',
    url: '/student/reviseStudentClass',
    data
  })
}

// 修改是否启用课程
export const reviseIsEnable = (data) => {
  return request({
    method: 'POST',
    url: '/student/reviseIsEnable',
    data
  })
}

