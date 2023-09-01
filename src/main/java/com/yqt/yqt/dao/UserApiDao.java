package com.yqt.yqt.dao;

import com.yqt.yqt.entity.UserApi;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface UserApiDao {

    UserApi selectUserApiByApiUrlAndUserId(@Param("apiUrl") String apiUrl, @Param("userId") int userId);

    void addUserApiInvokeCount(@Param("apiUrl") String apiUrl, @Param("userId") int userId);
    // 调用后接口配额减一
    void subUserApiTotalCount(@Param("apiUrl") String apiUrl, @Param("userId") int userId);
    void insertUserApi(UserApi userApi);

    void insertUserApiList(List<UserApi> list);

    //查询用户总调用接口次数
    Integer userApiAllCount(@Param("userId")int userId);

    //管理台查询用户接口权限
    List<Map<String,Object>>  adminUserApi(@Param("userId")int userId);


    //管理台用户接口权限更新
    int adminUserApiUpdate(@Param("userId")int userId,@Param("apiId")int apiId,@Param("state")int state);

    //新增一条接口数据
    int addUserApi(@Param("userId")int userId , @Param("apiId")int apiId);

    int addUserApiNotOpen(@Param("userId")int userId , @Param("apiId")int apiId);

    //修改指定用户的所有接口权限
    int updateApiAll(@Param("userId")int userIdd,@Param("state")int state);

    boolean updateQuota(@Param("userId") int userId,@Param("apiId") int apiId,@Param("quota") int quota);

    //首页总调用次数
    Long selectAllInvokeCount(@Param("userId") int userId);

    //首页近三天的调用次数
    Long selectInvokeCountForThree(@Param("userId") int userId);

    //首页近七天的调用次数
    Long selectInvokeCountForSeven(@Param("userId") int userId);

    //首页近一个月的调用次数
    Long selectInvokeCountForMonth(@Param("userId") int userId);

    //最近接口调用次数走势

    List<Map<String, Object>> selectTrendChartForThreeDay();

    List<Map<String, Object>> selectTrendChartForHour(@Param("userId") int userId);

    List<Map<String, Object>> selectTrendChartForOneDay(@Param("userId") int userId);

    List<Map<String, Object>> selectTrendChartForOneWeek(@Param("userId") int userId);

    List<Map<String, Object>> selectInvokeCountByMonth(@Param("userId") int userId);

    Long selectCountByTimeRange(@Param("startTime") Date tempDate, @Param("endTime") Date nowDate, @Param("userId") int userId);

    Long selectCountByDayTimeRange(@Param("startTime") Date tempDate, @Param("endTime") Date nowDate,@Param("userId") int userId);

    Long selectTrendChartByOneWeek(@Param("startTime") Date tempDate,@Param("endTime") Date nowDate, @Param("userId") int userId);

    List<Map<String, Object>> selectSevenCountByTimeRange(@Param("userId") int userId);

    int insertRegisterUserApi(UserApi userApi);

    List<Map<String, Object>> userOpenApi(int userId);

    List<Integer> findAllUserApi(int userId);
}
