package com.yqt.yqt.dao;
import com.yqt.yqt.entity.ApiInfo;
import com.yqt.yqt.entity.UserInfoApiAll;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper
public interface ApiInfoDao {
    //查询所有数据
    ArrayList<UserInfoApiAll> selectAllApiInfoByUserID(int id);

    List<ApiInfo> selectAllApiInfo();

    List<Map<String,Object>> selectAllApiInfoByAdmin(int orderType);

    //按地址查询接口是否存在
    ApiInfo getInfoByUrl(@Param("url") String url);

    @MapKey("apiId")
    Map<String, Object> selectApiInfoById(@Param("id") Integer id);

    @MapKey("id")
    List<Map<String, Object>> selectApiListByApiId(@Param("apiId") Integer apiId,@Param("pageIndex") Integer pageIndex, @Param("pageSize") Integer pageSize);

    Long selectApiListCount(@Param("apiId") Integer apiId);

    List<Map<String,Object>> selectCountCallView(@Param("userId") Integer useId);

    List<Map<String, Object>> selectCountCallForName(@Param("userId") Integer useId);

    List<Integer> findAll();
}
