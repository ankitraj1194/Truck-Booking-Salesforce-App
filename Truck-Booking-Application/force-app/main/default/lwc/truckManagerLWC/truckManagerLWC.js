import { LightningElement,wire,api } from 'lwc';
import fetchbookings from '@salesforce/apex/truckManager.fetchbookings';
import fetchload from '@salesforce/apex/truckManager.fetchload';
import fetchpayment from '@salesforce/apex/truckManager.fetchpayment';

const cols1 = [
    {label:'Truck Booking Name' , fieldName:'NameUrl',type:'url',typeAttributes:{label:{fieldName:'Name'}},cellAttributes:{alignment : 'center'}},
    {label:'Truck Name' , fieldName:'TruckName',type:'text',cellAttributes:{alignment : 'center'}},
    {label:'Booking Status' , fieldName:'Status_of_Booking__c',type:'Picklist',cellAttributes:{alignment : 'center'}}
];
const cols2 = [
    {label:'Load Name' , fieldName:'NameUrl',type:'url',typeAttributes:{label:{fieldName:'Name'}},cellAttributes:{alignment : 'center'}}
]
const cols3 = [
    {label:'Pay Name' , fieldName:'NameUrl',type:'url',typeAttributes:{label:{fieldName:'Name'}},cellAttributes:{alignment : 'center'}},
    {label:'Bill amount' , fieldName:'Bill_amount__c',type:'Currency',cellAttributes:{alignment : 'center'}},
    {label:'Installment' , fieldName:'Payment_installment__c',type:'',cellAttributes:{alignment : 'center'}}
]

export default class TruckManagerLWC extends LightningElement {
    bookings;
    bookingError;
    columns = cols1;

    loads;
    loadError;
    loadcols = cols2;

    payments;
    paymentError;
    paymentcols = cols3;

    isShow=false;

    searchbooking;

    handleInputTruckBooking(event){
        this.searchbooking = event.target.value;
        if(this.searchbooking===''){
        this.searchbooking='@#(&^#@$^&*)()';
        this.isShow=false;
        }
        else{
        this.isShow = true;
        }
        this.fetchTheBookings();
        this.fetchTheLoad();
        this.fetchThePayment();
        }

    fetchTheBookings(){
        fetchbookings({search : this.searchbooking })
        .then(data =>{
                            let result = [];
                            data.forEach(dataItem=>{
                            let tempData ={};
                            tempData={...dataItem};
                            tempData.NameUrl='/'+dataItem.Id;
                            tempData.TruckName = dataItem.Truck__r.Name;
                            result.push(tempData);
        })
                            this.bookings=result;
        })
        .catch(error =>{
                           this.bookingError = error;
        })

    }

    fetchTheLoad(){
        fetchload({search : this.searchbooking })
        .then(data =>{
                            let result = [];
                            data.forEach(dataItem=>{
                            let tempData ={};
                            tempData={...dataItem};
                            tempData.NameUrl='/'+dataItem.Id;
                            result.push(tempData);
                })
                            this.loads=result;
              
                     })
        .catch(error =>{
                     this.loadError = error;
        })
    }

    fetchThePayment(){
        fetchpayment({search : this.searchbooking })
        .then(data =>{
                            let result = [];
                            data.forEach(dataItem=>{
                            let tempData ={};
                            tempData={...dataItem};
                            tempData.NameUrl='/'+dataItem.Id;
                            result.push(tempData);
                })
                            this.payments=result;
                    })
        .catch(error =>{
                            this.paymentError = error;
        })
    }
}