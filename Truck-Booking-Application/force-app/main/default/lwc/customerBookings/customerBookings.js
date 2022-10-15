import { LightningElement ,wire,api} from 'lwc';
import gettruckBookingsByCustomer from '@salesforce/apex/truckBookingsByCustomer.truckBookingsByCustomer';

const table_columns = [
                {label:'Booking Name', fieldName:'NameUrl', type:'url' ,typeAttributes:{label:{fieldName:'Name'}}},
                {label :'Truck',fieldName:'TruckName',type:'text'},
                {label:'Pickup point',fieldName:'Pickup_point__c',type : 'Picklist'},
                {label:'Delivery point', fieldName:'Delivery_point__c', type:'Picklist'},
                {label:'Total truck load_weight', fieldName:'Total_truck_load_weight__c', type:'Roll-Up Summary'},
                {label:'Customer_phone_number__c', fieldName:'Customer_phone_number__c', type:'Phone'},
                {label:'Status of Booking', fieldName:'Status_of_Booking__c', type:'Picklist'},
            ];
const pageSize =5;
                
export default class CustomerBookings extends LightningElement {

columns = table_columns; 
bookings;
error;
connectedCallback(){
this.fetchbookings();
}
fetchbookings(){
gettruckBookingsByCustomer()
.then(data =>{
    let result = [];
    data.forEach(dataItem => {
        //for using truckName in feild name (as we cant use Truck__r.Name)
    let tempData = {};
    tempData ={ ...dataItem};
    tempData.TruckName = dataItem.Truck__r.Name;
    tempData.NameUrl='/'+dataItem.Id;
    result.push(tempData);
    })
    this.fullResult = result;
  this.isPaginate=this.fullResult.length>5;
  this.initialLoad();
})
.catch(error=>{
    this.error=error;
})
}


startSize=0;
endSize=pageSize;
isPaginate = false;
fullResult;


handlePrevious()
{

    this.startSize=this.startSize-pageSize;
    this.endSize=this.endSize-pageSize;
    this.bookings=this.fullResult.slice(this.startSize,this.endSize);
    this.template.querySelectorAll('lightning-button')[1].disabled=false;
    if(this.startSize === 0)
    this.template.querySelectorAll('lightning-button')[0].disabled=true;
   
}

handleNext()
{this.startSize=this.startSize+pageSize;
    this.endSize=this.endSize+pageSize;
    this.bookings=this.fullResult.slice(this.startSize,this.endSize);
    this.template.querySelectorAll('lightning-button')[0].disabled=false;
    if(this.endSize >=this.fullResult.length)
      this.template.querySelectorAll('lightning-button')[1].disabled=true;
}
initialLoad()
{
    this.bookings=this.fullResult.slice(this.startSize,this.endSize)   
}
}