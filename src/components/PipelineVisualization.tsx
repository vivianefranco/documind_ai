import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Scissors, Cpu, Database, Search, MessageSquare, ArrowRight, Layers, Zap } from 'lucide-react';

const pipelineSteps = [
  {
    id: 'ingestion',
    icon: FileText,
    title: 'Ingestão',
    subtitle: 'Document Loading',
    description: 'Extração de texto de documentos Word (.docx) preservando estrutura, tabelas e formatação.',
    details: [
      'Parsing de XML interno do .docx',
      'Extração de metadados (autor, data, revisões)',
      'Preservação de hierarquia de headings',
      'Tratamento de tabelas e listas',
    ],
    tech: 'python-docx, Apache Tika, Unstructured',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'chunking',
    icon: Scissors,
    title: 'Chunking',
    subtitle: 'Semantic Splitting',
    description: 'Divisão inteligente do texto em chunks semânticos que preservam contexto.',
    details: [
      'Split por parágrafos e seções lógicas',
      'Overlap de 10-15% entre chunks',
      'Tamanho adaptativo (500-1000 tokens)',
      'Preservação de contexto de headers',
    ],
    tech: 'LangChain TextSplitter, Custom Semantic Splitter',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'embedding',
    icon: Cpu,
    title: 'Embeddings',
    subtitle: 'Vector Encoding',
    description: 'Conversão de cada chunk em vetor de alta dimensionalidade para busca semântica.',
    details: [
      'Modelo: text-embedding-3-large (OpenAI)',
      'Dimensão: 3072 features por chunk',
      'Normalização L2 para cosine similarity',
      'Batch processing para eficiência',
    ],
    tech: 'OpenAI Embeddings, Sentence Transformers, HuggingFace',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'storage',
    icon: Database,
    title: 'Vector Store',
    subtitle: 'Index & Storage',
    description: 'Armazenamento dos vetores em banco vetorial otimizado para busca por similaridade.',
    details: [
      'Índice HNSW para busca O(log n)',
      'Metadados associados a cada vetor',
      'Particionamento por documento',
      'Cache de resultados frequentes',
    ],
    tech: 'Pinecone, ChromaDB, pgvector, FAISS',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'retrieval',
    icon: Search,
    title: 'Retrieval',
    subtitle: 'Context Fetching',
    description: 'Busca dos chunks mais relevantes para a query do usuário usando similaridade vetorial.',
    details: [
      'Top-K retrieval com reranking',
      'Hybrid search (vetorial + BM25)',
      'Filtro por metadata e relevância',
      'Context window management',
    ],
    tech: 'Cohere Rerank, Cross-Encoder, BM25',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'generation',
    icon: MessageSquare,
    title: 'Generation',
    subtitle: 'LLM Response',
    description: 'Geração da resposta contextual usando LLM com o contexto recuperado como prompt.',
    details: [
      'Prompt engineering com chain-of-thought',
      'Context injection com source attribution',
      'Temperature tuning para consistência',
      'Streaming de resposta em tempo real',
    ],
    tech: 'GPT-4o, Claude 3.5, LangChain LCEL',
    color: 'from-rose-500 to-rose-600',
  },
];

export default function PipelineVisualization() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Pipeline <span className="gradient-text">RAG</span>
        </h1>
        <p className="text-surface-200 text-lg max-w-2xl mx-auto">
          Visualização interativa do pipeline de Retrieval-Augmented Generation. 
          Clique em cada etapa para ver os detalhes técnicos.
        </p>
      </motion.div>

      {/* Pipeline Flow */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {pipelineSteps.map((step, i) => (
          <motion.button
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActiveStep(i)}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-4 rounded-xl text-center transition-all duration-300 ${
              activeStep === i
                ? 'glass glow-primary border-primary-500/30'
                : 'glass-light hover:bg-white/5'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-2 opacity-80`}>
              <step.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs font-semibold text-white">{step.title}</div>
            <div className="text-[10px] text-surface-200 mt-0.5">{step.subtitle}</div>
            
            {/* Connector arrow */}
            {i < pipelineSteps.length - 1 && (
              <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="w-4 h-4 text-primary-500/50" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Detail Panel */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-2xl p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pipelineSteps[activeStep].color} flex items-center justify-center`}>
                {(() => {
                  const Icon = pipelineSteps[activeStep].icon;
                  return <Icon className="w-6 h-6 text-white" />;
                })()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{pipelineSteps[activeStep].title}</h3>
                <p className="text-sm text-primary-400">{pipelineSteps[activeStep].subtitle}</p>
              </div>
            </div>
            
            <p className="text-surface-200 leading-relaxed mb-6">
              {pipelineSteps[activeStep].description}
            </p>

            <div className="glass-light rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium text-white">Tecnologias</span>
              </div>
              <p className="text-sm text-surface-200">{pipelineSteps[activeStep].tech}</p>
            </div>
          </div>

          {/* Right - Technical Details */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-accent-400" />
              <span className="text-sm font-medium text-white">Detalhes Técnicos</span>
            </div>
            
            <div className="space-y-3">
              {pipelineSteps[activeStep].details.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 glass-light rounded-lg p-3"
                >
                  <div className="w-6 h-6 rounded-md bg-primary-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary-400">{i + 1}</span>
                  </div>
                  <span className="text-sm text-surface-200">{detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Data Flow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Fluxo de Dados</h3>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          {[
            { label: 'Word (.docx)', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
            { label: '→' },
            { label: 'Raw Text', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
            { label: '→' },
            { label: 'Chunks (47)', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
            { label: '→' },
            { label: 'Vectors (3072d)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
            { label: '→' },
            { label: 'Index (HNSW)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
            { label: '→' },
            { label: 'Top-K Results', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
            { label: '→' },
            { label: 'LLM Response', color: 'bg-primary-500/20 text-primary-300 border-primary-500/30' },
          ].map((item, i) => (
            item.label === '→' ? (
              <span key={i} className="text-surface-200">→</span>
            ) : (
              <span key={i} className={`px-2 py-1 rounded-md border ${item.color}`}>
                {item.label}
              </span>
            )
          ))}
        </div>
      </motion.div>
    </div>
  );
}
