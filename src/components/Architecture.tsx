import { motion } from 'framer-motion';
import { Server, Cloud, Shield, GitBranch, Layers, Workflow } from 'lucide-react';

export default function Architecture() {
  const layers = [
    {
      icon: Cloud,
      title: 'Frontend',
      subtitle: 'React + TypeScript',
      items: ['Interface responsiva', 'Real-time streaming', 'State management'],
      color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      icon: Server,
      title: 'API Gateway',
      subtitle: 'FastAPI + WebSocket',
      items: ['REST endpoints', 'WebSocket streaming', 'Rate limiting'],
      color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: Workflow,
      title: 'Orquestração',
      subtitle: 'LangChain + Celery',
      items: ['Pipeline RAG', 'Task queues', 'Retry logic'],
      color: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30',
      iconColor: 'text-indigo-400',
    },
    {
      icon: Layers,
      title: 'Vector Store',
      subtitle: 'Pinecone + Redis',
      items: ['HNSW index', 'Semantic cache', 'Metadata filtering'],
      color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      icon: GitBranch,
      title: 'LLM Layer',
      subtitle: 'OpenAI + Anthropic',
      items: ['GPT-4o / Claude', 'Prompt templates', 'Output parsing'],
      color: 'from-amber-500/20 to-amber-600/20 border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      icon: Shield,
      title: 'Infraestrutura',
      subtitle: 'Docker + AWS',
      items: ['Containerizado', 'CI/CD pipeline', 'Monitoring'],
      color: 'from-rose-500/20 to-rose-600/20 border-rose-500/30',
      iconColor: 'text-rose-400',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Arquitetura do <span className="gradient-text">Sistema</span>
          </h2>
          <p className="text-surface-200 text-lg max-w-2xl mx-auto">
            Arquitetura escalável em camadas, projetada para alta disponibilidade e performance
          </p>
        </motion.div>

        {/* Architecture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`rounded-xl p-5 border backdrop-blur-sm bg-gradient-to-br ${layer.color} cursor-default`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <layer.icon className={`w-5 h-5 ${layer.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{layer.title}</h3>
                  <p className="text-xs text-surface-200">{layer.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {layer.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-surface-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Connection lines visual */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-2 flex-wrap"
        >
          <span className="text-xs text-surface-200 glass-light rounded-full px-3 py-1">
            Frontend → API → Orchestrator → Vector Store → LLM → Response
          </span>
        </motion.div>
      </div>
    </section>
  );
}
