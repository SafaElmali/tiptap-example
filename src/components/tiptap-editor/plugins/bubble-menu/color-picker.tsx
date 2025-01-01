"use client";

import { type Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FC } from "react";

type ColorPickerProps = {
  editor: Editor;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ColorPicker: FC<ColorPickerProps> = ({
  editor,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={editor.isActive("textStyle") ? "bg-muted" : ""}
        >
          <Palette className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="color"
              className="w-full h-8 cursor-pointer"
              onInput={(event: React.FormEvent<HTMLInputElement>) => {
                editor
                  .chain()
                  .focus()
                  .setColor((event.target as HTMLInputElement).value)
                  .run();
              }}
              value={editor.getAttributes("textStyle").color || "#000000"}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().unsetColor().run()}
            >
              Reset
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}; 