// // import path from 'path'
// // import multer from 'multer'
// // var storage=multer.diskStorage({
// //     destination:function(req,file,cb){
// //         cb(null,'uploads/')
// //     },
// //     filename:function(req,file,cb){
// //         let ext =path.extname(file.originalname)
// //         cb(null,Date.now()+ext)
// //     }
// // }) 
// // export var upload=multer({
// //     storage:storage,
// //     fileFilter:function(req,file,cb){
// //         if(file.mimetype=="image/png" || file.mimetype=="image/jpeg"){
// //             cb(null,true)
// //         }else{
// //             console.log('only jpg and png are supported')
// //             cb(null,false)
// //         }
// //     },
// //     limits:{
// //         fileSize:1024*1024*2
// //     }
// // })
// import path from 'path'; // Import the 'path' module

// import multer from 'multer';

// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function(req, file, cb) {
//         let ext = path.extname(file.originalname); // Now 'path' is imported and can be used
//         cb(null, Date.now() + ext);
//     }
// });

// export var upload = multer({
//     storage: storage,
//     fileFilter: function(req, file, cb) {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             console.log('only jpg and png are supported');
//             cb(null, false);
//         }
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2
//     }
// });

