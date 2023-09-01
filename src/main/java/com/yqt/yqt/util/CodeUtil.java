package com.yqt.yqt.util;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.DigestUtils;
import org.springframework.web.client.RestTemplate;

import java.util.Locale;
import java.util.Random;

@Slf4j
public class CodeUtil {

    private static final Logger logger = LoggerFactory.getLogger(CodeUtil.class);

    private static final String appId = "12543";
    private static final String appKey = "8d7d0fe2b6";
    private static final String modeId="228370";

    /**
     * 三体云通讯短信服务
     * @param mobile
     * @param content
     * @param appId
     * @param appKey
     * @param modeId
     * @return
     */

    public static String sendCode(String mobile, String content,String appId, String appKey, String modeId) {
        String sign = appKey+appId+mobile;
        sign = DigestUtils.md5DigestAsHex(sign.getBytes()).toLowerCase(Locale.ROOT);
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://sms.santiyun.com/mt.php?appId=" + appId + "&modeId=" + modeId + "&vars="+content+"&mobile=" + mobile + "&sign=" + sign;
        return restTemplate.getForObject(url, String.class);
    }

    public static void main(String[] args) {
        String s = generateRandomNumber(6);
        log.info(s);
        String modeId = "18888888888";
       // sendCode(modeId,s);
    }


    public static String generateRandomNumber(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }


}
