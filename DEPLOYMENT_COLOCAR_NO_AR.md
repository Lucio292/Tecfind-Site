# Colocar Tecfind no Ar - Guia Completo de Deployment

## ⚡ Opção Recomendada: Vercel (Mais Fácil - Grátis)

### Passo 1: Preparar Repositório GitHub

1. **Crie uma conta em GitHub:** https://github.com
2. **Crie um novo repositório** chamado `tecfind`
3. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/tecfind.git
   cd tecfind
   ```

4. **Copie todos os arquivos da Tecfind para dentro dessa pasta**
   - index.html
   - style.css
   - script.js
   - service-colors.css
   - images/ (pasta)
   - server.py
   - etc.

5. **Faça o upload para GitHub:**
   ```bash
   git add .
   git commit -m "Primeiro commit - Tecfind pronto para produção"
   git push origin main
   ```

### Passo 2: Deploy no Vercel

1. **Acesse:** https://vercel.com
2. **Clique em "Sign up"** (ou "Get Started")
3. **Selecione "GitHub"** para conectar sua conta
4. **Autorize o Vercel** a acessar seus repositórios
5. **Clique em "Import Project"**
6. **Selecione o repositório `tecfind`**
7. **Configure:**
   - Framework: **"Other"** (não é framework específico)
   - Root Directory: **`.`** (deixe em branco)
   - Build Command: deixe em branco
   - Output Directory: deixe em branco
8. **Clique em "Deploy"**

### Passo 3: Configurar Firebase para Produção

Após o Vercel gerar sua URL (será algo como: `https://tecfind-seu-nome.vercel.app`):

1. **Volte ao Firebase Console**
2. **Authentication > Método de login > Google**
3. **Adicione a URL do Vercel em "URIs de redirecionamento autorizados":**
   ```
   https://tecfind-seu-nome.vercel.app
   ```
4. **Salve**

5. **Em "Domínios autorizados" (aba Configurações), adicione:**
   ```
   tecfind-seu-nome.vercel.app
   ```

### Passo 4: Testar

1. Acesse: `https://tecfind-seu-nome.vercel.app`
2. Clique em "Entrar com Google"
3. Se funcionar, está pronto! ✅

---

## 📦 Alternativa 2: Netlify (Também Grátis)

1. **Acesse:** https://netlify.com
2. **Clique em "Login"** (ou registre-se via GitHub)
3. **Clique em "New site from Git"**
4. **Selecione seu repositório `tecfind`**
5. **Clique em "Deploy"**
6. **Configure Firebase** com a URL gerada

---

## 🚀 Alternativa 3: Replit (Mais Simples - Sem Git)

1. **Acesse:** https://replit.com
2. **Clique em "Create"** 
3. **Selecione "HTML, CSS, JS"**
4. **Não precisa escrever nada, clique "Create Repl"**
5. **Faça upload dos arquivos:**
   - Clique em pasta/arquivo no lado esquerdo
   - Faça upload de todos os arquivos da Tecfind
6. **Clique em "Run"**
7. **Replit gera uma URL automática**
8. **Configure Firebase com essa URL**

---

## ⚙️ Configuração Final no Firebase

Depois de escolher uma das opções acima:

### 1. Atualizar script.js (Se necessário)

Se você está usando `YOUR_GOOGLE_MAPS_KEY`, substitua no script.js pela sua chave real do Google Maps:

```javascript
// Linha ~15 em script.js
<script src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_AQUI&callback=initMap" async defer></script>
```

### 2. Verificar Firestore Rules

Vá para **Cloud Firestore > Rules** e garanta que estão corretos:

```json
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Habilitar Provedores de Autenticação

No Firebase Console:
- **Authentication > Método de login**
- Ative: **Google** ✅
- Ative: **Anonymous** (para WhatsApp) ✅

---

## 🔒 Checklist Antes de Ir para Produção

- [ ] GitHub repositório criado e configurado
- [ ] Vercel/Netlify/Replit com deployment ativo
- [ ] URL do site gerada
- [ ] Firebase configurado com URLs do site
- [ ] Google OAuth funcionando
- [ ] WhatsApp funcionando
- [ ] Banco de dados (Firestore) respondendo
- [ ] Login/logout funcionando
- [ ] Formulários salvando dados
- [ ] Categorias funcionando
- [ ] Busca de serviços funcionando

---

## 🆘 Ordem Para Seguir

### Se escolher Vercel (RECOMENDADO):

```
1. Criar GitHub + fazer upload dos arquivos
2. Conectar Vercel ao GitHub
3. Vercel faz deploy automático
4. Configurar Firebase com URL do Vercel
5. Pronto!
```

### Se escolher Replit:

```
1. Criar conta Replit
2. Fazer upload dos arquivos
3. Clicar "Run"
4. Configurar Firebase com URL gerada
5. Pronto!
```

---

## 📱 URLs Finais que Você Terá

**Localhost (Desenvolvimento):**
- `http://localhost:8000`

**Em Produção (Vercel):**
- `https://tecfind-seu-nome.vercel.app`
- Poderá conectar domínio personalizado depois

**Em Produção (Replit):**
- `https://seu-replit-name.replit.dev`

---

## 💡 Do que você precisa?

**Marque abaixo qual opção você quer:**

- [ ] Vercel (Recomendado - usa GitHub)
- [ ] Netlify (Alternativa - também usa GitHub)
- [ ] Replit (Mais simples - sem Git)

**Responda qual você quer que eu te guio passo a passo!**
