import { Book } from "./book.entity.js";

export const BOOKS_MOCK: Book[] = [
    new Book("The Lord of the Rings", ["J.R.R. Tolkien"], "Allen & Unwin", 1178, 4.9, "https://covers.example.com/lord-of-the-rings.jpg", true, "a1b2c3d4-e5f6-7890-abcd-ef1234567890"),
    new Book("The Hobbit", ["J.R.R. Tolkien"], "Allen & Unwin", 310, 4.8, "https://covers.example.com/the-hobbit.jpg", true, "b2c3d4e5-f6a7-8901-bcde-f12345678901"),
    new Book("A Wizard of Earthsea", ["Ursula K. Le Guin"], "Parnassus Press", 205, 4.6, "https://covers.example.com/wizard-of-earthsea.jpg", false, "c3d4e5f6-a7b8-9012-cdef-123456789012"),
    new Book("The Sword of Shannara", ["Terry Brooks"], "Del Rey", 726, 4.3, "https://covers.example.com/sword-of-shannara.jpg", true, "d4e5f6a7-b8c9-0123-defa-234567890123"),
    new Book("The Last Unicorn", ["Peter S. Beagle"], "Viking Press", 212, 4.7, "https://covers.example.com/the-last-unicorn.jpg", false, "e5f6a7b8-c9d0-1234-efab-345678901234"),
    new Book("Conan the Barbarian", ["Robert E. Howard"], "Gnome Press", 224, 4.4, "https://covers.example.com/conan-the-barbarian.jpg", true, "f6a7b8c9-d0e1-2345-fabc-456789012345"),
    new Book("The Once and Future King", ["T.H. White"], "Collins", 677, 4.5, "https://covers.example.com/once-and-future-king.jpg", false, "a7b8c9d0-e1f2-3456-abcd-567890123456"),
];
