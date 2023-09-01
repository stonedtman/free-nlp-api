package com.yqt.yqt.dao;

import com.yqt.yqt.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.Date;
import java.util.List;

@Mapper
public interface UserDao {

	UserEntity selectUserByAccount(String username);

	UserEntity selectUserBySecretIdAndSecretKey(@Param("secretId") String secretId, @Param("secretKey") String secretKey);

	UserEntity selectUserById(@Param("id") int id);

	void updatePassword(UserEntity userEntity);

	void updateUserSecret(UserEntity userEntity);

	List<UserEntity> getAllUser(@Param("adminId") int adminId,@Param("keyword") String keyword);

	int insertUser(UserEntity userEntity);

	int updateUserStatusByUserId(int status, int userId);

	int deleteUserByUserId(int userId);

	void reduceQuotaCountByUserId(int userId);

	Integer selectCount(@Param("adminId") int adminId);

	List<UserEntity> selectSpaceForPage(@Param("adminId") int adminId, @Param("beginIndex") int beginIndex,@Param("pageSize") Integer pageSize);

	Integer updateSpaceById(@Param("userId") int userId, @Param("storage") int storage);

	//修改公司名称
	int updateCompany(@Param("userId") int userId, @Param("company") String company);

	//修改用户充值额度
	int updateQuotaCount(@Param("userId") int userId , @Param("count")int count );

	// 修改用户权限
    Integer updatePowerById(@Param("id") Integer id, @Param("isPower") Integer isPower);

    Integer updateById(UserEntity user);
	// 减去用户当前可充值接口的ed
	int subTotalQuota(@Param("quota")int quota,@Param("userId") int userId);
	// 添加用户剩余可调用的额度
	int addQuotaCount(@Param("userId") int userId , @Param("count")int count);

	@Select("select id, username, password, name, company, create_date as createDate,secret_id,secret_key, valid_time,number from user where username = #{username}")
    UserEntity selectUserByUsername(@Param("username") String username);

	Integer deleteUserByUsername(@Param("username") String username);

	Integer insertUserForRegister(UserEntity userEntity);

	int selectCountByUsername(@Param("username") String username);

	@Select("select count(1) from user where number = #{number}")
    Long selectCountByNumber(@Param("number") String number);

	@Update("update user set valid_time = #{validTime} where id = #{userId}")
	Long updateValidTimeByUserId(@Param("userId") Integer userId,@Param("validTime") Date validTime);

	@Update("update user set total_quota=#{i}, quota_count=#{i} where id = #{userId}")
    void updateQuotaByUserId(@Param("userId") int userId,@Param("i") int i);

	int updateOpenedQuotaCount(@Param("userId") int userId , @Param("count")int count );
}
