"use client";

import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { ThemeProvider } from "next-themes";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/cursor/menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* 移动端菜单切换按钮 */}
        {isMobile && (
          <Button
            className="fixed left-4 top-16 z-50 p-2"
            size="sm"
            variant="outline"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon size={16} /> : <MenuIcon size={16} />}
          </Button>
        )}

        {/* 侧边菜单 */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto bg-background transition-transform duration-300 ease-in-out md:relative md:translate-x-0${
            isMenuOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="pt-20 md:pt-0">
            <Menu />
          </div>
        </div>

        {/* 主内容区 */}
        <div className="flex-1 overflow-y-auto p-4 pt-20 md:p-6">
          {children}
        </div>

        {/* 遮罩层 */}
        {isMobile && isMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
