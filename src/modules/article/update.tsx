import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Button, Container, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import ArticleStore from 'stores/article/articleStore'

interface IFormInput {
  id: number
  title: string
  description: string
  slug: string
  body: string
}

interface IParams {
  id: string
}

const UpdateArticle = observer(() => {
  const { t } = useTranslation()
  const { id } = useParams<IParams>()
  const history = useHistory()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  useEffect(() => {
    let article = ArticleStore.newEmptyArticle()
    console.log('this store current: ', ArticleStore.current)
    if (ArticleStore.current?.id) {
      article = ArticleStore.current
    } else {
      article.id = parseInt(id)
      article.fetchDetails()
      ArticleStore.current = article
      console.log('this store: ', ArticleStore)
    }
    console.log('this article: ', article)
    initDataForm(article)
  })

  const initDataForm = (data: any) => {
    setValue('id', data.id)
    setValue('title', data.title)
    setValue('description', data.description)
    setValue('slug', data.slug)
    setValue('body', data.body)
  }

  // const newArticle = ArticleStore.newEmptyArticle()

  const onSubmit = async (data: IFormInput) => {
    console.log(data)
    data.id = parseInt(id)
    const success = await ArticleStore.current?.save(data)
    if (success) {
      history.push('/articles')
    }
  }
  return (
    <Container>
      <h1>{t('article.update.title')}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label> ID</Form.Label>
          <Form.Control
            type="text"
            {...register('id', { required: true })}
            disabled
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t('article.update.form.title')}</Form.Label>
          <Form.Control
            type="text"
            {...register('title', { required: true })}
          />
          <Form.Text className="text-danger">
            {errors.title && 'Title required'}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label> {t('article.update.form.slug')}</Form.Label>
          <Form.Control type="text" {...register('slug', { required: true })} />
          <Form.Text className="text-danger">
            {errors.slug && 'Slug required'}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>{t('article.update.form.description')} </Form.Label>
          <Form.Control
            type="input"
            {...register('description', { required: true })}
          />
          <Form.Text className="text-danger">
            {errors.description && 'Description required'}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>{t('article.update.form.body')} </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register('body', { required: true })}
          />
          <Form.Text className="text-danger">
            {errors.body && 'Body required'}
          </Form.Text>
        </Form.Group>
        <Button type="submit">{t('article.update.form.submit')} </Button>
      </Form>
    </Container>
  )
})

export default UpdateArticle
