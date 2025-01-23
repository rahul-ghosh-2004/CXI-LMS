import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'
import Course from './Course'
import { MyLearningSkeleton } from './MyLearning'
import { useSelector } from 'react-redux'

function Profile() {
    const isLoading = true;
    const enrolledCourses = [1, 2]
    const { user, isAuthenticated } = useSelector(state => state?.auth?.data)

    // console.log(user)

    return (
        <div
            className='my-24 max-w-4xl mx-auto px-4'>
            <h1 className='font-bold text-2xl text-center md:text-left'>PROFILE</h1>
            <div
                className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
                <div
                    className='flex flex-col items-center'>
                    <Avatar className="cursor-pointer h-24 w-24 md:h-32 md:w-32 mb-4">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Name: <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.name}</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            E-Mail: <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.email}</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Role: <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.role}</span>
                        </h1>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="mt-2 bg-zinc-700 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-700">Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" type="text" placeholder="Enter new name" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        E-Mail
                                    </Label>
                                    <Input id="email" type="email" placeholder="Enter new e-mail" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="profile-photo" className="text-right">
                                        Profile
                                    </Label>
                                    <Input id="profile-photo" accept="image/*" type="file" className="col-span-3 cursor-pointer" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={isLoading} type="submit" className="mt-2 w-full mx-auto bg-zinc-700 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-700">
                                    {
                                        isLoading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                            </>
                                        ) : "Save changes"
                                    }
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='mt-5'>
                <h1 className='font-medium text-lg'>
                    You are enrolled in below courses
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
                    {
                        enrolledCourses.length === 0 ? <h1>You haven't enrolled in any course</h1>
                            : enrolledCourses.map((course, index) => <Course key={index} />)
                    }
                </div>
                {/* {
                    console.log(selector)
                } */}
            </div>
        </div>
    )
}

export default Profile
