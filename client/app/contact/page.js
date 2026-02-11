export default function ContactPage() {
    return (
        <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto min-h-screen">
            <h1 className="heading-lg mb-6">Let's Talk</h1>
            <p className="text-xl text-gray-400 mb-12">
                Have a project in mind? We'd love to hear from you.
            </p>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Name</label>
                        <input type="text" className="w-full bg-neutral-900 border border-white/10 p-4 rounded-lg focus:border-white transition-colors outline-none" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Email</label>
                        <input type="email" className="w-full bg-neutral-900 border border-white/10 p-4 rounded-lg focus:border-white transition-colors outline-none" placeholder="john@example.com" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Message</label>
                    <textarea className="w-full bg-neutral-900 border border-white/10 p-4 rounded-lg h-40 focus:border-white transition-colors outline-none" placeholder="Tell us about your project..."></textarea>
                </div>

                <button type="submit" className="btn-primary w-full md:w-auto justify-center">
                    Send Message
                </button>
            </form>
        </div>
    );
}
