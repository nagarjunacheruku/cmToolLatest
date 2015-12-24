package com.vekomy.model;

import com.obstreperus.core.DbwException;

public class DataNotFoundException extends DbwException {

	private static final long serialVersionUID = 1L;
	
	public DataNotFoundException(String errorMessage){
		super(errorMessage);
	}

}
