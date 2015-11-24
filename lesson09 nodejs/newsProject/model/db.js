var orm = require('orm');
var opts = require('../conf/setting');
var db = orm.connect(opts, function(err, db) { //获得数据库对象
	if (err) throw err;
	return db;
});

var model = {}; //创建模型对象

model.list = db.define('bd_list', { //创建list表映射
	news_title: String,
	news_content: String,
	news_img: String,
	news_type_id: Number,
	news_label_id: Number,
	news_time: String
}, {
	methods: {
		news_timeNow: function() {   //通过此方法将时间戳返回日期时间
			var d = new Date();
			d.setTime(this.news_time);
			return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
		}
	}
});

model.type = db.define('bd_type', { //type表映射
	news_type_name: String
});

model.label = db.define('bd_label', { //label表映射
	news_label_name: String
});

model.list.hasOne('news_type', model.type, {
	autoFetch: true
}); //外键模型 在原list对象上加载外键type数据   autoFetch参数表示自动将外键值加入list数据中
model.list.hasOne('news_label', model.label, {
	autoFetch: true
}); //外键模型 在原list对象上加载外键label数据

model.user = db.define('bd_user', { //user表映射
	username: String,
	password: String,
	status:String
});

module.exports = model;