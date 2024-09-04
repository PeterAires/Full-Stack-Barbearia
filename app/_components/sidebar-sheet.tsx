'use client'

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MapIcon, MenuIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { SheetContent  , SheetHeader , SheetTitle, SheetClose } from "./ui/sheet";

import Link from "next/link";   
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { quickSearchOptions } from "../_constants/search";
import SignDialog from "./sign-in-dialog";

const SidebarSheet = () => {

    const { data } = useSession()
    const handleLogOutClick = () => { signOut() }
    return ( 
                
                <SheetContent className=" overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-left">Menu</SheetTitle>
                    </SheetHeader>

                    <div className="flex items-center justify-between gap-3 border-b border-solid py-5 ">
                        
                    
                       
                        {data?.user ? (
                           <div className=" flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src={data?.user?.image ?? ''}/>
                                </Avatar>
                            
                            <div>
                                <p className="font-bold">{data.user.name}</p>
                                <p className="text-xs">{data.user.email}</p>
                            </div>
                           </div>
                        ) : (
                            <div className=" flex items-center justify-between gap-28">
                                <h2 className=" font-bold text-lg">Olá, faça seu login!</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size='icon'>
                                    <LogInIcon/>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90%]">
                                <SignDialog/>
                            </DialogContent>
                        </Dialog>
                            </div>
                        )}
                         
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
                            <SheetClose asChild>
                                <Button  key={option.title}
                                className="justify-start gap-2" 
                                variant='ghost' asChild>
                                    <Link href={`/barbershops?service=${option.title}`}>
                                        <Image 
                                        alt={option.title} 
                                        src={option.imageUrl} height={18} width={18}/>
                                        {option.title}
                                    </Link>
                                </Button>
                            </SheetClose>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 p-5">
                        <Button onClick={handleLogOutClick} variant='ghost' className=" justify-start gap-2">
                            <LogOutIcon size={18} />
                            Sair da conta
                        </Button>
                    </div>
                </SheetContent>
     );
}
 
export default SidebarSheet;