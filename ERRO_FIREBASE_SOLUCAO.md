# Erro de Login com Firebase - Solução

## Problema
Você está recebendo o erro:
```
Firebase: This operation is not supported in the environment this application is running on. 
"location.protocol" must be http, https or chrome-extension and web storage must be enabled.
```

## Causa
O Firebase requer que a aplicação rode em um protocolo seguro (`http://` ou `https://`). Se você estiver abrindo o arquivo HTML diretamente no navegador (com `file://`), o localStorage não funciona.

## Solução: Usar o Servidor Local

### Opção 1: Windows (Recomendado - Mais Fácil)
1. Vá até a pasta `Tecfind`
2. **Clique duas vezes em: `iniciar-servidor.bat`**
3. Uma janela de terminal abrirá
4. Abra seu navegador em: **http://localhost:8000**

### Opção 2: Terminal (Linux/Mac/Windows PowerShell)
```bash
# Navegue até a pasta Tecfind
cd "C:\Users\lucivaldo.oliveira\Desktop\Tecfind"

# Inicie o servidor Python
python server.py

# Ou, se usar Python 3 explicitamente:
python3 server.py
```

Depois abra: **http://localhost:8000** no navegador

### Opção 3: Usar um Servidor Online (Replit, Vercel, etc)
Se preferir, pode fazer deploy da aplicação em um serviço gratuito como:
- **Replit** (replit.com) - Mais fácil para iniciantes
- **Vercel** (vercel.com) - Para projetos mais robustos
- **Netlify** (netlify.com) - Alternativa a Vercel

## Testando o Login
1. Com o servidor rodando, acesse **http://localhost:8000**
2. Clique em "Entrar com Google"
3. O erro de Firebase deve desaparecer
4. Você será redirecionado para a página de login do Google

## Configuração do Firebase (Importante!)
Para que o Google Login funcione, você precisa:

1. **Configurar OAuth no Firebase Console:**
   - Acesse: https://console.firebase.google.com
   - Selecione seu projeto
   - Vá para **Autenticação > Provedores de login > Google**
   - Ative o provedor Google
   - Configure as URIs autorizadas:
     ```
     http://localhost:8000
     http://localhost:8000/index.html
     ```

2. **Se estiver em produção, adicione seu domínio:**
   - Exemplo: `https://seu-site.vercel.app`

## Erro Persiste?
Se continuar recebendo o erro:

1. **Limpe o cache do navegador:** Ctrl + Shift + Delete
2. **Abra no Modo Anônimo:** Ctrl + Shift + N
3. **Verifique o Console:** Pressione F12 e veja se há mais detalhes do erro
4. **Confirme que está em `http://` (não `file://`)**

## Adicionar à Exceção do Navegador (Se Necessário)
Se o navegador está bloqueando localStorage por política de privacidade:
- **Chrome:** Configurações > Privacidade > Cookies e dados de sites > Ver todos
- **Firefox:** about:preferences > Privacidade > Cookies e dados de sites

Certifique-se de que `localhost` está permitido.

## Próximos Passos
Após resolver o erro de login:
1. Configure corretamente as credenciais do Firebase (veja `AUTENTICACAO_GUIA.md`)
2. Teste o login com Google
3. Teste o login com WhatsApp
4. Valide que os dados são salvos no Firestore

**Suporte:** Se o problema persistir, compartilhe o erro exato do Console (F12) para debug.
