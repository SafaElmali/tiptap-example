"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { FC, useState } from "react";
import { BubbleMenu } from "./plugins/bubble-menu/bubble-menu";
import { MenuBar } from "./plugins/menu-bar";
import { LinkDialog } from "./plugins/link-dialog";
import useLowlight from "@/hooks/use-lowlight";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const CHAR_LIMIT = 280;

type TipTapEditorProps = {
  content?: string;
  onChange?: (content: string) => void;
};

const TipTapEditor: FC<TipTapEditorProps> = ({ content = "", onChange }) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const lowlight = useLowlight();
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
        HTMLAttributes: {
          class: "not-prose rounded-md bg-secondary p-4",
        },
      }),
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
      CharacterCount.configure({
        limit: CHAR_LIMIT,
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Subscript,
      Superscript,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-full p-4 h-full min-h-[200px] prose-pre:bg-muted/50 prose-pre:rounded-md",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      setCharacterCount(editor.storage.characterCount.characters());
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

  const progress = (characterCount / CHAR_LIMIT) * 100;
  const isOverLimit = characterCount > CHAR_LIMIT;

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {editor && <BubbleMenu editor={editor} onLinkClick={onLinkClick} />}
      <MenuBar
        editor={editor}
        linkDialogOpen={linkDialogOpen}
        onLinkDialogOpen={setLinkDialogOpen}
      />
      <EditorContent editor={editor} />
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div className="flex items-center gap-2">
          <Progress 
            value={progress} 
            max={100}
            className={cn(
              "w-16 h-2",
              isOverLimit ? "bg-red-200 dark:bg-red-900" : "bg-secondary",
              progress >= 80 && !isOverLimit && "bg-yellow-200 dark:bg-yellow-900"
            )}
            indicatorClassName={cn(
              isOverLimit ? "bg-red-500" : "bg-primary",
              progress >= 80 && !isOverLimit && "bg-yellow-500"
            )}
          />
          <span className={cn(
            "text-sm",
            isOverLimit ? "text-red-500" : "text-muted-foreground",
            progress >= 80 && !isOverLimit && "text-yellow-500"
          )}>
            {characterCount}/{CHAR_LIMIT}
          </span>
        </div>
      </div>
      <LinkDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        onSubmit={setLink}
      />
    </div>
  );
};

export { TipTapEditor };
