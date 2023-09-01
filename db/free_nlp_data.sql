/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50724 (5.7.24)
 Source Host           : localhost:3306
 Source Schema         : free_nlp_data

 Target Server Type    : MySQL
 Target Server Version : 50724 (5.7.24)
 File Encoding         : 65001

 Date: 01/09/2023 14:41:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密码',
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'logo地址',
  `abbreviation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '公司简称',
  `authorization_document` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '授权文件',
  `copyright` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '底部版权信息',
  `system_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '系统名称',
  `system_brief_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '系统简称',
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '企业名称',
  `create_date` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_date` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'MTIzNDU2', '/file/admin/6d28b359-5541-43a3-baf1-fd35f2339f2d.png', '思通数科', '2024-02-23 00:00:00', '@2021-2023 南京涌亿思信息技术有限公司 苏ICP备17066984号-1', '自然语言处理&人工智能文本挖掘引擎', '思通', '南京涌亿思信息技术有限公司', '2023-02-06 18:09:32', '2023-05-25 09:44:56');

-- ----------------------------
-- Table structure for api_info
-- ----------------------------
DROP TABLE IF EXISTS `api_info`;
CREATE TABLE `api_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '接口名称',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '接口地址',
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '接口类型',
  `create_date` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `is_delete` int(11) NOT NULL DEFAULT 0 COMMENT '逻辑删除（0：未删除；1：删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 90 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of api_info
-- ----------------------------

-- ----------------------------
-- Table structure for log_info
-- ----------------------------
DROP TABLE IF EXISTS `log_info`;
CREATE TABLE `log_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '调用人user_id',
  `api_id` int(11) NULL DEFAULT NULL COMMENT '调用接口id',
  `call_time` datetime NULL DEFAULT NULL COMMENT '调用时间',
  `ip` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '调用ip',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19429 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of log_info
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密码',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '企业',
  `concurrency` int(11) NULL DEFAULT 0 COMMENT '每秒并发请求',
  `quota_count` int(11) NULL DEFAULT 0 COMMENT '调用配额次数',
  `sample_count` int(11) NULL DEFAULT 0 COMMENT '训练样本数量',
  `storage` int(11) NULL DEFAULT 0 COMMENT '存储空间',
  `status` int(11) NULL DEFAULT NULL COMMENT '状态（1：未屏蔽  0：屏蔽）',
  `admin_id` int(11) NULL DEFAULT 1 COMMENT '创建人id',
  `create_date` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_date` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `secret_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '接口验证信息id',
  `secret_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '接口验证信息key',
  `is_power` int(11) NOT NULL DEFAULT 0 COMMENT '引擎配置权限 0默认无权限 , 1有权限',
  `is_delete` int(11) NULL DEFAULT NULL COMMENT '逻辑删除（1：未删除  0：删除）',
  `abbreviation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '公司简称\n',
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'logo地址',
  `copyright` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '底部版权信息',
  `system_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '系统名称',
  `system_brief_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '系统简称',
  `total_quota` int(10) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000000000,
  `valid_time` datetime NULL DEFAULT NULL COMMENT '有效时间',
  `number` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  INDEX `user`(`is_delete`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 126 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'user', 'MTIzNDU2', 'user', '南京涌亿思', 10000, 107557, 10000, 2000, 1, 1, '2023-02-06 18:06:32', '2023-07-25 21:06:07', '38116f86-bc5b-48ab-b460-1a9156d81cfe', 'b829cca00991c7785f531e0ffd4c1d0e', 1, 1, '思通数科', '/file/admin/6b36853b-c802-412e-88ef-d02a8ce1e0c2.png', '@2014-2023 南京涌亿思信息技术有限公司 苏ICP备17066984号-2', NULL, NULL, 0000097226, '2026-02-18 13:43:13', NULL);

-- ----------------------------
-- Table structure for user_api
-- ----------------------------
DROP TABLE IF EXISTS `user_api`;
CREATE TABLE `user_api`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `api_id` int(11) NULL DEFAULT NULL COMMENT '接口id',
  `api_authority` int(11) NULL DEFAULT NULL COMMENT '接口权限（1：已开通  0：未开通）',
  `invoke_count` int(11) NULL DEFAULT 0 COMMENT '调用次数',
  `create_date` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `total_count` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '接口额度',
  `is_delete` int(11) NOT NULL DEFAULT 0 COMMENT '逻辑删除（0：未删除；1：删除)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5731 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_api
-- ----------------------------

-- ----------------------------
-- Table structure for user_api_fail_log
-- ----------------------------
DROP TABLE IF EXISTS `user_api_fail_log`;
CREATE TABLE `user_api_fail_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `api_id` int(11) NULL DEFAULT NULL COMMENT '接口id',
  `failed_count` int(11) NULL DEFAULT NULL COMMENT '调用接口失败次数',
  `create_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 62 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_api_fail_log
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
