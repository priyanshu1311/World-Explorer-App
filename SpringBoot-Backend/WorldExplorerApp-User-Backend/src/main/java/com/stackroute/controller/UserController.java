package com.stackroute.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import javax.mail.*;
import javax.mail.internet.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.exception.UserAlreadyExistsException;
import com.stackroute.model.User;
import com.stackroute.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController {

	private static Logger logger = LoggerFactory.getLogger(UserController.class);

	User user = new User();

	@Autowired
	private UserService userService;
	
	
	@GetMapping("/register")
	public List<User>  getAllUser(){
		return userService.findAll();
	}

	@PostMapping("/addNewUser")
	public ResponseEntity<?> addNewUser(@RequestBody User user) {
		try {
			logger.info("Inside the register user try block");
			User u = userService.registerUser(user);
			logger.info("User has been registered");
			
			return new ResponseEntity<User>(u, HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			logger.error(e.getMessage());
		}
		logger.debug("User creation failed");
		return new ResponseEntity<String>("Failed to create user", HttpStatus.CONFLICT);
	}

	@GetMapping("/findUserByEmail/{token}")
	public ResponseEntity<User> findUserByEmail(@PathVariable String token) {
		logger.info("inside findUserByEmail method");
		Claims claim = Jwts.parser().setSigningKey("usersecretkey").parseClaimsJws(token).getBody();
		logger.info("claim has been set");
		return new ResponseEntity<>(userService.getByEmail(claim.getId()), HttpStatus.OK);
	}

	@PostMapping("/loginUser")
	public ResponseEntity<?> loginUser(@ModelAttribute("email") String email,
			@ModelAttribute("password") String password) {
		logger.info("inside the loginUser method");
		User user = userService.authenticateUser(email, password);
		logger.info("User with email and password has been fetched");
		if (user != null) {
			String token = Jwts.builder().setId(user.getEmailId()).setSubject(user.getUserName())
					.setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256, "usersecretkey").compact();
			logger.info("Build the token for the user");
			
			// Add it to a Map and send the map in response body
			Map<String, String> map1 = new HashMap<String, String>();
			map1.put("token", token);
			map1.put("image", user.getImage());
			logger.info("token and image has been set");

			ResponseEntity<Map<String, String>> response = new ResponseEntity<Map<String, String>>(map1, HttpStatus.OK);
			return response;
		}
		logger.debug("Login has failed!");
		return new ResponseEntity<String>("Login failed!", HttpStatus.UNAUTHORIZED);
	}

	@PutMapping("/updateUser")
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		logger.info("inside updateUser method");
		User u = userService.updateUser(user);
		logger.info("user has been updated");
		return new ResponseEntity<>(u, HttpStatus.OK);
	}

	@DeleteMapping("/deleteUser/{token}")
	public ResponseEntity<String> deleteUser(@PathVariable String token) {
		logger.info("inside the deleteUser method");
		Claims claim = Jwts.parser().setSigningKey("usersecretkey").parseClaimsJws(token).getBody();
		logger.info("claim has been set");

		userService.removeUser(claim.getId());
		logger.info("user has been removed");
		return new ResponseEntity<>("Successfully Deleted", HttpStatus.OK);
	}

	
}