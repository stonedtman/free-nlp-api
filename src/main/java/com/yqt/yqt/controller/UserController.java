package com.yqt.yqt.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yqt.yqt.dao.AdminDao;
import com.yqt.yqt.entity.Admin;
import com.yqt.yqt.entity.UserEntity;
import com.yqt.yqt.entity.UserInfoApiAll;
import com.yqt.yqt.service.ApiInfoService;
import com.yqt.yqt.service.UserService;
import com.yqt.yqt.util.RedisUtil;
import com.yqt.yqt.util.ReturnUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ApiInfoService apiInfoService;

    @Autowired
    private RedisUtil redisUtil;

    /**
     * 根据id获取用户信息
     */
    @GetMapping("/getUserById")
    public Object getById(HttpServletRequest request) {
        String header = request.getHeader("token");
        String key = redisUtil.getKey(header);
        UserEntity userEntity = userService.selectUserById(Integer.parseInt(key.split(",")[0]));
        if (userEntity != null) {
            Admin admin = adminDao.selectAdminInfo();
            if (userEntity.getLogo() == null || "".equals(userEntity.getLogo())) {
                userEntity.setLogo(admin.getLogo());
            }
            if (userEntity.getAbbreviation() == null || "".equals(userEntity.getAbbreviation())) {
                userEntity.setAbbreviation(admin.getAbbreviation());
            }
            if (userEntity.getSystemName() == null || "".equals(userEntity.getSystemName())) {
                userEntity.setSystemName(admin.getSystemName());
            }
            if (userEntity.getSystemBriefName() == null || "".equals(userEntity.getSystemBriefName())) {
                userEntity.setSystemBriefName(admin.getSystemBriefName());
            }
            return ReturnUtil.success("200", "查询成功", userEntity);
        } else {
            return ReturnUtil.error("502", "用户不存在");
        }
    }

    @GetMapping("/getAllApiInfo")
    public Object getAllApiInfo(@RequestParam(value = "pageNo", required = false, defaultValue = "1") int pageNo,
                                @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize,
                                HttpServletRequest request) {
        String header = request.getHeader("token");
        String key = redisUtil.getKey(header);
        int userId = Integer.parseInt(key.split(",")[0]);
        PageHelper.startPage(pageNo, pageSize);
        //List<UserInfoApiAll> allApiInfo = apiInfoService.getAllApiInfoByUserID(userId);

        ArrayList<UserInfoApiAll> apiInfos = apiInfoService.getAllApiInfoByUserID(userId);
        PageInfo<UserInfoApiAll> pageInfo = new PageInfo<>(apiInfos);

        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("msg", "获取用户信息成功");
        resultMap.put("results", pageInfo);
        resultMap.put("code", "200");
        return resultMap;

    }

    /**
     * 修改公司名称
     */
    @PostMapping("/updateCompany")
    public Object updateCompany(@RequestBody UserEntity userEntity) {
        return userService.updateCompany(userEntity);
    }

    /**
     * 修改密码
     */
    @PostMapping("/updatePassword")
    public Object updatePassword(@RequestBody UserEntity userEntity) {
        return userService.updatePassword(userEntity);
    }

    /**
     * 重新生成密钥
     */
    @PostMapping("/updateSecret")
    public Object updateSecret(HttpServletRequest request) {
        String header = request.getHeader("token");
        String value = redisUtil.getKey(header);
        UserEntity userEntity = userService.updateSecretIdAndSecretKey(value);
        Map<String, String> userMap = new HashMap<>();
        userMap.put("secret-id", userEntity.getSecret_id());
        userMap.put("secret-key", userEntity.getSecret_key());
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "重新生成密钥成功");
        resultMap.put("results", userMap);
        resultMap.put("code", "200");
        return resultMap;
    }

    /**
     * 接口调用统计
     */
    @GetMapping("/getApiStatistic")
    public Object getApiStatistic(@RequestParam(value = "orderType", required = false, defaultValue = "0") int orderType,
                                  @RequestParam(value = "pageNo", required = false, defaultValue = "1") int pageNo,
                                  @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize,
                                  HttpServletRequest request) {
        String header = request.getHeader("token");
        String key = redisUtil.getKey(header);
        int userId = Integer.parseInt(key.split(",")[0]);
        PageHelper.startPage(pageNo, pageSize);
        List<Map<String, Object>> list = userService.getApiStatistic(userId, orderType);
        PageInfo<Map<String, Object>> pageInfo = new PageInfo<>(list);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "接口调用统计成功");
        resultMap.put("results", pageInfo);
        resultMap.put("code", "200");
        return resultMap;
    }

    /**
     * user 返回全量API接口
     */
    @GetMapping("/userApi")
    public Object userApi(HttpServletRequest request) {
        //获取用户id
        String header = request.getHeader("token");
        String key = redisUtil.getKey(header);
        int userId = Integer.parseInt(key.split(",")[0]);
        Map<String, Object> resultMap = new HashMap<>();
        List<Map<String, Object>> maps = userService.userOpenApi(userId);
        resultMap.put("msg", "查询成功");
        resultMap.put("results", maps);
        resultMap.put("code", "200");
        return resultMap;

    }

    /**
     * 标识替换
     */
    @PostMapping("/updateInfo")
    public JSONObject updateInfo(@RequestParam(value = "id") Integer id,
                                 @RequestParam(value = "system_brief_name", required = false) String systemBriefName,
                                 @RequestParam(value = "system_name",required = false) String systemName,
                                 @RequestParam(value = "abbreviation",required = false) String abbreviation,
                                 @RequestParam(value = "copyright",required = false) String copyright,
                                 @RequestParam(value = "logo",required = false) MultipartFile logo) {
        JSONObject returnObj = new JSONObject();
        try {
            UserEntity userEntity = new UserEntity();
            userEntity.setId(id);
            userEntity.setSystemName(systemName);
            userEntity.setCopyright(copyright);
            userEntity.setAbbreviation(abbreviation);
            userEntity.setSystemBriefName(systemBriefName);

            int ifSuccess = userService.updateInfo(userEntity, logo);
            if (ifSuccess <=0) {
                returnObj.put("msg","标识替换失败");
                returnObj.put("code","501");
                return returnObj;
            } else {
                Admin admin = adminDao.selectAdminInfo();
                UserEntity user = userService.selectUserById(id);
                if (user.getLogo() == null || "".equals(user.getLogo())) {
                    user.setLogo(admin.getLogo());
                }
                if (user.getAbbreviation() == null || "".equals(user.getAbbreviation())) {
                    user.setAbbreviation(admin.getAbbreviation());
                }
                if (user.getSystemName() == null || "".equals(user.getSystemName())) {
                    user.setSystemName(admin.getSystemName());
                }
                if (user.getSystemBriefName() == null || "".equals(user.getSystemBriefName())) {
                    user.setSystemBriefName(admin.getSystemBriefName());
                }
                JSONObject info = new JSONObject();
                info.put("logo",user.getLogo());
                info.put("copyright",user.getCopyright());
                info.put("system_name",user.getSystemName());
                info.put("system_brief_name",user.getSystemBriefName());
                info.put("company",user.getCompany());
                info.put("abbreviation",user.getAbbreviation());
                returnObj.put("msg","标识替换成功");
                returnObj.put("code","200");
                returnObj.put("result",info);
                return returnObj;
            }
        } catch (IOException e) {
            e.printStackTrace();
            returnObj.put("msg", "服务器内部异常");
            returnObj.put("code", "501");
            return returnObj;
        }
    }

    @Autowired
    private AdminDao adminDao;

    @GetMapping("/userById")
    public Object user(@RequestParam Integer id) {
        if (id == null) {
            return ReturnUtil.error("502", "用户不存在");
        }

        UserEntity userEntity = userService.selectUserById(id);
        if (userEntity != null) {
            Admin admin = adminDao.selectAdminInfo();
            if (userEntity.getLogo() == null || "".equals(userEntity.getLogo())) {
                userEntity.setLogo(admin.getLogo());
            }
            if (userEntity.getAbbreviation() == null || "".equals(userEntity.getAbbreviation())) {
                userEntity.setAbbreviation(admin.getAbbreviation());
            }
            if (userEntity.getSystemName() == null || "".equals(userEntity.getSystemName())) {
                userEntity.setSystemName(admin.getSystemName());
            }
            if (userEntity.getSystemBriefName() == null || "".equals(userEntity.getSystemBriefName())) {
                userEntity.setSystemBriefName(admin.getSystemBriefName());
            }
            return ReturnUtil.success("200", "查询成功", userEntity);
        } else {
            return ReturnUtil.error("502", "用户不存在");
        }
    }

}
