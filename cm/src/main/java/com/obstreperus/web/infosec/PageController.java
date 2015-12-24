package com.obstreperus.web.infosec;

import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class PageController {
	Properties prop = ReadPropertyFileSingleTon.getInstance().getProperties(getClass());
	
	// Redirects to groups tab.
	/*@RequestMapping("/groups")
	public ModelAndView groups(HttpServletRequest request){
		
		// GroupMeta is a pojo which contains configuration of UI.
		GroupMeta groupMeta = new GroupMeta();
		groupMeta.setHeader(prop.getProperty("group.header"));
		groupMeta.setTextBox(prop.getProperty("group.textBox"));
		groupMeta.setButtons(prop.getProperty("group.buttons"));
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("popup",groupMeta);
		mav.addObject("headerActive","groups");
		mav.setViewName("orgchart");
	    return mav;
	}
	
	// Redirects to privileges tab.
	@RequestMapping("/privileges")
	public ModelAndView privileges(HttpServletRequest request){
		// PrivilegeMeta is a pojo which contains configuration of UI.
		PrivilegeMeta privilegeMeta = new PrivilegeMeta();
		privilegeMeta.setHeader(prop.getProperty("privilege.header"));
		privilegeMeta.setTextBox(prop.getProperty("privilege.textBox"));
		privilegeMeta.setButtons(prop.getProperty("privilege.buttons"));
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("popup",privilegeMeta);
		mav.addObject("headerActive","privileges");
		mav.setViewName("orgchart");
		return mav;
	}*/
	// Redirects to privileges tab.
		@RequestMapping("/utc")
		public ModelAndView utc(){
			
			return new ModelAndView("utc");
		}
		
		// Redirects to privileges tab.
		@RequestMapping("/typeReferenceUTC")
		public ModelAndView utcType(){
			
			return new ModelAndView("typeReferenceUTC");
		}
		
		@RequestMapping("/updateUTC")
		public ModelAndView updateUTC(){
			
			return new ModelAndView("update_utc");
		}
		@RequestMapping("/updateUtcType")
		public ModelAndView updateUtcType(){
			
			return new ModelAndView("update_typeReference");
		}
		@RequestMapping("/home")
		public ModelAndView home(){
			
			return new ModelAndView("home");
		}
		
		// Redirects to privileges tab.
		@RequestMapping("/addCustomer")
		public ModelAndView addCustomer(){
			
			return new ModelAndView("addCustomer");
		}
	
}
