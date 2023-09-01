package com.yqt.yqt.util;

import sun.misc.BASE64Decoder;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

/**
 * 数据存储是调用  讨论是否封装成方法
 * @author Administrator
 *
 */
public class GZIPUtils {
	/**
	 * 使用gzip压缩字符串
	 * @param str 要压缩的字符串
	 * @return
	 */
	public static String compress(String str) {
	    if (str == null || str.length() == 0) {
	        return str;
	    }
	    ByteArrayOutputStream out = new ByteArrayOutputStream();
	    GZIPOutputStream gzip = null;
	    try {
	        gzip = new GZIPOutputStream(out);
	        gzip.write(str.getBytes());
	    } catch (IOException e) {
	        e.printStackTrace();
	    } finally {
	        if (gzip != null) {
	            try {
	                gzip.close();
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	    return new sun.misc.BASE64Encoder().encode(out.toByteArray());
	}
	 
	/**
	 * 使用gzip解压缩
	 * @param compressedStr 压缩字符串
	 * @return
	 */
	public static String uncompress(String compressedStr) {
	    if (compressedStr == null) {
	        return null;
	    }
	 
	    ByteArrayOutputStream out = new ByteArrayOutputStream();
	    ByteArrayInputStream in = null;
	    GZIPInputStream ginzip = null;
	    byte[] compressed = null;
	    String decompressed = null;
	    try {
	        compressed = new BASE64Decoder().decodeBuffer(compressedStr);
	        in = new ByteArrayInputStream(compressed);
	        ginzip = new GZIPInputStream(in);
	        byte[] buffer = new byte[1024];
	        int offset = -1;
	        while ((offset = ginzip.read(buffer)) != -1) {
	            out.write(buffer, 0, offset);
	        }
	        decompressed = out.toString();
	    } catch (IOException e) {
	        e.printStackTrace();
	    } finally {
	        if (ginzip != null) {
	            try {
	                ginzip.close();
	            } catch (IOException e) {
	            }
	        }
	        if (in != null) {
	            try {
	                in.close();
	            } catch (IOException e) {
	            }
	        }
	        if (out != null) {
	            try {
	                out.close();
	            } catch (IOException e) {
	            }
	        }
	    }
	    return decompressed;
	}
	 public static String getBASE64(String str) {
	       if (str == null) return null;
	       return (new sun.misc.BASE64Encoder()).encode( str.getBytes());
	  }
	 
	 public static String getFromBASE64(String str) {
	       if (str == null) return null;
	       BASE64Decoder decoder = new BASE64Decoder();
	       try {
	           byte[] b = decoder.decodeBuffer(str);
	           return new String(b);
	       } catch (Exception e) {
	           return null;
	       }
	   }
    public static void main(String[] args) throws IOException {
		String s = "nanjingyongyisixinxijishuyouxiangongsi{2023-02-22 11:00:00}sikeshutongziranyuyuanchulirengongzhinengwenbenwajueyingqing";
        System.out.println("压缩后：：" + compress(s).length());
        System.out.println("解压后：" + uncompress(compress(s)).length());
    }
}