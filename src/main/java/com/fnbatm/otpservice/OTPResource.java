package com.fnbatm.otpservice;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("otp")
public class OTPResource {
	
	@GET
	@Path("cid/{clientid}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getOTPStatus(@PathParam("clientid") String clientid) throws InterruptedException {
		OTPClient tempClient= new OTPClient(clientid);
		OTP curOTP= new OTP(tempClient);
		curOTP.generateOTP(5);
		curOTP.sendOTP();
		tempClient= curOTP.verifyOTP(tempClient);
		return tempClient.statusMsg;
	}
}
