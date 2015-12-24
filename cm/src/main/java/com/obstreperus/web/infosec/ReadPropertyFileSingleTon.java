package com.obstreperus.web.infosec;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ReadPropertyFileSingleTon {
	private static ReadPropertyFileSingleTon currentObject;

	private ReadPropertyFileSingleTon() {
	}

	public static ReadPropertyFileSingleTon getInstance() {
		if (currentObject == null) {
			currentObject = new ReadPropertyFileSingleTon();
		}
		return currentObject;

	}

	public Properties getProperties(Class<?> clz){
	Properties properties = new Properties();
	InputStream inputStream = null;
	try {
		inputStream = clz.getClassLoader().getResourceAsStream("users.properties");
		if(inputStream == null){
			System.out.println(" users.properties file Not found.");
		}
		properties.load(inputStream);
	} catch (FileNotFoundException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	}finally{
		if(inputStream != null){
			try{
				inputStream.close();
			}catch(IOException e){
				e.printStackTrace();
			}
		}
	}
	return properties;
}
}
