import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Industry } from '../Models/industry';
import { IndustryService } from '../Services/industry.service';
declare let $: any;

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.css']
})


export class IndustryComponent implements OnInit {

  //table loading
  loading: boolean = true;

  @ViewChild('In') In: Table | undefined;

  //delete
  SelectedIndustry : Industry = new Industry();

  
  industries : Industry[] = [];

  //create
  newIndustry : Industry=new Industry();
  
  constructor(private industryService : IndustryService , private messageService : MessageService){

  }
  ngOnInit(): void {

    this.loading = false;
    this.GetIndustries();
}

GetIndustries()
{
  this.industryService.getIndustries().subscribe( (data => { this.industries = data; }),
  (err => {this.showError("An Error Accured While Loading data")})
  
  );
}

OpenIndustryModal()
{
  
  console.log("kko")
}

applyFilterGlobal($event : any) {
  console.log($event );
 this.In!.filterGlobal(($event.data as HTMLInputElement).value,'contains');
 console.log(this.In!.filterGlobal(($event.data as HTMLInputElement).value,'contains'));
}

CreateIndustry()
{
   this.industryService.CreateIndustry(this.newIndustry).subscribe(
    (result=>{
      this.newIndustry =  new Industry();
      this.GetIndustries();
      this.showSuccess("Device Added Successfully") 
      $('#create-Modal').modal('toggle');

    }),
    (err => { this.showError("An Error Accured") })
    );

}

ShowEdit(id:number)
{
  console.log(id);
   this.industryService.getIndustry(id).subscribe(
    result => { 
      this.SelectedIndustry = result 
      //show edit modal
    $('#edit-Modal').modal('toggle');
});
    
}

EditIndustry()
{
  this.industryService.EditIndustry(this.SelectedIndustry).subscribe(
   (result => { 
    console.log("edit >",result);
    this.SelectedIndustry = new Industry() ;
    this.GetIndustries();
    $('#edit-Modal').modal('toggle');
    this.showSuccess("Device updated Successfully")
  }),
  (err => {this.showError("An Error Accured") })
  ); 
}


SelectIndustry(id:number)
{
  console.log(id);
   this.industryService.getIndustry(id).subscribe(
    result => { this.SelectedIndustry = result });    
}

RemoveIndustry()
{
  console.log(this.SelectedIndustry);
  $('#confirmdialog').modal('toggle');
  this.industryService.RemoveIndustry(this.SelectedIndustry.id).subscribe(
   (result => { 
      this.SelectedIndustry = new Industry();
      //get industries 
     this.GetIndustries();
     this.showSuccess("Device deleted Successfully")
    }),
    (err => {
      this.showError("An Error Accured")
    }));

}

showSuccess(Msg :string) {
  this.messageService.add({severity:'success', summary: 'Success', detail: Msg});
}

showError(Msg:string) {
  this.messageService.add({severity:'error', summary: 'Error', detail: Msg});
}



}
