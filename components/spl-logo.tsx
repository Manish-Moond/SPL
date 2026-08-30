import { Oswald } from 'next/font/google';

const oswald = Oswald({
    subsets: ['latin'],
    weight: ['600', '700'],
});

/**
 * SPL "Classic Crest" logo — shield with stumps, SPL monogram and KHANDWA.
 * Vector, so it scales from favicon to banner without quality loss.
 */
export function SplLogo({ className = '' }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 240 240"
            className={`${oswald.className} ${className}`}
            role="img"
            aria-label="SPL Khandwa crest"
        >
            <path
                d="M120 18 L202 44 V118 C202 172 168 204 120 224 C72 204 38 172 38 118 V44 Z"
                fill="#111"
                stroke="#FF6B00"
                strokeWidth="7"
            />
            <path
                d="M120 30 L190 52 V116 C190 163 161 192 120 210 C79 192 50 163 50 116 V52 Z"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2"
            />
            <rect x="101" y="56" width="7" height="52" rx="3" fill="#fff" />
            <rect x="116" y="56" width="7" height="52" rx="3" fill="#fff" />
            <rect x="131" y="56" width="7" height="52" rx="3" fill="#fff" />
            <rect x="100" y="50" width="18" height="5" rx="2.5" fill="#FF6B00" />
            <rect x="121" y="50" width="18" height="5" rx="2.5" fill="#FF6B00" />
            <text
                x="120"
                y="165"
                textAnchor="middle"
                fontSize="46"
                fontWeight="700"
                fill="#FF6B00"
            >
                SPL
            </text>
            <text
                x="120"
                y="192"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                letterSpacing="5"
                fill="#fff"
            >
                KHANDWA
            </text>
        </svg>
    );
}
