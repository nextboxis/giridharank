import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

/** GPU-accelerated fade + slide-up when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  ...rest
}: { children: ReactNode; delay?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '-20px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`min-w-0 will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Standard section wrapper with fluid padding across Mobile, iOS, Tablet, Laptop & Desktop. */
export function Section({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string
  index: string
  label: string
  title: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className="border-t border-line py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            <span className="text-accent">{index}</span> / {label}
          </p>
          <h2 className="section-fluid-title mt-3 max-w-3xl font-semibold tracking-tight text-ink sm:mt-4">
            {title}
          </h2>
        </Reveal>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  )
}
