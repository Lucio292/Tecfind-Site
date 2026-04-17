# Colocar Tecfind no Ar com Vercel - Passo a Passo Completo

## ✅ Pré-requisito: Git Instalado

Você precisa do Git instalado. Para verificar se tem:

1. **Abra PowerShell** e digite:
   ```bash
   git --version
   ```
2. Se aparecer uma versão, está OK!
3. Se não aparecer nada, baixe em: https://git-scm.com/download/win

---

## 📋 PASSO 1: Criar Conta GitHub

1. **Acesse:** https://github.com
2. **Clique em "Sign up"** (canto superior direito)
3. **Preencha:**
   - Email
   - Senha
   - Username (seu nome de usuário, ex: "seu-nome-tecfind")
4. **Clique em "Create account"**
5. **Verifique seu email** (GitHub envia um link de confirmação)

---

## 📁 PASSO 2: Criar Repositório GitHub

1. **Após login, clique em seu avatar** (canto superior direito)
2. **Selecione "Your repositories"**
3. **Clique em "New"** (botão verde)
4. **Preencha:**
   - **Repository name:** `tecfind`
   - **Description:** `Plataforma de serviços freelance com autenticação Firebase`
   - **Public** (deixe selecionado)
5. **Clique em "Create repository"**

Você verá uma tela com comandos. **Deixe essa aba aberta!**

---

## 💻 PASSO 3: Fazer Upload dos Arquivos via Git

### 3.1 Configure Git

1. **Abra PowerShell como Administrador**
2. **Configure seu email e nome:**
   ```bash
   git config --global user.email "seu-email@gmail.com"
   git config --global user.name "Seu Nome"
   ```

### 3.2 Clone o Repositório

1. **Na aba do GitHub aberta, procure por um botão verde "Code"**
2. **Clique e copie a URL** (será algo como: `https://github.com/seu-usuario/tecfind.git`)
3. **No PowerShell, digite:**
   ```bash
   cd Desktop
   git clone https://github.com/seu-usuario/tecfind.git
   cd tecfind
   ```

### 3.3 Copie os Arquivos da Tecfind

1. **Abra File Explorer**
2. **Navegue até:** `C:\Users\lucivaldo.oliveira\Desktop\Tecfind`
3. **Selecione TODOS os arquivos EXCETO pasta `.git`:**
   - index.html
   - style.css
   - script.js
   - service-colors.css
   - images/ (pasta completa)
   - server.py
   - iniciar-servidor.bat
   - TODOS os arquivos .md

4. **Copie** (Ctrl + C)

5. **Navegue até:** `C:\Users\lucivaldo.oliveira\Desktop\tecfind` (a pasta que você clonou)

6. **Cole os arquivos** (Ctrl + V)

### 3.4 Fazer Commit e Push

1. **No PowerShell, dentro da pasta `tecfind`, digite:**
   ```bash
   git add .
   ```

2. **Depois:**
   ```bash
   git commit -m "Primeiro commit - Tecfind pronto para produção"
   ```

3. **Envie para GitHub:**
   ```bash
   git push origin main
   ```

4. **Atualize a página do GitHub** - você deve ver todos os arquivos lá!

---

## 🚀 PASSO 4: Deploy no Vercel

### 4.1 Criar Conta Vercel

1. **Acesse:** https://vercel.com
2. **Clique em "Sign Up"**
3. **Clique em "Continue with GitHub"**
4. **Autorize o Vercel** a acessar sua conta GitHub
5. **Clique em "Authorize Vercel"**

### 4.2 Importar Projeto

1. **Na página inicial do Vercel, clique em "Add New..."** (canto superior esquerdo)
2. **Selecione "Project"**
3. **Clique em "Import Git Repository"**
4. **Procure por "tecfind"** e selecione
5. **Clique em "Import"**

### 4.3 Configurar Deployment

1. **A próxima tela pede configurações:**
   - **Project Name:** `tecfind` (deixe assim)
   - **Framework Preset:** Mude para **"Other"** (no dropdown)
   - **Root Directory:** deixe em branco
   - **Build Command:** deixe em branco
   - **Output Directory:** deixe em branco

2. **Clique em "Deploy"**

3. **Espere uns 2-3 minutos** enquanto o Vercel faz o deployment

4. **Quando terminar, você verá uma tela dizendo "Congratulations!"**

5. **Copie a URL gerada** (será algo como: `https://tecfind-seu-nome.vercel.app`)

---

## 🔐 PASSO 5: Configurar Firebase para Produção

### 5.1 Adicionar URL do Vercel no Firebase

1. **Acesse:** https://console.firebase.google.com
2. **Seu projeto > Authentication > Método de login > Google**
3. **Procure por "URIs de redirecionamento autorizados"**
4. **Adicione sua URL do Vercel:**
   ```
   https://tecfind-seu-nome.vercel.app
   ```
   (Substitua "seu-nome" pelo seu nome real do Vercel)

5. **Também adicione:**
   ```
   https://tecfind-seu-nome.vercel.app/index.html
   ```

6. **Clique em "Salvar"**

### 5.2 Adicionar Domínio Autorizado

1. **Em Authentication > Configurações**
2. **Procure por "Domínios autorizados"**
3. **Clique em "Adicionar domínio"**
4. **Digite:**
   ```
   tecfind-seu-nome.vercel.app
   ```
5. **Salve**

---

## ✅ PASSO 6: Testar o Site

1. **Abra seu navegador**
2. **Acesse:** `https://tecfind-seu-nome.vercel.app`
3. **Clique em "Entrar com Google"**
4. **Deveria funcionar sem erros!** ✅

---

## 🎯 Checklist Final

- [ ] GitHub conta criada
- [ ] Repositório "tecfind" criado
- [ ] Arquivos enviados via Git
- [ ] Conta Vercel criada
- [ ] Projeto importado no Vercel
- [ ] Deployment concluído
- [ ] URL gerada (anote: `https://tecfind-seu-nome.vercel.app`)
- [ ] Firebase configurado com URLs
- [ ] Google Login testado e funcionando
- [ ] Site acessível pela internet ✅

---

## 🆘 Erros Comuns

### "Erro ao fazer git clone"
**Solução:** Verifique se Git está instalado: `git --version`

### "Erro de autenticação no Git"
**Solução:** 
1. Gere um token no GitHub: https://github.com/settings/tokens
2. Use o token como senha ao fazer git push

### "Firebase: operation not supported"
**Solução:** Aguarde 5 minutos após salvar as URLs no Firebase (leva tempo para propagar)

### Site fica em branco no Vercel
**Solução:** Verifique console (F12) se há erros de Firebase. Confirme se as URLs estão corretas.

---

## 📱 Seu Site Está PRONTO!

Depois de tudo isso, seu Tecfind estará:

✅ **Acessível na internet**
✅ **Com login Google funcionando**
✅ **Com banco de dados (Firestore) funcionando**
✅ **Com todas as categorias de serviços**
✅ **Respondendo em tempo real**

**URL para compartilhar:** `https://tecfind-seu-nome.vercel.app`

---

## 🔄 Próximas Atualizações

Se precisar fazer mudanças na aplicação:

1. **Edite os arquivos localmente** (index.html, style.css, etc)
2. **No PowerShell, dentro da pasta tecfind:**
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push origin main
   ```
3. **Vercel fará o deploy automático** (2-3 minutos)

---

## 📞 Precisa de Ajuda?

Se tiver dúvida em algum passo, manda screenshot mostrando:
- Qual tela você está vendo
- O que aparece na tela
- Qual erro você recebeu (se houver)

Aí consigo te guiar! 👍
