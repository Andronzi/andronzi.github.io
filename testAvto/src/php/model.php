<?php

echo $_GET['name'].'<br>';
echo $_GET['tel'].'<br>';
echo $_GET['mark'].'<br>';
echo $_GET['model'].'<br>';
echo $_GET['year'].'<br>';

$to = "andrey.radioniv.2003@gmail.com";
$name = $_GET['name'];
$tel = $_GET['tel'];
$mark = $_GET['mark'];
$model = $_GET['model'];
$year = $_GET['year'];

mail ($to, $name, $tel, $mark, $model);

?>