<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useInfiniteScroll } from '@vueuse/core'
import { useLogsStore } from '@/stores/logsStore'
import LogsItem from './LogsItem.vue'
import useTextSearch from '@/composables/textSearch'
import useWebSocket from '@/composables/webSocket'

const logsStore = useLogsStore()
const { setLogs } = logsStore
const { logsArr, debugLogsGetter, traceLogsGetter } = storeToRefs(logsStore)

const logsListEl = ref<HTMLElement | null>(null)

//  WS
const { openWs, subscribeDataArr } = useWebSocket()

const setLogsToStore = () => {
  setLogs(subscribeDataArr.value)
}

openWs()

watch(subscribeDataArr, setLogsToStore)
//  End WS

// Filter logs
const filterOptions = ['no filter', 'debug', 'trace']

const selectedFilter = ref<string>('')

const filtredLogs = computed(() => {
  if (selectedFilter.value === 'debug') return debugLogsGetter.value
  if (selectedFilter.value === 'trace') return traceLogsGetter.value
  return logsArr.value
})
// End filter logs

// Lazy render logs
const lazyLoadingLogsCounter = ref<number>(10)

const lazyLoadingLogs = computed(() => {
  return [...filtredLogs.value.slice(0, lazyLoadingLogsCounter.value)]
})

useInfiniteScroll(
  logsListEl,
  () => {
    if (filtredLogs.value.length <= lazyLoadingLogsCounter.value) return
    lazyLoadingLogsCounter.value += 10
  },
  { distance: 1 }
)
// End lazy render logs

// Search
const searchText = ref<string>('')

const highlightedLogs = computed(() => {
  const startMarkTag = '<mark>'
  const endMarkTag = '</mark>'

  if (!searchText.value) return lazyLoadingLogs.value

  const regex = new RegExp(`${searchText.value}`, 'gi')

  let newLogsArr: [Record<string, string>] = [{}]
  lazyLoadingLogs.value.forEach((log) => {
    const newLog: Record<string, string> = {}
    for (const key in log) {
      newLog[key] = log[key].replace(regex, (str) => `${startMarkTag}${str}${endMarkTag}`)
    }
    newLogsArr.push(newLog)
  })
  return newLogsArr
})
// End search

// Search navigate
const {
  prepareSearchNavigate,
  reSearch,
  isPrevNavSearchDisable,
  setActivePrevHighlightedEl,
  isNextNavSearchDisable,
  setActiveNextHighlightedEl
} = useTextSearch()

watch(searchText, prepareSearchNavigate)
watch(filtredLogs, reSearch)
// End search navigate
</script>

<template>
  <div class="logs-container">
    <div>
      <div>
        Filter:
        <select v-model="selectedFilter">
          <option v-for="item in filterOptions" :key="item">{{ item }}</option>
        </select>
      </div>
      <div>
        Search:
        <input type="text" v-model="searchText" />
        <button v-if="!isPrevNavSearchDisable" @click="setActivePrevHighlightedEl">prev</button>
        <button v-if="!isNextNavSearchDisable" @click="setActiveNextHighlightedEl">next</button>
      </div>
    </div>
    <div ref="logsListEl" class="logs-container__list">
      <LogsItem v-for="(log, index) in highlightedLogs" :key="index" :log="log" />
    </div>
  </div>
</template>

<style scoped>
.logs-container {
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.logs-container__list {
  max-height: 100%;
  overflow-y: scroll;
}
</style>
