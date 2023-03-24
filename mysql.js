// var mysql = require('mysql');
// var pool  = mysql.createPool({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '',
//   database:'dc_member', // 前面建的user表位于这个数据库中
//   pool_size:50
// });
 
// let query = function( sql, values ) {

//   return new Promise(( resolve, reject ) => {
//     pool.getConnection(function(err, connection) {
//       if (err) {
//         resolve( err )
//       } else {
//         connection.query(sql, values, ( err, rows) => {

//           if ( err ) {
//             reject( err )
//           } else {
//             resolve( rows )
//           }
//           connection.release()
//         })
//       }
//     })
//   })

// }
