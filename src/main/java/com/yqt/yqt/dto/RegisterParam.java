package com.yqt.yqt.dto;

import lombok.Data;

@Data
public class RegisterParam {

    private String username;
    private String password;
    private String company;
    private String number;
    private String checkCode;
    //登录 0 明文 1 base64
    private Integer flag;

}
