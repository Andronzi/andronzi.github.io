<?php

echo $_GET['name'].'<br>';
echo $_GET['telephone'];

$to = "andrey.radioniv.2003@gmail.com";
$name = $_GET['name'];
$tel = $_GET['telephone'];

mail ($to, $name, $tel);

?>