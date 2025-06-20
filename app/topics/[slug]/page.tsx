import React from 'react'
import PostList from '@/components/posts/post-list'
import PostCreateForm from '@/components/posts/PostCreateForm'
import { fetchPostByTopicSlug } from '@/lib/query/post'

type TopicShowPageProps = {
  params: Promise<{ slug: string }>
}

const TopicShowPage: React.FC<TopicShowPageProps> = async ({ params }) => {
  const slug = (await params).slug

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Post List Section */}
        <section className="lg:col-span-3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground capitalize">
              {slug.replace(/-/g, ' ')}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Explore trending and recent posts in this topic.
            </p>
          </div>
          <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
        </section>

        {/* Post Form Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <PostCreateForm slug={slug} />
          </div>
        </aside>
      </div>
    </div>
  )
}

export default TopicShowPage
