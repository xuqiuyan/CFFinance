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

// 提现审核通过
export function withdrawAccept(id) {
  return request({
    url: '/withdraws/' + id + '/accept',
    method: 'post'
  })
}

// 提现审核拒绝
export function withdrawReject(id, msg) {
  return request({
    url: '/withdraws/' + id + '/reject',
    method: 'post',
    data: {
      'message': msg
    }
  })
}

// 提成列表
export function fetchBonusesList(listQuery) {
  return request({
    url: '/bonuses?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit + '&approvalStatus=' + listQuery.approvalStatus,
    method: 'get'
  })
}

// 提成详情
export function fetchBonusesInfo(id) {
  return request({
    url: '/bonuses/' + id,
    method: 'get'
  })
}

// 提成审核通过
export function bonusesAccept(id) {
  return request({
    url: '/bonuses/' + id + '/accept',
    method: 'post'
  })
}

// 提成审核拒绝
export function bonusesReject(id, msg) {
  return request({
    url: '/bonuses/' + id + '/reject',
    method: 'post',
    data: {
      'message': msg
    }
  })
}
