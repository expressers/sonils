import { useEffect, useRef } from 'react'
import { M } from '../data'

type Props = {
  src: string // ex.: 'video/hero-psv' ou 'img/cranes'
  alt?: string
  className?: string
  priority?: boolean
}

/** Vídeo em loop silencioso que só toca quando visível, ou imagem. */
export function Media({ src, alt = '', className, priority }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const isVideo = src.startsWith('video/')

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.05 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  if (isVideo) {
    return (
      <video
        ref={ref}
        className={className}
        src={M(`${src}.mp4`)}
        poster={M(`${src}.jpg`)}
        muted
        loop
        playsInline
        autoPlay={priority}
        preload={priority ? 'auto' : 'metadata'}
        aria-hidden="true"
      />
    )
  }
  return (
    <img
      className={className}
      src={M(`${src}.jpg`)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

export function Logo({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <img
      className={className}
      src={M('img/logo.png')}
      width={size}
      height={Math.round(size * 0.9)}
      alt="SONILS"
    />
  )
}
