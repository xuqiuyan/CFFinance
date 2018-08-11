import request from '@/utils/request'
export function fetchASList(listQuery) {
  return request({
    url: '/accountstatements?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit,
    method: 'get'
  })
}
// 提现列表
export function fetchWithdrawList(listQuery) {
  return request({
    url: '/withdraws?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit + '&status=' + listQuery.status,
    method: 'get'
  })
}

// 提现详情
export function fetchWithdrawInfo(id) {
  return request({
    url: '/withdraws/' + id,
    method: 'get'
  })
}

// 审核通过
export function withdrawAccept(id) {
  return request({
    url: '/withdraws/' + id + '/accept',
    method: 'post'
  })
}

// 审核拒绝
export function withdrawReject(id, msg) {
  return request({
    url: '/withdraws/' + id + '/reject',
    method: 'post',
    data: {
      'message': msg
    }
  })
}
