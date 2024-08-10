import ServiceItem from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
//params é a Url, como nao estamo passando nada vai pegar ela
interface BarberShopPageProps {
    params: {
        id: string
    }
}

const BarberShopPage = async ({ params }) => {
    const barbershop = await db.barbershop.findUnique({
        where:{
            id: params.id
        },
        //includes, traz os serviçoes dessa barbearia que está em outra tabela
        include:{
            services: true
        }
    })



    if (!barbershop) {
        return notFound()
    }

    return (
        <div className="">
            {/* Imagem */}
            <div className="relative w-full h-[250px]">
                <Image alt={barbershop?.name}
                src={barbershop?.imageUrl} 
                fill className="object-coverject"/>

                <Button 
                size='icon' 
                variant='secondary'
                className="absolute top-4 left-4"
                asChild>
                    <a href={'/'}>
                        <ChevronLeftIcon/>
                    </a>
                </Button>

                <Button size='icon' 
                variant='secondary'
                className="absolute top-4 right-4">
                    <MenuIcon/>
                </Button>
            </div>

            <div className="p-5 border-b border-solid ">
                <h1 className="font-bold text-x mb-3">{barbershop.name}</h1>

                <div className="flex items-center gap-1 mb-2">
                    <MapIcon className="text-primary" size={18}/>
                    <p className="text-sm">{barbershop?.address}</p>
                </div>

                <div className="flex items-center gap-2">
                    <StarIcon className="text-primary fill-primary" size={18}/>
                    <p className="text-sm">5,0 (499 Avaliações) </p>
                </div>
            </div>
           {/* Descrição */}
            <div className="p-5 border-b border-solid space-y-2">
                <h2 className="font-bold uppercase text-gray-400 text-xs">Sobre nós</h2>
                <p className="text-sm text-justify">{barbershop?.description}</p>
            </div>

            <div className="p-5">
                <h2 className="font-bold uppercase text-gray-400 text-xs">Serviços</h2>
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} service={service} />))}
            </div>
        </div>
    );
}
 
export default BarberShopPage; 