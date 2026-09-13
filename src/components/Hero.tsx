import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, Zap, Shield } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const features = [
    { icon: FileText, title: '100+ Páginas', desc: 'Processa documentos extensos com eficiência' },
    { icon: Sparkles, title: 'RAG Avançado', desc: 'Retrieval-Augmented Generation de última geração' },
    { icon: Zap, title: 'Alta Performance', desc: 'Chunking inteligente e embeddings otimizados' },
    { icon: Shield, title: 'Revisão Precisa', desc: 'Análise contextual com memória de longo alcance' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-400 pulse-dot" />
          <span className="text-sm text-surface-200">Retrieval-Augmented Generation para Documentos Longos</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">Revise documentos</span>
          <br />
          <span className="gradient-text">com inteligência artificial</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg sm:text-xl text-surface-200 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Pipeline RAG completo para processar, analisar e revisar documentos de 100+ páginas.
          Upload seu Word, faça perguntas, e receba revisões contextuais com precisão cirúrgica.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl text-white font-semibold text-lg flex items-center gap-2 shadow-lg shadow-primary-500/25"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="px-8 py-4 glass rounded-xl text-surface-200 font-semibold text-lg hover:text-white transition-colors"
          >
            Ver Pipeline RAG
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass rounded-xl p-5 text-left group cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center mb-3 group-hover:bg-primary-500/30 transition-colors">
                <feature.icon className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-surface-200">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {[
            { value: '100+', label: 'Páginas por doc' },
            { value: '<2s', label: 'Latência média' },
            { value: '98%', label: 'Precisão retrieval' },
            { value: '∞', label: 'Contexto útil' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text-accent">{stat.value}</div>
              <div className="text-xs sm:text-sm text-surface-200 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
