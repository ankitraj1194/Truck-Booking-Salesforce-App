public with sharing class truckManager {
@AuraEnabled(Cacheable=true)
public static List<Truck_Booking__c> fetchbookings(String search){
String SearchItem = '%'+search+'%';
return [SELECT id,Name,Truck__r.Name,Status_of_Booking__c FROM Truck_Booking__c WHERE Name like: SearchItem];
}
@AuraEnabled(Cacheable=true)
public static List<Truck_Load__c> fetchload(String search){
String SearchItem = '%'+search+'%';
return[SELECT id,Name FROM Truck_Load__c WHERE Truck_Booking__r.Name like: SearchItem];
}
@AuraEnabled(Cacheable=true)
public static List<Payment__c> fetchpayment(String search){
String SearchItem = '%'+search+'%';
return [SELECT ID,Name,Bill_amount__c,Payment_installment__c FROM Payment__c WHERE Truck_Booking__r.Name like: SearchItem ];

}
}
