CREATE database webdb character set utf8 default collate utf8mb3_general_ci;

use webdb;

#int타입은 최대 10자리까지만 담을 수 있다.
#n_no : Date.now() -> 13자리값 ->bigint로 사용

#테이블을 삭제할 때 DDL
drop table notice;

create table notice(
	n_no bigint auto_increment primary key,
	n_title varchar(50),
	n_writer varchar(30),
	n_content varchar(500)
	);
	
insert into notice(n_title, n_writer, n_content)
values('제목1','작성자1','내용1');

insert into notice(n_title, n_writer, n_content)
values('제목2','작성자2','내용2');

insert into notice(n_title, n_writer, n_content)
values('제목3','작성자3','내용3');

commit;

use webdb;

select * from notice;

create table react_board(
	b_no int auto_increment primary key,
	b_title varchar(100),
	b_writer varchar(30),
	b_content text,
	b_hit int default 0,
	b_date varchar(20)
)

insert into react_board(b_title, b_writer, b_content, b_date)
values('제목1','작성자1','내용1', curdate());

insert into react_board(b_title, b_writer, b_content, b_date)
values('제목2','작성자2','내용2', curdate());

insert into react_board(b_title, b_writer, b_content, b_date)
values('제목3','작성자3','내용3', curdate());

commit;

use webdb;

select * from react_board;

