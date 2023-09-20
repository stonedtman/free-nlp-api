package com.yqt.yqt.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.yqt.yqt.service.ApiInfoService;
import com.yqt.yqt.service.UserApiService;
import com.yqt.yqt.util.RedisUtil;
import com.yqt.yqt.util.ReturnUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(value = "/home")
public class HomeSelfModelController {

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private UserApiService userApiService;

    @Autowired
    private ApiInfoService apiInfoService;

    @GetMapping("/homeDataList")
    public Object homeDataList(HttpServletRequest request) {
        String header = request.getHeader("token");
        //从redis获取数据
        if (header == null || "".equals(header)) {
            return ReturnUtil.error("501", "请先登陆");
        }
        String key = redisUtil.getKey(header);
        int userId = Integer.parseInt(key.split(",")[0]);
        String dataKey = "homeDataList:" + userId;
        String value = redisUtil.getKey(dataKey);
        if (!StringUtils.isEmpty(value)) {
            return JSON.parseObject(value, JSONObject.class);
        }
        //总调用次数
        Long invokeCounts = userApiService.findInvokeCounts(userId);
        List<Map<String, Object>> monthList = userApiService.getInvokeCountByMonth(userId);
        List<Map<String, Object>> allList = userApiService.getCountByMonth(userId);


        Map<String, Object> invokeCountMap = new HashMap<>();
        invokeCountMap.put("count", invokeCounts);
        invokeCountMap.put("data", allList);
        Map<String, Object> oneMap = monthList.get(0);
        Map<String, Object> twoMap = monthList.get(1);
        Double oneCount = Double.parseDouble(oneMap.get("count").toString());
        Double twoCount = Double.parseDouble(twoMap.get("count").toString());
        double difference = oneCount - twoCount;
        int status = 0;
        if (difference > 0) {
            status = 1;
        } else if(difference < 0){
            difference = twoCount - oneCount;
            status = -1;
        }
        double compare = 0.0;
        if (status != 0) {
            compare = difference/(oneCount + twoCount)*100;
            DecimalFormat decimalFormat = new DecimalFormat("#.00");
            String format = decimalFormat.format(compare);
            compare = Double.parseDouble(format);
        }
        invokeCountMap.put("compare", compare+"%");
        invokeCountMap.put("status", status);


        //最近三天调用次数
        Map<String, Object> threeMap = new HashMap<>();
        Long countCallForThree = userApiService.findInvokeCountForThree(userId);
        List<Map<String, Object>> dataList = userApiService.getInvokeCountForThree(userId);
        List<Map<String, Object>> dayList = userApiService.getCountByDay(userId);

        threeMap.put("count", countCallForThree);
        threeMap.put("data", dayList);
        Map<String, Object> oneThree = dataList.get(0);
        Map<String, Object> twoThree = dataList.get(1);
        Double oneThreeCount = Double.parseDouble(oneThree.get("count").toString());
        Double twoThreeCount = Double.parseDouble(twoThree.get("count").toString());
        double threeDiff = oneThreeCount - twoThreeCount;
        int threeStatus = 0;
        if (threeDiff > 0) {
            threeStatus = 1;
        } else if(threeDiff < 0) {
            threeDiff = twoThreeCount - oneThreeCount;
            threeStatus = -1;
        }
        double threeCompare = 0.0;
        if (threeStatus != 0) {
            threeCompare = threeDiff/(oneThreeCount+twoThreeCount)*100;
            DecimalFormat threeFormat = new DecimalFormat("#.00");
            threeCompare = Double.parseDouble(threeFormat.format(threeCompare));
        }
        threeMap.put("compare", threeCompare+"%");
        threeMap.put("status", threeStatus);

        //最近七天调用次数
        Map<String, Object> sevenMap = new HashMap<>();
        Long countCallForSeven = userApiService.findInvokeCountForSeven(userId);
        List<Map<String, Object>> trendChartForOneWeek = userApiService.TrendChartForOneWeek(userId);
        List<Map<String, Object>> sevenList = userApiService.findCountForSeven(userId);
        sevenMap.put("count", countCallForSeven);
        sevenMap.put("data", sevenList);
        Map<String, Object> oneTrend = trendChartForOneWeek.get(0);
        Map<String, Object> twoTrend = trendChartForOneWeek.get(1);
        Double oneTrendCount = Double.parseDouble( oneTrend.get("count").toString());
        Double twoTrendCount = Double.parseDouble(twoTrend.get("count").toString());
        double sevenDiff = oneTrendCount - twoTrendCount;

        int sevenStatus = 0;
        if (sevenDiff > 0) {
            sevenStatus = 1;
        } else if (sevenDiff < 0){
            sevenDiff = twoTrendCount - oneTrendCount;
            sevenStatus = -1;
        }

        double sevenCompare = 0.0;
        DecimalFormat sevenFormat = new DecimalFormat("#.00");
        if (sevenDiff != 0) {
            sevenCompare = sevenDiff/(oneTrendCount + twoTrendCount)*100;
            sevenCompare = Double.parseDouble(sevenFormat.format(sevenCompare));
        }
        sevenMap.put("compare", sevenCompare+"%");
        sevenMap.put("status", sevenStatus);

        //最近30天调用次数
        Map<String, Object> monthMap = new HashMap<>();
        Long countCallForMonth = userApiService.findInvokeCountForMonth(userId);
        List<Map<String, Object>> invokeCountByMonth = userApiService.getInvokeCountByThirty(userId);
        List<Map<String, Object>> threeDayList = userApiService.getCountByThreeDay(userId);
        monthMap.put("data", threeDayList);
        monthMap.put("count", countCallForMonth);
        Map<String, Object> oneMonth = invokeCountByMonth.get(0);
        Map<String, Object> twoMonth = invokeCountByMonth.get(1);
        Double oneMonthCount = Double.parseDouble(oneMonth.get("count").toString());
        Double twoMonthCount = Double.parseDouble(twoMonth.get("count").toString());
        double monthDiff = oneMonthCount - twoMonthCount;
        int monthStatus = 0;
        if (monthDiff > 0) {
            monthStatus = 1;
        } else if (monthDiff < 0){
            monthDiff = twoMonthCount - oneMonthCount;
            monthStatus = -1;
        }

        double monthCompare = 0.0;
        if (monthStatus != 0) {
            monthCompare = (monthDiff/(twoMonthCount+oneMonthCount))*100;
            monthCompare = Double.parseDouble(sevenFormat.format(monthCompare));
        }
        monthMap.put("compare", monthCompare+"%");
        monthMap.put("status", monthStatus);


        //调用概览统计
        List<Map<String, Object>> invokeCall = apiInfoService.findInvokeCall(userId);
//        //接口调用统计
        List<Map<String, Object>> countCallForName = apiInfoService.findCountCallForName(userId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", "200");
        jsonObject.put("selfModelList", new ArrayList<>());
        jsonObject.put("countCallForAll", invokeCountMap);
        jsonObject.put("invokeCall", invokeCall);
        jsonObject.put("countCallForThree", threeMap);
        jsonObject.put("countCallForSeven", sevenMap);
        jsonObject.put("countCallForMonth", monthMap);
        jsonObject.put("countCallForName", countCallForName);
        redisUtil.set(dataKey, JSON.toJSONString(jsonObject), 30L, TimeUnit.MINUTES);
        return jsonObject;
    }


    @GetMapping("/homeTrendChartForHour")
    public Object homeTrendChartForHour(HttpServletRequest request) throws ParseException {
        String header = request.getHeader("token");
        String key = redisUtil.getKey(header);
        int userId = Integer.parseInt(key.split(",")[0]);
        //最近接口调用次数走势
        //按小时
        List<Map<String, Object>> trendChartForHour = userApiService.TrendChartForHour(userId);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", "200");
        jsonObject.put("trendChartForHour", trendChartForHour);
        return jsonObject;
    }


}
