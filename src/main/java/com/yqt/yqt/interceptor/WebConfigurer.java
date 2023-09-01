package com.yqt.yqt.interceptor;

import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.serializer.ToStringSerializer;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import com.github.xiaoymin.knife4j.spring.annotations.EnableKnife4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

/**
 * 配置
 */
@Configuration
@EnableKnife4j
public class WebConfigurer implements WebMvcConfigurer {
    //登录拦截
    @Autowired
    private NlpHandlerInterceptor nlpHandlerInterceptor;

    //调用拦截
    @Autowired
    private AppHandlerInterceptor appHandlerInterceptor;

    // 配置静态资源的，比如html，js，css，等等
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        WebMvcConfigurer.super.addResourceHandlers(registry);
        registry.addResourceHandler("/pdf/**")
			.addResourceLocations("file:/");
    }

    // 注册拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        //登录拦截
        registry.addInterceptor(nlpHandlerInterceptor)
                .addPathPatterns("/user/**")
                .addPathPatterns("/userConfig/**")
                .addPathPatterns("/self/**")
                .addPathPatterns("/object/**")
                .addPathPatterns("/customizeApi")
                .addPathPatterns("/self_classify/**");


        //调用拦截
        registry.addInterceptor(appHandlerInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/customizeApi")
                .excludePathPatterns("/login")
                .excludePathPatterns("/register")
                .excludePathPatterns("/exist")
                .excludePathPatterns("/jumpLogin")
                .excludePathPatterns("/user/**")
                .excludePathPatterns("/self/**")
                .excludePathPatterns("/getAllApiInfo")
//                .excludePathPatterns("/self_classify/**")
                .excludePathPatterns("/admin/**")
                .excludePathPatterns("/userConfig/**")
//                .excludePathPatterns("/markedIdentify")
                .excludePathPatterns("/logout")
                .excludePathPatterns("/home/**")
                .excludePathPatterns("/pptToPdf")
                .excludePathPatterns("/sendCode")
                .excludePathPatterns("/logon")
                .excludePathPatterns("/logonCode")
                .excludePathPatterns("/admin/*")
                .excludePathPatterns("/self/model/update")
                .excludePathPatterns("/jumpLogin")
                .excludePathPatterns("/object/**")
                .excludePathPatterns("/doc.html","/swagger-ui/**","/webjars/**","/swagger-resources/**","/v2/**");


    }


    /**
     * @param converters
     * @return void
     * @description: 利用fastJson替换掉jackson，且解决中文乱码问题,解决Java中的long到js中精度丢失的问题 <br>
     */

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        fastJsonConfig.setSerializerFeatures(
                SerializerFeature.DisableCircularReferenceDetect,
                SerializerFeature.WriteMapNullValue,
                SerializerFeature.WriteNullNumberAsZero,
                SerializerFeature.WriteNullStringAsEmpty,
                SerializerFeature.WriteNullListAsEmpty,
                SerializerFeature.WriteNullBooleanAsFalse,
                SerializerFeature.WriteNonStringKeyAsString,
                SerializerFeature.BrowserCompatible);

        //解决Long转json精度丢失的问题
        SerializeConfig serializeConfig = SerializeConfig.globalInstance;
        serializeConfig.put(BigInteger.class, ToStringSerializer.instance);
        serializeConfig.put(Long.class, ToStringSerializer.instance);
        serializeConfig.put(Long.TYPE, ToStringSerializer.instance);
        fastJsonConfig.setSerializeConfig(serializeConfig);

        //处理中文乱码问题
        List<MediaType> fastMediaTypes = new ArrayList<>();
        fastMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
        fastConverter.setSupportedMediaTypes(fastMediaTypes);
        fastConverter.setFastJsonConfig(fastJsonConfig);
        converters.add(fastConverter);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/", "/login");
    }

    //配置Swagger的Docket的bean实例
    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())//配置Swagger信息
                .enable(true)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.yqt.yqt.controller"))
                .build();
    }

    //配置Swagger信息
    private ApiInfo apiInfo() {
        return new ApiInfo(
                "思通数科-NLP系统",
                "自然语言处理文本挖掘引擎系统 Swagger API文档",
                "1.0",//版本信息
                "http://www.stonedt.com",//团队信息的url
                new Contact("思通数科", "http://www.stonedt.com", "huangyi@stonedt.com"),//作者信息
                /*Contact(String name, String url, String email)*/
                "Apache 2.0",
                "http://www.apache.org/licenses/LICENSE-2.0",
                new ArrayList<VendorExtension>());
    }

}
