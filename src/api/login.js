import request from "@/utils/request";
// http://localhost:5252/login 


export const login = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

// 登出接口  

export const logout = () => {
  return request({
    url: '/login/logout',
  })
}

// 验证登录 
export const checkLogin = () => {
  return request({
    url: '/login/checkLogin',
  })
}




