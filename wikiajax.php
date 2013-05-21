 <?php
        $name=$_GET['name'];
        $tte=$name;
        $url='http://zh.moegirl.org/'.$tte;
        $fp = @fopen($url, "r") or die("词条尚未编辑");
        $str = file_get_contents($url);
        if(preg_match('/'.$tte.'<\/b>(.*)[。]/',$str, $arr))
        {
        $new_arr=$tte.$arr[1];
        $new_arr=strip_tags($new_arr);
        $new_arr=substr_replace($new_arr,"～",-2);
        echo $new_arr;
        }
        else{
            echo "词条尚未编辑。 ";
        }
?>