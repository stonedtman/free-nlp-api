package com.yqt.yqt.dao;

import com.yqt.yqt.entity.CheckResult;
import com.yqt.yqt.entity.ViolationWord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ViolationWordDao {

    //查询违规词列表
    List<ViolationWord> list();

    Integer insertOne(ViolationWord violationWord);

    List<ViolationWord> selectByList(@Param("pageIndex") Integer pageIndex, @Param("pageSize") Integer pageSize,@Param("dataContent") String dataContent,@Param("lableId") Integer lableId);

    Long selectCount(@Param("dataContent") String dataContent,@Param("lableId") Integer lableId);

    Long selectUnmarkCount(@Param("dataContent") String dataContent);

    Integer updateById(ViolationWord violationWord);

    Integer batchDelete(@Param("id") String id);

    Integer saveLabel(CheckResult result);

    ViolationWord selectById(@Param("id") Integer id);

    List<CheckResult> selectLabelPage(@Param("pageIndex") Integer pageIndex,@Param("pageSize") Integer pageSize);

    Long selectLableCount();

    @Select("select r.result_name from violation_word as v, check_result as r where v.label_id = r.id and v.content=#{content} limit 1")
    String selectLabelByContent(@Param("content") String s);


    List<ViolationWord> selectWhiteList();

    List<String> selectContentByIds(@Param("ids") String id);

    List<ViolationWord> selectByLabelId(int labelId);
}
