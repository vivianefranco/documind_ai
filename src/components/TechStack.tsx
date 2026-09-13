import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  category: string;
  level: number; // 1-5
}

const techCategories: { title: string; color: string; items: TechItem[] }[] = [
  {
    title: 'AI / ML',
    color: 'text-purple-400',
    items: [
      { name: 'LangChain', category: 'Orquestração', level: 5 },
      { name: 'OpenAI API', category: 'LLM', level: 5 },
      { name: 'Embeddings', category: 'NLP', level: 5 },
      { name: 'Vector DBs', category: 'Storage', level: 4 },
      { name: 'Prompt Engineering', category: 'Design', level: 5 },
      { name: 'RAG Patterns', category: 'Architecture', level: 5 },
    ],
  },
  {
    title: 'Backend',
    color: 'text-emerald-400',
    items: [
      { name: 'Python', category: 'Language', level: 5 },
      { name: 'FastAPI', category: 'Framework', level: 5 },
      { name: 'PostgreSQL', category: 'Database', level: 4 },
      { name: 'Redis', category: 'Cache', level: 4 },
      { name: 'Celery', category: 'Queue', level: 4 },
      { name: 'Docker', category: 'Container', level: 5 },
    ],
  },
  {
    title: 'Frontend',
    color: 'text-blue-400',
    items: [
      { name: 'React', category: 'Framework', level: 5 },
      { name: 'TypeScript', category: 'Language', level: 5 },
      { name: 'Tailwind CSS', category: 'Styling', level: 5 },
      { name: 'Framer Motion', category: 'Animation', level: 4 },
      { name: 'WebSocket', category: 'Real-time', level: 4 },
      { name: 'Recharts', category: 'Data Viz', level: 4 },
    ],
  },
  {
    title: 'DevOps / Cloud',
    color: 'text-amber-400',
    items: [
      { name: 'AWS', category: 'Cloud', level: 4 },
      { name: 'CI/CD', category: 'Pipeline', level: 4 },
      { name: 'Terraform', category: 'IaC', level: 3 },
      { name: 'Monitoring', category: 'Observability', level: 4 },
      { name: 'Git', category: 'VCS', level: 5 },
      { name: 'Linux', category: 'OS', level: 4 },
    ],
  },
];

export default function TechStack() {
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
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-surface-200 text-lg max-w-2xl mx-auto">
            Tecnologias e ferramentas utilizadas no desenvolvimento desta solução
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className={`text-lg font-semibold ${category.color} mb-4`}>{category.title}</h3>
              <div className="space-y-3">
                {category.items.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + i * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-white font-medium">{tech.name}</span>
                      <span className="text-xs text-surface-200 hidden sm:inline">{tech.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div
                          key={j}
                          className={`w-2 h-2 rounded-full ${
                            j < tech.level
                              ? 'bg-primary-400'
                              : 'bg-surface-700'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Destaques Técnicos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { emoji: '🧠', title: 'RAG com Reranking', desc: 'Pipeline com retrieval híbrido e reranking por cross-encoder' },
              { emoji: '⚡', title: 'Streaming em Tempo Real', desc: 'Respostas via WebSocket com token-by-token streaming' },
              { emoji: '📊', title: 'Semantic Caching', desc: 'Cache de embeddings similares para reduzir latência e custos' },
              { emoji: '🔒', title: 'Observabilidade', desc: 'Tracing distribuído com LangSmith e logs estruturados' },
              { emoji: '🚀', title: 'CI/CD Automatizado', desc: 'Deploy automático com testes de qualidade do RAG' },
              { emoji: '📈', title: 'Avaliação Contínua', desc: 'Métricas RAGAS para precisão, relevância e faithfulness' },
            ].map((highlight) => (
              <div key={highlight.title} className="glass-light rounded-lg p-4">
                <div className="text-xl mb-2">{highlight.emoji}</div>
                <h4 className="text-sm font-semibold text-white mb-1">{highlight.title}</h4>
                <p className="text-xs text-surface-200">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
