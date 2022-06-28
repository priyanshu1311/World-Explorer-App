package com.stackroute.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.stackroute.model.Bookmark;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

	public List<Bookmark> findByEmailId(String emailId);
}