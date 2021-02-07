export default function convertMinutesToHours(timeInMinutes: number) {
    let hours = timeInMinutes/60;
    let minutes = timeInMinutes % 60;
    const hoursResult = hours.toString().padStart(2,'0');
    const minutesResult = minutes.toString().padStart(2,'0');
    const result = `${hoursResult}:${minutesResult}`;
    return result;
}