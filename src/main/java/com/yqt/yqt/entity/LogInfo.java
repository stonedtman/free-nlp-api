package com.yqt.yqt.entity;

import lombok.Data;

import java.util.Date;

@Data
public class LogInfo {

    //主键id
    private Integer id;

    //用户id
    private Integer userId;

    //调用接口id
    private int apiId;

    //调用时间
    private Date callTime;

    //调用ip
    private String ip;

}
