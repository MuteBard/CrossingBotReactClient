let interpretMonth = (month) => {
    let result = ""
    switch(month){
        case "JAN" : 
            result =  "January";
            break;
        case "FEB" : 
            result =  "Feburary";
            break;
        case "MAR" : 
            result =  "March";
            break;
        case "APR" : 
            result =  "April";
            break;
        case "MAY" : 
            result =  "May";
            break;
        case "JUN" : 
            result =  "June";
            break;
        case "JUL" : 
            result =  "July";
            break;
        case "AUG" : 
            result =  "August";
            break;
        case "SEPT" : 
            result =  "September";
            break;
        case "OCT" : 
            result =  "October";
            break;
        case "NOV" : 
            result =  "November";
            break;
        case "DEC" : 
            result =  "December"; 
            break;
        default :
            result = "" 
    }
    return result
}

let localHour = (hour) => {
    var d = new Date()
    var gmtHours = -d.getTimezoneOffset()/60;
    if(hour + gmtHours < 0){
      return 24 + hour + gmtHours
    }else if(hour + gmtHours >= 24){
      return -24 + hour + gmtHours
    }else{
      return hour + gmtHours
    } 
}

let time = {
	interpretMonth,
    localHour
}

export default time;