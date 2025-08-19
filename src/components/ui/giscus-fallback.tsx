"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface GiscusFallbackProps {
  slug: string;
  title: string;
}

export function GiscusFallback({ slug, title }: GiscusFallbackProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-16 pt-8 border-t border-gray-700/30"
    >
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"
        >
          💬 Discussion (Demo Mode)
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-400 leading-relaxed"
        >
          Comments system is in demo mode. Setup environment variables to enable GitHub discussions.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 p-8"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-200 mb-4">
            Ready for Real Comments!
          </h3>
          
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            This blog is powered by GitHub Discussions. Once configured, visitors can comment using their GitHub accounts.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-300">GitHub Integration</span>
              </div>
              <p className="text-xs text-gray-400">Secure authentication via GitHub</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-300">Real-time Updates</span>
              </div>
              <p className="text-xs text-gray-400">Comments sync automatically</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-300">Markdown Support</span>
              </div>
              <p className="text-xs text-gray-400">Rich text formatting</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-300">Moderation Tools</span>
              </div>
              <p className="text-xs text-gray-400">Full admin control</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
            <h4 className="text-blue-400 font-semibold mb-2">🔧 Setup Instructions:</h4>
            <ol className="text-sm text-gray-300 text-left space-y-1">
              <li>1. Visit <Link href="https://giscus.app" target="_blank" className="text-blue-400 hover:underline">giscus.app</Link></li>
              <li>2. Configure with repository: <code className="bg-gray-700 px-1 rounded text-green-400">hoangvu1806/VuxPortfolio</code></li>
              <li>3. Copy the generated IDs</li>
              <li>4. Add to <code className="bg-gray-700 px-1 rounded text-green-400">.env.local</code> file</li>
              <li>5. Restart development server</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="https://giscus.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Configure Giscus
            </Link>
            
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default GiscusFallback;
