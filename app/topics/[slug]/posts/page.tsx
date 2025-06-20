import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, MessageSquare, Plus } from 'lucide-react'
import Link from 'next/link'
import { fetchPostByTopicSlug } from '@/lib/query/post'
import { Badge } from '@/components/ui/badge'

type PostsPageProps = {
  params: Promise<{ slug: string }>
}

const PostsPage: React.FC<PostsPageProps> = async ({ params }) => {
  const { slug } = await params
  const posts = await fetchPostByTopicSlug(slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/topics/${slug}`}>
              <Button variant="link" className="px-0 text-muted-foreground hover:text-primary">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to <span className="ml-1 capitalize">{slug}</span>
              </Button>
            </Link>
          </div>
          
          <Link href={`/topics/${slug}/posts/new`}>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Posts Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground capitalize">
            {slug} Posts
          </h1>
          <p className="text-muted-foreground mt-1">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this topic
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  No posts yet in this topic. Be the first to start a discussion!
                </p>
                <Link href={`/topics/${slug}/posts/new`}>
                  <Button>Create First Post</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link href={`/topics/${slug}/posts/${post.id}`}>
                        <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                          {post.title}
                        </CardTitle>
                      </Link>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>by <span className="font-medium text-foreground">{post.user.name || 'Unknown User'}</span></span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post._count.comments} {post._count.comments === 1 ? 'comment' : 'comments'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Badge variant="secondary" className="ml-4">
                      {post.topic.slug}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.content.length > 150 
                      ? `${post.content.substring(0, 150)}...` 
                      : post.content}
                  </p>
                  
                  <div className="mt-4">
                    <Link href={`/topics/${slug}/posts/${post.id}`}>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default PostsPage
