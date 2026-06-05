const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
export default API_BASE_URL;

// Sure!

// ```javascript
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
// ```

// - `import.meta.env.VITE_API_BASE_URL` → Vite reads the `.env` file and gives you the value
// - `||` → "or" — if the env var is empty/missing, use the fallback
// - `'http://127.0.0.1:8000'` → fallback for local dev

// So:
// ```
// On Vercel:    VITE_API_BASE_URL = https://applyiq-production.up.railway.app  ✅
// Locally:      VITE_API_BASE_URL = not set → falls back to http://127.0.0.1:8000  ✅
// ```

// ```javascript
// export default API_BASE_URL;
// ```
// This just makes `API_BASE_URL` available to import in other files like:
// ```javascript
// import API_BASE_URL from '../api';
// ```

// Same URL, works everywhere — no hardcoding needed.