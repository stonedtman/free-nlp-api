package com.yqt.yqt.param;

import lombok.Data;

@Data
public class LoginParam {

    //@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private String timestamp;
    /**
     * 随机数uuid
     */
    private String nonce;

    private String username;
    /**
     * 数字签名
     */
    private String sign;

}
