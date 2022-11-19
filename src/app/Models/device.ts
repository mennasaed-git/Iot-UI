import { Industry } from "./industry";

export class Device {
    id : number ;
    Name : string ;
    AdditionTime : Date ;
    Count : number ;
    Fees : number ;
    IndustryId : number ;
    industry : Industry;
}
