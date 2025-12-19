import { Sidebar } from "./Sidebar";
import styles from "./MainLayout.module.css";

export function MainLayout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
