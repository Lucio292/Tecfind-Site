# 🎨 Guia de Personalização de Cores e Artes - Tecfind

## 📋 Sistema de Cores por Serviço

O site agora aplica **cores automáticas** baseado no tipo de serviço oferecido/procurado!

### ✨ Serviços Pré-Configurados:

| Serviço | Cor | Ícone | Classe CSS |
|---------|-----|-------|-----------|
| 🔧 Encanamento | Azul | 🔧 | `.service-plumb` |
| 🧹 Limpeza | Verde | 🧹 | `.service-cleaning` |
| 📚 Educação | Laranja | 📚 | `.service-education` |
| ⚡ Eletricidade | Amarelo | ⚡ | `.service-electrical` |
| 🧱 Alvenaria/Construção | Cinza | 🧱 | `.service-masonry` |
| 🎨 Pintura | Vermelho | 🎨 | `.service-painting` |
| 🌱 Jardinagem | Verde Claro | 🌱 | `.service-gardening` |
| 🔨 Reparo/Manutenção | Vermelho Escuro | 🔨 | `.service-repair` |
| 🧺 Limpeza de Carpetes | Roxo | 🧺 | `.service-carpet` |
| 🚚 Delivery/Entrega | Azul Claro | 🚚 | `.service-delivery` |
| ✂️ Beleza/Cabelereiro | Rosa | ✂️ | `.service-beauty` |
| 💼 Consultorias | Azul Escuro | 💼 | `.service-consulting` |
| 💡 Outros | Cinza Médio | 💡 | `.service-other` |

---

## 🔄 Como Funciona?

O sistema analisa **automaticamente** palavras-chave no título do serviço e aplica a cor correspondente:

**Exemplo:**
- Serviço: "Encanador experiente" → Detecta "encanador" → Aplica cor AZUL
- Serviço: "Aulas de violão" → Detecta "violão" → Aplica cor LARANJA (educação)
- Serviço: "Limpeza residencial" → Detecta "limpeza" → Aplica cor VERDE

---

## 📝 Adicionando um Novo Serviço

Se quiser adicionar um novo tipo de serviço com cor personalizada, siga estes passos:

### PASSO 1: Adicionar CSS em `service-colors.css`

```css
/* Seu Novo Serviço - Cor */
.service-seu-servico {
    border-left: 5px solid #SEUCOLOR !important;
    background: linear-gradient(135deg, rgba(R, G, B, 0.05) 0%, rgba(R, G, B, 0.02) 100%) !important;
}

.service-seu-servico h3 {
    color: #SEUCOLOR !important;
}

.service-seu-servico .service-icon::before {
    content: '🆕';  /* Seu ícone aqui */
}
```

### PASSO 2: Adicionar Mapeamento em `script.js`

Procure pela função `getServiceClass()` e adicione:

```javascript
'sua-palavra-chave': 'service-seu-servico'
```

**Exemplo completo:**
```javascript
const serviceKeywords = {
    'encanador': 'service-plumb',
    'plumb': 'service-plumb',
    'sua-palavra': 'service-seu-servico',
    // ... resto das keywords
};
```

### PASSO 3: Atualizar este Guia

Adicione seu novo serviço na tabela acima!

---

## 🎯 Cores Recomendadas por Tipo

### 👷 Trabalho Manual
- Verde: `#27ae60` (Limpeza)
- Azul: `#3498db` (Encanamento)
- Vermelho: `#e74c3c` (Pintura/Reparo)
- Cinza: `#95a5a6` (Construção)

### 🏫 Educação & Serviços
- Laranja: `#f39c12` (Educação)
- Rosa: `#c2185b` (Beleza)
- Azul Escuro: `#00509e` (Consultoria)

### 🚚 Terceirização
- Azul Claro: `#2980b9` (Delivery)
- Verde Claro: `#1abc9c` (Logística)

---

## 🎨 Paleta de Cores Profissional

```
Primária: #667eea (Roxo Premium)
Secundária: #764ba2 (Roxo Escuro)
Sucesso: #27ae60 (Verde)
Alerta: #f39c12 (Laranja)
Erro: #e74c3c (Vermelho)
Info: #3498db (Azul)
```

---

## 💡 Dicas para Melhor Aparência

1. **Use cores contrastantes** para melhor legibilidade
2. **Mantenha a paleta consistente** - não use mais de 12 cores
3. **Teste em dispositivos móveis** - cores podem parecer diferentes
4. **Use ícones Unicode** que são compatíveis com todos os navegadores
5. **Combine cores similares** para categorias relacionadas

---

## 🔍 Testando suas Cores

1. Crie um prestador/cliente com o novo serviço
2. Abra o navegador (F12)
3. Inspecione o elemento `.prestador-card`
4. Verifique se a clase CSS foi aplicada corretamente
5. Ajuste cores conforme necessário

---

## 📊 Estrutura de Code Automático

O sistema funciona assim:

```
Usuário cadastra: "Encanamento Residencial"
        ↓
Script analisa palavras-chave
        ↓
Encontra "encanador" → class = "service-plumb"
        ↓
CSS aplica cor AZUL #3498db
        ↓
Card exibe com cor e ícone! 🎨
```

---

## 🚀 Próximos Passos

- [ ] Adicionar todas palavras-chave que seu mercado usa
- [ ] Criar cores para serviços locais/regionais
- [ ] Adicionar animações personalizadas por tipo
- [ ] Criar filtros de busca por cor/categoria

---

**Aproveite! Seu site agora é profissional e visualmente atrativo! 🎉**
