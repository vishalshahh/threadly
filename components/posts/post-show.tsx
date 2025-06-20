import { prisma } from '@/lib'
import React from 'react'

type PostShowProps = {
    postId: string
}

const PostShow :React.FC<PostShowProps> = async ({postId}) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const post = await prisma.post.findFirst({
        where:{
            id:postId
        }
    })
    if(!post) notFound();

  return (
    <div>
        <h1 className='text-2xl font-bold pb-2'>{post.title}</h1>
        <p>{post.content}</p>
    </div>
  )
}

export default PostShow