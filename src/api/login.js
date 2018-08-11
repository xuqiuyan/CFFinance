import request from '@/utils/request'

export function login(username, password, verifyCode) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
      verifyCode
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
