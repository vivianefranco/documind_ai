# DocuMind AI — RAG para Revisão de Documentos

Sistema RAG (Retrieval-Augmented Generation) para revisão inteligente de documentos longos (100+ páginas).

## 🚀 Deploy no GitHub Pages

### Passo 1: Configurar o `vite.config.js`

Antes de fazer push, **edite o arquivo `vite.config.js`** e adicione a propriedade `base` com o nome do seu repositório:

```js
export default defineConfig({
  base: '/NOME-DO-SEU-REPOSITORIO/',  // ← ADICIONE ESTA LINHA
  plugins: [react(), tailwindcss()],
  // ... resto do config
});
```

> ⚠️ **Importante**: Substitua `NOME-DO-SEU-REPOSITORIO` pelo nome exato do repo que você vai criar no GitHub.
> 
> Exemplo: se o repo se chama `documind-ai`, use `base: '/documind-ai/'`

### Passo 2: Criar o repositório no GitHub

```bash
# Inicialize o git (se ainda não fez)
git init
git add .
git commit -m "Initial commit: DocuMind AI RAG"

# Crie o repo no GitHub (substitua pelo seu usuário)
gh repo create documind-ai --public --source=. --push
```

Ou manualmente:
1. Vá em [github.com/new](https://github.com/new)
2. Crie um repositório **público** com o nome desejado
3. Siga as instruções para fazer push

### Passo 3: Ativar o GitHub Pages

1. No seu repositório, vá em **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Pronto! O workflow vai rodar automaticamente a cada push na branch `main`

### Passo 4: Acessar o site

Após o deploy (leva ~2 minutos), seu site estará disponível em:

```
https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
```

## 🛠️ Desenvolvimento Local

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## 📦 Build

```bash
npm run build
```

## 🧰 Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Recharts
- Lucide Icons

## 📄 Licença

MIT
