import { createSSRApp, h } from 'vue'
import { createStore } from './store'

export { createApp }

function createApp(pageContext) {
  const app = createSSRApp({
    render: () => h(pageContext.Page)
  })

  const store = createStore()
  app.use(store)

  app.config.globalProperties.$pageContext = pageContext;
  app.provide('pageContext', pageContext);

  return { app, store }
}
