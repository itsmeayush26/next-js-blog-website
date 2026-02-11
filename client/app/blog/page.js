import Link from 'next/link';

async function getBlogs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch blogs');
    }
    return res.json();
}

export const metadata = {
    title: 'Blog | Giakaa',
    description: 'Latest insights and news from Giakaa.',
};

export default async function BlogPage() {
    const data = await getBlogs();
    const posts = data.posts || [];

    return (
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="mb-16">
                <h1 className="heading-lg mb-6">Our Insights</h1>
                <p className="text-xl text-gray-400 max-w-2xl">
                    Exploring the intersection of design, technology, and business strategy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post._id} className="group block">
                        <div className="aspect-[4/3] bg-neutral-800 rounded-2xl overflow-hidden mb-6 relative">
                            {post.featuredImage && (
                                <img
                                    src={post.featuredImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            )}
                        </div>
                        <div className="space-y-3">
                            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <h2 className="text-2xl font-bold group-hover:text-gray-300 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-gray-400 line-clamp-3">
                                {post.metaDescription}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
