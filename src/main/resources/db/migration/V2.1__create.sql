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

 Date: 27/10/2023 15:13:13
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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'MTIzNDU2', '/file/admin/6d28b359-5541-43a3-baf1-fd35f2339f2d.png', '思通数科', '2024-02-23 00:00:00', '@2027-2023 南京涌亿思信息技术有限公司 苏ICP备17066984号-1', '自然语言处理&人工智能文本挖掘引擎', '思通', '南京涌亿思信息技术有限公司', '2023-02-06 18:09:32', '2023-05-25 09:44:56');

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
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of api_info
-- ----------------------------
INSERT INTO `api_info` VALUES (4, '高频词提取', '/keywords', '篇章级', '2023-02-08 17:20:44', 0);
INSERT INTO `api_info` VALUES (5, '情感分析', '/sentiment', '篇章级', '2023-02-08 17:21:28', 0);
INSERT INTO `api_info` VALUES (6, '招标抽取', '/extractBidding', '篇章级', '2023-02-08 17:21:59', 0);
INSERT INTO `api_info` VALUES (7, '合同抽取', '/extractContract', '篇章级', '2023-02-08 17:23:19', 0);
INSERT INTO `api_info` VALUES (8, '法律文书', '/extractJudgment', '篇章级', '2023-02-08 17:23:56', 0);
INSERT INTO `api_info` VALUES (9, '简历抽取', '/extractResume', '篇章级', '2023-02-08 17:24:29', 0);
INSERT INTO `api_info` VALUES (10, '观点抽取', '/extractAppraise', '篇章级', '2023-02-08 17:24:59', 0);
INSERT INTO `api_info` VALUES (12, '事件抽取', '/extractEvent', '篇章级', '2023-02-08 17:26:52', 0);
INSERT INTO `api_info` VALUES (13, '关系抽取', '/extractRelations', '篇章级', '2023-02-08 17:27:12', 0);
INSERT INTO `api_info` VALUES (22, '通用分类', '/classify', '句法级', '2023-02-08 17:32:30', 0);
INSERT INTO `api_info` VALUES (23, '通用识别', '/NER', '句法级', '2023-02-08 17:33:45', 0);
INSERT INTO `api_info` VALUES (24, '机构识别', '/NER_ORG', '句法级', '2023-02-08 17:35:23', 0);
INSERT INTO `api_info` VALUES (26, '主题抽取', '/topic', '句法级', '2023-02-08 17:36:28', 0);
INSERT INTO `api_info` VALUES (27, '自动摘要', '/summary', '句法级', '2023-02-08 17:37:07', 0);
INSERT INTO `api_info` VALUES (28, '通用查找', '/similarity', '句法级', '2023-02-08 17:37:36', 0);
INSERT INTO `api_info` VALUES (30, '词性标注', '/lac', '词汇级', '2023-02-08 17:40:41', 0);
INSERT INTO `api_info` VALUES (32, '合规检测', '/censor_detection', '词汇级', '2023-02-08 17:42:44', 0);
INSERT INTO `api_info` VALUES (39, '文本纠错', '/textCorrection', '词汇级', '2023-02-22 13:52:33', 0);
INSERT INTO `api_info` VALUES (49, '自定义抽取', '/extract', '篇章级', '2023-03-16 10:50:09', 0);
INSERT INTO `api_info` VALUES (58, '文本对比', '/text_comparison', '篇章级', '2023-05-05 21:21:16', 0);

-- ----------------------------
-- Table structure for check_info
-- ----------------------------
DROP TABLE IF EXISTS `check_info`;
CREATE TABLE `check_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '数据内容',
  `data_type` int(11) NULL DEFAULT 0 COMMENT '违规类型,0:违规素材，1:违规短语',
  `expression` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标注短语对应正则表达式',
  `tag_id` int(11) NULL DEFAULT NULL COMMENT '标注结果id',
  `is_tag` int(11) NULL DEFAULT 0 COMMENT '是否标注，默认未标注，0:未标注，1:已标注',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3679 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of check_info
-- ----------------------------

-- ----------------------------
-- Table structure for check_result
-- ----------------------------
DROP TABLE IF EXISTS `check_result`;
CREATE TABLE `check_result`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `result_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标记结果名称',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `background_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '创建用户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of check_result
-- ----------------------------

-- ----------------------------
-- Table structure for flyway_schema_history
-- ----------------------------
DROP TABLE IF EXISTS `flyway_schema_history`;
CREATE TABLE `flyway_schema_history`  (
  `installed_rank` int(11) NOT NULL,
  `version` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `script` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `checksum` int(11) NULL DEFAULT NULL,
  `installed_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int(11) NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`) USING BTREE,
  INDEX `flyway_schema_history_s_idx`(`success`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of flyway_schema_history
-- ----------------------------
INSERT INTO `flyway_schema_history` VALUES (1, '1', '<< Flyway Baseline >>', 'BASELINE', '<< Flyway Baseline >>', NULL, 'root', '2023-09-20 12:30:32', 0, 1);
INSERT INTO `flyway_schema_history` VALUES (2, '2', 'create', 'SQL', 'V2__create.sql', 993872608, 'root', '2023-10-11 13:48:39', 106, 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of log_info
-- ----------------------------
INSERT INTO `log_info` VALUES (1, 1, 22, '2023-09-21 16:22:07', '172.19.16.1');
INSERT INTO `log_info` VALUES (2, 1, 22, '2023-09-21 16:22:38', '172.19.16.1');
INSERT INTO `log_info` VALUES (3, 1, 22, '2023-09-21 16:27:44', '172.19.16.1');
INSERT INTO `log_info` VALUES (4, 1, 22, '2023-09-21 16:29:01', '172.19.16.1');
INSERT INTO `log_info` VALUES (5, 1, 22, '2023-09-21 16:30:21', '172.19.16.1');
INSERT INTO `log_info` VALUES (6, 1, 22, '2023-09-21 16:31:38', '172.19.16.1');

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'user', 'MTIzNDU2', 'user', '南京涌亿思', 10000, 107556, 10000, 2000, 1, 1, '2023-02-06 18:06:32', '2023-09-21 16:31:42', '5e6b7f96-8a6d-41ee-9524-4035411c539f', '79e7289cd78a8188fe47fce1dd86cefa', 1, 1, '思通数科', '/file/admin/6b36853b-c802-412e-88ef-d02a8ce1e0c2.png', '@2014-2023 南京涌亿思信息技术有限公司 苏ICP备17066984号-2', NULL, NULL, 0000097226, '2026-02-18 13:43:13', NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_api
-- ----------------------------
INSERT INTO `user_api` VALUES (1, 1, 5, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (2, 1, 6, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (3, 1, 7, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (4, 1, 8, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (5, 1, 9, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (6, 1, 22, 1, 2, '2023-02-08 17:57:47', 999, 0);
INSERT INTO `user_api` VALUES (7, 1, 58, 1, 1, '2023-05-05 21:22:02', 1000, 0);
INSERT INTO `user_api` VALUES (9, 1, 4, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (10, 1, 10, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (11, 1, 12, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (12, 1, 13, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (13, 1, 23, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (14, 1, 24, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (15, 1, 26, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (16, 1, 27, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (17, 1, 28, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (18, 1, 30, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (19, 1, 49, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (20, 1, 32, 1, 1, '2023-02-08 17:57:46', 1000, 0);
INSERT INTO `user_api` VALUES (21, 1, 39, 1, 1, '2023-02-08 17:57:46', 1000, 0);

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_api_fail_log
-- ----------------------------
INSERT INTO `user_api_fail_log` VALUES (1, 1, 22, 5, '2023-09-21 16:30:24', '2023-09-21 16:30:24');

-- ----------------------------
-- Table structure for violation_word
-- ----------------------------
DROP TABLE IF EXISTS `violation_word`;
CREATE TABLE `violation_word`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `label_id` int(11) NULL DEFAULT NULL COMMENT '违规词标签ID',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '违规词内容',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_delete` int(11) NULL DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of violation_word
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
