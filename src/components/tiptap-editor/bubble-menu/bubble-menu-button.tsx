import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";

type BubbleMenuButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

export const BubbleMenuButton: FC<BubbleMenuButtonProps> = ({
  onClick,
  active,
  disabled,
  children,
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(active && "bg-muted")}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}; 