import { ref } from 'vue'

type TEventMessageArr = (string | number | Record<string, string>)[]
type TSuccesAuthEventMessageArr = [number, string, Record<string, string>]

export default function useWebSocket() {
  // ToDo: вынести в константы
  const wsUrl = 'ws://test.enter-systems.ru/'
  const protocolArr = ['wamp', 'soap']
  const login = 'enter'
  const password = 'A505a'
  const callId = 'a8FmfgEp38b1gMas'
  const uri = {
    login: 'http://enter.local/login',
    loginByToken: 'http://enter.local/loginByToken',
    subscribe: 'http://enter.local/subscription/logs/list'
  }

  const token = ref<string | null>(null)
  let pingTimerId: number | null = null
  const subscribeDataArr = ref<Record<string, string>[]>([])

  const getWs = () => {
    return new WebSocket(wsUrl, protocolArr)
  }

  const openWs = () => {
    const ws = getWs()

    ws.onopen = (event) => {}

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      const messageType = message[0]

      if (messageType === 0) {
        signUp(ws)
      }
      if (messageType === 3) {
        handleSuccesAuthEvent(ws, message)
      }
      if (messageType === 4) {
        abortPingSend()
        clearToken()
        showError(message)
      }
      if (messageType === 8) {
        handleSubscribeEvent(message)
      }
    }

    ws.onerror = (event) => {
      showError(event)

      abortPingSend()
      clearToken()
    }

    ws.onclose = (event) => {
      abortPingSend()
      openWs()
    }
  }

  const sendWs = (webSocket: WebSocket, message: TEventMessageArr) =>
    webSocket.send(JSON.stringify(message))

  const callWs = (webSocket: WebSocket, optionalParams: string[]) => {
    const callParams = [2, callId]

    sendWs(webSocket, [...callParams, ...optionalParams])
  }

  const signUp = (webSocket: WebSocket) => {
    const params = token.value ? [uri.loginByToken, token.value] : [uri.login, login, password]
    callWs(webSocket, params)
  }

  const handleSuccesAuthEvent = (webSocket: WebSocket, message: TSuccesAuthEventMessageArr) => {
    token.value = message[2].Token
    subscribeWs(webSocket)
    startPingSend(webSocket)
  }

  const subscribeWs = (webSocket: WebSocket) => {
    sendWs(webSocket, [5, uri.subscribe])
  }

  const handleSubscribeEvent = (message: any[]) => {
    const messageData = message[2]
    if (messageData.SubscribeError) {
      showError(messageData.SubscribeError)
    }
    if (messageData.Items) {
      giveData(messageData.Items)
    }
  }

  const startPingSend = (webSocket: WebSocket) => {
    let counter = 0
    const incrementCounter = () => counter++
    const sendPing = () => {
      const message = [20, counter]
      sendWs(webSocket, message)
      incrementCounter()
    }
    pingTimerId = setInterval(sendPing, 20000)
  }

  const abortPingSend = () => {
    if (pingTimerId) {
      clearInterval(pingTimerId)
    }
  }

  const clearToken = () => (token.value = null)

  const showError = (message: TEventMessageArr | Event) => {
    console.log('Ошибка:', message)
    alert('Ошибка запроса. Подробности в консоли.')
  }

  const giveData = (arr: [Record<string, string>]) => {
    subscribeDataArr.value = arr
  }

  return { openWs, subscribeDataArr }
}
