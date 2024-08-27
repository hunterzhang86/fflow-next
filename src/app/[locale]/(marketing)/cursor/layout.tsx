import { ThemeProvider } from "next-themes";
import { Menu } from "@/components/cursor/menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen pt-12">
        <div className="sticky top-12 h-[calc(100vh-3rem)] w-64 overflow-y-auto">
          <Menu />
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
