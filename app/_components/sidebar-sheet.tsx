import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MapIcon, MenuIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { SheetContent  , SheetHeader , SheetTitle, SheetClose } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import Link from "next/link";   
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const SidebarSheet = () => {
    return ( 
                
                <SheetContent className=" overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-left">Menu</SheetTitle>
                    </SheetHeader>

                    <div className=" py-5 gap-3 border-b flex items-center border-solid justify-between">
                        <h2 className=" font-bold text-lg">Olá, faça seu login!</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <LogInIcon/>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90%]">
                                <DialogHeader>
                                    <DialogTitle>Faça login na plataforma</DialogTitle>
                                    <DialogDescription>
                                        Conecte-se usando sua conta do Google.
                                    </DialogDescription>
                                </DialogHeader>

                                <Button variant='outline' className=" gap-2 font-bold">
                                    <Image src='/google.png' width={18} height={18} alt="Fazer login com o Google" />
                                    Google
                                </Button>
                            </DialogContent>
                        </Dialog>

                        {/*
                        <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                        </Avatar>
                        
                        <div>
                            <p className="font-bold">Peter Carlos</p>
                            <p className="text-xs">Petercarlos@gmail.com</p>
                        </div>
                         */}
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