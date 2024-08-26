"use client";
import { MapIcon, MenuIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { SheetContent , SheetTrigger , SheetHeader , SheetTitle, Sheet } from "./ui/sheet";
import { Barbershop } from "@prisma/client";
import TesteSheet from "./testesheet";
;

const Header = () => {
    return ( 
        <TesteSheet/>
     );
}
 
export default Header;