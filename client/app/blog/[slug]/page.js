import sanitizeHtml from 'sanitize-html';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`).then((res) => res.json());

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription,
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription,
            images: [post.featuredImage],
        },
    };
}

async function getBlogPost(slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch blog post');
    }
    return res.json();
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    const cleanContent = sanitizeHtml(post.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            'img': ['src', 'alt']
        }
    });

    return (
        <article className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
            <header className="mb-16 text-center">
                <span className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4 block">
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <h1 className="heading-lg mb-8 text-balance">{post.title}</h1>
                {post.featuredImage && (
                    <div className="w-full aspect-video rounded-3xl overflow-hidden mt-8">
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </header>

            <div
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
        </article>
    );
}
