package com.yqt.yqt.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class Base64Util {

    private static final Logger LOGGER = LoggerFactory.getLogger(Base64Util.class);

    public String fileToBase642(File file) throws IOException {
        // 原文件名称
        String filename = file.getName();
        // 创建临时文件
        File tempFile = File.createTempFile("tem", null);

        try(
                BufferedInputStream inputStream = new BufferedInputStream(new FileInputStream(file));
                BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream(tempFile));
        ) {
            byte[] b = new byte[1024];
            int len = 0;
            while ((len = inputStream.read(b)) != -1) {
                outputStream.write(b, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        //file.transferTo(tempFile);
        tempFile.deleteOnExit();

        // 文件输入流
        FileInputStream inputStream = new FileInputStream(tempFile);

        byte[] buffer = new byte[(int)tempFile.length()];
        inputStream.read(buffer);
        inputStream.close();

        // 转换为base64编码格式
        //String base64 = new sun.misc.BASE64Encoder().encode(buffer);
        String base64 = new String(Base64.getEncoder().encode(buffer));//.encodeBase64(buffer)

        // 上面方法中获得的base64编码中，包含有换行符，统一全部替换掉
        base64 = base64.replaceAll("[\\s*\t\n\r]", "");
        return base64;
    }

    public String fileToBase642BelongVoice(File file) throws IOException {

        File outputFile = VideoUtil.voiceBelong(file);

        // 文件输入流
        FileInputStream inputStream = new FileInputStream(outputFile);

        byte[] buffer = new byte[(int)outputFile.length()];
        inputStream.read(buffer);
        inputStream.close();

        // 转换为base64编码格式
        //String base64 = new sun.misc.BASE64Encoder().encode(buffer);
        String base64 = new String(Base64.getEncoder().encode(buffer));//.encodeBase64(buffer)

        // 上面方法中获得的base64编码中，包含有换行符，统一全部替换掉
        //base64 = base64.replaceAll("[\\s*\t\n\r]", "");

        return base64;
    }

    public String fileToBase64BelongVoice(MultipartFile file) throws IOException {
        // 原文件名称
        String filename = file.getOriginalFilename();
        // 创建临时文件
        File tempFile = File.createTempFile("tem", null);
        file.transferTo(tempFile);
        tempFile.deleteOnExit();

        // 创建转换后临时文件
        File conversionFile = File.createTempFile("conversionTemp", null);

        String command;
        Runtime runtime = Runtime.getRuntime();
        try {
            command ="FFMPEG" + " -i " + tempFile + "-ac 1 -ar 16000 "+ conversionFile;
            LOGGER.info("run video split start run command={}", command);
            final Process process = runtime.exec(command);
            // 等待命令子线程执行完成
            LOGGER.info("执行完毕");
            process.waitFor();
            LOGGER.info("--------------------------------");
            /**
             * process.waitFor() 方法会阻塞等待命令执行完毕，但java程序给进程的输出流分配的缓冲区是很小的，
             * 有时候当进程输出信息很大的时候回导致缓冲区被填满，如果程序没有对进程的输出流处理的会就会导致执行exec()的线程永远阻塞，
             * 进程也不会执行下去直到输出流被处理或者java程序结束。解决的方法就是处理缓冲区中的信息，开两个线程分别去处理标准输出流和错误输出流。
             */
            VideoUtil.processCleanStream(process.getInputStream(), conversionFile.getAbsolutePath());
            VideoUtil.processCleanStream(process.getErrorStream(), conversionFile.getAbsolutePath());

            process.destroy();
        } catch (Exception e) {
            LOGGER.error("video divide error!,periodTime={}",  e);

        }

        tempFile.deleteOnExit();

        // 文件输入流
        FileInputStream inputStream = new FileInputStream(tempFile);

        byte[] buffer = new byte[(int)conversionFile.length()];
        inputStream.read(buffer);
        inputStream.close();

        // 转换为base64编码格式
        //String base64 = new sun.misc.BASE64Encoder().encode(buffer);
        String base64 = new String(Base64.getEncoder().encode(buffer));//.encodeBase64(buffer)

        // 上面方法中获得的base64编码中，包含有换行符，统一全部替换掉
        base64 = base64.replaceAll("[\\s*\t\n\r]", "");
        return base64;
    }
    public String fileToBase64BelongVoice(File tempFile) throws IOException {
        // 创建转换后临时文件
        File conversionFile = File.createTempFile("conversionTemp", ".wav");

        String command;
        Runtime runtime = Runtime.getRuntime();
        try {
            command ="FFMPEG" + " -i " + tempFile + "-ac 1 -ar 16000 "+ conversionFile;
            LOGGER.info("run video split start run command={}", command);
            final Process process = runtime.exec(command);
            // 等待命令子线程执行完成
            LOGGER.info("执行完毕");
            process.waitFor();
            LOGGER.info("--------------------------------");
            /**
             * process.waitFor() 方法会阻塞等待命令执行完毕，但java程序给进程的输出流分配的缓冲区是很小的，
             * 有时候当进程输出信息很大的时候回导致缓冲区被填满，如果程序没有对进程的输出流处理的会就会导致执行exec()的线程永远阻塞，
             * 进程也不会执行下去直到输出流被处理或者java程序结束。解决的方法就是处理缓冲区中的信息，开两个线程分别去处理标准输出流和错误输出流。
             */
            VideoUtil.processCleanStream(process.getInputStream(), conversionFile.getAbsolutePath());
            VideoUtil.processCleanStream(process.getErrorStream(), conversionFile.getAbsolutePath());

            process.destroy();
        } catch (Exception e) {
            LOGGER.error("video divide error!,periodTime={}",  e);

        }

        tempFile.deleteOnExit();

        // 文件输入流
        FileInputStream inputStream = new FileInputStream(tempFile);

        byte[] buffer = new byte[(int)conversionFile.length()];
        inputStream.read(buffer);
        inputStream.close();

        // 转换为base64编码格式
        //String base64 = new sun.misc.BASE64Encoder().encode(buffer);
        String base64 = new String(Base64.getEncoder().encode(buffer));//.encodeBase64(buffer)

        // 上面方法中获得的base64编码中，包含有换行符，统一全部替换掉
        base64 = base64.replaceAll("[\\s*\t\n\r]", "");
        return base64;
    }

    public String fileToBase64(MultipartFile file) throws IOException {
        // 原文件名称
        String filename = file.getOriginalFilename();
        // 创建临时文件
        File tempFile = File.createTempFile("tem", null);
        file.transferTo(tempFile);
        tempFile.deleteOnExit();

        // 文件输入流
        FileInputStream inputStream = new FileInputStream(tempFile);

        byte[] buffer = new byte[(int)tempFile.length()];
        inputStream.read(buffer);
        inputStream.close();

        // 转换为base64编码格式
        //String base64 = new sun.misc.BASE64Encoder().encode(buffer);
        String base64 = new String(Base64.getEncoder().encode(buffer));//.encodeBase64(buffer)

        // 上面方法中获得的base64编码中，包含有换行符，统一全部替换掉
        base64 = base64.replaceAll("[\\s*\t\n\r]", "");
        return base64;
    }

    //编码
    public static String encode(String text) {
        Base64.Encoder encoder = Base64.getEncoder();
        return encoder.encodeToString(text.getBytes(StandardCharsets.UTF_8));

    }

    //解码
    public static String decode(String encodedText){
        Base64.Decoder decoder = Base64.getDecoder();
        return new String(decoder.decode(encodedText), StandardCharsets.UTF_8);

    }


}
