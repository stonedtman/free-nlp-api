package com.yqt.yqt.util;

import org.apache.commons.lang.StringUtils;
import org.wltea.analyzer.core.IKSegmenter;
import org.wltea.analyzer.core.Lexeme;

import java.io.IOException;
import java.io.StringReader;
import java.util.*;

/**
 * 分词后，根据常用词进行统计
 *
 * @author Deniro Li (lisq037@163.com)
 */
public class WordFrequency {


    /**
     * 词频统计
     *
     * @param frequencies 词频；key：词语；value:出现次数
     * @param content     内容
     * @return
     * @throws IOException
     */
    public static Map<String, Integer> count(Map<String, Integer> frequencies, String
            content) throws IOException {
        if (frequencies == null) {
            frequencies = new HashMap<>();
        }
        if (StringUtils.isBlank(content)) {
            return frequencies;
        }

        IKSegmenter ikSegmenter = new IKSegmenter(new StringReader(content), true);

        Lexeme lexeme;
        while ((lexeme = ikSegmenter.next()) != null) {
            final String text = lexeme.getLexemeText();
     
            if (text.length() > 1) {
                //递增
                if (frequencies.containsKey(text)) {
                    frequencies.put(text, frequencies.get(text) + 1);
                } else {//首次出现
                    frequencies.put(text, 1);
                }
            }
        }

        return frequencies;


    }

    /**
     * 按出现次数，从高到低排序
     *
     * @param data
     * @return
     */
    public static List<Map.Entry<String, Integer>> order(Map<String, Integer> data) {
        List<Map.Entry<String, Integer>> result = new ArrayList<>(data.entrySet());
        Collections.sort(result, new Comparator<Map.Entry<String, Integer>>() {
            @Override
            public int compare(Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2) {
                return o2.getValue() - o1.getValue();
            }
        });
        return result;
    }

//    public static void main(String[] args) throws IOException {
//        String content = "三星 Galaxy Note4 N9100 4G手机（幻影白）双卡双待 公开版+施华洛世奇水晶后壳（瑰金落日）套装";
//        List<Map.Entry<String, Integer>> result = WordFrequency.order
//                (WordFrequency.count(new HashMap<String, Integer>(), content));
//        System.out.println(result);
//    }
}
