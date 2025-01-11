import { Menu, School } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from './ui/button'
import ModeToggle from '.././ModeToggle'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Separator } from '@radix-ui/react-dropdown-menu'

function Navbar() {
    const user = false
    const role = "instructor"

    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            {/* for desktop view */}
            <div className='md:flex max-w-7xl mx-auto hidden justify-between items-center h-full gap-10'>
                <div className='flex items-center justify-center gap-x-5'>
                    <School size={30} />
                    <h1 className='hidden md:block font-extrabold text-2xl'>CODEXINTERN</h1>
                </div>
                {/* User & Dark mode icon */}
                <div className='flex gap-x-2 items-center justify-center'>
                    {
                        user ? (<DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="cursor-pointer">
                                        Dashboard
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        My Learning
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        Edit Profile
                                    </DropdownMenuItem>
                                    {/* <DropdownMenuItem className="cursor-pointer">
                                        Logout
                                    </DropdownMenuItem> */}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>) : (
                            <div className='flex gap-x-2'>
                                <Button className="bg-white text-black hover:bg-gray-200 hover:text-black">Sign Up</Button>
                                <Button>Sign In</Button>
                            </div>
                        )
                    }
                    <ModeToggle />
                </div>
            </div>

            {/* for mobile view */}
            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <div className='flex items-center justify-center flex-col gap-x-5'>
                    <School size={20} />
                    <h1 className='font-extrabold'>CODEXINTERN</h1>
                </div>
                <div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" className=" bg-gray-200 hover:bg-gray-200" variant="outline">
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader className="flex flex-row justify-between items-center mt-2 mb-4">
                                <SheetTitle>CODEXINTERN</SheetTitle>
                                <ModeToggle />
                            </SheetHeader>
                            <Separator className='mr-2' />
                            <nav className='flex flex-col space-y-4'>
                                {/* <span>Dashboard</span> */}
                                <span>My Learnings</span>
                                <span>Edit Profile</span>
                                <span>Logout</span>
                            </nav>
                            {
                                role === "instructor" && (
                                    <SheetFooter className="mt-2">
                                        <SheetClose asChild>
                                            <Button type="submit">Dashboard</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                )
                            }
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}

export default Navbar
