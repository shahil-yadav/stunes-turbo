import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div>
      <h2 className="text-3xl font-bold">Ye kahan aayega chirkut</h2>
      <p>Could not find requested resource</p>
      <img
        width={200}
        height={200}
        src="/not-found.webp"
        alt="not-found"
        className="aspect-square size-52 object-cover"
      />
      <Button variant="outline">Redirect to home screen</Button>
    </div>
  );
}
