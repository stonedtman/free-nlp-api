package com.yqt.yqt.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Admin {

	//主键
	private Integer id;

	//用户名
	private String username;

	//密码
	private String password;

	//logo地址
	private String logo;

	//公司简称
	private String abbreviation;

	//授权文件
	private String authorizationDocument;

	//底部版权信息
	private String copyright;

	//系统名称
	private String systemName;

	//系统简称
	private String systemBriefName;

	//企业名称
	private String company;

	//创建时间
	private Date createDate;

	//更新时间
	private Date updateDate;

	//登录 0 明文 1 base64
	private Integer flag;


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

	public String getAuthorizationDocument() {
		return authorizationDocument;
	}

	public void setAuthorizationDocument(String authorizationDocument) {
		this.authorizationDocument = authorizationDocument;
	}

	public String getCopyright() {
		return copyright;
	}

	public void setCopyright(String copyright) {
		this.copyright = copyright;
	}

	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	public String getSystemBriefName() {
		return systemBriefName;
	}

	public void setSystemBriefName(String systemBriefName) {
		this.systemBriefName = systemBriefName;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public Admin(Integer id, String username, String password, String logo, String abbreviation,
                 String authorizationDocument, String copyright, String systemName, String systemBriefName, String company,
                 Date createDate, Date updateDate) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.logo = logo;
		this.abbreviation = abbreviation;
		this.authorizationDocument = authorizationDocument;
		this.copyright = copyright;
		this.systemName = systemName;
		this.systemBriefName = systemBriefName;
		this.company = company;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}

	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}
  
  

}
