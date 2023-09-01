package com.yqt.yqt.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

    public static Date getDateFoHour(Date startTime, Integer hour) {
        int hours = hour;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startTime);
        calendar.add(Calendar.HOUR, -hours);
        return calendar.getTime();
    }

    public static Date getDateForDay(Date startTime, Integer day) {
        int days = day;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startTime);
        calendar.add(Calendar.DATE, -days);
        return calendar.getTime();
    }

    public static Date getDateForMonth(Date startTime, Integer day) {
        int days = day;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startTime);
        calendar.add(Calendar.MONTH, -days);
        return calendar.getTime();
    }

    public static Date getDateForThreeDay(Date startTime, Integer day) {
        int days = day;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startTime);
        calendar.add(Calendar.DATE, -days);
        return calendar.getTime();
    }


    public static void main(String[] args) throws ParseException {

        Date dateForDay = getDateForMonth(new Date(), 11);
        System.out.println(new SimpleDateFormat("yyyy-MM-dd").format(dateForDay));

        /*SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 1; i <= 10; i++) {
            Date date = getDateForDay(new Date(), i * 3);
            System.out.println(simpleDateFormat.format(date));
        }
        SimpleDateFormat simpleDateFormatHour = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (int i = 1; i <= 24; i++) {
            Date date = getDateFoHour(new Date(), i);
            System.out.println(simpleDateFormatHour.format(date));
        }*/

    }

    /**
     * date2比date1多的天数
     *
     * @param date1
     * @param date2
     * @return
     */
    public static int differentDays(Date date1, Date date2) {
        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(date1);

        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(date2);
        int day1 = cal1.get(Calendar.DAY_OF_YEAR);
        int day2 = cal2.get(Calendar.DAY_OF_YEAR);

        int year1 = cal1.get(Calendar.YEAR);
        int year2 = cal2.get(Calendar.YEAR);
        if (year1 != year2) {//同一年
            int timeDistance = 0;
            for (int i = year1; i < year2; i++) {
                if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0)    //闰年
                {
                    timeDistance += 366;
                } else    //不是闰年
                {
                    timeDistance += 365;
                }
            }

            return timeDistance + (day2 - day1);
        } else {// 不同年
            System.out.println("判断day2 - day1 : " + (day2 - day1));
            return day2 - day1;
        }
    }

}
