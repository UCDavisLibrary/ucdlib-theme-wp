<?php

// Sets up block patterns for this theme
class UCDLibThemePatterns {
  public function __construct(){
    $this->slug = 'ucdlib-theme-wp';

    add_action( 'init', [$this, 'register']);
  }

  public function register(){
    register_block_pattern_category(
      $this->slug,
      ['label' => 'Library Theme']
    );

    register_block_pattern(
      "$this->slug/contactus",
      [
        'title' => 'Contact Us',
        'content' => $this->markupContactUs(),
        'description' => 'Simple Contact Us',
        'categories' => [$this->slug],
        'keywords' => ['contact', 'library'],
      ]
    );

    register_block_pattern(
      "$this->slug/contactusmulti",
      [
        'title' => 'Contact Us (Multi)',
        'content' => $this->markupContactUsMulti(),
        'description' => 'Multi Contact Us',
        'categories' => [$this->slug],
        'keywords' => ['contact', 'library'],
      ]
    );

    register_block_pattern(
      "$this->slug/langprize",
      [
        'title' => 'Lang Prize',
        'content' => $this->markupLangPrize(),
        'description' => 'Lang Prize',
        'categories' => [$this->slug],
        'keywords' => ['lang', 'prize'],
      ]
    );
  }

  public function markupContactUs(){
    return "
    <!-- wp:group -->
    <div class=\"wp-block-group\">
    <!-- wp:ucd-theme/heading {\"content\":\"Contact Us\",\"className\":\"is-style-highlight\"} /-->
    <!-- wp:paragraph -->
    <p>[Optional] For any questions related to [page topic], please contact us.</p>
    <!-- /wp:paragraph -->
    <!-- wp:group -->
    <div class=\"wp-block-group\"><!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-envelope\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-phone\"} /--></div>
    <!-- /wp:group -->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /--></div>
    <!-- /wp:group -->
    ";
  }

  public function markupContactUsMulti(){
    return "
    <!-- wp:group -->
    <div class=\"wp-block-group\">
    <!-- wp:ucd-theme/heading {\"content\":\"Contact Us\",\"className\":\"is-style-highlight\"} /-->
    <!-- wp:paragraph -->
    <p>[Optional] For any questions related to [page topic], please contact us.</p>
    <!-- /wp:paragraph -->
    <!-- wp:group -->
    <div class=\"wp-block-group\"><!-- wp:ucd-theme/heading {\"content\":\"Department or Audience\",\"level\":3,\"classSuffix\":\"h6\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-envelope\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-phone\"} /--></div>
    <!-- /wp:group -->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /-->
    <!-- wp:group -->
    <div class=\"wp-block-group\"><!-- wp:ucd-theme/heading {\"content\":\"Department or Audience\",\"level\":3,\"classSuffix\":\"h6\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-envelope\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-phone\"} /--></div>
    <!-- /wp:group -->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /-->
    <!-- wp:group -->
    <div class=\"wp-block-group\"><!-- wp:ucd-theme/heading {\"content\":\"Department or Audience\",\"level\":3,\"classSuffix\":\"h6\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-envelope\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-phone\"} /--></div>
    <!-- /wp:group -->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /--></div>
    <!-- /wp:group -->
    ";
  }

  public function markupLangPrize(){
    return "
    <!-- wp:group -->
    <div class=\"wp-block-group\">
    <!-- wp:image -->
    <figure class=\"wp-block-image\"><img alt=\"\"/></figure>
    <!-- /wp:image -->
    <!-- wp:ucd-theme/object-box -->
    <!-- wp:ucd-theme/layout-columns {\"modifier\":\"33-67\"} -->
    <!-- wp:ucd-theme/column {\"layoutClass\":\"l-first\",\"forbidWidthEdit\":true} -->
    <!-- wp:ucd-theme/heading {\"content\":\"1st Place\",\"className\":\"is-style-primary\"} /-->
    <!-- wp:ucd-theme/heading {\"content\":\"Science, Engineering and Math, 2017\",\"level\":3,\"className\":\"is-style-highlight\"} /-->
    <!-- wp:ucd-theme/spacer /-->
    <!-- /wp:ucd-theme/column -->
    <!-- wp:ucd-theme/column {\"layoutClass\":\"l-second\",\"forbidWidthEdit\":true} -->
    <!-- wp:quote {\"align\":\"left\",\"className\":\"is-style-default\"} -->
    <blockquote class=\"wp-block-quote has-text-align-left is-style-default\"><p></p></blockquote>
    <!-- /wp:quote -->
    <!-- /wp:ucd-theme/column -->
    <!-- /wp:ucd-theme/layout-columns -->
    <!-- /wp:ucd-theme/object-box -->
    <!-- wp:ucd-theme/separator {\"brandColor\":\"secondary\",\"style\":\"dotted\"} /-->
    <!-- wp:ucd-theme/heading {\"content\":\"Project Title\"} /-->
    <!-- wp:paragraph {\"align\":\"left\"} -->
    <p class=\"has-text-align-left\">Project format</p>
    <!-- /wp:paragraph -->
    <!-- wp:ucd-theme/button-link {\"content\":\"Read \u003cwinner name\u003e's Paper (pdf)\",\"shape\":\"round\",\"className\":\"is-style-alt3\"} /-->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /-->
    <!-- wp:ucd-theme/heading {\"content\":\"Project Description\",\"level\":3,\"className\":\"is-style-highlight\"} /-->
    <!-- wp:paragraph -->
    <p>Project description</p>
    <!-- /wp:paragraph -->
    <!-- wp:ucd-theme/heading {\"content\":\"In Their Own Words\",\"level\":3,\"className\":\"is-style-highlight\"} /-->
    <!-- wp:paragraph -->
    <p>Read &lt;winner name>'s reflective essay from their Lang Prize application.</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:group -->
    ";
  }

}