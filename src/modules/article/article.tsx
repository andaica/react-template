import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import ArticleStore from 'stores/article/articleStore'
import ArticleObject from 'stores/article/articleObject'

const Article = observer(() => {
  const history = useHistory()
  useEffect(() => {
    ArticleStore.getArticle()
  }, [])

  const deleteArticle = async (article: ArticleObject) => {
    console.log(article)
    article.delete()
    ArticleStore.deleteItem(article)
  }

  const editArticle = (article: ArticleObject) => {
    console.log(article)
    ArticleStore.selectItem(article)
    history.push('/articles/' + article.id)
  }

  return (
    <Container>
      <h1>List Article</h1>
      <Link to="/articles/create">
        <Button>Create </Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Body</th>
            <th>Updated at</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ArticleStore.datas.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.description}</td>
              <td>{article.body}</td>
              <td>{article.updated_at}</td>
              <td>
                <Button onClick={() => editArticle(article)}> Edit</Button>
              </td>
              <td>
                <Button onClick={() => deleteArticle(article)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
})

export default Article
