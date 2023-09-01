package com.yqt.yqt.entity;

import lombok.Data;

import java.util.Date;

@Data
public class UserApi {

    //主键id
    private int id;

    //用户id
    private int userId;

    //接口id
    private int apiId;

    //接口权限 1开启 0关闭
    private int apiAuthority;

    //调用次数
    private int invokeCount;

    //创建时间
    private Date createDate;
	// 接口配额
	private int  totalCount;

    public UserApi() {
    }

    public UserApi(int userId, int apiId, int apiAuthority, int invokeCount) {
        this.userId = userId;
        this.apiId = apiId;
        this.apiAuthority = apiAuthority;
        this.invokeCount = invokeCount;
    }

	public UserApi(int id, int userId, int apiId, int apiAuthority, int invokeCount, Date createDate, int totalCount) {
		this.id = id;
		this.userId = userId;
		this.apiId = apiId;
		this.apiAuthority = apiAuthority;
		this.invokeCount = invokeCount;
		this.createDate = createDate;
		this.totalCount = totalCount;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getApiId() {
		return apiId;
	}

	public void setApiId(int apiId) {
		this.apiId = apiId;
	}

	public int getApiAuthority() {
		return apiAuthority;
	}

	public void setApiAuthority(int apiAuthority) {
		this.apiAuthority = apiAuthority;
	}

	public int getInvokeCount() {
		return invokeCount;
	}

	public void setInvokeCount(int invokeCount) {
		this.invokeCount = invokeCount;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public UserApi(int id, int userId, int apiId, int apiAuthority, int invokeCount, Date createDate) {
		super();
		this.id = id;
		this.userId = userId;
		this.apiId = apiId;
		this.apiAuthority = apiAuthority;
		this.invokeCount = invokeCount;
		this.createDate = createDate;
	}
    
    
    
    
}
