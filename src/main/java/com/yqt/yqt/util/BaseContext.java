package com.yqt.yqt.util;

/**
 * 线程变量保存登录用户id
 */
public class BaseContext {
    private static ThreadLocal<Integer> threadLocal = new ThreadLocal<>();
    private static ThreadLocal<Integer> skThreadLocal = new ThreadLocal<>();
    /**
     * id
     * @param id
     */
    public static void setCurrentId(Integer id){
        //往线程里塞入局部变量 id
        threadLocal.set(id);
    }
    /**
     * id
     * @return
     */
    public static Integer getCurrentId(){
        //获取线程里局部变量
        return threadLocal.get();
    }
    public static void setSkCurrentId(Integer id){
        //往线程里塞入局部变量 id
        skThreadLocal.set(id);
    }
    /**
     * id
     * @return
     */
    public static Integer getSkCurrentId(){
        //获取线程里局部变量
        return skThreadLocal.get();
    }
}