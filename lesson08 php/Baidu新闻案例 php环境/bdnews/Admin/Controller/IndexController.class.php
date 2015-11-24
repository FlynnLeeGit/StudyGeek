<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function _before_index(){
        if(!$_SESSION['name']){   //判断是否登录没有则跳转到登录界面
            $this->error('还未登录，请登入！',U('Index/login'),2);   //使用U方法跳转到login方法
        }
    }
    public function index() {
        $m = M('List');                                       //获得数据表对象
        $arr = $m -> order('news_time desc') -> select();     //数据按照时间倒序排列
        $count = count($arr);                                 //获取记录总数
        $this -> assign('arrList', $arr);                     //传值给html 数据数组arr传值
        $this -> assign('countList', $count);
        $this->assign('name',$_SESSION['name']);             //传值给html 传送总记录数
        $this -> display();                                   //显示html
    }

    public function login() {
        $this -> display();
    }

    public function userLogin() {
        $m = M('User');
        $username = I('username');
        $password = I('password');
        $data['username'] = $username;
        $data['password'] = $password;
        $arr = $m -> where($data) -> select();
        if ($arr) {
            $_SESSION['name']=$username;
            $this -> redirect('index');
        } else {
            $this -> error('用户名或密码错误 请重新输入', '', 2);
        }
    }

    //用户ajax是否存在判断函数
    public function userAjax() {
        $m = M('User');
        $data['username'] = I('username');
        $arr = $m -> where($data) -> select();
        if ($arr) {
            echo 1;
        } else {
            echo 0;
        }
    }

    //  登出函数
    public function logout() {
        $this -> redirect('login');
    }

    //添加新闻函数
    public function add() {
        $m = D('List');
        //thinkphp model类验证 后台验证标题与内容是否填写
        $bool = $m -> create();
        //thinkphp自动创建函数

        if ($_FILES['news_img']['name']) {
            $exFn = new IndexController();
            //thinkphp 引用共有的imgUpload方法
            $path = $exFn -> imgUpload();
            //执行函数 返回图像路径
            $m -> news_img = $path;
        }
        $m -> news_time = date('Y-m-d H:i:s', time());
        //添加当天时间戳到数据库字段

        if (!$bool) {//判断是否model模型类
            $this -> error($m -> getError(), '', 2);
        } else {
            $m -> add();
            $this -> success('添加成功', '', 2);
        }
    }

    //删除新闻函数
    public function del($id) {
        $m = M('List');
        $count = $m -> delete($id);
        if ($count) {
            $this -> success('删除成功', '', 2);
        }
    }

    //编辑新闻函数
    public function edit($id) {
        $m = M('List');
        $arr = $m -> find($id);
        $this -> assign('editdata', $arr);
        $this -> display();
    }

    //更新新闻函数
    public function update() {
        $m = D('List');
        $m -> news_time = time();

        $form = $m -> create();

        $form['news_time'] = date('Y-m-d H:i:s', time());

        if ($_FILES['news_img']['name']) {
            $exFn = new IndexController();
            //thinkphp 引用共有的imgUpload方法
            $path = $exFn -> imgUpload();
            //执行函数 返回图像路径
            $form['news_img'] = $path;
        }

        //生成要添加form数据数组
        dump($form);
        $result = $m -> save($form);
        if ($result) {//判断是否model模型类
            $this -> success('更新成功！', '', 2);
        } else {
            $this -> error($m -> getError(), '', 2);
        }
    }

    //图像上传公有方法
    public function imgUpload() {

        $upload = new \Think\Upload();
        $upload -> maxSize = 1024 * 1024 * 1024 * 2;
        //大小限制
        $upload -> exts = array('jpg', 'gif', 'png', 'jpeg');
        //后缀名限制
        $upload -> rootPath = './Public/image/front/newslist/';
        //存储路径
        $upload -> saveName = 'time';
        //以事件存图像名称

        $info = $upload -> uploadOne($_FILES['news_img']);
        //上传单个方法执行，返回info信息

        if (!$info) {//输出报错信息
            $this -> error($upload -> getError(), '', 2);
        } else {
            return $imgPath = $info['savepath'] . $info['savename'];
            //将文件保存文件路径及文件名存到数据库
        }
    }

}
