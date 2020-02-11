import { fetch } from '@/utils/request'

// 获取轮播图列表
export function getSwiperList() {
  return fetch('koaApi', `/wxCloud/swiper/list`, 'get')
}
