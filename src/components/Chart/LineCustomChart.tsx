import React from 'react'

function LineCustomChart({ labelsPrimary, dataPrimary }: {
  labelsPrimary?: string[];
  dataPrimary?: any[]
}) {

  const labelsExample = ["Hệ điều hành", "Số người sử dụng"]
  const dataExample = [
    {
      label: "Windows",
      value: 28
    },
    {
      label: "iOS",
      value: 30
    },
    {
      label: "Android",
      value: 46
    },
    {
      label: "Ubuntu",
      value: 16
    },
    {
      label: "MacOS",
      value: 22
    },
  ]

  const data = dataPrimary || dataExample
  const labels = labelsPrimary || labelsExample

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className='w-full h-full'>
      <div className='flex justify-between items-center'>
        {labels?.map((item: string, index: number) => (
          <p className='font-semibold text-gray-500' key={index}>{item}</p>
        ))}
      </div>
      <div className='flex flex-col mt-6'>
        {data?.map((item: any, index: number) => (
          <div className='relative font-semibold flex justify-between items-center py-3' key={index}>
            <p>{item?.label}</p>
            <p>{item?.value}</p>
            <p className='absolute h-[1px] z-[19] left-0 bottom-0 bg-gray-200 w-full' />
            <p className='absolute h-[2px] z-20 left-0 bottom-0 bg-blue-600'
              style={{ width: `${item?.value * 100 / total}%` }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LineCustomChart