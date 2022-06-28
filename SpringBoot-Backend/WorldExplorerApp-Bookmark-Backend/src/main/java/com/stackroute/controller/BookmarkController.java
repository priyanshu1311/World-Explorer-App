package com.stackroute.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.model.Bookmark;
import com.stackroute.exception.BookmarkNotFoundException;
import com.stackroute.service.BookmarkService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/bookmarks") 
public class BookmarkController {

	private static Logger logger = LoggerFactory.getLogger(BookmarkController.class);

	@Autowired
	private BookmarkService bookmarkService;

	@PostMapping("/addToBookmarks")  
	public ResponseEntity<?> saveCountryToBookmark(@RequestBody Bookmark b) {
		ResponseEntity<?> response = null;
		boolean flag=false;
		try {
			
			List<Bookmark> ls= bookmarkService.getBookmarksByEmailId(b.getEmailId());
			
			for(Bookmark bm : ls)
			{
					if(bm.getEmailId().equals(b.getEmailId()) && bm.getTitle().equals(b.getTitle()) )
				{
					flag=true;
					
					break;
				}
				
				
			}
			
			if(!flag)
			{
				
			
			Bookmark bk = bookmarkService.saveBookmark(b);
			logger.info("inside the bookmarks  try block");
			
				logger.info("the selected country has been added to the bookmarks section");
				return new ResponseEntity<Bookmark>(bk, HttpStatus.CREATED);
			} else {
				logger.info("the selected country already exists in the bookmarks section");
				response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		} catch (Exception e) {
			logger.debug("there has been some conflict while adding a country to bookmarks section");
			response = ResponseEntity.status(HttpStatus.CONFLICT).build();
		
		}
		return response;
	}

	@GetMapping("/getAllBookmarks")   
	public ResponseEntity<List<Bookmark>> getAllBookmarks() {
		ResponseEntity<List<Bookmark>> response = null;
		logger.info("inside the getAllBookmarks method");
		List<Bookmark> list = bookmarkService.getAllBookmarks();
		response = ResponseEntity.status(HttpStatus.OK).body(list);
		logger.info("all the bookmark  has been fetched successfully");
		return response;
	}

	@GetMapping("/getAllBookmarksByEmailId/{emailId}") 
	public ResponseEntity<List<Bookmark>> getAllBookmarksByEmailId(@PathVariable("emailId") String emailId) {
		logger.info("inside getAllBookmarksByEmailId method");
		List<Bookmark> list = bookmarkService.getBookmarksByEmailId(emailId);
		logger.info("all the bookmarks by the given emailId has been fetched successfully");
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@DeleteMapping("/deleteFromBookmarks/{id}") 
	public ResponseEntity<?> deleteFromBookmarks(@PathVariable("id") Long id) throws BookmarkNotFoundException {
		logger.info("inside deleteFromBookmarks method");
		ResponseEntity<?> response = null;
		bookmarkService.deleteFromBookmarks(id);
		response = ResponseEntity.status(HttpStatus.OK).build();
		logger.info("the bookmark has been deleted by the given gifId");
		return response;
	}
}
