import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import EditForm from "@/components/EditForm.tsx";
import {useState} from "react";

const Edit = ({entry, setFormUpdated}) => {
    let [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="link">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Entry</DialogTitle>
                    <DialogDescription>
                        Edit your translation. Click Update when done.
                    </DialogDescription>
                </DialogHeader>
                <EditForm setOpen={setOpen} entry={entry} setFormUpdated={setFormUpdated}></EditForm>
            </DialogContent>
        </Dialog>
    )
}

export default Edit