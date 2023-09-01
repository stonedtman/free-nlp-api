package com.yqt.yqt.util;

import java.util.HashMap;
import java.util.Map;

public class ReturnUtil {

    public static Map<String,Object> error(String code , String msg){
        Map<String,Object> errMap = new HashMap<>();
        errMap.put("code",code);
        errMap.put("msg",msg);
        return errMap;
    }

    public static Map<String,Object> error_int(int code , String msg){
        Map<String,Object> errMap = new HashMap<>();
        errMap.put("code",code);
        errMap.put("msg",msg);
        return errMap;
    }
    public static Map<String,Object> success_int(int code , String msg , Object result){
        Map<String,Object> map = new HashMap<>();
        map.put("code",code);
        map.put("msg",msg);
        map.put("result",result);
        return map;
    }
    public static Map<String,Object> success(String code , String msg , Object result){
        Map<String,Object> map = new HashMap<>();
        map.put("code",code);
        map.put("msg",msg);
        map.put("result",result);
        return map;
    }

}
