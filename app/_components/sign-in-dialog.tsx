import Image from "next/image";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

const SignDialogg = () => {

    const handleLoguinWithGoogleClick = () => { signIn('google') }

    return ( 
        <>
            <DialogHeader>                
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                Conecte-se usando sua conta do Google.
                </DialogDescription>
            </DialogHeader>

            <Button onClick={handleLoguinWithGoogleClick} variant='outline' className=" gap- font-bold">
                <Image src='/google.png' width={18} height={18} alt="Fazer login com o Google" />
                    Google
            </Button>
                        
        </>
    )
}
 
export default SignDialogg
                               