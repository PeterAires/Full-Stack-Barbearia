"use client";
import { MapIcon, MenuIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { SheetContent , SheetTrigger , SheetHeader , SheetTitle, Sheet } from "./ui/sheet";
;

const Header = () => {
    return ( 
        <Card>
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Image alt="FSW Barber" src='/Logo.png' height={18} width={120} />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button><MenuIcon/></Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
     );
}
 
export default Header;