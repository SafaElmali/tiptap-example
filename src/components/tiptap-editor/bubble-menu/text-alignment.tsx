"use client";

import { type Editor } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { BubbleMenuButton } from "./bubble-menu-button";
import { FC } from "react";

type TextAlignmentProps = {
  editor: Editor;
};

export const TextAlignment: FC<TextAlignmentProps> = ({ editor }) => {
  return (
    <>
      <BubbleMenuButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft className="h-4 w-4" />
      </BubbleMenuButton>
      <BubbleMenuButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter className="h-4 w-4" />
      </BubbleMenuButton>
      <BubbleMenuButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })}
      >
        <AlignRight className="h-4 w-4" />
      </BubbleMenuButton>
      <BubbleMenuButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        active={editor.isActive({ textAlign: "justify" })}
      >
        <AlignJustify className="h-4 w-4" />
      </BubbleMenuButton>
    </>
  );
}; 