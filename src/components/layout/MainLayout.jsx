import { Sidebar } from "./Sidebar";

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="min-h-screen pt-14 lg:ml-64 lg:pt-0">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

