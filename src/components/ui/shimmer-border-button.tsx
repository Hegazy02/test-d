import React from "react";

export interface ShimmerBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "warning" | "danger" | "default";
  speed?: "slow" | "normal" | "fast";
  rounded?: "sm" | "md" | "lg" | "xl" | "full" | "default";
  bgColor?: string; // Tailwind background color class
  className?: string;
  children?: React.ReactNode;
}

const ShimmerBorderButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerBorderButtonProps
>(
  (
    {
      variant = "default",
      speed = "normal",
      rounded = "default",
      bgColor = "",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    // بناء الكلاسات
    const baseClass = "shimmer-border-button";
    const variantClass = variant !== "default" ? variant : "";
    const speedClass = speed !== "normal" ? speed : "";
    const roundedClass = rounded !== "default" ? `rounded-${rounded}` : "";

    const buttonClasses = [
      baseClass,
      variantClass,
      speedClass,
      roundedClass,
      bgColor,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button className={buttonClasses} ref={ref} {...props}>
        <div className="spark-container">
          <div className="spark"></div>
        </div>
        {children}
      </button>
    );
  },
);

ShimmerBorderButton.displayName = "ShimmerBorderButton";

export { ShimmerBorderButton };
