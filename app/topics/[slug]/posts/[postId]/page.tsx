import React, { Suspense } from 'react'
import PostShow from '../../../../../components/posts/post-show'
import CommentsCreateForm from '@/components/comments/comments-create-form'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CommentList from '@/components/comments/comment-list'

type PostShowPageProps = {
  params: Promise<{ slug: string; postId: string }>
}

const PostShowPage: React.FC<PostShowPageProps> = async ({ params }) => {
  const { slug, postId } = await params

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Back Button */}
      <div>
        <Link href={`/topics/${slug}`}>
          <Button variant="link" className="px-0 text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to<span className="ml-1 capitalize">{slug}</span>
          </Button>
        </Link>
      </div>

      {/* Post Content */}
      <div className="bg-card border border-border/30 rounded-xl p-6 shadow-sm">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-10 text-muted-foreground">
              Loading post...
            </div>
          }
        >
          <PostShow postId={postId} />
        </Suspense>
      </div>

      {/* Create Comment */}
      <div className="bg-muted/10 border border-border/20 rounded-lg p-5">
        <h3 className="text-lg font-semibold text-foreground mb-3">Join the discussion</h3>
        <CommentsCreateForm postId={postId} parentId={''} startOpen />
      </div>

      {/* Comments List */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Comments</h3>
        <CommentList postId={postId} />
      </div>
    </div>
  )
}

export default PostShowPage
