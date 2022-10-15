public with sharing class truckBookingsByCustomer {
@AuraEnabled(Cacheable=true)
public static List<Truck_Booking__c> truckBookingsByCustomer() {
    return [SELECT id,Name,Truck__r.Name,Booking_Date__c,Pickup_point__c,Delivery_point__c,Status_of_Booking__c,Total_truck_load_weight__c,Customer_phone_number__c FROM Truck_Booking__c ];
    }
}