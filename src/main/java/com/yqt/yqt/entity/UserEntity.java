package com.yqt.yqt.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class UserEntity {
	
	private int id;
	private String username;//	用户名
	private String password;//密码
	private String name;//姓名
	private String company;//企业
	/**
	 * 企业logo
	 */
	private String logo;
	/**
	 * 公司简称
	 */
	private String abbreviation;

	/**
	 * 底部版权信息
	 */
	private String copyright;

	/**
	 * 系统名称
	 */
	private String systemName;
	//登录 0 明文 1 base64
	private Integer flag;

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

	/**
	 * 系统简称
	 */
	private String systemBriefName;

	private int concurrency;//每秒并发请求
	private int quota_count;//调用配额次数
	private int total_quota; // 可充值接口的额度
	private int sample_count;//训练样本数量
	private int storage;//存储空间
	private int status;//状态（1：未屏蔽  0：屏蔽）
	private int admin_id;//创建人id
	private Date create_date;//创建时间
	private Date update_date;//更新时间
	private String secret_id;//接口验证信息id
	private String secret_key;//接口验证信息key
	private int is_power;//引擎配置权限 0默认无权限 , 1有权限
	private int is_delete;//逻辑删除（1：未删除  0：删除）
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date valid_time;
	private int valid_day;

	private String number;
	public int getId() {
		return id;
	}
	public void setId(int id) {
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public int getConcurrency() {
		return concurrency;
	}
	public void setConcurrency(int concurrency) {
		this.concurrency = concurrency;
	}
	public int getQuota_count() {
		return quota_count;
	}
	public void setQuota_count(int quota_count) {
		this.quota_count = quota_count;
	}
	public int getSample_count() {
		return sample_count;
	}
	public void setSample_count(int sample_count) {
		this.sample_count = sample_count;
	}
	public int getStorage() {
		return storage;
	}
	public void setStorage(int storage) {
		this.storage = storage;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getAdmin_id() {
		return admin_id;
	}
	public void setAdmin_id(int admin_id) {
		this.admin_id = admin_id;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	public Date getUpdate_date() {
		return update_date;
	}
	public void setUpdate_date(Date update_date) {
		this.update_date = update_date;
	}
	public String getSecret_id() {
		return secret_id;
	}
	public void setSecret_id(String secret_id) {
		this.secret_id = secret_id;
	}
	public String getSecret_key() {
		return secret_key;
	}
	public void setSecret_key(String secret_key) {
		this.secret_key = secret_key;
	}
	public int getIs_power() {
		return is_power;
	}
	public void setIs_power(int is_power) {
		this.is_power = is_power;
	}
	public int getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}
	public UserEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserEntity(int id, String username, String password, String name, String company, int concurrency,
                      int quota_count, int sample_count, int storage, int status, int admin_id, Date create_date,
                      Date update_date, String secret_id, String secret_key, int is_power, int is_delete) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.name = name;
		this.company = company;
		this.concurrency = concurrency;
		this.quota_count = quota_count;
		this.sample_count = sample_count;
		this.storage = storage;
		this.status = status;
		this.admin_id = admin_id;
		this.create_date = create_date;
		this.update_date = update_date;
		this.secret_id = secret_id;
		this.secret_key = secret_key;
		this.is_power = is_power;
		this.is_delete = is_delete;
	}
	
	
	

}