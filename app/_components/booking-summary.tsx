import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";

interface BookingSumaryProps {}

const BookingSumary = () => {
  return {
    /*
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
              {format(selectDay, "d 'de' MMMM", { locale: ptBR })}
            </p>
          </div>

          <div className="justify-between flex items-center">
            <h2 className=" text-sm text-gray-400">Horário</h2>
            <p className=" text-sm ">{selectTime}</p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className=" text-sm text-gray-400">Barbearia</h2>
            <p className=" text-sm ">{barbershop.name}</p>
          </div>
        </CardContent>
      </Card>
    </div>  
    */
  };
};
//Shift + Alt + F
export default BookingSumary;
