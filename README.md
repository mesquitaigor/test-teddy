# 🧸 Teddy - Sistema de Gerenciamento de Clientes

Sistema web desenvolvido com **micro-frontends** para o teste técnico da Teddy, implementando funcionalidades completas de cadastro, listagem, seleção e gerenciamento de clientes com arquitetura moderna e escalável.

![Angular](https://img.shields.io/badge/Angular-20.0-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)
![Nx](https://img.shields.io/badge/Nx-21.2-lightblue?style=flat-square&logo=nx)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de **Front-End Pleno** na Teddy. A aplicação implementa um sistema completo de gerenciamento de clientes com as seguintes funcionalidades:

- **Tela de identificação**: Usuário insere seu nome para acessar o sistema
- **Dashboard de clientes**: Listagem completa com funcionalidades CRUD
- **Seleção de clientes**: Área dedicada para visualizar clientes selecionados
- **Design responsivo**: Interface adaptável para diferentes dispositivos

## 🏗️ Arquitetura

### Micro-Frontends
O projeto utiliza **Module Federation** do Webpack para implementar uma arquitetura de micro-frontends:

```
┌─────────────────┐
│      Shell      │ ← Host principal (porta 4200)
│   (Orquestrador)│
└─────┬───────────┘
      │
      ├── User Identification (porta 4202)
      ├── Clients Management (porta 4203)
      └── Selected Clients (porta 4204)
```

### Estrutura de Pastas
```
apps/
├── shell/                    # Aplicação host principal
├── user_identification/      # Micro-frontend de identificação
├── clients/                  # Micro-frontend de gerenciamento
├── selected_clients/         # Micro-frontend de selecionados
└── *-e2e/                   # Testes end-to-end para cada app

shared/
├── auth/                     # Biblioteca de autenticação
├── components/               # Componentes compartilhados (Design System)
└── domains/                  # Modelos e tipos compartilhados
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Docker** instalado no sistema
- **4GB RAM** disponível para os containers

### Execução com Docker (Recomendado)

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd test-teddy
```

2. **Construa a imagem Docker**:
```bash
docker build -t nx-dev .
```

3. **Execute o container**:
```bash
docker run -it --rm -p 4200:4200 -p 4202:4202 -p 4203:4203 -p 4204:4204 nx-dev
```

4. **Acesse a aplicação**:
   - **Shell (Principal)**: http://localhost:4200
   - **User Identification**: http://localhost:4202
   - **Clients Management**: http://localhost:4203
   - **Selected Clients**: http://localhost:4204

### Execução Local (Desenvolvimento)

Para desenvolvimento local, certifique-se de ter Node.js 20+ instalado:

```bash
# Instale as dependências
npm install

# Execute todos os micro-frontends simultaneamente
npx nx run-many -t serve -p shell,user_identification,clients,selected_clients

# Ou execute individualmente
npx nx serve shell
npx nx serve user_identification
npx nx serve clients
npx nx serve selected_clients
```

## 🛠️ Tecnologias e Ferramentas

### Core Stack
- **Angular 20.0**: Framework principal com standalone components
- **TypeScript 5.8**: Linguagem de desenvolvimento
- **Nx 21.2**: Monorepo e ferramentas de build
- **Module Federation**: Implementação de micro-frontends
- **SCSS**: Pré-processador CSS

### Bibliotecas Principais
- **RxJS**: Programação reativa
- **Maskito**: Máscaras para formulários
- **Angular Forms**: Formulários reativos

### Qualidade de Código
- **ESLint**: Linting de código
- **Prettier**: Formatação automática
- **Husky**: Git hooks
- **Angular ESLint**: Regras específicas do Angular

### Testes
- **Jest**: Testes unitários
- **Cypress**: Testes end-to-end
- **Testing Library**: Utilitários de teste

### DevOps
- **Docker**: Containerização
- **Webpack**: Bundle e Module Federation
- **Git**: Controle de versão com padrão de commits

## 🎨 Design System

O projeto implementa um design system compartilhado através da biblioteca `shared/components`, garantindo:
- **Consistência visual** entre todos os micro-frontends
- **Reutilização de componentes**
- **Manutenibilidade** do código
- **Padrões de UI/UX** unificados

## 🧪 Testes

### Testes Unitários
```bash
# Executar todos os testes
npx nx test

# Executar testes de um projeto específico
npx nx test shell
npx nx test clients
```

### Testes End-to-End
```bash
# Executar testes e2e
npx nx e2e shell-e2e
npx nx e2e clients-e2e
```

## 📊 Gerenciamento de Estado

A aplicação utiliza:
- **Services Angular** para gerenciamento de estado
- **RxJS** para streams de dados reativos
- **Compartilhamento via Module Federation** para estado global

## 📱 Responsividade

O projeto foi desenvolvido com **Mobile First** approach, utilizando:
- **CSS Grid** e **Flexbox** para layouts
- **Breakpoints** adaptativos
- **Componentes responsivos** no design system

## 📈 Performance

- **Lazy loading** de micro-frontends
- **Code splitting** automático via Module Federation
- **Tree shaking** para otimização de bundle
- **Caching** estratégico

## 🚢 Deploy

O projeto está configurado para deploy na **Vercel** com:
- Build automático via Nx
- Deploy independente de cada micro-frontend
- Configuração de rotas SPA

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm start                    # Inicia o shell principal
npx nx serve <app-name>     # Inicia um micro-frontend específico

# Build
npx nx build <app-name>     # Build de produção
npx nx build --prod         # Build otimizado

# Testes
npx nx test                 # Testes unitários
npx nx e2e <app-name>-e2e   # Testes end-to-end

# Linting
npx nx lint                 # Verificação de código
npx nx format               # Formatação automática

# Visualização
npx nx graph                # Gráfico de dependências
```

## 👥 Padrões de Commit

O projeto segue a convenção **Conventional Commits**:
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração
test: adiciona ou corrige testes
chore: tarefas de manutenção
```

## 📖 Decisões Técnicas

### Por que Nx?
- **Monorepo** facilita o compartilhamento de código
- **Ferramentas integradas** para build, test e lint
- **Dependency graph** para otimização de builds
- **Generators** para padronização de código

### Por que Module Federation?
- **True micro-frontends** com deploy independente
- **Runtime composition** para máxima flexibilidade
- **Shared dependencies** para otimização
- **Isolation** entre aplicações

### Por que Angular 20?
- **Standalone components** para melhor tree-shaking
- **Signals** para reatividade otimizada
- **Control flow syntax** para templates mais limpos
- **Performance** melhorada significativamente

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se o Docker está rodando
2. Confirme se todas as portas estão disponíveis
3. Execute `docker logs <container-id>` para debug

---

**Desenvolvido por Igor Maranhão** para o teste técnico da Teddy 🧸
