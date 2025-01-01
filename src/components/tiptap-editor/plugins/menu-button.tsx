import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";

type MenuButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

const MenuButton: FC<MenuButtonProps> = ({
  onClick,
  isActive,
  disabled,
  children,
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      data-active={isActive}
      className={cn(isActive && "bg-muted")}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export { MenuButton };
