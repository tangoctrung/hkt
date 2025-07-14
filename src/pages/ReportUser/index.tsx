import React from 'react'

function ReportUser() {
  // useEffect(() => {
  //   setIsLoading(true)
  //   getCustomers()
  //     .then((res) => {
  //       let customers = [...res?.data?.data?.customers]
  //       let customers1 = customers?.map((item: any, index: number) => {
  //         return { stt: index + 1, ...item }
  //       })
  //       setDataCustomers(customers1)
  //       setDataCustomersReal(customers1)
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return (
    <div className='w-full h-full'>
      ReportUser
    </div>
  )
}

export default ReportUser