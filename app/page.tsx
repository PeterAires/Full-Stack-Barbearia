'use client'

import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [teste,setTeste] = useState()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-red-500">Hello World!</h1>
    </main>
  );
}
