package com.yqt.yqt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ViolationWord {

    private int id;
    private Integer labelId;
    private String content;
    private Date createTime;
    private Date updateTime;
    private String label;
}
