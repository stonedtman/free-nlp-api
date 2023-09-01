package com.yqt.yqt.controller;

import com.alibaba.fastjson.JSONObject;
import com.yqt.yqt.entity.UserEntity;
import com.yqt.yqt.service.UserService;
import com.yqt.yqt.util.Base64Util;
import com.yqt.yqt.util.MD5Util;
import com.yqt.yqt.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.UUID;


/**
 * 登陆模块
 * @author wangyi
 *
 */
@Controller
@RequestMapping("")
@Slf4j
public class LoginController {

    @Autowired
    UserService userService;
    @Autowired
    public RedisUtil redisUtil;

    /**
     * 退出登陆
     * @param response
     * @param request
     */
    @GetMapping(value = "/logout")
    @ResponseBody
    public JSONObject logout(HttpServletResponse response, HttpServletRequest request) {
    	JSONObject responseobject = new JSONObject();
    	try {
    		String header = request.getHeader("token");
        	redisUtil.deleteKey(header);

        	responseobject.put("code", "200");
        	responseobject.put("msg", "用户登出成功");
        } catch (Exception e) {
            e.printStackTrace();
        }
		return responseobject;
    }


    @PostMapping("/login")
    @ResponseBody
    public JSONObject login(@RequestBody UserEntity param) {
        //判断密码是明文还是编码
        Integer flag = param.getFlag();
        if (flag != null && flag == 1){
            //base64编码
            String decode = Base64Util.decode(param.getPassword());
            param.setPassword(decode);
        }
        JSONObject response = new JSONObject();
        UserEntity user = userService.selectUserByAccount(param.getUsername());
        if (null != user) {

            if (user.getValid_time() != null) {
                Date validDate = user.getValid_time();
                if (validDate.before(new Date())) {
                    response.put("code", "501");
                    response.put("msg", "账号已过期");
                    return response;
                }
            }

            if (user.getStatus() == 0) {
                response.put("code", "3");
                response.put("msg", "用户禁止登录");
            } else {
                if (Base64Util.encode(param.getPassword()).equals(user.getPassword())) {
                    int is_delete = user.getIs_delete();
                    if (is_delete == 0) {
                        response.put("code", "4");
                        response.put("msg", "账户已被注销");
                    } else {
                    	String md5 = MD5Util.MD5(user.getUsername()+ UUID.randomUUID());
            			redisUtil.set(md5,(user.getId()+","+user.getPassword()));
            			response.put("token", md5);
            			response.put("secret-id", user.getSecret_id());
            			response.put("secret-key", user.getSecret_key());
                        response.put("code", "200");
                        response.put("msg", "用户登录成功");
                    }
                } else {
                    response.put("code", "2");
                    response.put("msg", "用户名或密码错误");
                }
            }
        } else {
            response.put("code", "-1");
            response.put("msg", "用户不存在");
        }
        return response;
    }
}
