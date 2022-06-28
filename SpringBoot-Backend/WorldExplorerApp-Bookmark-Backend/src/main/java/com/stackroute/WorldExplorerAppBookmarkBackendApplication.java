package com.stackroute;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@EnableDiscoveryClient
@SpringBootApplication
@PropertySource("classpath:dbconfig.properties")
@RestController
public class WorldExplorerAppBookmarkBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorldExplorerAppBookmarkBackendApplication.class, args);
	}
	
	  @RequestMapping(value = "/")
	   public String home() {
	      return "Eureka Bookmark Client application";
	   }

}
