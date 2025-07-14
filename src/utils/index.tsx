export function formatCurrencyVND(number: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(number);
}

export function convertErrApi(err: any) {
  const message = err?.response?.data?.message || "Hệ thống gặp gián đoạn";
  if (message === "System error") {
    return "Hệ thống gặp gián đoạn";
  }
  return message
}

export function formatDateToTimestring(date: string) {
  const time = new Date(date);
  const year = time.getFullYear()
  const month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
  const day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate()

  return year + "-" + month + "-" + day;
}