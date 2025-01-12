import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

function Course() {
    return (
        <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className='relative'>
                <img src='https://blog.adobe.com/en/publish/2021/08/31/media_1649ebc3fbbce0df508081913819d491fc3f7c7a9.png?width=750&format=png&optimize=medium' className='w-full h-36 object-cover rounded-t-lg' />
            </div>
            <CardContent className="px-5 py-4 space-y-3">
                <h1 className='hover:underline font-semibold text-lg truncate cursor-pointer'>AWS Certified Trainer Course (English)</h1>
                <div className='flex items-center justify-between mt-1'>
                    <div className='flex items-center gap-3'>
                        <Avatar className="cursor-pointer h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className='font-medium text-sm'>Rahul Ghosh</h1>
                    </div>
                        <Badge className={"bg-blue-600 text-white px-2 py-1 hover:bg-blue-700"}>Beginner</Badge>
                </div>
                <div className='text-lg font-bold'>
                    <span className=''>₹399</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default Course
