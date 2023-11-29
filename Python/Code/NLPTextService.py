import paddlehub as hub
import json
import uvicorn
import jiagu
from fastapi import FastAPI, Body
from paddlenlp import Taskflow
from pydantic import BaseModel
from typing import List
from pycorrector import Corrector

class Text(BaseModel):
    text: str


class TextList(BaseModel):
    textlist: List[str]


app = FastAPI()
# 简历
schema_Resume = ['姓名','性别','工作年限','身份证号','生日','民族','所在地','详细地址','年龄','工作经验','当前公司','当前职位','毕业学校','最高学历','所学专业','期望应聘职位','当前薪水','期望薪水','所属行业','期望行业','求职状态','政治面貌','婚姻状况','邮编','籍贯','期望工作地区','最近毕业年份','手机','固定电话','邮箱','QQ号','微信号','入学时间时间','毕业时间时间','是否在读','学校名称','学院名称','上课模式','入职时间年份','入职时间月份','离职时间年份','离职时间月份','公司名称','所属部门','所在公司城市','职位名','工作描述','公司行业','职位职能','公司规模','公司类型','工资水平','下属人数','汇报对象','工作技能','项目开始时间','项目结束时间','项目名称','项目所属公司','项目地点','项目描述','项目技能']
# 招标抽取字段
schema_Bidding = ['项目名称', '项目编号', '采购单位', '采购单位联系人', '中标单位联系人', '开标时间', '标讯发布时间',
                  '招标项目金额', '招标代理机构', '招标代理机构联系方式', '招标截至日期', '招标方式', '项目金额(大写)',
                  '投标保证金', '中标时间', '服务期', '采购服务与产品', '中标产品质保期', '省份', '城市', '预算金额',
                  '采购单位联系电话', '中标产品', '招标代理机构联系人', '招标代理机构电子邮箱', '项目联系人',
                  '项目联系人电话号码', '项目范围', '公告标题', '公告内容', '公告地址', '中标单位名称',
                  '中标单位联系电话', '中标单位电子邮箱', '中标产品品牌', '中标产品规格型号', '中标产品数量',
                  '中标产品单价', '中标产品小计', '开标地点', '招标文件费', '项目启动时间', '中标金额', '项目负责人',
                  '预计采购时间', '征求意见截止日期']
# 合同抽取字段
schema_Contract = ['合同类型', '税率', '合同大写金额', '合同金额', '乙方账号', '甲方账号', '乙方开户行', '甲方开户行',
                   '乙方地址', '甲方地址', '乙方联系方式', '甲方联系方式', '乙方授权代表人', '甲方授权代表人',
                   '乙方法定代表人', '甲方法定代表人', '合同期限', '签订日期', '签订地点', '合作内容', '乙方名称',
                   '合同名称', '合同编号', '甲方名称']
# 定义抽取法律文书的数据解析规范
schema_Judgment = ['案件编号', '案件名称', '原告', '被告', '案发时间', '法院', '案由', '开庭时间', '法庭', '法官',
                   '审判长', '原告律师', '原告律所', '被告律师', '被告律所', '涉案金额', '裁判结果', '裁判日期',
                   '执行依据文书号']
# 抽取用户评论中多个维度的正负面观点
schema_Appraise = {'评价维度': ['观点词', '情感倾向[正向，负向]']}
# 简历模型
ie_Resume = Taskflow("information_extraction",schema=schema_Resume,model="uie-base",batch_size=4 ,task_path='uie_modle/jianli' )
ie = Taskflow("information_extraction", model="uie-base", batch_size=12, use_fast=True)
# 百度飞桨的情感分析模型
sentiment = Taskflow("sentiment_analysis", model="skep_ernie_1.0_large_ch")
# 招标抽取模型
zhaobiao_ie = Taskflow("information_extraction", model="uie-base", batch_size=12, use_fast=True,
                       task_path='uie_modle/zhaobiao')
# 合同抽取模型
ie_Contract = Taskflow("information_extraction", schema=schema_Contract, model="uie-base", batch_size=4,
                       task_path='uie_modle/hetong')
# 法律文书模型
ie_Judgment = Taskflow("information_extraction", schema=schema_Judgment, model="uie-base",
                       task_path='uie_modle/panjueshu')
# 文本纠错方法实现
text_correction = Taskflow("text_correction")
# NER实体识别的方法
ner = Taskflow("ner")
# 机构识别
tag = Taskflow("pos_tagging", batch_size=4)
# 自动摘要[在此用于用户主题抽取]
summary = Taskflow("text_summarization")
# 相似度查找
similarity = Taskflow("text_similarity")
# 词性标注
module_lac = hub.Module(name="lac")
# 自定义文本
m = Corrector(proper_name_path='my_custom_proper.txt')
class TextSimilarity(BaseModel):
    text: List[list]
class TextExtract(BaseModel):
    text: str
    sch: List[str]
class TextExtract(BaseModel):
    text: str
    抽取范围: List[str]
class TextLac(BaseModel):
    text: List[str]


@app.post("/extractResume")
async def textIE(text: Text):

    print(text.text)
    ie_Resume.set_schema(schema_Resume)

    ie_result = ie_Resume(text.text)

    return json.dumps(ie_result, ensure_ascii=False)

@app.post("/lac")
async def textIE(text: TextLac):
    results_lac = module_lac.lexical_analysis(texts=text.text)
    print(results_lac)
    return json.dumps(results_lac, ensure_ascii=False)

# 文本纠错
@app.post("/textCorrection")
async def textIE(text: Text):
    print(text.text)
    list = []
    jsondata = json.dumps(m.correct(text.text), ensure_ascii=False)
    list.append(jsondata)
    return json.dumps(list, ensure_ascii=False)

# 相似度查找
@app.post("/similarity")
async def textIE(textSimilarity: TextSimilarity = Body(embed=True)):
    print(textSimilarity.text)
    similarity_result = similarity(textSimilarity.text)
    print(similarity_result)
    return json.dumps(str(similarity_result), ensure_ascii=False)

#主题抽取
@app.post("/summary")
async def textIE(text: Text):
    print(text.text)
    summary_result = summary(text.text)
    print(summary_result)
    return json.dumps(summary_result, ensure_ascii=False)

# NER【机构类】实体识别方法，通过用户自定义分词字典的方案
@app.post("/NER_ORG")
async def textIE(text: Text):
    print(text.text)
    ner_result = tag(text.text)
    return json.dumps(ner_result, ensure_ascii=False)

# 实体识别 通用识别
@app.post("/NER")
async def textIE(text: Text):
    print(text.text)
    ner_result = ner(text.text)
    return json.dumps(ner_result, ensure_ascii=False)

# 事件抽取和关系抽取
@app.post("/event_relation")
async def textIE(text: TextExtract):
    print(text.抽取范围)
    ie.set_schema(text.抽取范围)  # Reset schema
    ie_result = ie(text.text)
    print(ie_result)
    return json.dumps(ie_result, ensure_ascii=False)

# 自定义抽取
@app.post("/extract")
async def textIE(text: TextExtract):
    print(text.text)
    print(text.sch)
    ie.set_schema(text.sch)
    ie_result = ie(text.text)
    return json.dumps(ie_result, ensure_ascii=False)

#观点抽取
@app.post("/extractAppraise")
async def textIE(text: Text):
    print(text.text)
    ie.set_schema(schema_Appraise)

    ie_result = ie(text.text)

    return json.dumps(ie_result, ensure_ascii=False)
# 情感分析
@app.post("/sentiment")
async def sentiment(text: Text):
    print(text.text)
    sentiment_result = sentiment(text.text)
    print(sentiment_result)
    return json.dumps(sentiment_result, ensure_ascii=False)

# 合同抽取
@app.post("/extractContract")
async def extractContract(text: Text):
    print(text.text)
    ie_Contract.set_schema(schema_Contract)

    ie_result = ie_Contract(text.text)

    return json.dumps(ie_result, ensure_ascii=False)

# 法律文书
@app.post("/extractJudgment")
async def textIE(text: Text):
    print(text.text)
    ie_Judgment.set_schema(schema_Judgment)
    ie_result = ie_Judgment(text.text)
    return json.dumps(ie_result, ensure_ascii=False)

# 招标抽取
@app.post("/extractBidding")
async def extractBidding(text: Text):
    zhaobiao_ie.set_schema(schema_Bidding)
    print(text.text)
    ie_result = zhaobiao_ie(text.text)
    return json.dumps(ie_result, ensure_ascii=False)

# 自动摘要
@app.post("/jiaguSummary")
async def jiaguSummary(text: Text):
    print(text.text)
    summarize = jiagu.summarize(text.text, 1)
    print(summarize[0])
    return json.dumps(summarize[0], ensure_ascii=False)

if __name__ == '__main__':
    uvicorn.run(app=app, host='0.0.0.0', port=8801)

