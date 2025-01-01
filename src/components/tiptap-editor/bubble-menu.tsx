"use client";

import { type Editor, BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Link2,
  Code,
  Strikethrough,
  Underline,
  Palette,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Subscript,
  Superscript,
  MoreVertical,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { memo, useState } from "react";

type BubbleMenuProps = {
  editor: Editor;
  onLinkClick: (open: boolean) => void;
};

const MemoButton = memo(function MemoButton({
  onClick,
  active,
  disabled,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
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
});

export const BubbleMenu = memo(function BubbleMenu({ editor, onLinkClick }: BubbleMenuProps) {
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false);
  const [highlightPopoverOpen, setHighlightPopoverOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex overflow-hidden rounded-md border bg-background shadow-md"
    >
      <MemoButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Bold className="h-4 w-4" />
      </MemoButton>
      <MemoButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Italic className="h-4 w-4" />
      </MemoButton>
      <MemoButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      >
        <Underline className="h-4 w-4" />
      </MemoButton>
      <MemoButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
      >
        <Strikethrough className="h-4 w-4" />
      </MemoButton>
      <MemoButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
      >
        <Code className="h-4 w-4" />
      </MemoButton>
      <MemoButton
        onClick={() => onLinkClick(true)}
        active={editor.isActive("link")}
      >
        <Link2 className="h-4 w-4" />
      </MemoButton>

      <Popover open={colorPopoverOpen} onOpenChange={setColorPopoverOpen}>
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
                  editor.chain().focus().setColor((event.target as HTMLInputElement).value).run();
                }}
                value={editor.getAttributes('textStyle').color || '#000000'}
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

      <Popover open={highlightPopoverOpen} onOpenChange={setHighlightPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={editor.isActive("highlight") ? "bg-muted" : ""}
          >
            <Highlighter className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2" align="start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="w-full h-8 cursor-pointer"
                onInput={(event: React.FormEvent<HTMLInputElement>) => {
                  editor.chain().focus().setHighlight({ color: (event.target as HTMLInputElement).value }).run();
                }}
                value={editor.getAttributes('highlight').color || '#ffffff'}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().unsetHighlight().run()}
              >
                Reset
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover open={moreMenuOpen} onOpenChange={setMoreMenuOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1" align="start">
          <div className="flex gap-1">
            <MemoButton
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              active={editor.isActive("subscript")}
            >
              <Subscript className="h-4 w-4" />
            </MemoButton>
            <MemoButton
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              active={editor.isActive("superscript")}
            >
              <Superscript className="h-4 w-4" />
            </MemoButton>
            <div className="w-px h-full bg-border mx-1" />
            <MemoButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              active={editor.isActive({ textAlign: "left" })}
            >
              <AlignLeft className="h-4 w-4" />
            </MemoButton>
            <MemoButton
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              active={editor.isActive({ textAlign: "center" })}
            >
              <AlignCenter className="h-4 w-4" />
            </MemoButton>
            <MemoButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              active={editor.isActive({ textAlign: "right" })}
            >
              <AlignRight className="h-4 w-4" />
            </MemoButton>
            <MemoButton
              onClick={() => editor.chain().focus().setTextAlign("justify").run()}
              active={editor.isActive({ textAlign: "justify" })}
            >
              <AlignJustify className="h-4 w-4" />
            </MemoButton>
          </div>
        </PopoverContent>
      </Popover>
    </TiptapBubbleMenu>
  );
});
