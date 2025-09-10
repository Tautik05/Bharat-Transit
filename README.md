# 🚀 React + Darun Starter Kit

This is a **ready-to-use React starter template** built with:

* ⚡ [Vite](https://vitejs.dev/) – blazing fast dev environment
* 🎨 [TailwindCSS](https://tailwindcss.com/) – utility-first CSS framework
* 🔗 [React Router](https://reactrouter.com/) – client-side routing
* 🌐 [Axios](https://axios-http.com/) – API fetching made simple
* 🗂️ `@` path alias for clean imports (like Next.js)

Clone this repo and start coding right away without any setup hassle.

---

## 📦 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/RaunakDiesFromCode/darun-react-kit.git
   cd darun-react-kit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

4. Open your browser at the URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

---

## 📂 Project Structure

```
.
├── public/              # Static assets
├── src/                 # Application source code
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utility functions (e.g., API helpers)
│   ├── pages/           # Route pages
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── App.jsx          # Main app with routes
│   ├── main.jsx         # App entry point
│   └── index.css        # Tailwind setup
├── jsconfig.json        # Path alias config
├── vite.config.js       # Vite config with @ alias
└── package.json
```

---

## ✨ Features

* ✅ **Ready-to-use routing**: `Home` and `About` pages included.
* ✅ **Path aliases**: Import using `@/pages/Home` instead of long relative paths.
* ✅ **API fetching example**: Demo fetch in `Home.jsx` using Axios.
* ✅ **Tailwind pre-configured**: Utility classes ready to use.

---

## 🔗 Example Imports

```jsx
import Home from "@/pages/Home";
import Button from "@/components/Button";
import logo from "@/assets/logo.svg";
import { fetchData } from "@/lib/api";
```

---

## 🛠️ Available Scripts

* `npm run dev` → Start development server
* `npm run build` → Build for production
* `npm run preview` → Preview the production build locally

---

## 📖 Next Steps

* Add more pages inside `src/pages/`.
* Create reusable components in `src/components/`.
* Organize API helpers inside `src/lib/`.
* Customize Tailwind config (`tailwind.config.js`).

---

## 🤝 Contributing

Feel free to fork and modify this starter kit to your liking. Pull requests welcome!

---

## 📜 License

MIT License. Free to use, modify, and share.
