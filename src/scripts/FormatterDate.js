export function FormatterDate(date) {
    date = date.split("T")[0];
    const dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
  
    return day + "/" + month + "/" + year;
}