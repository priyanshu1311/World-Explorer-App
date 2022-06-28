package com.stackroute.service;

import java.util.List;
import com.stackroute.model.Bookmark;

public interface BookmarkService {

	public Bookmark saveBookmark(Bookmark b);
	public List<Bookmark> getAllBookmarks();
	public Bookmark deleteFromBookmarks(Long id);
	
	public List<Bookmark> getBookmarksByEmailId(String emailId);
	
}