import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import SubmitError from "@/components/SubmitError";

import {URL} from "@/Models/url";
import {useState} from "react";

const formSchema = z.object({
    english: z.string().min(2, {
        message: "English must be at least 2 characters"
    }),
    creole: z.string().min(1, {
        message: "Creole must have at least one character"
    }),
})

async function translate(value: {text: string}){
    const response = await fetch(URL + 'infer/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(value)
    })

    return response.json()
}

async function submitEntry(data : {english: string, creole: string}){
    console.log(data)
    const response = await fetch(URL + 'entries/add/', {
        method: 'POST',
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data)
    })
    console.log(response)
    return response.status === 200;
}
const TranslateForm = ({setOpen, setFormSubmitted}) =>{
    const [isError, setIsError] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            english: "",
            creole: "",
        }
    })


    function onSave(values: z.infer<typeof formSchema>){
        submitEntry(values).then((success:boolean) => {
            if(success){
                setFormSubmitted(true)
                setOpen(false)
            }
            else
                setIsError(true)
        })

    }

    function onEnter(event){
        const value:string = event.target.value

        if(value.length > 2){
            const english: {text: string}  = {
                text: value
            }

            translate(english).then((data : {translatedText: string}) => {
                form.setValue('creole', data.translatedText)
            })
        }
    }


    const onCancel = () => setOpen(false)


    return (

        <Form {...form}>
            {isError && <SubmitError></SubmitError>}
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
                <FormField
                    control={form.control}
                    name = "english"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>English</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type English sentence here." {...field} onBlur={onEnter}>
                                </Textarea>
                            </FormControl>
                        </FormItem>
                    )}/>
                <FormField
                    control={form.control}
                    name = "creole"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Creole</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Creole Translation goes here" {...field} >
                                </Textarea>
                            </FormControl>
                        </FormItem>
                    )}/>
                <Button variant="outline" name="cancel" onClick={onCancel} type="button">Cancel</Button><Button type="submit">Save</Button>
            </form>
        </Form>
    )
}

export default TranslateForm