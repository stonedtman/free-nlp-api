package com.yqt.yqt.entity;

import lombok.Data;

import java.util.List;

@Data
public class ContentText {

    private List<String> text;
    private int batch_size;

    public ContentText(List<String> text, int batch_size) {
        this.text = text;
        this.batch_size = batch_size;
    }


    @Override
    public String toString() {
        return "ContentText{" +
                "text=" + text +
                ", batch_size=" + batch_size +
                '}';
    }
}
