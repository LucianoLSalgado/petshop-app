# 🐾 Petshop App

> Projeto prático oficial do livro **React: Interfaces modernas e dinâmicas**, de Luciano Lopes Salgado e Anderson Iwanezuk Thaczuk.

Aplicação web desenvolvida como projeto final de acompanhamento do livro **React: Interfaces modernas e dinâmicas**. O repositório consolida toda a evolução apresentada ao longo da obra — partindo dos fundamentos de componentização, propriedades e hooks essenciais até uma arquitetura completa e escalável em produção com roteamento protegido, estado global, cache de requisições, formulários validados, painel administrativo e deploy em nuvem com Firebase.

---

## 📚 Jornada de Aprendizado no Projeto

Cada camada da arquitetura deste repositório reflete os conceitos construídos progressivamente nos capítulos do livro:

1. **Fundamentos, JSX e Componentização:** Estruturação inicial com Vite e criação dos primeiros componentes didáticos (`Counter`, `NameForm`, `TitleUpdater` em `src/components/demo/`) e elementos reutilizáveis de interface (`Button`, `Card`, `Input`, `Select`, `Textarea` em `src/components/ui/`).
2. **Hooks e Reatividade:** Uso de `useState`, `useEffect` e criação de *custom hooks* para encapsular regras de negócio e persistência local (`useLocalStorage`, `useAuth`, `usePosts`, `useCategories` em `src/hooks/`).
3. **Estilização Moderna e Layouts:** Composição visual híbrida combinando utilitários do Tailwind CSS v4 com componentes avançados do Material UI (MUI v9 e Data Grid), organizados em layouts públicos e administrativos (`MainLayout`, `AdminLayout`).
4. **Roteamento e Controle de Acesso:** Navegação SPA com React Router v8 (`src/app/routes.jsx`), incluindo rotas dinâmicas para posts e categorias, tratamento de rotas inválidas (`NotFound`) e proteção de área restrita (`ProtectedRoute`).
5. **Gerenciamento de Estado e Assincronismo:** Separação clara entre *client state* com Zustand (`src/stores/authStore.js`) e *server state* com TanStack Query v5 (`src/lib/react-query/queryClient.js`), garantindo cache inteligente e invalidação automática de dados.
6. **Formulários e Validação:** Construção de formulários performáticos e tipados com React Hook Form e esquemas de validação Yup (`PostForm` e `CategoryForm`).
7. **Integração Full Stack com Firebase e Deploy:** Persistência de dados no Cloud Firestore, autenticação com Firebase Auth, upload de capas no Cloud Storage (`src/lib/firebase/`) e publicação em produção via Firebase Hosting.

---

## 🚀 Tecnologias Utilizadas

A stack do projeto foi estruturada com ferramentas modernas do ecossistema React:

* **Core:** [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
* **Roteamento:** [React Router v8](https://reactrouter.com/) (rotas públicas, dinâmicas e protegidas)
* **Estilização & UI:** [Tailwind CSS v4](https://tailwindcss.com/), [Material UI (MUI v9 & X Data Grid)](https://mui.com/) e ícones [Lucide React](https://lucide.dev/)
* **Gerenciamento de Estado:** [Zustand](https://zustand-demo.pmnd.rs/) (estado global de autenticação) e [TanStack Query (React Query v5)](https://tanstack.com/query) (server state, cache e invalidação)
* **Formulários & Validação:** [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup)
* **Backend as a Service (BaaS):** [Firebase](https://firebase.google.com/) (Authentication, Cloud Firestore, Cloud Storage e Firebase Hosting)
* **Utilitários & Qualidade de Código:** `date-fns`, `sonner` (notificações toast), `clsx`, `tailwind-merge`, `prop-types`, ESLint e Prettier

---

## ✨ Funcionalidades

### Área Pública
* **Página Inicial (`Home`):** Listagem e destaque de conteúdos e publicações do petshop.
* **Navegação por Categorias (`Category`):** Filtragem dinâmica de postagens por categoria.
* **Leitura de Postagem (`Post`):** Visualização completa do artigo com imagem de capa (`PostCover`) e metadados.
* **Institucional (`About`) & Página 404 (`NotFound`):** Páginas informativas e tratamento de rotas inexistentes.
* **Componentes Didáticos (`demo`):** Exemplos práticos introduzidos nos primeiros capítulos (`Counter`, `NameForm`, `TitleUpdater`, `useLocalStorage`).

### Área Administrativa (Protegida)
* **Autenticação (`Login` & `ProtectedRoute`):** Controle de acesso via Firebase Authentication persistido com Zustand.
* **Gestão de Postagens (`AdminPosts` & `PostForm`):** Listagem em tabela interativa (`@mui/x-data-grid`), criação, edição e exclusão de postagens com upload de imagens de capa no Firebase Storage.
* **Gestão de Categorias (`AdminCategories` & `CategoryForm`):** CRUD completo para organização das categorias do portal.

---

## 📁 Arquitetura do Projeto

O código-fonte dentro de `src/` segue uma organização modular baseada em responsabilidades e *barrel exports* (`index.js`):

```text
src/
├── app/                  # Configuração central da aplicação (App, Providers e Rotas)
├── assets/               # Imagens estáticas e folhas de estilo auxiliares
├── components/
│   ├── auth/             # Componentes de controle de acesso (ProtectedRoute)
│   ├── demo/             # Componentes didáticos dos capítulos iniciais
│   ├── layout/           # Estruturas de página (MainLayout, AdminLayout, Header, Footer)
│   ├── posts/            # Componentes específicos de domínio (PostCover)
│   └── ui/               # Design System reutilizável (Button, Card, Input, Select, Textarea, Counter)
├── hooks/                # Custom hooks (useAuth, usePosts, useCategories, useLocalStorage)
├── lib/
│   ├── firebase/         # Configuração e serviços do Firebase (auth, firestore, storage)
│   ├── react-query/      # Instância e configurações do QueryClient
│   └── utils.js          # Funções utilitárias (formatação, classes CSS)
├── pages/                # Páginas públicas e administrativas da aplicação
├── stores/               # Stores globais com Zustand (authStore)
├── App.css             # Estilos específicos do componente raiz
├── index.css             # Configuração global de estilos e Tailwind CSS
└── main.jsx              # Ponto de entrada da aplicação React
```

---

## 🛠️ Pré-requisitos e Instalação

Certifique-se de ter o **Node.js** e o **pnpm** instalados em sua máquina.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/LucianoLSalgado/petshop-app.git](https://github.com/LucianoLSalgado/petshop-app.git)
   cd petshop-app
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com as credenciais do seu projeto Firebase (utilizadas em `src/lib/firebase/config.js`):
   ```env
   VITE_FIREBASE_API_KEY=sua_api_key
   VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   VITE_FIREBASE_APP_ID=seu_app_id
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `pnpm dev` | Inicia o servidor local de desenvolvimento com Vite |
| `pnpm build` | Gera a versão otimizada para produção na pasta `dist/` |
| `pnpm preview` | Visualiza localmente o build de produção |
| `pnpm lint` | Executa o ESLint verificando regras e avisos |
| `pnpm format` | Formata o código-fonte em `src/` utilizando o Prettier |
| `pnpm deploy:web` | Executa lint, build e realiza o deploy no Firebase Hosting |

---

## 👨‍💻 Autor

**Luciano Lopes Salgado** — Autor do livro *React: Interfaces modernas e dinâmicas*.