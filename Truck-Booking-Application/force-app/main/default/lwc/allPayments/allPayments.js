import { LightningElement,wire,api } from 'lwc';
import getpaymentList from '@salesforce/apex/paymentList.paymentList';

const table_columns =[
{label:'pay Name', fieldName:'NameUrl', type:'url' ,typeAttributes:{label:{fieldName:'Name'}}},
{label:'Truck Booking',fieldName:'Truck_Booking',type:'text'},
{label:'Payment date',fieldName:'Payment_date__c',type:'Date'},
{label:'Bill amount',fieldName:'Bill_amount__c',type:'Currency'},
{label:'Payment installment',fieldName:'Payment_installment__c',type:'Picklist'},
];
export default class AllPayments extends LightningElement {
columns = table_columns; 
payments;
error;
connectedCallback(){
this.fetchPayments();
}
fetchPayments(){
getpaymentList()
.then(data=>{
    let result=[];
    data.forEach(dataItem=>{
        let tempData = {};
        tempData={...dataItem};
        tempData.Truck_Booking= dataItem.Truck_Booking__r.Name;
        tempData.NameUrl='/'+dataItem.Id;
        result.push(tempData);
    })
    this.payments=result;
})
.catch(error=>{
    this.error=error;
})
}
}