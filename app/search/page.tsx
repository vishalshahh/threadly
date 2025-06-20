import PostList from "@/components/posts/post-list";
import { fetchPostBySearch } from "@/lib/query/post";
import React from "react";

type SearchPageProps = {
  searchParams: Promise<{ term: string }>;
};

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const { term } = await searchParams;
  const posts = await fetchPostBySearch(term);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Search Result Header */}
      <h1 className="text-2xl font-semibold text-foreground">
        Search results for <span className="italic">"{term}"</span>
      </h1>

      {/* No Results Feedback */}
      {posts.length === 0 ? (
        <p className="text-muted-foreground">
          No posts found for <strong>{term}</strong>. Try a different search term or check spelling.
        </p>
      ) : (
        <PostList fetchData={() => fetchPostBySearch(term)} />
      )}
    </div>
  );
};

export default SearchPage;
