package com.stackroute;

import javax.servlet.Filter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.jwtfilter.AuthFilter;

@SpringBootApplication
@PropertySource("classpath:dbconfig.properties")
@RestController
public class App 
{
	@Bean
	public FilterRegistrationBean jwtFilter() {
		FilterRegistrationBean<Filter> bean =
				new FilterRegistrationBean<Filter>();
		bean.setFilter(new AuthFilter());
		bean.addUrlPatterns("/user/authenticate/*");
		return bean;
	}
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
	
	  @RequestMapping(value = "/")
	   public String home() {
	      return "Eureka User Client application";
	   }
}
