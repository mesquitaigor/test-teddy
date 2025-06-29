#!/bin/bash

# Script para configurar URLs dos microfrontends para diferentes ambientes

if [ "$1" = "dev" ]; then
    echo "Configurando para desenvolvimento local..."
    USER_ID_URL="http://localhost:4201"
elif [ "$1" = "prod" ]; then
    echo "Configurando para produção..."
    read -p "Digite a URL do microfrontend user_identification: " USER_ID_URL
else
    echo "Uso: $0 [dev|prod]"
    echo "  dev  - URLs locais"
    echo "  prod - URLs de produção"
    exit 1
fi

# Atualizar module-federation.config.ts
sed -i "s|'user_identification', '.*'|'user_identification', '$USER_ID_URL'|g" apps/shell/module-federation.config.ts

# Atualizar webpack.prod.config.ts
sed -i "s|'user_identification', '.*'|'user_identification', '$USER_ID_URL'|g" apps/shell/webpack.prod.config.ts

echo "URLs atualizadas para: $USER_ID_URL"
