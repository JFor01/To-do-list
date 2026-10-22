CREATE TABLE if not exists task(
                                   id integer primary key generated always as identity ,
                                   description varchar(255),
                                   done bool
)