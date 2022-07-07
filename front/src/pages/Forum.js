import React, { useEffect } from 'react'
import AddPost from '../components/Forum/AddPost'

import Header from '../components/Forum/Header'
import { getPosts } from '../graphql/queries'
import { defaultPageTop } from './stylepages'

export default function Forum() {

  useEffect(() => {

    getPosts()
      .then(res => console.log(res))
      .catch(err => console.log(err))

  }, [])

  return (
    <div className={defaultPageTop}>
        <Header />
        <AddPost />
        FORUM

    </div>
  )
}
