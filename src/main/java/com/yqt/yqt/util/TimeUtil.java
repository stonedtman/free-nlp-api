package com.yqt.yqt.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtil {

    public static double calDay(String expireTime) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date endDay = sdf.parse(expireTime);
        Date star = new Date();//开始时间
        long starTime = star.getTime();
        long endTime = endDay.getTime();
        long num = endTime - starTime;//时间戳相差的毫秒数
        return (double) num / 24 / 60 / 60 / 1000;
    }

}
