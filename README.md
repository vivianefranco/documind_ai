# 📄 DocuMind AI

**Revisor gramatical inteligente para documentos corporativos e acadêmicos**

Uma aplicação que utiliza IA (Qwen 3.7 Plus) para revisar documentos Word (.docx), 
corrigindo gramática, melhorando clareza e coesão, enquanto preserva a formatação original.

## 🚀 Demo ao Vivo

Teste a aplicação: **[DocuMind AI no Hugging Face](https://huggingface.co/spaces/vivianefranco/documind-ai)**

*(Você precisará de uma API Key gratuita do DashScope - [obtenha aqui](https://dashscope.console.aliyun.com/apiKey))*

## ✨ Funcionalidades

- ✅ Revisão gramatical e ortográfica automática
- ✅ Melhoria de clareza, coesão e estilo
- ✅ Preservação completa da formatação do Word
- ✅ Suporte a documentos longos (processamento em chunks)
- ✅ Interface simples e intuitiva
- ✅ Powered by Qwen 3.7 Plus (Alibaba Cloud)

## 🛠️ Tecnologias

- **Backend**: Python + Streamlit
- **IA**: Qwen 3.7 Plus via DashScope API
- **Processamento**: python-docx
- **API**: OpenAI-compatible endpoint

## 📦 Como Rodar Localmente

### Pré-requisitos
- Python 3.8+
- Conta no DashScope (https://dashscope.aliyun.com)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/vivianefranco/documind_ai.git
cd documind_ai/backend

# Instale as dependências
pip install -r requirements.txt

# Execute a aplicação
streamlit run app.py