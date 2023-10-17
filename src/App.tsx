import './App.css'
import List from "./components/List"
import Translate from "./components/Translate.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {useState} from "react";
import SubmitSuccess from "@/components/SubmitSuccess.tsx";


function App() {
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formUpdated, setFormUpdated] = useState(false)



  return (
      <Card className="w-[800px]">
        <CardHeader>
            <CardTitle>List of Entries</CardTitle>
            <CardContent>
                {formSubmitted && <SubmitSuccess status={"Submitted"}></SubmitSuccess>}
                {formUpdated && <SubmitSuccess status={"Updated"}></SubmitSuccess>}
            </CardContent>
            <CardContent className="flex content-normal">
                <Translate setFormSubmitted={setFormSubmitted}></Translate>
            </CardContent>
        </CardHeader>
        <CardContent>
          <List formSubmitted={formSubmitted} formUpdated={formUpdated} setFormUpdated={setFormUpdated}></List>
        </CardContent>
      </Card>

  )
}

export default App
