package com.obstreperus.web.infosec;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.google.gson.Gson;
import com.vekomy.dao.CMToolDao;
import com.vekomy.model.Customer;
import com.vekomy.model.UTCType;
import com.vekomy.model.TypeNumbers;

public class GenericOrgchartControllerImpl implements GenericOrgchartController {

	
	@Autowired
	private CMToolDao cmToolDao;
	
	Properties prop = ReadPropertyFileSingleTon.getInstance().getProperties(
			getClass());
	
		@Override
		public void saveUTC(String jsonString) {
			cmToolDao.saveUTC(new Gson().fromJson(jsonString, UTCType.class));
		}

		@Override
		public void saveUtcType(String jsonString) {
			
			cmToolDao.saveUtcType(new Gson().fromJson(jsonString, TypeNumbers.class));
		}

		@Override
		public void updateUtcType(String jsonString) {
			cmToolDao.updateUtcType(new Gson().fromJson(jsonString, TypeNumbers.class));
		}
		
	


		@Override
		public String getUtcCode() {
			List<UTCType> list = cmToolDao.getUtcCode();
			List<String> idList = new ArrayList<String>();
			for(UTCType utc : list){
				idList.add(utc.getUtcIdentifier());
			}
			return JSONValue.toJSONString(idList);
		}
		@Override
		public String utcAutoSearch(String term) {
				String result = null;
				result = cmToolDao.utcAutoSearch(term);
				System.out.println(result);
				if(term.equals("0")){
					return "";
				}else{
					if(result == null){
						return "No Record Found";
					}else{
						return result;	
					}
				}
		}

		@Override
		public String typeReferenceAutoSearch(String term) {
				String result = null;
				result = cmToolDao.typeReferenceAutoSearch(term);
				System.out.println(result);
				if(term.equals("0")){
					return "";
				}else{
					if(result == null){
						return "No Record Found";
					}else{
						return result;	
					}
				}
		}

		@Override
		public String readUtcTypeRef(String utcCode) throws Exception {
				
				TypeNumbers utc = null;
					utc = cmToolDao.readUtcTypeRef(utcCode);
				return new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(utc);
			}
		@Override
		public String readUTC(String utcCode) throws Exception {
				
				UTCType utc = null;
					utc = cmToolDao.readUTC(utcCode);
				return new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(utc);
			}

		@Override
		public String readCustomer(String customer) throws Exception {
				
				Customer utc = cmToolDao.readCustomer(customer);
				return new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(utc);
			}

		@Override
		public List<Customer> loadCustomers() throws Exception {
				
				return cmToolDao.loadCustomers();
			}

		@Override
		public String deleteUTC(String utcCode) {
			
			if(cmToolDao.deleteUTC(utcCode) == null){
				return JSONValue.toJSONString(new HashMap<String,String>().put("result", "Deletion failed"));
			}else{
				return	JSONValue.toJSONString(new HashMap<String,String>().put("result", "Deletion Success"));
			}
		}
		
		@Override
		public String deleteCustomer(String customer) {
			
			if(cmToolDao.deleteCustomer(customer) == null){
				return JSONValue.toJSONString(new HashMap<String,String>().put("result", "Deletion failed"));
			}else{
				return	JSONValue.toJSONString(new HashMap<String,String>().put("result", "Deletion Success"));
			}
		}


		@Override
		public String deleteUtcTypeRef(String jsonString) throws Exception{
			TypeNumbers utcSource = new Gson().fromJson(jsonString, TypeNumbers.class);
			cmToolDao.deleteUtcTypeRef(utcSource);
			return "";
		}

		@Override
		public void saveCustomer(String jsonObject) {
			cmToolDao.saveCustomer((new Gson().fromJson(jsonObject, Customer.class)));
			
		}

		@Override
		public String customerAutoSearch(String term) {
			String result = null;
			result = cmToolDao.customerAutoSearch(term);
			System.out.println(result);
			if(term.equals("0")){
				return "";
			}else{
				if(result == null){
					return "No Record Found";
				}else{
					return result;	
				}
			}
		}


}