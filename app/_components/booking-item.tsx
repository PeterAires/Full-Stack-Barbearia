import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Prisma } from "@prisma/client";


interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{//incluindo o service no booking
    include: {
      service: {
        include: {
          barbershop: true
        }
      }}
  }>
}
//colocar os agendamentos ja Finalizados
export const BookingItem = ({ booking }: BookingItemProps) => {
    return ( 
    <>
        <h2 className="mb-3 mt-6 uppercase text-xs font-bold text-gray-400 ">Agendamento</h2>
        <Card >
          <CardContent className="flex justify-between p-0">
            {/* Esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl}/>
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>
            {/* Direita */}
            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid ">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">{booking.date.getDay()}</p>
              <p className="text-sm">{booking.date.getHours()}:{booking.date.getMinutes() === 0 ? '00' : booking.date.getMinutes()}</p>
            </div>
          </CardContent>
        </Card>
    </> );
}