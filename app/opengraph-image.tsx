import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Super Premier League (SPL) — Khandwa Cricket League';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    const [oswaldBold, oswaldMedium] = await Promise.all([
        readFile(join(process.cwd(), 'assets/fonts/oswald-700.ttf')),
        readFile(join(process.cwd(), 'assets/fonts/oswald-500.ttf')),
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    background: '#050505',
                    padding: '60px 80px',
                    gap: '64px',
                    fontFamily: 'Oswald',
                    position: 'relative',
                }}
            >
                {/* Orange glow accents */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-120px',
                        left: '-120px',
                        width: '400px',
                        height: '400px',
                        borderRadius: '9999px',
                        backgroundImage:
                            'radial-gradient(circle, rgba(255,107,0,0.28) 0%, rgba(255,107,0,0) 70%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-140px',
                        right: '-100px',
                        width: '440px',
                        height: '440px',
                        borderRadius: '9999px',
                        backgroundImage:
                            'radial-gradient(circle, rgba(255,107,0,0.18) 0%, rgba(255,107,0,0) 70%)',
                    }}
                />

                {/* Crest */}
                <div
                    style={{
                        position: 'relative',
                        width: '390px',
                        height: '390px',
                        display: 'flex',
                        flexShrink: 0,
                    }}
                >
                    <svg width="390" height="390" viewBox="0 0 240 240">
                        <path
                            d="M120 18 L202 44 V118 C202 172 168 204 120 224 C72 204 38 172 38 118 V44 Z"
                            fill="#111111"
                            stroke="#FF6B00"
                            strokeWidth="7"
                        />
                        <path
                            d="M120 30 L190 52 V116 C190 163 161 192 120 210 C79 192 50 163 50 116 V52 Z"
                            fill="none"
                            stroke="rgba(255,255,255,0.18)"
                            strokeWidth="2"
                        />
                        <rect x="101" y="56" width="7" height="52" rx="3" fill="#ffffff" />
                        <rect x="116" y="56" width="7" height="52" rx="3" fill="#ffffff" />
                        <rect x="131" y="56" width="7" height="52" rx="3" fill="#ffffff" />
                        <rect x="100" y="50" width="18" height="5" rx="2.5" fill="#FF6B00" />
                        <rect x="121" y="50" width="18" height="5" rx="2.5" fill="#FF6B00" />
                    </svg>
                    <div
                        style={{
                            position: 'absolute',
                            top: '190px',
                            left: '0px',
                            width: '390px',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '74px',
                            fontWeight: 700,
                            color: '#FF6B00',
                        }}
                    >
                        SPL
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: '288px',
                            left: '0px',
                            width: '390px',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '23px',
                            fontWeight: 500,
                            letterSpacing: '9px',
                            color: '#ffffff',
                        }}
                    >
                        KHANDWA
                    </div>
                </div>

                {/* Text block */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '18px',
                    }}
                >
                    <div
                        style={{
                            fontSize: '76px',
                            fontWeight: 700,
                            color: '#ffffff',
                            lineHeight: 1.05,
                            textTransform: 'uppercase',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <span>
                            Super <span style={{ color: '#FF6B00', marginLeft: '18px' }}>Premier</span>
                        </span>
                        <span>League</span>
                    </div>
                    <div
                        style={{
                            fontSize: '30px',
                            fontWeight: 500,
                            letterSpacing: '6px',
                            color: '#9ca3af',
                            textTransform: 'uppercase',
                        }}
                    >
                        Khandwa Cricket League
                    </div>
                    <div
                        style={{
                            marginTop: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                        }}
                    >
                        <div
                            style={{
                                background: '#FF6B00',
                                color: '#ffffff',
                                fontSize: '28px',
                                fontWeight: 700,
                                padding: '10px 28px',
                                borderRadius: '9999px',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                            }}
                        >
                            Registrations Open
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                { name: 'Oswald', data: oswaldBold, weight: 700, style: 'normal' },
                { name: 'Oswald', data: oswaldMedium, weight: 500, style: 'normal' },
            ],
        }
    );
}
