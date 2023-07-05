import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";

import prisma from "../database";

export async function getBooks() {
	const result = await prisma.books.findMany();
	return result;
}

export async function getBook(id: number) {
	const result = await prisma.books.findFirst({
		where: {
			id: id,
		},
	});
	return result;
}

export async function createBook(book: CreateBook) {
	const { title, author, publisher, purchaseDate } = book;

	const result = await prisma.books.create({
		data: {
			title: title,
			author: author,
			publisher: publisher,
			purchaseDate: purchaseDate,
		},
	});

	return result;
}

export async function reviewBook(bookReview: CreateReview) {
	const { bookId, grade, review } = bookReview;

	const result = await prisma.books.update({
		where: { id: bookId },
		data: {
			grade: grade,
			review: review,
			read: true,
		},
	});

	return result;
}
