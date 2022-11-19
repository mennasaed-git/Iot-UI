import { Component, OnInit } from '@angular/core';
import { Device } from '../Models/device';
import { Industry } from '../Models/industry';
import { DeviceService } from '../Services/device.service';
import { IndustryService } from '../Services/industry.service';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

declare let $: any;


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  //table loading
  loading: boolean = true;
  IndustryId : number=0;
  
  //delete
  SelectedDevice : Device = new Device();

  industries :  Industry[] =[];
  devices : Device[] = [];

  //create
  newDevice : Device=new Device();

  //filter industry needs
  selectedIndustry : Industry = new Industry();
  filteredDevices : Device[] =[];

  constructor(private deviceService : DeviceService , 
    private industryService : IndustryService , 
    private messageService: MessageService){

   
  }
  ngOnInit(): void {
    
    this.loading = false;
    this.selectedIndustry.id =0;
    this.selectedIndustry.Name ="All";
    this.GetIndustries();
    this.GetDevices();
    
}


GetIndustries()
{
  this.industryService.getIndustries().subscribe( data => { this.industries = data; });
}

onChangeIndustry(id : any)
  {
    console.log(id);
    
    
console.log("tststst",this.selectedIndustry);
    if(id == 0)//all
    {
      console.log("all>>")
      this.filteredDevices = this.devices;
      this.selectedIndustry.id = 0;
      this.selectedIndustry.Name ="All";
    }
    else
    {
      console.log("else all >>")

      let match = this.industries.find(x => x.id == id);
      console.log("matchhh >>",match)
       if(match)
         {
           this.selectedIndustry.id = match.id;
           this.selectedIndustry.Name = match.Name;
         }
      //filter devices 
      this.filteredDevices = this.devices.filter(x => x.IndustryId == +id);
    }
    
  }

GetDevices()
{
  // this.deviceService.getDevices().subscribe( data => { this.devices = data; });
  this.deviceService.getDevices()
  .pipe(map(
    (response : Device[]) => {
      const modified = response;
      for(let d of modified){
        this.industryService.getIndustry(d.IndustryId).subscribe(data => { d.industry =data})
      }
      return modified;
    }
  )).subscribe(
    (response => {
      this.devices = response;
      this.filteredDevices = response;
    }),
    (err => { 
      this.showError("An Error Occured  While Loading Data");
    }));
}


CreateDevice()
{
  console.log(this.newDevice);
  this.newDevice.IndustryId = +this.newDevice.IndustryId;
   this.deviceService.CreateDevice(this.newDevice).subscribe(
    (result=>{
      this.newDevice =  new Device();
      this.GetDevices();
      $('#create-Modal').modal('toggle');
      this.showSuccess("Device Added Successfully") 

    }),
    (err => 
       { this.showError("An Error Accured") })
   );
}

ShowEdit(id:number)
{
  console.log(id);
   this.deviceService.getDevice(id).subscribe(
    result => { 
      this.SelectedDevice = result 
      //show edit modal
    $('#edit-Modal').modal('toggle');
});
    
}

EditDevice()
{
  this.deviceService.EditDevice(this.SelectedDevice).subscribe(
   result => { 
    console.log("edit >",result);
    this.SelectedDevice = new Device() ;
    this.GetDevices();
    $('#edit-Modal').modal('toggle');
    this.showSuccess("Device Updated Successfully") 
  },
  (err => {this.showError("An Error Accured")})
  ); 
}


SelectDevice(id:number)
{
  console.log(id);
   this.deviceService.getDevice(id).subscribe(
    result => { this.SelectedDevice = result });    
}

RemoveDevice()
{
  console.log(this.SelectedDevice);
  $('#confirmdialog').modal('toggle');
  this.deviceService.RemoveDevice(this.SelectedDevice.id).subscribe(
    (result => { 
      this.SelectedDevice = new Device();
      //get devices 
     this.GetDevices();
     this.showSuccess("Device deleted Successfully")
    }),
    (error => {this.showError("An Error Accured")}));

}

showSuccess(Msg :string) {
  this.messageService.add({severity:'success', summary: 'Success', detail: Msg});
}

showError(Msg:string) {
  this.messageService.add({severity:'error', summary: 'Error', detail: Msg});
}

}
