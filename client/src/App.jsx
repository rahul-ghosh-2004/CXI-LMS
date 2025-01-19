import React from "react"
// import { Button } from "@/components/ui/button"
import Authentication from "./pages/Authentication.jsx";
// import Navbar from "./components/Navbar.jsx";
import HeroSection from "./pages/student/HeroSection.jsx";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses.jsx";
import MyLearning from "./pages/student/MyLearning.jsx";
import Profile from "./pages/student/Profile.jsx";

const appRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "",
                    element: <>
                      <HeroSection />
                      <Courses />
                    </>
                },
                {
                    path: "my-learning",
                    element: <MyLearning />
                },
                {
                    path: "profile",
                    element: <Profile />
                }
            ]
        },
        {
            path: "auth",
            element: <Authentication />
        }
    ]
)

const App = () => {
    return (
        <main>
            <RouterProvider router={appRouter} />
        </main>
    )
}

export default App;