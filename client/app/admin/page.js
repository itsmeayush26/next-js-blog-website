"use client";
import { useState, useEffect } from 'react';
import { Trash2, Plus, Edit } from 'lucide-react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('hero');
    const [heroSlides, setHeroSlides] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states (simplified for single file)
    const [editingHero, setEditingHero] = useState(null);
    const [editingBlog, setEditingBlog] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const heroRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`);
            const blogsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?limit=100`); // Fetch all for admin

            const heroes = await heroRes.json();
            const blogData = await blogsRes.json();

            setHeroSlides(heroes);
            setBlogs(blogData.posts || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteHero = async (id) => {
        if (!confirm('Delete this slide?')) return;
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero/${id}`, { method: 'DELETE' });
        fetchData();
    };

    const handleDeleteBlog = async (id) => {
        if (!confirm('Delete this post?')) return;
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, { method: 'DELETE' });
        fetchData();
    };

    const handleHeroSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const url = editingHero?._id
            ? `${process.env.NEXT_PUBLIC_API_URL}/hero/${editingHero._id}`
            : `${process.env.NEXT_PUBLIC_API_URL}/hero`;

        const method = editingHero?._id ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        setEditingHero(null);
        fetchData();
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const url = editingBlog?._id
            ? `${process.env.NEXT_PUBLIC_API_URL}/blogs/${editingBlog._id}`
            : `${process.env.NEXT_PUBLIC_API_URL}/blogs`;

        const method = editingBlog?._id ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        setEditingBlog(null);
        fetchData();
    };

    return (
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="heading-lg mb-8">CMS Dashboard</h1>

            <div className="flex space-x-6 mb-8 border-b border-white/10 pb-4">
                <button
                    onClick={() => setActiveTab('hero')}
                    className={`text-xl font-bold ${activeTab === 'hero' ? 'text-white' : 'text-gray-500'}`}
                >
                    Hero Slides
                </button>
                <button
                    onClick={() => setActiveTab('blogs')}
                    className={`text-xl font-bold ${activeTab === 'blogs' ? 'text-white' : 'text-gray-500'}`}
                >
                    Blogs
                </button>
            </div>

            {activeTab === 'hero' && (
                <div>
                    <button
                        onClick={() => setEditingHero({})}
                        className="btn-primary mb-6 text-sm"
                    >
                        <Plus size={16} /> Add Slide
                    </button>

                    {/* Hero Form */}
                    {editingHero && (
                        <div className="bg-neutral-900 p-6 rounded-xl mb-8 border border-white/10">
                            <h3 className="text-xl font-bold mb-4">{editingHero._id ? 'Edit' : 'New'} Slide</h3>
                            <form onSubmit={handleHeroSubmit} className="space-y-4">
                                <input name="title" defaultValue={editingHero.title} placeholder="Title" className="w-full bg-black border border-white/20 p-3 rounded" required />
                                <input name="description" defaultValue={editingHero.description} placeholder="Description" className="w-full bg-black border border-white/20 p-3 rounded" required />
                                <input name="imageUrl" defaultValue={editingHero.imageUrl} placeholder="Image URL" className="w-full bg-black border border-white/20 p-3 rounded" required />
                                <div className="flex gap-4">
                                    <input name="ctaText" defaultValue={editingHero.ctaText} placeholder="CTA Text" className="w-full bg-black border border-white/20 p-3 rounded" required />
                                    <input name="ctaLink" defaultValue={editingHero.ctaLink} placeholder="CTA Link" className="w-full bg-black border border-white/20 p-3 rounded" required />
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="bg-white text-black px-6 py-2 rounded font-bold">Save</button>
                                    <button type="button" onClick={() => setEditingHero(null)} className="text-gray-400 px-6 py-2">Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="grid gap-4">
                        {heroSlides.map(slide => (
                            <div key={slide._id} className="glass p-4 rounded-xl flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img src={slide.imageUrl} className="w-20 h-12 object-cover rounded" />
                                    <div>
                                        <h4 className="font-bold">{slide.title}</h4>
                                        <p className="text-sm text-gray-400">{slide.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setEditingHero(slide)} className="p-2 hover:bg-white/10 rounded"><Edit size={18} /></button>
                                    <button onClick={() => handleDeleteHero(slide._id)} className="p-2 hover:bg-red-900/50 text-red-500 rounded"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'blogs' && (
                <div>
                    <button
                        onClick={() => setEditingBlog({})}
                        className="btn-primary mb-6 text-sm"
                    >
                        <Plus size={16} /> New Post
                    </button>

                    {/* Blog Form */}
                    {editingBlog && (
                        <div className="bg-neutral-900 p-6 rounded-xl mb-8 border border-white/10">
                            <h3 className="text-xl font-bold mb-4">{editingBlog._id ? 'Edit' : 'New'} Post</h3>
                            <form onSubmit={handleBlogSubmit} className="space-y-4">
                                <input name="title" defaultValue={editingBlog.title} placeholder="Title" className="w-full bg-black border border-white/20 p-3 rounded" required />
                                <input name="slug" defaultValue={editingBlog.slug} placeholder="Slug (e.g. my-post)" className="w-full bg-black border border-white/20 p-3 rounded" required />
                                <input name="metaTitle" defaultValue={editingBlog.metaTitle} placeholder="Meta Title" className="w-full bg-black border border-white/20 p-3 rounded" />
                                <input name="metaDescription" defaultValue={editingBlog.metaDescription} placeholder="Meta Description" className="w-full bg-black border border-white/20 p-3 rounded" />
                                <input name="featuredImage" defaultValue={editingBlog.featuredImage} placeholder="Featured Image URL" className="w-full bg-black border border-white/20 p-3 rounded" />
                                <textarea name="content" defaultValue={editingBlog.content} placeholder="Content (HTML support)" className="w-full bg-black border border-white/20 p-3 rounded h-40 font-mono" required />

                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="status" value="published" defaultChecked={editingBlog.status === 'published'} />
                                    <label>Published</label>
                                </div>

                                <div className="flex gap-4">
                                    <button type="submit" className="bg-white text-black px-6 py-2 rounded font-bold">Save</button>
                                    <button type="button" onClick={() => setEditingBlog(null)} className="text-gray-400 px-6 py-2">Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="space-y-4">
                        {blogs.map(blog => (
                            <div key={blog._id} className="glass p-4 rounded-xl flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-lg">{blog.title}</h4>
                                    <span className="text-xs uppercase tracking-widest text-gray-500">{blog.status} • {blog.slug}</span>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setEditingBlog(blog)} className="p-2 hover:bg-white/10 rounded"><Edit size={18} /></button>
                                    <button onClick={() => handleDeleteBlog(blog._id)} className="p-2 hover:bg-red-900/50 text-red-500 rounded"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
