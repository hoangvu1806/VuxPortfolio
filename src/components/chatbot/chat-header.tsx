'use client';

import { motion } from 'framer-motion';
import { FiX, FiLock, FiUnlock } from 'react-icons/fi';

interface ChatHeaderProps {
    onClose: () => void;
    isDragLocked?: boolean;
    onToggleDragLock?: () => void;
}

export function ChatHeader({ onClose, isDragLocked = false, onToggleDragLock }: ChatHeaderProps) {
    return (
        <div
            className={`px-4 py-3 text-white flex-shrink-0 select-none ${isDragLocked ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
            style={{
                background: 'rgba(17, 24, 39, 0.4)',
                backdropFilter: 'blur(25px) saturate(180%)',
                WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                borderBottom: '1px solid rgba(75, 85, 99, 0.4)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg">
                            <img
                                src="/images/profile/twinself.png"
                                alt="AI Assistant Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Online status */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-gray-900 shadow-sm"
                        />
                    </div>

                    <div className="flex flex-col justify-center" style={{ gap: '1px' }}>
                        <h4 className="font-semibold text-base" style={{ lineHeight: '1.1', margin: 0 }}>Vu Hoang AI</h4>
                        <div className="flex items-center text-xs text-gray-400" style={{ gap: '4px' }}>
                            <span className="font-normal">Online</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-1">
                    {/* Pin/Lock Button */}
                    {onToggleDragLock && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onToggleDragLock}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            title={isDragLocked ? "Unlock dragging" : "Lock position"}
                        >
                            {isDragLocked ? (
                                <FiLock className="w-3.5 h-3.5" />
                            ) : (
                                <FiUnlock className="w-3.5 h-3.5" />
                            )}
                        </motion.button>
                    )}

                    {/* Close Button */}
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <FiX className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}