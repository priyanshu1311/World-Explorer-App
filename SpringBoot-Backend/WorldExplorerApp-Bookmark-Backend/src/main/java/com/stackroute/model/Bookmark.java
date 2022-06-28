package com.stackroute.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="bookmarks")
public class Bookmark {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bookmarkId;

	private String emailId;
	private String title;
	
	 @Column(name="image", length=1000000,columnDefinition = "mediumtext")
	private String image;
	 

	
	public Bookmark() {
		super();
	}

	public Bookmark(  String emailId, String title,String image) {
		super();
	

		this.emailId = emailId;
		this.title = title;
		this.image=image;
	
	}





	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Long getBookmarkId() {
		return bookmarkId;
	}


	public void setBookmarkId(Long bookmarkId) {
		this.bookmarkId = bookmarkId;
	}





	public String getEmailId() {
		return emailId;
	}


	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


}