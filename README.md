# 🔧 Tecfind - Guia de Configuração

Um aplicativo web que conecta prestadores de serviço com clientes próximos usando localização, mapa e WhatsApp.

## ✅ Correções Realizadas

Seu site foi completamente reparado! Aqui estão os problemas que foram corrigidos:

### 1. **Erro CSS** ❌ → ✅
- Arquivo CSS estava nomeado como `intyle.css` (typo) e foi renomeado para `style.css`

### 2. **Erros HTML** ❌ → ✅
- Tag `<h2>` não estava fechada corretamente
- URL do Firebase Messaging estava malformada
- Tag de fechamento do mapa do cliente estava incorreta

### 3. **Erros JavaScript** ❌ → ✅
- Função `haversineDistance()` chamava `sin()` sem `Math.` (erro de referência)
- Textos em inglês misturados foram traduzidos para português
- Adicionados listeners para botões de navegação
- Removidas funções duplicadas

## 🚀 Como Usar

### 1. **Configurar Firebase**
Substitua as credenciais placeholders no `script.js`:
```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY_REAL",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "seu-id",
    appId: "seu-app-id"
};
```

### 2. **Configurar Google Maps**
Substitua `YOUR_GOOGLE_MAPS_KEY` no `index.html` pela sua chave real:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_REAL&callback=initMap" async defer></script>
```

### 3. **Funcionalidades Disponíveis**

#### 👨‍🔧 Para Prestadores:
- ✅ Enviar serviços que oferece
- ✅ Adicionar descrição de experiência
- ✅ Receber solicitações de clientes próximos
- ✅ Aceitar/Recusar serviços
- ✅ Fazer contato via WhatsApp

#### 👨‍💼 Para Clientes:
- ✅ Buscar serviços próximos
- ✅ Ver avaliações de prestadores
- ✅ Distância até cada prestador
- ✅ Contato direto via WhatsApp

#### 🗺️ Recursos Gerais:
- ✅ Autenticação com Google
- ✅ Mapa interativo com drag-and-drop
- ✅ Geolocalização automática
- ✅ Busca por distância (até 10 km)
- ✅ Notificações em tempo real

## 📋 Checklist para Produção

- [ ] Adicionar credenciais reais do Firebase
- [ ] Adicionar chave real do Google Maps
- [ ] Configurar banco de dados Firestore
- [ ] Habilitar Google Sign-in no Firebase
- [ ] Implementar certificado SSL (HTTPS)
- [ ] Testar geolocalização em dispositivos móveis
- [ ] Configurar regras de segurança do Firestore

## 📞 Suporte a WhatsApp

O sistema tenta extrair número de WhatsApp (se disponível) ou usa um placeholder. Para adicionar suporte, inclua um campo de telefone no formulário.

---

**Status:** ✅ Todos os erros corrigidos | Pronto para configuração do Firebase
