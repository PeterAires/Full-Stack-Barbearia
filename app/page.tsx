'use client'
import { Button } from "./_components/ui/button";

import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [teste,setTeste] = useState()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button  variant='outline' className="bg-zinc-600 text-zinc-200"
      size='lg'>teste</Button>
    </main>
  );
}
