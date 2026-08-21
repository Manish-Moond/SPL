'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
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

export default function PlayerCardPage() {
    const params = useParams();
    const router = useRouter();
    const emailParam = Array.isArray(params?.email) ? params.email[0] : params?.email;
    const decodedEmail = useMemo(
        () => (emailParam ? decodeURIComponent(emailParam) : ''),
        [emailParam]
    );

    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const selectedIndex = selectedPlayer
        ? players.findIndex((player) => player.email === selectedPlayer.email)
        : -1;

    const showPrevious = () => {
        if (players.length === 0 || selectedIndex === -1) return;
        const prevIndex = (selectedIndex - 1 + players.length) % players.length;
        const nextPlayer = players[prevIndex];
        setSelectedPlayer(nextPlayer);
        router.replace(`/players/${encodeURIComponent(nextPlayer.email)}`);
    };

    const showNext = () => {
        if (players.length === 0 || selectedIndex === -1) return;
        const nextIndex = (selectedIndex + 1) % players.length;
        const nextPlayer = players[nextIndex];
        setSelectedPlayer(nextPlayer);
        router.replace(`/players/${encodeURIComponent(nextPlayer.email)}`);
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

        const savedPassword = sessionStorage.getItem('slp.admin.password');
        if (savedPassword) {
            loadPlayers(savedPassword);
        } else if (!cached) {
            router.replace('/players');
        }
    }, []);

    useEffect(() => {
        if (!players.length || !decodedEmail) return;
        const match = players.find((player) => player.email === decodedEmail);
        if (!match) {
            toast.error('Player not found');
            return;
        }
        setSelectedPlayer(match);
    }, [players, decodedEmail]);

    useEffect(() => {
        if (!selectedPlayer) return;
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
    }, [selectedPlayer, router, showNext, showPrevious]);

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
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#0f172a_45%,#020617_100%)] opacity-90" />
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
                                {selectedPlayer.city || 'Khandwa'}
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
                                    <img
                                        src={selectedPlayer.photo_url}
                                        alt={selectedPlayer.full_name}
                                        className="h-[70vh] w-full object-contain bg-white"
                                    />
                                ) : (
                                    <div className="flex h-[70vh] items-center justify-center bg-slate-100 text-slate-500">
                                        No photo
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-6">
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
    );
}
