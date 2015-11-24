<?php

namespace Admin\Model;
use Think\Model;

class ListModel extends Model {
protected $_validate=array(
    array('news_title','require','请填写标题！'),
    array('news_content','require','请填写内容！')
);
} 




