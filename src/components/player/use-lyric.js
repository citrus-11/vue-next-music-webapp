import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'

export default function useLyric({ songReady, currentTime }) {
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)
  const currentLyric = ref(null)
  const currentLineNum = ref(0)
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)
  const pureMusicLyric = ref(0)
  const playingLyric = ref('')

  // 监听歌曲变化，一旦变化就获取相应变化歌曲的歌词
  watch(currentSong, async newSong => {
    // 不合法的情况
    if (!newSong.url || !newSong.id) {
      return
    }

    // 解决切歌时歌曲反复跳动的情况，重置状态
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = 0
    pureMusicLyric.value = ''
    playingLyric.value = ''

    // 调用接口，传入当前歌曲，获取歌词
    const lyric = await getLyric(newSong)
    store.commit('addSongLyric', {
      song: newSong,
      lyric,
    })

    // 当歌词发生变化的话就没必要进行解析，直接 return
    if (currentSong.value.lyric !== lyric) {
      return
    }

    currentLyric.value = new Lyric(lyric, handleLyric)

    // 如果拿不到歌词
    const hasLyric = currentLyric.value.lines.length
    if (hasLyric) {
      // 当歌曲开始，让歌词同步播放
      if (songReady.value) {
        playLyric()
      }
    } else {
      // 则显示纯音乐文案
      playingLyric.value = pureMusicLyric.value = lyric.replace(
        /\[(\d{2}):(\d{2}):(\d{2})\]/g,
        '',
      )
    }
  })

  // 播放歌词
  function playLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  // 歌曲暂停歌词暂停播放
  function stopLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  // 歌词处理
  function handleLyric({ lineNum, txt }) {
    currentLineNum.value = lineNum
    // 当前播放歌词
    playingLyric.value = txt
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value

    if (!listEl) {
      return
    }

    // 高亮在第七行
    if (lineNum > 6) {
      const lineEl = listEl.children[lineNum - 6]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }

  return {
    currentLyric,
    currentLineNum,
    playLyric,
    lyricScrollRef,
    lyricListRef,
    stopLyric,
    pureMusicLyric,
    playingLyric,
  }
}
