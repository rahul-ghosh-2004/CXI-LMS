import React from "react"
import { Button } from "@/components/ui/button"
import Authentication from "./pages/Authentication.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
    return (
        <div>
            <Navbar />
            <Authentication />
        </div>
    )
}

export default App;