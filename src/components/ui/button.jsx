import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./button.module.css";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const variantClass = {
      default: styles.default,
      destructive: styles.destructive,
      outline: styles.outline,
      secondary: styles.secondary,
      ghost: styles.ghost,
      link: styles.link,
      success: styles.success,
      warning: styles.warning,
      sidebar: styles.sidebar,
    }[variant];

    const sizeClass = {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
      lg: styles.sizeLg,
      xl: styles.sizeXl,
      icon: styles.sizeIcon,
    }[size];

    return (
      <Comp
        className={`${styles.button} ${variantClass} ${sizeClass} ${className || ""}`.trim()}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
