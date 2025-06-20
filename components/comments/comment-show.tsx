import { fetchCommentByPostId } from "@/lib/query/comment";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentsCreateForm from "./comments-create-form";

type CommentShowProps = {
  postId: string;
  commentId: string;
};

const CommentShow: React.FC<CommentShowProps> = async ({ postId, commentId }) => {
  const comments = await fetchCommentByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) return null;

  const children = comments.filter((c) => c.parentId === commentId);

  return (
    <div className="ml-4 mt-6 border-l border-border pl-4">
      <div className="bg-muted/30 border border-border/40 p-4 rounded-lg shadow-sm">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <Avatar className="h-9 w-9">
            <AvatarImage src={comment.user.image || ""} alt={comment.user.name} />
            <AvatarFallback>{comment.user.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>

          {/* Comment Content */}
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium text-foreground">{comment.user.name}</p>
            <p className="text-sm text-muted-foreground">{comment.content}</p>

            {/* Reply Form */}
            <CommentsCreateForm postId={comment.postId} parentId={comment.id} />
          </div>
        </div>
      </div>

      {/* Recursive Replies */}
      {children.length > 0 && (
        <div className="mt-4 space-y-4">
          {children.map((child) => (
            <CommentShow key={child.id} postId={postId} commentId={child.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentShow;
