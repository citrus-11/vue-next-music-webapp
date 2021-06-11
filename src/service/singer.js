import { get } from './base'

// 获取歌手接口
export default function getSingerList() {
  return get('/api/getSingerList')
}
