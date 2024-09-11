import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { Barbershop, BarbershopService } from "@prisma/client";
import { ptBR } from "date-fns/locale";

interface BookingSumaryProps {
  service: Pick<BarbershopService, "name" | "price">,//o service so vai ter o name e o price
  barbershop: Pick<Barbershop, "name">
  selectDate: Date
}

const BookingSumary = ({barbershop, service, selectDate}: BookingSumaryProps) => {
  return (
    <div className=" p-5">
      <Card>
        <CardContent className=" p-3 space-y-3">
          <div className="justify-between flex items-center">
            <h2 className=" font-bold">{service.name}</h2>
            <p className=" text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
          </div>

          <div className="justify-between flex items-center">
            <h2 className=" text-sm text-gray-400">Data</h2>
            <p className=" text-sm ">
              {format(selectDate, "d 'de' MMMM", { locale: ptBR })}
            </p>
          </div>

          <div className="justify-between flex items-center">
            <h2 className=" text-sm text-gray-400">Horário</h2>
            <p className=" text-sm ">{format(selectDate, "HH:mm")}</p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className=" text-sm text-gray-400">Barbearia</h2>
            <p className=" text-sm ">{barbershop.name}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
//Shift + Alt + F
export default BookingSumary;
