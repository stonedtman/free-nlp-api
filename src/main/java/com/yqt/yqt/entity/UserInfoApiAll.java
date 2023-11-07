package com.yqt.yqt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 此类封装了3张表数据：User、ApiInfo、User_Api
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoApiAll {
    private int id;
    private String name;
    private String url;
    private String type;
    private String api_authority;
    private String invoke_count;
    private String totalCount;
    private String residual;
    private Integer userApiId;
    
}
