export default async function sitemap() {
    // Use environment variable or fallback to localhost for development
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-app.vercel.app';

    let blogUrls = [];

    try {
        // Fetch all published blog posts with error handling
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?limit=1000`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (response.ok) {
            const data = await response.json();
            blogUrls = (data.posts || []).map((post) => ({
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: new Date(post.updatedAt),
                changeFrequency: 'weekly',
                priority: 0.8,
            }));
        } else {
            console.warn('Failed to fetch blog posts for sitemap, using static pages only');
        }
    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Continue with static pages even if blog fetch fails
    }

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

