package com.yqt.yqt.entity;

import lombok.Data;

import java.util.Date;

@Data
public class ViolationWord {

    private int id;
    private Integer labelId;
    private String content;
    private Date createTime;
    private Date updateTime;
    private String label;
}
