import React from 'react'

const Page = ({params}: {params: {postid: string}}) => {
  return (
    <div>
      this is {params.postid}
    </div>
  )
}

export default Page
