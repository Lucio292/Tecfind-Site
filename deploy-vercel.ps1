#!/usr/bin/env pwsh
# Script Automático para Deploy Tecfind no Vercel
# Este script automatiza: clone, configuração Git e push

param(
    [string]$GitHubURL = "",
    [string]$GitEmail = "",
    [string]$GitName = ""
)

# Cores para output
$GREEN = "`e[32m"
$YELLOW = "`e[33m"
$RED = "`e[31m"
$RESET = "`e[0m"

Write-Host @"
╔════════════════════════════════════════════════════════════╗
║     Script Automático - Tecfind no Vercel Deploy          ║
╚════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Green

# Verificar Git
Write-Host "`n${YELLOW}▶ Verificando Git...${RESET}"
git --version | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "${RED}✗ Git não encontrado!${RESET}"
    Write-Host "Baixe em: https://git-scm.com/download/win"
    exit 1
}
Write-Host "${GREEN}✓ Git encontrado!${RESET}"

# Pedir informações se não fornecidas
if (-not $GitHubURL) {
    Write-Host "`n${YELLOW}▶ Preciso de algumas informações:${RESET}"
    $GitHubURL = Read-Host "  URL do seu repositório GitHub (ex: https://github.com/seu-usuario/tecfind.git)"
    $GitEmail = Read-Host "  Seu email (ex: seu-email@gmail.com)"
    $GitName = Read-Host "  Seu nome (ex: Seu Nome)"
}

# Configurar Git globalmente
Write-Host "`n${YELLOW}▶ Configurando Git...${RESET}"
git config --global user.email $GitEmail
git config --global user.name $GitName
Write-Host "${GREEN}✓ Git configurado!${RESET}"

# Definir pastas
$DesktopPath = [Environment]::GetFolderPath("Desktop")
$OriginalTecfindPath = Join-Path $DesktopPath "Tecfind"
$TecfindRepoPath = Join-Path $DesktopPath "tecfind"

# Verificar se pasta original existe
if (-not (Test-Path $OriginalTecfindPath)) {
    Write-Host "${RED}✗ Pasta Tecfind não encontrada em: ${OriginalTecfindPath}${RESET}"
    exit 1
}

Write-Host "${GREEN}✓ Pasta Tecfind encontrada!${RESET}"

# Limpar pasta tecfind se existir
if (Test-Path $TecfindRepoPath) {
    Write-Host "`n${YELLOW}▶ Removendo pasta anterior...${RESET}"
    Remove-Item -Path $TecfindRepoPath -Recurse -Force
    Write-Host "${GREEN}✓ Pasta limpa!${RESET}"
}

# Clonar repositório
Write-Host "`n${YELLOW}▶ Clonando repositório GitHub...${RESET}"
Set-Location $DesktopPath
git clone $GitHubURL
if ($LASTEXITCODE -ne 0) {
    Write-Host "${RED}✗ Erro ao clonar repositório!${RESET}"
    Write-Host "Verifique se a URL está correta ou se você tem permissão"
    exit 1
}
Write-Host "${GREEN}✓ Repositório clonado!${RESET}"

# Copiar arquivos
Write-Host "`n${YELLOW}▶ Copiando arquivos da aplicação...${RESET}"
$filesToCopy = @(
    "index.html",
    "style.css",
    "script.js",
    "service-colors.css",
    "initializer-servidor.bat",
    "server.py",
    "images"
)

$filesToCopy += Get-ChildItem -Path $OriginalTecfindPath -Filter "*.md" | Select-Object -ExpandProperty Name

foreach ($file in $filesToCopy) {
    $sourcePath = Join-Path $OriginalTecfindPath $file
    $destPath = Join-Path $TecfindRepoPath $file
    
    if (Test-Path $sourcePath) {
        if ((Get-Item $sourcePath) -is [System.IO.DirectoryInfo]) {
            Copy-Item -Path $sourcePath -Destination $destPath -Recurse -Force
        } else {
            Copy-Item -Path $sourcePath -Destination $destPath -Force
        }
        Write-Host "  ${GREEN}✓${RESET} $file"
    }
}

# Adicionar arquivos ao Git
Write-Host "`n${YELLOW}▶ Preparando commit...${RESET}"
Set-Location $TecfindRepoPath
git add .
Write-Host "${GREEN}✓ Arquivos adicionados!${RESET}"

# Fazer commit
Write-Host "`n${YELLOW}▶ Fazendo commit...${RESET}"
git commit -m "Deployment Tecfind - Pronto para produção"
if ($LASTEXITCODE -ne 0) {
    Write-Host "${RED}✗ Erro ao fazer commit!${RESET}"
    exit 1
}
Write-Host "${GREEN}✓ Commit realizado!${RESET}"

# Fazer push
Write-Host "`n${YELLOW}▶ Enviando para GitHub (git push)...${RESET}"
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "${RED}✗ Erro ao fazer push!${RESET}"
    Write-Host "Possíveis soluções:"
    Write-Host "  1. Verifique suas credenciais do GitHub"
    Write-Host "  2. Use um token pessoal: https://github.com/settings/tokens"
    exit 1
}
Write-Host "${GREEN}✓ Push realizado com sucesso!${RESET}"

# Resumo final
Write-Host @"

╔════════════════════════════════════════════════════════════╗
║                   ✓ PRÓXIMOS PASSOS                       ║
╚════════════════════════════════════════════════════════════╝

${GREEN}1. Você já tem conta Vercel?${RESET}
   Se não, crie em: https://vercel.com (use GitHub)

${GREEN}2. Dashboard do Vercel:${RESET}
   Clique em "Add New..." → "Project"
   Selecione "tecfind" (seu repositório)
   Clique "Import" → "Deploy"

${GREEN}3. Copie a URL gerada${RESET}
   Será algo como: https://tecfind-xxxxx.vercel.app

${GREEN}4. Configure Firebase:${RESET}
   Console Firebase → Authentication → Método de login → Google
   Adicione sua URL em "URIs de redirecionamento autorizados"

${GREEN}5. Pronto!${RESET}
   Seu site estará online em: https://tecfind-xxxxx.vercel.app

═══════════════════════════════════════════════════════════════
Arquivos estão em: $TecfindRepoPath
═══════════════════════════════════════════════════════════════
"@ -ForegroundColor Green

Write-Host "`n${YELLOW}Pressione qualquer tecla para sair...${RESET}"
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
