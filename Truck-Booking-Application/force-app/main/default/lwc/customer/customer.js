import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getTruckList from '@salesforce/apex/truckList.search';
import truckBookingPage from './truckBookingPage.html';
import customer from './customer.html';
import load from './load.html';

const table_columns = [{
        label: 'Click to book',type: 'button',typeAttributes: {label: 'Book this truck',title: 'Preview', variant: 'border-filled',},cellAttributes:{alignment:'center'}},
        {label:'Name', fieldName:'Name', type:'text',cellAttributes:{alignment:'center'}},
        {label :'Truck Number',fieldName:'Truck_Number__c',type:'Number',cellAttributes:{alignment:'center'}},
        {label:'Image', fieldName:'Image', type:'image',cellAttributes:{alignment:'center'} },
        {label:'Maximum Load(In Kgs)', fieldName:'Maximum_Load__c', type:'number',cellAttributes:{alignment:'center'}},
        {label:'Cost / K.M. (in INR)', fieldName:'Total_Cost__c', type:'number',cellAttributes:{alignment:'center'}},];
                  

export default class truckList extends LightningElement {
@api recordId;
error;
bookingId;
columns = table_columns;
record = {};
page = 1;
show = false;
trucks;
@wire(getTruckList) 
//Handling errors
wiredTrucks({ error, data }) {
  if (data) {
    let tempRecords = [];
              data.forEach(element => {
              //we cant use images in datatable so using all these 
              let tempElement = {...element };
              let parser = new DOMParser();
              let htmlDoc = parser.parseFromString(element.Image__c, 'text/html');
              console.log(htmlDoc.getElementsByTagName('img')[0].src);
              tempElement.Image = htmlDoc.getElementsByTagName('img')[0].src;
              tempRecords.push(tempElement);
          });
              this.trucks = tempRecords;
              this.error = undefined;
          
          } else if (error) {
              this.error = error;
              this.trucks = undefined;
          }
}

//selection of particular row 
callRowaction(event){
    
            this.record = event.detail.row;
            this.page = 2;
      
}

//function of NEXT BUTTON
handleSuccess1(event){
            this.bookingId = event.detail.id;
            this.page=3;
            console.log('booking id'+ this.bookingId);

}
goBack(){
            this.page--;
}
goHome(){
             this.page=1;
}


//Function of Add Approximate Load BUTTON
handleButton(event){
            this.page=3;
            console.log('page   '+ this.page);
}

//render
render(){
            if (this.page===3)
            return load;
            else  if (this.page===2)
            return  truckBookingPage;
            else if (this.page===1);
            return  customer;
}
// save % save New code 
saveAndNew = false;

handleSave() {
this.saveAndNew = false;
this.handleRecordSave();
}

handleSaveAndNew() {
this.saveAndNew = true;
this.handleRecordSave();
}

handleReset(event) {
const inputFields = this.template.querySelectorAll(
  'lightning-input-field'
);
if (inputFields) {
  inputFields.forEach(field => {
      if(!(field.name === "truckBooking")) {
          field.reset();
      }
  });
}
}

handleSuccess() {
if(this.saveAndNew){
  this.handleReset();
} else{
  location.reload();
}
}

handleRecordSave() {
this.template.querySelector('lightning-record-edit-form').submit(this.fields);
}
}
