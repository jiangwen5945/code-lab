import request from '../utils/request'
import axios from 'axios'

export default {
  getSeller: (params) => {
    return request({
      url: '/seller',
      method: 'get',
      data: params
    })
  },
  getTrend: (params) => {
    return request({
      url: '/trend',
      method: 'get',
      data: params
    })
  },
  getMapData: (params) => {
    return request({
      url: '/map',
      method: 'get',
      data: params
    })
  },
  getChinaMap: (params) => {
    return request({
      url: '/map/china',
      method: 'get',
      data: params
    })
  },
  getProvinceMap: (provinceUrl) => {
    return request({
      url: provinceUrl,
      method: 'get',
      data: null
    })
  },
  getRank: (params) => {
    return request({
      url: '/rank',
      method: 'get',
      data: params
    })
  },
  getHotProduct: (params) => {
    return request({
      url: '/hotproduct',
      method: 'get',
      data: params
    })
  },
  getStock: (params) => {
    return request({
      url: '/stock',
      method: 'get',
      data: params
    })
  },
  // 本地数据
  getLocalChinaMap: (params) => {
    return axios.get('http://localhost:5173/public/json/china.json').then((res) => {
      if (res.status == 200) {
        return res.data
      } else {
        return { msg: '数据获取失败' }
      }
    })
  },
  getLocalMap: (path) => {
    return axios.get(`http://localhost:5173/public/${path}`).then((res) => {
      console.log('获取当前地图数据信息', path, res)
      if (res.status == 200) {
        return res.data
      } else {
        return { msg: '数据获取失败' }
      }
    })
  },
  getEchartDemoData: (path) => {
    return axios.get(`/api/examples${path}`).then((res) => {
      if (res.status == 200) {
        return res.data
      } else {
        return { msg: '数据获取失败' }
      }
    })

    // return http.get('/api/examples/data/asset/data/les-miserables.json').then(res => {
    //   console.log('获取官方示例数据', res );
    //   return res
    // })
  }
}
