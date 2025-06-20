import { Card, CardTitle, CardHeader, CardDescription } from '../ui/card'
import {PostWithData} from '@lib/query/post'

type PostListProps = {
    fetchData: () => Promise<PostWithData[]>

}
const PostList : React.FC<PostListProps>= async({fetchData}) => {
    const posts = await fetchData();

    console.log(posts)

    return (
        <div>
            {
                posts.map((post) => (
                    <Card key={post.id}>
                        <CardHeader>
                            <CardTitle>
                                {post.title}
                            </CardTitle>
                            <CardDescription>
                                <h1>{post.user.name}</h1>
                                <h1>{post._count.comments} comments</h1>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))
            }
        </div>
    )
}

export default PostList