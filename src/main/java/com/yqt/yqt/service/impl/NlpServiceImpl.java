package com.yqt.yqt.service.impl;

import com.yqt.yqt.dao.ViolationWordDao;
import com.yqt.yqt.entity.ViolationWord;
import com.yqt.yqt.service.NlpService;
import com.yqt.yqt.wordfilter.WordContext;
import com.yqt.yqt.wordfilter.WordFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NlpServiceImpl implements NlpService {

    @Autowired
    private ViolationWordDao violationWordDao;


    @Autowired
    private StringRedisTemplate redisTemplate;

    @Override
    public Map<String, Object> checkViolationWord(List<String> texts) {
        Map<String,Object> resultMap = new HashMap<>();
        String text  = "";
        if(texts==null){
            return new HashMap<>();
        }
        for (String str : texts) {
            text = str;
            break;
        }

        //List<CheckInfo> checkInfoList = checkInfoDao.selectContentByType(1);

        Set<String> block = redisTemplate.opsForSet().members("block");
        Set<String> white = redisTemplate.opsForSet().members("white");
        if (block == null || block.isEmpty()) {
            List<ViolationWord> vwList = violationWordDao.list();
            block = new HashSet<>();
            for (ViolationWord violationWord : vwList) {
                block.add(violationWord.getContent());
                redisTemplate.opsForSet().add("block", violationWord.getContent());
            }
        }
        if (white == null || white.isEmpty()) {
            white = new HashSet<>();
            /*List<ViolationWord> violationWords = violationWordDao.selectWhiteList();
            for (ViolationWord violationWord : violationWords) {
                white.add(violationWord.getContent());
                redisTemplate.opsForSet().add("white", violationWord.getContent());
            }*/
        }


        WordContext wordContext = new WordContext(block,white);
        WordFilter filter = new WordFilter(wordContext);

        List<String> emotion = filter.wordList(text, 0);


        List<Map<String, Object>> mapList = new ArrayList<>();
        int index = 0;
        int begin = 0;
        for (int i = 0; i < emotion.size(); i++) {
            Map<String, Object> emotionMap = new HashMap<>();

            String s = emotion.get(i);
            index = text.indexOf(s);

            begin = begin+index+1;
            //emotionMap.put("scope", (begin+1)+"~"+(begin+s.length()-1));

            emotionMap.put("word", s+"("+(begin)+"~"+(begin+s.length()-1)+")");
            emotionMap.put("sort", begin);
            if (text.contains(s)) {
                text = text.substring(index+1);
            }

            String label = violationWordDao.selectLabelByContent(s);
            emotionMap.put("label", label);
            mapList.add(emotionMap);
        }

        Collections.sort(mapList, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                return Integer.parseInt(o1.get("sort").toString())-Integer.parseInt(o2.get("sort").toString());
            }
        });

        List<Map<String,Object>> list = new ArrayList<>();
        String lastWord = "";
        if (mapList.size() > 1) {
            Map<String, Object> map = mapList.get(0);
            String label = map.get("label").toString();
            String word = map.get("word").toString();

            for (int i = 1; i < mapList.size(); i++) {
                Map<String, Object> objectMap = mapList.get(i);
                System.out.println("-----------");
                System.out.println(objectMap);
                System.out.println("--------------");
                String newLabel = objectMap.get("label").toString();
                String newWord = objectMap.get("word").toString();
                if (label.equals(newLabel)) {
                    word=word+","+newWord;
                } else {
                    Map<String, Object> newMap = new HashMap<>();
                    newMap.put("label", label);
                    newMap.put("word", word);
                    list.add(newMap);
                    label = newLabel;
                    word = newWord;
                }
                lastWord = word;
            }
            if (!"".equals(lastWord)) {
                Map<String, Object> map1 = new HashMap<>();

                if (list.size() - 1 > 0) {
                    map1.put("label", mapList.get(mapList.size() - 1).get("label"));
                }else {
                    map1.put("label", label);
                }

                map1.put("word", lastWord);
                list.add(map1);
            }
        }
        if (mapList.size() == 1) {
            Map<String, Object> sMap = new HashMap<>();
            sMap.put("label", mapList.get(0).get("label").toString());
            sMap.put("word",mapList.get(0).get("word"));
            list.add(sMap);
        }

        if (1 == 1) {
            resultMap.put("result",list);
            resultMap.put("code",200);
            resultMap.put("msg","违规参数返回");
            return resultMap;
        }
        return resultMap;
    }

}
