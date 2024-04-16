import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-sky-100",
        success: "bg-emerald-200",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },

      defaultVariants: {
        variant: "default",
        size: "default",
      },
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-teal-900",
      success: "text-emerald-500",
    },
    size: {
      default: "w-6 h-6",
      sm: "w-4 h-4",
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
});

type BackgroundVariantProps = VariantProps<typeof backgroundVariants>;
type IconVariantProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
  icon: LucideIcon;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

export const IconBadge = ({
  icon: Icon,
  variant = "default",
  size = "default",
}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};
