import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { createApp } from './app'

export { render }
export { onBeforeRender }
export { passToClient }

const passToClient = ['INITIAL_STATE']

async function render(pageContext) {
  const { appHtml, INITIAL_STATE } = pageContext

  /**
   * assign custom meta info here
   */
  const title = INITIAL_STATE?.title ?? 'Default title here'
  const description = INITIAL_STATE?.description ?? 'Default description here'

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
