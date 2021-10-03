import { createSSRApp, h } from 'vue'
import { createStore } from './store'
import { createMetaManager } from 'vue-meta'

export { createApp }

function createApp(pageContext) {
  const app = createSSRApp({
    render: () => h(pageContext.Page)
  })

  const store = createStore()
  app.use(store)

  const metaManager = createMetaManager()
  app.use(metaManager)

  return { app, store, metaManager }
}
