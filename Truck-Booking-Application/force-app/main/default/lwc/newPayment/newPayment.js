import { LightningElement } from 'lwc';
import Name from '@salesforce/schema/Payment__c.Name';
import Truck_Booking_Name from '@salesforce/schema/Payment__c.Truck_Booking__c';
import Payment_date from '@salesforce/schema/Payment__c.Payment_date__c';
import Bill_amount from '@salesforce/schema/Payment__c.Bill_amount__c';
import Payment_installment from '@salesforce/schema/Payment__c.Payment_installment__c';


export default class NewPayment extends LightningElement {
    fields=[Name,Truck_Booking_Name,Payment_date,Bill_amount,Payment_installment];
}