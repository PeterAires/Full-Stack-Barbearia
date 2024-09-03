'use client' 
import { Barbershop, BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { format, set, setHours, setMinutes } from "date-fns";
import { Pick } from "@prisma/client/runtime/library";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface ServiceItemProps {
    service: BarbershopService,
    barbershop: Pick<Barbershop, 'name'>, //para pegar coisas especificas
}

const ServiceItem = ({service, barbershop}: ServiceItemProps) => {

    const TIME_LIST = [
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
    ]

    const {data} = useSession()
    const [selectDay,setSelectDat] = useState<Date | undefined>(undefined)
    const [selectTime,setSelectTime] = useState<string | undefined>(undefined)

    const handleDateSelect = (date: Date | undefined) => {
        setSelectDat(date)
    }

    const handleTimeSelect = (time: string) => {
        setSelectTime(time)
    }

    const handleCreateBooking = async () => {
        try{
        if (!selectDay || !selectTime) return
        const hour = Number(selectTime.split(':')[0])  //ex:['10':'00']
        const minute = Number(selectTime.split(':')[1] )
        const newDate = set( selectDay, { //vai ser o dia selecionado, com a hora e minutos selecionados
          minutes: minute,
          hours: hour
        })

        await createBooking({
          serviceId: service.id,
          userId: (data?.user as any).id,
          date: newDate,
        })
        toast.success('Reserva criada com sucesso')
        }
    catch(err){
      console.log(err)
      toast.error('erro ao criar reserva!')
    }
  }
    

    return (
    <Card>
        <CardContent className="flex items-center gap-3 p-3">
                {/* Imagem */}
                <div className=" relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
                    <Image alt={service.name} 
                    src={service.imageUrl} 
                    fill className=" object-cover rounded-lg"/>
                </div>
                {/* Direita */}
                <div className=" space-y-2">
                    <h3 className="font-semibold text-sm">{service.name}</h3>
                    <p className=" text-gray-400 text-sm">{service.description}</p>
                    {/* Preço e Botão */}
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-primary">
                            {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                            }).format(Number(service.price))}
                        </p>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant='secondary' size='sm'>Reservar</Button>
                            </SheetTrigger>
                            <SheetContent className=" px-0">
                                <SheetHeader>
                                    <SheetTitle>Fazer Reserva</SheetTitle>
                                </SheetHeader>

                                <div className=" border-b border-solid py-5">
                                    <Calendar mode="single" locale={ptBR}
                                    selected={selectDay}
                                    onSelect={handleDateSelect}
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
                                      }}/>
                                </div>

                                {selectDay &&(
                                    <div className=" gap-3 p-5 flex border-b border-solid overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                    {TIME_LIST.map((time) => (
                                      <Button onClick={() => handleTimeSelect(time)} 
                                      variant={selectTime === time ? 'default' : 'outline'} 
                                      key={time}
                                      className=" rounded-full">{time}
                                      </Button>
                                    ))}
                              </div>
                                )}

                                {selectTime && selectDay &&(
                                  <div className=" p-5">
                                    <Card>
                                      <CardContent className=" p-3 space-y-3">

                                        <div className="justify-between flex items-center">
                                          <h2 className=" font-bold">{service.name}</h2>
                                          <p className=" text-sm font-bold">
                                            {Intl.NumberFormat('pt-BR', {
                                              style: 'currency',
                                              currency: 'BRL'
                                              }).format(Number(service.price))}
                                          </p>
                                        </div>

                                        <div className="justify-between flex items-center">
                                          <h2 className=" text-sm text-gray-400">Data</h2>
                                          <p className=" text-sm ">
                                              {format(selectDay, "d 'de' MMMM", {locale: ptBR,})}
                                          </p>
                                        </div>

                                        <div className="justify-between flex items-center">
                                          <h2 className=" text-sm text-gray-400">Horário</h2>
                                          <p className=" text-sm ">
                                              {selectTime}
                                          </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                          <h2 className=" text-sm text-gray-400">Barbearia</h2>
                                          <p className=" text-sm ">
                                              {barbershop.name}
                                          </p>
                                        </div>    
                                      </CardContent>
                                    </Card>
                                  </div>
                                  
                                )}
                                  <SheetHeader className="w-full px-5 mt-5">
                                  <SheetClose asChild>
                                    <Button onClick={handleCreateBooking} 
                                    disabled={!selectDay || !selectTime}>Confirmar</Button>
                                  </SheetClose>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div> 
        </CardContent>
    </Card>
     
    ); 
} 
export default ServiceItem;