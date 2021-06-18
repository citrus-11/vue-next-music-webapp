import { get } from './base'

export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  return get('/api/getSongsUrl', {
    mid: songs.map(song => {
      return song.mid
    }),
  }).then(result => {
    const map = result.map
    return songs
      .map(song => {
        song.url = map[song.mid]
        return song
      })
      .filter(song => {
        return song.url.indexOf('vkey') > 1
      })
  })
}

const lyricMap = {}

export function getLyric(song) {
  // 如果歌词已存在，那么不再发送请求，做了一个缓存
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }

  // 如果 mid 对应的歌的歌词存在，直接返回歌词
  const mid = song.mid
  const lyric = lyricMap[mid]
  if (lyric) {
    return Promise.resolve(lyric)
  }

  return get('/api/getLyric', {
    mid,
  }).then(result => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
    lyricMap[mid] = lyric
    return lyric
  })
}
