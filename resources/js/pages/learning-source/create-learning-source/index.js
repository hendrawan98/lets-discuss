import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import axios from 'axios'
import Cookies from 'universal-cookie'

import Button from '@components/common/button'
import Card from '@components/common/card'
import Layout from '@components/common/layout'
import Typography from '@components/common/typography'
import Trending from '@icons/trending/trending.svg'
import Logo from '@icons/logo/logo.svg'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormGroup = styled.div`
  margin: 10px auto;

  input, select {
    display: block;
    width: 100%;
    height: 48px;
  }

  textarea {
    display: block;
    width: 100%;
    height: 150px;
  }
`

function CreateLearningSource() {
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [content, setContent] = React.useState('');
  const [videoUrl, setVideoUrl] = React.useState('')
  const [file, setFile] = React.useState(null)

  const doPost = () => {if(type) {
      const form = new FormData()
      const cookie = new Cookies()

      form.append('title', title)
      form.append('description', description)
      form.append('typeId', type + 1)
      form.append('file', file[0])
      form.append('token', cookie.get('acct'))

      axios.post('/api/source', form, { headers: {
        'content-type': 'multipart/form-data'
      }
      }).then(res => {
        if (res.status === 201) {
          alert('Success add learning source')
          window.location.assign('/learning-source')
        }
      }, res => alert('Failed add learning source, please submit again!'))
    } else {
      const cookie = new Cookies()

      axios.post('/api/source',
        { title, description, videoUrl, typeId: type+1, token: cookie.get('acct') })
        .then(res => {
          if(res.status === 201) {
            alert('Success add learning source')
            window.location.assign('/learning-source')
          }
        }, res => alert('Failed add learning source, please submit again!'))
    }
  }

  return (
    <Layout>
      <Container>
        <div style={{ display: 'block' }}>
          <Card marginTop={10} padding="20px" width="28em">
            <FormGroup>
              <input placeholder="Learning Source Title" onChange={e => setTitle(e.target.value)} value={title} />
            </FormGroup>
            <FormGroup>
              <div style={{ display: 'flex'}}>
                <input style={{ width: 'auto', height: 'auto'}} type="radio" id="video" name="type" value={0} onChange={e => setType(parseInt(e.target.value))} checked={type === 0} />
                <label htmlFor="video">Video</label>
                <input style={{ width: 'auto', height: 'auto' }} type="radio" id="file" name="type" value={1} onChange={e => setType(parseInt(e.target.value))} checked={type === 1} />
                <label htmlFor="file">File</label>
              </div>
            </FormGroup>
            <FormGroup>
              {!type && (
                  <>
                    <input placeholder="video url" onChange={e => {setVideoUrl(e.target.value)}} value={videoUrl} />
                    {!!videoUrl && <iframe style={{ width: '101%', height: '200px' }} src={videoUrl.replace("watch?v=", "embed/")} />}
                  </>
                )}
              {!!type && <input placeholder="upload" type="file" onChange={e => { setFile(e.target.files)}} />}
            </FormGroup>
            <FormGroup>
              <textarea placeholder="Learning Source Description" onChange={e => setDescription(e.target.value)} />
            </FormGroup>
            <Button onClick={() => doPost()}>Post</Button>
          </Card>
        </div>
      </Container>
    </Layout>
  )
}

render(
  <CreateLearningSource />, document.getElementById('contribute-learning-source')
)