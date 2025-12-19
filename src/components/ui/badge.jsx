import * as React from "react";
import styles from "./badge.module.css";

function Badge({ className, variant = "default", ...props }) {
  const variantClass = {
    default: styles.default,
    secondary: styles.secondary,
    destructive: styles.destructive,
    outline: styles.outline,
  }[variant];

  return <div className={`${styles.badge} ${variantClass} ${className || ""}`.trim()} {...props} />;
}

export { Badge };
