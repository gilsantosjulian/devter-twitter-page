const DATE_UNITS = [
  ["day", "86400"],
  ["hour", "3600"],
  ["minute", "60"],
  ["second", "1"],
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (now - timestamp) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (elapsed > secondsInUnit || unit === "second") {
      const value = elapsed / secondsInUnit
      return { value, unit }
    }
  }
}

const useTimeAgo = (timestamp) => {
  const { value, unit } = getDateDiffs(timestamp)
  console.log(value, unit)
  return timestamp
}

export default useTimeAgo
