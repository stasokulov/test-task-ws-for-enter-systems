# test-task-ws-for-enter-systems

Тестовое задание.

Технологии: Vue 3, Pinia, TypeScript, Websocket.

~~Ссылка на сайт: https://stasokulov.github.io/test-task-ws-for-enter-systems/~~

Сайт не работает, т.к. заказчиком предоставлено api без шифрования (ws://), а сервис Github Pages выдает адреса с шифрованием (https://). Нужен хостинг с http://, или api с wss://.

На локальной машине проект поднимается и работает.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
