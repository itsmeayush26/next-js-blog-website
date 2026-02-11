export default function Footer() {
    return (
        <footer className="bg-neutral-900 border-t border-white/10 text-gray-400 py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-white text-xl font-bold mb-4">GIAKAA</h2>
                    <p className="text-sm">
                        Empowering businesses with cutting-edge digital solutions.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Web Development</a></li>
                        <li><a href="#" className="hover:text-white">Mobile Apps</a></li>
                        <li><a href="#" className="hover:text-white">UI/UX Design</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Connect</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Twitter</a></li>
                        <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-white">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs">
                &copy; {new Date().getFullYear()} Giakaa. All rights reserved.
            </div>
        </footer>
    );
}
