"use client";

export default function Gallery() {
  return (
    <div className="container mx-auto p-1 lg:p-5 rounded-3xl shadow-[0_1px_5px_rgba(0,0,0,0.2)]">
      <div className="-m-0.5 flex flex-wrap md:-m-1">
        {/* Column 1 */}
        <div className="flex w-1/2 flex-wrap">
          <div className='w-full p-0.5 md:p-1'>
            <div className='flex h-[300px] w-full rounded-lg bg-gray-300 items-center justify-center'>
              <p className='text-black'>Photo 1</p>
            </div>
          </div>
          <div className='flex w-full p-0.5 md:p-1'>
            <div className='w-1/3 p-0.5 md:p-1'>
              <div className='flex h-[150px] w-full rounded-lg bg-gray-400 items-center justify-center'>
                <p className='text-black'>Photo 2</p>
              </div>
            </div>
            <div className='w-1/3 p-0.5 md:p-1'>
              <div className='flex h-[150px] w-full rounded-lg bg-gray-500 items-center justify-center'>
                <p className='text-black'>Photo 3</p>
              </div>
            </div>
            <div className='w-1/3 p-0.5 md:p-1'>
              <div className='flex h-[150px] w-full rounded-lg bg-gray-600 items-center justify-center'>
                <p className='text-black'>Photo 4</p>
              </div>
            </div>
          </div>
          <div className='w-1/2 p-0.5 md:p-1'>
            <div className='flex h-[170px] w-full rounded-lg bg-gray-700 items-center justify-center'>
              <p className='text-black'>Photo 5</p>
            </div>
          </div>
          <div className='w-1/2 p-0.5 md:p-1'>
            <div className='flex h-[170px] w-full rounded-lg bg-gray-800 items-center justify-center'>
              <p className='text-black'>Photo 6</p>
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className="flex w-1/2 flex-wrap">
          {/* Top row (1/2 height) */}
          <div className='w-full p-0.5 md:p-1'>
            <div className='flex h-[320px] w-full rounded-lg bg-gray-500 items-center justify-center'>
              <p className='text-black'>Photo 7</p>
            </div>
          </div>
          {/* Bottom row (1/2 height) */}
          <div className='w-full p-0.5 md:p-1'>
            <div className='flex h-[310px] w-full rounded-lg bg-gray-600 items-center justify-center'>
              <p className='text-black'>Photo 8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}