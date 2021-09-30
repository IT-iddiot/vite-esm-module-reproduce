import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { createApp } from './app'

export { render }
export { onBeforeRender }
export { passToClient }

const passToClient = ['INITIAL_STATE', 'documentProps']

async function render(pageContext) {
  const { appHtml, documentProps } = pageContext

  const title = documentProps?.title ?? 'SpaceX'
  const description = documentProps?.description ?? 'We deliver payload to space.'

  return escapeInject`<html>
    <head>
      <title>${title}</title>
      <meta name="description" content="${description}">
    </head>
    <body>
      <div id="root">
        ${dangerouslySkipEscape(appHtml)}
      </div>
    </body>
  </html>`
}

async function onBeforeRender(pageContext) {
  const { Page } = pageContext
  const { app, store } = createApp({ Page })
  
  const appHtml = await renderToString(app)

  const INITIAL_STATE = store.state

  return {
    pageContext: {
      INITIAL_STATE,
      appHtml
    }
  }
}
