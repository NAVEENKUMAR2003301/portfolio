import { motion } from 'framer-motion';

export default function BentoCard({
  children,
  className = '',
  delay = 0,
  padding = true,
  ...rest
}) {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative overflow-hidden rounded-3xl
        border border-white/[0.08] bg-white/[0.03]
        backdrop-blur-xl
        transition-all duration-300
        hover:border-white/[0.16] hover:bg-white/[0.05]
        ${padding ? 'p-5 sm:p-6' : ''}
        ${className}
      `}
    >
      {/* top hairline glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {children}
    </motion.div>
  );
}