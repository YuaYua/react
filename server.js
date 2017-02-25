var http=require('http');
var url=require('url');
var mongoose=require('mongoose');
var db = mongoose.connect("mongodb://127.0.0.1:27017/user");
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("数据库连接成功");
});

var PersonSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    gender:{type:String}
},{
    collection:'child'
});

var Model = db.model("child",PersonSchema);

var server=http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true);
    if(urlObj.pathname=="/users"){
        Model.find({},function (err,docs) {
            if(err){
                console.log(err);
            }else{
                // console.log(docs);
                var json=JSON.stringify(docs);
                var cb=urlObj.query.ccc;
                res.end(cb+"("+json+")");

            }

        })
    }


}).listen(9090);