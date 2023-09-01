package com.yqt.yqt.service;

import com.alibaba.fastjson.JSONObject;
import com.yqt.yqt.entity.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface UserService {

	UserEntity selectUserByAccount(String username);

	UserEntity getUserBySecretIdAndSecretKey(String secretId, String secretKey);

	UserEntity selectUserById(int id);

	JSONObject updatePassword(UserEntity userEntity);

	UserEntity updateSecretIdAndSecretKey(String value);

	void reduceQuotaCountByUserId(int userId);

	List<Map<String,Object>> getApiStatistic(int userId, int orderType);

	//管理台查询用户接口权限
	List<Map<String,Object>> adminUserApi(int userId);

	//管理台用户接口权限更新
	int adminUserApiUpdate(int userId, int apiId, int state);

	//修改公司名称
	Map<String,Object> updateCompany(UserEntity userEntity);

	// 修改用户权限
	boolean updatePowerById(Integer id, Integer isPower);

	boolean updateById(UserEntity user);

	public int updateInfo(UserEntity userEntity, MultipartFile logo) throws IOException;

	UserEntity findUserByUsername(String username);

	boolean removeByUsername(String username);

	boolean addRegisterUser(UserEntity userEntity);

	int getUserCountByUsername(String username);

	Long selectCountByPhone(String number);

	UserEntity findUserById(Integer userId);

	Long updateValidTimeByUserId(Integer userId, Date time);

	List<Map<String, Object>> userOpenApi(int userId);
}
