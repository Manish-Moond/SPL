'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Lock, Users, CheckCircle2, XCircle, Clock, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const AUTH_STORAGE_KEY = 'slp.admin.password';

interface Registration {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    address: string | null;
    city: string | null;
    aadhar_number: string;
    role_type: string;
    batting_style: string | null;
    bowling_style: string | null;
    photo_url: string;
    amount: number;
    payment_status: 'pending' | 'verified' | 'rejected';
    payment_screenshot_url: string | null;
    upi_transaction_id: string;
    created_at: string;
    updated_at: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
    const [selectedScreenshotFile, setSelectedScreenshotFile] = useState<File | null>(null);
    const [isUpdatingScreenshot, setIsUpdatingScreenshot] = useState(false);
    const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
    const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
    const [isRestoring, setIsRestoring] = useState(true);

    const loginWithPassword = async (authPassword: string, showSuccessToast = true) => {
        const response = await fetch(`/api/admin/registrations?password=${encodeURIComponent(authPassword)}`);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.error || 'Invalid password');
        }

        localStorage.setItem(AUTH_STORAGE_KEY, authPassword);
        setPassword(authPassword);
        setIsAuthenticated(true);
        setRegistrations(data.data || []);
        if (showSuccessToast) {
            toast.success('Login successful');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await loginWithPassword(password);
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Invalid password');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRegistrations = async () => {
        setIsLoadingData(true);
        try {
            const response = await fetch(`/api/admin/registrations?password=${encodeURIComponent(password)}`);
            if (response.ok) {
                const data = await response.json();
                setRegistrations(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching registrations:', error);
            toast.error('Failed to fetch registrations');
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleDelete = async (registrationId: string, registrationName: string) => {
        if (!confirm(`Are you sure you want to delete the registration for ${registrationName}? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/registrations?id=${registrationId}&password=${encodeURIComponent(password)}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Registration deleted successfully');
                // Refresh the registrations list
                fetchRegistrations();
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to delete registration');
            }
        } catch (error) {
            console.error('Error deleting registration:', error);
            toast.error('Failed to delete registration');
        }
    };

    const handleUpdateScreenshot = async () => {
        if (!selectedScreenshotFile || !selectedRegistration) {
            toast.error('Please select a file to upload');
            return;
        }

        setIsUpdatingScreenshot(true);
        try {
            const formData = new FormData();
            formData.append('id', selectedRegistration.id);
            formData.append('payment_screenshot', selectedScreenshotFile);

            const response = await fetch(`/api/admin/registrations?password=${encodeURIComponent(password)}`, {
                method: 'PATCH',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Payment screenshot updated successfully');
                // Update the selected registration with new screenshot URL
                setSelectedRegistration({
                    ...selectedRegistration,
                    payment_screenshot_url: data.payment_screenshot_url,
                });
                // Update the registration in the list
                setRegistrations(registrations.map(reg => 
                    reg.id === selectedRegistration.id 
                        ? { ...reg, payment_screenshot_url: data.payment_screenshot_url }
                        : reg
                ));
                // Clear the file input
                setSelectedScreenshotFile(null);
            } else {
                toast.error(data.error || 'Failed to update payment screenshot');
            }
        } catch (error) {
            console.error('Error updating screenshot:', error);
            toast.error('Failed to update payment screenshot');
        } finally {
            setIsUpdatingScreenshot(false);
        }
    };

    const handleUpdatePhoto = async () => {
        if (!selectedPhotoFile || !selectedRegistration) {
            toast.error('Please select a file to upload');
            return;
        }

        setIsUpdatingPhoto(true);
        try {
            const formData = new FormData();
            formData.append('id', selectedRegistration.id);
            formData.append('photo', selectedPhotoFile);

            const response = await fetch(`/api/admin/registrations?password=${encodeURIComponent(password)}`, {
                method: 'PATCH',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Player photo updated successfully');
                // Update the selected registration with new photo URL
                setSelectedRegistration({
                    ...selectedRegistration,
                    photo_url: data.photo_url,
                });
                // Update the registration in the list
                setRegistrations(registrations.map(reg => 
                    reg.id === selectedRegistration.id 
                        ? { ...reg, photo_url: data.photo_url }
                        : reg
                ));
                // Clear the file input
                setSelectedPhotoFile(null);
            } else {
                toast.error(data.error || 'Failed to update player photo');
            }
        } catch (error) {
            console.error('Error updating photo:', error);
            toast.error('Failed to update player photo');
        } finally {
            setIsUpdatingPhoto(false);
        }
    };

    useEffect(() => {
        const savedPassword = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!savedPassword) {
            setIsRestoring(false);
            return;
        }

        loginWithPassword(savedPassword, false)
            .catch(() => {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            })
            .finally(() => {
                setIsRestoring(false);
            });
    }, []);

    useEffect(() => {
        if (isAuthenticated && registrations.length === 0) {
            fetchRegistrations();
        }
    }, [isAuthenticated]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'verified':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-green-900/50 text-green-400 border border-green-700">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-red-900/50 text-red-400 border border-red-700">
                        <XCircle className="h-3 w-3" />
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-yellow-900/50 text-yellow-400 border border-yellow-700">
                        <Clock className="h-3 w-3" />
                        Pending
                    </span>
                );
        }
    };

    if (isRestoring) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
                <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-xl">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-slate-800 p-3 rounded-full">
                                <Lock className="h-8 w-8 text-cyan-500" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-cyan-500">
                            Admin Dashboard
                        </CardTitle>
                        <CardDescription className="text-slate-400 mt-2">
                            Enter password to access
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-slate-950 border-slate-700"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="container mx-auto py-8 px-4">
                <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold text-cyan-500 flex items-center gap-2">
                                    <Users className="h-6 w-6" />
                                    Registered Users
                                </CardTitle>
                                <CardDescription className="text-slate-400 mt-2">
                                    Total Registrations: {registrations.length}
                                </CardDescription>
                            </div>
                            <Button
                                onClick={fetchRegistrations}
                                disabled={isLoadingData}
                                variant="outline"
                                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                            >
                                {isLoadingData ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    'Refresh'
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoadingData ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                            </div>
                        ) : registrations.length === 0 ? (
                            <div className="text-center py-12 text-slate-400">
                                No registrations found
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-800">
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Name</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Email</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Phone</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Role</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Payment Status</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Transaction ID</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Date</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registrations.map((reg) => (
                                            <tr key={reg.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                                <td className="py-3 px-4 text-sm">{reg.full_name}</td>
                                                <td className="py-3 px-4 text-sm text-slate-400">{reg.email}</td>
                                                <td className="py-3 px-4 text-sm text-slate-400">{reg.phone}</td>
                                                <td className="py-3 px-4 text-sm capitalize">{reg.role_type}</td>
                                                <td className="py-3 px-4 text-sm">{getStatusBadge(reg.payment_status)}</td>
                                                <td className="py-3 px-4 text-sm font-mono text-xs text-slate-400">{reg.upi_transaction_id}</td>
                                                <td className="py-3 px-4 text-sm text-slate-400">
                                                    {new Date(reg.created_at).toLocaleDateString('en-IN', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="py-3 px-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            onClick={() => setSelectedRegistration(reg)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="border-slate-700 text-slate-300 hover:bg-slate-800"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleDelete(reg.id, reg.full_name)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="border-red-700 text-red-400 hover:bg-red-900/20 hover:border-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Details Modal */}
                {selectedRegistration && (
                    <div 
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                        onClick={() => setSelectedRegistration(null)}
                    >
                        <Card 
                            className="bg-slate-900 border-slate-800 text-white shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl font-bold text-cyan-500">
                                        Registration Details
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedRegistration(null)}
                                        className="text-slate-400 hover:text-white"
                                    >
                                        ✕
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-400">Full Name</p>
                                        <p className="font-semibold">{selectedRegistration.full_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Email</p>
                                        <p className="font-semibold">{selectedRegistration.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Phone</p>
                                        <p className="font-semibold">{selectedRegistration.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Aadhar Number</p>
                                        <p className="font-semibold">{selectedRegistration.aadhar_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">City</p>
                                        <p className="font-semibold">{selectedRegistration.city || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Address</p>
                                        <p className="font-semibold">{selectedRegistration.address || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Role Type</p>
                                        <p className="font-semibold capitalize">{selectedRegistration.role_type}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Payment Status</p>
                                        <div className="mt-1">{getStatusBadge(selectedRegistration.payment_status)}</div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Amount</p>
                                        <p className="font-semibold">₹{selectedRegistration.amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">UPI Transaction ID</p>
                                        <p className="font-semibold font-mono text-sm">{selectedRegistration.upi_transaction_id}</p>
                                    </div>
                                </div>

                                {selectedRegistration.batting_style && (
                                    <div>
                                        <p className="text-sm text-slate-400">Batting Style</p>
                                        <p className="font-semibold">{selectedRegistration.batting_style}</p>
                                    </div>
                                )}

                                {selectedRegistration.bowling_style && (
                                    <div>
                                        <p className="text-sm text-slate-400">Bowling Style</p>
                                        <p className="font-semibold">{selectedRegistration.bowling_style}</p>
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-slate-400">Player Photo</p>
                                    </div>
                                    {selectedRegistration.photo_url ? (
                                        <div className="mb-3">
                                            <img 
                                                src={selectedRegistration.photo_url} 
                                                alt="Player" 
                                                className="w-32 h-32 object-cover rounded border border-slate-700"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 mb-3">No photo available</p>
                                    )}
                                    <div className="space-y-2">
                                        <Input
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setSelectedPhotoFile(file);
                                                }
                                            }}
                                            className="bg-slate-950 border-slate-700 file:bg-slate-800 file:text-slate-200 file:border-0 file:rounded-sm file:px-2 file:mr-2 hover:file:bg-slate-700 text-sm"
                                        />
                                        {selectedPhotoFile && (
                                            <Button
                                                onClick={handleUpdatePhoto}
                                                disabled={isUpdatingPhoto}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                                size="sm"
                                            >
                                                {isUpdatingPhoto ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Updating...
                                                    </>
                                                ) : (
                                                    'Update Player Photo'
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-slate-400">Payment Screenshot</p>
                                    </div>
                                    {selectedRegistration.payment_screenshot_url ? (
                                        <div className="mb-3">
                                            <a 
                                                href={selectedRegistration.payment_screenshot_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="block"
                                            >
                                                <img 
                                                    src={selectedRegistration.payment_screenshot_url} 
                                                    alt="Payment Screenshot" 
                                                    className="max-w-full h-auto rounded border border-slate-700 cursor-pointer hover:opacity-80"
                                                />
                                            </a>
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 mb-3">No screenshot available</p>
                                    )}
                                    <div className="space-y-2">
                                        <Input
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setSelectedScreenshotFile(file);
                                                }
                                            }}
                                            className="bg-slate-950 border-slate-700 file:bg-slate-800 file:text-slate-200 file:border-0 file:rounded-sm file:px-2 file:mr-2 hover:file:bg-slate-700 text-sm"
                                        />
                                        {selectedScreenshotFile && (
                                            <Button
                                                onClick={handleUpdateScreenshot}
                                                disabled={isUpdatingScreenshot}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                                size="sm"
                                            >
                                                {isUpdatingScreenshot ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Updating...
                                                    </>
                                                ) : (
                                                    'Update Payment Screenshot'
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-800">
                                    <p className="text-sm text-slate-400">Registered On</p>
                                    <p className="font-semibold">
                                        {new Date(selectedRegistration.created_at).toLocaleString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}

