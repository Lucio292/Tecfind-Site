# Deploy Automático - Começa Aqui! 🚀

## ⚡ O Que Você Precisa Fazer (Só 3 Passos!)

### PASSO 1: Criar Conta GitHub (5 minutos)

1. **Abra:** https://github.com
2. **Clique em "Sign up"**
3. **Preencha:**
   - Email
   - Senha  
   - Username (ex: seu-nome-tecfind)
4. **Confirme seu email** (GitHub envia link)

### PASSO 2: Criar Repositório GitHub (2 minutos)

1. **Faça login no GitHub**
2. **Clique no seu avatar** → **"Your repositories"**
3. **Clique em "New"** (botão verde)
4. **Preencha:**
   - **Name:** `tecfind`
   - **Public** (deixe selecionado)
5. **Clique em "Create repository"**
6. **Copie a URL** (botão verde "Code" → copie a URL HTTPS)

Exemplo de URL:
```
https://github.com/seu-usuario/tecfind.git
```

### PASSO 3: Executar Script Automático (1 minuto!)

1. **Você agora tem a URL do seu repositório**
2. **No seu Desktop, procure por: `deploy-vercel.bat`**
3. **Clique 2x nele**
4. **Digite as informações:**
   - URL do repositório (que você copiou)
   - Seu email
   - Seu nome
5. **Deixa rodar** (vai automaticamente fazer tudo)

---

## 🚀 Próximas Etapas (Automáticas)

O script vai:
✅ Clonar seu repositório  
✅ Copiar todos os arquivos da Tecfind  
✅ Fazer git commit  
✅ Fazer git push para GitHub  

Depois:

### PASSO 4: Setup no Vercel (3 minutos)

1. **Abra:** https://vercel.com
2. **Sign Up** → **"Continue with GitHub"**
3. **Autorize Vercel**
4. **Clique em "Add New" → "Project"**
5. **Selecione o repositório `tecfind`**
6. **Clique em "Import"** → **"Deploy"**
7. **Aguarde 2-3 minutos**
8. **Copie a URL gerada** (será: `https://tecfind-seu-nome.vercel.app`)

### PASSO 5: Final - Configurar Firebase (2 minutos)

1. **Firebase Console** → Seu projeto
2. **Authentication** → **Método de login** → **Google**
3. **Adicione em "URIs de redirecionamento":**
   ```
   https://tecfind-seu-nome.vercel.app
   ```
4. **Salve**

---

## ✅ PRONTO!

Seu site está online em:
```
https://tecfind-seu-nome.vercel.app
```

**Compartilhe essa URL com seus clientes!** 🎉

---

## 🆘 Se der erro...

### Erro no script ("git not found")
- Baixe Git: https://git-scm.com/download/win
- Instale e reinicie o computador

### Erro de autenticação (credenciais)
1. GitHub → Settings → Developer settings → Personal access tokens
2. Clique em "Generate new token"
3. Marque: `repo` e `workflow`
4. Copie o token (aparece só uma vez!)
5. Quando script pedir senha, cole o token

### Site fica em branco no Vercel
- Aguarde 5 minutos (às vezes leva mais)
- Pressione F12 no navegador e veja o console (pode ter erro de Firebase)
- Confirme que URLs estão corretas no Firebase

---

## 📱 Cheat Sheet - Copiar/Colar

**URL do repositório após criar:**
```
https://github.com/SEU-USERNAME/tecfind.git
```

**URL do site após deploy:**
```
https://tecfind-seu-vercel-name.vercel.app
```

**Adicionar no Firebase:**
```
https://tecfind-seu-vercel-name.vercel.app
```

---

**Você está pronto! Execute o `deploy-vercel.bat` agora!** 🚀
