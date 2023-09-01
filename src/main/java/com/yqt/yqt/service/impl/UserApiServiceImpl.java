package com.yqt.yqt.service.impl;


import com.yqt.yqt.dao.UserApiDao;
import com.yqt.yqt.dao.UserDao;
import com.yqt.yqt.entity.UserApi;
import com.yqt.yqt.entity.UserEntity;
import com.yqt.yqt.service.UserApiService;
import com.yqt.yqt.util.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
@Slf4j
public class UserApiServiceImpl implements UserApiService {

    @Autowired
    private UserApiDao userApiDao;
    @Autowired
    private UserDao userDao;

    @Override
    public UserApi getUserApiByApiUrlAndUserId(String apiUrl, int userId) {
        return userApiDao.selectUserApiByApiUrlAndUserId(apiUrl, userId);
    }

    @Override
    public void addUserApiInvokeCount(String apiUrl, int userId) {
        userApiDao.addUserApiInvokeCount(apiUrl, userId);
    }

    @Override
    public void subUserApiTotalCount(String apiUrl, int userId) {
        userApiDao.subUserApiTotalCount(apiUrl, userId);
    }

    @Override
    public int userApiAllCount(int userId) {
        return userApiDao.userApiAllCount(userId);
    }

    @Override
    public int addUserApi(int userId, int apiId) {
        return userApiDao.addUserApi(userId, apiId);
    }

    @Override
    public int addUserApiNotOpen(int userId, int apiId) {
        return userApiDao.addUserApiNotOpen(userId, apiId);
    }

    @Override
    public boolean updateQuota(int userId, int apiId, int quota) {
        UserEntity userEntity = userDao.selectUserById(userId);
        // 用户可充值接口的额度
        //int getTotalQuota = userEntity.getTotal_quota();
        int quota_count = userEntity.getQuota_count();
        quota_count = quota_count+quota;
        userDao.updateQuotaByUserId(userId, quota_count);

        //if (quota > (quota_count+1)) return false;
        // 该接口额度配置之后，
        userApiDao.updateQuota(userId, apiId, quota);
        // 充值之后，用户的接口可充值额度-当前接口的充值
        return userDao.subTotalQuota(quota, userId) > 0;
    }

    //首页总调用次数
    @Override
    public Long findInvokeCounts(int userId) {
        return userApiDao.selectAllInvokeCount(userId);
    }

    //首页最近三天调用次数
    @Override
    public Long findInvokeCountForThree(int userId) {
        return userApiDao.selectInvokeCountForThree(userId);
    }

    //首页最近七天调用次数
    @Override
    public Long findInvokeCountForSeven(int userId) {
        return userApiDao.selectInvokeCountForSeven(userId);
    }

    //首页近一个月调用次数
    @Override
    public Long findInvokeCountForMonth(int userId) {
        return userApiDao.selectInvokeCountForMonth(userId);
    }

    //最近接口调用次数走势
    @Override
    public List<Map<String, Object>> TrendChartForThreeDay() {
        List<Map<String, Object>> mapList = userApiDao.selectTrendChartForThreeDay();
        SimpleDateFormat sdf = new SimpleDateFormat("dd");
        /*SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 1; i <= 10; i++) {
            Date date = getDateForDay(new Date(), i * 3);
            System.out.println(simpleDateFormat.format(date));
        }*/
        // 计算前一个月
//        int days = 30;
        List<String> list = new ArrayList<>();
        for (int i = 1; i < 11; i++) {
            Date startTime = DateUtil.getDateForThreeDay(new Date(), i * 3);
//            log.info("开始时间为{}", sdf.format(startTime));
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startTime);
            calendar.add(Calendar.DATE, 3);
            Date calendarTime = calendar.getTime();
            String formatDate = sdf.format(calendarTime);
            list.add(formatDate);
//            log.info("格式化时间：{}", formatDate);
        }

        List<String> dateList = new ArrayList<>();
        for (Map<String, Object> map : mapList) {
            dateList.add(map.get("date").toString());
        }
        for (String s : list) {
            boolean exist = isExist(s, dateList);
            if (!exist) {
                Map<String, Object> newMap = new HashMap<>();
                newMap.put("date", s);
                newMap.put("count", 0);
                mapList.add(newMap);
            }
        }

        Collections.sort(mapList, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                try {
                    String dateStr1 = o1.get("date").toString();
                    Date date1 = sdf.parse(dateStr1);
                    String dateStr2 = o2.get("date").toString();
                    Date date2 = sdf.parse(dateStr2);
                    return (int) (date1.getTime() - date2.getTime());
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return 0;
            }
        });
        return mapList;

    }

    @Override
    public List<Map<String, Object>> TrendChartForHour(int userId) {
        List<Map<String, Object>> mapList = userApiDao.selectTrendChartForHour(userId);
        SimpleDateFormat sdf = new SimpleDateFormat("HH");
        // 计算前24小时
        int hours = 12;

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());


        List<String> list = new ArrayList<>();
        for (int i = 0; i < hours; i++) {
            calendar.add(Calendar.HOUR, -1);
            Date calendarTime = calendar.getTime();
            String formatDate = sdf.format(calendarTime);
            list.add(formatDate);

        }

        List<String> dateList = new ArrayList<>();
        for (Map<String, Object> map : mapList) {
            dateList.add(map.get("date").toString());
        }

        for (String s : list) {
            boolean exist = isExist(s, dateList);
            if (!exist) {
                Map<String, Object> newMap = new HashMap<>();
                newMap.put("date", s);
                newMap.put("count", 0);
                mapList.add(newMap);
            }
        }

        Collections.sort(mapList, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                try {
                    String dateStr1 = o1.get("date").toString();
                    Date date1 = sdf.parse(dateStr1);
                    String dateStr2 = o2.get("date").toString();
                    Date date2 = sdf.parse(dateStr2);
                    return (int) (date1.getTime() - date2.getTime());
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return 0;
            }
        });
        return mapList;
    }

    @Override
    public List<Map<String, Object>> TrendChartForOneDay(int userId) {
        List<Map<String, Object>> mapList = userApiDao.selectTrendChartForOneDay(userId);

        return mapList;

//        SimpleDateFormat sdf = new SimpleDateFormat("HH-dd");
//        // 计算两个日期之间相差多少天
//        int days = 15;
////        log.info("相差天数：{}", days);
//        Date startTime = DateUtil.getDateForDay(new Date(), days);
////        log.info("开始时间为{}", sdf.format(startTime));
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(new Date());
//
//        List<String> list = new ArrayList<>();
//        for (int i = 0; i < days; i++) {
//            calendar.add(Calendar.DATE, -1);
//            Date calendarTime = calendar.getTime();
//            String formatDate = sdf.format(calendarTime);
//            list.add(formatDate);
////            log.info("格式化时间：{}", formatDate);
//        }
//
//        List<String> dateList = new ArrayList<>();
//        for (Map<String, Object> map : mapList) {
//            dateList.add(map.get("date").toString());
//        }
//
//        for (String s : list) {
//            boolean exist = isExist(s, dateList);
//            if (!exist) {
//                Map<String, Object> newMap = new HashMap<>();
//                newMap.put("date", s);
//                newMap.put("count", 0);
//                mapList.add(newMap);
//            }
//        }
//        Collections.sort(mapList, new Comparator<Map<String, Object>>() {
//            @Override
//            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
//                try {
//                    String dateStr1 = o1.get("date").toString();
//                    Date date1 = sdf.parse(dateStr1);
//                    String dateStr2 = o2.get("date").toString();
//                    Date date2 = sdf.parse(dateStr2);
//                    return (int) (date1.getTime() - date2.getTime());
//                } catch (ParseException e) {
//                    e.printStackTrace();
//                }
//                return 0;
//            }
//        });
//        return mapList;
    }




    private boolean isExist(String target, List<String> stringList) {
        for (String s : stringList) {
            if (target.equals(s)) {
                return true;
            }
        }
        return false;
    }



    @Override
    @Transactional
    public void batchUpdateQuota(ArrayList<Map<String, Object>> arr) {
        // todo
        arr.forEach(item->{
            // 用户的可调用额度增加
            userDao.addQuotaCount((int) item.get("userId"), (int) item.get("buyCount"));
            // 接口的可调用额度增加
            userApiDao.updateQuota((int) item.get("userId"), (int) item.get("apiId"), (int) item.get("buyCount"));
        });

    }

    @Override
    public List<Map<String, Object>> TrendChartForOneWeek(int userId) {
        //List<Map<String, Object>> mapList = userApiDao.selectTrendChartForOneWeek();
        Date nowDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(nowDate);

        List<Map<String, Object>> mapList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 0; i < 2; i++) {
            calendar.add(Calendar.DATE, -7);
            Date tempDate = calendar.getTime();
            Long count = userApiDao.selectTrendChartByOneWeek(tempDate, nowDate, userId);
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("date", sdf.format(tempDate));
            if (count == null) {
                count = 0l;
            }
            map.put("count", count);
            nowDate = tempDate;
            mapList.add(map);
        }
        return mapList;


        /*SimpleDateFormat sdf = new SimpleDateFormat("dd");
        // 计算两个日期之间相差多少天
        int days = 7;
//        log.info("相差天数：{}", days);
        Date startTime = DateUtil.getDateForDay(new Date(), days);
//        log.info("开始时间为{}", sdf.format(startTime));
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startTime);

        List<String> list = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            calendar.add(Calendar.DATE, 1);
            Date calendarTime = calendar.getTime();
            String formatDate = sdf.format(calendarTime);
            list.add(formatDate);
//            log.info("格式化时间：{}", formatDate);
        }

        List<String> dateList = new ArrayList<>();
        for (Map<String, Object> map : mapList) {
            dateList.add(map.get("date").toString());
        }

        for (String s : list) {
            boolean exist = isExist(s, dateList);
            if (!exist) {
                Map<String, Object> newMap = new HashMap<>();
                newMap.put("date", s);
                newMap.put("count", 0);
                mapList.add(newMap);
            }
        }
        Collections.sort(mapList, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                try {
                    String dateStr1 = o1.get("date").toString();
                    Date date1 = sdf.parse(dateStr1);
                    String dateStr2 = o2.get("date").toString();
                    Date date2 = sdf.parse(dateStr2);
                    return (int) (date1.getTime() - date2.getTime());
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return 0;
            }
        });
        return mapList;*/
    }

    @Override
    public List<Map<String, Object>> getInvokeCountByMonth(int userId) {
        Date nowDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(nowDate);

        List<Map<String, Object>> mapList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 0; i < 2; i++) {
            calendar.add(Calendar.MONTH, -1);
            Date tempDate = calendar.getTime();
            Long count = userApiDao.selectCountByDayTimeRange(tempDate, nowDate, userId);
            Map<String, Object> map = new HashMap<>();
            map.put("date", sdf.format(tempDate));
            if (count == null) {
                count = 0l;
            }
            map.put("count", count);
            nowDate = tempDate;
            mapList.add(map);
        }
        return mapList;
    }

    @Override
    public List<Map<String, Object>> getInvokeCountForThree(int userId) {
        Date nowDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(nowDate);

        List<Map<String, Object>> mapList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH");
        for (int i = 0; i < 2; i++) {
            calendar.add(Calendar.DATE, -3);
            Date tempDate = calendar.getTime();
            Long count = userApiDao.selectCountByTimeRange(tempDate, nowDate, userId);
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("date", sdf.format(tempDate));
            if (count == null) {
                count = 0l;
            }
            map.put("count", count);
            nowDate = tempDate;
            mapList.add(map);
        }


        return mapList;
    }

    @Override
    public List<Map<String, Object>> getCountByMonth(int userId) {
        List<Map<String, Object>> mapList = userApiDao.selectInvokeCountByMonth(userId);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        int days = 10;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());

        List<String> list = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            calendar.add(Calendar.MONTH, -1);
            Date calendarTime = calendar.getTime();
            String formatDate = sdf.format(calendarTime);
            list.add(formatDate);
//            log.info("格式化时间：{}", formatDate);
        }

        List<String> dateList = new ArrayList<>();
        for (Map<String, Object> map : mapList) {
            dateList.add(map.get("date").toString());
        }

        for (String s : list) {
            boolean exist = isExist(s, dateList);
            if (!exist) {
                Map<String, Object> newMap = new HashMap<>();
                newMap.put("date", s);
                newMap.put("count", 0);
                mapList.add(newMap);
            }
        }
        Collections.sort(mapList, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                try {
                    String dateStr1 = o1.get("date").toString();
                    Date date1 = sdf.parse(dateStr1);
                    String dateStr2 = o2.get("date").toString();
                    Date date2 = sdf.parse(dateStr2);
                    return (int) (date2.getTime() - date1.getTime());
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return 0;
            }
        });
        return mapList;
    }

    @Override
    public List<Map<String, Object>> getCountByDay(int userId) {
        Date nowDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(nowDate);

        List<Map<String, Object>> mapList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH");
        for (int i = 0; i < 12; i++) {
            calendar.add(Calendar.HOUR, -6);
            Date tempDate = calendar.getTime();
            Long count = userApiDao.selectCountByTimeRange(tempDate, nowDate, userId);
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("date", sdf.format(nowDate));
            if (count == null) {
                count = 0l;
            }
            map.put("count", count);
            nowDate = tempDate;
            mapList.add(map);
        }

        Collections.sort(mapList, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                try {
                    String dateStr1 = o1.get("date").toString();
                    Date date1 = sdf.parse(dateStr1);
                    String dateStr2 = o2.get("date").toString();
                    Date date2 = sdf.parse(dateStr2);
                    return (int) (date1.getTime() - date2.getTime());
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return 0;
            }
        });


        return mapList;
    }

    @Override
    public List<Map<String, Object>> findCountForSeven(int userId) {

        List<Map<String, Object>> mapList = userApiDao.selectSevenCountByTimeRange(userId);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        int days = 7;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());

        List<String> list = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            Date calendarTime = calendar.getTime();
            String formatDate = sdf.format(calendarTime);
            list.add(formatDate);
            calendar.add(Calendar.DATE, -1);
        }

        List<String> dateList = new ArrayList<>();
        for (Map<String, Object> map : mapList) {
            dateList.add(map.get("date").toString());
        }

        for (String s : list) {
            boolean exist = isExist(s, dateList);
            if (!exist) {
                Map<String, Object> newMap = new HashMap<>();
                newMap.put("date", s);
                newMap.put("count", 0);
                mapList.add(newMap);
            }
        }
        Collections.sort(mapList, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                try {
                    String dateStr1 = o1.get("date").toString();
                    Date date1 = sdf.parse(dateStr1);
                    String dateStr2 = o2.get("date").toString();
                    Date date2 = sdf.parse(dateStr2);
                    return (int) (date1.getTime() - date2.getTime());
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return 0;
            }
        });
        return mapList;
    }

    @Override
    public List<Map<String, Object>> getCountByThreeDay(int userId) {
        Date nowDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(nowDate);

        List<Map<String, Object>> mapList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 0; i < 10; i++) {
            calendar.add(Calendar.DATE, -3);
            Date tempDate = calendar.getTime();
            Long count = userApiDao.selectCountByTimeRange(tempDate, nowDate, userId);
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("date", sdf.format(nowDate));
            if (count == null) {
                count = 0l;
            }
            map.put("count", count);
            nowDate = tempDate;
            mapList.add(map);
        }

        Collections.sort(mapList, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                try {
                    String dateStr1 = o1.get("date").toString();
                    Date date1 = sdf.parse(dateStr1);
                    String dateStr2 = o2.get("date").toString();
                    Date date2 = sdf.parse(dateStr2);
                    return (int) (date1.getTime() - date2.getTime());
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return 0;
            }
        });
        return mapList;
    }

    @Override
    public List<Map<String, Object>> getInvokeCountByThirty(int userId) {
        Date nowDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(nowDate);

        List<Map<String, Object>> mapList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 0; i < 2; i++) {
            calendar.add(Calendar.DATE, -30);
            Date tempDate = calendar.getTime();
            Long count = userApiDao.selectCountByTimeRange(tempDate, nowDate, userId);
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("date", sdf.format(nowDate));
            if (count == null) {
                count = 0l;
            }
            map.put("count", count);
            nowDate = tempDate;
            mapList.add(map);
        }


        return mapList;
    }

    @Override
    public List<Integer> findAllUserApi(int userId) {
        return userApiDao.findAllUserApi(userId);
    }


}
