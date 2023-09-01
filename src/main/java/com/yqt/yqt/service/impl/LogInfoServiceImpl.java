package com.yqt.yqt.service.impl;

import com.yqt.yqt.dao.LogInfoDao;
import com.yqt.yqt.entity.LogInfo;
import com.yqt.yqt.service.LogInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogInfoServiceImpl implements LogInfoService {

    @Autowired
    private LogInfoDao logInfoDao;

    @Override
    public void addLogInfo(LogInfo logInfo) {
        logInfoDao.insertLogInfo(logInfo);
    }

}
