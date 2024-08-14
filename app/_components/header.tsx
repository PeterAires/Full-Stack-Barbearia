"use client";
import { MapIcon, MenuIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from "./ui/sheet";
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@radix-ui/react-dialog";

const Header = () => {
    return ( 
        <Card>
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Image alt="FSW Barber" src='/Logo.png' height={18} width={120} />
                <Dialog>
                <DialogTrigger asChild>
        <button className="open-sidebar-button">Open Sidebar</button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="sidebar-overlay" />
        <DialogContent className="sidebar-content">
          <DialogClose className="close-button">
            <X size={24} />
          </DialogClose>
          <div className="sidebar-body">
            <h3>dadwad</h3>
            <h2>Sidebar Title</h2>
            <p>This is the content of the sidebar.</p>
          </div>
        </DialogContent>
      </DialogPortal>
                </Dialog>

            </CardContent>
        </Card>
     );
}
 
export default Header;