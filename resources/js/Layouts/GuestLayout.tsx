import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <main className="flex min-h-screen bg-surface font-body text-on-surface antialiased overflow-hidden">
            {/* Left Side: Login Form Canvas */}
            <section className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-12 lg:p-16 relative z-10 bg-surface">
                {/* Brand Anchor */}
                <div className="flex items-center gap-2 mb-12">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                    </div>
                    <span className="font-headline font-extrabold text-2xl tracking-tighter text-on-surface">Lumina HR</span>
                </div>

                {/* Content Area */}
                <div className="max-w-md w-full mx-auto space-y-10 flex-1 flex flex-col justify-center">
                    {children}
                </div>

                {/* Footer */}
                <footer className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-label text-on-surface-variant/60">
                    <p>© {new Date().getFullYear()} Lumina Intelligence. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </footer>
            </section>

            {/* Right Side: High-end Editorial Image/Visual */}
            <section className="hidden lg:block w-1/2 relative overflow-hidden bg-surface-container-low">
                <img 
                    alt="Modern airy office space" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                />
                
                {/* Glassmorphic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-on-surface/40 flex items-center justify-center p-20 z-10">
                    <div className="bg-white/80 backdrop-blur-xl p-12 rounded-3xl max-w-lg space-y-6 shadow-2xl border border-white/40">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                        </div>
                        <blockquote className="font-headline text-3xl font-extrabold text-on-surface tracking-tight leading-tight">
                            "HR Intelligence isn't just about data; it's about the people who drive the narrative of your organization."
                        </blockquote>
                        <div className="flex items-center gap-4 pt-4 border-t border-on-surface/10">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                                <img alt="Chief People Officer" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"/>
                            </div>
                            <div>
                                <p className="font-headline font-bold text-on-surface">Sarah Sterling</p>
                                <p className="text-sm font-medium text-on-surface-variant">Chief People Officer, Global Tech</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-20 w-48 h-48 bg-primary/40 rounded-full blur-3xl z-0"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary-fixed/40 rounded-full blur-3xl z-0"></div>
            </section>
        </main>
    );
}
