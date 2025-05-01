# Afrique AI Insight Frontend

## Technologies

- **React**  
- **axios** for HTTP calls
- **Vite**  
- **Zustand** (State Management)  for simple global state
- **React Query**  
- **React Router**  [new name is **TanStack Query**] for data fetching/caching 
- **ESLint** (Linting)

### VS Code Configuration

To ensure code formatting is consistent, use the following settings:

1. Open **settings.json**:  
   `Ctrl + Shift + P` → `settings.json` (User)  
2. Paste the following:

```json
"[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
"editor.formatOnPaste": true,
"editor.formatOnType": true,
"editor.formatOnSave": true,
"cSpell.language": "en, fr, ar",
```

### Use `pnpm` for better experience

To save disk space and improve performance, configure `pnpm` by running the following command:

```bash
pnpm config set virtual-store-dir-max-length 120
```

**Note:** Make sure to close the terminal or the editor after running the command.

---

## File Structure

Here’s the recommended folder structure for organizing your project:

```plaintext
📂 src
 ┣ 📂 components        # Reusable UI components across multiple pages
 ┣ 📂 model             # TypeScript types, interfaces, and data models
 ┣ 📂 pages             # Folder for each page, containing its own components
 ┃ ┃ ┣ 📂 home          # Example page folder
 ┃ ┃ ┃ ┣ 📂 components # Components specific to this page
 ┃ ┃ ┃ ┗ 📜 homePage.tsx  # Main page component
 ┣ 📂 state             # Global state management using Zustand
 ┣ 📂 utils             # Utility functions and helper modules
 ┣ 📜 main.tsx          # Entry point for the application
 ┣ 📜 App.tsx           # Root component
```

---

## Naming Conventions

### File and Folder Naming

1. **File Names**:
   - Use **camelCase** for component files and other files, except for **page components** which should use **PascalCase**.
   - Example:  
     - `homePage.tsx` (for page components)  
     - `buttonComponent.tsx` (for reusable components)

2. **Folder Names**:
   - **Use kebab-case** for folder names (lowercase and hyphenated).
   - Example:  
     - `src/pages/home`  
     - `src/components/button`

### Component Naming

1. **Component Files**:  
   - Use **PascalCase** for React component names.
   - Example:  
     - `HomePage.tsx`
     - `ButtonComponent.tsx`

2. **Hooks**:  
   - Use **camelCase** for custom hook names, prefixed with `use`.  
   - Example:  
     - `useFetchData.ts`

3. **State Variables**:  
   - Use **camelCase** for state variables, actions, and selectors in your Zustand store.
   - Example:  
     - `const [isLoading, setIsLoading] = useState(false);`

### Props and Variables

1. **Props**:  
   - Use **camelCase** for prop names.
   - Example:  
     - `<ButtonComponent onClick={handleClick} />`

2. **Variables**:  
   - Use **camelCase** for all variables and functions.
   - Example:  
     - `const userData = fetchUserData();`

### Constants

1. **Constants**:  
   - Use **UPPER_SNAKE_CASE** for constant variables and configurations.
   - Example:  
     - `const API_URL = 'https://api.example.com';`




new file structure or rather expanding on the old one :
```
news-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/
│   │   ├── axios.ts                 # Axios instance configuration
│   │   └── newsApi.ts               # API calls for news endpoints
│   ├── components/
│   │   ├── common/
│   │   │   ├── ErrorMessage.tsx     # Error display component
│   │   │   ├── Loading.tsx          # Loading indicator
│   │   │   └── Container.tsx        # Layout container
│   │   ├── news/
│   │   │   ├── NewsList.tsx         # List of news items
│   │   │   ├── NewsItem.tsx         # Individual news item
│   │   │   └── NewsDetails.tsx      # Detailed view of a news item
│   │   └── layout/
│   │       ├── Header.tsx           # App header
│   │       ├── Footer.tsx           # App footer
│   │       └── MainLayout.tsx       # Main layout wrapper
│   ├── hooks/
│   │   └── useNewsQuery.ts          # Custom hook for news queries
│   ├── pages/
│   │   ├── HomePage.tsx             # Home page showing news list
│   │   ├── NewsDetailPage.tsx       # Single news item page
│   │   └── ErrorPage.tsx            # Error page
│   ├── store/
│   │   ├── types.ts                 # Type definitions for store
│   │   └── newsStore.ts             # Zustand store for news
│   ├── types/
│   │   └── news.ts                  # TypeScript interfaces for news data
│   ├── utils/
│   │   └── formatDate.ts            # Utility functions
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # Entry point
│   ├── router.tsx                   # Router configuration
│   └── vite-env.d.ts               # Vite type declarations
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore file
├── index.html                      # HTML template
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
└── README.md                       # Project documentation
```



<!-- spring.application.name=news-service

spring.datasource.url=jdbc:postgresql://ep-broad-heart-a2v7pr2f-pooler.eu-central-1.aws.neon.tech:5432/neondb
#spring.datasource.url=jdbc:postgresql://ep-late-tooth-a24mlw9d-pooler.eu-central-1.aws.neon.tech/neondb _____my db____
spring.datasource.username=neondb_owner
spring.datasource.password=npg_M1HBdo3TmapX

# Required for Neon
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Prevent modifications
spring.jpa.hibernate.ddl-auto=create
spring.jpa.properties.hibernate.show_sql=false
spring.jpa.properties.hibernate.format_sql=false
spring.jpa.properties.hibernate.use_sql_comments=true
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
spring.jpa.hibernate.naming.implicit-strategy=org.hibernate.boot.model.naming.ImplicitNamingStrategyComponentPathImpl


grpc.client.news-client.address=static://${GRPC_SERVER_HOST}:${GRPC_SERVER_PORT}
grpc.client.news-client.negotiationType=PLAINTEXT -->
