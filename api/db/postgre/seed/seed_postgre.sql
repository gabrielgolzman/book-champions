-- create database
create database book_champions;

\c book_champions

-- create tables
create table if not exists authors (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table if not exists books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  publisher text,
  page_count integer,
  rating numeric(2,1),
  cover text,
  is_available boolean default true
);

create table if not exists book_authors (
  book_id uuid not null references books(id) on delete cascade,
  author_id uuid not null references authors(id) on delete cascade,
  primary key (book_id, author_id)
);

-- insert data
insert into authors (name) values ('J.R.R. Tolkien');
insert into authors (name) values ('J.K. Rowling');

insert into books (title, publisher, page_count, rating, cover, is_available)
values ('The Fellowship of the Ring', 'Allen & Unwin', 423, 4.8, 'fellowship-of-the-ring.jpg', true);

insert into books (title, publisher, page_count, rating, cover, is_available)
values ('Harry Potter and the Philosopher''s Stone', 'Bloomsbury', 223, 4.7, 'philosophers-stone.jpg', true);

insert into book_authors (book_id, author_id)
select b.id, a.id from books b, authors a
where b.title = 'The Fellowship of the Ring' and a.name = 'J.R.R. Tolkien';

insert into book_authors (book_id, author_id)
select b.id, a.id from books b, authors a
where b.title = 'Harry Potter and the Philosopher''s Stone' and a.name = 'J.K. Rowling';

