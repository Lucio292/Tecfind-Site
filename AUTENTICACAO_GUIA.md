# 🔐 Autenticação Google & WhatsApp - Guia de Configuração

## ✅ Implementado

### 1️⃣ Google Sign-In (OAuth)
- ✅ Botão com cores oficiais do Google (#4285F4)
- ✅ Integração com Firebase Authentication
- ✅ Ícone SVG do Google
- ✅ Display de nome e foto do usuário após login
- ✅ Logout automático

**Como funciona:**
1. User clica "Entrar com Google"
2. Abre popup de autenticação do Google
3. Firebase valida e cria sessão
4. App carrega dados do usuário

---

### 2️⃣ WhatsApp Login
- ✅ Botão com cores oficiais do WhatsApp (#25D366)
- ✅ Integração com Firebase (autenticação anônima + número WhatsApp)
- ✅ Ícone SVG do WhatsApp
- ✅ Solicita número com código de país (ex: 5511999999999)
- ✅ Armazena número no Firestore

**Como funciona:**
1. User clica "Entrar com WhatsApp"
2. App pede número de WhatsApp (com validação)
3. Firebase cria usuário anônimo + armazena número
4. User pode usar a plataforma normalmente
5. Sistema pode contatar via WhatsApp API

---

## 📋 Próximos Passos - IMPORTANTE!

### 1. Configure seu Firebase Console
Você PRECISA substituir as credenciais em `script.js` (linhas 58-65):

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",  // ← Substitua
    authDomain: "seuservicosja.firebaseapp.com",  // ← Substitua
    projectId: "seuservicosja",  // ← Substitua
    storageBucket: "seuservicosja.appspot.com",  // ← Substitua
    messagingSenderId: "1234567890",  // ← Substitua
    appId: "1:1234567890:web:abcdef123456"  // ← Substitua
};
```

**Para obter essas credenciais:**
1. Vá para https://console.firebase.google.com
2. Crie projeto ou selecione existente
3. Clique em "Configurações do Projeto" (engrenagem)
4. Copie as credenciais
5. Cole em script.js

---

### 2. Habilite Google Sign-In no Firebase
1. Firebase Console → "Authentication"
2. Clique em "Sign-in method" 
3. Ative "Google"
4. Configure OAuth consent screen (se necessário)

---

### 3. WhatsApp Business API (Futuro)
Para integración real de WhatsApp (enviar mensagens de validação):
1. Registre-se em: https://developers.facebook.com/
2. Configure WhatsApp Business API
3. Gere access token
4. Integrate em seu backend

Por enquanto, o app armazena número para contato manual via WhatsApp Web.

---

## 🔍 Verificação

Para testar localmente:

**Google:**
1. Abra index.html no navegador
2. Clique "Entrar com Google"
3. Selecione sua conta Google
4. Deve fazer login automaticamente

**WhatsApp:**
1. Clique "Entrar com WhatsApp"
2. Digite seu número (ex: 5511999999999)
3. Deve aparecer "Conectado com WhatsApp"
4. Pode usar a plataforma

---

## 📝 Estrutura de Dados

### Google Users (Firestore)
```json
{
  "uid": "user-id-from-google",
  "displayName": "João Silva",
  "email": "joao@example.com",
  "photoURL": "https://...",
  "type": "prestador" ou "cliente",
  "service": "Eletricista",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

### WhatsApp Users (Firestore)
```json
{
  "uid": "anonymous-user-id",
  "phone": "5511999999999",
  "displayName": "WhatsApp: +55 11 99999-9999",
  "photoURL": "placeholder-wa-icon",
  "authMethod": "whatsapp",
  "type": "prestador" ou "cliente"
}
```

---

## 🚀 Próximas Melhorias

1. **Two-Factor Authentication (2FA)**
   - SMS para WhatsApp
   - Confirmar número automaticamente

2. **WhatsApp Web Integration**
   - Enviar mensagem inicial após login
   - Notificações via WhatsApp API

3. **Social Login Adicional**
   - Facebook Login
   - GitHub Login
   - Apple Sign-in

4. **Session Management**
   - Refresh token automático
   - Logout after inactivity

---

## ⚠️ Segurança

- ✅ Credenciais Firebase no frontend (essa é a prática padrão para web apps)
- ✅ Firestore Rules devem estar configuradas (valide isso no Console)
- ✅ Senhas não armazenadas (OAuth delega ao Google/Firebase)
- ✅ Sessions gerenciadas por Firebase automatically

---

**Documento criado em:** 15 de abril de 2026  
**Status:** Implementação Completa ✅
