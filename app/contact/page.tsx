import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Info */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-slate-900 mb-8">
                            Get in Touch
                        </h1>
                        <p className="text-slate-500 text-lg mb-12">
                            Have a general inquiry? Reach out to us via email or visit our office.
                            For project inquiries, please use the <a href="/submit-requirements" className="text-indigo-600 hover:underline">Submit Requirements</a> page.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-indigo-500 mt-1" />
                                <div>
                                    <h3 className="text-slate-900 font-medium mb-1">Email</h3>
                                    <p className="text-slate-500">hello@anarva.agency</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-indigo-500 mt-1" />
                                <div>
                                    <h3 className="text-slate-900 font-medium mb-1">Phone</h3>
                                    <p className="text-slate-500">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-indigo-500 mt-1" />
                                <div>
                                    <h3 className="text-slate-900 font-medium mb-1">Office</h3>
                                    <p className="text-slate-500">
                                        420 Market Street<br />
                                        San Francisco, CA 94111
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simple Form */}
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                        <h2 className="text-2xl font-medium text-slate-900 mb-6">Send a Message</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Name</label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-sm" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Email</label>
                                <input type="email" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-sm" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Message</label>
                                <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-indigo-500 resize-none shadow-sm" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
}
