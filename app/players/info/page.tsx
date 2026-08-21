'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Lock } from 'lucide-react';
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
    player_status?: 'sold' | 'unsold' | null;
    sold_price?: number | null;
}

const STORAGE_KEY = 'slp.players.v1';
const SELECTED_PLAYER_KEY = 'slp.players.selectedIndex';
const AUTH_STORAGE_KEY = 'slp.admin.password';
const PENDING_UPDATES_KEY = 'slp.players.pendingUpdates';
const BID_START = 500;

export default function PlayerInfoPage() {
    const router = useRouter();
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isPhotoLoading, setIsPhotoLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [bidPrice, setBidPrice] = useState(BID_START);
    const [isSavingStatus, setIsSavingStatus] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const getBidKey = (playerId: number) => `slp.players.bid.${playerId}`;
    const getBidStep = (price: number) => {
        if (price < 1000) return 100;
        if (price < 3000) return 200;
        return 500;
    };

    const selectedPlayer = useMemo(
        () => (players.length ? players[Math.max(0, Math.min(currentIndex, players.length - 1))] : null),
        [players, currentIndex]
    );

    const showPrevious = () => {
        if (!players.length) return;
        setCurrentIndex((index) => (index - 1 + players.length) % players.length);
    };

    const showNext = () => {
        if (!players.length) return;
        setCurrentIndex((index) => (index + 1) % players.length);
    };

    const roleLabel = selectedPlayer?.role_type
        ? selectedPlayer.role_type.replace(/_/g, ' ')
        : 'Player';

    const styleLabel = selectedPlayer
        ? selectedPlayer.batting_style || selectedPlayer.bowling_style
            ? `${selectedPlayer.batting_style || ''}${
                  selectedPlayer.batting_style && selectedPlayer.bowling_style ? ' / ' : ''
              }${selectedPlayer.bowling_style || ''}`
            : 'Player style'
        : '';

    const loadPlayers = async (authPassword?: string) => {
        setIsLoading(true);
        try {
            const cached = localStorage.getItem(STORAGE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed)) {
                    setPlayers(parsed);
                }
            }

            if (authPassword) {
                const response = await fetch(`/api/players?password=${encodeURIComponent(authPassword)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch players');
                }
                const data = await response.json();
                const list = Array.isArray(data?.data) ? data.data : [];
                setPlayers(list);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            }
        } catch (error) {
            console.error('Error fetching players:', error);
            toast.error('Failed to fetch players');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
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

        const storedIndex = sessionStorage.getItem(SELECTED_PLAYER_KEY);
        if (storedIndex) {
            const parsedIndex = Number(storedIndex);
            if (!Number.isNaN(parsedIndex)) {
                setCurrentIndex(parsedIndex);
            }
        }

        const savedPassword = sessionStorage.getItem(AUTH_STORAGE_KEY);
        if (savedPassword) {
            setPassword(savedPassword);
            setIsAuthenticated(true);
            loadPlayers(savedPassword);
        } else if (!cached) {
            router.replace('/players');
        }
    }, []);

    useEffect(() => {
        if (!selectedPlayer && players.length) {
            setCurrentIndex(0);
        }
    }, [players, selectedPlayer]);

    useEffect(() => {
        if (!selectedPlayer?.id) {
            setBidPrice(BID_START);
            return;
        }
        const storedBid = localStorage.getItem(getBidKey(selectedPlayer.id));
        if (storedBid) {
            const parsedBid = Number(storedBid);
            if (!Number.isNaN(parsedBid)) {
                setBidPrice(parsedBid);
                return;
            }
        }
        setBidPrice(BID_START);
    }, [selectedPlayer?.id]);

    useEffect(() => {
        if (selectedPlayer?.photo_url) {
            setIsPhotoLoading(true);
        } else {
            setIsPhotoLoading(false);
        }
    }, [selectedPlayer]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                router.push('/players');
                return;
            }
            if (event.key === 'ArrowLeft') {
                showPrevious();
                return;
            }
            if (event.key === 'ArrowRight') {
                showNext();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router, players]);

    useEffect(() => {
        sessionStorage.setItem(SELECTED_PLAYER_KEY, String(currentIndex));
    }, [currentIndex]);

    const queuePendingUpdate = (payload: { id: number; player_status: 'sold' | 'unsold'; sold_price: number | null }) => {
        const existing = localStorage.getItem(PENDING_UPDATES_KEY);
        const list = existing ? JSON.parse(existing) : [];
        list.push({ ...payload, queued_at: Date.now() });
        localStorage.setItem(PENDING_UPDATES_KEY, JSON.stringify(list));
    };

    const flushPendingUpdates = async () => {
        const pending = localStorage.getItem(PENDING_UPDATES_KEY);
        if (!pending) return;
        const parsed = JSON.parse(pending);
        if (!Array.isArray(parsed) || parsed.length === 0) return;
        const authPassword = sessionStorage.getItem(AUTH_STORAGE_KEY);
        if (!authPassword) return;

        const remaining: typeof parsed = [];
        for (const item of parsed) {
            try {
                const response = await fetch(`/api/players/update-status?password=${encodeURIComponent(authPassword)}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: item.id,
                        player_status: item.player_status,
                        sold_price: item.sold_price,
                    }),
                });
                if (!response.ok) {
                    remaining.push(item);
                }
            } catch {
                remaining.push(item);
            }
        }
        if (remaining.length > 0) {
            localStorage.setItem(PENDING_UPDATES_KEY, JSON.stringify(remaining));
        } else {
            localStorage.removeItem(PENDING_UPDATES_KEY);
        }
    };

    const updateStatus = async (status: 'sold' | 'unsold') => {
        if (!selectedPlayer?.id) {
            toast.error('Missing player ID');
            return;
        }

        const soldPrice = status === 'sold' ? bidPrice : null;
        setIsSavingStatus(true);
        try {
            const response = await fetch(`/api/players/update-status?password=${encodeURIComponent(password)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedPlayer.id,
                    player_status: status,
                    sold_price: soldPrice,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            toast.success(status === 'sold' ? 'Marked as sold' : 'Marked as unsold');
            if (status === 'sold') {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 1400);
            }
        } catch (error) {
            console.error('Status update failed:', error);
            queuePendingUpdate({
                id: selectedPlayer.id,
                player_status: status,
                sold_price: soldPrice,
            });
            toast.error('Network issue. Update queued for sync.');
        } finally {
            setIsSavingStatus(false);
        }
    };

    useEffect(() => {
        if (!selectedPlayer?.id) return;
        localStorage.setItem(getBidKey(selectedPlayer.id), String(bidPrice));
    }, [bidPrice, selectedPlayer?.id]);

    useEffect(() => {
        const handleOnline = () => {
            flushPendingUpdates();
        };
        window.addEventListener('online', handleOnline);
        flushPendingUpdates();
        return () => window.removeEventListener('online', handleOnline);
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
            flushPendingUpdates();
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Invalid password');
        } finally {
            setIsAuthLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="flex min-h-screen items-center justify-center px-4">
                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-white/10 p-3">
                                <Lock className="h-8 w-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-semibold text-white">Players Access</h1>
                            <p className="mt-2 text-sm text-slate-300">
                                Enter password to continue
                            </p>
                        </div>
                        <form onSubmit={handleLogin} className="mt-6 space-y-4">
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full bg-white text-slate-900 hover:bg-slate-100"
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
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading || !selectedPlayer) {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="flex min-h-screen items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="relative h-screen w-screen overflow-hidden rounded-none bg-slate-950 text-white shadow-2xl">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#0f172a_45%,#020617_100%)] opacity-90" />
                <div className="relative z-10 grid h-full items-center gap-12 px-12 py-10 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-10">
                        <div className="space-y-3">
                            <div className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-300">
                                Super Premier League 2026
                            </div>
                            <div className="h-px w-24 bg-[#d6b15b]" />
                        </div>

                        <div className="space-y-4">
                            <div className="text-5xl font-semibold uppercase tracking-[0.12em] text-[#d6b15b]">
                                {selectedPlayer.full_name}
                            </div>
                            <div className="text-2xl font-semibold uppercase tracking-[0.18em] text-slate-100">
                                {roleLabel}
                            </div>
                            <div className="text-lg uppercase tracking-[0.2em] text-slate-300">
                                {styleLabel}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.2em] text-slate-200">
                            <span className="rounded-full border border-slate-600/70 px-4 py-1.5">
                                {selectedPlayer.address || 'Address N/A'}
                            </span>
                            <span className="rounded-full border border-slate-600/70 px-4 py-1.5">
                                {selectedPlayer.phone || 'Phone N/A'}
                            </span>
                            <span className="rounded-full border border-slate-600/70 px-4 py-1.5">
                                {selectedPlayer.email || 'Email N/A'}
                            </span>
                        </div>
                    </div>

                    <div className="flex h-full items-center justify-center">
                        <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                            <div className="absolute inset-0 rounded-[32px] border-2 border-[#d6b15b]/60" />
                            <div className="relative overflow-hidden rounded-2xl bg-white">
                                {selectedPlayer.photo_url ? (
                                    <>
                                        {isPhotoLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-white">
                                                <Loader2 className="h-10 w-10 animate-spin text-slate-500" />
                                            </div>
                                        )}
                                        <img
                                            src={selectedPlayer.photo_url}
                                            alt={selectedPlayer.full_name}
                                            className="h-[70vh] w-full object-contain bg-white"
                                            onLoad={() => setIsPhotoLoading(false)}
                                            onError={() => setIsPhotoLoading(false)}
                                        />
                                    </>
                                ) : (
                                    <div className="flex h-[70vh] items-center justify-center bg-slate-100 text-slate-500">
                                        No photo
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {showConfetti && (
                    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
                        {Array.from({ length: 160 }).map((_, index) => {
                            const size = 4 + (index % 4) * 2;
                            const drift = (index % 2 === 0 ? 1 : -1) * (18 + (index % 7) * 6);
                            const duration = 1.2 + (index % 6) * 0.15;
                            const colors = ['#fbbf24', '#34d399', '#fb7185', '#60a5fa', '#a78bfa'];
                            return (
                                <span
                                    key={index}
                                    className="absolute animate-[confetti-fall_1.6s_ease-out_forwards]"
                                    style={{
                                        left: `${(index * 7) % 100}%`,
                                        top: '-10%',
                                        width: `${size}px`,
                                        height: `${size + (index % 3)}px`,
                                        borderRadius: index % 3 === 0 ? '9999px' : '2px',
                                        backgroundColor: colors[index % colors.length],
                                        animationDelay: `${index * 0.01}s`,
                                        animationDuration: `${duration}s`,
                                        ['--confetti-x' as string]: `${drift}vw`,
                                    }}
                                />
                            );
                        })}
                    </div>
                )}

                <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur">
                        <input
                            type="text"
                            value={bidPrice}
                            onChange={(event) => {
                                const nextValue = Number(event.target.value.replace(/\D/g, ''));
                                if (!Number.isNaN(nextValue)) {
                                    setBidPrice(Math.max(BID_START, nextValue));
                                }
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'ArrowUp') {
                                    event.preventDefault();
                                    const step = getBidStep(bidPrice);
                                    setBidPrice((price) => price + step);
                                }
                                if (event.key === 'ArrowDown') {
                                    event.preventDefault();
                                    const step = getBidStep(bidPrice);
                                    setBidPrice((price) => Math.max(BID_START, price - step));
                                }
                            }}
                            className="w-32 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-center text-lg font-semibold text-white outline-none placeholder:text-slate-300"
                            inputMode="numeric"
                            aria-label="Current bid price"
                        />
                        <button
                            type="button"
                            onClick={() => updateStatus('sold')}
                            disabled={isSavingStatus}
                            className="rounded-full bg-emerald-400/90 px-6 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-emerald-300 disabled:opacity-60"
                        >
                            Sold
                        </button>
                        <button
                            type="button"
                            onClick={() => updateStatus('unsold')}
                            disabled={isSavingStatus}
                            className="rounded-full bg-rose-400/90 px-6 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-rose-300 disabled:opacity-60"
                        >
                            Unsold
                        </button>
                    </div>
                    <div className="flex items-center gap-6">
                        <button
                            type="button"
                            onClick={showPrevious}
                            className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-800 shadow hover:bg-white"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={showNext}
                            className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-800 shadow hover:bg-white"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
