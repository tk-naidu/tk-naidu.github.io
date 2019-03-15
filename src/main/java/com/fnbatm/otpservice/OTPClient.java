package com.fnbatm.otpservice;

public class OTPClient {
    String clientID="";
    boolean status=false;
    String statusMsg="";
    String otp=null;
    
    public OTPClient(String clientID) {
    	this.clientID=clientID;
    }
}
