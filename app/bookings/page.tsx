import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { userInfo } from "os";
import { BookingItem } from "../_components/booking-item";
import { Card } from "../_components/ui/card";

const Bookings = async () => {

    const session = await getServerSession(authOptions)
    if(!session?.user){ 
        return notFound()}//mostrar popup de loguin
        
    const bookings = await db.booking.findMany({
        where:{
            userId: (session.user as any).id
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
            <div className=" p-5 ">
                <h1 className=" text-xl font-bold">Agendamentos</h1>
                {bookings.map((booking) => (
                    <BookingItem 
                    key={booking.id}
                    booking={booking}/>  
                ))}
            </div>
        </>
     );
}
 

export default Bookings;