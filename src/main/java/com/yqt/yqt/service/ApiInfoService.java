package com.yqt.yqt.service;

import com.yqt.yqt.entity.ApiInfo;
import com.yqt.yqt.entity.UserInfoApiAll;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface ApiInfoService {

	//查询所有用户以及其他的数据
	ArrayList<UserInfoApiAll> getAllApiInfoByUserID(int id);

	//按地址查询接口是否存在
	ApiInfo getInfoByUrl(String url);


	//首页调用概览统计
    List<Map<String,Object>> findInvokeCall(int userId);

	List<Map<String,Object>> findCountCallForName(int userId);

	List<Integer> findAll();
}
