package com.yqt.yqt.service;

import com.yqt.yqt.entity.UserApi;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface UserApiService {


    UserApi getUserApiByApiUrlAndUserId(String apiUrl, int userId);

    void addUserApiInvokeCount(String apiUrl, int userId);

    void subUserApiTotalCount(String apiUrl, int userId);



    //查询用户总调用接口次数
    int userApiAllCount(int userId);

    //新增一条接口数据
    int addUserApi(int userId , int apiId);

    //新增一条不开通权限的接口数据
    int addUserApiNotOpen(int userId , int apiId);

    boolean updateQuota(int userId, int apiId, int quota);

    //首页总调用次数
    Long findInvokeCounts(int userId);

    //首页三天调用次数
    Long findInvokeCountForThree(int userId);

    //首页七天调用次数
    Long findInvokeCountForSeven(int userId);

    //首页近一个月调用次数
    Long findInvokeCountForMonth(int userId);

    //最近接口调用次数走势
    List<Map<String, Object>> TrendChartForThreeDay();

    List<Map<String, Object>> TrendChartForHour(int userId);

    List<Map<String, Object>> TrendChartForOneDay(int userId);

    void batchUpdateQuota(ArrayList<Map<String, Object>> arr);

    List<Map<String, Object>> TrendChartForOneWeek(int userId);

    List<Map<String, Object>> getInvokeCountByMonth(int userId);

    List<Map<String, Object>> getInvokeCountForThree(int userId);

    List<Map<String, Object>> getCountByMonth(int userId);

    List<Map<String, Object>> getCountByDay(int userId);

    List<Map<String, Object>> findCountForSeven(int userId);

    List<Map<String, Object>> getCountByThreeDay(int userId);

    List<Map<String, Object>> getInvokeCountByThirty(int userId);

    List<Integer> findAllUserApi(int userId);
}
