# Como Adicionar URI de Redirecionamento no Firebase - Passo a Passo

## Pré-requisito
- Você já tem uma conta Firebase criada
- Seu projeto já está configurado em script.js

## Passo 1: Acessar o Firebase Console

1. Abra: https://console.firebase.google.com
2. Se não estiver logado, faça login com sua conta Google
3. Você verá uma lista de projetos

## Passo 2: Selecionar Seu Projeto

1. Procure pelo projeto **"seuservicosja"** (ou o nome que você deu)
2. **Clique nele** para abrir

## Passo 3: Ir para Autenticação

1. No menu esquerdo, procure por **"Compilação"** (Seção cinza)
2. Clique em **"Autenticação"** (terá um ícone de cadeado)

```
Menu Esquerdo:
├── Visão geral do projeto
├── Compilação
│   ├── Autenticação  ← CLIQUE AQUI
│   ├── Firestore Database
│   ├── Realtime Database
│   └── Cloud Storage
```

## Passo 4: Encontrar "Configurações de Autenticação"

1. Depois de clicar em "Autenticação", você verá:
   - Uma aba chamada **"Provedores"** (está selecionada por padrão)
   - Uma aba chamada **"Configurações"** (próximo à aba Provedores)

2. **Clique na aba "Configurações"** (não "Provedores")

## Passo 5: Localizar "URIs de Redirecionamento Autorizados"

Na aba "Configurações", você verá vários campos. Procure por:

**"URI de redirecionamento autorizados"** (ou "Authorized redirect URIs")

Será um campo com:
- Um botão **"Adicionar URI"** (ou "Add URI")
- Uma lista (provavelmente vazia ou com alguns URLs)

## Passo 6: Adicionar a URL Local

1. Clique em **"Adicionar URI"**
2. Uma caixa de texto aparecerá
3. Digite exatamente:
   ```
   http://localhost:8000
   ```
4. Clique em **"Salvar"** ou **"Adicionar"**

### URLs para Adicionar:
- Localhost: `http://localhost:8000`
- Se sua app rodará em outro servidor, adicione também:
  - `http://localhost:3000` (se usar porta 3000)
  - `https://seu-dominio.com` (se tiver domínio próprio)

## Passo 7: Configurar Google OAuth

1. Voltando à aba **"Provedores"**
2. Procure por **"Google"** (você verá um ícone do Google)
3. Se não estiver habilitado, clique nele e ative
4. Configure o **"Nome de exibição do projeto"** (seu nome)
5. Configure o **Email de suporte** (seu email)
6. Salve as alterações

## Passo 8: Pronto!

Seu Firebase está configurado. Agora:

1. Abra uma janela do terminal/CMD
2. Vá até a pasta Tecfind:
   ```bash
   cd "C:\Users\lucivaldo.oliveira\Desktop\Tecfind"
   ```
3. Digite:
   ```bash
   python server.py
   ```
4. Abra o navegador em: **http://localhost:8000**
5. Clique em "Entrar com Google"
6. **O erro deve desaparecer!**

---

## Se Ainda Não Encontrou?

Compartilhe uma screenshot mostrando:
1. Qual aba você vê na tela
2. O que está escrito no Firebase Console

Isso vai facilitar para eu ajudar!

## Alternativa: Usar Replit (Mais Fácil)

Se estiver muito confuso, você pode:

1. Abrir: https://replit.com
2. Criar uma conta grátis
3. Fazer upload dos arquivos da Tecfind
4. Replit cria um servidor automaticamente
5. A URL será algo como: `https://seu-nome-replit.replit.dev`
6. Adicionar essa URL no Firebase

Quer instruções de como fazer upload no Replit?
