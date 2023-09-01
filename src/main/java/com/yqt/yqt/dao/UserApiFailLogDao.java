package com.yqt.yqt.dao;

import com.yqt.yqt.entity.UserApiFail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserApiFailLogDao {
    // 查询（user_id and api_id）
    Integer selectByUserAndApi(@Param("userId") int userId,@Param("apiId") int apiId);
    // 添加记录
    int insertUserApiFailLog(UserApiFail userApiFail);
    // 修改记录
    int updateSubUserApiFailLog(UserApiFail userApiFail);

}
