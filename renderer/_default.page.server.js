import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { renderMetaToString } from 'vue-meta/ssr'
import { createApp } from './app'

export { render }
export { onBeforeRender }
export { passToClient }

const passToClient = ['INITIAL_STATE', 'documentProps']

async function render(pageContext) {
  const { appHtml, documentProps } = pageContext

  const title = documentProps?.title ?? 'SpaceX'
  const description = documentProps?.description ?? 'We deliver payload to space.'

  return escapeInject`
    <html ${ctx.teleports.htmlAttrs || ''}>
      <head ${ctx.teleports.headAttrs || ''}>
      ${ctx.teleports.head || ''}
      </head>
      <body ${ctx.teleports.bodyAttrs || ''}>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      ${ctx.teleports.body || ''}
      </body>
    </html>`
}

async function onBeforeRender(pageContext) {
  const { Page } = pageContext
  const { app, store, metaManager } = createApp({ Page })
  
  app.use(metaManager)
  const ctx = {};

  const appHtml = await renderToString(app, ctx)
  await renderMetaToString(app, ctx)

  const INITIAL_STATE = store.state

  return {
    pageContext: {
      INITIAL_STATE,
      appHtml,
      ctx,
    }
  }
}
