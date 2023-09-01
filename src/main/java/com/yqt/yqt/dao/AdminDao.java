package com.yqt.yqt.dao;

import com.yqt.yqt.entity.Admin;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AdminDao {

    Admin selectAdminByUsername(String username);

    Admin selectAdminInfo();

    void updateDocument(@Param("document") String document, @Param("id") int id);

    int updateAdminInfo(Admin admin);

}
