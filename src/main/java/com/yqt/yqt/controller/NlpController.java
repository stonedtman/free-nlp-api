package com.yqt.yqt.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.yqt.yqt.entity.DiffMatchPatch;
import com.yqt.yqt.entity.ExampleRequest;
import com.yqt.yqt.util.RestTemplateUtil;
import com.yqt.yqt.util.ReturnUtil;
import com.yqt.yqt.util.WordFrequency;
import com.yqt.yqt.util.pojo.EventRelation;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

import static com.yqt.yqt.nlpUtil.nlpUtil.runLoadModelAndUse_commonCate;

@RestController
@RequestMapping("")
public class NlpController {
    @Value("${url.sentiment}")
    private String url_sentiment;

    @Value("${url.extractContract}")
    private String url_extractContract;

    @Value("${url.extractBidding}")
    private String url_extractBidding;

    @Value("${url.extractJudgment}")
    private String url_extractJudgment;

    @Value("${url.extractResume}")
    private String url_extractResume;

    @Value("${url.extractAppraise}")
    private String url_extractAppraise;

    @Value("${url.urlExtract}")
    private String url_extract;

    @Value("${url.urlEventExtract}")
    private String url_event_extract;

    /**
     *
     * 1、文本对比
     */
    @PostMapping("/text_comparison")
    public Object textMatch(@RequestBody ExampleRequest request) {
//        String text1="昨天与上海队的比赛，是深圳队老将周鹏CBA生涯的第684场比赛，他超越了前队友广东传奇名宿朱芳雨的683场纪录成为CBA历史出场数第一人！" ;
//        String text2="上海队的比赛，老将周鹏CBA生涯的第684场比赛中，他超越前队友广东传奇名宿朱芳雨的冠军纪录成为CBA历史出场数第一人！";
        String text1 = request.getText1();
        String text2 = request.getText2();
        DiffMatchPatch dmp = new DiffMatchPatch();
        String htmlDiffString = dmp.getHtmlDiffString(text1,text2);
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
     * 2.文本分类  通用模型
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
        String nlpPath = System.getProperty("user.dir").replace("\\", "/") + "/";
        ArrayList<Map<String, Object>> resultArr = runLoadModelAndUse_commonCate(text, nlpPath);
        JSONObject returnObj = new JSONObject();
        returnObj.put("msg", "通用分类成功");
        returnObj.put("code", "200");
        returnObj.put("result", resultArr);
        return returnObj;
    }

    /**
     * 3.通用情感分析  sentiment
     */
    @PostMapping("/sentiment")
    public Object sentiment(@RequestBody Map<String, Object> param) {
        RestTemplateUtil rtu = new RestTemplateUtil();
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

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
//        url_sentiment = "http://192.168.71.115:8383/sentiment";
        String body = rtu.post(url_sentiment, params);
        JSONObject jsonObject = JSON.parseArray(JSON.parse(body).toString()).getJSONObject(0);
        String returnText = jsonObject.getString("text");
        String label = jsonObject.getString("label");
        double score = jsonObject.getDouble("score");
        double negative_probs = 0.0;
        double positive_probs = 0.0;
        if ("negative".equals(label)) {
            //消极
            negative_probs = score;
            positive_probs = 1 - score;
        } else {
            //积极
            positive_probs = score;
            negative_probs = 1 - score;
        }

        JSONObject resultObj = new JSONObject();
        resultObj.put("text", returnText);
        resultObj.put("negative_probs", negative_probs);
        resultObj.put("positive_probs", positive_probs);
        resultObj.put("sentiment_key", label);

        JSONObject returnObject = new JSONObject();
        returnObject.put("code", "200");
        returnObject.put("msg", "情感分析成功");
        returnObject.put("results", resultObj);
        return returnObject;
    }

    /**
     * 4.合同抽取：文本内容抽取
     * @param param
     * @return
     */
    @PostMapping("/extractContract")
    public Object extractContract2(@RequestBody Map<String, Object> param) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 5000) {
                text = String.valueOf(param.get("text")).substring(0, 5000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
        //调用第三方接口
        String body = rtu.post(url_extractContract, params);
        //处理返回string
        body = body.replace("\"[", "[").replace("]\"", "]").replace("\\", "");
        //转json
        JSONArray jsonArray = JSONArray.parseArray(body);
        JSONObject returnObj = new JSONObject();
        returnObj.put("msg", "合同抽取成功");
        returnObj.put("code", "200");
        returnObj.put("result", jsonArray);
        return returnObj;
    }

    /**
     * 5.信息抽取-招投标抽取
     */
    @PostMapping("/extractBidding")
    public Object extractBidding(@RequestBody Map<String, Object> param) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 5000) {
                text = String.valueOf(param.get("text")).substring(0, 5000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
        //调用第三方接口
//        String body = rtu.post("http://stonedt.com:8383/extractBidding",params);
        String body = rtu.post(url_extractBidding, params);
        //处理返回string
        body = body.replace("\"[", "[").replace("]\"", "]").replace("\\", "");
        //转jsonArr
        JSONArray jsonArray = JSONArray.parseArray(body);
        JSONObject returnObj = new JSONObject();
        returnObj.put("msg", "招投标抽取成功");
        returnObj.put("code", "200");
        returnObj.put("result", jsonArray);
        return returnObj;
    }

    /**
     * 6.信息抽取-法律文书抽取
     */
    @PostMapping("/extractJudgment")
    public Object extractJudgment(@RequestBody Map<String, Object> param) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 5000) {
                text = String.valueOf(param.get("text")).substring(0, 5000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
        //调用第三方接口
//        String body = rtu.post("http://stonedt.com:8383/extractJudgment",params);
        String body = rtu.post(url_extractJudgment, params);
        //处理返回string
        body = body.replace("\"[", "[").replace("]\"", "]").replace("\\", "");
        //转jsonArr
        JSONArray jsonArray = JSONArray.parseArray(body);
        JSONObject returnObj = new JSONObject();
        returnObj.put("msg", "法律文书抽取成功");
        returnObj.put("code", "200");
        returnObj.put("result", jsonArray);
        return returnObj;
    }

    /**
     * 7.信息抽取-简历抽取
     */
    @PostMapping("/extractResume")
    public Object extractResume(@RequestBody Map<String, Object> param) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 5000) {
                text = String.valueOf(param.get("text")).substring(0, 5000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
        //调用第三方接口
//        String body = rtu.post("http://stonedt.com:8383/extractResume",params);
        String body = rtu.post(url_extractResume, params);
        //处理返回string
        body = body.replace("\"[", "[").replace("]\"", "]").replace("\\", "");
        //转json
        JSONArray jsonArray = JSONArray.parseArray(body);
        JSONObject returnObj = new JSONObject();
        returnObj.put("msg", "简历抽取成功");
        returnObj.put("code", "200");
        returnObj.put("result", jsonArray);
        return returnObj;
    }

    /**
     * 8.信息抽取-观点抽取
     */
    @PostMapping("/extractAppraise")
    public Object extractAppraise(@RequestBody Map<String, Object> param,
                                  HttpServletRequest request) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 5000) {
                text = String.valueOf(param.get("text")).substring(0, 5000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
        String body = rtu.post(url_extractAppraise, params);
        //处理返回string
        body = body.replace("\"[", "[").replace("]\"", "]").replace("\\", "");
        //转jsonArr
        JSONArray jsonArray = JSONArray.parseArray(body);
        JSONObject returnObj = new JSONObject();
        returnObj.put("msg", "观点抽取成功");
        returnObj.put("code", "200");
        returnObj.put("result", jsonArray);
        return returnObj;
    }

    /**
     * 9.信息抽取-自定义抽取
     * @param param
     * @return
     */
    @PostMapping("/extract")
    public Object extract(@RequestBody Map<String, Object> param) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 5000) {
                text = String.valueOf(param.get("text")).substring(0, 5000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }
        String sch = String.valueOf(param.get("sch"));
        ArrayList<String> list = new ArrayList<String>();
        String[] split = sch.split(",");
        for (String string : split) {
            list.add(string);
        }
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
        params.put("sch", list);
        //调用第三方接口
        String body = rtu.post(url_extract, params);
        //处理返回string
        body = body.replace("\"[", "[").replace("]\"", "]").replace("\\", "");
        //转jsonArr
        JSONArray jsonArray = JSONArray.parseArray(body);
        JSONObject returnObj = new JSONObject();
        returnObj.put("msg", "自定义抽取成功");
        returnObj.put("code", "200");
        returnObj.put("result", jsonArray);
        return returnObj;
    }

    /**
     * 10.信息抽取-事件抽取
     * @param param
     * @return
     */
    @PostMapping("/extractEvent")
    public Object event_relation2(@RequestBody Map<String, Object> param) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 5000) {
                text = String.valueOf(param.get("text")).substring(0, 5000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }
        String sch = String.valueOf(param.get("sch"));
        ArrayList<String> list = new ArrayList<String>();
        String[] split = sch.split(",");
        for (String string : split) {
            list.add(string);
        }
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
        params.put("抽取范围", list);
        //调用第三方接口
        String body = rtu.post(url_event_extract, params);
        body = body.substring(1, body.length() - 1);
        //处理返回string
        body = body.replaceAll("\\\\", "").replace("]\"", "\"").replace("\"[", "\"").replace(" ", "");
        //转jsonArr
        JSONArray jsonArray = JSONArray.parseArray(body);
        JSONObject object = JSONObject.parseObject(jsonArray.get(0).toString());
        for (Map.Entry<String, Object> entry : object.entrySet()) {
            Object value = entry.getValue();
            JSONArray valueArray = JSONArray.parseArray(value.toString());
            List<EventRelation> eventRelations = valueArray.toJavaList(EventRelation.class);
            if (eventRelations.size() > 1) {
                EventRelation eventRelation1 = eventRelations.get(0);
                EventRelation eventRelation2 = eventRelations.get(1);
                if (eventRelation1.getProbability() < eventRelation2.getProbability()) {
                    eventRelations.remove(0);
                } else {
                    eventRelations.remove(1);
                }
            }
            entry.setValue(eventRelations);
        }
        jsonArray.set(0, object);
        JSONObject returnObj = new JSONObject();
        returnObj.put("msg", "事件抽取成功");
        returnObj.put("code", "200");
        returnObj.put("result", jsonArray);
        return returnObj;
    }

    /**
     * 11.信息抽取-关系抽取抽取
     * @param param
     * @return
     */
    @PostMapping("/extractRelations")
    public Object relationship_relation2(@RequestBody Map<String, Object> param) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 5000) {
                text = String.valueOf(param.get("text")).substring(0, 5000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }
        String sch = String.valueOf(param.get("sch"));
        ArrayList<String> list = new ArrayList<String>();
        String[] split = sch.split(",");
        for (String string : split) {
            list.add(string);
        }
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
        params.put("抽取范围", list);
        //调用第三方接口
        String body = rtu.post(url_event_extract, params);
        body = body.substring(1, body.length() - 1);
        //处理返回string
        body = body.replaceAll("\\\\", "").replace("]\"", "\"").replace("\"[", "\"").replace(" ", "");
        //转jsonArr
        JSONArray jsonArray = JSONArray.parseArray(body);
        JSONObject object = JSONObject.parseObject(jsonArray.get(0).toString());
        for (Map.Entry<String, Object> entry : object.entrySet()) {
            Object value = entry.getValue();
            JSONArray valueArray = JSONArray.parseArray(value.toString());
            List<EventRelation> eventRelations = valueArray.toJavaList(EventRelation.class);
            if (eventRelations.size() > 1) {
                EventRelation eventRelation1 = eventRelations.get(0);
                EventRelation eventRelation2 = eventRelations.get(1);
                if (eventRelation1.getProbability() < eventRelation2.getProbability()) {
                    eventRelations.remove(0);
                } else {
                    eventRelations.remove(1);
                }
            }
            entry.setValue(eventRelations);
        }
        jsonArray.set(0, object);
        JSONObject returnObj = new JSONObject();
        returnObj.put("msg", "关系抽取成功");
        returnObj.put("code", "200");
        returnObj.put("result", jsonArray);
        return returnObj;
    }

    /**
     * 12.高频词提取
     */
    @PostMapping("/keywords")
    @ResponseBody
    public Object keywords(@RequestBody Map<String, Object> param) {
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            text = String.valueOf(param.get("text"));
        }
        int backCount;
        if (param.get("backCount") == null) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            backCount = (int) param.get("backCount");
        }
        try {
            List<Map.Entry<String, Integer>> result = WordFrequency.order(WordFrequency.count(new HashMap<String, Integer>(), text));
            int count = 0;
            if (backCount > result.size()) {
                count = result.size();
            } else {
                count = backCount;
            }
            JSONArray array = new JSONArray();
            for (int i = 0; i < count; i++) {
                Map.Entry<String, Integer> entry = result.get(i);
                JSONObject object = new JSONObject();
                object.put("text", entry.getKey());
                object.put("pos_count", entry.getValue());
                array.add(object);
            }

            // 全部云词
            JSONArray wordClouds = new JSONArray();
            for (int i = 0; i < result.size(); i++) {
                Map.Entry<String, Integer> entry = result.get(i);
                JSONObject object = new JSONObject();
                object.put("text", entry.getKey());
                object.put("pos_count", entry.getValue());
                wordClouds.add(object);
            }

            Map<String,Object> map = new HashMap<>();
            map.put("wordsList",array);
            map.put("wordClouds",wordClouds);
            JSONObject returnObject = new JSONObject();
            returnObject.put("code", "200");
            returnObject.put("msg", "高频词提取成功");
            returnObject.put("results", map);
            return returnObject;
        } catch (IOException e) {
            e.printStackTrace();
            return ReturnUtil.error("500", "服务器内部异常!");
        }
    }

}