'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

function RegistrationSuccessContent() {
    const searchParams = useSearchParams();
    const registrationId = searchParams.get('id');
    const playerName = searchParams.get('name');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Registration is already complete, just show success
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto py-10 flex justify-center min-h-screen items-center">
                <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-xl">
                    <CardContent className="pt-6 flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00]" />
                        <p className="text-slate-400">Processing...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 flex justify-center min-h-screen items-center">
            <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="h-16 w-16 text-[#FF6B00]" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-[#FF6B00]">
                        Registration Successful!
                    </CardTitle>
                    {playerName && (
                        <p className="mt-3 text-xl font-semibold text-white">
                            Welcome, <span className="text-[#FF6B00]">{playerName}</span>!
                        </p>
                    )}
                    <CardDescription className="text-slate-400 mt-2">
                        Your details have been saved successfully
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <div className="text-center space-y-4 w-full">
                        <p className="text-slate-300">
                            Thank you for registering for the cricket tournament!
                        </p>
                        {registrationId && (
                            <p className="text-sm text-slate-500">
                                Registration ID: {registrationId}
                            </p>
                        )}
                        
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4">
                            <p className="text-sm text-slate-300">
                                Your registration has been submitted successfully.
                            </p>
                        </div>
                    </div>
                    <div className="w-full space-y-3">
                        <Button
                            asChild
                            className="w-full bg-[#FF6B00] hover:bg-[#e55f00] font-bold py-3"
                        >
                            <Link href="/register">
                                Register Another Player
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                            <Link href="/">
                                Go to Home
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function RegistrationSuccessPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto py-10 flex justify-center min-h-screen items-center">
                <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-xl">
                    <CardContent className="pt-6 flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00]" />
                        <p className="text-slate-400">Loading...</p>
                    </CardContent>
                </Card>
            </div>
        }>
            <RegistrationSuccessContent />
        </Suspense>
    );
}

