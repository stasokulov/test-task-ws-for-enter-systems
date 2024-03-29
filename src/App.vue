<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheLogsList from './components/TheLogsList.vue'
</script>

<template>
  <header>
    <TheHeader msg="Тестовое задание" />
  </header>

  <main>
    <TheLogsList />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  height: var(--header-height);
  min-height: var(--header-height);
  padding: 20px 20px 0;
  box-sizing: border-box;
}

main {
  flex-grow: 1;
  max-height: calc(100% - var(--header-height));
  padding: 20px 0 20px 20px;
  box-sizing: border-box;
}
</style>
