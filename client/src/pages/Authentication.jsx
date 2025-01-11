import React, { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

const Authentication = () => {
    const [credentials, setCredentials] = useState({
        name: "", email: "", password: ""
    })
    const [loading, setLoading] = useState(false)

    const handleNameChange = (e) => {
        setCredentials({
            ...credentials,
            name: e.target.value
        })
    }

    const handleEmailChange = (e) => {
        setCredentials({
            ...credentials,
            email: e.target.value
        })
    }

    const handlePasswordChange = (e) => {
        setCredentials({
            ...credentials,
            password: e.target.value
        })
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)

        const signupURL = "http://localhost:3000/api/v1/cxi/user/register"
        const data = {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password
        }

        try {
            const response = await axios.post(
                signupURL,
                data,
                {
                    credentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            setLoading(false)
            setCredentials({
                name: "", email: "", password: ""
            })

            console.log(response?.data)
        } catch (error) {
            setLoading(false)
            console.log(error?.response?.data)
        }
    }

    const handleSignin = async (e) => {
        e.preventDefault()
        setLoading(true)

        const loginURL = "http://localhost:3000/api/v1/cxi/user/login"
        const data = {
            email: credentials.email,
            password: credentials.password
        }

        try {
            const response = await axios.post(
                loginURL,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            setCredentials({
                name: "", email: "", password: ""
            })
            setLoading(false)

            console.log(response?.data)

        } catch (error) {
            setLoading(false)
            console.log(error?.response?.data)
        }
    }

    return (
        <div className={"flex items-center justify-center mt-10"}>
            <Tabs defaultValue="signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Account</CardTitle>
                            <CardDescription>
                                Create an account if you are a new user!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type={"text"} placeholder={"Enter your name ..."} onChange={handleNameChange}
                                    value={credentials.name} required={true} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">E-Mail</Label>
                                <Input id="email" type={"email"} placeholder={"e.g., abc@example.com"} onChange={handleEmailChange} value={credentials.email} required={true} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type={"password"} placeholder={"Enter your password ..."} onChange={handlePasswordChange} value={credentials.password} required={true} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSignup}>
                                {
                                    loading ? (
                                        <>
                                            <Loader2 className="animate-spin" /> Wait
                                        </>
                                    ) : "Sign Up"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="signin">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signin into your account</CardTitle>
                            <CardDescription>
                                Do signin if you have an account!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">E-Mail</Label>
                                <Input id="email" type="email" placeholder={"e.g., abc@example.com"} onChange={handleEmailChange} value={credentials.email} required={true} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder={"Enter your password ..."} onChange={handlePasswordChange} value={credentials.password} required={true} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSignin}>
                                {
                                    loading ? (
                                        <>
                                            <Loader2 className="animate-spin" /> Wait
                                        </>
                                    ) : "Sign In"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Authentication