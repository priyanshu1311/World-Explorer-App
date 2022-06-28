package com.stackroute.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stackroute.model.User;

public interface UserRepository extends JpaRepository<User, String> {
	public void deleteByEmailId(String emailId);
}
