package com.yqt.yqt.service;

import java.util.List;
import java.util.Map;

public interface NlpService {

    //violation_word
    Map<String,Object> checkViolationWord(List<String> texts);

}
