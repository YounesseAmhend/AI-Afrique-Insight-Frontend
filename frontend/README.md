# Afrique AI Insight

## Technologies

- **React**  
- **Vite**  
- **Zustand** (State Management)  
- **React Query**  
- **React Router**  
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
