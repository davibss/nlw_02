export default function convertHourToMinutes(time: String){
    const [hour, minute] = time.split(":").map(number => Number(number));
    return (hour*60) + minute;
}