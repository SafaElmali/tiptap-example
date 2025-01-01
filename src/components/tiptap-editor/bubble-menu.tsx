"use client";

import { type Editor, BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Link2 } from "lucide-react";
import { FC } from "react";

type BubbleMenuProps = {
  editor: Editor;
  onLinkClick: (open: boolean) => void;
};

const BubbleMenu: FC<BubbleMenuProps> = ({ editor, onLinkClick }) => {
  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex overflow-hidden rounded-md border bg-background shadow-md"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-muted" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-muted" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLinkClick(true)}
        className={editor.isActive("link") ? "bg-muted" : ""}
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </TiptapBubbleMenu>
  );
};

export { BubbleMenu };
