package com.yqt.yqt.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.yqt.yqt.dao.*;
import com.yqt.yqt.entity.Admin;
import com.yqt.yqt.entity.ApiInfo;
import com.yqt.yqt.entity.UserApi;
import com.yqt.yqt.entity.UserEntity;
import com.yqt.yqt.service.UserService;
import com.yqt.yqt.util.Base64Util;
import com.yqt.yqt.util.DateUtil;
import com.yqt.yqt.util.MD5Util;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDao userDao;

	@Autowired
	private LogInfoDao logInfoDao;

	@Autowired
	private UserApiDao userApiDao;

	@Autowired
	private AdminDao adminDao;

	@Override
	public UserEntity selectUserByAccount(String username) {
		// TODO Auto-generated method stub
		return userDao.selectUserByAccount(username);
	}

	@Override
	public UserEntity getUserBySecretIdAndSecretKey(String secretId, String secretKey) {
		return userDao.selectUserBySecretIdAndSecretKey(secretId, secretKey);
	}

	@Override
	public UserEntity selectUserById(int id) {
		UserEntity userEntity = userDao.selectUserById(id);
		if (userEntity == null) {
			return null;
		}
		if (userEntity.getValid_time() != null) {
			int days = DateUtil.differentDays(userEntity.getValid_time(), new Date());
			userEntity.setValid_day(days);
		} else {
			userEntity.setValid_day(9999);
		}
		String logo = userEntity.getLogo();
		String abbreviation = userEntity.getAbbreviation();
		String copyright = userEntity.getCopyright();
		String systemName = userEntity.getSystemName();
		String systemBriefName = userEntity.getSystemBriefName();
		if (logo == null || abbreviation == null || "".equals(logo) || "".equals(abbreviation)) {
			Admin admin = adminDao.selectAdminInfo();


			if (logo == null || "".equals(logo)) {
				userEntity.setLogo(admin.getLogo());
			}
			if (abbreviation == null || "".equals(abbreviation)) {
				userEntity.setAbbreviation(admin.getAbbreviation());
			}
			if (copyright == null || "".equals(copyright)) {
				userEntity.setCopyright(admin.getCopyright());
			}
			if (systemName == null || "".equals(systemName)) {
				userEntity.setSystemName(admin.getSystemName());
			}
			if (systemBriefName == null || "".equals(systemBriefName)) {
				userEntity.setSystemBriefName(admin.getSystemBriefName());
			}
		}
		return userEntity;
	}

	@Override
	public JSONObject updatePassword(UserEntity userEntity) {
		JSONObject returnObject = new JSONObject();
		int id = userEntity.getId();//id
		String number = userEntity.getNumber();//手机号
		//手机号为空则不修改手机号
		if (number != null && number!="") {
			//判断手机号是否在数据库中已存在 如果存在返回提示
			if (userDao.selectCountByNumber(number) != 0) {
				//return "手机号是否存在";
				returnObject.put("code","201");
				returnObject.put("msg","手机号已存在，请更换手机号");
				returnObject.put("results","");
				return returnObject;
			}
		}
		String newPassword = userEntity.getPassword();
		UserEntity OldUserEntity = selectUserById(id);
		String oldBase64Password = OldUserEntity.getPassword();
		String oldPassword = Base64Util.decode(oldBase64Password);//old
		String newBase64Password = Base64Util.encode(newPassword);//new
		if (newPassword.equals(oldPassword)){
			//return "密码重复";
			returnObject.put("code","201");
			returnObject.put("msg","两次密码重复");
			returnObject.put("results","");
			return returnObject;
		}
		userEntity.setPassword(newBase64Password);
		userDao.updatePassword(userEntity);
		returnObject.put("code","200");
		returnObject.put("msg","密码修改成功");
		returnObject.put("results","");
		return returnObject;

	}

	@Override
	public UserEntity updateSecretIdAndSecretKey(String value) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String datetime = sdf.format(new Date());
		int userId = Integer.parseInt(value.split(",")[0]);
		String password = Base64Util.decode(value.split(",")[1]);
		String secretId = UUID.randomUUID().toString();
		String secretKey = MD5Util.getMD5(userId + password + datetime);
		UserEntity userEntity = new UserEntity();
		userEntity.setId(userId);
		userEntity.setSecret_id(secretId);
		userEntity.setSecret_key(secretKey);
		userDao.updateUserSecret(userEntity);
		return userEntity;
	}

	@Override
	public void reduceQuotaCountByUserId(int userId) {
		userDao.reduceQuotaCountByUserId(userId);
	}

	@Override
	public List<Map<String, Object>> getApiStatistic(int userId, int orderType) {
		return logInfoDao.selectApiStatisticByUserId(userId,orderType);
	}

	@Override
	public List<Map<String, Object>> adminUserApi(int userId) {
		return userApiDao.adminUserApi(userId);
	}

	@Override
	public int adminUserApiUpdate(int userId, int apiId, int state) {
		return userApiDao.adminUserApiUpdate(userId,apiId,state);
	}

	@Override
	public Map<String,Object> updateCompany(UserEntity userEntity) {
		Map<String,Object> resultMap = new HashMap<>();


		//为空判断
		if(StringUtils.isEmpty(userEntity.getCompany())){
			resultMap.put("code","501");
			resultMap.put("msg","公司为空!");
			resultMap.put("result","");
			return resultMap;
		}

		if(userEntity.getId()<=0 || userDao.selectUserById(userEntity.getId())==null){
			resultMap.put("code","501");
			resultMap.put("msg","用户不存在!");
			resultMap.put("result","");
			return resultMap;
		}

		int type = userDao.updateCompany(userEntity.getId(),userEntity.getCompany());

		if(type==0){
			resultMap.put("code","502");
			resultMap.put("msg","修改失败!");
			resultMap.put("result","");
			return resultMap;
		}

		resultMap.put("code","200");
		resultMap.put("msg","修改成功!");
		resultMap.put("result",userDao.selectUserById(userEntity.getId()));

		return resultMap;
	}

	@Override
	public boolean updatePowerById(Integer id, Integer isPower) {
		return userDao.updatePowerById(id, isPower) > 0;
	}

	@Override
	public boolean updateById(UserEntity user) {
		return userDao.updateById(user) > 0;
	}

	@Value("${path.admin}")
	private String path_admin;
	@Override
	public int updateInfo(UserEntity userEntity, MultipartFile logo) throws IOException {
		String logoName = "";
		if (logo != null && !StringUtils.isEmpty(logo.getOriginalFilename())) {
			String fileSuffix = logo.getOriginalFilename().substring(logo.getOriginalFilename().lastIndexOf("."));
			logoName = UUID.randomUUID().toString() + fileSuffix;
			logo.transferTo(new File(path_admin + logoName));
			userEntity.setLogo("/file/admin/" + logoName);
		}
		return userDao.updateById(userEntity);
	}

	@Override
	public UserEntity findUserByUsername(String username) {
		return userDao.selectUserByUsername(username);
	}

	@Override
	public boolean removeByUsername(String username) {
		return userDao.deleteUserByUsername(username) > 0;
	}

	@Autowired
	private ApiInfoDao apiInfoDao;

	@Override
	@Transactional
	public boolean addRegisterUser(UserEntity userEntity) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String datetime = sdf.format(new Date());
		String secretId = UUID.randomUUID().toString();
		String secretKey = MD5Util.getMD5(userEntity.getId() + userEntity.getPassword() + datetime);
		userEntity.setSecret_id(secretId);
		userEntity.setSecret_key(secretKey);
		//base64编码
		String password = Base64Util.encode(userEntity.getPassword());
		userEntity.setPassword(password);

		List<ApiInfo> apiInfoList = apiInfoDao.selectAllApiInfo();
		userEntity.setQuota_count(apiInfoList.size()*500);
		userEntity.setStorage(1000);
		boolean isSuccess = userDao.insertUserForRegister(userEntity) > 0;
		if (!isSuccess) {
			return false;
		}

		for (ApiInfo apiInfo : apiInfoList) {
			UserApi userApi = new UserApi();
			userApi.setUserId(userEntity.getId());
			userApi.setApiId(apiInfo.getId());
			userApi.setApiAuthority(1);
			userApi.setTotalCount(500);
			userApi.setCreateDate(new Date());
			userApiDao.insertRegisterUserApi(userApi);
		}

		return true;
	}

	@Override
	public int getUserCountByUsername(String username) {
		return userDao.selectCountByUsername(username);
	}

	@Override
	public Long selectCountByPhone(String number) {
		return userDao.selectCountByNumber(number);
	}

	@Override
	public UserEntity findUserById(Integer userId) {
		return userDao.selectUserById(userId);
	}

	@Override
	@Transactional
	public Long updateValidTimeByUserId(Integer userId, Date validTime) {
		return userDao.updateValidTimeByUserId(userId, validTime);
	}

	@Override
	public List<Map<String, Object>> userOpenApi(int userId) {
		return userApiDao.userOpenApi(userId);
	}
}
