package com.vekomy.dao;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.google.gson.Gson;
import com.vekomy.model.Customer;
import com.vekomy.model.DataNotFoundException;
import com.vekomy.model.UTCType;
import com.vekomy.model.TypeNumbers;

public class CMToolDao {
	@Autowired
	private MongoTemplate mongoTemplate;
	
	

	 
	 
	 public void saveUTC(UTCType utc){
		 mongoTemplate.save(utc);
	 }
	 
	 public void saveCustomer(Customer customer){
		 mongoTemplate.save(customer);
	 }
	 public void saveUtcType(TypeNumbers utcSource){
		 Query query = new Query(Criteria.where("typeIdentity").is(utcSource.getTypeIdentity()).andOperator(Criteria.where("applicableUTC").is(utcSource.getApplicableUTC())));
		 TypeNumbers source = mongoTemplate.findOne(query, TypeNumbers.class);
		 if(source == null){
//			 utcSource.setAutoIncrementor(1);
			 mongoTemplate.insert(utcSource);
		 }else{
//			 utcSource.setAutoIncrementor(source.getAutoIncrementor()+1);
			 mongoTemplate.insert(utcSource);	 
		 }
		 
		 
	 }
	 
	 public void updateUtcType(TypeNumbers utcSource){
		 System.out.println("typeIdentity : "+utcSource.getTypeIdentity());
		 System.out.println("purposeOfRegistration : "+utcSource.getPurposeOfRegistration());
		 Query query = new Query(Criteria.where("typeIdentity").is(utcSource.getTypeIdentity()).andOperator(Criteria.where("purposeOfRegistration").is(utcSource.getPurposeOfRegistration())));
		 mongoTemplate.updateFirst(query, Update.update("applicableUTC", utcSource.getApplicableUTC()), TypeNumbers.class);
	 }
	 
	 
	
	public List<UTCType> getUtcCode(){

		return mongoTemplate.findAll(UTCType.class);
		
	}
	public String utcAutoSearch(String inputChar){
		
		Query fnQuery = new Query(Criteria.where("_id").regex(inputChar,
				"i"));
		Query lnQuery = new Query(Criteria.where("utcName").regex(inputChar,
				"i"));

		List<UTCType> fnList = mongoTemplate.find(fnQuery, UTCType.class);
		List<UTCType> lnList = mongoTemplate.find(lnQuery, UTCType.class);


		Set<UTCType> userSet = new HashSet<UTCType>();
		userSet.addAll(fnList);
		userSet.addAll(lnList);

		Set<Object> firstNameList = new HashSet<Object>();
		
		for (UTCType user : userSet) {
			Map<String, String> userMap = new HashMap<String, String>();
			userMap.put("_id", user.getUtcIdentifier());
			userMap.put("utcName", user.getUtcIdentifier() + "  " + user.getUtcName());
			firstNameList.add(userMap);
		}

		if (firstNameList.size() != 0) {
			return new Gson().toJson(firstNameList);
		} else {
			Map<String, String> userMap = new HashMap<String, String>();
			userMap.put("utcName", "No Record Found");
			firstNameList.add(userMap);
			return new Gson().toJson(firstNameList);
		}
	}
	
	
public String typeReferenceAutoSearch(String inputChar){
		
		Query fnQuery = new Query(Criteria.where("typeIdentity").regex(inputChar,
				"i"));
		Query lnQuery = new Query(Criteria.where("purposeOfRegistration").regex(inputChar,
				"i"));

		List<TypeNumbers> fnList = mongoTemplate.find(fnQuery, TypeNumbers.class);
		List<TypeNumbers> lnList = mongoTemplate.find(lnQuery, TypeNumbers.class);


		Set<TypeNumbers> userSet = new HashSet<TypeNumbers>();
		userSet.addAll(fnList);
		userSet.addAll(lnList);

		Set<Object> firstNameList = new HashSet<Object>();
		
		for (TypeNumbers typeRef : userSet) {
			Map<String, String> userMap = new HashMap<String, String>();
			userMap.put("utcTypeRef", typeRef.getTypeIdentity() + "  " + typeRef.getPurposeOfRegistration());
			firstNameList.add(userMap);
		}

		if (firstNameList.size() != 0) {
			return new Gson().toJson(firstNameList);
		} else {
			Map<String, String> userMap = new HashMap<String, String>();
			userMap.put("utcTypeRef", "No Record Found");
			firstNameList.add(userMap);
			return new Gson().toJson(firstNameList);
		}
	}

public String customerAutoSearch(String inputChar){
	
	Query fnQuery = new Query(Criteria.where("_id").regex(inputChar,
			"i"));
	Query lnQuery = new Query(Criteria.where("customerName").regex(inputChar,
			"i"));

	List<Customer> fnList = mongoTemplate.find(fnQuery, Customer.class);
	List<Customer> lnList = mongoTemplate.find(lnQuery, Customer.class);


	Set<Customer> userSet = new HashSet<Customer>();
	userSet.addAll(fnList);
	userSet.addAll(lnList);

	Set<Object> firstNameList = new HashSet<Object>();
	
	for (Customer customer : userSet) {
		Map<String, String> userMap = new HashMap<String, String>();
		userMap.put("customerList", customer.getCustomerId() + "  " + customer.getCustomerName());
		firstNameList.add(userMap);
	}

	if (firstNameList.size() != 0) {
		return new Gson().toJson(firstNameList);
	} else {
		Map<String, String> userMap = new HashMap<String, String>();
		userMap.put("customerList", "No Record Found");
		firstNameList.add(userMap);
		return new Gson().toJson(firstNameList);
	}
}
	public UTCType readUTC(String utcCode) throws Exception {
		UTCType utc = null;
		if(utcCode.contains("  ")){
			String[] utcCodes = utcCode.split("\\s+\\s+");
			Query query = new Query(Criteria.where("_id").is(utcCodes[0])
					.andOperator(Criteria.where("utcName").is(utcCodes[1])));
			
			try {
				utc = mongoTemplate.findOne(query, UTCType.class);
				if (utc == null) {
					throw new DataNotFoundException("UTC CODE: " + utcCodes[0]
							+ " and UTC NAME: " + utcCodes[1]
							+ " combination data is not available");
				}
			} catch (Exception e) {
				// need to add logger statement here.
				System.out.println("Exception Occured in readUser() method : " + e);
			}
			
		}else{
		Query query = new Query(Criteria.where("_id").is(utcCode));
		utc = mongoTemplate.findOne(query, UTCType.class);
		}
		return utc;
	}
	
	public Customer readCustomer(String customer) throws Exception {
		Customer utc = null;
		if(customer.contains("  ")){
			String[] customers = customer.split("\\s+\\s+");
			Query query = new Query(Criteria.where("_id").is(customers[0])
					.andOperator(Criteria.where("customerName").is(customers[1])));
			
			try {
				utc = mongoTemplate.findOne(query, Customer.class);
				if (utc == null) {
					throw new DataNotFoundException("Customer Id: " + customers[0]
							+ " and Customer NAME: " + customers[1]
							+ " combination data is not available");
				}
			} catch (Exception e) {
				// need to add logger statement here.
				System.out.println("Exception Occured in readUser() method : " + e);
			}
			
		}else{
		Query query = new Query(Criteria.where("_id").is(customer));
		utc = mongoTemplate.findOne(query, Customer.class);
		}
		return utc;
	}
	
	public List<Customer> loadCustomers() throws Exception {
		 return mongoTemplate.findAll(Customer.class);
	}
	
	public TypeNumbers readUtcTypeRef(String typeReference) throws Exception {
		TypeNumbers typeRef = null;
		if(typeReference.contains("  ")){
			String[] typeRefs = typeReference.split("\\s+\\s+");
			Query query = new Query(Criteria.where("typeIdentity").is(typeRefs[0])
					.andOperator(Criteria.where("purposeOfRegistration").is(typeRefs[1])));
			
			try {
				typeRef = mongoTemplate.findOne(query, TypeNumbers.class);
				if (typeRef == null) {
					throw new DataNotFoundException("Type Number: " + typeRefs[0]
							+ " and Type NAME: " + typeRefs[1]
							+ " combination data is not available");
				}
			} catch (Exception e) {
				// need to add logger statement here.
				System.out.println("Exception Occured in readUtcTypeRef() method : " + e);
			}
			
		}else{
		Query query = new Query(Criteria.where("typeIdentity").is(typeReference));
		typeRef = mongoTemplate.findOne(query, TypeNumbers.class);
		}
		return typeRef;
	}

public UTCType deleteUTC(String utcCode){
	Query query = new Query(Criteria.where("_id").is(utcCode));
	return mongoTemplate.findAndRemove(query, UTCType.class);
}
public Customer deleteCustomer(String customer){
	Query query = new Query(Criteria.where("_id").is(customer));
	return mongoTemplate.findAndRemove(query, Customer.class);
}

public TypeNumbers deleteUtcTypeRef(TypeNumbers utcSource) throws Exception {
	TypeNumbers typeRef = null;
	
		
		Query query = new Query(Criteria.where("typeIdentity").is(utcSource.getTypeIdentity())
				.andOperator(Criteria.where("purposeOfRegistration").is(utcSource.getPurposeOfRegistration())));
		
		typeRef = mongoTemplate.findAndRemove(query, TypeNumbers.class);
	
	return typeRef;
}
}
