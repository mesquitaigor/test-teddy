# Script PowerShell para configurar URLs dos microfrontends

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("dev", "prod")]
    [string]$Environment
)

if ($Environment -eq "dev") {
    Write-Host "Configurando para desenvolvimento local..." -ForegroundColor Green
    $UserIdUrl = "http://localhost:4201"
} elseif ($Environment -eq "prod") {
    Write-Host "Configurando para produção..." -ForegroundColor Green
    $UserIdUrl = Read-Host "Digite a URL do microfrontend user_identification"
}

$ShellConfigPath = "apps/shell/module-federation.config.ts"
$WebpackProdPath = "apps/shell/webpack.prod.config.ts"

# Ler e atualizar module-federation.config.ts
$content = Get-Content $ShellConfigPath -Raw
$content = $content -replace "('user_identification', ').*(')", "`$1$UserIdUrl`$2"
Set-Content $ShellConfigPath $content

# Ler e atualizar webpack.prod.config.ts
$content = Get-Content $WebpackProdPath -Raw
$content = $content -replace "('user_identification', ').*(')", "`$1$UserIdUrl`$2"
Set-Content $WebpackProdPath $content

Write-Host "URLs atualizadas para: $UserIdUrl" -ForegroundColor Yellow

# Exemplo de uso:
# .\scripts\configure-urls.ps1 -Environment dev
# .\scripts\configure-urls.ps1 -Environment prod
