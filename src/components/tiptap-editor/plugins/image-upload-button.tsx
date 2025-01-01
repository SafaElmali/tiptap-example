"use client";

import { type Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

type ImageUploadButtonProps = {
  editor: Editor;
};

export const ImageUploadButton = ({ editor }: ImageUploadButtonProps) => {
  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Replace this with your actual image upload API endpoint
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        // Insert the image into the editor
        editor
          .chain()
          .focus()
          .setImage({ src: data.url, alt: file.name })
          .run();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative"
      onClick={() => document.getElementById("image-upload")?.click()}
    >
      <ImageIcon className="h-4 w-4" />
      <input
        id="image-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={addImage}
      />
    </Button>
  );
}; 