package com.yqt.yqt.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ws.schild.jave.MultimediaInfo;
import ws.schild.jave.MultimediaObject;

import java.io.*;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

public class VideoUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(VideoUtil.class);


    public static void main(String[] args) {


        //getVideoImg("D:\\develop\\temp\\1.mp4", "D:\\develop\\temp\\img", 15);
        File file = new File("D:\\develop\\mp3\\c43506f4-d88f-405b-a224-05b56058b1b5.wav");
        System.out.println(file.getParent());
        //File file1 = new File("D:\\develop\\mp3\\test\\");

        //System.out.println(bytes.length);


        //int count = VideoUtil.videoSplit("D:\\develop\\mp3\\夜曲.mp3", "D:\\develop\\mp3\\block", 45, false);
        /*StringBuilder sb = new StringBuilder();

        File blockFile = new File("D:\\develop\\mp3\\block\\");
        File[] files = blockFile.listFiles();
        if (files == null || files.length < 1) {
            return;
        }
        for (int i = 0; i < count; i++) {
            File f = new File("D:\\develop\\temp\\tmp\\block\\"+i+".mp4");
            String text = "";
            Base64Util base64Util = new Base64Util();
            try {
                text = base64Util.fileToBase642(f);
            } catch (IOException e) {
                e.printStackTrace();
                return;
            }
            RestTemplateUtil rtu = new RestTemplateUtil();
            Map<String, Object> params = new HashMap<>();
            params.put("text", text);
            //调用第三方接口
            String body = rtu.post("http://s1.stonedt.com:5346", params);
            //处理返回string
            String voice2text = JSON.parse(body).toString();
            voice2text = voice2text.substring(1,voice2text.length()-1);
            sb.append(voice2text);
        }
        System.out.println("--------------------------------");
        System.out.println("文字内容：=======》");
        System.out.println(sb.toString());*/
    }

    public static File voiceBelong(File file) {
        // 原文件名称
        String filename = file.getName();
        // 创建临时文件
        File dirFile = new File(file.getParent()+File.separator+"tem"+File.separator);
        if (!dirFile.exists()) {
            dirFile.mkdirs();
        }
        String outputFilePath = dirFile.getAbsolutePath() + File.separator + UUID.randomUUID().toString()+".wav";

        File outputFile = new File(outputFilePath);
        if (outputFile.exists()) {
            outputFile.delete();
        }



        /*// 文件输入流
        FileInputStream inputStream = new FileInputStream(tempFile);
        byte[] buffer = new byte[(int)tempFile.length()];
        inputStream.read(buffer);
        inputStream.close();*/

        //file.transferTo(tempFile);

        String command;
        Runtime runtime = Runtime.getRuntime();
        try {
            command ="ffmpeg" + " -i " + file.getAbsolutePath() + " -ac 1 -ar 16000 "+ outputFilePath;
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
            VideoUtil.processCleanStream(process.getInputStream(), outputFilePath);
            VideoUtil.processCleanStream(process.getErrorStream(), outputFilePath);

            process.destroy();
        } catch (Exception e) {
            LOGGER.error("video divide error!",  e);

        }
        return new File(outputFilePath);

    }



    /**
     * 将视频分割为小段，分割精度精确到秒，该方法切割出的小段视频时长会有一定的精度误差，但切割效率较高
     *
     * @param fileName    视频文件名(带路径)
     * @param outputPath  输出文件路径，会在该路径下输出切割后的视频，
     *                    输出文件名=源视频文件名+下划线+视频开始秒数+源视频格式后缀
     * @param periodTime  分割的小段视频时长 单位：秒
     * @param merge       true=将整个视频结尾部分不足一次分割时间的部分，合并到最后一次分割的视频中，
     *                    false=将整个视频结尾部分不足一次分割时间的部分单独切割成一段视频
     */
    public static int videoSplit(String fileName, String outputPath, int periodTime, boolean merge) {
        long beginTime = System.currentTimeMillis();
        File outputDir = new File(outputPath);
        if (!outputDir.exists()) {
            outputDir.mkdirs();
        }

        // 更新视频输出目录
        outputPath = outputDir.getPath() + File.separator;
        // 获取视频总时长，单位：秒
        int videoTime = getDurationSecond(fileName);
        if (videoTime < 45) {
            return 0;
        }
        //int videoTime = getDurationSecond(file);
        // 计算视频分割的个数
        int count;
        // 不足一次剪辑的剩余时间，单位：秒
        int remain = 0;
        if (merge) {
            count = videoTime / periodTime;
            remain = videoTime % periodTime;
        } else {
            count = videoTime / periodTime + 1;
        }

        if (count == 1) {
            return 0;
        }

        //String suffix = "D:\\software\\ffmpeg-N\\ffmpeg-N-110065-g30cea1d39b-win64-gpl\\bin\\";
        final String FFMPEG = "ffmpeg";
        String startTime; // 每段视频的开始时间，格式：HH:mm:ss
        String periodVideoName; // 每段视频的名字，名字规则：视频i_时间段xx_yy
        int duration; // 每次分割的时长
        String command;// 执行的命令
        // 得到视频后缀 如.mp4
        String videoSuffix = fileName.substring(fileName.lastIndexOf("."));
        String videoName = fileName.substring(fileName.lastIndexOf(File.separator) + 1, fileName.lastIndexOf("."));
        Runtime runtime = Runtime.getRuntime(); // 执行命令者

        // 将视频分割为count段
        for (int i = 0; i < count; i++) {
            // 决定是否将整个视频结尾部分不足一次的时间，合并到最后一次分割的视频中
            if (merge) {
                if (i == count - 1) {
                    // 将整个视频不足一次剪辑时长的最后一段视频，拼接在最后一次剪裁中
                    duration = periodTime + remain;
                    startTime = secondToTime(periodTime * i);
                } else {
                    duration = periodTime;
                    startTime = secondToTime(periodTime * i);
                }
            } else {
                duration = periodTime;
                startTime = secondToTime(periodTime * i);
            }
            periodVideoName = i+videoSuffix;

            try {
                /**
                 * 执行分割命令，命令参数详解：
                 * -i 指定输入文件
                 * -ss 指定从什么时间开始
                 * -c copy 拷贝源视频流，不对源视频进行重新编码，可以加快视频分割速度
                 * -t 指定需要截取多长时间，单位：秒
                 */
                command =FFMPEG + " -i " + fileName + " -ss " + startTime + " -c copy -t " + duration + " " + outputPath + periodVideoName;
                LOGGER.info("run video split start run command={}", command);
                final Process process = runtime.exec(command);
                // 等待命令子线程执行完成
                LOGGER.info("执行完毕,当前子视频序列号id为：{}", i);
                process.waitFor();
                LOGGER.info("--------------------------------");
                /**
                 * process.waitFor() 方法会阻塞等待命令执行完毕，但java程序给进程的输出流分配的缓冲区是很小的，
                 * 有时候当进程输出信息很大的时候回导致缓冲区被填满，如果程序没有对进程的输出流处理的会就会导致执行exec()的线程永远阻塞，
                 * 进程也不会执行下去直到输出流被处理或者java程序结束。解决的方法就是处理缓冲区中的信息，开两个线程分别去处理标准输出流和错误输出流。
                 */
                processCleanStream(process.getInputStream(), fileName);
                processCleanStream(process.getErrorStream(), fileName);

                process.destroy();
            } catch (Exception e) {
                LOGGER.error("video divide error!fileName={},videoTime={},periodTime={}", fileName, videoTime, periodTime, e);
            }
        }

        long timeConsuming = System.currentTimeMillis() - beginTime;
        LOGGER.info("video divide success,fileName={},videoTime={},periodTime={},time consuming={}",
                fileName, videoTime, periodTime, timeConsuming);
        return count;
    }

    /**
     *
     */
    public static int getVideoImg(String fileName, String outputPath, int time) {
        long beginTime = System.currentTimeMillis();
        File outputDir = new File(outputPath);
        if (!outputDir.exists()) {
            outputDir.mkdirs();
        }

        // 更新视频输出目录
        outputPath = outputDir.getPath() + File.separator;
        // 获取视频总时长，单位：秒
        int videoTime = getDurationSecond(fileName);

        //String suffix = "D:\\software\\ffmpeg-N\\ffmpeg-N-110065-g30cea1d39b-win64-gpl\\bin\\";
        final String FFMPEG = "ffmpeg";
        String startTime; // 每段视频的开始时间，格式：HH:mm:ss
        String periodVideoName; // 每段视频的名字，名字规则：视频i_时间段xx_yy
        int duration; // 每次分割的时长
        String command;// 执行的命令
        // 得到视频后缀 如.mp4
        String videoSuffix = fileName.substring(fileName.lastIndexOf("."));
        String videoName = fileName.substring(fileName.lastIndexOf(File.separator) + 1, fileName.lastIndexOf("."));
        Runtime runtime = Runtime.getRuntime(); // 执行命令者

        command =FFMPEG + " -i " + fileName + " -f image2 -vf fps=fps=1/"+time+" -qscale:v 2 "+outputPath+"image_%d.jpg";

        Process process = null;

        try {
            /**
             * 执行分割命令，命令参数详解：
             * -i 指定输入文件
             * -ss 指定从什么时间开始
             * -c copy 拷贝源视频流，不对源视频进行重新编码，可以加快视频分割速度
             * -t 指定需要截取多长时间，单位：秒
             */
            LOGGER.info("run video split start run command={}", command);
            process = runtime.exec(command);
            // 等待命令子线程执行完成
            process.waitFor(5, TimeUnit.SECONDS);
            LOGGER.info("执行完毕");
            LOGGER.info("--------------------------------");
            /**
             * process.waitFor() 方法会阻塞等待命令执行完毕，但java程序给进程的输出流分配的缓冲区是很小的，
             * 有时候当进程输出信息很大的时候回导致缓冲区被填满，如果程序没有对进程的输出流处理的会就会导致执行exec()的线程永远阻塞，
             * 进程也不会执行下去直到输出流被处理或者java程序结束。解决的方法就是处理缓冲区中的信息，开两个线程分别去处理标准输出流和错误输出流。
             */

        } catch (Exception e) {
            LOGGER.error("video divide error");
        }

        processCleanStream(process.getInputStream(), fileName);
        processCleanStream(process.getErrorStream(), fileName);

        process.destroy();

        long timeConsuming = System.currentTimeMillis() - beginTime;
        System.out.println("执行时间为："+timeConsuming);

        return 0;
    }

    public static int getVideoImg2(String fileName, String outputPath, int time) {
        long beginTime = System.currentTimeMillis();
        File outputDir = new File(outputPath);
        if (!outputDir.exists()) {
            outputDir.mkdirs();
        }

        // 更新视频输出目录
        outputPath = outputDir.getPath() + File.separator;
        // 获取视频总时长，单位：秒
        int videoTime = getDurationSecond(fileName);

        //String suffix = "D:\\software\\ffmpeg-N\\ffmpeg-N-110065-g30cea1d39b-win64-gpl\\bin\\";
        final String FFMPEG = "ffmpeg";
        String startTime; // 每段视频的开始时间，格式：HH:mm:ss
        String periodVideoName; // 每段视频的名字，名字规则：视频i_时间段xx_yy
        int duration; // 每次分割的时长
        String command;// 执行的命令
        // 得到视频后缀 如.mp4
        String videoSuffix = fileName.substring(fileName.lastIndexOf("."));
        String videoName = fileName.substring(fileName.lastIndexOf(File.separator) + 1, fileName.lastIndexOf("."));

        ProcessBuilder pb = new ProcessBuilder();
        command =FFMPEG + " -i " + fileName + " -vf 'select=(gte(t\\,1))*(isnan(prev_selected_t)+gte(t-prev_selected_t\\,"+time+"))' -vsync 0 "+outputPath+"image_%04d.jpg";
        System.out.println(command);


        try {
            pb.command("cmd.exe", "/c", command).inheritIO();
            pb.start().waitFor();//等待语句执行完成，否则可能会读不到结果。
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        long timeConsuming = System.currentTimeMillis() - beginTime;
        System.out.println("执行时间为："+timeConsuming);

        return 0;
    }

    /**
     * 获取视频时长
     * @param filePath
     * @return 返回格式：HH:mm:ss，不足两位数前面补零，例如：01:30:07
     */
    public static String getDuration(String filePath) {
        String length = "";
        try {
            File videoFile = new File(filePath);
            MultimediaObject instance = new MultimediaObject(videoFile);
            MultimediaInfo result = instance.getInfo();
            // 获取视频时长，单位：秒
            long ls = result.getDuration() / 1000;
            Integer hour = (int) (ls / 3600);
            Integer minute = (int) (ls % 3600) / 60;
            Integer second = (int) (ls - hour * 3600 - minute * 60);
            String hr = hour.toString();
            String mi = minute.toString();
            String se = second.toString();
            if (hr.length() < 2) {
                hr = "0" + hr;
            }
            if (mi.length() < 2) {
                mi = "0" + mi;
            }
            if (se.length() < 2) {
                se = "0" + se;
            }
            length = hr + ":" + mi + ":" + se;
        } catch (Exception e) {
            LOGGER.error("getDuration error!", e);
        }
        return length;
    }

    /**
     * 获取视频时长总秒数
     * @param filePath
     * @return
     */
    public static int getDurationSecond(String filePath) {
        Integer length;
        try {
            File videoFile = new File(filePath);
            MultimediaObject instance = new MultimediaObject(videoFile);
            MultimediaInfo result = instance.getInfo();
            // 获取视频时长，单位：秒
            int second = (int) (result.getDuration() / 1000);

            return second;
        } catch (Exception e) {
            LOGGER.error("getDurationSecond error!", e);

            return -1;
        }
    }


    /**
     * 整数秒转为时分秒字符串,格式：HH:mm:ss
     * 如果输入的秒数大于356578（99:59:59），统一输出 99:59:59
     * @param time
     * @return
     */
    private static String secondToTime(int time) {
        String timeStr = null;
        int hour = 0;
        int minute = 0;
        int second = 0;
        if (time <= 0) {
            return "00:00:00";
        } else {
            minute = time / 60;
            hour = minute / 60;
            if (hour > 99) {
                return "99:59:59";
            }
            minute = minute % 60;
            second = time - hour * 3600 - minute * 60;
            timeStr = unitFormat(hour) + ":" + unitFormat(minute) + ":" + unitFormat(second);
        }

        return timeStr;
    }

    private static String unitFormat(int i) {
        String retStr = null;
        if (i >= 0 && i < 10) {
            retStr = "0" + Integer.toString(i);
        } else {
            retStr = "" + i;
        }

        return retStr;
    }

    /**
     * 合并视频文件，该方法会将videoPath目录下的所有视频合并成一个
     * @param videoPath 待合并的小段视频文件目录，该文件里面的视频格式必须一致，并且视频文件名是有序的
     * @param outputFile 合并后的总视频文件地址
     */
    public static void videoMerge(String videoPath, String outputFile) {
        long beginTime = System.currentTimeMillis();
        File videoDir = new File(videoPath);
        if (!videoDir.exists()) {
            videoDir.mkdirs();
        }

        // 用于存放待合并小视频文件名的临时文件，ffmpeg合并视频需要用到该文件
        String txtPath = videoPath + "fileList.txt";
        StringBuilder fileNameStr = new StringBuilder();
        File[] videos = videoDir.listFiles();
        for (File video : videos) {
            fileNameStr.append("file '").append(video.getPath()).append("'\r\n");
        }

        try {
            FileOutputStream fos = new FileOutputStream(new File(txtPath));
            fos.write(fileNameStr.toString().getBytes());
            fos.close();

            /**
             * 视频合并命令参数详解：
             * -f concat 视频拼接
             * -i 待合并视频的文件路径存放文件，该文件里面的视频路径必须是有序的
             * -c copy 拷贝源视频流，不对源视频进行重新编码，可以加快视频分割速度
             */
            String command = "ffmpeg -f concat -safe 0 -i " + txtPath + " -c copy " + outputFile;
            LOGGER.info("video merge start run command={}", command);
            final Process process = Runtime.getRuntime().exec(command);
            // 等待命令子线程执行完成
            process.waitFor();
            /**
             * process.waitFor() 方法会阻塞等待命令执行完毕，但java程序给进程的输出流分配的缓冲区是很小的，
             * 有时候当进程输出信息很大的时候回导致缓冲区被填满，如果程序没有对进程的输出流处理的会就会导致执行exec()的线程永远阻塞，
             * 进程也不会执行下去直到输出流被处理或者java程序结束。解决的方法就是处理缓冲区中的信息，开两个线程分别去处理标准输出流和错误输出流。
             */
            processCleanStream(process.getInputStream(), outputFile);
            processCleanStream(process.getErrorStream(), outputFile);

            process.destroy();

            // 删除产生的临时用来存放每个视频文件路径的txt文件
            File txtFile = new File(txtPath);
            txtFile.delete();
            long timeConsuming = System.currentTimeMillis() - beginTime;
            LOGGER.info("video merge success!outputFile={},time consuming={}", outputFile, timeConsuming);
        } catch (IOException e) {
            LOGGER.error("video merge IOException!", e);
        } catch (Exception e) {
            LOGGER.error("video merge Exception!", e);
        }

    }

    public static void processCleanStream(final InputStream input, final String videoFile) {
        new Thread(() -> {
            Reader reader = new InputStreamReader(input);
            BufferedReader br = new BufferedReader(reader);
            String line = null;
            StringBuilder message = new StringBuilder();
            try {
                while((line = br.readLine()) != null) {
                    message.append(line);
                }

                LOGGER.info("print video process message,videoFile={},message={}", videoFile, message.toString());
            } catch (Exception e) {
                LOGGER.error("video process error!message,videoFile={},message={}", videoFile, message.toString());
            } finally {
                try {
                    if (null != br) {
                        br.close();
                    }
                    if (null != reader) {
                        reader.close();
                    }
                } catch (IOException e) {
                    LOGGER.error("processCleanStream close stream error!videoFile={}", videoFile);
                }
            }
        }).start();
    }

}
