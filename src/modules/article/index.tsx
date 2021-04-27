import router from '../../core/router'
import Article from './article'
import CreateArticle from './create'
import UpdateArticle from './update'

const ArticleModule = () => {
  router.addRouter({
    path: '/articles',
    view: <Article />,
    exact: true,
  })
  router.addRouter({
    path: '/articles/create',
    view: <CreateArticle />,
  })
  router.addRouter({
    path: '/articles/:id',
    view: <UpdateArticle />,
    // exact: true,
  })
}

export default ArticleModule
