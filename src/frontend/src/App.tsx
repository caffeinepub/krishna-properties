import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AdminPanel from "./pages/AdminPanel";
import HomePage from "./pages/HomePage";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentPath(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Toaster richColors position="top-right" />
      {currentPath === "#/admin" ? <AdminPanel /> : <HomePage />}
    </>
  );
}
