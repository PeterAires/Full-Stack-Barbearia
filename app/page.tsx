import { Input } from "./_components/ui/input";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import { BookingItem } from "./_components/booking-item";
import Search from "./_components/search";


const Home = async () => {
  
const barbershops = await db.barbershop.findMany({}); 
  const popularBarbershops = await db.barbershop.findMany({ orderBy: { name: "desc",
  }});
  //Chamar meu banco de dados
return (
    <div>
      {/* Header */}
      <Header/>
      <div className="p-5">
        {/* Texto */}
        <h2 className="text-xl font-bold">
          Olá, felipe
        </h2>
        <p>Segunda Feira, 5 de Agosto</p>
        {/* Busca */}
        <div className=" mt-6">{/* para nao impactar o espaçamento do component pai */}
          <Search/>
        </div>
        {/* Busca Rapída */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden ">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="gap-2" variant='secondary'>
            <Image 
            src={option.imageUrl} 
            alt={option.title} 
            width={16} 
            height={16}/>
            {option.title}
          </Button>
          ))}
        </div>
        {/* Imagem */}
        <div className="relative w-full h-[150px] mt-6">
          <Image 
          alt='Agende nos melhores com FSW Barber' src='/banner-01.png'
          fill className="object-cover rounded-xl" />
        </div>
        {/* Agendamento */}
        <BookingItem/>

        <h2 className="mb-3 mt-6 uppercase text-xs font-bold text-gray-400 ">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden ">
        {barbershops.map(barbershop => <BarberShopItem key={barbershop.id} barbershop={barbershop}/>)}
        </div>

        <h2 className="mb-3 mt-6 uppercase text-xs font-bold text-gray-400 ">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden ">
        {popularBarbershops.map(barbershop => <BarberShopItem key={barbershop.id} barbershop={barbershop}/>)}
        </div>
      </div> 
    </div>
  );
}
export default Home