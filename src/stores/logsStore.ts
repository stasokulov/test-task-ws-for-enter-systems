import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type TLog = Record<string, string>
export type TLogsArr = TLog[] | []

export const useLogsStore = defineStore('logsStore', () => {
  // State
  const logsArr = ref<TLogsArr>([])

  // Getters
  const debugLogsGetter = computed(() =>
    logsArr.value.filter((log: TLog) => log.Level.toLowerCase() === 'debug')
  )
  const traceLogsGetter = computed(() =>
    logsArr.value.filter((log: TLog) => log.Level.toLowerCase() === 'trace')
  )

  // Actions
  const setLogs = (logs: Record<string, string>[]) => (logsArr.value = logs)

  return { logsArr, setLogs, debugLogsGetter, traceLogsGetter }
})
