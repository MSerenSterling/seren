<?php
/**
 * Autoloads Sterling Theme classes using WordPress convention
 */

 class Sterling_Autoloader {
    /**
     * Registers Sterling_Autoloader as an SPL autoloader
     * 
     * @param boolean $prepend
     */
    public static function register($prepend = false) {
        if (version_compare(phpversion(), '5.3.0', '>=')) {
            spl_autoload_register(array(new self, 'autoload'), true, $prepend);
        } else {
            spl_autoload_register(array(new self, 'autoload'));
        }
    }

    /**
     * Handles autoloading of Sterling classes
     * 
     * @param string $class
     */
    public static function autoload($class) {
        if (0 !== strpos($class, 'Sterling')) {
            return;
        }
        if (is_file($file = dirname(__FILE__).'/class-'.strtolower(str_replace(array('_', "\0"), array('-', ''), $class).'.php'))) {
            require_once $file;
        }
    }
 }