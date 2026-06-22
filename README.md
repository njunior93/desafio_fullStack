# 📅 Sistema de Gerenciamento de Voluntários

Aplicação Fullstack para gerenciamento de voluntários desenvolvida com React + FastAPI.

---

# 🧰 Tecnologias Utilizadas

<div align="left">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-red?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge)
![Uvicorn](https://img.shields.io/badge/Uvicorn-111111?style=for-the-badge)

</div>

<br>

## 🎨 Frontend

- ⚛️ React
- ⚡ Vite
- 🔷 TypeScript
- 🔄 React Query (TanStack Query)
- 🌐 Axios
- 🎨 Material UI

---

- 🚀 FastAPI
- 🗃 SQLAlchemy
- 💾 SQLite
- ✅ Pydantic

---

# 🛠 Funcionalidades

- ✅ Cadastro de voluntários
- 📋 Listagem de voluntários
- 🔎 Filtro por:
  - nome
  - email
  - status
  - disponibilidade
- ✏️ Edição de voluntário
- ❌ Soft delete
- ✔️ Validação de formulário
- ⚠️ Tratamento de erros da API
- 🔔 Feedback visual com toast
- ⏳ Estados de loading e erro

## 📎 Links

🔗 Backend: [Link para o Back End](https://github.com/njunior93/desafio-FullStack-BackEnd.git)
🔗 Deploy: [Link para o Deploy da aplicação](https://crud-gerenciamento-voluntarios.vercel.app/)

# ✏️ Como Rodar o Projeto

## 🚀 Backend

### 📦 Instalar dependências

```bash
pip install -r requirements.txt
```

### ▶️ Rodar servidor

```bash
uvicorn app.main:app --reload
```

Backend disponível em:

```bash
http://localhost:8000
```

---

## ⚛️ Frontend

### 📦 Instalar dependências

```bash
pnpm install
```

### ▶️ Rodar aplicação

```bash
pnpm dev
```

Frontend disponível em:

```bash
http://localhost:5173
```

---

# 🔐 Configuração do .env

Criar um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:8000
```

---

# ⚡ Decisões Técnicas

## 🔄 React Query

Foi utilizado React Query para:

- gerenciamento de cache
- controle de loading
- invalidação automática após mutações
- tratamento de estados assíncronos

---

## 🎨 Material UI

Utilizado para acelerar o desenvolvimento da interface e manter consistência visual.

---

## 🌐 Axios

Utilizado para centralizar e facilitar as requisições HTTP.

---

## ❌ Soft Delete

A exclusão de voluntários foi implementada utilizando alteração de status, preservando os dados no banco.
