package com.yqt.yqt.dao;

import com.yqt.yqt.entity.LogInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface LogInfoDao {

    void insertLogInfo(LogInfo logInfo);

    List<Map<String,Object>> selectApiStatisticByUserId(@Param("userId") int userId, @Param("orderType") int orderType);

}
