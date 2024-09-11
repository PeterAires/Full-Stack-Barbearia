"use client";
import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import {
  isPast,
  isToday,
  set,
} from "date-fns";
import { Pick } from "@prisma/client/runtime/library";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
import SignDialogg from "./sign-in-dialog";
import { Dialog, DialogContent } from "./ui/dialog";
import BookingSumary from "./booking-summary";
interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">; //para pegar coisas especificas
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

interface getTimeListProps {
  bookings: Booking[];
  selectDay: Date;
}

const getTimeList = ({ bookings, selectDay }: getTimeListProps) => {
  return TIME_LIST.filter((time) => {
    //pegue todas as horas da lista e veriique se tem agendamentos
    const hour = Number(time.split(":")[0]); // salva as horas
    const minutes = Number(time.split(":")[1]); // salva com os minutos

    const timeIsOnThePat = isPast(set(new Date(), { hours: hour, minutes }));
    if (timeIsOnThePat && isToday(selectDay)) {
      return false; //se o o dia selecionado for hoje e a hora ja passou, é removido da lista
    }

    const hasBookingOnCurrentTime = bookings.some(
      //verificar reservas
      (
        bookings //para acesarmos as propriedades de booking
      ) =>
        bookings.date.getHours() === hour &&
        bookings.date.getMinutes() === minutes
    ); //se for === as horas & minutos

    if (hasBookingOnCurrentTime) {
      //se tiver algum agendamento eu removo ele da lista, se nao eu mantenho
      return false;
    }
    return true;
  });
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [signDialogIsOpen, setSignDialogIsOpen] = useState(false);
  const { data } = useSession();
  const [selectDay, setSelectDat] = useState<Date | undefined>(undefined);
  const [selectTime, setSelectTime] = useState<string | undefined>(undefined);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);

  useEffect(() => {
    if (!selectDay) return;
    const fetch = async () => {
      const bookings = await getBookings({
        date: selectDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectDay, service.id]); //toda vez que selecionar um dia, vai requisar o getbookings

  const selectedDate = useMemo(() => {
    if (!selectDay || !selectTime) return
    return set(selectDay, {
      hours: Number(selectTime?.split(":")[0]), //ex:['10':'00']
      minutes: Number(selectTime?.split(":")[1])
    })
  }, [selectDay, selectTime])

  const handleBookingClick = () => {
    if (data?.user) {
      //early return
      return setBookingSheetIsOpen(true);
    }
    return setSignDialogIsOpen(true);
  };

  const handleBookingSheetOpenChange = () => {
    setSelectDat(undefined);
    setSelectTime(undefined);
    setDayBookings([]); //força a sempre verificar os agendamentos atualizados
    setBookingSheetIsOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectDat(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectTime(time);
  };

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return;
      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      });
      handleBookingSheetOpenChange();
      toast.success("Reserva criada com sucesso");
    } catch (err) {
      toast.error("erro ao criar reserva!");
    }
  };

  const timeList = useMemo(() => {
    if (!selectDay) return [];
    return getTimeList({
      //fez a verificação e vai nos retornar os horarios disponiveis
      bookings: dayBookings,
      selectDay,
    });
  }, [dayBookings, selectDay]); //se o daybookins ou selectDay mudar este codigo vai executar

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3 ">
          {/* Imagem */}
          <div className=" relative max-h-[210px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className=" object-cover rounded-lg"
            />
          </div>
          {/* Direita */}
          <div className=" space-y-2">
            <h3 className="font-semibold text-sm">{service.name}</h3>
            <p className=" text-gray-400 text-sm">{service.description}</p>
            {/* Preço e Botão */}
            <div className="flex items-center justify-between">
              <p className=" text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>
                <SheetContent className=" px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className=" border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectDay}
                      onSelect={handleDateSelect}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {selectDay && (
                    <div className=" gap-3 p-5 flex border-b border-solid overflow-x-auto [&::-webkit-scrollbar]:hidden justify-between">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            onClick={() => handleTimeSelect(time)}
                            variant={
                              selectTime === time ? "default" : "outline"
                            }
                            key={time}
                            className=" rounded-full "
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className=" text-xs">
                          Não há horários disponíveis para este dia.
                        </p>
                      )}
                    </div>
                  )}

                  {selectedDate && (
                    <div className=" p-5">
                      <BookingSumary
                        barbershop={barbershop}
                        service={service}
                        selectDate={selectedDate}
                      />
                    </div>
                  )}
                  <SheetHeader className="w-full px-5 mt-5">
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectDay || !selectTime}
                    >
                      Confirmar
                    </Button>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signDialogIsOpen}
        onOpenChange={(open) => setSignDialogIsOpen(open)}
      >
        <DialogContent className="W-[90%]">
          <SignDialogg />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ServiceItem;
