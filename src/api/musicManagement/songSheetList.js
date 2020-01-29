import { fetch } from '@/utils/request'

// 获取歌单列表
export function getSongSheetList(params) {
  return fetch('koaApi', `/wxCloud/songSheet/list?start=${params.start}&count=${params.count}`, 'get')
}
// 获取歌单详情
export function getSongSheetDetail(params) {
  return fetch('koaApi', `/wxCloud/songSheet/getById?id=${params.id}`, 'get')
}
// 删除歌单详情
export function deleteSongSheetDetail(params) {
  return fetch('koaApi', `/wxCloud/songSheet/delete?id=${params.id}`, 'get')
}
