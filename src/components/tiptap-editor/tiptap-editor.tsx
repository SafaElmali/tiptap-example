"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { FC, useState } from "react";
import { BubbleMenu } from "./bubble-menu";
import { MenuBar } from "./menu-bar";
import { LinkDialog } from "./link-dialog";

type TipTapEditorProps = {
  content?: string;
  onChange?: (content: string) => void;
};

const TipTapEditor: FC<TipTapEditorProps> = ({ content = "", onChange }) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline hover:text-primary/80",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-full p-4 h-full min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  const setLink = (url: string) => {
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const onLinkClick = (open: boolean) => {
    setLinkDialogOpen(open);
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {editor && <BubbleMenu editor={editor} onLinkClick={onLinkClick} />}
      <MenuBar
        editor={editor}
        linkDialogOpen={linkDialogOpen}
        onLinkDialogOpen={setLinkDialogOpen}
      />
      <EditorContent editor={editor} />
      <LinkDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        onSubmit={setLink}
      />
    </div>
  );
};

export { TipTapEditor };
