import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "toMinute"
})
export class ToMinutePipe implements PipeTransform {
    transform(value: number, args?: any): any {
        console.log(value);

        const minutes = Math.floor(value / 60);
        const seconds = value % 60;
        console.log('minutos ' , minutes);
        console.log('segundps ', seconds);

        const format = num => {
            if (num < 10) {
                return `0${num}`;
            }
            return num;
        };

        return `${minutes}:${format(seconds)}`;
    }
}
