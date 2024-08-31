'use client'
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({//Define a estrutura e validação dos dados do formulário usando Zod
  search: z.string().trim().min(1, { //basicamente definir o que o usuario digitou
    message: 'Digite algo para buscar.',//mensagem de erro
  })
})

const Search = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),//para conectar o esquema de validação do Zod ao React Hook Form.
        defaultValues: {
          search: "", //define os valores iniciais
        },
      })

    const router = useRouter()

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(`/barbershops/?search=${data.search}`)
    }//recebe os dados do formulario e redireciona pra uma nova Url

    return ( 
            <Form {...form}> 
            {/* aplica as propriedades do React Hook Form ao formulário.*/}
                <form onSubmit={form.handleSubmit(handleSubmit)} className=" flex gap-2 ">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => ( 
                        <FormItem className=" w-full">
                            <FormControl>
                            <Input placeholder="Faça sua busca..." 
                            {...field}
                            className="  w-full" />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit">
                        <SearchIcon/>
                    </Button>
                </form>
            </Form>
     );
}
 {/*render = field Renderiza o campo de entrada.*/} 
 {/*{...field} campo de entrada do form, vinculado ao field do React Hook Form*/} 

export default Search;


