import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button"

import {useState, useEffect} from "react";
import type {Entry} from "../Models/Entry";
import {URL} from "../Models/url"
import EditForm from "@/components/Edit";
import DeleteDialog from "@/components/DeleteDialog.tsx";


async function fetchEntries(): Promise<Entry[]> {
    const response = await fetch(URL + 'entries/')
    return await response.json()
}

const List = ({formSubmitted, formUpdated, setFormUpdated}) => {
    const [entries, setEntries] = useState<Entry[]>([])


    useEffect(() => {
        fetchEntries().then(entries => setEntries(entries))
    }, [formSubmitted, formUpdated])

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>English</TableHead>
                        <TableHead>Creole</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {entries.map(entry => (
                        <TableRow key={entry.id}>
                            <TableCell className="text-left">{entry.english}</TableCell>
                            <TableCell className="text-left">{entry.creole}</TableCell>
                            <TableCell className="text-left">
                                <EditForm entry={entry} setFormUpdated={setFormUpdated}></EditForm>
                                <DeleteDialog id = {entry.id}></DeleteDialog>
                            </TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </>

    );
}

export default List