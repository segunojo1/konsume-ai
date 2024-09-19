import { Skeleton } from "@/components/ui/skeleton"

export function DashboardBlogSkeleton() {
    return (
        <div className=" flex flex-col items-start gap-4 py-6 px-3 rounded-[34px] border  lg:w-full w-fit mx-auto md:min-w-fit min-w-full">
            <Skeleton className="mx-auto w-[230px] h-[18px]" />
            <Skeleton className="justify-between flex flex-col w-[240px] min-h-[130px] animate-pulse px-3 pt-3 relative -z-10 rounded-lg  " />
                {/* <div className="flex justify-between">
                    <Skeleton className="h-[14px] w-[38px] " />
                </div>
                <div className="flex justify-between flex-col mb-14">
                    <Skeleton className="w-[326px] h-[45px]" />
                </div> */}
            <div className='flex gap-5 items-center'>
                <Skeleton className='w-[39px] h-[32px]' />
                <Skeleton className='w-[100px] h-[34px]' />
            </div>
        </div>
    )
}

