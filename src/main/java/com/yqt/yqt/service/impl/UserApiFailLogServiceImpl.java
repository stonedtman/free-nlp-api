package com.yqt.yqt.service.impl;

import com.yqt.yqt.dao.UserApiFailLogDao;
import com.yqt.yqt.entity.UserApiFail;
import com.yqt.yqt.service.UserApiFailLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserApiFailLogServiceImpl implements UserApiFailLogService {
    @Autowired
    private UserApiFailLogDao userApiFailLogDao;
    @Override
    public int selectByUserAndApi(int userId, int apiId) {
        return userApiFailLogDao.selectByUserAndApi(userId,apiId);
    }

    @Override
    public int insertUserApiFailLog(UserApiFail userApiFail) {
        return userApiFailLogDao.insertUserApiFailLog(userApiFail);
    }

    @Override
    public int updateSubUserApiFailLog(UserApiFail userApiFail) {
        return userApiFailLogDao.updateSubUserApiFailLog(userApiFail);
    }
}
