# 🔧 Tecfind - README v2.0 (Versão Profissional)

> Uma plataforma moderna que conecta prestadores de serviço com clientes próximos usando localização, mapa interativo e WhatsApp.

---

## ✨ O Que é Tecfind?

**Tecfind** é um marketplace local inteligente onde:
- 👨‍🔧 **Prestadores** oferecem seus serviços
- 👨‍💼 **Clientes** encontram profissionais qualificados
- 🗺️ Tudo funciona baseado em **localização**
- 💬 Comunicação **direta via WhatsApp**

---

## 🎨 Design Profissional & Inteligente

### Sistema de Cores Automático ✨

Cada serviço tem sua própria cor:
```
"Aulas de Violão"     → 📚 Laranja (Educação)
"Encanador"           → 🔧 Azul (Técnico)
"Limpeza residencial" → 🧹 Verde (Limpeza)
"Pintor"              → 🎨 Vermelho (Pintura)
```

**Tudo automático - sem configuração!**

---

## ✅ Mudanças Recentes (v2.0)

### 🎨 Design
✅ Novo layout **moderno e profissional**
✅ Gradientes **roxo premium** no header
✅ **12+ cores** diferentes por serviço
✅ Ícones **personalizados**
✅ Animações **suaves e fluidas**

### 🎯 Funcionalidades
✅ Cards com **efeitos hover elegantes**
✅ **Transições CSS3** nos elementos
✅ Layout **responsivo** (mobile/tablet/desktop)
✅ Melhor **legibilidade** dos textos
✅ **UX/UI** profissional

### 📱 Mobile First
✅ Grid **automático** em diferentes telas
✅ Botões **grandes** para mobile
✅ Scroll **suave** nos mapas
✅ Layouts **reajustáveis**

---

## 🚀 Como Começar

### PASSO 1: Configurar Firebase

**Veja o arquivo [SETUP.md](SETUP.md)** para instruções completas:
- Criar projeto Firebase
- Obter credenciais
- Configurar Firestore
- Ativar Google Auth

### PASSO 2: Adicionar Google Maps

1. Obtenha chave em: https://console.cloud.google.com/
2. Substitua em `index.html`:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE&callback=initMap" async defer></script>
```

### PASSO 3: Teste Localmente
```bash
# Opção 1: Abra diretamente
/Tecfind/index.html

# Opção 2: Use servidor local
python -m http.server 8000
# Acesse: http://localhost:8000
```

---

## 📊 Cores por Serviço

| Tipo | Cor | Classe | Palavras-chave |
|------|-----|--------|-----------------|
| 🔧 Técnico | #3498db | `.service-plumb` | encanador, hidraulico |
| 🧹 Limpeza | #27ae60 | `.service-cleaning` | limpeza, faxina, tapeçaria |
| 📚 Educação | #f39c12 | `.service-education` | aula, professor, curso |
| ⚡ Elétrico | #f1c40f | `.service-electrical` | eletricista, fiação |
| 🧱 Construção | #95a5a6 | `.service-masonry` | pedreiro, alvenaria |
| 🎨 Pintura | #e74c3c | `.service-painting` | pintor, pintura |
| 🌱 Jardinagem | #1abc9c | `.service-gardening` | jardineiro, plantas |
| 🔨 Reparo | #c0392b | `.service-repair` | manutenção, conserto |
| 🧺 Especial | #8e44ad | `.service-carpet` | carpete, tapete |
| 🚚 Entrega | #2980b9 | `.service-delivery` | delivery, mudança |
| ✂️ Beleza | #c2185b | `.service-beauty` | cabeleiro, manicure |
| 💼 Consultoria | #00509e | `.service-consulting` | consultor, marketing |

---

## 🎨 Personalizando Cores

### Adicione Novo Serviço (3 passos):

#### 1. Edite `service-colors.css`:
```css
.service-meu-servico {
    border-left: 5px solid #SEUCOLOR !important;
    background: linear-gradient(135deg, rgba(R,G,B,0.05) 0%, rgba(R,G,B,0.02) 100%) !important;
}
.service-meu-servico h3 {
    color: #SEUCOLOR !important;
}
```

#### 2. Edite `script.js` (procure `serviceKeywords`):
```javascript
'suapalavra': 'service-meu-servico'
```

#### 3. Pronto! Seu novo serviço tem cor!

**Mais detalhes em [CORES.md](CORES.md)**

---

## 📁 Estrutura de Arquivos

```
📂 Tecfind/
│
├── 📄 index.html          HTML principal
├── 🎨 style.css           Design moderno
├── 🎨 service-colors.css  Cores por serviço ✨ NOVO
├── 🔧 script.js           Lógica + Firebase
│
├── 📖 README.md           Este arquivo (guia geral)
├── 📖 SETUP.md            Guia Firebase (IMPORTANTE!)
├── 📖 DESIGN.md           Detalhes do novo design
├── 📖 CORES.md            Guia de cores/temas
│
└── 🎨 (Você pode adicionar mais arquivos CSS/JS aqui)
```

---

## 🔐 Segurança Firebase

Regras Firestore recomendadas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /service_requests/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## ⚙️ Tokens & Configuração

Você vai precisar de:

```javascript
// No Firebase Console
apiKey: "AIza..."              // Copie do Firebase
authDomain: "seu-app.firebaseapp.com"
projectId: "seu-projeto-id"
storageBucket: "seu-projeto.appspot.com"
messagingSenderId: "123456789"
appId: "1:123456789:web:..."

// No Google Cloud
GOOGLE_MAPS_KEY: "AIza..."     // Copie do Cloud Console
```

---

## 🎯 Funcionalidades

### ✅ Implementadas
- Login com Google
- Cadastro de prestador/cliente
- Mapa interativo com arraste
- Geolocalização automática
- Busca por distância (até 10 km)
- Solicitações em tempo real
- Contato via WhatsApp
- Notificações com badges
- Avaliações e ratings
- Design responsivo

### 🔜 Próximas
- Chat integrado
- Sistema de pagamento
- Fotos de portfólio
- Histórico de serviços
- API REST

---

## 🧪 Testando Localmente

```bash
# 1. Abra um terminal na pasta Tecfind
cd Tecfind

# 2. Inicie servidor local (Python)
python -m http.server 8000

# 3. Abra no navegador
http://localhost:8000

# 4. Faça login com Google
# 5. Cadastre como prestador ou cliente
# 6. Recrute prestadores no mapa
```

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Não funciona nada" | Verifique Firebase (SETUP.md) |
| "Sem mapa" | Checa chave Google Maps em index.html |
| "Sem prestadores" | Certifique localização no mapa |
| "WhatsApp fecha" | Adicione número no cadastro |
| "Erro de CORS" | Use servidor local (não abra direto HTML) |
| "Cache antigo" | Abra em incógnito (Ctrl+Shift+Del) |

---

## 💡 Dicas de Uso

1. **Teste com múltiplos serviços** diferentes
2. **Customize cores** conforme sua marca
3. **Use localização de SP** para testes (-23.5505, -46.6333)
4. **Monitore Firestore** no console Firebase
5. **Teste em mobile** com DevTools (F12)

---

## 🎁 Bônus Incluído

✨ Design profissional moderno
✨ Sistema de cores inteligente
✨ Animações suaves
✨ Código limpo e comentado
✨ Guias de setup e customização
✨ Totalmente responsivo
✨ População grande para testar
✨ Pronto para deploy

---

## 📚 Recursos Adicionais

- [Guia Firebase Completo](SETUP.md)
- [Detalhes do Design](DESIGN.md)
- [Guia de Cores/Serviços](CORES.md)
- [Firebase Docs](https://firebase.google.com/docs)
- [Google Maps API](https://developers.google.com/maps)

---

## 🚀 Deploy (Próximo Passo)

Quando estiver pronto para produção:

1. Hospede em **Firebase Hosting**
2. Configure **HTTPS** (automático)
3. Adicione **domínio personalizado**
4. Configure regras de **segurança Firestore**
5. Monitore com **Firebase Analytics**

---

## 📞 Suporte Rápido

**Erro "não funciona"?**
1. Abra DevTools (F12)
2. Veja aba "Console"
3. Copie erro em vermelho
4. Consulte SETUP.md

---

## ✅ Status Final

```
✅ Código: 100% Funcional
✅ Design: Profissional Moderno
✅ Cores: Sistema Automático
✅ Mobile: Totalmente Responsivo
✅ Firebase: Pronto para configurar
✅ Documentação: Completa
🚀 Status: PRONTO PARA USAR!
```

---

**Felicidades! Seu Tecfind está pronto! 🎉**

*Agora é só configurar Firebase e começar a conectar profissionais com clientes!* 🔧👥

---

**Versão**: 2.0 (Design Profissional + Sistema de Cores)
**Última atualização**: 15 de Abril de 2026
**Mantido com ❤️ para a comunidade**
