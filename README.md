# 📦 Sistema de Inventário Completo

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.8-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-16.1.5-red.svg)](https://angular.io/)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)

## 🎯 Visão Geral

Sistema completo de gerenciamento de inventário com arquitetura full-stack:
- **Backend**: API REST em Spring Boot com Java 17
- **Frontend**: Interface web em Angular 16 com TypeScript
- **Banco de Dados**: MySQL 8.0
- **Funcionalidades**: CRUD de categorias e produtos, upload de imagens, exportação Excel

## 🏗️ Arquitetura do Projeto

```
ProjetoEstoque/
├── Inventario/                    # Backend (Spring Boot)
│   ├── src/main/java/            # Código fonte Java
│   ├── src/test/java/            # Testes unitários
│   ├── pom.xml                   # Dependências Maven
│   └── README.md                 # Documentação do backend
├── front-invetory/              # Frontend (Angular)
│   ├── src/app/                  # Código fonte Angular
│   ├── package.json             # Dependências Node.js
│   └── README.md                # Documentação do frontend
└── README.md                    # Este arquivo
```

## ✨ Funcionalidades

### 🏷️ Gestão de Categorias
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Interface web responsiva
- ✅ Validações de dados
- ✅ Exportação para Excel

### 📦 Gestão de Produtos
- ✅ CRUD completo com upload de imagens
- ✅ Compressão automática de imagens (ZLib)
- ✅ Validação de tamanho (máx. 10MB) e tipo de arquivo
- ✅ Busca por nome (case-insensitive)
- ✅ Associação com categorias
- ✅ Exportação para Excel

### 🎨 Interface Web
- ✅ Dashboard responsivo
- ✅ Navegação intuitiva
- ✅ Formulários de cadastro
- ✅ Listagem com filtros
- ✅ Confirmações de exclusão

## 🚀 Tecnologias Utilizadas

### Backend (Spring Boot)
- **Java 17** - Linguagem de programação
- **Spring Boot 3.4.8** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **Spring Web** - APIs REST
- **MySQL 8.0** - Banco de dados
- **Maven** - Gerenciamento de dependências
- **JUnit 5** - Testes unitários
- **Apache POI** - Exportação Excel
- **Lombok** - Redução de boilerplate

### Frontend (Angular)
- **Angular 16.1.5** - Framework principal
- **TypeScript 4.9.5** - Linguagem de programação
- **Angular Material** - Componentes UI
- **RxJS** - Programação reativa
- **Angular CLI** - Ferramentas de desenvolvimento

## 📋 Pré-requisitos

### Para o Backend
- Java 17 ou superior
- Maven 3.8+
- MySQL 8.0+

### Para o Frontend
- Node.js 16+ 
- npm 8+
- Angular CLI 16+

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/Adson-C/ProjetoEstoque.git
cd ProjetoEstoque
```

### 2. Configuração do Backend

#### Configure o banco de dados
```sql
CREATE DATABASE db_inventario;
```

#### Configure as credenciais
Edite o arquivo `Inventario/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/db_inventario?useSSL=false&useLegacyDatetimeCode=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

#### Execute o backend
```bash
cd Inventario
mvn clean compile
mvn test
mvn spring-boot:run
```

O backend estará disponível em: `http://localhost:8081`

### 3. Configuração do Frontend

#### Instale as dependências
```bash
cd front-invetory
npm install
```

#### Execute o frontend
```bash
ng serve
```

O frontend estará disponível em: `http://localhost:4200`

## 📚 API Endpoints

### 🏷️ Categorias

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/categories` | Listar todas as categorias |
| `GET` | `/api/v1/categories/{id}` | Buscar categoria por ID |
| `POST` | `/api/v1/categories` | Criar nova categoria |
| `PUT` | `/api/v1/categories/{id}` | Atualizar categoria |
| `DELETE` | `/api/v1/categories/{id}` | Deletar categoria |
| `GET` | `/api/v1/categories/export/excel` | Exportar categorias para Excel |

### 📦 Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/products` | Listar todos os produtos |
| `GET` | `/api/v1/products/{id}` | Buscar produto por ID |
| `GET` | `/api/v1/products/filter/{name}` | Buscar produtos por nome |
| `POST` | `/api/v1/products` | Criar novo produto |
| `PUT` | `/api/v1/products/{id}` | Atualizar produto |
| `DELETE` | `/api/v1/products/{id}` | Deletar produto |
| `GET` | `/api/v1/products/export/excel` | Exportar produtos para Excel |

## 🎨 Interface Web

### Páginas Disponíveis
- **Dashboard** - Visão geral do sistema
- **Categorias** - Gerenciamento de categorias
- **Produtos** - Gerenciamento de produtos
- **Nova Categoria** - Formulário de cadastro
- **Novo Produto** - Formulário de cadastro

### Componentes
- **Sidenav** - Menu lateral de navegação
- **Confirm** - Modal de confirmação
- **Home** - Dashboard principal

## 🧪 Testes

### Backend
```bash
cd Inventario
mvn test
```

### Frontend
```bash
cd front-invetory
ng test
```

## 📊 Estrutura do Banco de Dados

### Tabela: categories
```sql
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
```

### Tabela: products
```sql
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    account INT NOT NULL,
    picture LONGBLOB,
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

## 🔧 Configurações Avançadas

### Compressão de Imagens
- Tamanho máximo: 10MB
- Tipos aceitos: image/*
- Compressão automática com ZLib

### Exportação Excel
- Formato: .xlsx
- Categorias: `result_category.xlsx`
- Produtos: `result_product.xlsx`

## 🚀 Deploy

### Docker (Recomendado)

#### Backend
```bash
cd Inventario
docker build -t inventario-backend .
docker run -p 8081:8081 inventario-backend
```

#### Frontend
```bash
cd front-invetory
ng build --prod
# Servir os arquivos da pasta dist/
```

## 📁 Estrutura de Branches

O projeto utiliza Git Flow com as seguintes branches:
- `main` - Branch principal (produção)
- `develop` - Branch de desenvolvimento
- `feature/login` - Funcionalidade de login
- `feature/category` - Funcionalidade de categorias
- `feature/product` - Funcionalidade de produtos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Adson Sa**
- GitHub: [@Adson-C](https://github.com/Adson-C)
- LinkedIn: [Adson Sa](https://linkedin.com/in/adson-sa)

## 🙏 Agradecimentos

- Spring Boot Team
- Angular Team
- Apache POI
- JUnit Team
- MySQL Community

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!** ⭐
