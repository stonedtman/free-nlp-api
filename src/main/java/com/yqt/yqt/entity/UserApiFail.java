package com.yqt.yqt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserApiFail {
    private int id;
    private int userId;
    private int apiId;
    private int failedCount;
}
