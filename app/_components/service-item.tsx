import { Barbershop, BarbershopService } from "@prisma/client";
import Image from "next/image";

interface ServiceItemProps {
    service: BarbershopService,
}

const ServiceItem = ({service}: ServiceItemProps) => {
    return ( 
    <div className="flex items-center gap-3" >
        {/* Imagem */}
        <div className=" relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image alt={service.name} 
            src={service.imageUrl} 
            fill className=" object-cover"/>
        </div>
        {/* Direita */}
        <div className=" space-y-3">
            <h3 className="font-semibold ">{service.name}</h3>
            <p className=" text-gray-400 text-sm">{service.description}</p>
            
        </div>
    </div> 
    ); 
} 
export default ServiceItem;