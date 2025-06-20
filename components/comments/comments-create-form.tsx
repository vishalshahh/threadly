'use client'

import React, { useActionState, useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { createComment } from '@/actions/create-comment'
import { Loader2 } from 'lucide-react'

type CommentsCreateFormProps = {
  postId: string
  parentId: string
  startOpen?: boolean
}

const CommentsCreateForm: React.FC<CommentsCreateFormProps> = ({
  postId,
  parentId,
  startOpen = false
}) => {
  const [open, setOpen] = useState(startOpen)
  const [formState, action, isPending] = useActionState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  )

  return (
    <div className="w-full space-y-4">
      {/* Toggle reply button */}
      {!startOpen && (
        <Button
          size="sm"
          variant="link"
          onClick={() => setOpen((prev) => !prev)}
          className="px-0 text-primary"
        >
          {open ? 'Cancel' : 'Reply'}
        </Button>
      )}

      {/* Comment Form */}
      {open && (
        <form action={action} className="space-y-3">
          <Textarea
            name="content"
            placeholder="Write a comment..."
            className="min-h-[100px] bg-muted/30 focus-visible:ring-primary focus-visible:ring-offset-2"
          />

          {/* Validation Errors */}
          {formState.errors.content && (
            <p className="text-sm text-red-600">{formState.errors.content}</p>
          )}
          {formState.errors.formError && (
            <div className="text-sm bg-red-100 border border-red-400 text-red-700 rounded p-2">
              {formState.errors.formError}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="secondary"
              type="submit"
              disabled={isPending}
              className="gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Comment'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default CommentsCreateForm
