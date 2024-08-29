$("#document_pre").attr(
  "src",
  staticPath + "/file/document_extract/documentExtractionDoc1.pdf"
);
$(".request_address").attr("href", requestAddress + "/doc2text");
$(".request_address").html(requestAddress + "/doc2text");
var exampleList = [
  "/file/document_extract/documentExtractionDoc1.pdf",
  "/file/document_extract/documentExtractionDoc2.pdf",
];
var textList = [
  `第 24 卷 第 4 期 中  国  电  机  工  程  学  报 Vol.24 No.4 Apr.2004 
2004 年 4 月 Proceedings of the CSEE ©2004 Chin.Soc.for Elec.Eng.             
文章编号：0258-8013 (2004) 04-0184-05    中图分类号：TK31    文献标识码：A    学科分类号：470⋅2040 
人工智能技术在电站锅炉燃烧优化中的应用研究 
王培红, 李磊磊, 陈  强, 董益华 
(东南大学动力系，江苏 南京 210096) 

RESEARCH ON APPLICATIONS OF ARTIFICIAL INTELLIGENCE TO 
COMBUSTION OPTIMIZATION IN A COAL-FIRED BOILER 
WANG Pei-hong,  LI Lei-lei,  CHEN Qiang,  DONG Yi-hua 
（Southeast University, Nanjing 210096,China） 
ABSTRACT: Coal-fired boiler operation is confronted with two 1  引言 
requirements to reduce its operation cost and to lower its emission. 
In order to improve the efficiency and to reduce the emission in 锅炉燃烧过程中锅炉热效率与 NOx 排放的影响
combustion, a model of a coal-fired boiler for NOx emission and 因素大部分相同，但具有矛盾的要求。确定兼顾锅炉
efficiency response characteristics is needed. Such a modeling is 热效率和 NOx 排放两个目标的运行优化方案是本文
quite difficult, due to the huge boiler architecture, complicated 的研究目标。本文在电站锅炉热效率与 NOx 排放的
operating conditions, coal sort variation and etc. Based on the data 
of optimal combustion experiment, a new approach to combine 响应特性模型研究的基础上，进行了锅炉高效低污染
neural network with function-type mode is developed, which 燃烧优化问题的数学描述。针对本文所述优化问题的
results in a mixed model of NOx emission and boiler efficiency 数学模型特点，采用改进的十进制实数编码的遗传算
response characteristics model. Based on the model, we apply 法作为优化算法。数值实验与优化试验结果的一致
decimal genetic algorithm to solve the control problem of high 性，表明它是一种适用的和有效的数值寻优方法。 
efficiency and low emission boiler combustion. The solution 
shows that the proposed optimal algorithm may provide feasible 2  电站锅炉热效率与NOx排放的特性响应模
optimal control strategy to regulate wind door aperture according 型研究 
to different optimal object of NOx emission and boiler efficiency. 
电站锅炉燃烧产物(简称排放物)的生成机制很
KEY WORDS: Boiler; Neural network; Genetic algorithm; 
复杂[1]，受多种因素的制约，诸如煤种、锅炉热负荷、
Combustion optimization;  NOx emission; Boiler efficiency 
风煤比、配风方式、炉膛温度以及其分布的均匀性等，
摘要：电站锅炉的运行面临降低运行成本与降低污染物排放 鉴于理论、实验和检测研究的不完备，目前难以用基
的双重要求，高效低污染的优化决策问题日益引起关注。由
于机理的的函数型模型描述，本文应用人工神经网络
于锅炉设备结构庞大，运行条件复杂，燃料性质多变等因素，
技术实现 NOx 与飞灰含碳等参量的软测量，建立了
建立电站锅炉排放特性的函数模型难度极大，为满足锅炉高
以各种运行操作量(如阀门开度等)为输入，以锅炉热
效低污染燃烧优化研究的需要，该文借助优化燃烧特性试验
数据，建立了电站锅炉热效率与 NO 排放的响应特性的神经 效率 eb和氮氧化物 NOx为输出的神经网络与函数混x
网络与解析函数的混合模型。文中使用了非函数形式的响应 合的特性响应模型。 
模型，燃烧优化采用了十进制遗传算法。优化数值解表明，    （1）锅炉燃烧设备概况 
该方法可针对锅炉热效率和 NOx 排放的不同优化目标，给出 本文利用文[2]、[3]提供的燃烧特性试验结果，
可行的调整各风门开度等操作量的优化控制方案。 建立锅炉排放特性响应的神经网络模型。试验锅炉为
关键词：锅炉；神经网络；遗传算法；燃烧优化；NOx排放； 亚临界强制循环固态排渣煤粉炉。在炉膛四角布置切
锅炉效率    向摆动燃烧器(摆动角为±20°)，采用同心反切燃烧
基金项目：国家自然科学预研基金项目（Xj030306）；江苏省自然科 系统。满负荷条件下 A~E 投用层一次风，F 层一次
学基金项目（BK2001005）。 风备用。锅炉投用 5 台磨煤机和 5 台给煤机。 
Project Supported by National Natural Science Preset Foundation of China 
(Xj030306).     （2）神经网络模型的输入与输出 
第 4 期 王培红等：  人工智能技术在电站锅炉燃烧优化中的应用研究  185 
由于 NOx、飞灰含碳量和排烟氧量等燃烧产物 3.1 锅炉特性试验与神经网络的样本数据 
受多种因素的制约，而且缺乏机理模型支持，本文利 燃烧特性试验[2,3]共进行了 12 组试验工况，其
用利用神经网络[4,5]的非线性映射特性, 确定燃烧产 中工况 1 为燃用煤种 1 的标准工况，工况 2~5 表现
物与燃烧调整中诸操作量（如风门开度等）的关联关 燃尽风的调整效果，工况 6 和 7 表现二次风的不同配
系。 风方式，工况 8、9 表现燃烧器摆动的影响，工况 10、
本文以入炉总煤量和入炉总空气量表示锅炉热 11 表现负荷变动的影响，而工况 12 为燃用煤种 2 的
负荷与燃烧氧量对燃烧特性的影响；采用 6 个二次风 特性响应。特性试验数据见表 1。 
门开度值表示 6 层二次风的影响；2 个燃尽风开度表 表 1  各工况 NOx排放量、飞灰含碳量和排烟氧量 
示投用 2 层燃尽风的影响；二次风箱与炉膛之间的差 Tab.1  The NOx emission, carbon content in fly ash and 
压作为一个输入参数表示其对二次风和燃尽风出口 oxygen content in exhaust gas 
速度的影响(上述 11 个输入量共同表示配风方式与 工况 飞灰含碳量/% NOx/(mg/m
3) 排烟氧量/%
1 1.09  880.31 3.3075
局部燃烧氧量的影响)；5 台磨煤机通风量和 5 台给 2 1.65  863.65 3.3250 
煤机开度对应着煤粉和一次风沿炉膛高度方向的分 3 1.40  932.28 3.0225 
4 1.43 1085.32 3.0417 
布(上述 10 个输入量表示炉膛燃烧分布对 NOx 排放 5 1.33  954.03 2.7617 
特性的影响)；煤种特性取收到基碳(Car)、氢(Har)、 6 1.39  769.40 3.1000 
氧(Oar)、氮(Nar)、低位发热量(Q) (W
7 1.29  740.94 3.0790 
、水分 ar)和挥发 8 1.21  852.36 3.0910 
分(Var)等 7 个量。所有燃烧器均以相同摆角在炉内 9 1.18  795.69 3.2317 
高度方向摆动，燃烧器摆角作为其对炉膛燃烧分布的 10 1.13  727.26 3.9217 
11 0.73  686.42 4.7325 
影响因素之一。取空气预热器空气出口温度，表示预 12 1.16  787.27 3.0890 
热空气温度对炉膛温度的影响，网络模型的输入层结 注：表中 NOx数据未进行 6%氧量折算 
点共 30 个。 3.2 锅炉排放特性的神经网络模型 
神经网络模型的输出层结点 3 个，分别对应
本文采用 3 层网络结构，输入和输出层分别为
NOx浓度、飞灰含碳量以及排烟氧量。 30 个输入结点和 3 个输出结点，经过数值实验确定
（3）锅炉热效率计算模型 
选用 30 个隐结点的 BP 网络结构。对表 1 和表 2 中
利用神经网络模型输出的排烟氧量和飞灰含碳
数据进行归一化[4]处理并经过样本数据的训练，建立
量，增加排烟温度、送风温度以及燃料灰分、水分与
了锅炉运行参数和锅炉 NOx 排放特性、飞灰含碳量
低位热值等测量数据作为锅炉热效率模型的输入；采
[6] 与排烟氧量关系的神经网络预测模型。 用经改造的模型 计算锅炉反平衡热效率。 
网络模型计算结果如表 2 所示。对于前 11 组训
（4）电站锅炉热效率与 NOx 排放的特性响应模
练样本，网络的输出值与实测值已经十分接近，最大
型 
的误差为 0.00091。对非训练样本集的第 12 组输入参
为实现锅炉高效低污染的燃烧优化，必须建立
NO 数，神经网络对飞灰含碳量、NOx排放浓度和排烟氧电站锅炉热效率与 x 排放响应的特性模型。在燃
烧试验样本数据的支持下，建立了如图 1 量的相对预测误差分别为 3.662%、 4.162%和所示的锅炉
1.754%。可以认为网络具有良好的泛化能力。 燃烧特性响应模型。
总风量(1) 表 2 网络模型训练结果及预测结果 
燃料量(1) NOx排放 Tab.2  Neural network model training and 
二次风门开度(6)
燃尽风门开度(2) (30 输入, forecasting results 
风箱炉膛差压(1) 3 输出)
(5) 锅炉排放 飞灰含磷量 工况 实测值 神经网络输出值 相对误差/%磨煤机通风量
给煤机的开度(5) 神经网络 排烟氧量 (7 输入, 飞灰含碳量/% 1.09 1.09250 0.22908 
燃烧器摆动角(1) 1 输出)
燃料成分(3) 1 
3
锅炉效率 NOx/(mg/m ) 880.31 880.147 0.01851 空预器出口温(1)
(7) 排烟温度(1)
锅炉热效率
燃料成分 简化模型 排烟氧量/% 3.3075 3.30562 0.05699 
冷风温度(1)  飞灰含碳量/% 1.65 1.65163 0.09879 
图 1  锅炉 NOx排放与效率特性响应模型 2 3NOx/(mg/m ) 863.65 863.451 0.02309 
Fig.1  Response property model of NOx emission and 排烟氧量/% 3.3250 3.32325 0.05275 
performance efficiency of boiler 3 飞灰含碳量/%  1.40 1.40346 0.24700
3  3电站锅炉特性试验样本及其算例分析 NOx/(mg/m ) 932.28 931.289 0.10630 
186 中  国  电  机  工  程  学  报 第 24 卷 
排烟氧量/% 3.0225 3.02062 0.06207 本文燃烧优化的实质是在限制(或降低)NOx 排
飞灰含碳量/%    1.43 1.43353 0.24664
3
4 NOx/(mg/m ) 1085.32 1084.18 0.10489 放的基础上提高锅炉热效率，是一个多目标优化问
排烟氧量(%) 3.0417 3.04045 0.04113 题。在此采用加权因子，将多目标优化问题转化为单
飞灰含碳量/%   1.33 1.33468 0.35218
3
5 NOx/(mg/m ) 954.03 952.734 0.13585 目标问题，进而通过权值的不同组合，获得不同的优
排烟氧量/% 2.7617 2.76075 0.03429 
化解，为优化决策提供支持。下面给出包括优化目标
飞灰含碳量/%   1.39 1.39502 0.36101
3
6 NOx/(mg/m ) 769.40 767.662 0.22594 和优化约束条件的优化问题数学描述。 
排烟氧量/% 3.1000 3.09865 0.04342 
飞灰含碳量/%   1.29 1.29419 0.32457 （1）目标函数 
3
7 NOx/(mg/m ) 740.94 739.015 0.25978 min f = a ⋅ (ηC −ηFC ) + b ⋅ ([NOx ]FC − [NOx ]C ) (1) 
排烟氧量/% 3.0790 3.08010 0.03563 
飞灰含碳量/%   1.21 1.21400 0.33033 式中 ηC、 ηFC 分别为当前炉效率及优化后预测炉效
3
8 NOx/(mg/m ) 852.36 850.319 0.23944 
率, %；  [NO ] 、 [NO ] 分别为 NO 排放物的当
排烟氧量/% 3.0910 3.09402 0.09783 x C x FC x
飞灰含碳量/%   1.18 1.18294 0.24873 前值及优化后的预测值，mg/m3；a、b 分别为锅炉效
3
9 NOx/ (mg/m ) 795.69 794.103 0.1995 
排烟氧量/% 3.2317 3.23071 0.03076 率项和 NOx浓度项的权重。 
飞灰含碳量/%   1.13 1.13161 0.14266    （2）被优化的操作参数及其约束条件 
3
10 NOx/ (mg/m ) 727.26 726.982 0.03823 
排烟氧量/% 3.9217 3.92253 0.02111 根据对锅炉热效率和对NOx排放产生的重要影
飞灰含碳量/%   0.73 0.73036 0.0489 响，并且是在运行中可控操作量的原则，本文选择送
3
11 NOx/(mg/m ) 686.42 686.118 0.04407 
排烟氧量/% 4.7325 4.73322 0.01519 入锅炉的总空气量 A、二次风门开度 SAIR(i)(i=1, 
飞灰含碳预测   1.16 1.20248 3.66172 2,…,6)、燃尽风门开度 SOFA(i)(i=1，2)及燃烧器摆动12 NOx预测 787.27 820.036 4.16200 
排烟氧量预测 3.0890 3.14319 1.75433 角 Cs共 10 个参数作为优化变量。 
3.3  锅炉热效率响应特性 考虑到总空气量与锅炉热负荷（燃料量 B）有
利用锅炉热效率计算模型，对锅炉热效率的响 关，样本数据中总空气量与燃料量之比 A/B= 
应特性进行测算，结果见表 3。 9.658~10.629，取总空气量的变化范围为 9B~11.5B；
表 3  锅炉热效率响应特性 结合样本数据，并考虑到操作习惯和安全性，分别取
Tab. 3  Boiler heat efficiency response characteristics 二次风门开度 SAIR的变化范围为 20%~90%，燃尽风
performance 
开度 SOFA(i)的变化范围为 0~100%，燃烧器摆动角
工况 War/% A
Qar 排烟温 冷空气 
ar/% /(kJ/kg) 度/℃ 温度/℃ Cs的变化范围为 0.3~0.7。 
1 4.95 18.05 26069 149.5 25.0 
2 4.95 18.05 26069 147.0 25.0 5  优化算法研究及其在燃烧优化中的应用 
3 4.95 18.05 26069 139.7 25.0 
4 4.95 18.05 26069 142.0 25.0 遗传算法(GA)[7,8]是基于生物进化过程中优胜
5 4.95 18.05 26069 136.3 25.0 
6 5.20 22.20 23677 128.3 25.0 劣汰规则与群体内部染色体信息交换机制、处理复杂
7 5.20 22.20 23677 130.5 25.0 优化问题的一类通用性强的新方法。GA 利用简单的
8 5.20 22.20 23677 128.6 25.0 
9 5.20 22.20 23677 128.3 25.0 编码技术和算法机制来模拟复杂的优化过程，它只要
10 4.95 18.05 26069 120.8 25.0 求优化问题是可计算的，而对目标函数和约束条件的
11 4.95 18.05 26069 119.2 25.0 
12 5.2 0 22. 20 23677 127.7 25.0 
具体形式、优化变量的类型和数目不作限制，在搜索

排烟氧 飞灰含 炉渣含 锅炉效 工况  空间中进行自适应全局并行搜索，运行过程简单而计
量/% 碳量/% 碳量/% 率/% 
1 3.3075 1.09 2.4727 93.0665  算结果丰富，特别适合于处理复杂优化问题。 
2 3.3250 1.65 3.0728 93.0430  针对本文燃烧优化问题的特点，本文采用实数
3 3.0225 1.40 2.8049 93.5229  [9]
4 3.0417 1.43 2.8371 93.4039  编码遗传优化算法 (简称RGA)。 
5 2.7617 1.33 2.7299 93.7586  设RGA优化问题的数学描述为 
6 3.1000 1.39 2.7942 93.7888  
7 3.0790 1.29 2.6871 93.7240  min f (x(1), x(2), , x( p))            (2) 
8 3.0910 1.21 2.6013 93.8364  式中  a( j) ≤ x( j) ≤ b( j), j =1,2, , p ； x( j) 为第j个
9 3.2317 1.18 2.5692 93.8271  
10 3.9217 1.13 2.5156 94.1790  优化变量；[a( j),b( j)]为 x( j) 的变化区间； p 为优
11 4.7325 0.73 2.0870 94.0428  
12 3.0890 1.16 2.5478 93.8938  化变量的数目； f 为目标函数。 
4  优化问题的数学描述     RGA包括如下几个步骤： 
第 4 期 王培红等：  人工智能技术在电站锅炉燃烧优化中的应用研究  187 
（1）经归一化处理，完成编码与群体初始化 6.1 优化模型算例 
x( j) = a( j) + y( j)[b( j) − a( j)]  ( j =1,2,..., p)  (3) 根据上述数学模型，取神经网络样本数据（表
把变化区间为 [a( j),b( j)] 的第 j 个优化变量 2）中 NOx排放情况最严重的第 4 组工况进行优化计
x( j) 转化为[0，1]区间上的实数 y( j) 。 算。该工况下的 NOx排放浓度为 1085.316mg/m3，锅
（2）结合目标函数 f (i) ，计算个体适应度 炉热效率为 93.404%。优化结果如图 2。 
定义排序后第i个个体的适应度函数值为 93.6
 F (i) = exp(− f (i))          (4) 93.5
（3）选择操作 93.4
定义父代个体 y( j,i) 的选择概率为 
93.3
n
ps (i) = F (i) /∑F (i)            (5) 93.2
i=1 93.1600      700      800     900   NOx/(mg/m3)
（4）杂交操作  
根据式 (5)的选择概率选择一对父代个体 图 2  优化结果示意图 
Fig. 2  Sketch map of optimal results 
y( j, i1)、和 y( j, i2 ) 、，进行如下随机线性组合产生一
个子代个体为 6.2  计算结果分析 
y2 ( j, i) = uc ⋅ y( j, i1) + (1−uc) ⋅ y( j, i2 )       (6) 分析图 2 优化结果可发现以下特点： 
其中，uc ∈ (0,1) 是随机数。    （1）随着优化目标函数中锅炉热效率项与 NOx
（5）变异操作 排放项的权重比 a/b 的变化，优化调整会造成锅炉热
对于 p 个随机数，RGA 的变异操作为  效率和 NOx 排放的变化，当此权重比增大的时，锅
⎧ y3( j, i) = u( j),  um < pm (i) 炉热效率会随之而提高，但增幅趋缓；同样若减小此
⎨        (7) 
⎩y3( j, i) = y( j, i),  um≥ pm (i) 权重比时，NOx排放浓度会随之降低，但随着权重比
式中  u( j) ( j =1 ~ p) 、um均为（0，1）上的随机数, 的不断减小，NOx排放浓度的降低亦趋缓。 
p (i) =1− p (i) 。    （2）锅炉热效率和 NOx 排放浓度呈现共同增大m s
（6）进化生成子代 和减小的趋势，意味着片面强调提高锅炉热效率或者
由前面的第（3）~（5）步得到了3n 个子代个体， 控制 NOx 排放都是不可取的，这一特点与有关 NOx
按其适应度值由大到小排序，取最前面的n个子代个 排放机理的定性分析结论是一致的。 
体作为新的父代群体。算法转入第（2）步,进入下一    （3）上述优化计算可以提供如下选择：在保证污
轮演化计算。 染排放不超标的前提下，追求尽可能高的锅炉热效
（7）寻优空间的压缩[10] 率；或者在保证锅炉热效率一定的前提下，采用尽可
经 k 代演化后，在 n 个个体群中选择 g 个最优 能低的污染排放控制策略。 
个体。将每一个变量在选定的最优个体所对应的变化 如果必须满足国家环保局关于固态排渣煤粉炉
范围作为变量新的初始化区间，即：a( j) = xg ( j)min ， NOx排放浓度不得超过 650mg/m
3的规定，在图 2 各
b( j) = xg ( j)max ，算法转入第（1）步，重新随机生 优化方案中，第 3 点是合理的选择。优化前后各参数
成 n 个个体作为演化群体。 对比如表 4 和表 5 所示。 
6  锅炉燃烧优化算例与分析 
表 4  优化前后控制作用比较 
Tab. 4  Comparison of parameters before and after optimization 
(t/h)                          二次风门开度/%                     燃尽风开度/%     总空气量 燃烧器摆动 
1 2 3 4 5 6 1 2 
优化前 2293 65 65 65 65 65 65 31.2 0 0.5 
优化后 2332.69 50.05 71.04 47.70 53.70 87.38 89.75 97.1１ 73.4８ 0.54395 

锅炉热效率/%
188 中  国  电  机  工  程  学  报 第 24 卷 
表 5  优化前后模型输出参数比较 
Tab. 5  Comparison of model output parameters before and after optimization 
NO 浓度/(mg/m3x ) 飞灰含碳量/% 排烟氧量/% 锅炉效率/%
优化前 1086.859 1.42878 3.04078 93.404
优化后 652.637 1.14612 3.76915 93.275 

在该优化策略下，模型建议总空气量为 的燃烧参数调整策略，可明显降低 NOx的排放浓度，
2332.69t/h,且与原运行中采用比较均匀的控制参数 并提高锅炉热效率。 
相比，模型建议采用不同的二次风门开度和比以前大 参考文献 
得多的燃尽风开度，燃烧器摆动则稍向上倾斜，倾角
[1] 左志雄，向军，叶永松，等(Zuo Zhixiong, Xiang Jun, Ye Yongsong, et al).
为(0.54395−0.5)×180°＝7.911°，这些调整意味着对风 大型锅炉氮氧化物排放特性试验研究(An experimental research on 
煤比以及空气与燃料混合状况的调整，从而达到对锅 nitrogen oxide emission from utility boiler)[J]. 华中电力(Central China 
炉燃烧工况的改善。模型建议较大的燃尽风开度，与 Electric Power), 2001, 14(5)：9-11. 
[2] 周昊，朱洪波，曾庭华，等(Zhou Hao, Zhu Hongbo,Zeng Tinghua,et al). 
抑制煤粉炉 NOx生成的分级燃烧的原则一致[9]，且由 大型四角切圆燃烧锅炉 NOx 排放特性的神经网络模型(An artificial 
其二次风的配风可以看出，该配风方式接近于缩腰配 neural network model on NOx emission property of a high capacity 
风和倒宝塔型配风。锅炉的燃烧特性试验证明, 这种 tangentially firing boiler)[J]. 中国电机工程学报(Proceedings of the 
CSEE), 2002, 22(6)：96-100. 
配风方式是一种有效降低 NOx 排放量的燃烧调整技 [3] 周昊, 茅建波，池作和，等(Zhou Hao,Mao Jianbo,Chi Zuohe, et al). 燃
术。由表 5 可知，优化后 NOx排放浓度下降 39.952%， 煤锅炉低氮氧化物燃烧特性的神经网络预报(Predicting low NOx 
锅炉热效率略有降低，仅下降了 0.129%。 combustion property of a coal-fired boiler) [J].环境科学(Environmental 
NO Science), 2002, 23(3)：18-22. 如果需要在大幅度降低 x 排放的同时，要求 [4] 焦李成. 神经网络系统理论 [M]. 西安：西安电子科技大学出版
锅炉热效率略有提高，则在表 1 各种优化方案中，第 社,1990. 
5 种工况亦是可行的选择。该点锅炉热效率略有提高 [5] Chu Jizheng, Shieh Shyanshu. Constrained optimization of combustion in 
(见表 3)，而 NO 排放浓度的降幅仍然达到了 33.18 a simulated coal-fired boiler using artificial neural network model and x
information analysis[J]. Fuel , 2003, 82(2)：693-703. 
％。 [6] 张小桃, 王培红(Zhang Xiaotao, Wang Peihong).一种新的锅炉效率的
7   计算模型(New computing model for boiler efficiency)[J]. 电站系统工结论
程(Power System Engineering), 1999, 15(4)：16-17. 
在锅炉燃烧特性试验的支持下，利用人工智能 [7] 张文修 , 梁怡 . 遗传算法的数学基础  [M]. 西安交通大学出版
社,2000. 
技术，通过对燃烧试验样本的学习，建立了电站锅炉 [8] Schoenauer M, Xanthakis S. Constrained GA optimization [A]. Proc 5th 
NOx排放和热效率响应特性的数学模型，为进一步实 Int Conf GA[C].1993. 
现电站锅炉高效低污染的燃烧优化创造了条件。 [9] 林丹, 李敏强，寇纪松，等(Lin Dan, Li Minqiang,Kou Jisong, et al). 基
于实数编码的遗传算法的收敛性研究 (On the convergence of 
本文介绍了神经网络的模型结构，训练了神经
real-coded genetic algorithms)[J]. 计算机研究与发展 (Journal of 
网络，检验了模型与样本数据的一致性、模型的泛化 Computer Research and Development),2000,37(11)：1321-1327. 
能力，分析了模型对主要扰动的响应特性。 [10] 金菊良, 杨晓华, 丁晶, 等(Jin Juliang, Yang Xiaohua, Ding Jing, et al). 
针对锅炉NO 排放与效率的响应特性模型的特 基于实数编码的加速遗传算法(Real coding based acceleration genetic x
algorithm)[J]. 四川大学学报(Journal of Sichuan Unversity), 2000, 
点，针对锅炉高效低污染多目标优化问题，建立了燃 32(4)：20-24. 
烧优化的遗传优化算法模型。在对比的二进制编码和   
实数编码的遗传算法后，采用了适于数值寻优的实数     收稿日期：2003-08-15。 
作者简介： 
编码遗传算法，并对各项算子和解空间的压缩等问题     王培红(1959-)，男，博士，教授，从事火电机组性能分析与经济运行
做了改进，算例表明算法的稳定和收敛。 等方面的研究工作。 
结合燃烧优化问题的数值解，给出了不同目标 （责任编辑  贾瑞君） 
权值下的优化计算结果。分析表明，模型的计算结果
与基于机理的定性分析结论是一致的，根据模型建议

`,
  `   传统数据仓库和大数据比较
第1章传统数据库的优劣势
1.1 优势
1、技术成熟、使用简单
   传统数据仓库依赖数据库服务，技术成熟，使用的时候只需要掌握SQL语句即可，使用简单
2、对传统业务支持好
   传统数据仓库通过关系型数据库存储和服务，通过关系型数据库能简单有效地记录业务数据，对传统的业务员支持得较好
1.2劣势
1、数据采集效率低
传统的数据仓库数据采集依赖于网络和单一的数据库服务，往往导致数据采集效率低下。如：有10G的数据需要采集回来，往往需要通过传统数据仓库不停地接收，需要依赖网络和数据库服务承载量，效率往往很低
2、数据格式单一，存储效率低
传统数据仓库里数据都是基于关系型数据的，并且都只存储在关系型数据库中，如：Oracle、SQLServer、Mysql等数据库中,当单表数据量大到千万或者亿级的时候，再往里面存储时往往效率低下，存储速度慢
3、数据存储量低
传统数据仓库往往受限于数据的单一格式和封闭的业务环境，数据存储量比较低
4、数据处理格式单一
传统数据仓库依赖于数据库服务，对于数据库服务以外的数据往往无法处理，如：word、excel、网页、PDF等等非格式化数据通过传统数据仓库是无法进行数据处理
5、计算效率低
传统数据仓库需要通过数据库服务进行数据处理，当达到千万级或以上的数据时，处理效率往往很低效，需要长时间才能得出计算结果
6、数据孤立、缺乏集成
传统数据仓库往往只专注一个或几个业务，较少和外部数据仓库进行交互，数据孤立、缺乏集成，导致缺少外部数据依赖，实际价值大打折扣。如：电力营销系统的数据不依赖于客户的实际使用情况，往往导致营销的结果达不到预期目的。
7、无法进行有效地预测分析
由于传统数据仓库中存储的数据单一且数据孤立，往往导致依赖传统数据仓库，无法全面对数据汇总和分析，最终进行的预测分析结果比较片面。如：电力巡检系统只能通过电力巡检系统数据仓库历年巡检的数据进行分析预测下一阶段将会导致的问题，而无法进一步准确地分析。
第2章大数据的优劣势
2.1优势
1、数据采集效率高
大数据往往采取的是分布式文件存储的方式，通过把数据分布式传输到不同的服务器上进行存储，减少网络和服务器的压力。如：采集10G的数据，其中3G的数据存放在A机房，3G数据存放在B机房，4G的存数据放在C机房，不依赖数据库服务，以文件的方式存储，需要用的时候，通过跨机房的分布式计算进行使用，采集过程高效、便捷。
2、数据格式多元化、存储效率高
大数据的数据可以存储传统数据库的关系型数据外，也能存储类似word、excel、网页、PDF等等非格式化数据，并且以分布式文件系统的方式把文件进行存储到多台机器上，存储效率较高
3、数据存储量大
大数据不受限于数据格式和业务环境，通过分布式文件系统可以随时存储多元化的数据，存储量往往很大
4、数据处理格式多元
大数据能够通过脚本、数据过滤等步骤对word、excel、网页、PDF等等非格式化数据进行处理并取出想要的结果，如:通过收集处理各地变电箱的日志文件进行分析，得出在什么样的情况下变电箱往往会导致什么样的故障，用于后续新电力员工的培训
5、计算效率高
大数据能够通过通过分布式计算，通过把计算过程分发到不同的服务器并进行汇总，得出计算结果，计算能力和效率都打打增强
6、数据分散、集成度高
大数据的数据往往不依赖于单一的业务或者服务，往往需要继承多个有相关的业务数据做支撑进行计算，增加数据的价值。
7、能够进行有效地预测分析
通过汇总不同的有一定相关性的数据后进行大数据的挖掘，得出的结果往往更有效。如：通过获取新浪天气过去5年的天气数据、通过百度地图或者过去5年的建筑群信息，再结合过去5年的巡检数据，可以分析得天气、建筑密集度和变电箱故障之间的关系，在以后按照不同的天气、建筑密集度等条件的时候进行提前故障预防，比单一分析巡检系统的数据进行预测更有效
2.2劣势
1、技术前沿、使用复杂
大数据的使用涉及到不同的技术，如：对音频的识别需要音频识别服务、对文档的识别需要文档识别服务等等。最终需要多种服务一起支撑起大数据的使用，中间的技术较为前沿、复杂

第3章传统数据仓库和大数据比较
通过分析传统数据仓库和大数据的优劣势，我们可以直观地通过下面的图看到两者的对比。
传统数据库	大数据
技术成熟度	成熟	较成熟
技术难易度	简单	难
采集速度	慢	快
存储效率	慢	快
数据存储量	GB/TB级	PB级
处理方式	交互处理和批处理	批处理
存储格式	单一	格式多样
处理格式	表	处理多格式文件
计算效率	慢	快
数据交互	数据孤立、缺乏集成	数据分散、集成度高
预测分析能力	较低	高

第4章电力大数据的优势
通过大数据我们可以给电力行业带来一些新的优势
4.1 优化管理模式
1、支持基建决策
通过大数据技术分析大量的电力使用情况，有助于电力企业基础设施选址、建设的决策
2、升级客户分析
通过使用电力企业庞大的历史销量数据，进行用户用电行为分析和用户市场细分，使管理者能有针对性地优化营销组织，改善服务模式。
3、提高智能控制
通过外部因素数据和内部数据的结合进行电力的分析将加速电力企业智能化控制的步伐，促进智能电网的发展。
4、加强协同管理
通过大数据多元化的分析，能够整合电力行业生产、运营、销售、管理的数据，实现电力发电、输电、变电、配电、用电、调度全环节数据共享，以用电需求预测为驱动优化资源配置，协调电力生产、运维、销售的管理，提升生产效率和资源利用率
4.2 丰富增值业务
1、丰富增值服务
利用电力行业各种格式类型的数据汇总可给用户提供更加丰富的增值服务内容。
2、提供经济指导
作为重要经济先行数据,用电数据是一个地区经济运行的“风向标”，可作为投资决策者的参考依据

第5章总结
传统数据仓库和大数据仓库各有优劣，电力行业的新数据时代不仅仅是需要大数据的支撑，我们也需要传统数据仓库对业务的支持，术业有专攻。我们需要通过大数据和传统数据的结合来实现对传统业务支撑的同时，实现新的增长点，让两者的结合给电力企业插上腾飞的翅膀。 
    `,
];

var current = 0;
function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  current = selectDom.selectedIndex - 1; //获取选中项的索引
  document.querySelector("#document_pre").src =
    staticPath + exampleList[current];
  $(".download_result").addClass("hide");
  $(".step_tip").removeClass("hide");
}

var fileUpload = document.querySelector(".fileUpload");
fileUpload.addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (file) {
    // $(".loading").html("上 传 中 ···");
    $("#marklayer").addClass("mark-show"); //加载状态
    var formData = new FormData();
    formData.append("multipartFile", file);
    $.ajax({
      method: "POST",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      url: baseAPI + "/docToText",
      data: formData,
      contentType: false,
      processData: false,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          $(".message-success .message_content").html("上传成功");
          $(".message-success").removeClass("message-hide");
          setTimeout(() => {
            $(".message-success").addClass("message-hide");
          }, 2000);
          $("#document_pre").attr("src", staticPath + res.result);
        }
      },
    });
  }
});

var requestObj = {
  multipartFile: "上传的doc文档",
};
$("#result").html(syntaxHighlight(requestObj));

var returnObj = { msg: "文档解析成功!", result: textList[0], code: "200" };
$("#returnresult").html(syntaxHighlight(returnObj));

$(".analysis_name").click(function () {
  $("#marklayer").addClass("mark-show"); //加载状态

  var uploadFiles = document.querySelectorAll(".fileUpload")[0];
  var file = uploadFiles.files[0]; //文件
  var formData = new FormData();
  formData.append("multipartFile", file);
  if (file) {
    $.ajax({
      method: "POST",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      url: baseAPI + "/doc2text",
      contentType: false,
      processData: false,
      data: formData,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          $("#analysis_results").html(res.result);
          $(".download_result").removeClass("hide");
          $(".step_tip").addClass("hide");
          $("#returnresult").html(syntaxHighlight(res));
        }
      },
    });
  } else {
    setTimeout(() => {
      $("#marklayer").removeClass("mark-show");
      $("#analysis_results").html(textList[current]);
      $(".download_result").removeClass("hide");
      $(".step_tip").addClass("hide");
    }, 2000);
  }
});

//文件url转为file对象
function getFileFromUrl(url, fileName) {
  return new Promise((resolve, reject) => {
    var blob = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "application/pdf");
    xhr.responseType = "blob";
    // 加载时处理
    xhr.onload = () => {
      // 获取返回结果
      blob = xhr.response;
      let file = new File([blob], fileName, { type: "application/pdf" });
      // 返回结果
      resolve(file);
    };
    xhr.onerror = (e) => {
      reject(e);
    };
    // 发送
    xhr.send();
  });
}
