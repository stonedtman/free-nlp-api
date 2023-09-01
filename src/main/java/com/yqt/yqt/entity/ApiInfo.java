package com.yqt.yqt.entity;

public class ApiInfo {         //ApiInfo  UserApi
    private int id;         //接口id
    private String name;    //接口名称
    private String url;     //接口地址
    private String create_date;//创建时间
    private String type;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

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
