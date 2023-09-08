package com.yqt.yqt.controller;

import com.alibaba.fastjson.JSONObject;
import com.yqt.yqt.entity.DiffMatchPatch;
import com.yqt.yqt.entity.ExampleRequest;
import com.yqt.yqt.util.ReturnUtil;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

import static com.yqt.yqt.nlpUtil.nlpUtil.runLoadModelAndUse_commonCate;

@RestController
@RequestMapping("")
public class NlpController {
    @Value("${path.nlpPath}")
    private String nlpPath;
    /**
     *
     * 文本对比
     */
    @PostMapping("/text_comparison")
    public Object textMatch(@RequestBody ExampleRequest request) {
//        String text1="昨天与上海队的比赛，是深圳队老将周鹏CBA生涯的第684场比赛，他超越了前队友广东传奇名宿朱芳雨的683场纪录成为CBA历史出场数第一人！" ;
//        String text2="上海队的比赛，老将周鹏CBA生涯的第684场比赛中，他超越前队友广东传奇名宿朱芳雨的冠军纪录成为CBA历史出场数第一人！";
        String text1 = request.getText1();
        String text2 = request.getText2();
        DiffMatchPatch dmp = new DiffMatchPatch();
        String htmlDiffString = dmp.getHtmlDiffString(text1,text2);
//        String htmlDiffString = dmp.getHtmlDiffString(text1,text2);
        System.out.println(htmlDiffString);

        Document parse = Jsoup.parse(htmlDiffString);
        ArrayList<Map<String,Object>> arrayList = new ArrayList<>();
        Elements select = parse.select("span");
        for (Element element : select) {
            Map<String,Object> map = new HashMap<>();
            map.put("diff_type","equal");
            String[] titles = element.attr("title").split("=");
            map.put("begin_pos",titles[1]);
            map.put("end_pos",Integer.parseInt(titles[1])+(element.text().length()));
            map.put("diff_txt",element.text());
            arrayList.add(map);
            //System.out.println(element.toString());
            System.out.println("span;"+element.attr("title")+"        "+element.text());
        }

        Elements select_del = parse.select("del");
        for (Element element : select_del) {
            Map<String,Object> map = new HashMap<>();
            map.put("diff_type","delete");
            String[] titles = element.attr("title").split("=");
            map.put("begin_pos",titles[1]);
            map.put("end_pos",Integer.parseInt(titles[1])+element.text().length());
            map.put("diff_txt",element.text());
            arrayList.add(map);
            //System.out.println(element.toString());
            System.out.println("del"+element.attr("title")+"        "+element.text());
        }


        Elements select_ins = parse.select("ins");
        for (Element element : select_ins) {
            Map<String,Object> map = new HashMap<>();
            map.put("diff_type","add");
            String[] titles = element.attr("title").split("=");
            map.put("begin_pos",titles[1]);
            map.put("end_pos",Integer.parseInt(titles[1])+element.text().length());
            map.put("diff_txt",element.text());
            arrayList.add(map);
            //System.out.println(element.toString());
            System.out.println("ins:"+element.attr("title")+"        "+element.text());
        }
        arrayList.sort(Comparator.comparing((Map m) -> (new BigDecimal(m.get("begin_pos").toString()))));
        Map<String,Object> result = new HashMap<>();
        result.put("html",htmlDiffString);
        result.put("data",arrayList);
        return ReturnUtil.success("200","成功",result);
    }

    /**
     * 9.文本分类  通用模型
     */
    @PostMapping("/classify")
    public Object common_cate(@RequestBody Map<String, Object> param) {
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 1000) {
                text = String.valueOf(param.get("text")).substring(0, 1000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }

        ArrayList<Map<String, Object>> resultArr = runLoadModelAndUse_commonCate(text, nlpPath);
        JSONObject returnObj = new JSONObject();
        returnObj.put("msg", "通用分类成功");
        returnObj.put("code", "200");
        returnObj.put("result", resultArr);
        return returnObj;
    }
}