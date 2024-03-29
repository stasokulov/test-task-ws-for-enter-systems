<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">
      {{ msg }} <a href="http://test.enter-systems.ru/" target="_blank" rel="noopener">(ссылка)</a>
    </h1>
    <p>
      Подключиться по WS, авторизоваться, получать логи, отобразить часть логов, остальные -
      дорендерить при скролле, добавить фильтрацию и текстовый поиск с навигацией
    </p>
    <p>Технологии: Vue 3, Pinia, TypeScript, Websocket.</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2rem;
  position: relative;
  margin: 0;
  text-align: center;
}

p {
  margin: 0;
  font-size: 1rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5em;
  }

  p {
    font-size: 0.7rem;
  }

  a {
    text-decoration: underline;
  }
}
</style>
