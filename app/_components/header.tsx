import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const Header = () => {
    return ( 
        <Card>
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Image alt="FSW Barber" src='/Logo.png' height={18} width={120} />
                <Button size='icon' variant='outline'>
                    <MenuIcon/>
                </Button>
            </CardContent>
        </Card>
     );
}
 
export default Header;