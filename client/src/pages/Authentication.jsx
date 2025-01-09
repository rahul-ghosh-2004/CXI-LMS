import React, { useState } from "react"
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

const Authentication = () => {
    const [ signupInput, setSignupInput ] = useState({
        name: "", email: "", password: ""
    })

    const [signinInput, setSigninInput] = useState({
        email: "", password: ""
    })

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
                                <Input id="name" type={"text"} placeholder={"Enter your name ..."} required={true}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">E-Mail</Label>
                                <Input id="email" type={"email"} placeholder={"e.g., abc@example.com"} required={true}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type={"password"} placeholder={"Enter your password ..."} required={true}/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Sign Up</Button>
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
                                <Input id="email" type="email" placeholder={"e.g., abc@example.com"} required={true} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder={"Enter your password ..."} required={true}/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Sign In</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Authentication