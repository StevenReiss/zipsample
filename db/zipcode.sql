create table zcta (
    zip char(5) primary key,
    city varchar(64),
    state char(2),
    lat double,
    long double,
    tz
	
    type char(1),
    timezone int
);

