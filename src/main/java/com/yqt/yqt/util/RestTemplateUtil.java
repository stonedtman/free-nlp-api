package com.yqt.yqt.util;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class RestTemplateUtil {

    public String post(String url, Map<String, Object> params) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Accept", "application/json; charset=utf-8");

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<Map<String, Object>>(params, httpHeaders);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestEntity, String.class);

        return responseEntity.getBody();
    }
    public String postByMultipartFile(String url,MultipartFile file) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, Object> body
                = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });
        // 发送请求
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, Object>> requestEntity
                = new HttpEntity<>(body, headers);
        ResponseEntity<String> response
                = restTemplate.postForEntity(url,
                requestEntity,
                String.class);
        return response.getBody();
    }
    public String postByFile(String url, File file){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new FileSystemResource(file));
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        // 发送请求
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response
                = restTemplate.postForEntity(url,
                requestEntity,
                String.class);
        return response.getBody();
    }





    public static void main(String[] args) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        Map<String, Object> params = new HashMap<>();
        params.put("text", "兴业银行违规催收，泄露个人隐私，投诉无果，还有没有法律法规了，#兴业银行##兴业银行# @兴业银行 @中国银监会 #中国银监会##违规##投诉#");
        System.out.println(rtu.post("http://stonedt.com:8383/sentiment", params));
    }

    public String post(String uploadFileUrl, MultiValueMap<String, Object> body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response
                = restTemplate.postForEntity(uploadFileUrl,
                requestEntity,
                String.class);
        return response.getBody();
    }

}
