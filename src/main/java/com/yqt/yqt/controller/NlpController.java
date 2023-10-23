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

    @Value("${url.NER}")
    private String url_NER;

    @Value("${url.NER_ORG}")
    private String url_ner_org;
    //主题抽取
    @Value("${url.topic}")
    private String url_topic;
    //自动摘要
    @Value("${url.jiaguSummary}")
    private String url_jiaguSummary;
    //相似度查找
    @Value("${url.similarity}")
    private String url_similarity;


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
        if (list.size() < 1) {
            return ReturnUtil.error("501", "传参sch不能为空");
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

    /**
     * 13.实体识别
     */
    @PostMapping("/NER")
    public Object NER(@RequestBody Map<String, Object> param) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 3000) {
                text = String.valueOf(param.get("text")).substring(0, 3000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
        //调用第三方接口
        String body = rtu.post(url_NER, params);
        //处理返回string
        body = body.replace("\"[", "").replace("]\"", "]").replace("\\", "");
        String[] contents = body.split("],");
        //数量
        Map<String, Integer> labelCount = new HashMap<>();
        //过滤词
        String ignoreWords = "介词,介词_方位介词,助词,代词,连词,副词,疑问词,肯定词,否定词,数量词,数量词_序数词,数量词_单位数量词,叹词,拟声词,修饰词,修饰词_性质,修饰词_类型,修饰词_化,外语单词,汉语拼音,w,词汇用语";
        String[] words = ignoreWords.split(",");
        Set<String> ignoreSet = new HashSet<>(Arrays.asList(words));
        ArrayList<Map<String, String>> resultArr = new ArrayList<>();
        for (int i = 0; i < contents.length; i++) {
            Map<String, String> objMap = new HashMap<>();
            String content = contents[i].replace("[", "").replace("]", "").replace(", ", ",").replace("\"", "");
            String[] objs = content.split(",");
            String word = objs[0];
            String label = objs[1];
            if (ignoreSet.contains(label)) continue;
            objMap.put("word", word);
            objMap.put("label", label);
            resultArr.add(objMap);

            Set<String> labels = labelCount.keySet();
            if (labels.contains(label)) {
                labelCount.put(label, labelCount.get(label) + 1);
            } else {
                labelCount.put(label, 1);
            }
        }
        //计算总数
        double all = 0;
        Collection<Integer> counts = labelCount.values();
        for (Integer count : counts) {
            all += count;
        }
        ArrayList<JSONObject> countArr = new ArrayList<>();
        List<Map.Entry<String, Integer>> labelCountOrder = WordFrequency.order(labelCount);
        if (labelCountOrder.size() < 5) {
            for (Map.Entry<String, Integer> labelAndCount : labelCountOrder) {
                String label = labelAndCount.getKey();
                Integer count = labelAndCount.getValue();
                double countOfLabel = new BigDecimal(count / all).setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
                JSONObject obj = new JSONObject();
                obj.put("label", label);
                obj.put("count", countOfLabel);
                countArr.add(obj);
            }
        } else {
            for (int i = 0; i < 5; i++) {
                Map.Entry<String, Integer> labelAndCount = labelCountOrder.get(i);
                String label = labelAndCount.getKey();
                Integer count = labelAndCount.getValue();
                double countOfLabel = new BigDecimal(count / all).setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
                JSONObject obj = new JSONObject();
                obj.put("label", label);
                obj.put("count", countOfLabel);
                countArr.add(obj);
            }
        }
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("data", resultArr);
        resultMap.put("value", countArr);
        resultMap.put("code", "200");
        resultMap.put("msg", "实体识别成功");
        return resultMap;
    }

    /**
     * 14.机构识别
     */
    @PostMapping("/NER_ORG")
    public Object INSTITUTION(@RequestBody Map<String, Object> param) {
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
        String body = rtu.post(url_ner_org, params);
        //处理返回string
        body = body.replace("\"[", "[").replace("]\"", "]").replace("\\", "");
        String ignoreWords = "IPO_CN,IPO_HK,IPO_USA,unicorn,GOV_Dept,invest,bank,fortune_CN_500,fortune_Global_500,universities,research_institution,hospital,org";
        String[] words = ignoreWords.split(",");
        Set<String> ignoreSet = new HashSet<>(Arrays.asList(words));
        JSONArray jsonArray = JSONArray.parseArray(body);
        Map map = new HashMap<>();
        for (Object object : jsonArray) {
            JSONArray parseArray = JSONArray.parseArray(object.toString());
            String word = parseArray.get(0).toString();
            if (map.containsKey(word)) {
                map.put(word, Integer.parseInt(map.get(word).toString()) + 1);
            } else {
                map.put(word, 1);
            }
        }
        Set set = new HashSet();
        JSONArray jsonArray2 = new JSONArray();
        for (Object object : jsonArray) {
            JSONObject jsonObject = new JSONObject();
            JSONArray parseArray = JSONArray.parseArray(object.toString());
            jsonObject.put("label", parseArray.get(1));
            jsonObject.put("word", parseArray.get(0));
            jsonObject.put("count", Integer.parseInt(map.get(parseArray.get(0)).toString()));
            if (!set.contains(parseArray.get(0))) {
                if (ignoreSet.contains(parseArray.get(1))) {
                    jsonArray2.add(jsonObject);
                }

            }
            set.add(parseArray.get(0));
        }
        jsonArray2.sort(Comparator.comparing(obj -> ((JSONObject) obj).getInteger("count")).reversed());
        JSONObject returnObject = new JSONObject();
        //转jsonArr
        returnObject.put("code", "200");
        returnObject.put("msg", "机构识别抽取成功");
        returnObject.put("results", jsonArray2);
        return returnObject;
    }

    /**
     * 15.主题抽取
     */
    @PostMapping("/topic")
    @ResponseBody
    public Object topic(@RequestBody Map<String, Object> param) {
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            text = String.valueOf(param.get("text"));
        }
        RestTemplateUtil rtu = new RestTemplateUtil();
        Map<String, Object> params = new HashMap<>();
        params.put("text", text);
        try {
            String result = rtu.post(url_topic, params);
            JSONArray array = JSONArray.parseArray(JSON.parse(result).toString());
            JSONObject returnObject = new JSONObject();
            returnObject.put("code", "200");
            returnObject.put("msg", "主题抽取成功");
            returnObject.put("results", array);
            return returnObject;
        } catch (Exception e) {
            e.printStackTrace();
            return ReturnUtil.error("500", "服务器内部异常");
        }
    }

    /**
     * 16.自动摘要
     */
    @PostMapping("/summary")
    @ResponseBody
    public Object summary(@RequestBody Map<String, Object> param) {
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            text = String.valueOf(param.get("text"));
        }
        List<String> sentenceList = new ArrayList<>();
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("text", text);
        RestTemplateUtil rtu = new RestTemplateUtil();
        String body = rtu.post(url_jiaguSummary, params);
        body = body.substring(3, body.length() - 3);
        body = body.replaceAll("\\\\n","");
        sentenceList.add(body);
        JSONObject summary = new JSONObject();
        summary.put("summary", sentenceList);
        JSONObject returnObject = new JSONObject();
        returnObject.put("code", "200");
        returnObject.put("msg", "自动摘要抽取成功");
        returnObject.put("results", summary);
        return returnObject;
    }

    /**
     * 17.相似度查找
     */
    @PostMapping("/similarity")
    public Object similarity(@RequestBody JSONObject param) {
        RestTemplateUtil rtu = new RestTemplateUtil();
        String text = "";
        if (param == null || param.get("text") == null || String.valueOf(param.get("text")).length() < 1 || param.get("compare") == null) {
            return ReturnUtil.error("501", "传参有误 或 传参内容为空");
        } else {
            if (String.valueOf(param.get("text")).length() > 1000) {
                text = String.valueOf(param.get("text")).substring(0, 1000);
            } else {
                text = String.valueOf(param.get("text"));
            }
        }
        Map resultobject = new HashMap();
        JSONObject jsonObject = new JSONObject();
        List data_list = new ArrayList();
        JSONArray jsonArray = param.getJSONArray("compare");
        for (Object object : jsonArray) {
            String datastr = object.toString();
            if (!"".equals(datastr)) {
                List<String> list = new ArrayList<String>();
                list.add(text);
                list.add(datastr);
                data_list.add(list);
            }

        }
        jsonObject.put("text", data_list);
        resultobject.put("textSimilarity", jsonObject);
        String body = rtu.post(url_similarity, resultobject);
        body = body.replace("\"[", "[").replace("]\"", "]").replace("\\", "").replace("\'", "\"");
        body = body.substring(1, body.length() - 2);
        JSONArray parseArray = JSONArray.parseArray(body);
        JSONArray resultArray = new JSONArray();
        for (Object object : parseArray) {
            JSONObject parseObject = JSONObject.parseObject(object.toString());
            parseObject.put("text", parseObject.getString("text2"));
            parseObject.remove("text1");
            parseObject.remove("text2");
            resultArray.add(parseObject);
        }
        resultArray.sort(Comparator.comparing(obj -> {
            Double value = ((JSONObject) obj).getDoubleValue("similarity");
            return value;
        }).reversed());
        JSONObject returnObject = new JSONObject();
        //转jsonArr
        returnObject.put("code", "200");
        returnObject.put("msg", "相似度查找抽取成功");
        returnObject.put("results", resultArray);
        return returnObject;
    }
}