import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
function submitSuccess({status}){
    return (
        <Alert>
            <AlertDescription>
                Entry was {status}
            </AlertDescription>
        </Alert>
    )
}

export default submitSuccess