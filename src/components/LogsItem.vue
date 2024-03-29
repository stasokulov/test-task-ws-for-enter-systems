<script setup lang="ts">
import { type TLog } from '@/stores/logsStore'

defineProps<{
  log: TLog
}>()
</script>

<template>
  <div class="item">
    <span v-html="log.Timestamp"></span>
    <span v-html="log.Level"></span>
    <span v-html="log.Message"></span>
    <span v-html="log.Source"></span>
  </div>
</template>

<style lang="scss">
.item {
  display: flex;

  span:not(:last-child) {
    margin-right: 20px;
  }
}

mark {
  &.active {
    background-color: orange;
  }
}
</style>
