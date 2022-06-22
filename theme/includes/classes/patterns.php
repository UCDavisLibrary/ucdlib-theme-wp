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
      "$this->slug/coretextstyles",
      [
        'title' => 'Core Text Styles',
        'content' => $this->markupCoreTextStyles(),
        'description' => 'Core Text Styles',
        'categories' => [$this->slug],
        'keywords' => ['core', 'text', 'style'],
      ]
    );
  }

  public function markupContactUs(){
    return "
    <!-- wp:ucd-theme/heading {\"content\":\"Contact Us\",\"className\":\"is-style-highlight\"} /-->
    <!-- wp:paragraph -->
    <p>[Optional] For any questions related to [page topic], please contact us.</p>
    <!-- /wp:paragraph -->
    <!-- wp:group -->
    <div class=\"wp-block-group\"><!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-envelope\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-phone\"} /--></div>
    <!-- /wp:group -->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /-->
    ";
  }

  public function markupContactUsMulti(){
    return "
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
    ";
  }

  public function markupCoreTextStyles(){
    return "
    <!-- wp:group -->
    <div class=\"wp-block-group\">
    <!-- wp:ucd-theme/heading {\"content\":\"Primary Headings\"} /-->
    <!-- wp:paragraph -->
    <p>Normal text may be <strong>bolded</strong>, <em>italicized</em> and <a href=\"https://sandbox.library.ucdavis.edu/\" data-type=\"page\" data-id=\"111\">linked</a> but otherwise never underlined. Underlines are reserved for links.</p>
    <!-- /wp:paragraph -->
    <!-- wp:list {\"className\":\"list\u002d\u002darrow\"} -->
    <ul class=\"list--arrow\"><li>Preferred List Style (Gold Arrow)</li><li>Exception: Use \"Default\" list style in FAQ blocks due to the light blue background</li></ul>
    <!-- /wp:list -->
    <!-- wp:ucd-theme/heading {\"content\":\"2nd Level Headings\",\"level\":3,\"classSuffix\":\"highlight\"} /-->
    <!-- wp:ucd-theme/heading {\"content\":\"3rd Level Headings\",\"level\":4,\"classSuffix\":\"h5\"} /-->
    <!-- wp:ucd-theme/heading {\"content\":\"4th Level Headings\",\"level\":5,\"classSuffix\":\"h6\"} /--></div>
    <!-- /wp:group -->
    ";
  }

}