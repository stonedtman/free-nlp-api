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
