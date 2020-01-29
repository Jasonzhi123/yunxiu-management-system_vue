import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

export const apiGetway = {
  demo: 'http://192.168.131.11:9081',
  koaApi: 'http://localhost:30001'
}

service.interceptors.request.use(
  config => {
    if (store.getters.token || getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 判断 token 失效的场景
      if (res.code === -2) {
        // 如果 token 失效，则弹出确认对话框，用户点击后，清空 token 并返回登录页面
        MessageBox.confirm('Token 失效，请重新登录', '确认退出登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || '请求失败'))
    } else {
      return res
    }
  },
  error => {
    let message = error.message || '请求失败'
    if (error.response && error.response.data) {
      const { data } = error.response
      message = data.msg
    }
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
 * getway: api网关名; 不传时，表示取本地mock数据
 * action: 接口方法名(除去ngix代理（ip+网关）部分)
 * params: 请求入参
 * type：默认为post，不传时表示为post方式请求；传get时，表示为get方式请求
 * bmtype：post提交数据的编码方式; 不传值时，表示当前post提交编码方式为application/json；传formdata时，表示编码方式为multipart/form-data；
 * isBlob: 指定接口返回一个blob对象
 * timeOut: 设置特定接口的请求超时时间
 */

export function fetch(getway, action, type, params, bmtype, isBlob, timeOut) {
  return new Promise((resolve, reject) => {
    if (getway) {
      action = `${apiGetway[getway]}${action}`
    }
    if (type === 'get') {
      if (params) {
        action = `${action}/${params}`
      }
      // 清除IE下get请求的缓存
      if (action.indexOf('?') !== -1) {
        action += `&${Date.parse(new Date()) / 1000}`
      } else {
        action += `?${Date.parse(new Date()) / 1000}`
      }

      service.get(action, {
        timeout: timeOut || service.defaults.timeout
      }).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
    } else {
      if (!params) {
        params = ''
      }
      // 配置请求头
      const headers = {}
      if (bmtype === 'formdata') {
        headers['content-type'] = 'multipart/form-data'
      } else {
        headers['content-type'] = 'application/json;charset=UTF-8'
      }
      // 返回值为二进制流的时候的处理方式
      if (isBlob === true) {
        service({
          url: action,
          data: params,
          method: 'POST',
          responseType: 'blob',
          timeout: timeOut || service.defaults.baseURL
        }).then((response) => {
          // 这里只返回response的原因是下载文件可能需要拿响应头的东西
          resolve(response)
        }, err => {
          reject(err)
        }).catch((error) => {
          reject(error)
        })
      } else { // 普通请求返回处理
        service.post(action, params, {
          headers: headers,
          timeout: timeOut || service.defaults.timeOut
        }).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        }).catch((error) => {
          reject(error)
        })
      }
    }
  })
}

