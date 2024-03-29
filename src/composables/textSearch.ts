import { computed, ref, nextTick } from 'vue'

export default function useTextSearch() {
  const markedNodesArray = ref<HTMLElement[]>([])
  const activeHighlightedElIndex = ref<number>(0)

  const resetActiveHighlightedElIndex = () => (activeHighlightedElIndex.value = 0)

  const highlightActiveEl = () => {
    clearHighlightedEl()
    markedNodesArray.value[activeHighlightedElIndex.value]?.classList.add('active')
  }

  const clearHighlightedEl = () => {
    if (!markedNodesArray.value.length) return
    markedNodesArray.value.forEach((el) => el.classList.remove('active'))
  }

  const setActiveNextHighlightedEl = () => {
    if (isNextNavSearchDisable.value) return

    activeHighlightedElIndex.value++
    highlightActiveEl()
  }

  const setActivePrevHighlightedEl = () => {
    if (isPrevNavSearchDisable.value) return

    activeHighlightedElIndex.value--
    highlightActiveEl()
  }

  const prepareSearchNavigate = async () => {
    await nextTick()

    resetActiveHighlightedElIndex()
    markedNodesArray.value = Array.from(document.querySelectorAll('mark'))
    if (markedNodesArray.value.length) {
      highlightActiveEl()
    }
  }

  const reSearch = () => {
    resetActiveHighlightedElIndex()
    prepareSearchNavigate()
  }

  const isPrevNavSearchDisable = computed(() => activeHighlightedElIndex.value <= 0)
  const isNextNavSearchDisable = computed(
    () => activeHighlightedElIndex.value + 1 >= markedNodesArray.value.length
  )

  return {
    prepareSearchNavigate,
    reSearch,
    isPrevNavSearchDisable,
    isNextNavSearchDisable,
    setActivePrevHighlightedEl,
    setActiveNextHighlightedEl
  }
}
