import { fetch } from '@/utils/request'

export function login(data) {
  return fetch('', '/user/login', 'post', data)
}

export function getInfo() {
  return fetch('', '/user/info', 'get')
}

export function logout() {
  return fetch('', '/user/logout', 'post')
}
