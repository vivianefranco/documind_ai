import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, FileText, Upload, Sparkles, Copy, ThumbsUp, RotateCcw, BookOpen, SpellCheck, PenTool, MessageSquare, CheckCircle2, AlertTriangle, Lightbulb, ChevronDown } from 'lucide-react';

interface ChatInterfaceProps {
  documentName: string;
  documentLoaded: boolean;
  onUploadClick: () => void;
}

type ChatMode = 'geral' | 'abnt' | 'gramatical' | 'escrita';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: Date;
  mode: ChatMode;
  annotations?: Annotation[];
}

interface Annotation {
  type: 'error' | 'suggestion' | 'abnt';
  original: string;
  correction: string;
  explanation: string;
  page?: string;
  severity: 'high' | 'medium' | 'low';
}

const modeConfig: Record<ChatMode, { label: string; icon: typeof BookOpen; color: string; description: string }> = {
  geral: { label: 'Chat Geral', icon: MessageSquare, color: 'primary', description: 'Perguntas gerais sobre o documento' },
  abnt: { label: 'Formatação ABNT', icon: BookOpen, color: 'blue', description: 'Revisão e correção conforme normas ABNT' },
  gramatical: { label: 'Revisão Gramatical', icon: SpellCheck, color: 'emerald', description: 'Correção ortográfica e gramatical completa' },
  escrita: { label: 'Sugestões de Escrita', icon: PenTool, color: 'amber', description: 'Melhorias de estilo, clareza e coesão' },
};

const abntResponses = {
  content: `## 📋 Relatório de Formatação ABNT

### ✅ Itens Corretos
- Margens: Superior 3cm, Inferior 2cm, Esquerda 3cm, Direita 2cm ✓
- Fonte Times New Roman 12 ✓
- Espaçamento 1,5 entre linhas ✓

### ❌ Correções Necessárias (12 encontradas)

**1. Capa — NBR 14724:2011**
- ❌ Nome do autor em negrito
- ✅ Deve estar em fonte normal, caixa alta
- 📍 Página 1

**2. Folha de Rosto**
- ❌ Natureza do trabalho alinhada à esquerda
- ✅ Deve estar recuada 7cm da margem esquerda, em fonte 10
- 📍 Página 2

**3. Sumário — NBR 6027:2012**
- ❌ Seções primárias sem caixa alta
- ✅ Seções primárias devem estar em CAIXA ALTA e negrito
- ❌ Numeração sem ponto após o número
- ✅ Formato correto: "1 INTRODUÇÃO" (com espaço, sem ponto)
- 📍 Páginas 3-4

**4. Citações — NBR 10520:2023**
- ❌ Citação direta longa (4+ linhas) sem recuo de 4cm
- ✅ Deve ter recuo de 4cm, fonte 10, espaçamento simples
- ❌ Citação indireta sem (AUTOR, ano) no formato correto
- ✅ Formato: (SILVA, 2023) ou Silva (2023)
- 📍 Páginas 15, 23, 45, 67

**5. Referências — NBR 6023:2018**
- ❌ 8 referências com formatação incorreta
- ✅ SOBRENOME, Nome. **Título em negrito**: subtítulo em normal. Edição. Local: Editora, ano.
- 📍 Páginas 118-120

**6. Chamadas numéricas**
- ❌ Notas de rodapé sem numeração sequencial
- ✅ Devem ser numeradas de forma contínua do início ao fim
- 📍 Múltiplas páginas

### 📊 Resumo
| Categoria | Corretos | Erros | Total |
|-----------|----------|-------|-------|
| Capa/Folha de Rosto | 3 | 2 | 5 |
| Sumário | 1 | 3 | 4 |
| Citações | 8 | 6 | 14 |
| Referências | 12 | 8 | 20 |
| Notas | 2 | 1 | 3 |
| **Total** | **26** | **20** | **46** |`,
  sources: ['Capa (p.1)', 'Folha de Rosto (p.2)', 'Sumário (p.3-4)', 'Citações (p.15,23,45,67)', 'Referências (p.118-120)']
};

const gramaticalResponses = {
  content: `## 🔍 Revisão Gramatical Completa

### 📊 Estatísticas
- **Total de ocorrências**: 34
- **Erros graves**: 8 🔴
- **Erros moderados**: 14 🟡  
- **Sugestões leves**: 12 🟢

---

### 🔴 Erros Graves (Correção Obrigatória)

**1. Concordância Verbal**
- ❌ "Foi identificado **diversos** problemas" (p.12)
- ✅ "Foram identificados **diversos** problemas"
- 📝 O verbo deve concordar com o sujeito no plural

**2. Regência Verbal**
- ❌ "O autor **assistiu o** filme" (p.28)
- ✅ "O autor **assistiu ao** filme"
- 📝 Verbo "assistir" no sentido de "ver" exige preposição "a"

**3. Crase**
- ❌ "Foi dirigido **a** equipe" (p.35)
- ✅ "Foi dirigido **à** equipe"
- 📝 Artigo feminino "a" + preposição "a" = crase obrigatória

**4. Ortografia**
- ❌ "excessão" (p.8) → ✅ "exceção"
- ❌ "previlégio" (p.42) → ✅ "privilégio"
- ❌ "impecílio" (p.56) → ✅ "empecilho"
- ❌ "concerteza" (p.71) → ✅ "com certeza"

**5. Pontuação**
- ❌ "O projeto, que foi aprovado pela diretoria será iniciado" (p.19)
- ✅ "O projeto, que foi aprovado pela diretoria **,** será iniciado"
- 📝 Falta vírgula para fechar a oração subordinada adjetiva explicativa

---

### 🟡 Erros Moderados

**6. Placement of pronouns (próclise/ênclise)**
- ❌ "**Me parece** que os dados..." (p.5)
- ✅ "**Parece-me** que os dados..." ou "**Me parece**" (se houver atrativo)
- 📝 Em início de frase, usar ênclise na norma culta

**7. Paralelismo sintático**
- ❌ "O objetivo é **analisar** os dados, **coletar** resultados e a **avaliação** do impacto" (p.33)
- ✅ "O objetivo é **analisar** os dados, **coletar** resultados e **avaliar** o impacto"
- 📝 Manter paralelismo: todos os verbos no infinitivo

**8. Uso de "onde"**
- ❌ "**Onde** a pesquisa foi realizada em 2023..." (p.47)
- ✅ "**Em que** a pesquisa foi realizada em 2023..." ou "**Na qual**..."
- 📝 "Onde" só se refere a lugar físico

---

### 🟢 Sugestões Leves

**9. Redundâncias**
- ❌ "subir para cima" (p.11) → ✅ "subir"
- ❌ "monopólio exclusivo" (p.29) → ✅ "monopólio"
- ❌ "elo de ligação" (p.52) → ✅ "elo" ou "ligação"

**10. Pleonasmos viciosos**
- ❌ "criar novos postos de trabalho" → ✅ "criar postos de trabalho" ou "gerar novos postos"
- 📝 "Novos" + "criar" gera redundância semântica neste contexto`,
  sources: ['Página 5', 'Página 8', 'Página 12', 'Página 19', 'Página 28', 'Página 33', 'Página 35', 'Página 42', 'Página 47', 'Página 56', 'Página 71']
};

const escritaResponses = {
  content: `## ✍️ Sugestões de Escrita para o Autor

### 📊 Avaliação Geral
| Critério | Nota | Comentário |
|----------|------|------------|
| Clareza | ⭐⭐⭐⭐☆ | Bom, mas alguns trechos densos |
| Coesão | ⭐⭐⭐☆☆ | Transições entre parágrafos fracas |
| Coerência | ⭐⭐⭐⭐⭐ | Argumentação sólida |
| Vocabulário | ⭐⭐⭐⭐☆ | Rico, com poucas repetições |
| Fluidez | ⭐⭐⭐☆☆ | Alguns períodos muito longos |

---

### 🔗 Coesão Textual — Melhorar Conectivos

**Problema identificado**: Falta de conectivos entre parágrafos nos capítulos 3 e 5.

❌ **Atual** (p.34):
> "Os dados foram coletados entre janeiro e março. A amostra compreende 500 respondentes."

✅ **Sugestão**:
> "Os dados foram coletados entre janeiro e março. **Nesse contexto,** a amostra compreende 500 respondentes, **distribuídos de forma a garantir representatividade estatística.**"

📝 **Dica**: Use conectivos como "Nesse contexto", "Ademais", "Em contrapartida", "Corroborando essa análise" para ligar ideias.

---

### 📏 Períodos Longos — Simplificar

**Problema**: 7 períodos com mais de 60 palavras encontrados.

❌ **Atual** (p.22 — 78 palavras):
> "Considerando que a implementação do novo sistema de gestão requer uma análise detalhada dos processos existentes, bem como a identificação de possíveis gargalos operacionais que possam comprometer a eficiência do fluxo de trabalho, a equipe responsável pelo projeto elaborou um cronograma que prevê etapas sequenciais de avaliação."

✅ **Sugestão** (dividido em 3 frases):
> "A implementação do novo sistema de gestão requer uma análise detalhada dos processos existentes. É necessário também identificar possíveis gargalos operacionais que possam comprometer a eficiência do fluxo de trabalho. **Diante disso,** a equipe elaborou um cronograma com etapas sequenciais de avaliação."

📝 **Regra**: Prefira períodos de até 30 palavras. Cada ideia = uma frase.

---

### 🎯 Voz Ativa vs. Passiva

**Problema**: Excesso de voz passiva (42 ocorrências). A voz ativa torna o texto mais direto.

❌ **Atual** (p.15):
> "**Foi realizado** um levantamento dos dados disponíveis pela equipe."

✅ **Sugestão**:
> "**A equipe realizou** um levantamento dos dados disponíveis."

❌ **Atual** (p.38):
> "**Serão apresentados** os resultados da pesquisa."

✅ **Sugestão**:
> "**Apresentamos** os resultados da pesquisa."

---

### 📖 Variedade Lexical

**Repetições identificadas:**
| Palavra | Ocorrências | Alternativas |
|---------|-------------|--------------|
| "realizar" | 23x | executar, conduzir, efetuar, promover |
| "importante" | 18x | relevante, significativo, crucial, fundamental |
| "apresentar" | 15x | expor, demonstrar, evidenciar, mostrar |
| "obter" | 12x | alcançar, conseguir, auferir, conquistar |

---

### 💡 Sugestões de Melhoria Estrutural

1. **Introdução**: Falta uma tese clara. Sugiro adicionar no último parágrafo: *"Este trabalho demonstra que [tese central], por meio de [metodologia]."*

2. **Conclusão**: A conclusão apenas resume. Sugiro adicionar:
   - Limitações do estudo
   - Sugestões para trabalhos futuros
   - Implicações práticas dos resultados

3. **Parágrafo tópico**: Os capítulos 4 e 6 não têm frase-tópico clara no início. Cada parágrafo deveria começar com a ideia central.

4. **Dados qualitativos**: O texto é muito quantitativo. Sugiro intercalar com exemplos concretos ou citações de entrevistas para humanizar a leitura.`,
  sources: ['Capítulo 3 (p.30-40)', 'Capítulo 4 (p.41-55)', 'Capítulo 5 (p.56-70)', 'Capítulo 6 (p.71-85)']
};

export default function ChatInterface({ documentName, documentLoaded, onUploadClick }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeMode, setActiveMode] = useState<ChatMode>('geral');
  const [showModeSelector, setShowModeSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (userMessage: string, mode: ChatMode) => {
    switch (mode) {
      case 'abnt':
        return abntResponses;
      case 'gramatical':
        return gramaticalResponses;
      case 'escrita':
        return escritaResponses;
      default:
        return {
          content: 'Com base na análise do documento, identifiquei os seguintes pontos relevantes:\n\n1. **Estrutura**: 12 seções principais com subdivisões claras.\n2. **Consistência**: 3 termos usados de forma inconsistente.\n3. **Fluxo**: Progressão lógica bem construída.\n4. **Referências**: 2 referências internas incorretas.',
          sources: ['Página 12-15', 'Página 34-38']
        };
    }
  };

  const suggestedQuestions: Record<ChatMode, string[]> = {
    geral: [
      'Faça um resumo do documento',
      'Quais os pontos principais?',
      'Existe alguma inconsistência?',
    ],
    abnt: [
      'Verificar formatação ABNT completa',
      'Conferir citações e referências',
      'Revisar capa e folha de rosto',
      'Verificar sumário e paginação',
    ],
    gramatical: [
      'Revisão gramatical completa',
      'Verificar concordância verbal',
      'Checar uso de crase',
      'Encontrar erros ortográficos',
    ],
    escrita: [
      'Sugestões de melhoria de escrita',
      'Analisar coesão e coerência',
      'Simplificar textos longos',
      'Sugerir melhor vocabulário',
    ],
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      mode: activeMode,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(userMessage.content, activeMode);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        sources: response.sources,
        timestamp: new Date(),
        mode: activeMode,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1800 + Math.random() * 1200);
  };

  const handleQuickAction = (question: string) => {
    setInput(question);
  };

  const handleModeAnalysis = (mode: ChatMode) => {
    setActiveMode(mode);
    const quickPrompts: Record<ChatMode, string> = {
      geral: 'Analise o documento e apresente os pontos principais.',
      abnt: 'Realize a verificação completa de formatação ABNT.',
      gramatical: 'Execute a revisão gramatical completa do documento.',
      escrita: 'Analise a qualidade da escrita e sugira melhorias.',
    };
    setInput(quickPrompts[mode]);
  };

  if (!documentLoaded) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Nenhum documento carregado</h2>
          <p className="text-surface-200 mb-6">
            Faça upload de um documento para iniciar a revisão ABNT, gramatical e de escrita.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUploadClick}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl text-white font-medium inline-flex items-center gap-2 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Documento
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const currentMode = modeConfig[activeMode];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Revisor <span className="gradient-text">Inteligente</span>
        </h1>
        <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2">
          <FileText className="w-4 h-4 text-primary-400" />
          <span className="text-sm text-surface-200">{documentName}</span>
          <span className="w-2 h-2 rounded-full bg-accent-400 pulse-dot" />
        </div>
      </motion.div>

      {/* Mode Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
      >
        {(Object.entries(modeConfig) as [ChatMode, typeof modeConfig[ChatMode]][]).map(([key, config]) => {
          const Icon = config.icon;
          const isActive = activeMode === key;
          return (
            <motion.button
              key={key}
              onClick={() => setActiveMode(key)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl text-left transition-all duration-200 ${
                isActive
                  ? 'glass glow-primary border-primary-500/30'
                  : 'glass-light hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${
                  isActive ? 'text-primary-400' : 'text-surface-200'
                }`} />
                <span className={`text-xs font-semibold ${
                  isActive ? 'text-primary-300' : 'text-surface-200'
                }`}>{config.label}</span>
              </div>
              <p className="text-[11px] text-surface-200 leading-tight">{config.description}</p>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-2 mb-4"
      >
        {suggestedQuestions[activeMode].map((q) => (
          <motion.button
            key={q}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleQuickAction(q)}
            className="px-3 py-1.5 glass-light rounded-lg text-xs text-surface-200 hover:text-white transition-colors"
          >
            {q}
          </motion.button>
        ))}
      </motion.div>

      {/* Chat Container */}
      <div className="glass rounded-2xl overflow-hidden flex flex-col" style={{ height: '55vh', minHeight: '400px' }}>
        {/* Mode indicator bar */}
        <div className={`px-4 py-2 border-b border-primary-500/10 flex items-center gap-2 ${
          activeMode === 'abnt' ? 'bg-blue-500/5' :
          activeMode === 'gramatical' ? 'bg-emerald-500/5' :
          activeMode === 'escrita' ? 'bg-amber-500/5' : 'bg-primary-500/5'
        }`}>
          <currentMode.icon className={`w-4 h-4 ${
            activeMode === 'abnt' ? 'text-blue-400' :
            activeMode === 'gramatical' ? 'text-emerald-400' :
            activeMode === 'escrita' ? 'text-amber-400' : 'text-primary-400'
          }`} />
          <span className="text-xs font-medium text-surface-200">
            Modo: <span className="text-white">{currentMode.label}</span>
          </span>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="ml-auto text-xs text-surface-200 hover:text-white transition-colors"
            >
              Limpar conversa
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                activeMode === 'abnt' ? 'bg-blue-500/20' :
                activeMode === 'gramatical' ? 'bg-emerald-500/20' :
                activeMode === 'escrita' ? 'bg-amber-500/20' : 'bg-primary-500/20'
              }`}>
                <currentMode.icon className={`w-7 h-7 ${
                  activeMode === 'abnt' ? 'text-blue-400' :
                  activeMode === 'gramatical' ? 'text-emerald-400' :
                  activeMode === 'escrita' ? 'text-amber-400' : 'text-primary-400'
                }`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{currentMode.label}</h3>
              <p className="text-sm text-surface-200 max-w-md mb-6">{currentMode.description}</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {suggestedQuestions[activeMode].map((q) => (
                  <motion.button
                    key={q}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleQuickAction(q)}
                    className="px-3 py-2 glass-light rounded-lg text-xs text-surface-200 hover:text-white transition-colors"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === 'user' 
                    ? 'bg-primary-500/20' 
                    : msg.mode === 'abnt' ? 'bg-blue-500/20' :
                      msg.mode === 'gramatical' ? 'bg-emerald-500/20' :
                      msg.mode === 'escrita' ? 'bg-amber-500/20' : 'bg-accent-500/20'
                }`}>
                  {msg.role === 'user' 
                    ? <User className="w-4 h-4 text-primary-400" />
                    : <Bot className={`w-4 h-4 ${
                        msg.mode === 'abnt' ? 'text-blue-400' :
                        msg.mode === 'gramatical' ? 'text-emerald-400' :
                        msg.mode === 'escrita' ? 'text-amber-400' : 'text-accent-400'
                      }`} />
                  }
                </div>
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-600/30 text-white border border-primary-500/20'
                      : 'glass-light text-surface-100'
                  }`}>
                    <div className="whitespace-pre-wrap prose prose-sm prose-invert max-w-none">
                      {msg.content}
                    </div>
                  </div>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {msg.sources.map((source, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary-500/10 text-primary-300 text-xs border border-primary-500/20">
                          <FileText className="w-3 h-3" />
                          {source}
                        </span>
                      ))}
                    </div>
                  )}

                  {msg.role === 'assistant' && (
                    <div className="mt-2 flex items-center gap-2">
                      <button className="p-1 rounded hover:bg-white/5 text-surface-200 hover:text-white transition-colors" title="Copiar">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded hover:bg-white/5 text-surface-200 hover:text-white transition-colors" title="Útil">
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded hover:bg-white/5 text-surface-200 hover:text-white transition-colors" title="Regenerar">
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                activeMode === 'abnt' ? 'bg-blue-500/20' :
                activeMode === 'gramatical' ? 'bg-emerald-500/20' :
                activeMode === 'escrita' ? 'bg-amber-500/20' : 'bg-accent-500/20'
              }`}>
                <Bot className={`w-4 h-4 ${
                  activeMode === 'abnt' ? 'text-blue-400' :
                  activeMode === 'gramatical' ? 'text-emerald-400' :
                  activeMode === 'escrita' ? 'text-amber-400' : 'text-accent-400'
                }`} />
              </div>
              <div className="glass-light rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary-400 pulse-dot" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-400 pulse-dot" style={{ animationDelay: '0.3s' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-400 pulse-dot" style={{ animationDelay: '0.6s' }} />
                  </div>
                  <span className="text-xs text-surface-200">Analisando documento...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-primary-500/10 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                activeMode === 'abnt' ? 'Pergunte sobre formatação ABNT...' :
                activeMode === 'gramatical' ? 'Pergunte sobre gramática e ortografia...' :
                activeMode === 'escrita' ? 'Peça sugestões de escrita...' :
                'Pergunte algo sobre o documento...'
              }
              className="flex-1 bg-surface-800/50 border border-surface-700 rounded-xl px-4 py-3 text-white placeholder-surface-200 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-3 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 rounded-xl text-white transition-colors"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
