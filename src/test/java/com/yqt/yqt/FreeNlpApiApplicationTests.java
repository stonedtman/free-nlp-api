package com.yqt.yqt;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;

@SpringBootTest
class FreeNlpApiApplicationTests {

    @Test
    void contextLoads() {
        String projectPath = System.getProperty("user.dir") + File.separator + "cate_model";
        System.out.println("Project absolute path: " + projectPath);
    }

}
