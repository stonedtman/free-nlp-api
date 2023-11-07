package com.yqt.yqt.entity;

import lombok.Data;

@Data
public class ApiInfo {         //ApiInfo  UserApi
    private int id;         //接口id
    private String name;    //接口名称
    private String url;     //接口地址
    private String create_date;//创建时间
    private String type;

	public ApiInfo(int id, String name, String url, String create_date) {
		super();
		this.id = id;
		this.name = name;
		this.url = url;
		this.create_date = create_date;
	}


	@Override
	public String toString() {
		return "ApiInfo{" +
				"id=" + id +
				", name='" + name + '\'' +
				", url='" + url + '\'' +
				", create_date='" + create_date + '\'' +
				", type='" + type + '\'' +
				'}';
	}
}
