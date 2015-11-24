<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {

	public function index() {
		$this->display();
	}
    
   public function newspage($page){      //通过传入的page变量判断输出是哪个板块的页面
	    $m=M('List');
		$data['news_type']=$page;         
		$arr=$m->where($data)->order('news_time desc')->select();
		
		$exFn=new IndexController();   //thinkphp中调用公有方法 timeStep
		$arr=$exFn->timeStep($arr);   //返回新带有time间隔时间的数组
		
		$this->assign('arrList',$arr);
	    $this->display();
   }

    //计算时间差距函数
    public function timeStep($arr){
    	for($i=0;$i<count($arr);$i++){
			$seconds=time()-strtotime($arr[$i]['news_time']); //计算现在时间与创建事件的秒差距
			
		if($seconds > 86400) {
                $result= floor($seconds / 86400).'天前';
        } elseif($seconds > 3600) {
                $result=floor($seconds / 3600).'小时前';
        } elseif($seconds > 60) {
                $result =floor($seconds / 60).'分钟前';
        } else {
                $result= $seconds.'秒前';
        }

		   $arr[$i]['time_after']=$result;    //数组中增加新的差距时间字段
		}
        return $arr;		
    }  

}
