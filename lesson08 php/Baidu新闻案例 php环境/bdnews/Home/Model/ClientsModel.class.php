<?php


namespace Home\Model;
use Think\Model;

class ClientsModel extends Model {
protected $_validate=array(
    array('cli_name','require','请填写客户名称！'),
    array('rm_id','','此ID已存在,请检查后重新输入！',0,'unique',1)
);
} 