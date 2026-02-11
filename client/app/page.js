import Hero from './components/Hero';
import Link from 'next/link';

async function getLatestBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?limit=3`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts || [];
  } catch (error) {
    console.error('Failed to fetch home blogs:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getLatestBlogs();

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Services Section */}
      <section className="py-32 bg-background text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-xs font-bold tracking-[0.2em] text-gray-500 mb-4 uppercase">Expertise</h2>
            <h3 className="heading-md max-w-2xl">Digital solutions engineered for growth and scale.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Strategy', desc: 'Navigating the digital landscape with data-driven insights and roadmaps.' },
              { title: 'Experience', desc: 'Crafting immersive user interfaces that bridge brand and technology.' },
              { title: 'Engineering', desc: 'Building robust, scalable architectures for mission-critical systems.' }
            ].map((service, i) => (
              <div key={i} className="group p-8 border-t border-white/20 hover:border-white transition-colors duration-500 relative">
                <div className="text-4xl font-light mb-8 opacity-50">0{i + 1}</div>
                <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xl">↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-32 bg-neutral-950 text-white px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] text-gray-500 mb-4 uppercase">Insights</h2>
              <h3 className="heading-md">Latest thinking</h3>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-sm font-bold tracking-widest uppercase hover:text-gray-300 border-b border-transparent hover:border-gray-500 pb-1 transition-all">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post._id} className="group cursor-pointer flex flex-col h-full">
                <div className="aspect-[16/10] bg-neutral-900 mb-6 overflow-hidden relative">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-800 transition-transform duration-700 group-hover:scale-105" />
                  )}
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:underline decoration-1 underline-offset-4">
                  {post.title}
                </h4>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                  {post.metaDescription}
                </p>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors mt-auto">Read Article</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
