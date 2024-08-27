"use client";
import { MapIcon, MenuIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { SheetContent , SheetTrigger , SheetHeader , SheetTitle, Sheet } from "./ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const Header = () => {
    return ( 
        <Card>
        <CardContent className="p-5 flex flex-row items-center justify-between">
            <Image alt="FSW Barber" src='/Logo.png' height={18} width={120} />
           
            <Sheet>
                <SheetTrigger>open</SheetTrigger>
                <SheetContent>
                    <SheetTitle>ola</SheetTitle>
                </SheetContent>
            </Sheet>

        </CardContent>
    
    </Card> 
     );
}
 
export default Header;