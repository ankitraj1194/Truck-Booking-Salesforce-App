public with sharing class truckList {
    @AuraEnabled(Cacheable=true)
    public static List<Truck__c> search(){
        return [SELECT Id,Name,Truck_Number__c,Image__c,Maximum_Load__c,Total_Cost__c FROM Truck__c WHERE Available__c = TRUE ];
    }
}
