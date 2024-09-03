'use server'

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface getBookingsProps {
    serviceId: string,
    date: Date
}

export const getBookings = ({ date, serviceId }: getBookingsProps) => {
    return db.booking.findMany({
        where: {
            date: {
                lte: endOfDay(date), //menor ou igual doq o final do dia
                gte: startOfDay(date) //maior ou igual doq inicio do dia
            }
        }
    })
}