package com.stackroute.exception;

public class BookmarkNotFoundException extends Exception {

	public BookmarkNotFoundException() {
		super();
	}

	public BookmarkNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public BookmarkNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public BookmarkNotFoundException(String message) {
		super(message);
	}

	public BookmarkNotFoundException(Throwable cause) {
		super(cause);
	}
}
