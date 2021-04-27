import homeModule from './home'
import loginModule from './login'
import articleModule from './article'

const init = (): void => {
  homeModule()
  loginModule()
  articleModule()
}

export default init
