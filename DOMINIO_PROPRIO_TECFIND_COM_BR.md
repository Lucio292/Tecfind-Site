# Como Colocar www.tecfind.com.br no Ar - Guia Completo

## 📋 Resumo do Que Você Precisa

1. ✅ Site já no Vercel (já fez isso)
2. ⏳ **Comprar domínio `tecfind.com.br`** ← NOVO
3. ⏳ **Configurar DNS para apontar ao Vercel**
4. ✅ Pronto! Seu site roda em `www.tecfind.com.br`

---

## 💰 PASSO 1: Comprar Domínio

### Opção 1: Registrar de Domínios Brasileiros (RECOMENDADO)

**Melhores opções:**
- **Registro.br** (oficial) - www.registro.br
- **Namecheap** - www.namecheap.com (mais barato)
- **GoDaddy** - www.godaddy.com (bem conhecido)
- **HostGator** - www.hostgator.com.br (Brasil)

### Passo para Comprar:

1. **Acesse um dos sites acima**
2. **Procure por: "Registrar domínio" ou "Domain Registry"**
3. **Procure por: `tecfind.com.br`**
4. **Se estiver disponível, clique em "Adicionar/Adiciona ao carrinho"**
5. **Escolha prazo: 1 ano (mais barato para começar)**
6. **Faça checkout com seu cartão de crédito**
7. **Receberá confirmação por email**

**Custo:** R$ 50-100 por ano (varia por registrador)

---

## 🔗 PASSO 2: Conectar Domínio ao Vercel

### Opção A: Vercel Gerencia o Domínio (MAIS FÁCIL)

Se você comprou no **Namecheap, GoDaddy ou Vercel**:

1. **Vercel Dashboard** → seu projeto `tecfind`
2. **Clique em "Settings"**
3. **Na esquerda, clique em "Domains"**
4. **Clique em "Add Domain"**
5. **Digite:** `tecfind.com.br`
6. **Clique em "Add"**
7. **Vercel vai te dar opções:**
   - **"Use Vercel Nameservers"** ← Escolha isso (mais fácil)
8. **Copie os 4 nameservers que aparecem**

### Passo no Registrador de Domínio

1. **Acesse a conta do registrador** (Namecheap, GoDaddy, etc)
2. **Procure por: "DNS", "Nameservers" ou "Domain Management"**
3. **Selecione: "Custom Nameservers"** ou "Usar nameservers customizados"
4. **Cole os 4 nameservers do Vercel:**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ```
5. **Salve as alterações**

⏳ **Aguarde 24-48 horas** para propagação do DNS (às vezes é instantâneo)

---

### Opção B: Configuração Manual de DNS

Se o registrador não permite trocar para nameservers do Vercel:

1. **No Vercel Dashboard → Domains**
2. **Lado direito, clique em "Configure"** (próximo ao domínio)
3. **Escolha a opção que diz: "Edit Nameservers"** ou **"A Record"**
4. Vercel vai te dar valores como:
   ```
   Tipo: A
   Host: @
   IP: 76.76.19.165
   
   Tipo: CNAME
   Host: www
   Valor: cname.vercel-dns.com
   ```

5. **Copie esses valores**
6. **No painel do seu registrador**, adicione esses registros:
   - Vá em "DNS Records" ou "Zone File"
   - Adicione um registro tipo "A" com o IP
   - Adicione um registro tipo "CNAME" para "www"
7. **Salve**

⏳ **Aguarde 24-48 horas**

---

## ✅ PASSO 3: Verificar se Funcionou

### Teste 1: Verificar Propagação

1. **Abra:** https://www.whatsmydns.net/
2. **Digite:** `tecfind.com.br`
3. **Verifique se aparecem os nameservers do Vercel**
4. **Se aparecer verde (PASS), está correto!**

### Teste 2: Acessar o Site

1. **Abra seu navegador**
2. **Digite:** `www.tecfind.com.br` ← Deve abrir seu site! 🎉
3. **Ou:** `tecfind.com.br` (sem www)

---

## 🔐 PASSO 4: Configurar SSL (Certificado Seguro)

O Vercel faz isso **automaticamente**! 🎉

- Seu site vai aparecer com **cadeado 🔒** (HTTPS)
- Certificado renovado automaticamente
- Sem custo adicional

---

## 🚀 Seu Site Está PRONTO!

Agora seu site está:

✅ **Em:** `https://www.tecfind.com.br`
✅ **Com domínio profissional**
✅ **Com HTTPS (seguro)**
✅ **Com login Google funcionando**
✅ **Com banco de dados funcionando**
✅ **Acessível 24/7**

---

## 💰 Custo Total

- **Domínio:** R$ 50-100/ano
- **Hosting (Vercel):** Grátis
- **SSL/Certificado:** Grátis
- **Database (Firestore):** Grátis (primeiros 1M leituras)

**Total:** ~R$ 50-100/ano ✅

---

## 🆘 Problemas Comuns

### "Domínio não está funcionando"
1. Aguarde 24-48h para propagação do DNS
2. Verifique em: https://www.whatsmydns.net/
3. Se após 48h não funcionar, verifique os nameservers no registrador

### "Erro de certificado SSL"
1. Espere 5-10 minutos (Vercel gera automaticamente)
2. Limpe cache do navegador (Ctrl + Shift + Del)
3. Tente em outro navegador

### "Site abre mas mostra erro 404"
1. Verifique que arquivo `index.html` está no Vercel
2. Faça novo push para GitHub (trigger novo deploy)
3. Aguarde Vercel fazer novo build

### "Domínio registrado mas não conectou"
1. Confirme nameservers no registrador
2. Se não conseguir trocar, use A Record/CNAME (Opção B)
3. Aguarde propagação (pode levar até 48h)

---

## 📊 Timeline Típico

| Ação | Tempo |
|------|-------|
| Comprar domínio | 5 min |
| Configurar no Vercel | 5 min |
| Adicionar nameservers | 5 min |
| Propagação DNS | 5 min - 48h |
| **Total** | **até 48h** |

---

## 🎯 Próximos Passos

1. ✅ Escolha um registrador (Namecheap, GoDaddy, etc)
2. ✅ Compre o domínio `tecfind.com.br`
3. ✅ Configure os nameservers conforme acima
4. ✅ Aguarde propagação
5. ✅ Acesse `www.tecfind.com.br` ✨

---

## 📞 Precisa de Ajuda?

Se tiver dúvida:

1. **Qual registrador está usando?** (Namecheap, GoDaddy, etc)
2. **Já comprou o domínio?**
3. **Consegue encontrar o painel de DNS?**

Manda screenshot que ajudo! 👍

---

## 💡 Alternativa: Domínio Grátis (Menos Profissional)

Se não quiser gastar agora:

1. **Freenom.com** - domínios grátis (`.tk`, `.ml`, etc)
2. Menos profissional mas funciona
3. Mesma configuração do Vercel

⚠️ **NÃO recomendo para negócio**, mas é opção!

---

**Seu site está pronto para o domínio profissional! 🚀**
