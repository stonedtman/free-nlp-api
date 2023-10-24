package com.yqt.yqt.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


@Data
/**
 * 合规检测-标注结果表
 */
public class CheckResult {

    private Integer id;
    private String resultName;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    private String backgroundColor;

    private Integer userId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getResultName() {
		return resultName;
	}

	public void setResultName(String resultName) {
		this.resultName = resultName;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(String backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public CheckResult(Integer id, String resultName, Date createTime, Date updateTime, String backgroundColor,
                       Integer userId) {
		super();
		this.id = id;
		this.resultName = resultName;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.backgroundColor = backgroundColor;
		this.userId = userId;
	}

	public CheckResult() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    
    
    
    

}
