package com.stackroute.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.model.Bookmark;
import com.stackroute.repository.BookmarkRepository;

@Service
public class BookmarkServiceImpl implements BookmarkService {

	@Autowired
	private BookmarkRepository bookmarkRepository;

	@Override
	public Bookmark saveBookmark(Bookmark b) {
		return bookmarkRepository.save(b);
	}

	@Override
	public List<Bookmark> getAllBookmarks() {
		return bookmarkRepository.findAll();
	}

	public Bookmark deleteFromBookmarks(Long id) {
		try {
			
			bookmarkRepository.deleteById(id);
			
		} catch (Exception e) {
			System.out.println(e);
		}
		return null;
	}

	@Override
	public List<Bookmark> getBookmarksByEmailId(String emailId) {
		return bookmarkRepository.findByEmailId(emailId);
	}

}