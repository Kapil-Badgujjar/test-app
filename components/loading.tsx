import loadingAnimation from '@/public/loading-animation.gif'
import Image from 'next/image'

export const Loading = () => {
  return (
    <div className='flex flex-col items-center gap-16 px-32 py-8 shadow-md rounded-md border border-gray-200'>
        <div className='text-2xl'>Please wait</div>
        <Image src={loadingAnimation} alt="loading" width={120} height={120} />
        <div className='text-3xl font-semibold'>Loading...</div>
    </div>
  )
}
