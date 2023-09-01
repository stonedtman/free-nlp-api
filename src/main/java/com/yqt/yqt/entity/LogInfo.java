package com.yqt.yqt.entity;

import lombok.Data;

import java.util.Date;

@Data
public class LogInfo {

  //主键id
  private Integer id;

  //用户id
  private Integer userId;

  //调用接口id
  private int apiId;

  //调用时间
  private Date callTime;

  //调用ip
  private String ip;

public Integer getId() {
	return id;
}

public void setId(Integer id) {
	this.id = id;
}

public Integer getUserId() {
	return userId;
}

public void setUserId(Integer userId) {
	this.userId = userId;
}

public int getApiId() {
	return apiId;
}

public void setApiId(int apiId) {
	this.apiId = apiId;
}

public Date getCallTime() {
	return callTime;
}

public void setCallTime(Date callTime) {
	this.callTime = callTime;
}

public String getIp() {
	return ip;
}

public void setIp(String ip) {
	this.ip = ip;
}
  
  
  

}
