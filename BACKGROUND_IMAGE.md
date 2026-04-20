# 🖼️ Configuração da Imagem de Fundo TECFIND

## Instruções para Adicionar a Imagem de Fundo

### 1. **Salve a imagem enviada com o nome exato:**
```
Nome do arquivo: tecfind-background.jpg
Localização: c:\Users\lucivaldo.oliveira\Desktop\Tecfind\images\
```

### 2. **Estrutura de pastas esperada:**
```
Tecfind/
├── index.html
├── style.css
├── script.js
├── service-colors.css
├── images/
│   ├── tecfind-background.jpg      ← COLOQUE AQUI A IMAGEM
│   ├── servidor-rede.jpg
│   ├── router-wifi.jpg
│   └── camera-seguranca.jpg
```

## ✅ O que foi configurado no CSS:

- **Overlay profissional escuro** com gradiente (opacidade 93-95%)
- **Imagem como background fixo** - não move ao rolar
- **Responsividade automática** - adapta a qualquer tela
- **Profissionalismo máximo** - texto legível sobre a imagem

## 🎨 Resultado visual:

A imagem da TECFIND (com os roteadores e Wi-Fi Mesh) aparecerá como fundo elegante de toda a página, com um overlay semi-transparente escuro para garantir que o texto permaneça perfeitamente legível.

## 📍 Arquivo CSS modificado:

O arquivo `style.css` já foi atualizado com:
```css
background-image: 
    linear-gradient(135deg, rgba(29, 53, 87, 0.95) 0%, rgba(102, 102, 153, 0.93) 100%),
    url('images/tecfind-background.jpg');
background-attachment: fixed;
background-size: cover;
background-position: center;
```

---

**Após salvar a imagem, a página terá um visual profissional único! 🚀**

Se a imagem não aparecer, verifique:
- ✓ Arquivo está em `images/tecfind-background.jpg`
- ✓ Nenhuma alteração no nome
- ✓ Formato JPG está correto
