"use client";

import { TipTapEditor } from "@/components/tiptap-editor/tiptap-editor";
import { useState } from "react";

const EditorPage = () => {
  const [content, setContent] = useState("");

  return (
    <div className="container mx-auto py-10">
      <TipTapEditor
        content={content}
        onChange={(newContent) => setContent(newContent)}
      />

      <div className="mt-4 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Output HTML:</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-auto">{content}</pre>
        </div>

        <div>
          <h3 className="text-lg font-medium">Preview:</h3>
          <div
            className="prose dark:prose-invert max-w-full bg-card p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
