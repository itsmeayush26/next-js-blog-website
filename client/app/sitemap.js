export default async function sitemap() {
    const baseUrl = 'http://localhost:3000';

    // Fetch all published blog posts
    const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?limit=1000`).then((res) => res.json());

    const blogUrls = (posts.posts || []).map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...blogUrls,
    ];
}
