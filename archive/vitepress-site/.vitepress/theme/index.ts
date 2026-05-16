import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import '@wuyangfan/nova-ui/styles.css'
import LivePlayground from './components/LivePlayground'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LivePlayground', LivePlayground)
  },
}

export default theme
