import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Button from '@components/common/button'
import Card from '@components/common/card'
import Layout from '@components/common/layout'
import Typography from '@components/common/typography'
import Paragraph from '@components/common/paragraph'
import Trending from '@icons/trending/trending.svg'
import Logo from '@icons/logo/logo.svg'
import Like from '@icons/like/like.svg'
import Share from '@icons/share/share.svg'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LeftContainer = styled.div`
  width: 43.7em;
  float: left;
`
const RightContainer = styled.div`
  width: 27em;
  float: right;
`

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
`

const SectionContent = styled.div`
  padding-top: 20px;
`

const FormGroup = styled.div`
  margin: 10px auto;

  input {
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

const LikedButton = styled(Like)`
  path {
    fill: red;
  }
`

const doComment = (comment, comments, setComment, forum) => {
  const cookie = new Cookies()
  { !comment && alert('comment content wajib diisi') }
  if (comment && !!cookie.get('acct')) {
    const confirm = window.confirm('do you want to add this comment?')
    {confirm && axios.post('/api/comment', {comment: comment, forumId: forum.id, token: cookie.get('acct')})
      .then(res => {
        console.log(res)
        comments.push(res.data)
        setComment('')
      })
      .catch(() => {
        setComment('')
      })}
  }
}

const handleDeleteForum = id => {
  const cookie = new Cookies()
  const confirm = window.confirm('do you want to delete this forum?')
  {confirm && axios.post('/api/delete-forum', { id: id, token: cookie.get('acct') })}
}

const handleDeleteComment = (commentId, forumId) => {
  const cookie = new Cookies()
  const confirm = window.confirm('do you want to delete this comment?')
  {confirm && axios.post('/api/delete-comment', { commentId: commentId, forumId: forumId, token: cookie.get('acct') })}
}

const setLiked = (setIsLiked, value, username, forumId) => {
  axios.post('/api/like', { value: value, username: username, forumId: forumId })
    .then(res => {
      setIsLiked(value)
    })
}

function ViewForum() {
  const cookie = new Cookies()
  const [url] = React.useState(window.location.href.split('/'))
  const [title] = React.useState(url[url.length - 1])
  const [profile] = React.useState(JSON.parse(localStorage.getItem('profile')))
  const [comments, setComments] = React.useState([])
  const [forum, setForum] = React.useState({})
  const [comment, setComment] = React.useState('')
  const [isLiked, setIsLiked] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  React.useEffect( () => {
    const fetchData = async () => {
      axios.get(`/api/view-forum?title=${title}`)
        .then( res => {
          setForum(res.data)
        })
    }
    fetchData()
  }, [])
  React.useEffect(() => {
    const checkLiked = async () => {
      axios.get(`/api/check-like?username=${profile.userName}&&forumId=${forum.id}`)
        .then( res => {
          setIsLiked(res.data)
        })
    }
    const getComment = async () => {
      axios.get(`/api/comment/${forum.id}`)
        .then( res => {
          console.log(res.data)
          setComments(res.data)
        })
    }
    if(JSON.stringify(forum) !== '{}' && profile) checkLiked()
    if(JSON.stringify(forum) !== '{}') getComment()
  }, [forum])
  return(
    <Layout>
      <Container>
        <div style={{display: 'block'}}>
          <Card marginTop={10} padding="20px" width="28em">
            <b>{JSON.stringify(forum) !== '{}' && forum.userName}</b> {JSON.stringify(forum) !== '{}' && forum.created_at.split('T')[0]}
            <Paragraph size={24} fontWeight="bold">{JSON.stringify(forum) !== '{}' && forum.forumTitle}</Paragraph>
            <Paragraph size={20}>{JSON.stringify(forum) !== '{}' && forum.forumContent}</Paragraph>
            {!isLiked && <Like width="20px" onClick={() => setLiked(setIsLiked, true, profile.userName, forum.id)} />}
            {isLiked && <LikedButton width="20px" onClick={() => setLiked(setIsLiked, false, profile.userName, forum.id)} />}
            <span> Like </span>
            <CopyToClipboard text={`http://localhost/view-forum/${title}`} onCopy={() => setCopied(true)} style={{margin: "0 2em"}}>
              <label><Share fill={copied ? 'red' : 'black'} width="20px" /><span> share</span></label>
            </CopyToClipboard>
            { profile && JSON.stringify(forum) !== '{}' && (profile.userName === forum.userName || profile.userType === 'admin') && <Button onClick={() => handleDeleteForum(forum.id)}>Delete</Button>}
          </Card>
          { comments.length >= 0 && comments.map((val, key) => {
            return (
              <Card marginTop={10} padding="20px" width="28em" key={key}>
                <b>{val.userName}</b> {val.created_at && val.created_at.split('T')[0]}
                <Paragraph size={20}>{val.commentContent}</Paragraph>
                { profile && JSON.stringify(forum) !== '{}' && (profile.userName === val.userName || profile.userType === 'admin') && <Button onClick={() => handleDeleteComment(val.commentId, forum.id)}>Delete</Button>}
              </Card>
            )
          })}
          <Card marginTop={10} padding="20px" width="28em">
            <FormGroup>
              <textarea placeholder="Add Comment" onChange={ e => setComment(e.target.value) } />
            </FormGroup>
            <Button onClick={() => doComment(comment, comments, setComment, forum)}>Add</Button>
          </Card>
        </div>
      </Container>
    </Layout>
  )
}

render(
  <ViewForum />, document.getElementById('view-forum')
)
