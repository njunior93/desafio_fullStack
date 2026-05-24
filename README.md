# 📅 Sistema de Gerenciamento de Voluntários
---

# 🧰 Tecnologias Utilizadas

## Frontend

- React
- Vite
- TypeScript
- React Query (TanStack Query)
- Axios
- Material UI

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

---

# 🛠 Funcionalidades

- Cadastro de voluntários
- Listagem de voluntários
- Filtro por:
  - nome
  - email
  - status
  - disponibilidade
- Edição de voluntário
- Soft delete
- Validação de formulário
- Tratamento de erros da API
- Feedback visual com toast
- Estados de loading e erro

---


# ✏️ Como Rodar o Projeto

## Backend

### Instalar dependências

```bash
pip install -r requirements.txt
```

### Rodar servidor

```bash
uvicorn app.main:app --reload
```

Backend disponível em:

```bash
http://localhost:8000
```

---

## Frontend

### Instalar dependências

```bash
pnpm install
```

### Rodar aplicação

```bash
pnpm dev
```

Frontend disponível em:

```bash
http://localhost:5173
```

---

# Configuração do .env

Criar um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:8000
```

---

# ⚡ Decisões Técnicas

## React Query

Foi utilizado React Query para:

- gerenciamento de cache
- controle de loading
- invalidação automática após mutações
- tratamento de estados assíncronos

## Material UI

Utilizado para acelerar o desenvolvimento da interface e manter consistência visual.

## Axios

Utilizado para centralizar e facilitar as requisições HTTP.

## Soft Delete

A exclusão de voluntários foi implementada utilizando alteração de status, preservando os dados no banco.
