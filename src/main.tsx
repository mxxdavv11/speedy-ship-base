import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force module reload

createRoot(document.getElementById("root")!).render(<App />);
