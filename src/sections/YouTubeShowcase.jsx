import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Youtube, Volume2, VolumeX, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react'

const shorts = [
  'DIg4DSabczw',
  '9vk65c_GAdE',
  'sKttYSwcRs8',
  'j__F-hIrTk4'
]

function YouTubeShort({ videoId, isMuted, onToggleMute }) {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)
  const isInView = useInView(containerRef, { amount: 0.5 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const replayTimeoutRef = useRef(null)

  // Handle in-view auto play/pause
  useEffect(() => {
    if (isEnded) return // Don't auto-play if it specifically ended
    setIsPlaying(isInView)
    if (!isInView && !isMuted) {
      onToggleMute(videoId)
    }
  }, [isInView, isMuted, videoId, onToggleMute, isEnded])

  // Sync play state to iframe
  useEffect(() => {
    if (!iframeRef.current || isEnded) return
    const message = isPlaying ? 'playVideo' : 'pauseVideo'
    iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: message, args: [] }), '*')
  }, [isPlaying, isEnded])

  // Sync mute state to iframe
  useEffect(() => {
    if (!iframeRef.current) return
    const message = isMuted ? 'mute' : 'unMute'
    iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: message, args: [] }), '*')
  }, [isMuted])

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      // Enable YouTube API event broadcasting
      iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), '*')
      
      iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: isMuted ? 'mute' : 'unMute', args: [] }), '*')
      if (isPlaying && !isEnded) {
        iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*')
      }
    }
  }

  // Listen to YouTube player state changes for ending/replay
  useEffect(() => {
    const handleMessage = (event) => {
      if (typeof event.data === 'string' && event.data.includes('infoDelivery')) {
        try {
          const data = JSON.parse(event.data)
          if (event.source === iframeRef.current?.contentWindow && data.info && data.info.playerState !== undefined) {
            const state = data.info.playerState
            if (state === 0) { // ENDED
              setIsPlaying(false)
              setIsEnded(true)
              
              // Auto replay after 3 seconds
              if (replayTimeoutRef.current) clearTimeout(replayTimeoutRef.current)
              replayTimeoutRef.current = setTimeout(() => {
                replayVideo()
              }, 3000)
            } else if (state === 1) { // PLAYING
              setIsPlaying(true)
              setIsEnded(false)
              if (replayTimeoutRef.current) clearTimeout(replayTimeoutRef.current)
            } else if (state === 2) { // PAUSED
              setIsPlaying(false)
              if (replayTimeoutRef.current) clearTimeout(replayTimeoutRef.current)
            }
          }
        } catch (e) {}
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
      if (replayTimeoutRef.current) clearTimeout(replayTimeoutRef.current)
    }
  }, [])

  const replayVideo = () => {
    if (replayTimeoutRef.current) clearTimeout(replayTimeoutRef.current)
    setIsEnded(false)
    setIsPlaying(true)
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }), '*')
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*')
  }

  const togglePlay = (e) => {
    e.stopPropagation()
    setIsPlaying(!isPlaying)
  }

  return (
    <div ref={containerRef} className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/50 group shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.02]">
      {/* Removed playlist and loop to prevent Next/Previous buttons natively */}
      <iframe
        ref={iframeRef}
        onLoad={handleIframeLoad}
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&iv_load_policy=3`}
        title="Brand9Studio YouTube Short"
        className="absolute inset-0 w-full h-full scale-[1.05] pointer-events-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      
      {/* Interactive Overlay - Tapping anywhere unmutes */}
      <div 
        className="absolute inset-0 z-10 cursor-pointer" 
        onClick={() => onToggleMute(videoId)}
      >
        <div className={`absolute inset-0 transition-opacity duration-300 ${isMuted ? 'bg-black/10 opacity-0 group-hover:opacity-100' : 'bg-transparent'}`} />
        
        {/* Bottom Gradient to hide any native YouTube injected buttons (like the dummy share button on mobile) */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Custom Brand9 Badge at bottom left to completely obscure the share button area */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full transition-opacity pointer-events-none">
          <Youtube size={12} className="text-brand-lime" />
          <span className="text-[9px] font-bold text-white uppercase tracking-widest">Brand9 Shorts</span>
        </div>
        
        {/* Invisible Play Button area to capture clicks exactly over the native YouTube play button */}
        {!isPlaying && !isEnded && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <button 
              onClick={togglePlay}
              className="w-24 h-20 bg-transparent cursor-pointer pointer-events-auto"
              aria-label="Play Video"
            />
          </div>
        )}

        {/* Custom Replay Button */}
        {isEnded && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
            <button 
              onClick={(e) => { e.stopPropagation(); replayVideo(); }}
              className="w-16 h-16 rounded-full bg-brand-lime/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-black hover:bg-white transition-all hover:scale-110 pointer-events-auto cursor-pointer shadow-[0_0_30px_rgba(196,239,71,0.5)]"
              aria-label="Replay Video"
            >
              <RotateCcw size={28} className="ml-0" />
            </button>
          </div>
        )}

        {/* Custom Pause Button - only visible on hover when playing */}
        {isPlaying && !isEnded && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
            <button 
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-brand-lime hover:border-brand-lime/50 transition-all hover:scale-110 pointer-events-auto cursor-pointer"
              aria-label="Pause Video"
            >
              <Pause size={24} className="fill-current" />
            </button>
          </div>
        )}
        
        {/* Volume Indicator */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 transition-opacity duration-300 pointer-events-none">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isMuted ? 'bg-black/60 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100' : 'bg-brand-lime/90 text-black border border-brand-lime opacity-100 shadow-[0_0_20px_rgba(196,239,71,0.4)] scale-110'}`}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function YouTubeShowcase() {
  const [activeAudioVideoId, setActiveAudioVideoId] = useState(null)

  const handleToggleMute = (videoId) => {
    setActiveAudioVideoId(prev => prev === videoId ? null : videoId)
  }

  return (
    <div className="mt-24 sm:mt-32 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Youtube size={14} /> Brand9Studio Shorts
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
            Watch Us <span className="text-brand-lime">In Action.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 sm:gap-4"
        >
          <a
            href="https://youtube.com/@brandninestudio?si=icXSAwUd_cGkL_Kk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#FF0000] text-white text-xs sm:text-sm font-black uppercase tracking-[0.2em] hover:bg-[#CC0000] transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg shadow-[#FF0000]/20"
          >
            Subscribe to Channel <ArrowRight size={18} className="hidden sm:block" />
          </a>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {shorts.map((id, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <YouTubeShort 
              videoId={id} 
              isMuted={activeAudioVideoId !== id} 
              onToggleMute={handleToggleMute} 
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
