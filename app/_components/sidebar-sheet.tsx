import { CalendarIcon, HomeIcon, LogOutIcon, MapIcon, MenuIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { SheetContent , SheetTrigger , SheetHeader , SheetTitle, Sheet, SheetClose } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";   

const SidebarSheet = () => {
    return ( 
                
                <SheetContent className=" overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>

                    <div className=" py-5 gap-3 border-b flex items-center border-solid">
                        <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                        </Avatar>
                        
                        <div>
                            <p className="font-bold">Peter Carlos</p>
                            <p className="text-xs">Petercarlos@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 p-5 border-b border-solid">
                        <SheetClose asChild>
                            <Button 
                            variant='ghost'
                            className="justify-start gap-2"
                            asChild>
                                <Link href='/'>
                                    <HomeIcon size={18}/>
                                    Início
                                </Link>   
                            </Button>
                        </SheetClose>
                        <Button 
                        className="justify-start gap-2" variant='ghost'>
                            <CalendarIcon size={18}/>
                            Agendamentos
                        </Button>
                    </div>

                    <div className="flex flex-col gap-2 p-5 border-b border-solid">
                        {quickSearchOptions.map((option) => (
                            <Button key={option.title}
                            className="justify-start gap-2" 
                            variant='ghost'>
                                <Image alt={option.title} src={option.imageUrl} height={18} width={18}/>
                                {option.title}
                            </Button>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 p-5">
                        <Button variant='ghost' className=" justify-start gap-2">
                            <LogOutIcon size={18} />
                            Sair da conta
                        </Button>
                    </div>
                </SheetContent>
     );
}
 
export default SidebarSheet;