'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail } from 'lucide-react';
import { PageHeading, PageShell, themeCardClass, themePanelClass } from '@/components/page-shell';

export default function ContactPage() {
    return (
        <PageShell>
            <div className="mx-auto max-w-4xl">
                <PageHeading accent="Contact" title="Us" subtitle="Get in touch with us" />

                <Card className={themeCardClass}>
                    <CardHeader>
                        <CardTitle className="mb-6 text-xl font-bold text-[#FF6B00]">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className={`flex flex-col items-center gap-4 p-4 sm:flex-row sm:items-start ${themePanelClass}`}>
                                <div className="relative h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-full border-2 border-[#FF6B00]/50 bg-neutral-800">
                                    <img
                                        src="/Bhim.jpg"
                                        alt="Bhim Yadav"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                                <div className="w-full min-w-0 flex-1 text-center sm:text-left">
                                    <p className="mb-2 font-semibold text-neutral-200">Bhim Yadav</p>
                                    <a href="mailto:Bhim6386@gmail.com" className="mb-1 block break-words text-neutral-400 transition-colors hover:text-[#FF6B00]">
                                        <Mail className="mr-2 inline h-4 w-4" />
                                        <span className="break-all">Bhim6386@gmail.com</span>
                                    </a>
                                    <a href="tel:+916265468287" className="block text-neutral-400 transition-colors hover:text-[#FF6B00]">
                                        <Phone className="mr-2 inline h-4 w-4" />
                                        +91 62654 68287
                                    </a>
                                </div>
                            </div>

                            <div className={`flex flex-col items-center gap-4 p-4 sm:flex-row sm:items-start ${themePanelClass}`}>
                                <div className="relative h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-full border-2 border-[#FF6B00]/50 bg-neutral-800">
                                    <img
                                        src="/Himanshu.jpg"
                                        alt="Himanshu Nakul"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                                <div className="w-full min-w-0 flex-1 text-center sm:text-left">
                                    <p className="mb-2 font-semibold text-neutral-200">Himanshu Nakul</p>
                                    <a href="mailto:goatsharma2356@gmail.com" className="mb-1 block break-words text-neutral-400 transition-colors hover:text-[#FF6B00]">
                                        <Mail className="mr-2 inline h-4 w-4" />
                                        <span className="break-all">himanshunakul010@gmail.com</span>
                                    </a>
                                    <a href="tel:+918319274699" className="block text-neutral-400 transition-colors hover:text-[#FF6B00]">
                                        <Phone className="mr-2 inline h-4 w-4" />
                                        +91 83192 74699
                                    </a>
                                </div>
                            </div>

                            <div className={`flex flex-col items-center gap-4 p-4 sm:flex-row sm:items-start ${themePanelClass}`}>
                                <div className="relative h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-full border-2 border-[#FF6B00]/50 bg-neutral-800">
                                    <img
                                        src="/Abhishek.jpg"
                                        alt="Abhishek Raghuvanshi"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                                <div className="w-full min-w-0 flex-1 text-center sm:text-left">
                                    <p className="mb-2 font-semibold text-neutral-200">Abhishek Raghuvanshi</p>
                                    <a href="mailto:araghuvanshi488@gmail.com" className="mb-1 block break-words text-neutral-400 transition-colors hover:text-[#FF6B00]">
                                        <Mail className="mr-2 inline h-4 w-4" />
                                        <span className="break-all">araghuanshi488@gmail.com</span>
                                    </a>
                                    <a href="tel:+919174290702" className="block text-neutral-400 transition-colors hover:text-[#FF6B00]">
                                        <Phone className="mr-2 inline h-4 w-4" />
                                        +91 91742 90702
                                    </a>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageShell>
    );
}
