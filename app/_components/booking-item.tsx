import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { isFuture, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    //incluindo o service no booking
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}
//colocar os agendamentos ja Finalizados
export const BookingItem = ({ booking }: BookingItemProps) => {
  const {
    service: { barbershop },
  } = booking; //desestrutureio o barbershop do service, ai posso usar ele livremente aqui
  const isConfirmed = isFuture(booking.date);
  return (
    <>
      <Sheet>
        <SheetTrigger className=" w-full" asChild>
          <Card className=" min-w-[90%]">
            <CardContent className="flex justify-between p-0">
              {/* Esquerda */}
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge
                  className="w-fit"
                  variant={isConfirmed ? "default" : "secondary"}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <h3 className="font-semibold">{booking.service.name}</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>
                  <p className="text-sm">{booking.service.barbershop.name}</p>
                </div>
              </div>
              {/* Direita */}
              <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid ">
                <p className="text-sm capitalize">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>
        <SheetContent className=" w-[90%]">
          <SheetHeader>
            <SheetTitle className=" text-left">
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>

          <div className=" relative h-[180px] w-full flex items-end mt-6">
            <Image
              src="/map.png"
              alt={`Mapa da barbearia ${barbershop.name}`}
              fill
              className=" object-cover rounded-xl"
            />

            <Card className=" z-50 w-full mb-3 mx-5 rounded-xl">
              <CardContent className=" px-5 py-3 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className=" font-bold">{barbershop.name}</h3>
                  <p className=" text-xs">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className=" mt-6">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            <Card className=" mt-3 mb-6">
              <CardContent className=" p-3 space-y-3">
                <div className="justify-between flex items-center">
                  <h2 className=" font-bold">{booking.service.name}</h2>
                  <p className=" text-sm font-bold">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(booking.service.price))}
                  </p>
                </div>

                <div className="justify-between flex items-center">
                  <h2 className=" text-sm text-gray-400">Data</h2>
                  <p className=" text-sm ">
                    {format(booking.date, "d 'de' MMMM", { locale: ptBR })}
                  </p>
                </div>

                <div className="justify-between flex items-center">
                  <h2 className=" text-sm text-gray-400">Horário</h2>
                  <p className=" text-sm ">
                    {format(booking.date, "HH:mm", { locale: ptBR })}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className=" text-sm text-gray-400">Barbearia</h2>
                  <p className=" text-sm ">{barbershop.name}</p>
                </div>
              </CardContent>
            </Card>

            <div className=" p-5 space-y-3">
                {barbershop.phones.map((phone, index) => (
                    <PhoneItem phone={phone} key={index}/>
                ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
