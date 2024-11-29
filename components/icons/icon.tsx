import React, { HTMLAttributes, useMemo } from "react";
import { Suspense } from "react";
import { icons } from "./icons";
import { cn } from "@/lib/utils";

// Custom icon type
export type IconName = keyof typeof icons;

// Supported icon types
export type SupportedIcon =
  | IconName
  | React.FunctionComponent<React.SVGAttributes<SVGElement>>;

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  icon: SupportedIcon;
  className?: string;
  color?: string;
  size?: string | number;
  rotate?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

export const Icon = ({
  icon,
  className,
  color,
  size = 24,
  rotate,
  weight = "regular",
  ...rest
}: IconProps) => {
  // Handle different icon types

  const IconComponent = useMemo(() => {
    // Custom icon from local icons
    if (typeof icon === "string" && icons[icon as IconName]) {
      return icons[icon as IconName];
    }

    return null;
  }, [icon]);

  // If no icon found, return null
  if (!IconComponent) return null;

  // Determine icon props based on type
  const iconProps: Record<string, unknown> = {
    color: color || "currentColor",
    size: size,
    weight: weight,
    ...rest,
  };

  return (
    <div
      className={className}
      aria-label={typeof icon === "string" ? icon : "icon"}
      role="img"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
      {...rest}
    >
      <Suspense fallback={null}>
        <IconComponent
          {...iconProps}
          className={cn("fill-current", className)}
        />
      </Suspense>
    </div>
  );
};
