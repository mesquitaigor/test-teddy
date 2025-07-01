# Etapa base para desenvolvimento
FROM node:20-alpine

# Instala ferramentas úteis (bash, git, etc)
RUN apk add --no-cache bash git

# Define diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependência para instalar mais rápido em rebuilds
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta padrão do Nx (ajuste conforme seu projeto)
EXPOSE 4200
EXPOSE 4201
EXPOSE 4202
EXPOSE 4203
EXPOSE 4204

# Comando para iniciar o shell em modo dev
CMD ["npx", "nx", "serve", "shell", "--host", "0.0.0.0"]