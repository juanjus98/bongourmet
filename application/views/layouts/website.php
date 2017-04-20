<?php
/**
 * Información del website
 */
$website_info = $this->website_info;

/**
 * Preparar tags en header
 */
$tag_title = str_replace(array('\r\n', '\r', '\n'), " ",strip_tags($head_info['title']));
$tag_description = $head_info['description'];
$tag_keywords = str_replace(array('\r\n', '\r', '\n'), " ",strip_tags($head_info['keywords']));

$tag_url = base_url() . uri_string();
$tag_image = $head_info['image'];

?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  
  <title><?php echo $tag_title; ?></title>
  <meta name="description" content="<?php echo $tag_description; ?>">
  <meta name="author" content="<?php echo base64_decode("d2ViQXB1LmNvbQ=="); ?>">
  <meta name="keywords" content="<?php echo strip_tags($head_info['keywords']); ?>">
  <meta name="robots" content="index, follow">

  <!--Para facebook-->
  <meta property="og:title" content="<?php echo $tag_title; ?>">
  <meta property="og:description" content="<?php echo $tag_description; ?>">
  <meta property="og:url" content="<?php echo $tag_url; ?>" />
  <meta property="og:image" content="<?php echo $tag_image; ?>">

  <!-- <title> Muebles, Estantes, Escritorios, Separadores, Archivadores, Counter, Mesa | <?php echo @$template['title']; ?> </title> -->
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('css/bootstrap.min.css'); ?>">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('css/style.css'); ?>">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('css/font-awesome.min.css'); ?>">
  <link rel="stylesheet" type="text/css"  href="<?php echo base_url('css/hover.min.css'); ?>"/>

  <link rel="stylesheet" type="text/css" href="<?php echo base_url('plugins/slidebars/slidebars.min.css'); ?>">
  <link rel="stylesheet" type="text/css"  href="<?php echo base_url('plugins/lightslider/css/lightslider.css'); ?>"/>

  <link rel="stylesheet" type="text/css"  href="<?php echo base_url('plugins/jquery-confirm/jquery-confirm.min.css'); ?>"/>
  <!-- <link rel="stylesheet" href="dist/sweetalert.css"> -->

  <!-- <link rel="stylesheet" type="text/css"  href="http://www.elevateweb.co.uk/wp-content/themes/radial/syntax/prism.css"/> -->



  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->

<link rel="shortcut icon" href="<?php echo base_url('favicon.ico') ?>">
<script type="text/javascript">var base_url='<?php echo base_url();?>';</script>
<?php //echo notify();?>

</head>
<body>
  <!--MENU-->
  <div off-canvas="main-menu left shift">
    <ul class="menu small">
      <li><a href="/slidebars/"><span class="fa fa-home"></span> Home</a></li>
      <li><a href="/slidebars/features/"><span class="fa fa-check-circle"></span> Features</a></li>
      <li><a href="/slidebars/downloads/"><span class="fa fa-cloud-download"></span> Downloads</a></li>
      <li><a href="#" class="js-toggle-demos-menu"><span class="fa fa-eye"></span> Demos</a></li>
      <li><a href="#" class="js-toggle-help-menu"><span class="fa fa-life-ring"></span> Help Center</a></li>
      <li><a href="/slidebars/compatibility/"><span class="fa fa-info-circle"></span> Compatibility</a></li>
      <li><a href="https://github.com/adchsm/Slidebars" class="ga-external-github"><span class="fa fa-github"></span> Slidebars on GitHub</a></li>
      <li><a href="#" class="js-toggle-author-menu"><span class="fa fa-user"></span> About the Author</a></li>
      <li><a href="#" class="js-close-any"><span class="fa fa-times-circle"></span> Close</a></li>
    </ul>
  </div>
  <!--MENU-->

  <div canvas="container" class="page">
    <header>
    <div class="container-fluid top-sect">
      <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <nav class="navbar navbar-default navbar-wa">
          <!-- <div class="container-fluid"> -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <?php
                echo crear_menu(wamenu(), $active_link);
              ?>
            </div><!-- /.navbar-collapse -->
          <!-- </div>/.container -->
        </nav>
      </div>

      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <div class="cont-redes">
          <a href="#" class="btn-facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
        </div>
        <div class="help-box text-right">
          <a href="callto:#">(54)270528</a>
        </div>
      </div>

      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="text-center">
            <a href="<?php echo base_url();?>">
              <img src="<?php echo base_url('images/logo.png');?>" alt="Mueblería">
            </a>
            </div>
        </div>
      </div>

    </div>


    </header>
    
    <?php echo @$template['body']; ?>

    <footer>
      <div class="clients-box">
        <div class="container-fluid">
          <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <!-- <h3>CONFIAN <small>EN NOSOTROS:</small></h3> -->
          <ul id="clients-slider" class="content-slider-clientes">
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-1.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-2.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-3.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-4.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-5.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-6.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-1.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-2.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-3.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-4.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-5.jpg');?>" alt="titulo">
                    </a>
                </li>
                <li>
                    <a href="#" title="titulo">
                      <img src="<?php echo base_url('images/cli-6.jpg');?>" alt="titulo">
                    </a>
                </li>
            </ul>
            </div>
          </div>
        </div>
      </div>

    </footer>    

    <div class="clearfix"></div>
    <span class="button js-toggle-main-menu pull-right"><i class="fa fa-bars"></i> <span class="text">Menu</span></span>
  </div><!--//canvas="container"-->

  <script src="<?php echo base_url('plugins/jquery/jquery-3.1.1.min.js'); ?>"></script>
  <script type="text/javascript" src="<?php echo base_url('js/bootstrap.min.js'); ?>"></script>
  <script type="text/javascript" src="<?php echo base_url('plugins/slidebars/slidebars.min.js'); ?>"></script>
  <script type="text/javascript" src="<?php echo base_url('plugins/lightslider/js/lightslider.js'); ?>"></script>

  <script type="text/javascript" src="<?php echo base_url('plugins/elevatezoom/jquery.elevatezoom.js'); ?>"></script>

  <script type="text/javascript" src="<?php echo base_url('plugins/jquery-confirm/jquery-confirm.min.js'); ?>"></script>

  <script type="text/javascript" src="<?php echo base_url('plugins/formValidation/formValidation.js'); ?>"></script>
  <script type="text/javascript" src="<?php echo base_url('plugins/formValidation/framework/bootstrap.min.js'); ?>"></script>

  <script type="text/javascript" src="<?php echo base_url() ?>js/wa-scripts.js"></script>

</body>

</html>

