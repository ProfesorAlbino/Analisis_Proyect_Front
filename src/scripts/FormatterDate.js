export function FormatterDate(date) {
    date = date.split("T")[0];
    const dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
  
    return day + "/" + month + "/" + year;
}

export function FormatterDateToForms(date) {
    const d = new Date(date); // Establecer la hora a medianoche (00:00:00)
    const day = (d.getUTCDate()).toString().padStart(2, '0'); // Usar getUTCDate() en lugar de getDate()
    const month = (d.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() y sumar 1 al mes
    const year = d.getUTCFullYear();

    return `${year}-${month}-${day}`;
};


export function getTimeActually(){
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
   
    if(hour<10){
        hour="0"+hour;
    }
    if(minutes<10){
        minutes="0"+minutes;
    }   
    return hour+":"+minutes;
}