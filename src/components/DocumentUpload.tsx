import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';

interface DocumentUploadProps {
  onDocumentLoaded: (name: string) => void;
}

export default function DocumentUpload({ onDocumentLoaded }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [fileName, setFileName] = useState('');
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);

  const simulateProcessing = useCallback((name: string) => {
    setIsProcessing(true);
    setProcessingSteps([]);
    
    const steps = [
      '📄 Extraindo texto do documento...',
      '🔤 Tokenizando conteúdo...',
      '📦 Dividindo em chunks semânticos...',
      '🧮 Gerando embeddings vetoriais...',
      '💾 Indexando no vector store...',
      '✅ Documento pronto para consulta!',
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setProcessingSteps(prev => [...prev, step]);
        if (i === steps.length - 1) {
          setTimeout(() => {
            setIsProcessing(false);
            setProcessComplete(true);
            onDocumentLoaded(name);
          }, 800);
        }
      }, (i + 1) * 700);
    });
  }, [onDocumentLoaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      simulateProcessing(file.name);
    }
  }, [simulateProcessing]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      simulateProcessing(file.name);
    }
  }, [simulateProcessing]);

  const handleDemoFile = () => {
    setFileName('contrato_servicos_2024.docx');
    simulateProcessing('contrato_servicos_2024.docx');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Upload de <span className="gradient-text">Documento</span>
        </h1>
        <p className="text-surface-200 text-lg">
          Faça upload do seu documento Word para iniciar a análise com RAG
        </p>
      </motion.div>

      {/* Upload Area */}
      {!isProcessing && !processComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative glass rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-primary-400/50 bg-primary-500/10 scale-[1.02]' 
                : 'hover:border-primary-500/30'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ y: isDragging ? -10 : 0 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center"
              >
                <Upload className={`w-10 h-10 text-primary-400 ${isDragging ? 'scale-110' : ''} transition-transform`} />
              </motion.div>
              
              <div>
                <p className="text-xl font-semibold text-white mb-2">
                  Arraste seu documento aqui
                </p>
                <p className="text-surface-200 text-sm">
                  Suporta .docx, .doc, .pdf — até 500 páginas
                </p>
              </div>

              <label className="mt-4 cursor-pointer">
                <input
                  type="file"
                  accept=".docx,.doc,.pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl text-white font-medium transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Selecionar Arquivo
                </motion.span>
              </label>

              <div className="mt-4 flex items-center gap-2 text-sm text-surface-200">
                <span>ou</span>
                <button
                  onClick={handleDemoFile}
                  className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
                >
                  usar documento de demonstração
                </button>
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: '🔒', title: 'Seguro', desc: 'Processamento local, dados não saem do servidor' },
              { icon: '⚡', title: 'Rápido', desc: 'Chunking paralelo com processamento otimizado' },
              { icon: '🎯', title: 'Preciso', desc: 'Embeddings com modelo fine-tuned para português' },
            ].map((item) => (
              <div key={item.title} className="glass-light rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="text-white font-medium text-sm">{item.title}</h3>
                <p className="text-surface-200 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
            <h3 className="text-xl font-semibold text-white">Processando documento</h3>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 text-surface-200 text-sm mb-2">
              <FileText className="w-4 h-4" />
              <span>{fileName}</span>
            </div>
            <div className="w-full h-2 bg-surface-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'easeInOut' }}
              />
            </div>
          </div>

          <div className="space-y-2 mt-6">
            {processingSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-sm text-surface-200"
              >
                <CheckCircle className="w-4 h-4 text-accent-400 shrink-0" />
                <span>{step}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Complete State */}
      {processComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-accent-400" />
          </motion.div>
          
          <h3 className="text-xl font-semibold text-white mb-2">Documento processado com sucesso!</h3>
          <p className="text-surface-200 mb-2">{fileName}</p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 my-6">
            {[
              { label: 'Chunks', value: '47' },
              { label: 'Tokens', value: '12.4k' },
              { label: 'Embeddings', value: '47' },
              { label: 'Tempo', value: '3.2s' },
            ].map((stat) => (
              <div key={stat.label} className="glass-light rounded-lg px-4 py-2">
                <div className="text-lg font-bold text-primary-400">{stat.value}</div>
                <div className="text-xs text-surface-200">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-accent-400">
            <Sparkles className="w-4 h-4" />
            <span>Pronto para consultas via chat!</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setProcessComplete(false);
              setFileName('');
              setProcessingSteps([]);
            }}
            className="mt-6 px-6 py-2 glass rounded-lg text-surface-200 hover:text-white text-sm transition-colors"
          >
            Upload outro documento
          </motion.button>
        </motion.div>
      )}

      {/* Error hint */}
      {!isProcessing && !processComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-start gap-2 glass-light rounded-xl p-4"
        >
          <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div className="text-sm text-surface-200">
            <span className="text-yellow-400 font-medium">Demo Mode:</span> Esta é uma demonstração do frontend. 
            Em produção, o documento seria processado pelo pipeline RAG com extração real de texto, 
            chunking semântico e geração de embeddings via API.
          </div>
        </motion.div>
      )}
    </div>
  );
}
