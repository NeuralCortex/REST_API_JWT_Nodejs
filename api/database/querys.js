const getPayLoad = `
    select
    usr.id,
    usr.fullname,
    (select json_group_array(r.role) from usr_role r where usr.id=r.usrid) as roles
    from usr where usr.id=$1
`

const getData = `
    select * from data order by usrid asc
`

const getDataByUsrid = `
    select * from data where usrid = $1
`

const createData = `
    insert into data (usrid, car, type, ps) values ($1, $2, $3, $4)
`

const updateData = `
    update data set car = $1, type = $2, ps = $3 where id = $4
`

const deleteData = `
    delete from data;
`

const deleteDataSequence = `
    delete from sqlite_sequence where name='data';
`

const deleteDataById = `
    delete from data where id = $1
`

module.exports = {
    getPayLoad,
    getData,
    getDataByUsrid,
    createData,
    updateData,
    deleteData,
    deleteDataSequence,
    deleteDataById
}