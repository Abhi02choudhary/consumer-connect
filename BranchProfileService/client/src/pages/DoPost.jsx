import { ClipboardPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function DoPost() {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => navigate("/post")}
    >
      <ClipboardPen className="h-10 w-10 stroke-[1.5]" />
      <span className="sr-only">Create Post</span>
    </Button>
  );
}