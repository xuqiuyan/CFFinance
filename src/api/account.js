import request from '@/utils/request'
export function changePwd(pwdForm) {
  return request({
    url: '/administrators/password',
    method: 'put',
    data: {
      'oldPassword': pwdForm.oldPwd,
      'newPassword': pwdForm.newPwd
    }
  })
}
// 新增管理员
export function addAccount(account) {
  return request({
    url: '/administrators',
    method: 'post',
    data: {
      'mobile': account.mobile,
      'realname': account.realname,
      'password': account.password,
      'roles': account.roles
    }
  })
}
// 获取管理员列表
export function fetchAccountList() {
  return request({
    url: '/administrators',
    method: 'get'
  })
}
