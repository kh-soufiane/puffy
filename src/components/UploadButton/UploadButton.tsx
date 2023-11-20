"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>example content</DialogContent>
    </Dialog>
  );
};

export default UploadButton;
