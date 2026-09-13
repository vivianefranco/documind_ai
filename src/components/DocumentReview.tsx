import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle2, AlertTriangle, Lightbulb, X, ChevronRight, BookOpen, SpellCheck, PenTool, Download, Filter } from 'lucide-react';

type FilterType = 'all' | 'abnt' | 'gramatical' | 'escrita';
type SeverityFilter = 'all' | 'high' | 'medium' | 'low';

interface ReviewItem {
  id: number;
  type: 'abnt' | 'gramatical' | 'escrita';
  severity: 'high' | 'medium' | 'low';
  page: string;
  section: string;
  original: string;
  correction: string;
  explanation: string;
  accepted: boolean;
}

const reviewItems: ReviewItem[] = [
  {
    id: 1,
    type: 'gramatical',
    severity: 'high',
    page: '12',
    section: 'Capítulo 2 — Metodologia',
    original: 'Foi identificado diversos problemas na amostra coletada.',
    correction: 'Foram identificados diversos problemas na amostra coletada.',
    explanation: 'Erro de concordância verbal. O sujeito "diversos problemas" está no plural, então o verbo deve concordar: "Foram identificados".',
    accepted: false,
  },
  {
    id: 2,
    type: 'abnt',
    severity: 'high',
    page: '1',
    section: 'Capa',
    original: 'Nome do autor em **negrito**',
    correction: 'Nome do autor em fonte normal, caixa alta',
    explanation: 'Conforme NBR 14724:2011, o nome do autor na capa deve estar em fonte normal (sem negrito), em caixa alta, centralizado.',
    accepted: false,
  },
  {
    id: 3,
    type: 'gramatical',
    severity: 'high',
    page: '35',
    section: 'Capítulo 4 — Resultados',
    original: 'O relatório foi dirigido a equipe de análise.',
    correction: 'O relatório foi dirigido à equipe de análise.',
    explanation: 'Crase obrigatória: o verbo "dirigir" exige a preposição "a", e "equipe" é um substantivo feminino que aceita o artigo "a". A fusão dos dois "a" resulta em crase.',
    accepted: false,
  },
  {
    id: 4,
    type: 'escrita',
    severity: 'medium',
    page: '22',
    section: 'Capítulo 3 — Fundamentação',
    original: 'Considerando que a implementação do novo sistema de gestão requer uma análise detalhada dos processos existentes, bem como a identificação de possíveis gargalos operacionais que possam comprometer a eficiência do fluxo de trabalho, a equipe responsável pelo projeto elaborou um cronograma que prevê etapas sequenciais de avaliação.',
    correction: 'A implementação do novo sistema de gestão requer uma análise detalhada dos processos existentes. É necessário também identificar possíveis gargalos operacionais que possam comprometer a eficiência do fluxo de trabalho. Diante disso, a equipe elaborou um cronograma com etapas sequenciais de avaliação.',
    explanation: 'Período com 78 palavras — muito longo para leitura confortável. Dividir em frases menores (máx. 30 palavras) melhora a clareza e a fluidez.',
    accepted: false,
  },
  {
    id: 5,
    type: 'gramatical',
    severity: 'medium',
    page: '5',
    section: 'Capítulo 1 — Introdução',
    original: 'Me parece que os dados são consistentes.',
    correction: 'Parece-me que os dados são consistentes.',
    explanation: 'Em início de frase, a norma culta exige ênclise (pronome depois do verbo). Próclise só é aceita quando há palavra atrativa antes do verbo.',
    accepted: false,
  },
  {
    id: 6,
    type: 'escrita',
    severity: 'medium',
    page: '34',
    section: 'Capítulo 4 — Resultados',
    original: 'Os dados foram coletados entre janeiro e março. A amostra compreende 500 respondentes.',
    correction: 'Os dados foram coletados entre janeiro e março. Nesse contexto, a amostra compreende 500 respondentes, distribuídos de forma a garantir representatividade.',
    explanation: 'Falta conectivo entre os parágrafos. Usar "Nesse contexto", "Ademais" ou "Corroborando essa análise" melhora a coesão textual.',
    accepted: false,
  },
  {
    id: 7,
    type: 'abnt',
    severity: 'medium',
    page: '15',
    section: 'Capítulo 2 — Citações',
    original: 'Segundo Silva (2023, p. 45), "o processo de inovação requer investimentos contínuos em pesquisa e desenvolvimento".',
    correction: 'Recuo de 4cm, fonte 10, espaçamento simples para citação direta longa.',
    explanation: 'Citação direta com mais de 3 linhas deve ter formatação especial: recuo de 4cm da margem esquerda, fonte tamanho 10, espaçamento simples, sem aspas. (NBR 10520:2023)',
    accepted: false,
  },
  {
    id: 8,
    type: 'gramatical',
    severity: 'high',
    page: '8',
    section: 'Capítulo 1 — Introdução',
    original: 'A excessão confirmou a regra estabelecida.',
    correction: 'A exceção confirmou a regra estabelecida.',
    explanation: 'Erro ortográfico: "exceção" se escreve com "ç", não com "ss".',
    accepted: false,
  },
  {
    id: 9,
    type: 'escrita',
    severity: 'low',
    page: '11',
    section: 'Capítulo 2 — Metodologia',
    original: 'Os pesquisadores pretendem subir para cima do palco para apresentar os dados.',
    correction: 'Os pesquisadores pretendem subir ao palco para apresentar os dados.',
    explanation: '"Subir para cima" é pleonasmo vicioso. "Subir" já indica movimento ascendente.',
    accepted: false,
  },
  {
    id: 10,
    type: 'abnt',
    severity: 'medium',
    page: '118',
    section: 'Referências',
    original: 'silva, joão. O processo de inovação nas empresas brasileiras. São Paulo: Atlas, 2023.',
    correction: 'SILVA, João. **O processo de inovação nas empresas brasileiras**. São Paulo: Atlas, 2023.',
    explanation: 'Conforme NBR 6023:2018: SOBRENOME em caixa alta, nome normal, título em negrito. Elementos obrigatórios: autor, título em negrito, local, editora, ano.',
    accepted: false,
  },
  {
    id: 11,
    type: 'gramatical',
    severity: 'medium',
    page: '47',
    section: 'Capítulo 5 — Discussão',
    original: 'Onde a pesquisa foi realizada em 2023 com participantes voluntários.',
    correction: 'Em que a pesquisa foi realizada em 2023 com participantes voluntários.',
    explanation: '"Onde" só deve ser usado para referir-se a lugar físico. Para outros contextos, usar "em que", "no qual" ou "na qual".',
    accepted: false,
  },
  {
    id: 12,
    type: 'escrita',
    severity: 'low',
    page: '29',
    section: 'Capítulo 3 — Fundamentação',
    original: 'A empresa possui um monopólio exclusivo no mercado regional.',
    correction: 'A empresa possui um monopólio no mercado regional.',
    explanation: '"Monopólio exclusivo" é redundante. Monopólio já implica exclusividade por definição.',
    accepted: false,
  },
];

export default function DocumentReview() {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);
  const [items, setItems] = useState(reviewItems);

  const filteredItems = items.filter(item => {
    const typeMatch = typeFilter === 'all' || item.type === typeFilter;
    const severityMatch = severityFilter === 'all' || item.severity === severityFilter;
    return typeMatch && severityMatch;
  });

  const acceptItem = (id: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, accepted: true } : item
    ));
  };

  const rejectItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const stats = {
    total: items.length,
    abnt: items.filter(i => i.type === 'abnt').length,
    gramatical: items.filter(i => i.type === 'gramatical').length,
    escrita: items.filter(i => i.type === 'escrita').length,
    high: items.filter(i => i.severity === 'high').length,
    medium: items.filter(i => i.severity === 'medium').length,
    low: items.filter(i => i.severity === 'low').length,
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'abnt': return BookOpen;
      case 'gramatical': return SpellCheck;
      case 'escrita': return PenTool;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'abnt': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'gramatical': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'escrita': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      default: return 'text-surface-200 bg-surface-700/50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-surface-700 text-surface-200';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return 'Grave';
      case 'medium': return 'Moderado';
      case 'low': return 'Leve';
      default: return severity;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Revisão do <span className="gradient-text">Documento</span>
        </h1>
        <p className="text-surface-200 text-lg">
          Análise completa com anotações visuais — ABNT, gramática e escrita
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6"
      >
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-white">{stats.total}</div>
          <div className="text-xs text-surface-200">Total</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-blue-400">{stats.abnt}</div>
          <div className="text-xs text-surface-200">ABNT</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-emerald-400">{stats.gramatical}</div>
          <div className="text-xs text-surface-200">Gramática</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-amber-400">{stats.escrita}</div>
          <div className="text-xs text-surface-200">Escrita</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-red-400">{stats.high}</div>
          <div className="text-xs text-surface-200">Graves</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-yellow-400">{stats.medium}</div>
          <div className="text-xs text-surface-200">Moderados</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-green-400">{stats.low}</div>
          <div className="text-xs text-surface-200">Leves</div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-3 mb-6"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-surface-200" />
          <span className="text-sm text-surface-200">Filtros:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'abnt', 'gramatical', 'escrita'] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                typeFilter === type
                  ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                  : 'glass-light text-surface-200 hover:text-white'
              }`}
            >
              {type === 'all' ? 'Todos' : type === 'abnt' ? 'ABNT' : type === 'gramatical' ? 'Gramática' : 'Escrita'}
            </button>
          ))}
        </div>
        <div className="h-4 w-px bg-surface-700 mx-1" />
        <div className="flex flex-wrap gap-2">
          {(['all', 'high', 'medium', 'low'] as SeverityFilter[]).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                severityFilter === sev
                  ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                  : 'glass-light text-surface-200 hover:text-white'
              }`}
            >
              {sev === 'all' ? 'Todas' : getSeverityLabel(sev)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Review Items List */}
        <div className="lg:col-span-3 space-y-3">
          {filteredItems.map((item, i) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className={`glass rounded-xl p-4 cursor-pointer transition-all hover:border-primary-500/30 ${
                  selectedItem?.id === item.id ? 'border-primary-500/30 glow-primary' : ''
                } ${item.accepted ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${getTypeColor(item.type)}`}>
                    <TypeIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getSeverityColor(item.severity)}`}>
                        {getSeverityLabel(item.severity)}
                      </span>
                      <span className="text-xs text-surface-200">p. {item.page}</span>
                      <span className="text-xs text-surface-200">— {item.section}</span>
                    </div>
                    <p className="text-sm text-white/80 line-clamp-2">
                      <span className="text-red-400/80 line-through">{item.original.substring(0, 60)}...</span>
                    </p>
                    <p className="text-sm text-accent-400/80 mt-1 line-clamp-1">
                      → {item.correction.substring(0, 80)}...
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-surface-200 shrink-0 mt-1" />
                </div>
              </motion.div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="glass rounded-xl p-8 text-center">
              <p className="text-surface-200">Nenhuma ocorrência encontrada com os filtros selecionados.</p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass rounded-xl p-5 sticky top-24"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = getTypeIcon(selectedItem.type);
                      return <Icon className={`w-5 h-5 ${
                        selectedItem.type === 'abnt' ? 'text-blue-400' :
                        selectedItem.type === 'gramatical' ? 'text-emerald-400' : 'text-amber-400'
                      }`} />;
                    })()}
                    <span className="text-sm font-semibold text-white">
                      Página {selectedItem.page}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1 rounded hover:bg-white/5 text-surface-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Original */}
                  <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-xs font-semibold text-red-400">Original</span>
                    </div>
                    <p className="text-sm text-red-200/80 line-through decoration-red-400/50">
                      {selectedItem.original}
                    </p>
                  </div>

                  {/* Correction */}
                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-400">Correção</span>
                    </div>
                    <p className="text-sm text-emerald-200/80">
                      {selectedItem.correction}
                    </p>
                  </div>

                  {/* Explanation */}
                  <div className="rounded-lg bg-primary-500/5 border border-primary-500/20 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-3.5 h-3.5 text-primary-400" />
                      <span className="text-xs font-semibold text-primary-400">Explicação</span>
                    </div>
                    <p className="text-sm text-surface-200 leading-relaxed">
                      {selectedItem.explanation}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        acceptItem(selectedItem.id);
                        setSelectedItem(null);
                      }}
                      className="flex-1 px-4 py-2 bg-accent-500/20 border border-accent-500/30 rounded-lg text-accent-400 text-sm font-medium hover:bg-accent-500/30 transition-colors"
                    >
                      ✓ Aceitar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        rejectItem(selectedItem.id);
                        setSelectedItem(null);
                      }}
                      className="flex-1 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                    >
                      ✗ Rejeitar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-xl p-8 text-center sticky top-24"
              >
                <FileText className="w-10 h-10 text-surface-700 mx-auto mb-3" />
                <p className="text-sm text-surface-200">
                  Clique em uma ocorrência para ver os detalhes da revisão
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Export Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl text-white font-medium inline-flex items-center gap-2 shadow-lg shadow-primary-500/25"
        >
          <Download className="w-4 h-4" />
          Exportar Relatório de Revisão (PDF)
        </motion.button>
      </motion.div>
    </div>
  );
}
