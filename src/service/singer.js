import { get } from './base'

// 获取歌手接口
export function getSingerList() {
  return get('/api/getSingerList')
}

export function getSingerDetail(singer) {
  return get('/api/getSingerDetail', {
    mid: singer.mid,
  })
}
