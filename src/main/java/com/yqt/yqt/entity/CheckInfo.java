package com.yqt.yqt.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
//@AllArgsConstructor
@NoArgsConstructor
/**
 * 合规检测表
 */
public class CheckInfo {

    private Integer id;

    /**
     * 数据内容
     */
    private String dataContent;

    /**
     * 违规类型，0：违规素材，1：违规短语
     */
    private Integer dataType;

    /**
     * 标注短语类型对应的正则表达式
     */
    private String expression;

    /**
     * 标注结果id
     */
    private Integer tagId;

    /**
     * 标记结果名称
     */
    private String resultName;

    /**
     * 标注颜色
     */
    private String backgroundColor;

    /**
     * 是否标注,0:未标注, 1:已标注
     */
    private Integer isTag;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    private Integer userId;

	public CheckInfo(Integer id, String dataContent, Integer dataType, String expression, Integer tagId,
                     String resultName, String backgroundColor, Integer isTag, Date createTime, Date updateTime,
                     Integer userId) {
		super();
		this.id = id;
		this.dataContent = dataContent;
		this.dataType = dataType;
		this.expression = expression;
		this.tagId = tagId;
		this.resultName = resultName;
		this.backgroundColor = backgroundColor;
		this.isTag = isTag;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.userId = userId;
	}

    
    
    
}
