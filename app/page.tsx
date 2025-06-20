import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import { fetchTopPosts } from "@/lib/query/post";
import { MessageSquare, TrendingUp, Users, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <MessageSquare className="h-12 w-12 text-primary mr-3" />
              <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
            Welcome to Thready
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Start your threading journey here and connect with like-minded individuals in meaningful conversations
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Discussions</div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">100K+</div>
                <div className="text-sm text-muted-foreground">Posts Created</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Top Posts Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground pt-4">Trending Posts</h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Hot
              </Badge>
            </div>
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <PostList fetchData={fetchTopPosts} />
              </CardContent>
            </Card>
          </div>

          {/* Create Topic Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-2">
                    <Sparkles className="h-5 w-5 text-primary mr-2" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Start a Discussion</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Share your thoughts and engage with the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <TopicCreateForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}