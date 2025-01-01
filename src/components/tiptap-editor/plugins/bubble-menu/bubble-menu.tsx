"use client";

import { type Editor, BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import {
  Bold,
  Italic,
  Link2,
  Code,
  Strikethrough,
  Underline,
  MoreVertical,
  Subscript,
  Superscript,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, FC } from "react";
import { BubbleMenuButton } from "./bubble-menu-button";
import { ColorPicker } from "./color-picker";
import { HighlightPicker } from "./highlight-picker";
import { TextAlignment } from "./text-alignment";

type BubbleMenuProps = {
  editor: Editor;
  onLinkClick: (open: boolean) => void;
};

export const BubbleMenu: FC<BubbleMenuProps> = ({ editor, onLinkClick }) => {
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false);
  const [highlightPopoverOpen, setHighlightPopoverOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex overflow-hidden rounded-md border bg-background shadow-md"
    >
      <BubbleMenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Bold className="h-4 w-4" />
      </BubbleMenuButton>
      <BubbleMenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Italic className="h-4 w-4" />
      </BubbleMenuButton>
      <BubbleMenuButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      >
        <Underline className="h-4 w-4" />
      </BubbleMenuButton>
      <BubbleMenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
      >
        <Strikethrough className="h-4 w-4" />
      </BubbleMenuButton>
      <BubbleMenuButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
      >
        <Code className="h-4 w-4" />
      </BubbleMenuButton>
      <BubbleMenuButton
        onClick={() => onLinkClick(true)}
        active={editor.isActive("link")}
      >
        <Link2 className="h-4 w-4" />
      </BubbleMenuButton>

      <ColorPicker
        editor={editor}
        isOpen={colorPopoverOpen}
        onOpenChange={setColorPopoverOpen}
      />

      <HighlightPicker
        editor={editor}
        isOpen={highlightPopoverOpen}
        onOpenChange={setHighlightPopoverOpen}
      />

      <Popover open={moreMenuOpen} onOpenChange={setMoreMenuOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1" align="start">
          <div className="flex gap-1">
            <BubbleMenuButton
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              active={editor.isActive("subscript")}
            >
              <Subscript className="h-4 w-4" />
            </BubbleMenuButton>
            <BubbleMenuButton
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              active={editor.isActive("superscript")}
            >
              <Superscript className="h-4 w-4" />
            </BubbleMenuButton>
            <div className="w-px h-full bg-border mx-1" />
            <TextAlignment editor={editor} />
          </div>
        </PopoverContent>
      </Popover>
    </TiptapBubbleMenu>
  );
}; 