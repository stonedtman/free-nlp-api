package com.yqt.yqt.interceptor;

import com.yqt.yqt.util.BaseContext;
import com.yqt.yqt.util.FastJsonUtil;
import com.yqt.yqt.util.RedisUtil;
import lombok.extern.java.Log;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@Component
@Log
public class NlpHandlerInterceptor extends HandlerInterceptorAdapter {
	@Autowired
	private RedisUtil redisUtil;

	// 在方法执行前校验token
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
    	System.out.println("登陆拦截");
    	response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
		// 校验token
		String header = request.getHeader("token");
        if(StringUtils.isEmpty(header)) {
        	try {
        		String jsonString = FastJsonUtil.createJson("1201", "token不存在,请重新登录!").toJSONString();
				response.getWriter().print(jsonString);
				return false;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
            
        }
        String token = null;
        if (header == null) {
        	try {
        		String jsonString = FastJsonUtil.createJson("1201", "token为空,请重新登录!").toJSONString();
				response.getWriter().print(jsonString);
				return false;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        } else {
            token= header;
        }
        Object object = redisUtil.getKey(token);
        // token过期或不存在，两次token不一致都返回false
        try {
        	if (null == object) {
        		String jsonString = FastJsonUtil.createJson("1202", "登录状态已过期，请重新登录!").toJSONString();
					response.getWriter().print(jsonString);
				    return false;
        	} else{
				int userId = Integer.parseInt(object.toString().split(",")[0]);
				BaseContext.setCurrentId(userId);
			}
        } catch (IOException e) {
			e.printStackTrace();
		}


        return true;             
    }
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
	}
 
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		if(response.getStatus()==500){
			System.out.println("500错误");
		}else if(response.getStatus()==404){
			response.setCharacterEncoding("UTF-8");
	        response.setContentType("text/html;charset=utf-8");
			System.out.println("404错误");
			String jsonString = FastJsonUtil.createJson("1202", "登录状态已过期，请重新登录!").toJSONString();
			response.getWriter().print(jsonString);
		}
	}

}
