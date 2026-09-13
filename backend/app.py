import streamlit as st
from docx import Document
from openai import OpenAI
import io
import time

# Configuração da página
st.set_page_config(page_title="DocuMind AI", page_icon="", layout="centered")

st.title("📄 DocuMind AI")
st.markdown("""
Revisor gramatical e de estilo para documentos corporativos e acadêmicos.
Powered by **Qwen 3.7 Plus** (Alibaba Cloud).
""")

# Sidebar para configurações
with st.sidebar:
    st.header("⚙️ Configurações")
    api_key = st.text_input(
        "DashScope API Key", 
        type="password",
        help="Cole sua API Key (sk-ws-...)"
    )
    st.markdown("---")
    st.info("💡 Modelo: **qwen3.7-plus** | 1M tokens grátis até 12/12/2026")

# Endpoint específico do workspace
BASE_URL = "https://ws-ywlgpvn6opdqhhhp.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1"

def revisar_texto(client, texto):
    """Revisa o texto usando Qwen 3.7 Plus"""
    prompt = f"""Você é um revisor profissional de textos corporativos e acadêmicos em português do Brasil.
Sua tarefa é revisar o texto abaixo, corrigindo gramática, ortografia, pontuação e melhorando a clareza e coesão.

REGRAS ESTRICTAS:
1. Responda APENAS com o texto revisado. Não diga "Aqui está", "Claro", ou qualquer outra coisa.
2. Mantenha a estrutura de parágrafos e quebras de linha exatamente como no original.
3. Não remova formatação implícita (como títulos ou listas).
4. Evite palavras repetitivas. Use sinônimos elegantes.
5. Mantenha o tom profissional do texto original.

TEXTO ORIGINAL:
---
{texto}
---

TEXTO REVISADO:"""

    try:
        response = client.chat.completions.create(
            model="qwen3.7-plus",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=4000
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        st.error(f"❌ Erro na API: {str(e)}")
        return None

def aplicar_texto_revisado(paragraph, texto_revisado):
    """
    Aplica o texto revisado preservando a formatação original do parágrafo.
    Remove todos os runs antigos para evitar 'track changes' no Word.
    """
    if not paragraph.runs:
        # Se não tem runs, apenas adiciona o texto
        paragraph.add_run(texto_revisado)
        return
    
    # Salva a formatação do primeiro run
    primeiro_run = paragraph.runs[0]
    
    # Salva todas as propriedades de formatação
    formatacao = {
        'fonte_nome': primeiro_run.font.name,
        'fonte_tamanho': primeiro_run.font.size,
        'fonte_cor': primeiro_run.font.color.rgb if primeiro_run.font.color and primeiro_run.font.color.rgb else None,
        'negrito': primeiro_run.bold,
        'italico': primeiro_run.italic,
        'sublinhado': primeiro_run.font.underline,
        'tachado': primeiro_run.font.strike,
    }
    
    # Limpa o texto de todos os runs
    for run in paragraph.runs:
        run.text = ""
    
    # Aplica o texto revisado no primeiro run
    primeiro_run.text = texto_revisado
    
    # Reaplica a formatação salva
    if formatacao['fonte_nome']:
        primeiro_run.font.name = formatacao['fonte_nome']
    if formatacao['fonte_tamanho']:
        primeiro_run.font.size = formatacao['fonte_tamanho']
    if formatacao['fonte_cor']:
        primeiro_run.font.color.rgb = formatacao['fonte_cor']
    primeiro_run.bold = formatacao['negrito']
    primeiro_run.italic = formatacao['italico']
    primeiro_run.font.underline = formatacao['sublinhado']
    primeiro_run.font.strike = formatacao['tachado']

# Upload e processamento
uploaded_file = st.file_uploader("Selecione seu documento (.docx)", type=["docx"])

if uploaded_file is not None:
    if st.button("🚀 Iniciar Revisão"):
        if not api_key:
            st.error("❌ Por favor, insira sua API Key na barra lateral.")
            st.stop()
        
        try:
            client = OpenAI(
                api_key=api_key,
                base_url=BASE_URL
            )
            
            st.info("🔌 Testando conexão com a API...")
            test_response = client.chat.completions.create(
                model="qwen3.7-plus",
                messages=[{"role": "user", "content": "Diga apenas 'OK'"}],
                max_tokens=5
            )
            st.success("✅ Conexão estabelecida! Modelo: qwen3.7-plus")
            
        except Exception as e:
            st.error(f"❌ Erro ao conectar: {str(e)}")
            st.stop()
        
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        # Carrega o documento
        doc = Document(uploaded_file)
        total_paragrafos = len(doc.paragraphs)
        paragrafos_processados = 0
        erros_api = 0
        
        # Processa cada parágrafo
        for i, paragraph in enumerate(doc.paragraphs):
            texto_original = paragraph.text.strip()
            
            # Ignora parágrafos vazios ou muito curtos
            if len(texto_original) > 15: 
                texto_revisado = revisar_texto(client, texto_original)
                
                if texto_revisado is None:
                    erros_api += 1
                    texto_revisado = texto_original
                else:
                    paragrafos_processados += 1
                
                # Aplica o texto revisado preservando formatação
                aplicar_texto_revisado(paragraph, texto_revisado)
                    
            progress_bar.progress((i + 1) / total_paragrafos)
            status_text.text(f"Revisando parágrafo {i + 1} de {total_paragrafos}...")
            time.sleep(0.1)
            
        status_text.text("✅ Revisão concluída!")
        
        if erros_api > 0:
            st.warning(f"⚠️ {erros_api} parágrafos tiveram erros na API.")
        else:
            st.success(f"✅ {paragrafos_processados} parágrafos revisados com sucesso!")
        
        # Salva em memória para download
        output = io.BytesIO()
        doc.save(output)
        output.seek(0)
        
        st.download_button(
            label="⬇️ Baixar Documento Revisado",
            data=output,
            file_name=f"revisado_{uploaded_file.name}",
            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )