# 📸 Guia de Imagens - Tecfind

## Como Adicionar Suas Imagens

As imagens que você anexou precisam ser salvas nesta pasta (`/images/`) para aparecer no site.

### 📋 Imagens Necessárias

1. **servidor-rede.jpg** - Servidor de rede/infraestrutura TI
   - Dimensões recomendadas: 400x250px ou maior
   - Formato: JPG, PNG ou WebP
   - Local: `/images/servidor-rede.jpg`

2. **router-wifi.jpg** - Router/dispositivo WiFi
   - Dimensões recomendadas: 400x250px ou maior
   - Formato: JPG, PNG ou WebP
   - Local: `/images/router-wifi.jpg`

3. **camera-seguranca.jpg** - Câmera de segurança/CCTV
   - Dimensões recomendadas: 400x250px ou maior
   - Formato: JPG, PNG ou WebP
   - Local: `/images/camera-seguranca.jpg`

---

## ✅ Passo a Passo

### 1. Salve as Imagens Anexadas

- Você recebeu 3 imagens anexadas
- Salve cada uma com o nome correto acima
- Coloque na pasta: `Tecfind/images/`

### 2. Verifique os Nomes

```
📂 Tecfind/
└── 📂 images/
    ├── 📄 servidor-rede.jpg
    ├── 📄 router-wifi.jpg
    └── 📄 camera-seguranca.jpg
```

### 3. Teste Localmente

- Abra `http://localhost:8000` (ou seu servidor local)
- As imagens devem aparecer na seção de boas-vindas automaticamente

---

## 🎨 Personalizações Possíveis

### Mudar Título ou Descrição

Edite o arquivo [index.html](../index.html) e procure por:

```html
<div class="gallery-item">
    <img src="images/servidor-rede.jpg" alt="Servidor de Rede">
    <div class="gallery-item-text">
        <h3>🖥️ Serviços de TI</h3>
        <p>Infraestrutura, redes e setup de servidores profissionais.</p>
    </div>
</div>
```

### Adicionar Mais Imagens

1. Salve a nova imagem em `/images/`
2. Copie um `gallery-item` no HTML
3. Mude o `src` e o texto

### Alterar Tamanhos

Edite [style.css](../style.css) e procure por:

```css
.gallery-item img {
    width: 100%;
    height: 250px;  /* ← Mude aqui */
    object-fit: cover;
}
```

---

## 🔄 Alternativa: URLs da Web

Se não quiser salvar imagens localmente, pode usar URLs externas:

```html
<img src="https://via.placeholder.com/400x250/667eea/ffffff?text=Sua+Imagem">
```

Ou use bibliotecas de imagens gratuitas:
- [Unsplash](https://unsplash.com)
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)

---

## 📸 Como Otimizar Imagens

Para melhor performance, otimize suas imagens:

```bash
# Converter para WebP (mais compacto)
imagemagick convert servidor-rede.jpg -quality 80 servidor-rede.webp

# Redimensionar
imagemagick convert servidor-rede.jpg -resize 400x250 servidor-rede-small.jpg
```

---

## ✨ Resultado Final

Quando tudo estiver pronto, você verá na seção de login:

```
┌────────────────────────────────────┐
│   🖥️ Serviços de TI                 │
│   [Imagem do Servidor]              │
│   Infraestrutura, redes...          │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│   📡 Conectividade                  │
│   [Imagem do Router]                │
│   Instalação e manutenção...        │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│   🎥 Segurança                      │
│   [Imagem da Câmera]                │
│   Sistemas de vigilância...         │
└────────────────────────────────────┘
```

---

## 🆘 Troubleshooting

### "Imagens não aparecem"
✓ Verifique se os nomes dos arquivos estão corretos
✓ Confirme que estão em `/images/`
✓ Verifique a extensão (.jpg, .png, etc)
✓ Abra Console (F12) para ver erros

### "Aparecem imagens placeholder"
✓ Os arquivos não foram encontrados
✓ Use URLs externas como fallback
✓ Salve as imagens no local correto

### "Imagens estão pixeladas"
✓ Use imagens com resolução de pelo menos 400x250px
✓ Use formato WebP para melhor qualidade
✓ Aumente o tamanho no CSS se necessário

---

## 💾 Estrutura de Arquivos Final

```
📂 Tecfind/
├── 📄 index.html
├── 🎨 style.css
├── 🔧 script.js
├── 📂 images/                    ← Pasta de imagens
│   ├── servidor-rede.jpg
│   ├── router-wifi.jpg
│   └── camera-seguranca.jpg
└── (outros arquivos...)
```

---

**Pronto! Suas imagens estarão belas no site!** 📸✨

Salve os 3 arquivos anexados nesta pasta com os nomes coretos e elas aparecerão automaticamente.
