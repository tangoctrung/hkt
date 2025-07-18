export function formatCurrencyVND(number: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(number);
}

export function formatNumberEN(number: number) {
  if (!number || number === 0) return "0"

  if (number < 1000) {
    return number
  }

  if (number < 1000000) {
    return Math.round((number / 1000) * 10) / 10 + "K"
  }

  if (number < 1000000000) {
    return Math.round((number / 1000000) * 10) / 10 + "M"
  }
  return Math.round((number / 1000000000) * 10) / 10 + "B"
  // return new Intl.NumberFormat('en-EN').format(number);
}

export function formatTimeNumber(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m:${secs}s`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const remaining = seconds % 3600;
    const minutes = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return `${formatNumberEN(hours)}h:${minutes}m:${secs}s`;
  }
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

export function formatTimeStringToDDMM(date: string) {
  const time = new Date(date);
  const month = time.getMonth() + 1;
  const day = time.getDate()

  return day + "/" + month;
}

export function validateEmail(email: string) {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
}

export function convertNameLanguage(language: string) {
  switch (language) {
    case "us":
      return "English";
    case "fr":
      return "French";
    case "jp":
      return "Japanese";
    case "th":
      return "Thai";
    case "tw":
      return "Chinese";
    case "id":
      return "Indonesian";
    case "kr":
      return "Korean";
    case "ph":
      return "Filipino";
    case "sg":
      return "English(Sin)";
    default:
      return "Vietnamese";
  }
}

export function convertNameCountry(country: string) {
  switch (country) {
    case "United States":
      return "US";
    case "France":
      return "FR";
    case "Japan":
      return "JP";
    case "Thailand":
      return "TH";
    case "Taiwan":
      return "TW";
    case "Indonesia":
      return "ID";
    case "South Korea":
      return "KR";
    case "Philippines":
      return "PH";
    case "Singapore":
      return "SG";
    default:
      return "VN";
  }
}