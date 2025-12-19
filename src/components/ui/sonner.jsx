import { Toaster as Sonner, toast } from "sonner";
import styles from "./sonner.module.css";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="light"
      className={styles.toaster}
      toastOptions={{
        classNames: {
          toast: styles.toast,
          description: styles.description,
          actionButton: styles.actionButton,
          cancelButton: styles.cancelButton,
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
