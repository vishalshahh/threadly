'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"  
import { createPost } from "@/actions/create-post"
import React, { useActionState } from "react"

type CreatePostFormProps = ({ slug }: { slug: string }) => void

const PostCreateForm: React.FC<{ slug: string }> = ({ slug }) => {
  const [formstate, action] = useActionState(createPost.bind(null, slug), {
    errors: {}
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-10 ml-10">Create Post</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Create a Post</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Write something insightful and start a new thread.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
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
                className="min-h-[100px] focus-visible:ring-primary focus-visible:ring-offset-2"
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
          </div>

          <DialogFooter className="flex justify-between gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-primary text-white hover:bg-primary/90">Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PostCreateForm
