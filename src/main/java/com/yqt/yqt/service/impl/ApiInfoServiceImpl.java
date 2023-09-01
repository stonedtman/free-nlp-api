package com.yqt.yqt.service.impl;

import com.yqt.yqt.dao.ApiInfoDao;
import com.yqt.yqt.entity.ApiInfo;
import com.yqt.yqt.entity.UserInfoApiAll;
import com.yqt.yqt.service.ApiInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ApiInfoServiceImpl implements ApiInfoService {

    @Autowired
    ApiInfoDao apiInfoDao;

    @Override
    public ArrayList<UserInfoApiAll> getAllApiInfoByUserID(int id) {
        return apiInfoDao.selectAllApiInfoByUserID(id);
    }

    @Override
    public ApiInfo getInfoByUrl(String url) {
        return apiInfoDao.getInfoByUrl(url);
    }

    @Override
    public List<Map<String, Object>> findInvokeCall(int userId) {
        List<Map<String, Object>> mapList = apiInfoDao.selectCountCallView(userId);
        for (Map<String, Object> map : mapList) {
            map.putIfAbsent("countCall", 0);
        }
        return mapList;
    }

    @Override
    public List<Map<String, Object>> findCountCallForName(int userId) {
        return apiInfoDao.selectCountCallForName(userId);
    }

    @Override
    public List<Integer> findAll() {
        return apiInfoDao.findAll();
    }

}
