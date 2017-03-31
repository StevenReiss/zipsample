mysql -h eadotc zips << EOF


DROP TABLE IF EXISTS Zips;
DROP TABLE IF EXISTS zcta;

CREATE TABLE Zips (
   zip char(5) primary key,
   city varchar(64),
   state char(2),
   latitude double,
   longitude double,
   tz int,
   dst int
);


LOAD DATA LOCAL INFILE 'zipcode.csv' INTO TABLE Zips FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES;

EOF


ssh eadotc mysqldump -u root zips >! zipdump.sql

scp eadotc:zipdump.sql .
