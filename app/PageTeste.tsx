
import { db } from "./_lib/prisma";
import Home from "./page";

const PageTeste = async () => {

    const barbershops = await db.barbershop.findMany({}); 
    const PopularBarbershops = await db.barbershop.findMany({ orderBy: { name: "desc",
  }});
    return ( <div>
        <Home  barbershops={barbershops} PopularBarbershops={PopularBarbershops}/>
    </div> );
}
 
export default PageTeste;