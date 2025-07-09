my-react-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/              # Images, fonts, static files
│   │   ├── images/
│   │   └── styles/
│   │       └── globals.css
│   ├── components/          # Reusable UI components
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx
│   │   │   └── Navbar.types.ts
│   │   └── Button/
│   │       ├── Button.tsx
│   │       └── Button.types.ts
│   ├── hooks/               # Custom React hooks
│   │   └── useWindowSize.ts
│   ├── pages/               # Route-level pages
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   └── Home.styles.ts
│   │   ├── About/
│   │   │   └── About.tsx
│   │   └── NotFound/
│   │       └── NotFound.tsx
│   ├── layouts/             # Layout wrappers (optional)
│   │   └── MainLayout.tsx
│   ├── context/             # React Contexts (e.g., Theme, Auth)
│   │   └── AuthContext.tsx
│   ├── utils/               # Utility/helper functions
│   │   └── formatDate.ts
│   ├── services/            # API service files (Axios/Fetch)
│   │   └── userService.ts
│   ├── types/               # TypeScript types/interfaces
│   │   └── index.ts
│   ├── routes/              # React Router config
│   │   └── AppRoutes.tsx
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point (Vite) or index.tsx (CRA)
│   └── vite.config.ts       # Vite config (if using Vite)
├── .env
├── package.json
└── tsconfig.json
