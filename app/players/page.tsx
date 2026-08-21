'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Loader2, Lock, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Player {
    id: number | null;
    full_name: string;
    email: string;
    phone: string | null;
    address: string | null;
    city: string | null;
    aadhar_number: string | null;
    role_type: string | null;
    batting_style: string | null;
    bowling_style: string | null;
    photo_url: string | null;
}

const STORAGE_KEY = 'slp.players.v1';
const AUTH_STORAGE_KEY = 'slp.admin.password';
const SELECTED_PLAYER_KEY = 'slp.players.selectedIndex';

export default function PlayersPage() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const fetchPlayers = async (authPassword: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/players?password=${encodeURIComponent(authPassword)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch players');
            }
            const data = await response.json();
            const list = Array.isArray(data?.data) ? data.data : [];
            setPlayers(list);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch (error) {
            console.error('Error fetching players:', error);
            toast.error('Failed to fetch players');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const savedPassword = sessionStorage.getItem(AUTH_STORAGE_KEY);
        if (savedPassword) {
            setPassword(savedPassword);
            setIsAuthenticated(true);
            const cached = localStorage.getItem(STORAGE_KEY);
            if (cached) {
                try {
                    const parsed = JSON.parse(cached);
                    if (Array.isArray(parsed)) {
                        setPlayers(parsed);
                    }
                } catch (error) {
                    console.warn('Invalid players cache, refetching.', error);
                }
            }
            fetchPlayers(savedPassword);
            return;
        }

        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed)) {
                    setPlayers(parsed);
                    return;
                }
            } catch (error) {
                console.warn('Invalid players cache, refetching.', error);
            }
        }
    }, []);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsAuthLoading(true);
        try {
            const response = await fetch(`/api/players?password=${encodeURIComponent(password)}`);
            if (!response.ok) {
                throw new Error('Unauthorized');
            }
            const data = await response.json();
            const list = Array.isArray(data?.data) ? data.data : [];
            setPlayers(list);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            sessionStorage.setItem(AUTH_STORAGE_KEY, password);
            setIsAuthenticated(true);
            toast.success('Login successful');
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Invalid password');
        } finally {
            setIsAuthLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white">
            <div className="container mx-auto py-8 px-4">
                {!isAuthenticated ? (
                    <Card className="w-full max-w-md bg-white border-slate-200 text-slate-900 shadow-xl mx-auto">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-slate-100 p-3 rounded-full">
                                    <Lock className="h-8 w-8 text-slate-700" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-slate-900">
                                Players Access
                            </CardTitle>
                            <CardDescription className="text-slate-600 mt-2">
                                Enter password to continue
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="bg-white border-slate-200"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                                    disabled={isAuthLoading}
                                >
                                    {isAuthLoading ? (
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
                ) : (
                <Card className="bg-white border-slate-200 text-slate-900 shadow-xl">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <Users className="h-6 w-6" />
                                    Players
                                </CardTitle>
                                <CardDescription className="text-slate-600 mt-2">
                                    Total Players: {players.length}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
                            </div>
                        ) : players.length === 0 ? (
                            <div className="text-center py-12 text-slate-600">
                                No players found
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">ID</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Name</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Email</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Phone</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Address</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">City</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Aadhar</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Role</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Batting</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Bowling</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Photo</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {players.map((player, index) => (
                                            <tr
                                                key={`${player.email}-${index}`}
                                                className="border-b border-slate-200 hover:bg-slate-50"
                                            >
                                                <td className="py-3 px-4 text-sm font-mono text-slate-700">
                                                    {player.id ?? '—'}
                                                </td>
                                                <td className="py-3 px-4 text-sm">{player.full_name}</td>
                                                <td className="py-3 px-4 text-sm text-slate-600">{player.email}</td>
                                                <td className="py-3 px-4 text-sm text-slate-600">{player.phone || 'N/A'}</td>
                                                <td className="py-3 px-4 text-sm text-slate-600">{player.address || 'N/A'}</td>
                                                <td className="py-3 px-4 text-sm text-slate-600">{player.city || 'N/A'}</td>
                                                <td className="py-3 px-4 text-xs font-mono text-slate-600">
                                                    {player.aadhar_number || 'N/A'}
                                                </td>
                                                <td className="py-3 px-4 text-sm capitalize">{player.role_type || 'N/A'}</td>
                                                <td className="py-3 px-4 text-sm text-slate-600">{player.batting_style || 'N/A'}</td>
                                                <td className="py-3 px-4 text-sm text-slate-600">{player.bowling_style || 'N/A'}</td>
                                                <td className="py-3 px-4 text-sm">
                                                    {player.photo_url ? (
                                                        <a
                                                            href={player.photo_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-500 underline"
                                                        >
                                                            View
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-400">N/A</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-sm">
                                                    <Link
                                                        href="/players/info"
                                                        onClick={() => {
                                                            sessionStorage.setItem(
                                                                SELECTED_PLAYER_KEY,
                                                                String(index)
                                                            );
                                                        }}
                                                        className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                        View Card
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
                )}
            </div>
        </div>
    );
}
