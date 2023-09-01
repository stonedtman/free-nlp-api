package com.yqt.yqt.service;

import com.yqt.yqt.entity.UserApiFail;
import org.apache.ibatis.annotations.Param;

public interface UserApiFailLogService {
    // 查询（user_id and  api_id）
    int selectByUserAndApi(@Param("userId") int userId, @Param("apiId") int apiId);
    // 添加记录---
    int insertUserApiFailLog(UserApiFail userApiFail);
    // 修改记录
    int updateSubUserApiFailLog(UserApiFail userApiFail);
}
