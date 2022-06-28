package com.stackroute.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.stackroute.exception.UserAlreadyExistsException;
import com.stackroute.model.User;

public interface UserService {
	public User registerUser(User user) throws UserAlreadyExistsException;
	public User authenticateUser(String emailId,String password);
	public boolean isAuthenticated();
	public User getByEmail(String email);
	public boolean removeUser(String emailId);
	public ResponseEntity<User> getUserByEmail(String emailId);
	public User updateUser(User user);
	public List<User> findAll();
}
