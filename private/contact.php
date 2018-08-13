<?php
/**
 * Created by PhpStorm.
 * User: Eliket-Grp
 * Date: 12/08/2018
 * Time: 18:16
 */

require_once '../vendor/autoload.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $posts = [];

    foreach ($_POST as $name => $value) {
        $posts[sanitize($name)] = sanitize($value);
    }

    checkRequired($posts);

    $transport = getTransport();
    $mailer = new Swift_Mailer($transport);

    $message = 'Vous venez de recevoir un message de :'.PHP_EOL;

    $message.= ( 'Nom : ' . $posts['prenoms']. ' '. $posts['nom'].PHP_EOL.PHP_EOL );

    $message.= ( 'Email : ' . $posts['email'].PHP_EOL.PHP_EOL );


    $message.= ( 'Telephone : ' . $posts['telephone'].PHP_EOL.PHP_EOL );


    $message.= ( 'Message : '.PHP_EOL.PHP_EOL );

    $message.= $posts['message'];



    $message = (new Swift_Message('Message de contact utilisateur ibohcompany.com'))
        ->setFrom(['test@ibohcompany.com' => 'Iboh Company'])
        ->setTo(['angemartialkoffi@gmail.com' => 'Ange Martial Koffi', 'angemartialkoffi@outlook.fr' => 'Ange Martial Koffi'])
        ->setBody($message);
    ;

    $result = $mailer->send($message);

    respond('success', 'Votre message a été envoyé avec succes');

}

header('/');

function getTransport(){
    $transport = (new Swift_SmtpTransport('mail09.lwspanel.com', 25))
        ->setUsername('test@ibohcompany.com')
        ->setPassword('Lephoenix1er$')
    ;

    return $transport;
}

function sanitize($string){
    return strip_tags(trim($string));
}

function checkRequired(array $posts = []){
    $required = ['nom', 'prenoms', 'email', 'telephone', 'message'];

    foreach ($required as $name ) {
        if(false === array_key_exists($name, $posts)){
            respond('error', 'Veuillez remplir le champs ' .$name);
        }
    }

    return true;
}

function respond($code, $message){
    $response = json_encode(['code' => $code, 'message' => $message]);
    header('Content-Type: application/json');

    echo $response;

    exit();
}