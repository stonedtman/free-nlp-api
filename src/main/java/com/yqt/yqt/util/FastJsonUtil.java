package com.yqt.yqt.util;

import com.alibaba.fastjson.JSONObject;

public class FastJsonUtil {
	
	public static JSONObject createJson(String code,String msg)
	{
		JSONObject json = new JSONObject(true);
		json.put("code",code);
		json.put("msg",msg);
		json.put("data", "");
		return json;
	}

	public static JSONObject createDataJson(String code,String message)
	{
		JSONObject json = new JSONObject(true);
		json.put("code",code);
		json.put("data",message);
		return json;
	}
	
	public static JSONObject createJson(int code,String msg)
	{
		JSONObject json = new JSONObject(true);
		json.put("code",code);
		json.put("msg",msg);
		json.put("data", "");
		return json;
	}
	
}
