package com.obstreperus.web.infosec;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.json.simple.parser.ParseException;

import com.obstreperus.core.infosec.SecurityAdminException;
import com.vekomy.model.Customer;


public interface GenericOrgchartController {
	
	
	// Save the organization chart details.
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/saveUTC")
		public void saveUTC(@QueryParam("orgchart") String jsonObject);
	
		
		// Save the organization chart details.
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/saveUtcType")
		public void saveUtcType(@QueryParam("orgchart") String jsonObject);
		
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/updateUtcType")
		public void updateUtcType(@QueryParam("orgchart") String jsonObject);
		
		
		
		@GET
		@Produces(MediaType.APPLICATION_JSON) 
		@Path("/getUtcCodes")
		public String getUtcCode();
		
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/autoComplete")
		public String utcAutoSearch(@QueryParam("term") String term);
		
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/autoCompleteTypeRef")
		public String typeReferenceAutoSearch(@QueryParam("term") String term);
		
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/deleteUTC/{utcCode}")
		public String deleteUTC(@PathParam("utcCode") String utcCode);
		
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/deleteCustomer/{customer}")
		public String deleteCustomer(@PathParam("customer") String utcCode);
		
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/deleteUtcTypeRef")
		public String deleteUtcTypeRef(@QueryParam("deleteTypeRef") String jsonObject) throws Exception;
		
		// Method for get the user details.
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/readUTC/{utc}")
		public String readUTC(@PathParam("utc") String utcCode) throws Exception;
		
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/readUtcTypeRef/{utc}")
		public String readUtcTypeRef(@PathParam("utc") String utcCode) throws Exception;
		
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/readCustomer/{customer}")
		public String readCustomer(@PathParam("customer") String customer) throws Exception;
		
		// Save the organization chart details.
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/saveCustomer")
		public void saveCustomer(@QueryParam("customer") String jsonObject);
		
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/autoCompleteCustomer")
		public String customerAutoSearch(@QueryParam("term") String term);
		
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/loadCustomers")
		public List<Customer> loadCustomers() throws Exception;
}