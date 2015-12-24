package com.vekomy.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection="utcType")
public class TypeNumbers {
	
	private String typeIdentity;
	private String purposeOfRegistration;
	private List<String> applicableUTC;
//	private Integer autoIncrementor;
	
	


	public String getTypeIdentity() {
		return typeIdentity;
	}

	public void setTypeIdentity(String typeIdentity) {
		this.typeIdentity = typeIdentity;
	}

	public String getPurposeOfRegistration() {
		return purposeOfRegistration;
	}

	public void setPurposeOfRegistration(String purposeOfRegistration) {
		this.purposeOfRegistration = purposeOfRegistration;
	}

	public List<String> getApplicableUTC() {
		return applicableUTC;
	}

	public void setApplicableUTC(List<String> applicableUTC) {
		this.applicableUTC = applicableUTC;
	}

	
}
