import { Button, Container, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import ArticleStore from 'stores/article/articleStore'

interface IFormInput {
  title: string
  description: string
  slug: string
  body: string
}

const CreateArticle = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const newArticle = ArticleStore.newEmptyArticle()

  const onSubmit = async (data: IFormInput) => {
    console.log(data)
    const success = await newArticle.save(data)
    if (success) {
      history.push('/articles')
    }
  }
  return (
    <Container>
      <h1>{t('article.create.title')}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label> Title</Form.Label>
          <Form.Control
            type="text"
            {...register('title', { required: true })}
          />
          <Form.Text className="text-danger">
            {errors.title && 'Title required'}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label> Slug</Form.Label>
          <Form.Control type="text" {...register('slug', { required: true })} />
          <Form.Text className="text-danger">
            {errors.slug && 'Slug required'}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label> Description</Form.Label>
          <Form.Control
            type="input"
            {...register('description', { required: true })}
          />
          <Form.Text className="text-danger">
            {errors.description && 'Description required'}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label> Body </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register('body', { required: true })}
          />
          <Form.Text className="text-danger">
            {errors.body && 'Body required'}
          </Form.Text>
        </Form.Group>
        <Button type="submit"> Submit </Button>
      </Form>
    </Container>
  )
}

export default CreateArticle
