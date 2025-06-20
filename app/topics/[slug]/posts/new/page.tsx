'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' 
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createPost } from '@/actions/create-post'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'

type PostCreatePageProps = {
  params: Promise<{ slug: string }>
}

const PostCreatePage: React.FC<PostCreatePageProps> = async ({ params }) => {
  const { slug } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/topics/${slug}`}>
            <Button variant="link" className="px-0 text-muted-foreground hover:text-primary">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to <span className="ml-1 capitalize">{slug}</span>
            </Button>
          </Link>
        </div>

        <Card className="shadow-md border-border/40">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Create New Post in {slug}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PostCreateFormStandalone slug={slug} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Standalone form component (not a dialog)
const PostCreateFormStandalone: React.FC<{ slug: string }> = ({ slug }) => {
  const [formstate, action] = useActionState(createPost.bind(null, slug), {
    errors: {}
  })

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="title" className="text-sm font-medium">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="What's on your mind?"
          className="focus-visible:ring-primary focus-visible:ring-offset-2"
        />
        {formstate.errors.title && (
          <p className="text-xs text-red-600">{formstate.errors.title}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="content" className="text-sm font-medium">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your thoughts here..."
          className="min-h-[200px] focus-visible:ring-primary focus-visible:ring-offset-2"
        />
        {formstate.errors.content && (
          <p className="text-xs text-red-600">{formstate.errors.content}</p>
        )}
      </div>

      {formstate.errors.formError && (
        <div className="border border-red-500 bg-red-100 text-red-700 text-sm p-2 rounded">
          {formstate.errors.formError}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Link href={`/topics/${slug}`}>
          <Button type="button" variant="secondary">Cancel</Button>
        </Link>
        <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
          Create Post
        </Button>
      </div>
    </form>
  )
}

export default PostCreatePage
