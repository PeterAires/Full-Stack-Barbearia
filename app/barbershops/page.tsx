import BarberShopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import Search from "../_components/search";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps{
    searchParams: {
        search?: string
    }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where:{
            name:{
                contains: searchParams?.search,
                mode: 'insensitive' //nao considerar letra M e m
            }
        }
    })
    return ( 
        <div>
            <Header/>
            <div className=" my-6 px-5">
                <Search/>
            </div>
            <div className=" px-5">
                <h2 className=" mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Resultados para '{searchParams.search}'</h2>
                <div className=" grid grid-cols-2 gap-4">
                    {barbershops.map((barbershop) => (
                            <BarberShopItem barbershop={barbershop} key={barbershop.id}/>
                        ))} 
                </div>
            </div>
        </div>
     );
}
 
export default BarbershopsPage;