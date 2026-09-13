import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-primary-500/10 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold gradient-text mb-3">DocuMind AI</h3>
            <p className="text-sm text-surface-200 leading-relaxed">
              Sistema RAG para revisão inteligente de documentos longos. 
              Construído com as melhores práticas de engenharia de IA.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Projeto</h4>
            <ul className="space-y-2 text-sm text-surface-200">
              <li><span className="hover:text-primary-400 cursor-pointer transition-colors">Arquitetura RAG</span></li>
              <li><span className="hover:text-primary-400 cursor-pointer transition-colors">Pipeline de Dados</span></li>
              <li><span className="hover:text-primary-400 cursor-pointer transition-colors">Avaliação & Métricas</span></li>
              <li><span className="hover:text-primary-400 cursor-pointer transition-colors">Deploy & Infra</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contato</h4>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-surface-200 hover:text-primary-400 transition-colors"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-surface-200 hover:text-primary-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-surface-200 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
            <p className="text-xs text-surface-200 mt-3">
              Disponível para oportunidades e colaborações
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-200 flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> usando React, TypeScript & Tailwind CSS
          </p>
          <p className="text-xs text-surface-200">
            © 2024 DocuMind AI — Portfólio Tech
          </p>
        </div>
      </div>
    </footer>
  );
}
