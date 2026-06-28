import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, MapPin, Target, MessageSquare, CheckCircle, Loader, ChevronDown, ChevronUp } from 'lucide-react';
import { getCompatibility } from '../api/users';

const FACTOR_CONFIG = [
    { key: 'mutualFriendScore', label: 'Mutual Friends', icon: Users, color: '#a78bfa', max: 20 },
    { key: 'locationScore',     label: 'Same Location',  icon: MapPin, color: '#34d399', max: 20 },
    { key: 'interestScore',     label: 'Shared Interests', icon: Target, color: '#f43f5e', max: 20 },
    { key: 'interactionScore',  label: 'Interaction',    icon: MessageSquare, color: '#E8824A', max: 20 },
    { key: 'profileScore',      label: 'Profile Quality', icon: CheckCircle, color: '#60a5fa', max: 20 },
];

function ScoreRing({ score, size = 100, strokeWidth = 6 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score >= 80 ? '#34d399' : score >= 60 ? '#E8824A' : score >= 40 ? '#fbbf24' : '#f43f5e';

    return (
        <svg width={size} height={size} className="flex-shrink-0">
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none"
                stroke="var(--bg-elevated)"
                strokeWidth={strokeWidth}
            />
            <motion.circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
                x={size / 2} y={size / 2 - 4}
                textAnchor="middle"
                fontSize="22"
                fontWeight="800"
                fill="var(--text-primary)"
            >
                {score}
            </text>
            <text
                x={size / 2} y={size / 2 + 14}
                textAnchor="middle"
                fontSize="8"
                fill="var(--text-muted)"
                fontWeight="500"
            >
                / 100
            </text>
        </svg>
    );
}

function FactorBar({ factor, value, max, delay }) {
    const pct = Math.round((value / max) * 100);
    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-center gap-3"
        >
            <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${factor.color}18` }}
            >
                <factor.icon size={13} style={{ color: factor.color }} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-medium text-[var(--text-secondary)]">{factor.label}</span>
                    <span className="text-[12px] font-bold text-[var(--text-primary)]">{value}/{max}</span>
                </div>
                <div className="h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: delay + 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: factor.color, opacity: 0.8 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default function CompatibilityScore({ targetUserId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (!targetUserId) return;
        setLoading(true);
        setError(null);
        getCompatibility(targetUserId)
            .then(res => setData(res.data))
            .catch(() => setError('Could not load compatibility data.'))
            .finally(() => setLoading(false));
    }, [targetUserId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader size={22} className="text-[var(--accent)] animate-spin" />
            </div>
        );
    }

    if (error || !data) {
        return null;
    }

    const factorKeys = ['mutualFriendScore', 'locationScore', 'interestScore', 'interactionScore', 'profileScore'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden"
        >
            {/* Header — always visible */}
            <button
                onClick={() => setExpanded(e => !e)}
                className="w-full flex items-center gap-4 p-4 hover:bg-[var(--bg-elevated)]/50 transition-colors cursor-pointer text-left"
            >
                <ScoreRing score={data.overallScore} size={64} strokeWidth={5} />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{data.emoji}</span>
                        <span className="text-[15px] font-bold text-[var(--text-primary)]">{data.label}</span>
                    </div>
                    <p className="text-[12px] text-[var(--text-muted)] mt-0.5">
                        Friend Compatibility Score
                    </p>
                </div>

                {expanded
                    ? <ChevronUp size={16} className="text-[var(--text-muted)] flex-shrink-0" />
                    : <ChevronDown size={16} className="text-[var(--text-muted)] flex-shrink-0" />}
            </button>

            {/* Expanded details */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-4">
                            {/* Factor breakdown */}
                            <div className="space-y-2.5">
                                <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                                    Score Breakdown
                                </p>
                                {FACTOR_CONFIG.map((factor, i) => (
                                    <FactorBar
                                        key={factor.key}
                                        factor={factor}
                                        value={data[factor.key] || 0}
                                        max={factor.max}
                                        delay={i * 0.05}
                                    />
                                ))}
                            </div>

                            {/* Shared Interests */}
                            {data.sharedInterests?.length > 0 && (
                                <div>
                                    <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                                        Shared Interests
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {data.sharedInterests.map((interest, i) => (
                                            <motion.span
                                                key={interest}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.04 }}
                                                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[var(--accent-light)] text-[var(--accent)]"
                                            >
                                                #{interest}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Badges */}
                            {data.badges?.length > 0 && (
                                <div>
                                    <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                                        Compatibility Badges
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {data.badges.map((badge, i) => (
                                            <motion.div
                                                key={badge.id}
                                                initial={{ opacity: 0, y: 4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.04 }}
                                                className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                                                    badge.earned
                                                        ? 'bg-[var(--bg-card)] border-[var(--accent)]/20'
                                                        : 'bg-[var(--bg-elevated)]/40 border-[var(--border-color)] opacity-50'
                                                }`}
                                                title={badge.description}
                                            >
                                                <span className={`text-lg ${badge.earned ? '' : 'grayscale'}`}>
                                                    {badge.emoji}
                                                </span>
                                                <span className={`text-[11px] font-semibold ${
                                                    badge.earned ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                                                }`}>
                                                    {badge.label}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}