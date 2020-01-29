import { fetch } from '@/utils/request'

// 获取博客列表
export function getBlogList(params) {
  return fetch('koaApi', `/wxCloud/blog/list?start=${params.startNum}&count=${params.count}`, 'get')
}
// 删除
export function delBlogItem(params) {
  return fetch('koaApi', `/wxCloud/blog/del`, 'post', params)
}

// export function getBlogList(prams) {
//   return fetch('koaApi', `/wxCloud/swiper/list`, 'get')
// }
