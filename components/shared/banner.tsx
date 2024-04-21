import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangleIcon, CheckCircleIcon } from "lucide-react";

const bannerVariants = cva("border text-center p-4", {
  variants: {
    variant: {
      warning:
        "bg-yellow-200/80 border-yellow-50 text-primary flex items-center rounded-md",
      success:
        "bg-emerald-600 border-emerald-700 text-secondary flex items-center rounded",
    },
  },
  defaultVariants: {
    variant: "warning",
  },
});

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangleIcon,
  success: CheckCircleIcon,
};

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </div>
  );
};
