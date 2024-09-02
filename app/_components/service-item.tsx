'use client' 
import { Barbershop, BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { date } from "zod";

interface ServiceItemProps {
    service: BarbershopService,
}

const ServiceItem = ({service}: ServiceItemProps) => {

    const TIME_LIST = [
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
    ]

    const [selectDay,setSelectDat] = useState<Date | undefined>(undefined)
    const [selectTime,setSelectTime] = useState<string | undefined>(undefined)

    const handleDateSelect = (date: Date | undefined) => {
        setSelectDat(date)
    }

    const handleTimeSelect = (time: string) => {
        setSelectTime(time)
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

                                {selectDay && (
                                    <div className=" gap-3 p-5 flex overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                    {TIME_LIST.map((time) => (
                                      <Button onClick={() => handleTimeSelect(time)} 
                                      variant={selectTime === time ? 'default' : 'outline'} 
                                      key={time}
                                      className=" rounded-full">{time}
                                      </Button>
                                    ))}
                              </div>
                                )}
                            </SheetContent>
                        </Sheet>
                    </div>
                </div> 
        </CardContent>
    </Card>
     
    ); 
} 
export default ServiceItem;