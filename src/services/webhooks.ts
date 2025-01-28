class WebhookService {
  private static listeners: Record<string, Function[]> = {}

  static trigger(event: string, data: any) {
    console.log(`Webhook triggered: ${event}`, data)
    // Simular chamada para endpoint externo
    fetch('https://webhook.site/...', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  static listen(event: string, callback: Function) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(callback)
  }
}

export default WebhookService
