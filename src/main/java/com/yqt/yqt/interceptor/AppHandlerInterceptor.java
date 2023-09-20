package com.yqt.yqt.interceptor;

import com.yqt.yqt.entity.*;
import com.yqt.yqt.service.*;
import com.yqt.yqt.util.BaseContext;
import com.yqt.yqt.util.FastJsonUtil;
import com.yqt.yqt.util.IpUtil;
import com.yqt.yqt.util.RedisUtil;
import lombok.extern.java.Log;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
@Component
@Log
public class AppHandlerInterceptor extends HandlerInterceptorAdapter {
	@Autowired
	private RedisUtil redisUtil;

	@Autowired
	private UserService userService;

	@Autowired
	private UserApiService userApiService;

	@Autowired
	private LogInfoService logInfoService;

	@Autowired
	private ApiInfoService apiInfoService;
	@Autowired
	private UserApiFailLogService userApiFailLogService;

	// 在方法执行前校验secret-id、secret-key
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		try {

			System.out.println("调用拦截");
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html;charset=utf-8");
			String secret_id = request.getHeader("secret-id");
			String secret_key = request.getHeader("secret-key");
			if (StringUtils.isEmpty(secret_id) || StringUtils.isEmpty(secret_key)) {
				String jsonString = FastJsonUtil.createJson("1201", "secret-id或者secret-key为空,请重新登录!").toJSONString();
				response.getWriter().print(jsonString);
				return false;
			}
			//根据secret_id和secret_key返回当前用户的状态，需做判空操作及余额判断操作
			UserEntity userEntity = userService.getUserBySecretIdAndSecretKey(secret_id, secret_key);
			//判断User是否存在
			if (userEntity == null) {
				String jsonString = FastJsonUtil.createJson("1201", "secret-id或者secret-key输入错误,请重新登录!").toJSONString();
				response.getWriter().print(jsonString);
				return false;
			}
			if (userEntity.getValid_time() != null) {
				Date validDate = userEntity.getValid_time();
				if (validDate.before(new Date())) {
					String jsonString = FastJsonUtil.createJson("501", "接口有效期已过期").toJSONString();
					response.getWriter().print(jsonString);
					return false;
				}
			}
			//根据secret_id和secret_key返回当前用户的状态，需做判空操作及余额判断操作
			//判断用户状态
			if (userEntity.getStatus() == 0) {
				String jsonString = FastJsonUtil.createJson("1201", "用户被屏蔽中").toJSONString();
				response.getWriter().print(jsonString);
				return false;
			}
			HandlerMethod handlerMethod = (HandlerMethod) handler;
			RequestMapping requestMapping = handlerMethod.getMethodAnnotation(RequestMapping.class);
			String url = requestMapping.value()[0];
			UserApi userApi = userApiService.getUserApiByApiUrlAndUserId(url, userEntity.getId());
			//判空 判断接口地址是否存在. 都存在,成功.  用户api不存在,接口地址存在,则新增一条用户api. 都不存在返回错误.
			if (userApi == null) {
				ApiInfo apiInfo = apiInfoService.getInfoByUrl(url);
				if(apiInfo==null){
					String jsonString = FastJsonUtil.createJson("1201", "接口url错误").toJSONString();
					response.getWriter().print(jsonString);
					return false;
				}else{
					int addType =  userApiService.addUserApi(userEntity.getId(), apiInfo.getId());
					if(addType<=0){
						String jsonString = FastJsonUtil.createJson("1201", "接口url错误,更新失败").toJSONString();
						response.getWriter().print(jsonString);
						return false;
					}
					userApi = userApiService.getUserApiByApiUrlAndUserId(url, userEntity.getId());
				}

			}
			//判断接口权限
			if (userApi.getApiAuthority() == 0) {
				String jsonString = FastJsonUtil.createJson("1204", "未开通该接口权限").toJSONString();
				response.getWriter().print(jsonString);
				return false;
			}
			//向log_info表中添加数据
			LogInfo logInfo = new LogInfo();
			logInfo.setUserId(userEntity.getId());
			logInfo.setApiId(userApi.getApiId());
			//获取ip
			String ip = IpUtil.getIpAddr(request);
			logInfo.setIp(ip);
			logInfoService.addLogInfo(logInfo);
			BaseContext.setSkCurrentId(userEntity.getId());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return true;

	}



	public void postHandle (HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

	}
	@Override
	public void afterCompletion (HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		String secret_id = request.getHeader("secret-id");
		String secret_key = request.getHeader("secret-key");
		//根据secret_id和secret_key返回当前用户的状态，需做判空操作及余额判断操作
		UserEntity userEntity = userService.getUserBySecretIdAndSecretKey(secret_id, secret_key);
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		RequestMapping requestMapping = handlerMethod.getMethodAnnotation(RequestMapping.class);
		String url = requestMapping.value()[0];
		//			根据api_url和user_id查询
		UserApi userApi = userApiService.getUserApiByApiUrlAndUserId(url, userEntity.getId());
		if (ex != null) {
			// 请求处理过程中发生了异常，请求处理失败
			System.out.println("请求处理失败： " + ex.getMessage());
			// 向 user_api_fail_log 表中添加失败记录
			UserApiFail userApiFail = new UserApiFail();
			userApiFail.setUserId(userEntity.getId());
			userApiFail.setApiId(userApi.getApiId());
			if(userApiFailLogService.selectByUserAndApi(userEntity.getId(),userApi.getApiId())<1){
				// 添加失败记录数
				userApiFail.setFailedCount(1);
				userApiFailLogService.insertUserApiFailLog(userApiFail);
			}else {
				userApiFailLogService.updateSubUserApiFailLog(userApiFail);
			}

		} else {
			// 请求处理成功
			System.out.println("请求处理成功");
			// 成功之后的一个数据的统计
			//调用后次数加一  （接口调用次数）
			userApiService.addUserApiInvokeCount(url, userEntity.getId());
			//调用后调用配额次数减一 （用户剩余可调用次数）
			userService.reduceQuotaCountByUserId(userEntity.getId());
			// 调用后接口剩余配额次数  （接口的配额额度）
			userApiService.subUserApiTotalCount(url, userEntity.getId());
		}

		if (response.getStatus() == 500) {
			System.out.println("500错误");
		} else if (response.getStatus() == 404) {
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html;charset=utf-8");
			System.out.println("404错误");
			String jsonString = FastJsonUtil.createJson("1202", "登录状态已过期，请重新登录!").toJSONString();
			response.getWriter().print(jsonString);
		}

	}
}