import { LocaleRouteNormalizer } from "next/dist/server/future/normalizers/locale-route-normalizer";
import BarberShopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import Search from "../_components/search";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps{
    searchParams: {//as Urls que vao ser acessadas
        title?: string
        service?: string
    }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where:{
            OR: //se eu passar um titulo, busco pela barbearia, se nao busco por um servico
            [
                searchParams?.title ? {
                        name: {
                        contains: searchParams?.title,
                        mode: 'insensitive' //nao considerar letra M e m
                        }
                    
                }
                : {},
                searchParams.service ? {
                    
                    services: {
                        some:{
                            name: {
                                contains: searchParams.service,
                                mode: 'insensitive',
                            }
                        }
                    }
                }
                : {}
            ]
        }
    })
    return ( 
        <div>
            <Header/>
            <div className=" my-6 px-5">
                <Search/>
            </div>
            <div className=" px-5">
                <h2 className=" mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Resultados para '{searchParams?.title || searchParams?.service}'</h2>
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