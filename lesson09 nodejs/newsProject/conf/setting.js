//数据库配置文件
module.exports = {
	protocol: 'mysql',
	host: 'localhost',   
	port: '3306',
	user: 'root',
	password: 'root',
	database: 'bdnews',  //连接的数据库名
	query: {
		pool: true   //是否启动缓存池
	}
};