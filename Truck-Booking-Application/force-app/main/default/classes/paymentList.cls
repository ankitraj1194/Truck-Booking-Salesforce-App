public with sharing class paymentList {
@AuraEnabled(Cacheable=true)
public static List<Payment__c> paymentList() {
    return [SELECT ID,Truck_Booking__r.Name,Name,Payment_date__c,Bill_amount__c,Payment_installment__c FROM Payment__c ];
}
}
