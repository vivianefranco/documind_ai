import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Clock, Target, Database, Activity, Zap } from 'lucide-react';

const retrievalData = [
  { name: 'Seg', queries: 45, accuracy: 94 },
  { name: 'Ter', queries: 52, accuracy: 96 },
  { name: 'Qua', queries: 38, accuracy: 92 },
  { name: 'Qui', queries: 65, accuracy: 97 },
  { name: 'Sex', queries: 58, accuracy: 95 },
  { name: 'Sáb', queries: 22, accuracy: 93 },
  { name: 'Dom', queries: 15, accuracy: 91 },
];

const latencyData = [
  { name: '0s', value: 0 },
  { name: '0.5s', value: 15 },
  { name: '1s', value: 45 },
  { name: '1.5s', value: 78 },
  { name: '2s', value: 92 },
  { name: '2.5s', value: 98 },
  { name: '3s', value: 100 },
];

const performanceData = [
  { subject: 'Precisão', A: 96 },
  { subject: 'Velocidade', A: 88 },
  { subject: 'Contexto', A: 92 },
  { subject: 'Relevância', A: 94 },
  { subject: 'Cobertura', A: 89 },
  { subject: 'Consistência', A: 91 },
];

const chunkDistribution = [
  { range: '0-200', count: 5 },
  { range: '200-500', count: 18 },
  { range: '500-800', count: 15 },
  { range: '800-1000', count: 7 },
  { range: '1000+', count: 2 },
];

export default function Dashboard() {
  const stats = [
    { icon: Activity, label: 'Queries Hoje', value: '127', change: '+12%', color: 'text-primary-400' },
    { icon: Clock, label: 'Latência Média', value: '1.8s', change: '-0.3s', color: 'text-accent-400' },
    { icon: Target, label: 'Precisão Retrieval', value: '94.2%', change: '+2.1%', color: 'text-blue-400' },
    { icon: Database, label: 'Chunks Indexados', value: '1,247', change: '+89', color: 'text-purple-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          <span className="gradient-text">Dashboard</span> de Performance
        </h1>
        <p className="text-surface-200 text-lg">
          Métricas em tempo real do sistema RAG
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-xs text-accent-400 font-medium">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-surface-200">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Queries & Accuracy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary-400" />
            <h3 className="text-sm font-semibold text-white">Queries & Precisão Semanal</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={retrievalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f8fafc' }}
              />
              <Bar dataKey="queries" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Latency Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-accent-400" />
            <h3 className="text-sm font-semibold text-white">Distribuição de Latência</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Performance do Sistema</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
              <PolarRadiusAxis stroke="#334155" fontSize={10} />
              <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Chunk Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Distribuição de Chunks (tokens)</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chunkDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="range" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f8fafc' }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-white mb-4">Atividade Recente</h3>
        <div className="space-y-3">
          {[
            { time: '2 min', action: 'Query processada', detail: '"Revisar capítulo 3"', latency: '1.4s', status: 'success' },
            { time: '5 min', action: 'Documento indexado', detail: 'relatorio_anual_2024.docx', latency: '3.2s', status: 'success' },
            { time: '12 min', action: 'Query processada', detail: '"Resumo executivo"', latency: '1.8s', status: 'success' },
            { time: '18 min', action: 'Retrieval fallback', detail: 'Hybrid search ativado', latency: '2.4s', status: 'warning' },
            { time: '25 min', action: 'Query processada', detail: '"Encontrar inconsistências"', latency: '2.1s', status: 'success' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4 glass-light rounded-lg p-3">
              <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-accent-400' : 'bg-yellow-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate">{activity.action}</div>
                <div className="text-xs text-surface-200 truncate">{activity.detail}</div>
              </div>
              <div className="text-xs text-surface-200 shrink-0">{activity.latency}</div>
              <div className="text-xs text-surface-200 shrink-0">{activity.time} atrás</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
