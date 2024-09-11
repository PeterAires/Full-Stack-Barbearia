"use client";

import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { isFuture, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";
import BookingSumary from "./booking-summary";

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
  const [isSheetOpen, setIsSheetOpen] = useState(Boolean);
  const {
    service: { barbershop },
  } = booking; //desestrutureio o barbershop do service, ai posso usar ele livremente aqui
  const isConfirmed = isFuture(booking.date);

  const handleDeleteBooking = async () => {
    try {
      await deleteBooking(booking.id);
      setIsSheetOpen(false);
      toast.success("Reserva cancelada com sucesso");
    } catch {
      toast.error("Não foi possivel cancelar a Reserva");
    }
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger className=" w-full min-w-[90%]" asChild>
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
        <SheetContent className=" w-[85%]">
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

            <div className=" mt-6 mb-3">
              <BookingSumary
                barbershop={barbershop}
                service={booking.service}
                selectDate={booking.date}
              />
            </div>

            <div className=" p-5 space-y-3">
              {barbershop.phones.map((phone, index) => (
                <PhoneItem phone={phone} key={index} />
              ))}
            </div>
          </div>
          <SheetFooter className=" mt-6">
            <div className=" flex items-start gap-3">
              <SheetClose asChild>
                <Button variant="outline" className=" w-full">
                  Voltar
                </Button>
              </SheetClose>
              {isConfirmed && (
                <Dialog>
                  <DialogTrigger className=" w-full">
                    <Button variant="destructive" className=" w-full">
                      Cancelar Reserva
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle>
                        Você deseja cancelar sua reserva?
                      </DialogTitle>
                      <DialogDescription>
                        Ao cancelar, você perderá sua reserva e não poderá
                        recuperá-la. Essa ação é irreversível.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row gap-3">
                      <DialogClose asChild>
                        <Button variant="secondary" className="w-full">
                          Voltar
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleDeleteBooking}
                        >
                          Confirmar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
