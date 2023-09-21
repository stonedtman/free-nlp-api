package com.yqt.yqt.nlpUtil;

import org.thunlp.text.classifiers.BasicTextClassifier;
import org.thunlp.text.classifiers.ClassifyResult;
import org.thunlp.text.classifiers.LinearBigramChineseTextClassifier;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class nlpUtil {


    /**
     * 如果需要对一批文本进行训练，再进行测试，可以按照本函数的代码调用分类器
     *
     */
    public static void runTrainAndTest() {

        // 新建分类器对象
        BasicTextClassifier classifier = new BasicTextClassifier();

        // 设置参数
        String defaultArguments = ""
                + "-train C:\\Users\\hk\\Desktop\\tianmai\\nlp "  // 设置您的训练路径，这里的路径只是给出样例
                + "-test C:\\Users\\hk\\Desktop\\tianmai\\test "
                //	+ "-l C:\\Users\\do\\workspace\\TestJar\\my_novel_model "
                //	+ "-cdir E:\\Corpus\\书库_cleared "
                //	+ "-n 1 "
                // + "-classify E:\\Corpus\\书库_cleared\\言情小说 "  // 设置您的测试路径。一般可以设置为与训练路径相同，即把所有文档放在一起。
                + "-d1 1 "  // 前70%用于训练
                + "-d2 0 "  // 后30%用于测试
                + "-f 100000 " // 设置保留特征数，可以自行调节以优化性能
                +  "-s ./my_novel_model"  // 将训练好的模型保存在硬盘上，便于以后测试或部署时直接读取模型，无需训练
                ;

        // 初始化
        classifier.Init(defaultArguments.split(" "));

        // 运行
        classifier.runAsBigramChineseTextClassifier();

    }


    /**
     * 如果需要读取已经训练好的模型，再用其进行分类，可以按照本函数的代码调用分类器
     *
     */
    public static ArrayList<Map<String,Object>> runLoadModelAndUse(String importContent , String path) {
        ArrayList<Map<String,Object>> resultArr = new ArrayList<>();

        String nlpPath = path;
        // 新建分类器对象
        BasicTextClassifier classifier = new BasicTextClassifier();

        // 设置分类种类，并读取模型
        classifier.loadCategoryListFromFile(nlpPath+"my_novel_model/category");//E:\JAVA\YYS\project\yqt-spider-update
        classifier.setTextClassifier(new LinearBigramChineseTextClassifier(classifier.getCategorySize()));
        classifier.getTextClassifier().loadModel(nlpPath+"my_novel_model");

		/*
		 * 上面三行代码等价于设置如下参数，然后初始化并运行：
		 *
		   String defaultArguments = ""
		 +  "-l  my_novel_model"  // 设置您的训练好的模型的路径，这里的路径只是给出样例
		 ;
		 classifier.Init(defaultArguments.split(" "));
		 classifier.runAsLinearBigramChineseTextClassifier();
		 *
		 */

        // 之后就可以使用分类器进行分类
        String text = importContent;
        int topN =2;  // 保留最有可能的3个结果
        ClassifyResult[] result = classifier.classifyText(text, topN);
        if(topN>result.length){
            topN=result.length;
        }
        for (int i = 0; i < topN; ++i) {
            Map<String,Object> resultMap = new HashMap<>();
            //resultMap.put("id",result[i].label);
            resultMap.put("label",classifier.getCategoryName(result[i].label));
            resultMap.put("score",result[i].prob);
            resultArr.add(resultMap);

            // 输出分类编号，分类名称，以及概率值。
            // System.out.println(result[i].label + "\t" + classifier.getCategoryName(result[i].label) + "\t" + result[i].prob);
        }

        return resultArr;

    }

    /**
     * 如果需要按照特殊需求自行添加训练文件，可以按照本函数的代码调用分类器
     *
     */
    public static void AddFilesManuallyAndTrain() {

        // 新建分类器对象
        BasicTextClassifier classifier = new BasicTextClassifier();

        // 设置分类种类
        classifier.loadCategoryListFromFile("在此输入您的类型列表文件的路径，例如  /media/disk2/data/novel/category.lst");
        classifier.setTextClassifier(new LinearBigramChineseTextClassifier(classifier.getCategorySize()));

		/*
		 * 上面两行代码等价于设置如下参数，然后初始化：
		 *
		   String defaultArguments = ""
		 + "-c /media/disk2/data/novel/category_list "  // 设置您的类型列表文件的路径
		 ;
		 classifier.Init(defaultArguments.split(" "));
		 *
		 */

        // 手动添加文件的方法。每个训练文件按照下面的接口调用一次。
        String filepath = "在此输入您的一个训练文件路径";
        String category = "在此输入训练文件对应的类型名称";
        if (!classifier.addTrainingText(category, filepath)) {
            System.out.println("添加训练文件失败。文件路径为：" + filepath);
            return;
        }

        // 训练并保存模型
        classifier.getTextClassifier().train();
        classifier.getTextClassifier().saveModel("在此输入您保存的模型的路径，例如  /media/disk2/data/novel/my_novel_model");

    }

    public static void main (String args[]) {
//    		runTrainAndTest();
        System.out.println(runLoadModelAndUse("一个漏测Bug能让你想到多少？","E:\\JAVA\\YYS\\project\\yqt-spider-update\\"));
    //		 AddFilesManuallyAndTrain();
    }




    /**
     * 通用模型
     *
     */
    public static ArrayList<Map<String,Object>> runLoadModelAndUse_commonCate(String importContent , String path) {
        ArrayList<Map<String,Object>> resultArr = new ArrayList<>();
        String nlpPath = path;
        // 新建分类器对象
        BasicTextClassifier classifier = new BasicTextClassifier();
        // 设置分类种类，并读取模型
        classifier.loadCategoryListFromFile(nlpPath+ "cate_model/category");
        classifier.setTextClassifier(new LinearBigramChineseTextClassifier(classifier.getCategorySize()));
        classifier.getTextClassifier().loadModel(nlpPath+ "cate_model");

		/*
		 * 上面三行代码等价于设置如下参数，然后初始化并运行：
		 *
		   String defaultArguments = ""
		 +  "-l  my_novel_model"  // 设置您的训练好的模型的路径，这里的路径只是给出样例
		 ;
		 classifier.Init(defaultArguments.split(" "));
		 classifier.runAsLinearBigramChineseTextClassifier();
		 *
		 */

        // 之后就可以使用分类器进行分类
        String text = importContent;
        int topN =2;  // 保留最有可能的3个结果
        ClassifyResult[] result = classifier.classifyText(text, topN);
        if(topN>result.length){
            topN=result.length;
        }
        for (int i = 0; i < topN; ++i) {
            Map<String,Object> resultMap = new HashMap<>();
            //resultMap.put("id",result[i].label);
            resultMap.put("label",classifier.getCategoryName(result[i].label));
            resultMap.put("score",result[i].prob);
            resultArr.add(resultMap);

            // 输出分类编号，分类名称，以及概率值。
            //System.out.println(result[i].label + "\t" + classifier.getCategoryName(result[i].label) + "\t" + result[i].prob);
        }

        return resultArr;

    }

}
