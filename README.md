# 📄 DocuMind AI

**Revisor gramatical inteligente para documentos corporativos e acadêmicos**

Uma aplicação que utiliza IA (Qwen 3.7 Plus) para revisar documentos Word (.docx), 
corrigindo gramática, melhorando clareza e coesão, enquanto preserva a formatação original.

## 🚀 Demo ao Vivo

## 🚀 Demo ao Vivo

A aplicação está hospedada gratuitamente no **Streamlit Community Cloud**. Teste agora mesmo:

🔗 **[DocuMind AI no Streamlit](https://documindai-qwen.streamlit.app/)**

*(Você precisará de uma API Key gratuita do DashScope. Veja as instruções abaixo).*

---

## 🔑 Como Obter sua API Key do Qwen (Gratuito)

Para usar a aplicação, você precisará de uma chave de API do DashScope (plataforma de IA da Alibaba Cloud), que oferece um plano gratuito generoso para novos usuários.

1. Acesse o console do DashScope: [https://dashscope.console.aliyun.com/apiKey](https://dashscope.console.aliyun.com/apiKey)
2. Faça login ou crie uma conta gratuita (você pode usar sua conta do GitHub, Google ou e-mail).
3. Clique em **"Create API Key"** (ou "Create new API key").
4. Dê um nome à sua chave (ex: "DocuMind AI") e confirme a criação.
5. **Copie a chave gerada** (ela começa com `sk-`). ⚠️ *Atenção: ela só é exibida uma vez na tela!*
6. Cole esta chave no campo "DashScope API Key" na barra lateral esquerda da aplicação.

💡 **Dica:** Novos usuários geralmente recebem créditos gratuitos (ex: 1 milhão de tokens) válidos por alguns meses, o que é mais do que suficiente para revisar vários documentos.

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
