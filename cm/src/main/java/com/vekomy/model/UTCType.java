package com.vekomy.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="utc")
public class UTCType {
	@Id
	private String utcIdentifier;
	private String utcName;



	


	public String getUtcIdentifier() {
		return utcIdentifier;
	}

	public void setUtcIdentifier(String utcIdentifier) {
		this.utcIdentifier = utcIdentifier;
	}

	public String getUtcName() {
		return utcName;
	}

	public void setUtcName(String utcName) {
		this.utcName = utcName;
	}
}
