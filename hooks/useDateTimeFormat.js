import { DEFAULT_LANGUAGE } from "constants/locale"

const useDateTimeFormat = (timestamp) => {
  const date = new Date(timestamp)
  const language = navigator.language || DEFAULT_LANGUAGE

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }

  return new Intl.DateTimeFormat(language, options).format(date)
}

export default useDateTimeFormat
