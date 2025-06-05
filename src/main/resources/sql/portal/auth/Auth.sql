drop table if exists ex_relation;

create table ex_relation
(
    id           int primary key auto_increment,
    account_name varchar(20),
    password     varchar(50),
    center       varchar(30),
    created_at   datetime default now()
);

insert into ex_relation (account_name, password, center)
values ('t001', '1111', 'job');

insert into ex_relation (account_name, password, center)
values ('t002', '1111', 'barrierFree');

insert into ex_relation (account_name, password, center)
values ('t003', '1111', 'internship');

insert into ex_relation (account_name, password, center)
values ('t004', '1111', 'residence');

insert into ex_relation (account_name, password, center)
values ('t005', '1111', 'lifeEduStudent');

insert into ex_relation (account_name, password, center)
values ('t006', '1111', 'lifeEduInstructor');


drop table if exists administrator;

create table administrator
(
    id           int primary key auto_increment,
    admin_id     varchar(20),
    password     varchar(50),
    name         varchar(20),
    register_id  varchar(16),
    birth        date,
    email        varchar(50),
    phone        varchar(20),
    address      varchar(50),
    id_photo_loc varchar(500),
    center       varchar(30),
    created_at   datetime default now()
);

insert into administrator (admin_id, password, name, register_id, birth, email, phone, address, id_photo_loc, center)
values ('a001', '1111', '홍길동', '20000101-3111111', '2000-01-01', 'a001@gmail.com', '010-1111-2222', '어딘가', '증명사진 주소',
        'job');


drop table if exists student;

create table student
(
    id            int primary key auto_increment,
    major         int,
    sub_major     int  default null,
    student_id    varchar(20),
    password      varchar(50),
    name          varchar(20),
    register_id   varchar(16),
    birth         date,
    email         varchar(50),
    phone         varchar(20),
    address       varchar(50),
    id_photo_loc  varchar(500),
    entrance_date date,
    status        varchar(5),
    grade         int,
    created_at    date default now()
);

insert into student (student_id, password)
values ('s001', '1111');