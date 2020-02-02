http://sandbox.onlinephpfunctions.com/

```php
<?php

function c($string, $capitalizeFirstCharacter = false)  {
    $str = str_replace(' ', '', ucwords(str_replace('-', ' ', $string)));
    if (!$capitalizeFirstCharacter) {
        $str[0] = strtolower($str[0]);
    }
    return ucwords($str);
}

$icons = [

];

foreach($icons as $key => $value) {
    $name = 'awesomeIcon'. c($key);
    echo "const $name = { prefix: \"light\", iconName: \"{$key}\", width: \"{$value[0]}\", height: \"{$value[1]}\", icon: \"{$value[4]}\"}\n";
}
echo "\n";
foreach($icons as $key => $value) {
    $name = 'awesomeIcon'. c($key);
    echo "module.exports.{$name} = $name\n";
}
```