export default function ServicesPage() {
    return (
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="heading-lg mb-6">Our Services</h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl">
                We specialize in creating digital experiences that drive growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="glass p-10 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4">Web Development</h2>
                    <p className="text-gray-400">
                        High-performance web applications built with Next.js and React.
                        We focus on speed, SEO, and scalability.
                    </p>
                </div>
                <div className="glass p-10 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4">UI/UX Design</h2>
                    <p className="text-gray-400">
                        User-centric design that looks beautiful and works correctly.
                        We create design systems that scale with your product.
                    </p>
                </div>
                <div className="glass p-10 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4">Mobile Apps</h2>
                    <p className="text-gray-400">
                        Native and cross-platform mobile solutions for iOS and Android.
                    </p>
                </div>
                <div className="glass p-10 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4">Strategy & Consulting</h2>
                    <p className="text-gray-400">
                        Digital transformation strategies to help your business stay ahead.
                    </p>
                </div>
            </div>
        </div>
    );
}
