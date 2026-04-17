# 🔧 GUIA DE CONFIGURAÇÃO - TECFIND

## ✅ Problema Corrigido!
O arquivo `script.js` tinha código duplicado e quebrado. **Já foi removido!**

---

## 🚨 ANTES DE TUDO: Por que não funciona?

Seu site precisa de **configurações reais** para funcionar. Atualmente tem dados de exemplo (placeholders).

---

## 📝 PASSO 1: Criar um projeto Firebase

### Acesse: https://console.firebase.google.com/

1. Clique em **"+ Adicionar projeto"**
2. Digite o nome: **"tecfind"** (ou outro que preferir)
3. Clique em **"Continuar"**
4. Na próxima tela, **desmarque Analytics** (não é necessário)
5. Clique em **"Criar projeto"**
6. Aguarde alguns segundos até completar

---

## 🔑 PASSO 2: Obter Credenciais do Firebase

1. No console Firebase, clique no **ícone de engrenagem** (⚙️) no lado esquerdo → **"Configurações do projeto"**
2. Clique na aba **"Geral"**
3. Procure por **"Apps"** e clique em **"Web"** (ícone `</>`)
4. Dale um nome: **"Tecfind Web"** e clique em **"Registrar app"**
5. Uma caixa aparecerá com o código de configuração:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "tecfind-xxx.firebaseapp.com",
  projectId: "tecfind-xxx",
  storageBucket: "tecfind-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};
```

6. **Copie este código completo**

---

## 📋 PASSO 3: Substituir no `script.js`

1. Abra `script.js` em seu editor
2. Encontre as linhas 2-10 (configuração do Firebase):
   ```javascript
   const firebaseConfig = {
       apiKey: "SUA_API_KEY",
       authDomain: "seuservicosja.firebaseapp.com",
       projectId: "seuservicosja",
       storageBucket: "seuservicosja.appspot.com",
       messagingSenderId: "1234567890",
       appId: "1:1234567890:web:abcdef123456"
   };
   ```
3. **Substitua todo este bloco** pelo que você copiou do Firebase

---

## 🗺️ PASSO 4: Configurar Google Maps API

### Acesse: https://console.cloud.google.com/

1. Clique em **"Novo Projeto"**
2. Nome: **"Tecfind Maps"** (ou qualquer nome)
3. Clique em **"Criar"**
4. Aguarde alguns segundos
5. Na barra de busca superior, procure por: **"Maps JavaScript API"**
6. Clique em **"Maps JavaScript API"**
7. Clique em **"Ativar"**
8. Clique em **"Criar credenciais"** (azul, no topo)
9. Selecione **"Chave de API"**
10. Copie a chave que aparece (começa com `AIza...`)

### Importante: Permitir origem local

1. De volta à credencial, clique em **"Editar"** (lápis)
2. Em **"Restrições de aplicativo"**, selecione **"HTTP referrers (websites)"**
3. Em **"Websites autorizados"**, clique em **"+ Adicionar um item"**
4. Digite: `http://localhost`
5. Clique em **"Salvar"**

---

## 📍 PASSO 5: Substituir no `index.html`

1. Abra `index.html`
2. Encontre a linha com:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_KEY&callback=initMap" async defer></script>
   ```
3. Substitua `YOUR_GOOGLE_MAPS_KEY` pela sua chave real do Google Maps

---

## 🔐 PASSO 6: Configurar Autenticação Firebase

1. Volte ao **Firebase Console**
2. Clique em **"Autenticação"** (esquerda)
3. Clique em **"Primeiros passos"**
4. Procure por **"Google"** e clique nele
5. Marque **"Ativar"**
6. Em **"Email do suporte do projeto"**, é preenchido automaticamente
7. Clique em **"Salvar"**

---

## 📊 PASSO 7: Criar Banco de Dados Firestore

1. No Firebase, clique em **"Firestore Database"** (esquerda)
2. Clique em **"Criar banco de dados"**
3. Modo: Selecione **"Modo de teste"**
4. Localização: Deixe como padrão ou escolha sua região
5. Clique em **"Criar"**

---

## ⚙️ PASSO 8: Configurar Regras de Segurança

1. No Firestore, clique na aba **"Regras"**
2. Substitua pelo seguinte:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Todos os usuários autenticados podem ler e escrever seus dados
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Solicitações de serviço
    match /service_requests/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Clique em **"Publicar"**

---

## 🌐 PASSO 9: Testar Localmente

1. Abra `index.html` no navegador (clique 2x no arquivo ou arraste para o navegador)
2. Clique em **"Entrar com Google"**
3. Faça login com sua conta Google
4. Teste o cadastro como preceder/cliente

---

## ✅ Checklist Final

- [ ] Firebase configurado com credenciais reais
- [ ] Google Maps API ativa com chave real
- [ ] Autenticação Google ativada no Firebase
- [ ] Firestore Database criado
- [ ] Regras de segurança do Firestore publicadas
- [ ] Credenciais atualizadas em `script.js`
- [ ] Chave Google Maps atualizada em `index.html`
- [ ] Site testado no navegador

---

## 🚀 Se Ainda Não Funcionar

Abra o **Console do Navegador** (F12 → Abas Console):
- Procure por mensagens de erro em vermelho
- Copie a mensagem exata do erro
- Compartilhe comigo para diagnosticar

---

## 💡 Dica: Seu site é muito bom!

Você criou:
✅ Sistema de busca por localização
✅ Integração WhatsApp
✅ Mapa interativo
✅ Autenticação Google
✅ Notificações em tempo real

Só precisava de configuração! 🎉
