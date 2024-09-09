import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { userInfo } from "os";
import { BookingItem } from "../_components/booking-item";


const Bookings = async () => {

    const session = await getServerSession(authOptions)
    if(!session?.user){ 
        return notFound()}//mostrar popup de loguin
        
    const confirmedBookings = await db.booking.findMany({
        where:{
            userId: (session.user as any).id,
            date: {
                gte: new Date(),
            }
        },
        include: { //incluimos o service no booking, e o barbershop no service
            service: {
                include: {
                    barbershop: true
                }
            }
        }
    })

    const concludedBookings = await db.booking.findMany({
        where:{
            userId: (session.user as any).id,
            date: {
                lt: new Date()
            }
        },
        include: { //incluimos o service no booking, e o barbershop no service
            service: {
                include: {
                    barbershop: true
                }
            }
        }
    })

    return ( 
        <>
            <Header/>
            <div className=" p-5 space-y-3">
                <h1 className=" text-xl font-bold">Agendamentos</h1>
                <h2 className="mb-3 mt-6 uppercase text-xs font-bold text-gray-400 ">Confirmados</h2>
                {confirmedBookings.map((booking) => (
                    <BookingItem 
                    key={booking.id}
                    booking={booking}/>  
                ))}
                <h2 className="mb-3 mt-6 uppercase text-xs font-bold text-gray-400 ">Finalizados</h2>
                {concludedBookings.map((booking) => (
                    <BookingItem 
                    key={booking.id}
                    booking={booking}/>  
                ))}
            </div>
        </>
     );
}
 

export default Bookings;