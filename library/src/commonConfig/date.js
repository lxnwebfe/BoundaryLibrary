let date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
month = month < 10 ? '0' + month : month
let day = date.getDate()

const myDate = {
  year: year,
  month: month,
  day: day
}
export default myDate
